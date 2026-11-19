const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const meta = require('../lib/meta-capi');
const calls = []; let failCRM = false;
require.cache[require.resolve('../lib/meta-capi')].exports = { ...meta, sendMetaCapiEvent: async e => { calls.push(['meta', e]); return { ok: true }; } };
require('../lib/agentes-crm');
require.cache[require.resolve('../lib/agentes-crm')].exports = { forwardLeadToAgentesCRM: async e => { calls.push(['crm', e]); return { ok: !failCRM }; } };
const app = express(); app.use(express.json()); app.use(require('../routes/api-tracking'));
let server, origin;
test.before(async () => { server = app.listen(0, '127.0.0.1'); await new Promise(r => server.once('listening', r)); origin = 'http://127.0.0.1:' + server.address().port; });
test.after(() => new Promise(r => server.close(r)));
test.beforeEach(() => { calls.length = 0; failCRM = false; });
async function post(path, body) { const res = await fetch(origin + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return { status: res.status, body: await res.json() }; }
const lead = { nome: 'Pessoa Teste', telefone: '83999991234', cidade: 'Campina Grande', servico: 'Energia Solar Fotovoltaica', event_id: 'lead_test', marketing_consent: 'granted' };

test('all five solar forms may omit email, persist before CAPI and share event ID', async () => {
    for (const source of Object.keys(meta.LP_SOURCE_CONTENT_NAME)) {
        calls.length = 0;
        const result = await post('/contato', { ...lead, source });
        assert.equal(result.status, 200, source);
        assert.equal(result.body.crm_ok, true); assert.equal(result.body.capi_ok, true);
        assert.equal(calls.map(c => c[0]).join(','), 'crm,meta');
        assert.equal(calls[1][1].eventId, 'lead_test');
    }
});
test('invalid optional email and missing city rejected; ordinary contact still requires email', async () => {
    for (const body of [{...lead, source:'lp-solar-residencial', email:'invalid'}, {...lead,source:'lp-solar-residencial',cidade:''}, lead]) {
        assert.equal((await post('/contato', body)).status, 400);
    }
    assert.equal(calls.length, 0);
});
test('solar simulator forwards the equipment field on its own line', async () => {
    const mensagem = 'Olá! Quero um orçamento de energia solar.\r\nConta de luz: R$ 300,00 por mês\r\nNovos aparelhos: 2 aparelhos de ar-condicionado';
    const result = await post('/contato', { ...lead, source: 'site-solar-triage', mensagem });
    assert.equal(result.status, 200);
    assert.equal(calls[0][0], 'crm');
    assert.equal(calls[0][1].mensagem, mensagem.replace(/\r\n/g, '\n'));
});
test('failed persistence cannot emit conversion', async () => {
    failCRM = true;
    assert.equal((await post('/contato', {...lead, source:'lp-solar-residencial'})).status, 502);
    assert.equal(calls.map(c=>c[0]).join(','), 'crm');
});
test('declined consent still registers requested lead, without Meta', async () => {
    const result = await post('/contato', {...lead, source:'lp-solar-residencial', marketing_consent:'denied'});
    assert.equal(result.status, 200); assert.equal(result.body.capi_ok, false);
    assert.equal(calls.map(c=>c[0]).join(','), 'crm');
});
test('browser endpoint requires consent and cannot fabricate Lead conversions', async () => {
    assert.equal((await post('/api/tracking/event', {event_name:'PageView'})).body.capi_skipped, true);
    assert.equal(calls.length,0);
    assert.equal((await post('/api/tracking/event', {event_name:'Lead', marketing_consent:'granted'})).status,400);
    const result = await post('/api/tracking/event', {event_name:'Contact',event_id:'contact_test', marketing_consent:'granted',custom_data:{content_category:'solar'}});
    assert.equal(result.body.capi_ok,true); assert.equal(calls[0][1].eventId,'contact_test');
});
