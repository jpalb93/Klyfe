/**
 * Motor de Precificação Comercial da Calculadora Solar Klyfe
 * Realiza a interpolação da tabela de preços, gestão de descontos/acréscimos,
 * indicador R$/kWp e detecção de preços atípicos ou extrapolação.
 */

const defaultConfig = require('../../config/solar-calculator');

/**
 * Interpolação linear da tabela comercial para obter o Preço de Referência em R$
 */
function calculateReferencePrice(kwh, table) {
    if (!table || table.length === 0) return 0;
    if (kwh <= 0) return 0;

    const sorted = [...table].sort((a, b) => a.consumoKwh - b.consumoKwh);

    // Consumo abaixo da faixa inicial (300 kWh)
    if (kwh <= sorted[0].consumoKwh) {
        return (kwh / sorted[0].consumoKwh) * sorted[0].preco;
    }

    // Consumo acima da faixa limite (5.000 kWh)
    if (kwh >= sorted[sorted.length - 1].consumoKwh) {
        const last = sorted[sorted.length - 1];
        const prev = sorted[sorted.length - 2];
        const slope = (last.preco - prev.preco) / (last.consumoKwh - prev.consumoKwh);
        return last.preco + (kwh - last.consumoKwh) * slope;
    }

    // Interpolação linear entre os dois pontos mais próximos
    for (let i = 0; i < sorted.length - 1; i++) {
        const p1 = sorted[i];
        const p2 = sorted[i + 1];
        if (kwh >= p1.consumoKwh && kwh <= p2.consumoKwh) {
            const factor = (kwh - p1.consumoKwh) / (p2.consumoKwh - p1.consumoKwh);
            return p1.preco + factor * (p2.preco - p1.preco);
        }
    }

    return 0;
}

/**
 * Calcula a precificação comercial completa do projeto solar
 * @param {Object} sizing Object retornado pelo calculationEngine
 * @param {Object} options Ajustes manuais e opções comerciais
 * @param {Object} config Configuração do sistema
 */
function calculateSolarPricing(sizing, options = {}, config = defaultConfig) {
    const table = config.commercialTable || [];
    const kwh = sizing.consideredKwh || 0;
    const installedKwp = sizing.installedKwp || 0;

    // Preço de referência da tabela Klyfe
    const referencePrice = Math.round(calculateReferencePrice(kwh, table));

    // Ajustes comerciais
    const discount = Math.max(0, Number(options.discount) || 0);
    const addition = Math.max(0, Number(options.addition) || 0);

    let finalPrice = 0;
    let isManualPrice = false;

    if (options.manualFinalPrice !== undefined && options.manualFinalPrice !== null && options.manualFinalPrice > 0) {
        finalPrice = Math.round(Number(options.manualFinalPrice));
        isManualPrice = true;
    } else {
        finalPrice = Math.round(referencePrice - discount + addition);
    }

    // Variação em R$ e % em relação ao preço de referência
    const priceAdjustmentAmount = finalPrice - referencePrice;
    const priceAdjustmentPercent = referencePrice > 0
        ? Math.round((priceAdjustmentAmount / referencePrice) * 100 * 10) / 10
        : 0;

    // Indicador de R$/kWp (Preço Final / Potência Instalada)
    const pricePerKwp = installedKwp > 0
        ? Math.round(finalPrice / installedKwp)
        : 0;

    // Checagem se extrapola a faixa da tabela comercial da Klyfe (300 a 5.000 kWh/mês)
    const isExtrapolated = kwh < 300 || kwh > 5000;

    // Verificação de faixas de atipicidade de R$/kWp
    const limits = config.pricePerKwpLimits || { minUsual: 2200, maxUsual: 4500 };
    const isPricePerKwpLow = pricePerKwp > 0 && pricePerKwp < limits.minUsual;
    const isPricePerKwpHigh = pricePerKwp > limits.maxUsual;

    return {
        referencePrice,
        discount,
        addition,
        finalPrice,
        isManualPrice,
        priceAdjustmentAmount,
        priceAdjustmentPercent,
        pricePerKwp,
        isExtrapolated,
        isPricePerKwpLow,
        isPricePerKwpHigh,
        limits
    };
}

module.exports = {
    calculateReferencePrice,
    calculateSolarPricing
};
