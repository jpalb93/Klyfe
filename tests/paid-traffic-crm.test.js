const test = require('node:test');
const assert = require('node:assert/strict');
process.env.AGENTES_CRM_SECRET = 'test-only';
process.env.AGENTES_CRM_URL = 'https://example.invalid';
const {forwardLeadToAgentesCRM} = require('../lib/agentes-crm');
test('CRM contract bounds preserve valid lead delivery with long messages and attribution', async t => {
    let sent;
    t.mock.method(globalThis, 'fetch', async (url,opts) => {
        sent={url, body:JSON.parse(opts.body),headers:opts.headers};
        return {ok:true,json:async()=>({id:'test'})};
    });
    const result=await forwardLeadToAgentesCRM({nome:'Pessoa Teste',telefone:'55999991234',cidade:'x'.repeat(160),mensagem:'y'.repeat(4000),source:'lp-solar-residencial',utm_campaign:'z'.repeat(300),event_id:'lead_test',marketing_consent:'denied'});
    assert.equal(result.ok,true);
    assert.equal(sent.body.phone,'5555999991234');
    assert.equal(sent.body.city.length,120);
    assert.equal(sent.body.message.length,4000);
    assert.equal(sent.body.utmCampaign.length,120);
    assert.equal(sent.body.externalId,'lead_test');
    assert.equal(sent.headers['Idempotency-Key'],'lead_test');
    assert.equal(sent.body.metadata.marketing_consent,'denied');
});
