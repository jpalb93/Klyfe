const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const express = require('express');
const { createPageContext, verifyContext, sanitizeSnapshot, createAnalyticsRouter, geography } = require('../lib/site-analytics');
process.env.SITE_ANALYTICS_SECRET = 'local-test-secret-with-more-than-32-characters';
process.env.SITE_ANALYTICS_API_URL = 'http://127.0.0.1:1';
const request = { query: {}, hostname: 'www.klyfeelectric.com.br', get: () => undefined };
function snapshot() { return { id: randomUUID(), startedAt: Date.now() - 1000, sequence: 1, device: 'mobile', seconds: 0, scroll: 0, lcpMs: 0, formStarted: false, formSuccess: false, formError: false, repeatedClick: false, ctas: [] }; }

test('signed context removes query data and disallows private routes/tampering', () => {
    const token = createPageContext(request, 'https://www.klyfeelectric.com.br/contato?email=secret@example.com');
    assert.equal(verifyContext(token).path, '/contato');
    assert.equal(verifyContext(token + 'bad'), null);
    assert.equal(createPageContext(request, '/portal/cliente'), '');
    assert.equal(createPageContext(request, '/blog/preview', 'noindex'), '');
});
test('relay whitelists fields and campaigns, excludes all raw identifiers', () => {
    const input = { ...snapshot(), email: 'secret@example.com', ip: '127.0.0.2', source: 'secret@example.com', campaign: 'customer-123' };
    const clean = sanitizeSnapshot(input, { source: 'google' });
    assert.ok(clean); assert.equal(clean.source, 'google');
    assert.equal(JSON.stringify(clean).includes('secret'), false); assert.equal(clean.ip, undefined); assert.equal(clean.campaign, undefined);
    assert.equal(sanitizeSnapshot({ ...input, ctas: [{ key: 'secret@example.com', seen: true, clicked: true }] }, { source: 'direct' }), null);
    const vercel = process.env.VERCEL; delete process.env.VERCEL;
    assert.deepEqual(geography({ get: () => 'anything' }), { country: 'ZZ', region: '', city: '' });
    if (vercel) process.env.VERCEL = vercel;
});
test('collector enforces origin, consent, bot suppression, body limits and forwarding boundary', async () => {
    const nativeFetch = global.fetch; const forwarded = [];
    const receiver = express(); receiver.use(express.json()); receiver.post('/site-analytics/collect', (req, res) => { forwarded.push({ body: req.body, headers: req.headers }); res.sendStatus(204); });
    const upstream = receiver.listen(0, '127.0.0.1'); await new Promise(r => upstream.once('listening', r));
    process.env.SITE_ANALYTICS_API_URL = `http://127.0.0.1:${upstream.address().port}`;
    const app = express();
    app.use('/api/site-analytics', createAnalyticsRouter());
    app.use('/api/telemetry', createAnalyticsRouter());
    const server = app.listen(0, '127.0.0.1'); await new Promise(r => server.once('listening', r));
    const url = `http://127.0.0.1:${server.address().port}/api/site-analytics/collect`;
    const telemetryUrl = `http://127.0.0.1:${server.address().port}/api/telemetry/collect`;
    const body = { context: createPageContext(request, '/contato'), snapshot: { ...snapshot(), deadClicks: 3, name: 'Private Name' } };
    const headers = { 'Content-Type': 'application/json', Origin: 'https://www.klyfeelectric.com.br', Cookie: 'klyfe_cookie_consent=granted', 'User-Agent': 'Browser' };
    const send = (overrides = {}, value = body, targetUrl = url) => nativeFetch(targetUrl, { method: 'POST', headers: { ...headers, ...overrides }, body: JSON.stringify(value) });
    try {
        assert.equal((await send({ Origin: 'https://other.example' })).status, 403);
        assert.equal((await send({ 'User-Agent': 'Googlebot' })).status, 204); assert.equal(forwarded.length, 0);
        assert.equal((await send({ Cookie: '' })).status, 204); assert.equal(forwarded.length, 1);
        assert.equal((await send({ 'Sec-GPC': '1' })).status, 204); assert.equal(forwarded.length, 2);
        assert.equal((await send({}, body, telemetryUrl)).status, 204); assert.equal(forwarded.length, 3);
        assert.equal(forwarded[0].body.path, '/contato'); assert.equal(JSON.stringify(forwarded[0]).includes('Private Name'), false);
        assert.equal(forwarded[0].body.snapshot.deadClicks, 3);
        assert.equal(forwarded[0].headers.cookie, undefined); assert.equal(forwarded[0].headers['x-forwarded-for'], undefined);
        assert.equal((await send({}, { ...body, context: 'forged' })).status, 400);
        assert.equal((await send({}, { text: 'x'.repeat(17000) })).status, 413);
    } finally { await Promise.all([new Promise(r => server.close(r)), new Promise(r => upstream.close(r))]); }
});
