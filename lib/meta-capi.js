'use strict';

const crypto = require('crypto');
const https = require('https');

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v21.0';

function sha256(value) {
    if (value == null || value === '') return undefined;
    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return undefined;
    return crypto.createHash('sha256').update(normalized).digest('hex');
}

function normalizePhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return undefined;
    if (digits.startsWith('55') && digits.length >= 12) return digits;
    if (digits.length === 10 || digits.length === 11) return `55${digits}`;
    return digits;
}

function postJson(urlString, payload) {
    if (typeof fetch === 'function') {
        return fetch(urlString, {
            method: 'POST',
            signal: AbortSignal.timeout(8000),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(async (res) => {
            const json = await res.json().catch(() => ({}));
            return { ok: res.ok, status: res.status, json };
        });
    }

    return new Promise((resolve, reject) => {
        const url = new URL(urlString);
        const body = JSON.stringify(payload);
        const req = https.request(
            {
                hostname: url.hostname,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body)
                }
            },
            (res) => {
                let raw = '';
                res.on('data', (chunk) => {
                    raw += chunk;
                });
                res.on('end', () => {
                    let json = {};
                    try {
                        json = JSON.parse(raw);
                    } catch (_) { /* ignore */ }
                    resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, json });
                });
            }
        );
        req.on('error', reject);
        req.setTimeout(8000, () => req.destroy(new Error('Meta CAPI timeout')));
        req.write(body);
        req.end();
    });
}

/**
 * Browser Pixel + CAPI must share the same event_id for Meta deduplication.
 */
async function sendMetaCapiEvent(opts = {}) {
    const pixelId = process.env.META_PIXEL_ID || '';
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN || '';
    if (!pixelId || !accessToken) {
        return { skipped: true, reason: 'missing_pixel_or_token' };
    }

    const eventName = opts.eventName;
    const eventId = opts.eventId;
    if (!eventName || !eventId) {
        return { skipped: true, reason: 'missing_event_name_or_id' };
    }

    const user = opts.userData || {};
    const user_data = {};
    const em = sha256(user.email);
    const ph = sha256(normalizePhone(user.phone));
    const fn = sha256(user.firstName);
    const ln = sha256(user.lastName);
    const country = sha256(user.country || 'br');
    const externalId = sha256(user.externalId || user.phone || user.email || eventId);

    if (em) user_data.em = [em];
    if (ph) user_data.ph = [ph];
    if (fn) user_data.fn = [fn];
    if (ln) user_data.ln = [ln];
    if (country) user_data.country = [country];
    if (externalId) user_data.external_id = [externalId];
    if (user.fbp) user_data.fbp = String(user.fbp);
    if (user.fbc) user_data.fbc = String(user.fbc);
    if (opts.clientIp) user_data.client_ip_address = String(opts.clientIp);
    if (opts.userAgent) user_data.client_user_agent = String(opts.userAgent);

    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: String(eventId),
                event_source_url: opts.eventSourceUrl || undefined,
                action_source: opts.actionSource || 'website',
                user_data,
                custom_data: opts.customData || undefined
            }
        ]
    };

    const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
    if (testCode) payload.test_event_code = testCode;

    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

    try {
        const result = await postJson(url, payload);
        if (!result.ok) {
            console.error('[Meta CAPI] erro:', result.status, JSON.stringify(result.json));
            return { ok: false, status: result.status, json: result.json };
        }
        return { ok: true, json: result.json };
    } catch (err) {
        console.error('[Meta CAPI] falha de rede:', err.message);
        return { ok: false, error: err.message };
    }
}

function newEventId(prefix = 'ev') {
    if (typeof crypto.randomUUID === 'function') {
        return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${crypto.randomBytes(16).toString('hex')}`;
}

/** Mapeia source do formulário → content_name estável para Meta/Ads */
const LP_SOURCE_CONTENT_NAME = {
    'lp-solar-empresas': 'lp-solar-empresas',
    'lp-solar-fazendas': 'lp-solar-fazendas',
    'lp-solar-supermercados-clinicas': 'lp-solar-supermercados-clinicas',
    'lp-solar-residencial': 'lp-solar-residencial',
    'lp-solar-alta-conversao': 'lp-solar-alta-conversao',
    'site-solar-triage': 'site-solar-triage'
};

function resolveLeadContentName(source, isSolarLead) {
    if (source && LP_SOURCE_CONTENT_NAME[source]) return LP_SOURCE_CONTENT_NAME[source];
    if (isSolarLead) return 'contato';
    return source || 'contato';
}

function isLpSolarSource(source) {
    return !!(source && LP_SOURCE_CONTENT_NAME[source]);
}

module.exports = {
    sendMetaCapiEvent,
    newEventId,
    sha256,
    normalizePhone,
    LP_SOURCE_CONTENT_NAME,
    resolveLeadContentName,
    isLpSolarSource
};
