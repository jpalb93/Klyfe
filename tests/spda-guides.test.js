const assert = require('node:assert/strict');
const guides = require('../config/spda-guides');
const { getPostBySlug } = require('../lib/blog-loader');
const { evaluatePost, buildLocals } = require('../lib/blog-evaluator');
const locations = require('../config/locations');

const { ensureServer } = require('./helpers/test-server');

(async () => {
    const origin = process.env.TEST_SITE_ORIGIN || 'http://localhost:3218';
    await ensureServer(origin);
    const get = async path => {
        const response = await fetch(origin + path);
        assert.equal(response.status, 200, path);
        return response.text();
    };
    const keywords = new Set();
    for (const guide of guides) {
        const post = getPostBySlug(guide.slug);
        assert.ok(post, guide.slug);
        assert.ok(!keywords.has(post.primaryKeyword), 'Distinct primary intent');
        keywords.add(post.primaryKeyword);
        for (const city of ['default', 'joao-pessoa', 'campina-grande']) {
            const prefix = city === 'default' ? '' : '/' + city;
            const evaluated = evaluatePost(post, buildLocals(city, locations[city]));
            assert.ok(evaluated.contentHtml.includes(`${prefix}/solucoes/engenharia/spda`));
            const html = await get(`${prefix}/blog/${guide.slug}`);
            assert.ok(html.includes(`<link rel="canonical" href="https://www.klyfeelectric.com.br/blog/${guide.slug}">`));
            assert.ok(!html.includes('<%- getHomePrefix()'));
            const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
            assert.ok(schemas.some(schema => schema['@graph']?.some(item => item['@type'] === 'BlogPosting')));
        }
        for (const match of (post.contentHtml + (post.contentAppendHtml || '')).matchAll(/href="(\/blog\/[^"#]+)"/g)) await get(match[1]);
    }
    for (const prefix of ['', '/joao-pessoa', '/campina-grande']) {
        const html = await get(`${prefix}/solucoes/engenharia/spda`);
        assert.ok(html.includes('href="#guia-spda"'));
        for (const guide of guides) assert.ok(html.includes(`href="/blog/${guide.slug}"`));
    }
    const otherService = await get('/solucoes/engenharia/laudos-eletricos');
    assert.ok(!otherService.includes('id="guia-spda"'));
    const sitemap = await get('/sitemap.xml');
    for (const guide of guides) {
        assert.ok(sitemap.includes(`/blog/${guide.slug}</loc>`));
        assert.ok(!sitemap.includes(`/joao-pessoa/blog/${guide.slug}</loc>`));
        assert.ok(!sitemap.includes(`/campina-grande/blog/${guide.slug}</loc>`));
    }
    console.log('spda-guides.test.js: OK — articles, localized services, links, schema and canonical sitemap');
    process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
