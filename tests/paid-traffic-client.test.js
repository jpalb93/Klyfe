const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const source = fs.readFileSync(require.resolve('../public/js/tracking.js'), 'utf8');

function browser({ consent = 'granted', category = 'solar', beaconAccepted = true, failForm = false, pending, thankYou = false, cfg = {} } = {}) {
    const store = new Map(), session = new Map(), cookies = new Map(), clicks = [], requests = [], beacons = [];
    if (consent) store.set('klyfe_cookie_consent', consent);
    if (pending) session.set('klyfe_lp_solar_lead', JSON.stringify(pending));
    const storage = map => ({ getItem: k => map.get(k) || null, setItem: (k, v) => map.set(k, String(v)), removeItem: k => map.delete(k) });
    const document = { readyState: 'complete', getElementById: () => null,
        createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore() {} } }],
        addEventListener: (event, fn) => { if (event === 'click') clicks.push(fn); }, dispatchEvent() {},
    };
    Object.defineProperty(document, 'cookie', {
        get: () => [...cookies].map(([k,v]) => k + '=' + v).join('; '),
        set: raw => { const [pair] = raw.split(';'); const i = pair.indexOf('='); cookies.set(pair.slice(0,i), pair.slice(i+1)); },
    });
    const ctx = { document, URLSearchParams, Blob, crypto, Event: class {}, CustomEvent: class {},
        localStorage: storage(store), sessionStorage: storage(session), dispatchEvent() {},
        location: { pathname: '/', href: 'https://www.klyfeelectric.com.br/', search: '?utm_source=meta&utm_campaign=solar&fbclid=test_click' },
        navigator: { sendBeacon: (url, body) => { if (beaconAccepted) beacons.push(body); return beaconAccepted; } },
        fetch: async (url, opts) => {
            requests.push({ url, body: JSON.parse(opts.body) });
            if (url === '/contato' && failForm) { failForm = false; throw new Error('network error'); }
            return { ok: true, json: async () => ({ success: true, event_id: JSON.parse(opts.body).event_id }) };
        },
        __KLYFE_TRACKING__: { metaPixelId: 'test-pixel', capiEnabled: true, contentCategory: category, fireViewContent: category === 'solar' && !thankYou, expectLpLead: thankYou, ...cfg },
    };
    ctx.window = ctx; vm.runInNewContext(source, ctx);
    return { ctx, store, session, requests, cookies,
        events: () => Array.from(ctx.fbq?.queue || []).filter(e => e[0] === 'track'),
        async capi() { return Promise.all(beacons.map(async b => JSON.parse(await b.text()))); },
        click(category, contentName) {
            const anchor = { getAttribute: k => k === 'href' ? 'https://wa.me/5583991430929' : k === 'data-content-category' ? category : k === 'data-content-name' ? contentName : null };
            clicks.forEach(fn => fn({ target: { closest: s => s === 'a[href]' ? anchor : null } }));
        },
    };
}

test('solar visit and WhatsApp share browser/server IDs and attribution', async () => {
    const b = browser(); b.click();
    assert.equal(b.events().map(e => e[1]).join(','), 'PageView,ViewContent,Contact');
    const capi = await b.capi();
    for (const e of b.events()) assert.ok(capi.some(s => s.event_name === e[1] && s.event_id === e[3].eventID));
    assert.ok(capi.every(e => e.marketing_consent === 'granted'));
    assert.equal(b.ctx.KlyfeTracking.getCampaignParams().utm_campaign, 'solar');
    assert.match(b.ctx.KlyfeTracking.getMetaCookies().fbc, /test_click$/);
});

