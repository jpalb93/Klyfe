(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.KlyfeSolarCard = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    const limits = Object.freeze({ min: 100, max: 50000 });
    const profiles = Object.freeze({ residencial: 'Minha casa', comercial: 'Minha empresa', rural: 'Propriedade rural' });

    function parseBill(value) {
        if (typeof value === 'number') return value;
        let text = String(value == null ? '' : value).trim().replace(/^R\$\s*/, '').replace(/\s/g, '');
        if (!text) return NaN;
        if (text.includes(',')) {
            if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+),\d{1,2}$/.test(text)) return NaN;
            text = text.replace(/\./g, '').replace(',', '.');
        } else if (/^\d{1,3}(?:\.\d{3})+$/.test(text)) {
            text = text.replace(/\./g, '');
        } else if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return NaN;
        return Number(text);
    }

    function summarizeBill(bill) {
        const amount = parseBill(bill);
        if (!Number.isFinite(amount) || amount < limits.min || amount > limits.max) return null;
        const billCents = Math.round(amount * 100);
        return Object.freeze({
            bill: billCents / 100,
            yearlyCost: billCents * 12 / 100
        });
    }

    function currency(amount) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(amount);
    }

    function whatsappMessage(profile, result) {
        if (!profiles[profile] || !result) return null;
        const verified = summarizeBill(result.bill);
        if (!verified) return null;
        return 'Olá! Vim do cartão solar da Klyfe e quero descobrir quanto posso economizar com energia solar.\n\n' +
            'Perfil: ' + profiles[profile] + '\n' +
            'Conta média: ' + currency(verified.bill) + '/mês\n\n' +
            'Podem preparar uma avaliação para meu imóvel?';
    }

    return Object.freeze({ limits, profiles, parseBill, summarizeBill, currency, whatsappMessage });
}));
