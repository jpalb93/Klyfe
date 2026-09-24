'use strict';
const { createHmac, timingSafeEqual, randomBytes } = require('node:crypto');
const { Router, json } = require('express');
const rateLimit = require('express-rate-limit');
const { isIP } = require('node:net');

const sources = new Set(['direct', 'google', 'bing', 'instagram', 'facebook', 'linkedin', 'youtube', 'referral', 'internal', 'campaign']);
const pathPattern = /^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/;
const ctaPattern = /^(whatsapp|contact|calculator|phone|form|custom)-(header|footer|floating|content)-[1-9][0-9]?$/;
const configured = () => (process.env.SITE_ANALYTICS_SECRET || '').length >= 32 && !!process.env.SITE_ANALYTICS_API_URL;
const sign = value => createHmac('sha256', process.env.SITE_ANALYTICS_SECRET || '').update(value).digest('base64url');
function sourceFromRequest(req) {
    const utm = String(req.query.utm_source || '').toLowerCase();
    if (sources.has(utm) && !['internal', 'direct'].includes(utm)) return utm;
    if (utm) return 'campaign';
    try {
        const host = new URL(req.get('referer')).hostname;
        if (['klyfeelectric.com.br', 'www.klyfeelectric.com.br', req.hostname].includes(host)) return 'internal';
        for (const name of ['google', 'bing', 'instagram', 'facebook', 'linkedin', 'youtube']) {
            if (host === `${name}.com` || host.endsWith(`.${name}.com`) || (name === 'google' && /(^|\.)google\.com\.br$/.test(host))) return name;
        }
        return 'referral';
    } catch { return 'direct'; }
}
function createPageContext(req, canonical, robots) {
    if (!configured() || String(robots || '').includes('noindex')) return '';
    if (!canonical || /(?:^|\/)(admin|api|portal|preview|proposta|auth)(?:\/|$)/.test(req.path || '')) return '';
    let pathname;
    try { pathname = new URL(canonical, 'https://www.klyfeelectric.com.br').pathname; } catch { return ''; }
    if (pathname.length > 220 || !pathPattern.test(pathname) || /\d{7,}/.test(pathname) || /(?:^|\/)(admin|api|portal|preview|proposta|auth)(?:\/|$)/.test(pathname)) return '';
    const allowed = (process.env.SITE_ANALYTICS_CAMPAIGNS || '').split(',').filter(v => /^[a-z0-9_-]{1,48}$/.test(v));
    const campaign = allowed.includes(req.query.utm_campaign) ? req.query.utm_campaign : undefined;
    const value = Buffer.from(JSON.stringify({ path: pathname, source: sourceFromRequest(req), campaign, createdAt: Date.now() })).toString('base64url');
    return `${value}.${sign(value)}`;
}
function verifyContext(token) {
    if (typeof token !== 'string' || token.length > 1000) return null;
    const [value, signature, extra] = token.split('.');
    if (!value || !signature || extra) return null;
    const expected = sign(value);
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    try {
        const parsed = JSON.parse(Buffer.from(value, 'base64url').toString());
        if (parsed.createdAt > Date.now() + 60000 || parsed.createdAt < Date.now() - 86400000) return null;
        return parsed;
    } catch { return null; }
}
// Construct the wire payload explicitly: never forward arbitrary browser fields.
function sanitizeSnapshot(raw, context) {
    if (!raw || typeof raw !== 'object' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.id)) return null;
    const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(raw.startedAt, Date.now() - 1800000, Date.now() + 60000) || !int(raw.sequence, 1, 1000) || !int(raw.seconds, 0, 1800) || !int(raw.lcpMs, 0, 60000)) return null;
    if (!['mobile', 'tablet', 'desktop'].includes(raw.device) || ![0, 25, 50, 75, 100].includes(raw.scroll)) return null;
    const flags = ['formStarted', 'formSuccess', 'formError', 'repeatedClick'];
    if (flags.some(k => typeof raw[k] !== 'boolean')) return null;
    if (!Array.isArray(raw.ctas) || raw.ctas.length > 60 || raw.ctas.some(c => !c || !ctaPattern.test(c.key) || typeof c.seen !== 'boolean' || typeof c.clicked !== 'boolean')) return null;
    const deadClicks = Number.isInteger(raw.deadClicks) && raw.deadClicks >= 0 && raw.deadClicks <= 100 ? raw.deadClicks : 0;
    return { id: raw.id, startedAt: raw.startedAt, sequence: raw.sequence, seconds: raw.seconds, lcpMs: raw.lcpMs, device: raw.device,
        scroll: raw.scroll, source: context.source, ...(context.campaign ? { campaign: context.campaign } : {}),
        ...Object.fromEntries(flags.map(k => [k, raw[k]])), deadClicks, ctas: raw.ctas.map(c => ({ key: c.key, seen: c.seen, clicked: c.clicked })) };
}
function geography(req) {
    // Only the deployment platform may provide geo. Never forward an IP or User-Agent.
    if (process.env.VERCEL !== '1') return { country: 'ZZ', region: '', city: '' };
    const clean = (name, pattern) => {
        try { const v = decodeURIComponent(req.get(name) || ''); return v.length <= 80 && pattern.test(v) ? v : ''; } catch { return ''; }
    };
    return { country: clean('x-vercel-ip-country', /^[A-Z]{2}$/) || 'ZZ', region: clean('x-vercel-ip-country-region', /^[\p{L}\p{N} .'-]*$/u), city: clean('x-vercel-ip-city', /^[\p{L} .'-]*$/u) };
}
function createAnalyticsRouter() {
    const router = Router();
    const salt = randomBytes(32);
    router.post('/collect', rateLimit({ windowMs: 60000, max: 180, standardHeaders: true, legacyHeaders: false,
        keyGenerator: req => {
            // Vercel's managed header avoids treating every visitor as the reverse proxy.
            // https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
            const forwarded = process.env.VERCEL === '1' ? (req.get('x-vercel-forwarded-for') || '').split(',')[0].trim() : '';
            const ip = isIP(forwarded) ? forwarded : req.ip || req.socket.remoteAddress || 'unknown';
            return createHmac('sha256', salt).update(rateLimit.ipKeyGenerator(ip)).digest('hex');
        },
        validate: { keyGeneratorIpFallback: false },
    }), json({ limit: '16kb' }), async (req, res) => {
        res.set('Cache-Control', 'no-store');
        if (!configured()) return res.status(503).json({ error: 'Coleta não configurada' });
        const origin = req.get('origin');
        const allowed = (process.env.SITE_ANALYTICS_ORIGINS || 'https://www.klyfeelectric.com.br,https://klyfeelectric.com.br').split(',');
        if (!origin || !allowed.includes(origin)) return res.sendStatus(403);
        if (/bot|crawler|spider|headless|lighthouse/i.test(req.get('user-agent') || '')) return res.sendStatus(204);
        const context = verifyContext(req.body?.context);
        const snapshot = context && sanitizeSnapshot(req.body?.snapshot, context);
        if (!snapshot) return res.status(400).json({ error: 'Métrica inválida' });
        try {
            const target = new URL('/site-analytics/collect', process.env.SITE_ANALYTICS_API_URL);
            if (target.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(target.hostname)) throw new Error('Invalid endpoint');
            const response = await fetch(target, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(4000),
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SITE_ANALYTICS_SECRET}` },
                body: JSON.stringify({ snapshot, path: context.path, ...geography(req) }),
            });
            return res.sendStatus(response.ok ? 204 : 503);
        } catch { return res.sendStatus(503); }
    });
    router.use((error, _req, res, _next) => {
        res.status(error && error.type === 'entity.too.large' ? 413 : 400).json({ error: 'Payload inválido' });
    });
    return router;
}
module.exports = { createAnalyticsRouter, createPageContext, verifyContext, sanitizeSnapshot, sourceFromRequest, geography };