test('calculator contact keeps a single deduplicated Contact with component attribution', async () => {
    const b=browser(); b.click('solar','solar-calculator-study');
    const events=b.events().filter(e=>e[1]==='Contact');
    assert.equal(events.length,1); assert.equal(events[0][2].content_name,'solar-calculator-study');
    const contact=(await b.capi()).filter(e=>e.event_name==='Contact');
    assert.equal(contact.length,1); assert.equal(contact[0].event_id,events[0][3].eventID);
    assert.equal(contact[0].custom_data.content_name,'solar-calculator-study');
    assert.equal(b.events().some(e=>e[1]==='Lead'),false);
    const denied=browser({consent:'denied'}); denied.click('solar','solar-calculator-study');
    assert.equal(denied.events().length,0); assert.equal((await denied.capi()).length,0);
});

test('calculator analytics use only allowlisted event names and contain no amounts or personal data', () => {
    const b=browser();
    const names=['calculator_value_selected','calculator_value_entered','calculator_result_viewed','calculator_whatsapp_click'];
    for (const name of names) assert.equal(b.ctx.KlyfeTracking.trackCalculatorEvent(name,{bill:850,email:'private@example.com'}),true);
    assert.equal(b.ctx.KlyfeTracking.trackCalculatorEvent('Lead'),false);
    const emitted=Array.from(b.ctx.dataLayer).filter(e=>names.includes(e.event));
    assert.equal(emitted.length,4);
    for (const e of emitted) assert.equal(Object.keys(e).sort().join(','),'content_category,content_name,event');
    assert.doesNotMatch(JSON.stringify(emitted),/850|private@example/);
    const denied=browser({consent:'denied'});
    assert.equal(denied.ctx.KlyfeTracking.trackCalculatorEvent(names[0]),false);
});
test('explicit solar contact on mixed home, other services excluded', async () => {
    const b = browser({ category: 'geral' }); b.click('engenharia'); b.click('solar');
    assert.equal(b.events().map(e => e[1]).join(','), 'PageView,Contact');
    assert.equal((await b.capi()).at(-1).custom_data.content_category, 'solar');
});
test('unknown/denied consent blocks Pixel, CAPI and pending personal data; accepting starts once', async () => {
    for (const consent of [null, 'denied']) {
        const b = browser({ consent }); b.click('solar');
        b.ctx.KlyfeTracking.sendCapi('Contact', 'blocked');
        await b.ctx.KlyfeTracking.submitLpLead({ source: 'lp-solar-residencial', redirect: false });
        assert.equal(b.events().length, 0); assert.equal((await b.capi()).length, 0);
        assert.equal(b.session.has('klyfe_lp_solar_lead'), false);
        b.ctx.KlyfeConsent.accept(); b.ctx.KlyfeConsent.accept();
        assert.equal(b.events().map(e => e[1]).join(','), 'PageView,ViewContent');
    }
});
test('beacon queue refusal falls back to keepalive fetch', () => {
    const b = browser({ beaconAccepted: false });
    assert.equal(b.requests.filter(r => r.url === '/api/tracking/event').length, 2);
});
test('failed form cannot create pending conversion; retry keeps ID and successful Lead matches CRM ID', async () => {
    const b = browser({ failForm: true });
    const lead = { source: 'lp-solar-residencial', nome: 'Pessoa Teste', telefone: '83999991234', cidade: 'Campina Grande', redirect: false };
    await assert.rejects(b.ctx.KlyfeTracking.submitLpLead(lead));
    assert.equal(b.session.has('klyfe_lp_solar_lead'), false);
    assert.equal(b.events().filter(e => e[1] === 'Lead').length, 0);
    await b.ctx.KlyfeTracking.submitLpLead(lead);
    const forms = b.requests.filter(r => r.url === '/contato');
    assert.equal(forms[0].body.event_id, forms[1].body.event_id);
    assert.equal(forms[1].body.marketing_consent, 'granted');
    assert.equal(forms[1].body.utm_source, 'meta');
    const event = b.events().find(e => e[1] === 'Lead');
    assert.equal(event[3].eventID, forms[1].body.event_id);
    assert.equal(JSON.parse(b.session.get('klyfe_lp_solar_lead')).phone, '');
    b.ctx.KlyfeConsent.deny();
    assert.equal(b.session.has('klyfe_lp_solar_lead'), false);
    assert.ok(Array.from(b.ctx.fbq.queue).some(e => e[0] === 'consent' && e[1] === 'revoke'));
});

