(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.KlyfeSolarPreview = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';
    const limits = Object.freeze({ minBill: 0.01, maxBill: 1000000, minPriorityBill: 300 });
    function parseAmount(value) {
        if (typeof value === 'number') return value;
        let text = String(value ?? '').trim().replace(/^R\$\s*/, '').replace(/\s/g, '');
        if (!text) return NaN;
        if (text.includes(',')) {
            if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+),\d{1,2}$/.test(text)) return NaN;
            text = text.replace(/\./g, '').replace(',', '.');
        } else if (/^\d{1,3}(?:\.\d{3})+$/.test(text)) text = text.replace(/\./g, '');
        else if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return NaN;
        return Number(text);
    }
    const currency = value => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(value);
    function calculate(billValue) {
        const bill = parseAmount(billValue);
        if (!Number.isFinite(bill) || bill < limits.minBill || bill > limits.maxBill) return {error:'Informe um valor maior que zero e de até R$ 1.000.000.'};
        const cents = Math.round(bill * 100);
        return {bill: cents / 100, yearlyCost: cents * 12 / 100, threeYearCost: cents * 36 / 100, fiveYearCost: cents * 60 / 100};
    }
    function whatsappMessage(result, growth) {
        const verified = calculate(result?.bill);
        if (verified.error) return 'Olá! Vim do site da Klyfe Electric e gostaria de saber como a energia solar pode me ajudar a reduzir minha conta de energia.';
        const growthMessage = describeGrowth(growth);
        return 'Olá! Vi a calculadora no site da Klyfe Electric. Minha conta de energia é de aproximadamente ' + currency(verified.bill) +
            ' por mês e vi que isso representa cerca de ' + currency(verified.yearlyCost) +
            ' por ano. Gostaria de saber quanto poderia economizar instalando energia solar.' +
            (growthMessage ? '\n' + growthMessage : '');
    }
    function qualification(result) {
        if (!result || result.error) return 'pending';
        return result.bill >= limits.minPriorityBill ? 'priority' : 'review';
    }
    const growthMessages = Object.freeze({
        'air-conditioning': 'Pretendo instalar ar-condicionado.',
        'electric-shower': 'Pretendo instalar chuveiro elétrico.',
        'electric-car': 'Pretendo carregar carro elétrico no imóvel.',
        other: 'Pretendo aumentar meu consumo.',
        none: 'Não pretendo aumentar meu consumo por enquanto.'
    });
    function describeGrowth(growth) {
        if (!Array.isArray(growth)) return Object.hasOwn(growthMessages, growth) ? growthMessages[growth] : '';
        return growth.map(({type, quantity}) => {
            if (type === 'other') return 'Pretendo aumentar meu consumo com outro equipamento.';
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return '';
            const plural = quantity > 1;
            if (type === 'air-conditioning') return 'Pretendo instalar ' + quantity + (plural ? ' aparelhos de ar-condicionado.' : ' aparelho de ar-condicionado.');
            if (type === 'electric-shower') return 'Pretendo instalar ' + quantity + (plural ? ' chuveiros elétricos.' : ' chuveiro elétrico.');
            if (type === 'electric-car') return 'Pretendo carregar ' + quantity + (plural ? ' carros elétricos no imóvel.' : ' carro elétrico no imóvel.');
            return '';
        }).filter(Boolean).join('\n');
    }
    function reviewMessage(result, growth = 'other') {
        return 'Olá! Usei a calculadora no site da Klyfe Electric. Minha conta de energia é de aproximadamente ' + currency(result.bill) +
            ' por mês.\n' + (describeGrowth(growth) || growthMessages.other) +
            '\nGostaria de avaliar um projeto solar considerando esse aumento de consumo.';
    }
    return Object.freeze({limits, parseAmount, currency, calculate, whatsappMessage, qualification, reviewMessage});
}));
