/**
 * Motor de Cálculos Técnicos da Calculadora Solar Klyfe
 * Processa consumo atual, histórico de 12 meses, adição de equipamentos,
 * margem de crescimento e dimensionamento fotovoltaico por módulos.
 */

const defaultConfig = require('../../config/solar-calculator');

/**
 * Calcula estatísticas do histórico mensal de consumo (Método B)
 * @param {Array<number>} history Array de até 12 meses de consumo em kWh
 */
function analyzeConsumptionHistory(history) {
    const valid = (history || []).map(v => Number(v)).filter(v => !isNaN(v) && v > 0);
    if (valid.length === 0) {
        return {
            count: 0,
            average: 0,
            median: 0,
            min: 0,
            max: 0,
            amplitude: 0,
            trend: 'sem_dados',
            percentVariation: 0,
            seasonality: 'sem_dados'
        };
    }

    const sorted = [...valid].sort((a, b) => a - b);
    const sum = valid.reduce((acc, val) => acc + val, 0);
    const average = sum / valid.length;

    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const amplitude = max - min;

    // Tendência simples (comparando primeira metade com segunda metade)
    let trend = 'estavel';
    let percentVariation = 0;

    if (valid.length >= 2) {
        const first = valid[0];
        const last = valid[valid.length - 1];
        percentVariation = first > 0 ? ((last - first) / first) * 100 : 0;

        if (percentVariation > 10) trend = 'crescimento';
        else if (percentVariation < -10) trend = 'reducao';
    }

    let seasonality = 'normal';
    if (amplitude > average * 0.4) {
        seasonality = 'alta_variacao';
    }

    return {
        count: valid.length,
        average: Math.round(average * 10) / 10,
        median: Math.round(median * 10) / 10,
        min: Math.round(min * 10) / 10,
        max: Math.round(max * 10) / 10,
        amplitude: Math.round(amplitude * 10) / 10,
        trend,
        percentVariation: Math.round(percentVariation * 10) / 10,
        seasonality
    };
}

/**
 * Calcula consumo de um equipamento individual
 * Formula: Consumo mensal = quantidade × potência elétrica em kW × horas/dia × dias/mês × fator de utilização
 */
