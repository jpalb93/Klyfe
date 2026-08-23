/**
 * Fachada Unificada da Calculadora Solar Klyfe
 * Consolida o fluxo completo de pré-dimensionamento, precificação,
 * simulação financeira, cenários e validações.
 */

const defaultConfig = require('../../config/solar-calculator');
const { calculateSolarSizing } = require('./calculationEngine');
const { calculateSolarPricing } = require('./pricingEngine');
const { calculateSolarFinancials } = require('./financialEngine');
const { evaluateSolarValidations } = require('./validationEngine');
const { generateSolarScenarios } = require('./scenarioEngine');

/**
 * Executa a simulação completa da Calculadora Solar Klyfe
 * @param {Object} inputs Dados de entrada informados na interface ou API
 * @param {Object} customConfig Configuração customizada opcional
 */
function runSolarSimulation(inputs = {}, customConfig = null) {
    const config = customConfig || defaultConfig;

    // 1. Motor de Cálculo Técnico e Dimensionamento
    const sizing = calculateSolarSizing(inputs, config);

    // 2. Motor de Precificação Comercial
    const pricing = calculateSolarPricing(sizing, inputs, config);

    // 3. Motor de Simulação Financeira
    const financials = calculateSolarFinancials(pricing, sizing, inputs, config);

    // 4. Motor de Validação e Alertas Automáticos
    const validations = evaluateSolarValidations(sizing, pricing, financials, inputs, config);

    // 5. Motor de Cenários Comparativos
    const scenarios = generateSolarScenarios(inputs, config);

    // Formata o resumo em texto limpo para envio ao cliente via WhatsApp
    const whatsappSummary = buildWhatsAppSummary(inputs, sizing, pricing, financials);

    return {
        timestamp: new Date().toISOString(),
        customer: {
            name: inputs.customerName || '',
            phone: inputs.customerPhone || '',
            city: inputs.customerCity || '',
            state: inputs.customerState || 'PB',
            utilityCompany: inputs.utilityCompany || 'Energisa',
            customerType: inputs.customerType || 'Residencial',
            connectionType: inputs.connectionType || 'Não informado',
            isSocialTariff: !!inputs.isSocialTariff
        },
        sizing,
        pricing,
        financials,
        validations,
        scenarios,
        whatsappSummary,
        configUsed: {
            table: config.commercialTable,
            moduleWatts: sizing.moduleWatts,
            productivity: sizing.productivity,
            interestRate: financials.monthlyInterestRate
        }
    };
}

/**
 * Gera texto curto e limpo para envio direto ao cliente no WhatsApp (sem termos internos)
 */
function buildWhatsAppSummary(customer, sizing, pricing, financials) {
    const name = customer.customerName ? ` *${customer.customerName}*` : '';
    const city = customer.customerCity ? ` (${customer.customerCity})` : '';

    let text = `⚡ *Simulação Preliminar de Energia Solar — Klyfe Electric* ⚡\n`;
    if (name) text += `Cliente:${name}${city}\n`;
    text += `\n`;
    text += `📊 *Dimensionamento Comercial:*\n`;
    text += `• Consumo Projetado: ${sizing.consideredKwh.toLocaleString('pt-BR')} kWh/mês\n`;
    text += `• Usina Sugerida: ${sizing.installedKwp.toFixed(2)} kWp (${sizing.moduleQuantity} módulos de ${sizing.moduleWatts}W)\n`;
    text += `• Geração Estimada: ~${sizing.estimatedGenerationKwh.toLocaleString('pt-BR')} kWh/mês\n`;
    text += `\n`;
    text += `💰 *Investimento Estimado:*\n`;
    text += `• À Vista: R$ ${pricing.finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;

    if (financials.financedAmount > 0 && financials.monthlyInstallment > 0) {
        text += `• Financiamento: Entrada R$ ${financials.downPayment.toLocaleString('pt-BR')} + ${financials.termMonths}x de R$ ${financials.monthlyInstallment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    }

    if (financials.paybackFormatted !== 'N/D') {
        text += `• Retorno Estimado (Payback): ~${financials.paybackFormatted}\n`;
    }

    text += `\n`;
    text += `📌 *Observação:* ${defaultConfig.disclaimers.commercialNotice}\n`;
    text += `📲 Entre em contato com a equipe Klyfe para receber o projeto técnico definitivo.`;

    return text;
}

module.exports = {
    runSolarSimulation,
    buildWhatsAppSummary
};