test('thank-you requires fresh confirmed pending lead and never repeats on reload', () => {
    const pending = { event_id: 'confirmed', ts: Date.now(), phone: '83999991234', firstName:'Pessoa', lastName:'Teste' };
    const b = browser({pending, thankYou:true});
    assert.equal(b.events().filter(e=>e[1]==='Lead').length,1);
    const saved=JSON.parse(b.session.get('klyfe_lp_solar_lead'));
    assert.equal(saved.firstName,''); assert.equal(saved.lastName,'');
    const reload=browser({pending:saved,thankYou:true});
    assert.equal(reload.events().filter(e=>e[1]==='Lead').length,0);
    const stale=browser({pending:{...pending,ts:Date.now()-31*60*1000},thankYou:true});
    assert.equal(stale.events().filter(e=>e[1]==='Lead').length,0);
    assert.equal(stale.session.has('klyfe_lp_solar_lead'),false);
    assert.equal(browser({thankYou:true}).events().filter(e=>e[1]==='Lead').length,0);
});

test('real landing page payloads satisfy server validation', () => {
    const {validateContactLead} = require('../lib/contact-lead');
    for (const name of ['residencial','fazendas','supermercados-clinicas','alta-conversao']) {
        const html=fs.readFileSync(require.resolve('../views/lp/solar-'+name+'.ejs'),'utf8');
        const match=html.match(/(?:const|var) payload = (\{[\s\S]*?\n\s*\});/);
        assert.ok(match,name);
        const values={'#f-nome':'Pessoa Teste','#f-cidade':'Campina Grande','#f-empresa':'Empresa Teste','#f-conta':'R$ 500'};
        const payload=vm.runInNewContext('('+match[1]+')',{form:{querySelector:key=>({value:values[key]})},telefone:'83999991234',nome:'Pessoa Teste',cidade:'Campina Grande',faixa:'R$ 500',campaign:{}});
        assert.equal(validateContactLead(payload,{emailOptional:true}).valid,true,name);
    }
});

test('actual contact handler sends consent, attribution and shared ID', async () => {
    const src=fs.readFileSync(require.resolve('../public/js/main.js'),'utf8');
    const section=src.slice(src.indexOf("    const contactForm ="), src.indexOf('    // ═══ Wallbox:'));
    let submit, sent;
    const data={nome:'Pessoa Teste',email:'test@example.com',cidade:'Campina Grande',telefone:'83999991234',servico:'Energia Solar Fotovoltaica'};
    const form={dataset:{},addEventListener:(_,fn)=>submit=fn,querySelector:()=>({innerHTML:'Enviar'}),reset(){}};
    vm.runInNewContext(section,{document:{getElementById:()=>form,dispatchEvent(){}},FormData:class{get(k){return data[k]}entries(){return Object.entries(data)}},window:{location:{href:'https://example.invalid/contato'},KlyfeConsent:{get:()=> 'granted'},KlyfeTracking:{newEventId:()=> 'lead_contact',getCampaignParams:()=>({utm_campaign:'solar'}),trackLeadSolar:(p,id)=>assert.equal(id,'lead_contact')}},CustomEvent:class{},alert(){},console,fetch:async(url,opts)=>{sent=JSON.parse(opts.body);return {ok:true,json:async()=>({success:true,event_id:sent.event_id})}}});
    await submit({preventDefault(){}});
    assert.equal(sent.marketing_consent,'granted');assert.equal(sent.utm_campaign,'solar');assert.equal(sent.event_id,'lead_contact');
});

