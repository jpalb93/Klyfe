'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const path = require('node:path');
const model = require('../public/js/solar-card-model');
const business = require('../config/business');
const { PHONE_SOLAR } = require('../lib/site-tracking');

test('aceita reais digitados em português sem alterar a ordem de grandeza', () => {
    for (const [input, expected] of [['1.000', 1000], ['R$ 1.234,56', 1234.56], ['600,50', 600.5], ['600.50', 600.5], ['50000', 50000]]) {
        assert.equal(model.parseBill(input), expected);
    }
    for (const input of ['', '1.2.3', '600 reais', '-100', 'Infinity', '1e4', '1,000,00']) assert.ok(Number.isNaN(model.parseBill(input)));
});

test('total anual usa a média informada, sem estimar economia ou financiamento', () => {
    for (const amount of [100, 600, 1234.56, 50000]) {
        const result = model.summarizeBill(amount);
        assert.equal(result.bill, amount);
        assert.equal(Math.round(result.yearlyCost * 100), Math.round(amount * 100) * 12);
        assert.equal(result.monthly, undefined);
        assert.equal(result.reduction, undefined);
    }
    for (const bill of [0, 99, -1, 50001, NaN, Infinity]) assert.equal(model.summarizeBill(bill), null);
    assert.equal(model.summarizeBill('600,50').yearlyCost, 7206);
});

test('mensagem leva perfil e conta, sem prometer uma economia ainda não calculada', () => {
    const result = model.summarizeBill(1000);
    const message = model.whatsappMessage('comercial', result);
    assert.match(message, /Minha empresa/);
    assert.match(message, /1\.000,00/);
    assert.match(message, /quero descobrir quanto posso economizar/);
    assert.doesNotMatch(message, /%|Cenário|redução/);
    assert.equal(model.whatsappMessage('inexistente', result), null);
});

test('rota entrega o cartão, destino solar e metadados de compartilhamento', async (t) => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));
    app.locals.business = business;
    app.use(require('../routes/solar-card'));
    const server = await new Promise((resolve, reject) => {
        const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
        instance.on('error', reject);
    });
    t.after(() => new Promise(resolve => server.close(resolve)));
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/energia-solar/cartao');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    const html = await response.text();
    assert.ok(html.includes('data-solar-phone="' + PHONE_SOLAR + '"'));
    assert.ok(html.includes('https://wa.me/' + PHONE_SOLAR));
    assert.match(html, /og:image:width" content="1080/);
    assert.match(html, /solar-card-share\.jpg/);
    assert.match(html, /HOJE, SUA CONTA REPRESENTA/);
    assert.doesNotMatch(html, /name="reduction"|Conta restante|Cenário ilustrativo/);
    assert.match(html, /id="sc-result-view" hidden/);
    assert.doesNotMatch(html, /<input[^>]+name="(?:phone|email|nome)"/);
});
