'use strict';

// Regra comercial: em página de energia solar ou de usinas solares, todo link de
// WhatsApp vai para o número solar. Lead solar no número de serviços elétricos se perde.
const assert = require('node:assert/strict');
const { ensureServer } = require('./helpers/test-server');
const { PHONE_SOLAR, resolveTrackingContext } = require('../lib/site-tracking');

// Páginas que citam solar mas têm outro assunto principal (decisão registrada em
// whatsapp-cta-governance.test.js): wallbox, SPDA e aprovação de projeto na Energisa.
const SOLAR_PATH = /energia-solar|usinas?-solar|fotovolt|paineis-solares|painel-solar|inversor-solar|calculadora-solar/i;
const NOT_SOLAR_SUBJECT = /wallbox|spda|aprovacao-energisa/i;
const EXTRA_SOLAR_PATHS = [
    '/lp/energia-solar',
    '/lp/energia-solar-empresas',
    '/lp/energia-solar-fazendas',
    '/lp/energia-solar-residencial',
    '/lp/energia-solar-supermercados-clinicas',
    '/lp/energia-solar-empresas/obrigado',
    '/energia-solar/cartao',
    '/calculadora-solar'
];

async function sitemapPaths(origin) {
    const locs = async (pathname) => {
        const xml = await (await fetch(origin + pathname)).text();
        return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
    };
    const paths = await locs('/sitemap.xml');
    for (const nested of paths.filter(p => p.endsWith('.xml'))) paths.push(...await locs(nested));
    return paths.filter(p => !p.endsWith('.xml'));
}

(async () => {
    for (const pathname of ['/energia-solar/', '/usinas-solares/', '/calculadora-solar', '/lp/energia-solar', '/energia-solar/cartao']) {
        const context = resolveTrackingContext(pathname);
        assert.equal(context.contentCategory, 'solar', pathname);
        assert.equal(context.waPhone, PHONE_SOLAR, pathname);
    }

    const origin = process.env.TEST_SITE_ORIGIN || 'http://localhost:3221';
    await ensureServer(origin);
    const paths = [...new Set([...(await sitemapPaths(origin)), ...EXTRA_SOLAR_PATHS])]
        .filter(p => SOLAR_PATH.test(p) && !NOT_SOLAR_SUBJECT.test(p));
    assert.ok(paths.length >= 60, `poucas páginas solares encontradas (${paths.length})`);

    const failures = [];
    let checked = 0;
    for (const pathname of paths) {
        const response = await fetch(origin + pathname, { redirect: 'manual' });
        if (response.status !== 200) continue;
        checked += 1;
        const html = await response.text();
        const phones = [...html.matchAll(/https:\/\/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\d+)/g)].map(match => match[1]);
        const configured = [...html.matchAll(/data-wa-phone="(\d+)"/g)].map(match => match[1]);
        const wrong = [...new Set([...phones, ...configured].filter(phone => phone !== PHONE_SOLAR))];
        if (!phones.length) failures.push(`${pathname}: nenhum link de WhatsApp`);
        if (wrong.length) failures.push(`${pathname}: ${wrong.join(', ')}`);
    }
    assert.ok(checked >= 60, `poucas páginas solares responderam (${checked})`);
    assert.deepEqual(failures, [], 'Páginas solares com WhatsApp fora do número solar:\n' + failures.join('\n'));
    console.log(`solar-whatsapp-number.test.js: OK — ${checked} páginas solares só apontam para o número solar`);
    process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
