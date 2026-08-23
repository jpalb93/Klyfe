/**
 * Motor de Validação, Detector de Inconsistências e Alertas Inteligentes
 * Avalia as entradas e saídas da Calculadora Solar Klyfe e gera observações,
 * alertas de risco comercial e o Score de Qualidade da Estimativa.
 */

const defaultConfig = require('../../config/solar-calculator');

/**
 * Executa todas as validações e calcula os indicadores de qualidade e alertas
 * @param {Object} sizing Resultado do calculationEngine
 * @param {Object} pricing Resultado do pricingEngine
 * @param {Object} financials Resultado do financialEngine
 * @param {Object} params Entradas brutas informadas pelo usuário
 * @param {Object} config Configurações do sistema
 */
function evaluateSolarValidations(sizing, pricing, financials, params = {}, config = defaultConfig) {
    const observations = [];
    const inconsistencies = [];
    const scoreReasons = [];
    let scorePoints = 100; // Começa alto e deduz conforme incerteza

    // ── 1. Validações de Consumo e Histórico ──
    if (params.method === 'B' && sizing.historyStats && sizing.historyStats.count >= 10) {
        scoreReasons.push('Histórico completo de consumo informado (10+ meses). (+30 pts)');
    } else if (params.method === 'A' && sizing.currentKwh > 0) {
        scoreReasons.push('Consumo médio mensal informado diretamente. (+15 pts)');
        scorePoints -= 15;
    } else if (!sizing.currentKwh && financials.currentBillAmount > 0) {
        inconsistencies.push({
            type: 'warning',
            title: 'Falta consumo em kWh',
            message: 'O valor da conta não é suficiente para dimensionamento técnico. Informe o consumo em kWh.'
        });
        scoreReasons.push('Apenas o valor em R$ da conta foi informado (sem consumo kWh). (-40 pts)');
        scorePoints -= 40;
    } else {
        scoreReasons.push('Nenhum consumo atual informado. (-50 pts)');
        scorePoints -= 50;
    }

    // ── 2. Incompatibilidade Fatura x Consumo ──
    if (financials.currentBillAmount > 0 && sizing.currentKwh > 0) {
        const estimatedTariff = financials.currentBillAmount / sizing.currentKwh;
        if (estimatedTariff < 0.35 || estimatedTariff > 2.50) {
            inconsistencies.push({
                type: 'caution',
                title: 'Incompatibilidade entre Fatura e Consumo',
                message: `O valor da fatura (R$ ${financials.currentBillAmount}) parece incompatível com o consumo informado (${sizing.currentKwh} kWh). Tarifa resultante: R$ ${estimatedTariff.toFixed(2)}/kWh. Verifique Tarifa Social, créditos ou erro de digitação.`
            });
            scoreReasons.push('Incompatibilidade detectada entre fatura R$ e consumo kWh. (-20 pts)');
            scorePoints -= 20;
        }
    }

    // ── 3. Análise dos Equipamentos Adicionados ──
    if (sizing.equipmentList && sizing.equipmentList.length > 0) {
        const acEquipment = sizing.equipmentList.filter(eq => eq.category === 'climatizacao' || (eq.name && eq.name.toLowerCase().includes('ar')));
        const totalAcKwh = acEquipment.reduce((acc, eq) => acc + eq.monthlyKwh, 0);

        if (totalAcKwh > 0 && sizing.consideredKwh > 0) {
            const acSharePercent = Math.round((totalAcKwh / sizing.consideredKwh) * 100);
            if (acSharePercent >= 40) {
                observations.push(`Ar-condicionado representa ${acSharePercent}% do novo consumo total.`);
            }
        }

        let hasManualPower = false;
        sizing.equipmentList.forEach(eq => {
            if (eq.isManualPower) {
                hasManualPower = true;
            }
            // Checagem de potências discrepantes em ares-condicionados
            if (eq.name.includes('12.000') && eq.powerW > 2500) {
                inconsistencies.push({
                    type: 'warning',
                    title: 'Potência Elevada de Ar-condicionado',
                    message: `A potência informada para ${eq.name} (${eq.powerW} W) parece elevada para este equipamento. Confirme a ficha técnica.`
                });
            }
        });

        if (hasManualPower) {
            observations.push('Potência de equipamento foi informada manualmente.');
            scoreReasons.push('Equipamentos com potência informada manualmente. (+10 pts)');
        }
    }

    // ── 4. Aumento do Consumo e Margem ──
    if (sizing.currentKwh > 0 && sizing.rawProjectedKwh > sizing.currentKwh) {
        const increasePercent = Math.round(((sizing.rawProjectedKwh - sizing.currentKwh) / sizing.currentKwh) * 100);
        observations.push(`Consumo futuro projetado aumentará ${increasePercent}%.`);
    }

    if (sizing.growthMarginPercent > 0) {
        observations.push(`Margem de crescimento de ${sizing.growthMarginPercent}% aplicada ao dimensionamento.`);
    }

    // ── 5. Análise do Dimensionamento do Sistema e Módulos ──
    if (sizing.sizingDiffPercent > 5) {
        observations.push(`Sistema selecionado (${sizing.installedKwp} kWp) está ${sizing.sizingDiffPercent}% acima da referência da tabela.`);
    } else if (sizing.sizingDiffPercent < -5) {
        observations.push(`Sistema selecionado (${sizing.installedKwp} kWp) está ${Math.abs(sizing.sizingDiffPercent)}% abaixo da referência da tabela.`);
    }

    if (sizing.coveragePercent > 120) {
        inconsistencies.push({
            type: 'info',
            title: 'Possível Sobredimensionamento',
            message: `A geração estimada cobre ${sizing.coveragePercent}% do consumo projetado. Confirme se há intenção de gerar créditos para outra unidade.`
        });
    } else if (sizing.coveragePercent < 85 && sizing.coveragePercent > 0) {
        inconsistencies.push({
            type: 'warning',
            title: 'Geração Insuficiente',
            message: `A geração estimada cobre apenas ${sizing.coveragePercent}% do consumo projetado. O cliente continuará pagando consumo da rede.`
        });
    }

    // ── 6. Análise de Preço e Extrapolação ──
    if (pricing.isExtrapolated) {
        observations.push('Simulação extrapola a faixa principal da tabela comercial da Klyfe (300 a 5.000 kWh).');
        scoreReasons.push('Consumo fora da faixa principal da tabela comercial. (-15 pts)');
        scorePoints -= 15;
    }

    if (pricing.priceAdjustmentPercent !== 0) {
        const type = pricing.priceAdjustmentPercent < 0 ? 'abaixo' : 'acima';
        observations.push(`Preço final está ${Math.abs(pricing.priceAdjustmentPercent)}% ${type} do preço de referência.`);
    }

    if (pricing.isPricePerKwpLow) {
        inconsistencies.push({
            type: 'caution',
            title: 'Indicador R$/kWp Baixo',
            message: `O valor do projeto (R$ ${pricing.pricePerKwp}/kWp) está abaixo da faixa recomendada pela Klyfe (R$ ${pricing.limits.minUsual}/kWp). Verifique margem de lucro.`
        });
    } else if (pricing.isPricePerKwpHigh) {
        inconsistencies.push({
            type: 'warning',
            title: 'Indicador R$/kWp Elevado',
            message: `O valor do projeto (R$ ${pricing.pricePerKwp}/kWp) está acima da faixa padrão (R$ ${pricing.limits.maxUsual}/kWp).`
        });
    }

    // ── 7. Tarifa Social e Financiamento ──
    if (params.isSocialTariff === true || params.isSocialTariff === 'sim') {
        observations.push('Cliente enquadrado em Tarifa Social.');
    }

    if (financials.projectedBillAmount > 0 && financials.totalOutlayWithSolar > financials.projectedBillAmount) {
        observations.push('Financiamento gera desembolso mensal superior à conta projetada durante o período de amortização.');
    }

    if (!financials.hasInterestRate) {
        observations.push('Dados insuficientes ou sem taxa para cálculo financeiro de financiamento confiável.');
    }

    // ── 8. Cálculo Final do Score de Qualidade da Estimativa ──
    let score = 'Média';
    scorePoints = Math.max(0, Math.min(100, scorePoints));

    if (scorePoints >= 75) {
        score = 'Alta';
    } else if (scorePoints <= 45) {
        score = 'Baixa';
    }

    return {
        score,
        scorePoints,
        scoreReasons,
        observations,
        inconsistencies
    };
}

module.exports = {
    evaluateSolarValidations
};
