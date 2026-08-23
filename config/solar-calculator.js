/**
 * Configuração Centralizada da Calculadora Solar Klyfe
 * Permite alteração de parâmetros comerciais, tabela de referência,
 * módulos, biblioteca de equipamentos e premissas financeiras sem alterar o código dos componentes.
 */

const solarCalculatorConfig = {
    // Tabela comercial inicial da Klyfe
    // Interpolação linear será usada para valores intermediários
    commercialTable: [
        { consumoKwh: 300, kwp: 3.0, preco: 10000 },
        { consumoKwh: 500, kwp: 5.4, preco: 16000 },
        { consumoKwh: 1000, kwp: 10.2, preco: 26000 },
        { consumoKwh: 1500, kwp: 15.0, preco: 39000 },
        { consumoKwh: 2000, kwp: 20.4, preco: 50000 },
        { consumoKwh: 2500, kwp: 25.2, preco: 60000 },
        { consumoKwh: 3000, kwp: 30.0, preco: 70000 },
        { consumoKwh: 5000, kwp: 48.0, preco: 113000 }
    ],

    // Módulos fotovoltaicos disponíveis (em Watts)
    modules: [
        { label: '550 W - Módulo Monocristalino High Efficiency', watts: 550 },
        { label: '580 W - Módulo N-Type TOPCon', watts: 580 },
        { label: '590 W - Módulo N-Type TOPCon High Efficiency', watts: 590 },
        { label: '600 W - Módulo N-Type Bifacial (Padrão Klyfe)', watts: 600, default: true },
        { label: '610 W - Módulo N-Type High Efficiency', watts: 610 },
        { label: '620 W - Módulo High Power Ultra', watts: 620 },
        { label: '650 W - Módulo Industrial High Power', watts: 650 }
    ],

    // Biblioteca de equipamentos predefinidos (Presets Klyfe)
    equipmentPresets: {
        'ar_9k': {
            name: 'Ar-condicionado 9.000 BTU/h',
            category: 'climatizacao',
            powerW: 800,
            utilizationFactor: 0.65,
            defaultHoursPerDay: 8,
            defaultDaysPerMonth: 30,
            unit: 'W',
            isBtu: true,
            btuValue: 9000
        },
        'ar_12k': {
            name: 'Ar-condicionado 12.000 BTU/h',
            category: 'climatizacao',
            powerW: 1000,
            utilizationFactor: 0.65,
            defaultHoursPerDay: 8,
            defaultDaysPerMonth: 30,
            unit: 'W',
            isBtu: true,
            btuValue: 12000
        },
        'ar_18k': {
            name: 'Ar-condicionado 18.000 BTU/h',
            category: 'climatizacao',
            powerW: 1500,
            utilizationFactor: 0.65,
            defaultHoursPerDay: 8,
            defaultDaysPerMonth: 30,
            unit: 'W',
            isBtu: true,
            btuValue: 18000
        },
        'ar_24k': {
            name: 'Ar-condicionado 24.000 BTU/h',
            category: 'climatizacao',
            powerW: 2000,
            utilizationFactor: 0.65,
            defaultHoursPerDay: 8,
            defaultDaysPerMonth: 30,
            unit: 'W',
            isBtu: true,
            btuValue: 24000
        },
        'chuveiro': {
            name: 'Chuveiro Elétrico',
            category: 'aquecimento',
            powerW: 5500,
            utilizationFactor: 1.00,
            defaultHoursPerDay: 0.75, // ~45 min total da casa/dia
            defaultDaysPerMonth: 30,
            unit: 'W'
        },
        'geladeira': {
            name: 'Geladeira Residencial',
            category: 'refrigeracao',
            powerW: 150,
            utilizationFactor: 0.35, // ciclo do compressor
            defaultHoursPerDay: 24,
            defaultDaysPerMonth: 30,
            unit: 'W'
        },
        'freezer': {
            name: 'Freezer Vertical/Horizontal',
            category: 'refrigeracao',
            powerW: 200,
            utilizationFactor: 0.45,
            defaultHoursPerDay: 24,
            defaultDaysPerMonth: 30,
            unit: 'W'
        },
        'bomba': {
            name: 'Bomba d\'água / Piscina',
            category: 'motores',
            powerW: 750,
            utilizationFactor: 0.80,
            defaultHoursPerDay: 4,
            defaultDaysPerMonth: 30,
            unit: 'W'
        },
        'motor': {
            name: 'Motor Elétrico Comercial/Industrial',
            category: 'motores',
            powerW: 1500,
            utilizationFactor: 0.80,
            defaultHoursPerDay: 6,
            defaultDaysPerMonth: 22,
            unit: 'W'
        },
        'iluminacao': {
            name: 'Iluminação Total (Conjunto)',
            category: 'iluminacao',
            powerW: 300,
            utilizationFactor: 0.50,
            defaultHoursPerDay: 8,
            defaultDaysPerMonth: 30,
            unit: 'W'
        },
        'outro': {
            name: 'Equipamento Personalizado',
            category: 'outros',
            powerW: 1000,
            utilizationFactor: 0.70,
            defaultHoursPerDay: 4,
            defaultDaysPerMonth: 30,
            unit: 'W'
        }
    },

    // Fatores de ajuste para tecnologia de ar-condicionado
    acTechnologyFactors: {
        'inverter': 0.55,      // Redução de consumo por modulamento
        'convencional': 0.75,  // Fator maior por ciclos ON/OFF
        'nao_informado': 0.65  // Fator padrão
    },

    // Fator de produtividade regional específica (kWh/kWp/mês)
    // Default 130 kWh/kWp/mês representa a média da região Nordeste / PB
    defaultProductivity: 130,

    // Faixas de R$/kWp esperadas para alertas comerciais
    pricePerKwpLimits: {
        minUsual: 2200, // R$/kWp mínimo recomendado antes de alertar desconto excessivo
        maxUsual: 4500  // R$/kWp máximo antes de alertar valor elevado
    },

    // Prazos de financiamento sugeridos (em meses)
    financeTerms: [24, 36, 48, 60, 72, 84, 96],
    defaultInterestRateMonthly: 1.39, // Taxa média padrão em % ao mês

    // Disclaimers obrigatórios
    disclaimers: {
        commercialNotice: "Pré-dimensionamento comercial. Confirmar em análise técnica antes da proposta definitiva.",
        btuTooltip: "BTU/h representa capacidade térmica, não consumo elétrico. A potência usada no cálculo é uma estimativa e pode variar conforme modelo, eficiência, tecnologia Inverter e condições de operação.",
        socialTariffNotice: "Cliente enquadrado em Tarifa Social. O valor atual da fatura pode não representar proporcionalmente o consumo energético. A viabilidade econômica do sistema deve ser analisada com cautela.",
        paybackDisclaimer: "Payback simples, sem considerar integralmente reajustes tarifários, degradação, custo de capital, manutenção ou alterações regulatórias.",
        tableExtrapolationNotice: "Estimativa fora da faixa principal da tabela comercial da Klyfe. Revisão manual recomendada."
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = solarCalculatorConfig;
}