function calculateEquipmentItemConsumption(item, config = defaultConfig) {
    const quantity = Math.max(1, Number(item.quantity) || 1);
    let powerW = Number(item.powerW) || 0;

    if (item.unit === 'kW') {
        powerW = powerW * 1000;
    }

    let utilizationFactor = Number(item.utilizationFactor);
    if (isNaN(utilizationFactor) || utilizationFactor <= 0) {
        utilizationFactor = 0.65;
    }

    // Ajuste por tecnologia de ar-condicionado se aplicável
    if (item.technology && config.acTechnologyFactors && config.acTechnologyFactors[item.technology]) {
        utilizationFactor = config.acTechnologyFactors[item.technology];
    }

    const hoursPerDay = Math.max(0, Math.min(24, Number(item.hoursPerDay) || 0));
    const daysPerMonth = Math.max(0, Math.min(31, Number(item.daysPerMonth) || 0));

    const powerKw = powerW / 1000;
    const monthlyKwh = quantity * powerKw * hoursPerDay * daysPerMonth * utilizationFactor;

    return {
        id: item.id || `eq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: item.name || 'Equipamento',
        quantity,
        powerW: Math.round(powerW),
        powerKw: Math.round(powerKw * 1000) / 1000,
        hoursPerDay,
        daysPerMonth,
        utilizationFactor,
        technology: item.technology || 'nao_informado',
        isManualPower: !!item.isManualPower,
        monthlyKwh: Math.round(monthlyKwh * 10) / 10,
        observation: item.observation || ''
    };
}

/**
 * Calcula o pré-dimensionamento fotovoltaico completo
 * @param {Object} params Entradas da calculadora
 * @param {Object} config Configurações do sistema
 */
function calculateSolarSizing(params = {}, config = defaultConfig) {
    // 1. Apuração do consumo atual (kWh/mês)
    let currentKwh = 0;
    const method = params.method || 'A';
    let historyStats = null;

    if (method === 'B' && Array.isArray(params.monthlyHistory)) {
        historyStats = analyzeConsumptionHistory(params.monthlyHistory);
        currentKwh = historyStats.average || 0;
    } else {
        currentKwh = Number(params.currentKwh) || 0;
    }

    // 2. Apuração do consumo dos novos equipamentos
    const rawEquipmentList = Array.isArray(params.equipmentList) ? params.equipmentList : [];
    const processedEquipment = rawEquipmentList.map(eq => calculateEquipmentItemConsumption(eq, config));
    const equipmentKwhTotal = processedEquipment.reduce((acc, eq) => acc + eq.monthlyKwh, 0);

    // 3. Consumo manual adicional (kWh/mês)
    const additionalManualKwh = Math.max(0, Number(params.additionalManualKwh) || 0);

    // Subtotal de consumo projetado sem margem
    const rawProjectedKwh = currentKwh + equipmentKwhTotal + additionalManualKwh;

    // 4. Margem de crescimento futura (%)
    const growthMarginPercent = Math.max(0, Number(params.growthMarginPercent) || 0);
    const consideredKwh = rawProjectedKwh * (1 + growthMarginPercent / 100);

    const roundedConsideredKwh = Math.round(consideredKwh);

    // 5. Interpolação linear da potência de referência (kWp) baseada na tabela comercial
    const kwpReference = calculateReferenceKwp(roundedConsideredKwh, config.commercialTable);

    // 6. Dimensionamento por módulos fotovoltaicos
    const selectedModuleWatts = Number(params.moduleWatts) || 600;
    const moduleQuantity = Math.ceil((kwpReference * 1000) / selectedModuleWatts);
    const installedKwp = Math.round(((moduleQuantity * selectedModuleWatts) / 1000) * 100) / 100;

    // Diferença percentual de dimensionamento real vs tabela de referência
    const sizingDiffPercent = kwpReference > 0
        ? Math.round(((installedKwp - kwpReference) / kwpReference) * 100 * 10) / 10
        : 0;

    // 7. Geração mensal estimada
    const productivity = Number(params.productivity) || config.defaultProductivity || 130; // kWh/kWp/mês
    const estimatedGenerationKwh = Math.round(installedKwp * productivity);

    // Cobertura do consumo projetado
    const coveragePercent = roundedConsideredKwh > 0
        ? Math.round((estimatedGenerationKwh / roundedConsideredKwh) * 100 * 10) / 10
        : 0;

    return {
        currentKwh: Math.round(currentKwh),
        historyStats,
        equipmentList: processedEquipment,
        equipmentKwhTotal: Math.round(equipmentKwhTotal * 10) / 10,
        additionalManualKwh,
        rawProjectedKwh: Math.round(rawProjectedKwh),
        growthMarginPercent,
        consideredKwh: roundedConsideredKwh,
        kwpReference: Math.round(kwpReference * 100) / 100,
        moduleWatts: selectedModuleWatts,
        moduleQuantity,
        installedKwp,
        sizingDiffPercent,
        productivity,
        estimatedGenerationKwh,
        coveragePercent
    };
}

/**
 * Interpolação linear da tabela comercial para obter a Potência (kWp) de referência
 */
function calculateReferenceKwp(kwh, table) {
    if (!table || table.length === 0) return 0;
    if (kwh <= 0) return 0;

    const sorted = [...table].sort((a, b) => a.consumoKwh - b.consumoKwh);

    // Consumo abaixo do primeiro ponto
    if (kwh <= sorted[0].consumoKwh) {
        // Proporção simples com origem em (0,0)
        return (kwh / sorted[0].consumoKwh) * sorted[0].kwp;
    }

    // Consumo acima do último ponto
    if (kwh >= sorted[sorted.length - 1].consumoKwh) {
        const last = sorted[sorted.length - 1];
        const prev = sorted[sorted.length - 2];
        const slope = (last.kwp - prev.kwp) / (last.consumoKwh - prev.consumoKwh);
        return last.kwp + (kwh - last.consumoKwh) * slope;
    }

    // Encontra o intervalo exato para interpolação linear
    for (let i = 0; i < sorted.length - 1; i++) {
        const p1 = sorted[i];
        const p2 = sorted[i + 1];
        if (kwh >= p1.consumoKwh && kwh <= p2.consumoKwh) {
            const factor = (kwh - p1.consumoKwh) / (p2.consumoKwh - p1.consumoKwh);
            return p1.kwp + factor * (p2.kwp - p1.kwp);
        }
    }

    return 0;
}

module.exports = {
    analyzeConsumptionHistory,
    calculateEquipmentItemConsumption,
    calculateSolarSizing,
    calculateReferenceKwp
};
