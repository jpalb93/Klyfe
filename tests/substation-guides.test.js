const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const guides = require('../config/substation-guides');
const { getPostBySlug } = require('../lib/blog-loader');
const { evaluatePost, buildLocals } = require('../lib/blog-evaluator');
const locations = require('../config/locations');

const { ensureServer } = require('./helpers/test-server');

(async () => {
    const origin = process.env.TEST_SITE_ORIGIN || 'http://localhost:3219';
    await ensureServer(origin);
    const get = async route => {
        const response = await fetch(origin + route);
        assert.equal(response.status, 200, route);
        return response.text();
    };
    for (const guide of guides) {
        const post = getPostBySlug(guide.slug);
        assert.ok(post, guide.slug);
        if (guide.slug === 'manutencao-subestacao-planejamento') {
            assert.equal(post.primaryKeyword, 'parada programada de subestação');
            assert.match(post.title, /^Parada programada de subestação:/);
            assert.match(post.contentHtml, /Checklist do gestor/);
            assert.match(post.contentHtml, /Conheça o serviço de manutenção de subestação/);
        }
        assert.ok(fs.existsSync(path.join(__dirname, '../public', post.heroImage)));
        for (const city of ['default', 'joao-pessoa', 'campina-grande']) {
            const prefix = city === 'default' ? '' : '/' + city;
            const evaluated = evaluatePost(post, buildLocals(city, locations[city]));
            assert.ok(evaluated.contentHtml.includes(`${prefix}/solucoes/engenharia/${guide.service}`));
            const html = await get(`${prefix}/blog/${guide.slug}`);
            assert.ok(html.includes(`<link rel="canonical" href="https://www.klyfeelectric.com.br/blog/${guide.slug}">`));
            assert.ok(!html.includes('<%- getHomePrefix()'));
            const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
            const article = schemas.flatMap(schema => schema['@graph'] || []).find(item => item['@type'] === 'BlogPosting');
            assert.ok(article);
            assert.equal(article.mainEntityOfPage['@id'], `https://www.klyfeelectric.com.br/blog/${guide.slug}`);
            assert.equal(article.author['@type'], 'Organization');
            assert.ok(!article.reviewedBy, 'Do not claim a review that did not happen');
        }
        for (const match of post.contentHtml.matchAll(/href="(\/blog\/[^"#]+)"/g)) await get(match[1]);
    }
    for (const prefix of ['', '/joao-pessoa', '/campina-grande']) {
        for (const service of ['projeto-subestacao', 'subestacao-aerea', 'manutencao-subestacao']) {
            const route = `${prefix}/solucoes/engenharia/${service}`;
            const html = await get(route);
            assert.ok(html.includes('href="#guia-subestacao"'), route);
            assert.equal((html.match(/id="guia-subestacao"/g) || []).length, 1);
            for (const guide of guides) assert.ok(html.includes(`href="/blog/${guide.slug}"`), route);
            assert.ok(html.includes(`<link rel="canonical" href="https://www.klyfeelectric.com.br${route}">`));
        }
    }
    for (const service of ['spda', 'laudos-eletricos']) {
        assert.ok(!(await get(`/solucoes/engenharia/${service}`)).includes('id="guia-subestacao"'));
    }
    const sitemap = await get('/sitemap.xml');
    const listing = await get('/blog?q=subesta');
    for (const guide of guides) {
        assert.ok(listing.includes(`/blog/${guide.slug}`));
        assert.equal((sitemap.match(new RegExp(`/blog/${guide.slug}</loc>`, 'g')) || []).length, 1);
        for (const city of ['joao-pessoa', 'campina-grande']) assert.ok(!sitemap.includes(`/${city}/blog/${guide.slug}</loc>`));
    }
    console.log('substation-guides.test.js: OK — 18 article routes, 9 service routes, links, schema, listing and sitemap');
    process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
