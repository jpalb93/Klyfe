/**
 * Motor de Simulação Financeira da Calculadora Solar Klyfe
 * Simulação de financiamento (PMT), comparativo antes x depois,
 * cálculo de payback simples e projeção de economia acumulada até 25 anos.
 */

const defaultConfig = require('../../config/solar-calculator');

/**
 * Calculador de parcela fixa PMT (Fórmula Financeira Amortização)
 * PMT = PV * [i * (1+i)^n] / [(1+i)^n - 1]
 */
function calculatePMT(financedAmount, monthlyRatePercent, termMonths) {
    if (financedAmount <= 0 || termMonths <= 0) return 0;
    if (monthlyRatePercent <= 0) return financedAmount / termMonths;

    const i = monthlyRatePercent / 100;
    const n = termMonths;
    const factor = Math.pow(1 + i, n);
    const pmt = financedAmount * (i * factor) / (factor - 1);
    return Math.round(pmt * 100) / 100;
}

/**
 * Processa a simulação financeira completa
 * @param {Object} pricing Resultado do pricingEngine
 * @param {Object} sizing Resultado do calculationEngine
 * @param {Object} params Parâmetros financeiros informados pelo usuário
 * @param {Object} config Configurações do sistema
 */
function calculateSolarFinancials(pricing, sizing, params = {}, config = defaultConfig) {
    const projectValue = pricing.finalPrice || 0;
    const downPayment = Math.max(0, Number(params.downPayment) || 0);
    const financedAmount = Math.max(0, projectValue - downPayment);

    const termMonths = Number(params.termMonths) || 60;
    const monthlyInterestRate = params.monthlyInterestRate !== undefined && params.monthlyInterestRate !== null && params.monthlyInterestRate !== ''
        ? Number(params.monthlyInterestRate)
        : config.defaultInterestRateMonthly || 1.39;

    const hasInterestRate = !isNaN(monthlyInterestRate) && monthlyInterestRate > 0;

    const monthlyInstallment = hasInterestRate
        ? calculatePMT(financedAmount, monthlyInterestRate, termMonths)
        : (termMonths > 0 ? Math.round((financedAmount / termMonths) * 100) / 100 : 0);

    const totalInstallmentsPaid = Math.round(monthlyInstallment * termMonths * 100) / 100;
    const totalPaidWithFinancing = totalInstallmentsPaid + downPayment;
    const totalInterestPaid = Math.max(0, totalInstallmentsPaid - financedAmount);
    const financingCostDifference = Math.max(0, totalPaidWithFinancing - projectValue);

    // ── 2. Comparativo Financeiro (Sem Solar vs Com Solar) ──
    const currentBillAmount = Math.max(0, Number(params.currentBillAmount) || 0);

    // Estima a tarifa média por kWh se houver consumo
    let tariffPerKwh = 0.95; // Padrão estimado R$/kWh
    if (currentBillAmount > 0 && sizing.currentKwh > 0) {
        tariffPerKwh = currentBillAmount / sizing.currentKwh;
    }

    // Conta de energia futura projetada sem solar
    const projectedBillAmount = currentBillAmount > 0
        ? Math.round(sizing.consideredKwh * tariffPerKwh)
        : 0;

    // Conta residual (impostos, taxa de iluminação, custo de disponibilidade)
    // Se não informada, assume taxa de disponibilidade padrão razoável (ex: ~R$ 50 a R$ 100)
    const residualBill = params.residualBill !== undefined && params.residualBill !== null && params.residualBill !== ''
        ? Math.max(0, Number(params.residualBill))
        : Math.round(Math.max(30, sizing.consideredKwh * 0.08));

    // Desembolso mensal total com solar
    const totalOutlayWithSolar = monthlyInstallment + residualBill;

    // Diferença mensal (Economia ou acréscimo)
    const netMonthlyDifference = projectedBillAmount - totalOutlayWithSolar;
    const isMonthlySavings = netMonthlyDifference > 0;

    // Frase comercial legítima
    let commercialStatement = '';
    if (projectedBillAmount > 0) {
        if (totalOutlayWithSolar <= projectedBillAmount) {
            commercialStatement = 'Sua nova parcela somada à conta residual é MENOR ou IGUAL à sua fatura projetada!';
        } else {
            commercialStatement = 'Durante o período do financiamento, o desembolso mensal temporário será superior à fatura atual. Após a quitação, a economia será plena.';
        }
    }

    // ── 3. Payback Simples ──
    // Economia na conta pós-quitação (ou mensal durante o ano)
    const monthlyEnergySavingsWithoutFinancing = Math.max(0, projectedBillAmount - residualBill);
    let paybackYears = 0;
    let paybackMonths = 0;
    let paybackFormatted = 'N/D';

    if (projectValue > 0 && monthlyEnergySavingsWithoutFinancing > 0) {
        const totalMonthsPayback = projectValue / monthlyEnergySavingsWithoutFinancing;
        paybackYears = Math.floor(totalMonthsPayback / 12);
        paybackMonths = Math.round(totalMonthsPayback % 12);
        paybackFormatted = `${paybackYears} ano${paybackYears !== 1 ? 's' : ''}${paybackMonths > 0 ? ` e ${paybackMonths} mêt${paybackMonths !== 1 ? 'es' : 's'}` : ''}`;
    }

    // ── 4. Economia Acumulada ──
    const annualTariffIncreasePercent = Math.max(0, Number(params.annualTariffIncreasePercent) || 0);
    const accumulatedSavings = {};

    [1, 5, 10, 15, 20, 25].forEach(years => {
        let totalSavings = 0;
        let currentYearlySavings = monthlyEnergySavingsWithoutFinancing * 12;

        for (let y = 1; y <= years; y++) {
            totalSavings += currentYearlySavings;
            currentYearlySavings *= (1 + annualTariffIncreasePercent / 100);
        }

        accumulatedSavings[`years_${years}`] = Math.round(totalSavings);
    });

    return {
        projectValue,
        downPayment,
        financedAmount,
        termMonths,
        monthlyInterestRate,
        hasInterestRate,
        monthlyInstallment,
        totalInstallmentsPaid,
        totalPaidWithFinancing,
        totalInterestPaid,
        financingCostDifference,
        currentBillAmount,
        projectedBillAmount,
        residualBill,
        totalOutlayWithSolar,
        netMonthlyDifference: Math.round(netMonthlyDifference),
        isMonthlySavings,
        commercialStatement,
        paybackYears,
        paybackMonths,
        paybackFormatted,
        annualTariffIncreasePercent,
        accumulatedSavings
    };
}

module.exports = {
    calculatePMT,
    calculateSolarFinancials
};
