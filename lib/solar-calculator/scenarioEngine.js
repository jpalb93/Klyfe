/**
 * Motor de Cenários Comerciais da Calculadora Solar Klyfe
 * Gera automaticamente 3 cenários comparativos: Econômico, Recomendado e Conservador/Crescimento.
 */

const { calculateSolarSizing } = require('./calculationEngine');
const { calculateSolarPricing } = require('./pricingEngine');
const defaultConfig = require('../../config/solar-calculator');

/**
 * Gera os 3 cenários comerciais de pré-dimensionamento
 * @param {Object} params Entradas da calculadora
 * @param {Object} config Configurações do sistema
 */
function generateSolarScenarios(params = {}, config = defaultConfig) {
    // 1. Cenário Recomendado (Parâmetros padrão informados)
    const recSizing = calculateSolarSizing(params, config);
    const recPricing = calculateSolarPricing(recSizing, params, config);

    const recomendado = {
        id: 'recomendado',
        title: 'Recomendado (Ideal Klyfe)',
        description: 'Dimensionamento ideal com margem de crescimento e ótimo retorno.',
        consideredKwh: recSizing.consideredKwh,
        kwp: recSizing.installedKwp,
        moduleQuantity: recSizing.moduleQuantity,
        moduleWatts: recSizing.moduleWatts,
        generationKwh: recSizing.estimatedGenerationKwh,
        price: recPricing.finalPrice,
        pricePerKwp: recPricing.pricePerKwp,
        coveragePercent: recSizing.coveragePercent
    };

    // 2. Cenário Econômico (Menor sistema viável sem margem futura)
    const ecoParams = { ...params, growthMarginPercent: 0 };
    const ecoSizing = calculateSolarSizing(ecoParams, config);
    const ecoPricing = calculateSolarPricing(ecoSizing, ecoParams, config);

    const economico = {
        id: 'economico',
        title: 'Econômico (Entrada)',
        description: 'Atende ao consumo estrito sem margem de expansão.',
        consideredKwh: ecoSizing.consideredKwh,
        kwp: ecoSizing.installedKwp,
        moduleQuantity: ecoSizing.moduleQuantity,
        moduleWatts: ecoSizing.moduleWatts,
        generationKwh: ecoSizing.estimatedGenerationKwh,
        price: ecoPricing.finalPrice,
        pricePerKwp: ecoPricing.pricePerKwp,
        coveragePercent: ecoSizing.coveragePercent
    };

    // 3. Cenário Conservador / Crescimento (+15% a +20% de margem)
    const currentMargin = Number(params.growthMarginPercent) || 0;
    const consMargin = Math.max(currentMargin + 15, 20);
    const consParams = { ...params, growthMarginPercent: consMargin };
    const consSizing = calculateSolarSizing(consParams, config);
    const consPricing = calculateSolarPricing(consParams, consParams, config);

    const conservador = {
        id: 'conservador',
        title: 'Conservador / Expansão',
        description: `Prevê margem robusta (${consMargin}%) para novos equipamentos e ar-condicionado.`,
        consideredKwh: consSizing.consideredKwh,
        kwp: consSizing.installedKwp,
        moduleQuantity: consSizing.moduleQuantity,
        moduleWatts: consSizing.moduleWatts,
        generationKwh: consSizing.estimatedGenerationKwh,
        price: consPricing.finalPrice,
        pricePerKwp: consPricing.pricePerKwp,
        coveragePercent: consSizing.coveragePercent
    };

    return {
        economico,
        recomendado,
        conservador
    };
}

module.exports = {
    generateSolarScenarios
};