test('PageView duplicado do GTM (sem eventID) é descartado; o resto do GTM passa', () => {
    const b = browser({ consent: 'granted' });
    const fbq = b.ctx.fbq;
    // Tag do Pixel do GTM antes do fbevents.js carregar: entra pela fila.
    fbq('init', 'test-pixel');
    fbq('trackSingle', 'test-pixel', 'PageView');
    fbq('track', 'PageView', {});
    fbq('trackSingleCustom', 'test-pixel', 'clique_whatsapp');
    const queued = Array.from(fbq.queue);
    const pageViews = queued.filter(e => e[1] === 'PageView' || e[2] === 'PageView');
    assert.equal(pageViews.length, 1, 'só o PageView do site');
    assert.ok(pageViews[0][3].eventID, 'o PageView mantido é o casado com a API de Conversões');
    assert.ok(queued.some(e => e[0] === 'trackSingleCustom' && e[2] === 'clique_whatsapp'), 'eventos personalizados do GTM passam');
    assert.ok(queued.some(e => e[0] === 'init' && e[1] === 'test-pixel'));

    // Depois que o fbevents.js carrega, ele define callMethod; a trava continua valendo.
    const calls = [];
    fbq.callMethod = function () { calls.push(Array.from(arguments)); };
    fbq('trackSingle', 'test-pixel', 'PageView');
    fbq('trackSingle', 'test-pixel', 'PageView', {}, { eventID: 'pv_ok' });
    fbq('track', 'Lead', { content_category: 'solar' }, { eventID: 'lead_1' });
    fbq('track', 'Contact', {});
    assert.deepEqual(calls.map(c => c[0] + ':' + (c[0] === 'trackSingle' ? c[2] : c[1])), ['trackSingle:PageView', 'track:Lead', 'track:Contact']);
    assert.equal(calls[0][4].eventID, 'pv_ok');
});

test('com o Pixel só no GTM (META_PIXEL_VIA_GTM), o site não instala trava nem Pixel próprio', () => {
    const b = browser({ consent: 'granted', cfg: { pixelViaGtm: true } });
    assert.equal(typeof b.ctx.fbq, 'undefined');
});

test('plano B: link de WhatsApp com os dados do formulário, no formato da recepção', () => {
    const b = browser();
    const url = new URL(b.ctx.KlyfeTracking.buildLeadWhatsAppUrl('5583991430929', {
        nome: 'Maria Souza', cidade: 'Queimadas.', faixa_conta: 'R$ 300 a R$ 600',
    }));
    assert.equal(url.pathname, '/5583991430929');
    assert.equal(url.searchParams.get('text'),
        'Olá! Quero um orçamento de energia solar.\nCidade da instalação: Queimadas.\nMinha conta de luz: R$ 300 a R$ 600.\nMeu nome é Maria Souza.');
    const triage = new URL(b.ctx.KlyfeTracking.buildLeadWhatsAppUrl('', {
        nome: 'Ana', cidade: 'João Pessoa', mensagem: 'Olá! Vi a calculadora.\nNão pretendo aumentar meu consumo por enquanto.',
    }));
    assert.equal(triage.pathname, '/5583991430929', 'sem número, usa o solar');
    assert.equal(triage.searchParams.get('text'),
        'Olá! Vi a calculadora.\nNão pretendo aumentar meu consumo por enquanto.\nCidade da instalação: João Pessoa.\nMeu nome é Ana.');
});

test('envio do formulário tem limite de tempo e não deixa o cliente esperando', async () => {
    const b = browser();
    let aborted = false;
    b.ctx.AbortController = class { constructor() { this.signal = { aborted: false }; } abort() { aborted = true; } };
    const timers = [];
    b.ctx.setTimeout = (fn, ms) => { timers.push({ fn, ms }); return timers.length; };
    b.ctx.clearTimeout = () => {};
    let rejectFetch;
    b.ctx.fetch = () => new Promise((_, reject) => { rejectFetch = reject; });
    const pending = b.ctx.KlyfeTracking.submitLpLead({ nome: 'Maria', telefone: '83999991234', cidade: 'Queimadas', source: 'site-solar-triage', redirect: false });
    const timeout = timers.find(t => t.ms === 12000);
    assert.ok(timeout, 'limite de 12 s');
    timeout.fn(); assert.ok(aborted);
    rejectFetch(new Error('aborted'));
    await assert.rejects(pending);
});
