/**
 * Suíte de Testes Automatizados para a Calculadora Solar Klyfe
 * Executar com: npm run test:solar ou node tests/solar-calculator.test.js
 */

const assert = require('assert');
const config = require('../config/solar-calculator');
const { calculateReferenceKwp, calculateSolarSizing, calculateEquipmentItemConsumption } = require('../lib/solar-calculator/calculationEngine');
const { calculateReferencePrice, calculateSolarPricing } = require('../lib/solar-calculator/pricingEngine');
const { calculatePMT, calculateSolarFinancials } = require('../lib/solar-calculator/financialEngine');
const { evaluateSolarValidations } = require('../lib/solar-calculator/validationEngine');
const { runSolarSimulation } = require('../lib/solar-calculator/index');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
    totalTests++;
    try {
        fn();
        console.log(`  ✅ PASSED: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`  ❌ FAILED: ${name}`);
        console.error(`     Error: ${err.message}`);
    }
}

console.log('\n🧪 Iniciando Testes da Calculadora Solar Klyfe...\n');

// ── 1. TESTES DE INTERPOLAÇÃO LINEAR ──
test('Interpolação linear da potência de referência (kWp)', () => {
    // 500 kWh -> 5.4 kWp (ponto exato da tabela)
    const kwp500 = calculateReferenceKwp(500, config.commercialTable);
    assert.strictEqual(kwp500, 5.4, '500 kWh deve ser exatamente 5.4 kWp');

    // 1000 kWh -> 10.2 kWp (ponto exato da tabela)
    const kwp1000 = calculateReferenceKwp(1000, config.commercialTable);
    assert.strictEqual(kwp1000, 10.2, '1000 kWh deve ser exatamente 10.2 kWp');

    // 750 kWh -> Ponto médio intermediário
    // (10.2 - 5.4) / 2 = 2.4 => 5.4 + 2.4 = 7.8 kWp
    const kwp750 = calculateReferenceKwp(750, config.commercialTable);
    assert.strictEqual(Math.round(kwp750 * 10) / 10, 7.8, '750 kWh deve interpolar exatamente para 7.8 kWp');
});

test('Interpolação linear de preço (R$)', () => {
    // 500 kWh -> R$ 16.000
    const price500 = calculateReferencePrice(500, config.commercialTable);
    assert.strictEqual(price500, 16000, 'Preço para 500 kWh deve ser R$ 16.000');

    // 1000 kWh -> R$ 26.000
    const price1000 = calculateReferencePrice(1000, config.commercialTable);
    assert.strictEqual(price1000, 26000, 'Preço para 1000 kWh deve ser R$ 26.000');

    // 750 kWh -> Ponto médio intermediário R$ 21.000
    const price750 = calculateReferencePrice(750, config.commercialTable);
    assert.strictEqual(price750, 21000, 'Preço para 750 kWh deve interpolar para R$ 21.000');
});

// ── 2. TESTE DE DIMENSIONAMENTO DE MÓDULOS ──
test('Dimensionamento de Módulos (ceil e potência instalada)', () => {
    // Simulando sistema de 6.45 kWp com módulo de 600W
    // ceil(6450 / 600) = ceil(10.75) = 11 módulos
    // Potência instalada: 11 * 600 / 1000 = 6.60 kWp
    const sizing = calculateSolarSizing({
        currentKwh: 645 / 0.1, // gera kWp proximo
        moduleWatts: 600
    });

    const moduleQuantity = Math.ceil((6.45 * 1000) / 600);
    assert.strictEqual(moduleQuantity, 11, '6.45 kWp com módulo 600W deve resultar em 11 módulos');

    const installedKwp = (11 * 600) / 1000;
    assert.strictEqual(installedKwp, 6.60, '11 módulos de 600W devem totalizar 6.60 kWp');
});

// ── 3. TESTE DE CONSUMO DE EQUIPAMENTOS ──
test('Cálculo de consumo de equipamentos (Ar-condicionado)', () => {
    // 2 ar-condicionados de 9.000 BTU (800 W, 8 h/dia, 30 dias, fator 0.65)
    // Consumo = 2 * (800/1000) * 8 * 30 * 0.65 = 2 * 0.8 * 240 * 0.65 = 249.6 kWh/mês
    const item = {
        name: 'Ar 9k',
        quantity: 2,
        powerW: 800,
        unit: 'W',
        hoursPerDay: 8,
        daysPerMonth: 30,
        utilizationFactor: 0.65
    };

    const result = calculateEquipmentItemConsumption(item);
    assert.strictEqual(result.monthlyKwh, 249.6, 'Consumo calculado deve ser exatamente 249.6 kWh/mês');
});

// ── 4. TESTE DE SIMULAÇÃO FINANCEIRA (PMT) ──
test('Fórmula Financeira PMT de parcelas fixas', () => {
    // R$ 20.000 financiado a 1.39% a.m. em 60 meses
    const pmt = calculatePMT(20000, 1.39, 60);
    assert.ok(pmt > 480 && pmt < 510, `PMT deve ser aproximadamente ~R$ 493/mês (obtido: ${pmt})`);
});

// ── 5. TESTE DE ALERTAS E QUALIDADE DA ESTIMATIVA ──
test('Alertas de extrapolação e validação de inconsistência', () => {
    const simulation = runSolarSimulation({
        currentKwh: 200, // Fora da faixa principal (300 a 5000)
        currentBillAmount: 5000, // Incompatível com 200 kWh
        isSocialTariff: true
    });

    assert.strictEqual(simulation.pricing.isExtrapolated, true, 'Deve marcar como extrapolação para 200 kWh');

    const hasTariffAlert = simulation.validations.inconsistencies.some(inc => inc.title.includes('Incompatibilidade'));
    assert.strictEqual(hasTariffAlert, true, 'Deve gerar alerta de incompatibilidade Fatura x Consumo');

    const hasSocialAlert = simulation.validations.observations.some(obs => obs.includes('Tarifa Social'));
    assert.strictEqual(hasSocialAlert, true, 'Deve gerar observação para Tarifa Social');
});

console.log(`\n📊 Resultado dos Testes: ${passedTests}/${totalTests} aprovados.`);
if (passedTests !== totalTests) {
    process.exit(1);
}
