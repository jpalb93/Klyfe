const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const source = fs.readFileSync(path.join(__dirname, '../public/js/site-analytics.js'), 'utf8');

function browser(initialConsent = 'denied', privacy = {}, search = '') {
    let consent = initialConsent, now = Date.now();
    const documentEvents = {}, windowEvents = {}, sent = [], pending = [], intervals = [];
    const form = {};
    const input = { value: 'PRIVATE PERSON private@example.com 83999999999', closest: () => form };
    const link = {
        getAttribute: name => name === 'href' ? 'https://wa.me/5583999999999?text=private-message' : null,
        closest: selector => selector === 'a,button,[data-site-cta]' ? link : null,
        matches: () => false, hasAttribute: () => false,
    };
    const deadElement = {
        closest: selector => selector.includes('a,button') ? null : (selector.includes('card') ? deadElement : null),
        tagName: 'DIV',
    };
    const document = {
        visibilityState: 'visible', documentElement: { scrollHeight: 2000 },
        querySelector: () => ({ dataset: { siteAnalyticsContext: 'signed-public-page-context' } }),
        querySelectorAll: () => [link],
        addEventListener: (name, fn) => (documentEvents[name] ||= []).push(fn),
    };
    const store = new Map();
    if (initialConsent) store.set('klyfe_cookie_consent', initialConsent);
    const localStorage = {
        getItem: key => store.get(key) ?? null,
        setItem: (key, val) => store.set(key, String(val)),
        removeItem: key => store.delete(key),
    };
    const sessionStore = new Map();
    const sessionStorage = {
        getItem: key => sessionStore.get(key) ?? null,
        setItem: (key, val) => sessionStore.set(key, String(val)),
        removeItem: key => sessionStore.delete(key),
    };
    const navigator = { ...privacy, sendBeacon: (_url, blob) => { pending.push(blob.text().then(text => sent.push(JSON.parse(text)))); return true; } };
    const window = { crypto, addEventListener: (name, fn) => (windowEvents[name] ||= []).push(fn), IntersectionObserver: true };
    const context = { window, document, navigator, crypto, localStorage, sessionStorage, console,
        innerWidth: 390, innerHeight: 800, scrollY: 0,
        location: { href: `https://www.klyfeelectric.com.br/contato${search}`, search, origin: 'https://www.klyfeelectric.com.br' },
        URL, URLSearchParams, Blob, AbortController, Date: class extends Date { static now() { return now; } },
        getComputedStyle: () => ({ position: 'static' }),
        IntersectionObserver: class { constructor(callback) { this.callback = callback; } observe(el) { this.callback([{ target: el, isIntersecting: true, intersectionRatio: .75 }]); } disconnect() {} },
        fetch: async (_url, options) => { sent.push(JSON.parse(options.body)); return { ok: true }; },
        setInterval: callback => intervals.push(callback), setTimeout: () => 1, clearTimeout: () => {},
    };
    vm.runInNewContext(source, context);
    return { sent, input, link, deadElement, document, store,
        emit: (name, event = {}) => (documentEvents[name] || []).forEach(fn => fn(event)),
        consent(value) { consent = value; (windowEvents['klyfe:consent'] || []).forEach(fn => fn()); },
        tick(seconds = 15) { now += seconds * 1000; intervals.forEach(fn => fn()); },
        async settled() { await Promise.all(pending); await new Promise(resolve => setImmediate(resolve)); },
    };
}

test('browser sends telemetry immediately without banner consent, detects dead clicks', async () => {
    const b = browser();
    await b.settled();
    assert.equal(b.sent.length, 1);
    const id = b.sent[0].snapshot.id;
    assert.equal(b.sent[0].snapshot.ctas[0].seen, true);
    b.emit('input', { target: b.input }); b.tick(); await b.settled();
    assert.equal(b.sent.at(-1).snapshot.formStarted, true);
    b.emit('klyfe:form-result', { detail: { status: 'success', email: 'private@example.com' } }); await b.settled();
    assert.equal(b.sent.at(-1).snapshot.formSuccess, true);
    b.emit('click', { target: b.deadElement });
    b.emit('click', { target: b.deadElement });
    b.tick(); await b.settled();
    assert.equal(b.sent.at(-1).snapshot.deadClicks, 2);
    for (let i = 0; i < 3; i++) b.emit('click', { target: b.link });
    await b.settled();
    assert.equal(b.sent.at(-1).snapshot.repeatedClick, true);
    assert.equal(b.sent.at(-1).snapshot.ctas[0].clicked, true);
    assert.equal(b.sent.at(-1).snapshot.id, id);
    assert.doesNotMatch(JSON.stringify(b.sent), /private@example|PRIVATE PERSON|83999999999|private-message|wa\.me/i);
});
test('browser ignores team traffic and bots with webdriver', async () => {
    // Team query param activates ignore
    const bTeam = browser('denied', {}, '?klyfe_internal=1');
    assert.equal(bTeam.store.get('klyfe_internal_ignore'), '1');
    assert.equal(bTeam.sent.length, 0);

    // Bot with navigator.webdriver
    const bBot = browser('denied', { webdriver: true });
    assert.equal(bBot.sent.length, 0);
});
test('browser operates on Brave/privacy signals, respects hidden tabs, inactivity and 30 minute window', async () => {
    assert.equal(browser('denied', { globalPrivacyControl: true }).sent.length, 1);
    assert.equal(browser('denied', { doNotTrack: '1' }).sent.length, 1);
    const b = browser(); await b.settled();
    b.document.visibilityState = 'hidden'; b.tick(); await b.settled(); assert.equal(b.sent.length, 1);
    b.document.visibilityState = 'visible'; b.tick(65); await b.settled(); assert.equal(b.sent.length, 1);
    b.tick(1800); b.emit('click', { target: b.link }); await b.settled(); assert.equal(b.sent.length, 1);
    assert.notEqual(browser().sent[0].snapshot.id, b.sent[0].snapshot.id, 'new page has unrelated ID');
});
