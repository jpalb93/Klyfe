const assert = require('node:assert/strict');
const { getPostBySlug } = require('../lib/blog-loader');

const pairs = {
  'energia-solar-para-supermercados': '/energia-solar/supermercados/',
  'energia-solar-para-hospitais': '/energia-solar/hospitais-e-clinicas/',
  'energia-solar-para-condominios': '/energia-solar/condominios/',
  'energia-solar-para-fazendas': '/energia-solar/fazendas-e-irrigacao/',
  'como-funciona-a-energia-solar-em-casas': '/energia-solar/residencial/',
  'wallbox-em-condominio': '/solucoes/eletrica/wallbox-condominio/',
  'wallbox-com-energia-solar': '/solucoes/eletrica/wallbox-energia-solar/',
  'nr10-laudo-eletrico-empresa': '/solucoes/engenharia/laudos-eletricos',
  'automacao-industrial-nordeste': '/solucoes/automacao',
  'energia-solar-vale-a-pena-no-nordeste': '/energia-solar/',
  'quanto-custa-instalar-energia-solar': '/servicos/instalacao-energia-solar/',
  'como-escolher-uma-empresa-de-energia-solar': '/servicos/instalacao-energia-solar/',
  'como-funciona-a-homologacao-da-energia-solar': '/servicos/homologacao-energia-solar/',
  'como-escolher-instalador-wallbox': '/solucoes/eletrica/carregador-veicular/',
  'quanto-custa-instalar-wallbox': '/solucoes/eletrica/carregador-veicular/'
};

const { ensureServer } = require('./helpers/test-server');

(async () => {
  const origin = process.env.TEST_SITE_ORIGIN || 'http://localhost:3219';
  await ensureServer(origin);
  for (const [slug, service] of Object.entries(pairs)) {
    const post = getPostBySlug(slug);
    assert.ok(post, slug);
    assert.equal(post.searchIntent, 'informacional', slug);
    assert.equal(post.dateModified, '2026-09-22', slug);
    assert.equal(post.contentAppendHtml, '', slug);
    assert.ok(post.contentHtml.includes(`href="${service}"`), slug);
    assert.ok(post.faq.length >= 2, slug);

    const response = await fetch(`${origin}/blog/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.ok(html.includes(`<link rel="canonical" href="https://www.klyfeelectric.com.br/blog/${slug}">`), slug);
    assert.ok(html.includes(`href="${service}"`), slug);
    assert.ok(html.includes(post.title), slug);
    assert.ok(!html.includes('data-blog-block="editorial-expansion-v1"'), slug);

    const serviceResponse = await fetch(origin + service);
    assert.equal(serviceResponse.status, 200, service);
    const serviceHtml = await serviceResponse.text();
    if (['energia-solar-para-supermercados', 'energia-solar-para-hospitais', 'energia-solar-para-condominios', 'energia-solar-para-fazendas', 'como-funciona-a-energia-solar-em-casas', 'wallbox-em-condominio', 'wallbox-com-energia-solar'].includes(slug)) {
      assert.ok(serviceHtml.includes(`href="/blog/${slug}"`), service);
    }
    if (slug === 'wallbox-com-energia-solar') {
      assert.ok(serviceHtml.includes('id="solar-distance-result"'));
      assert.ok(!/custo zero|economia máxima garantida|se paga sozinho/i.test(serviceHtml));
    }
  }
  console.log(`blog-service-intent.test.js: OK — ${Object.keys(pairs).length} article/service pairs`);
  process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
