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
        return growth.map(({type, quantity, detail}) => {
            if (type === 'other') {
                const cleaned = String(detail ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);
                if (!cleaned) return 'Pretendo aumentar meu consumo com outro equipamento.';
                return 'Pretendo aumentar meu consumo com ' + cleaned + (/[.!?]$/.test(cleaned) ? '' : '.');
            }
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
    // "2 aparelhos de ar-condicionado e 1 chuveiro elétrico" (formato que a recepção da Central lê).
    function growthSummary(growth) {
        if (!Array.isArray(growth)) return '';
        const items = growth.map(({type, quantity, detail}) => {
            const n = Number.isInteger(quantity) && quantity > 0 && quantity <= 99 ? quantity : 1;
            if (type === 'air-conditioning') return n + (n > 1 ? ' aparelhos de ar-condicionado' : ' aparelho de ar-condicionado');
            if (type === 'electric-shower') return n + (n > 1 ? ' chuveiros elétricos' : ' chuveiro elétrico');
            if (type === 'electric-car') return n + (n > 1 ? ' carros elétricos' : ' carro elétrico');
            if (type === 'other') return String(detail ?? '').replace(/\s+/g, ' ').trim().replace(/[.!?;]+$/, '').slice(0, 100) || 'outro equipamento';
            return '';
        }).filter(Boolean);
        return items.length > 1 ? items.slice(0, -1).join(', ') + ' e ' + items.at(-1) : (items[0] || '');
    }
    /**
     * Mensagem que o cliente envia no WhatsApp ao fim da triagem do site: curta, em linhas
     * com rótulo. Os rótulos ("Cidade da instalação:", "Conta de luz:", "Novos aparelhos:")
     * são os que a recepção da Central reconhece; assim ela não pergunta de novo.
     */
    function siteLeadMessage({result, growth, name, city, review = false}) {
        const verified = calculate(result?.bill);
        const lines = [review
            ? 'Olá! Fiz a simulação no site da Klyfe e quero avaliar um projeto de energia solar com novos aparelhos.'
            : 'Olá! Fiz a simulação no site da Klyfe e quero um orçamento de energia solar.', ''];
        const cleanName = String(name ?? '').replace(/\s+/g, ' ').trim();
        const cleanCity = String(city ?? '').replace(/\s+/g, ' ').trim().replace(/[.!?;]+$/, '');
        if (cleanName) lines.push('Nome: ' + cleanName);
        if (cleanCity) lines.push('Cidade da instalação: ' + cleanCity);
        if (!verified.error) lines.push('Conta de luz: ' + currency(verified.bill) + ' por mês');
        const planned = growthSummary(growth);
        if (growth === 'none') lines.push('Novos aparelhos: não pretendo instalar por enquanto');
        else if (planned) lines.push('Novos aparelhos: ' + planned);
        return lines.join('\n').trim();
    }
    return Object.freeze({limits, parseAmount, currency, calculate, whatsappMessage, qualification, reviewMessage, growthSummary, siteLeadMessage});
}));
