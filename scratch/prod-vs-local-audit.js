/**
 * Production vs Local gap audit for Klyfe
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('../routes');
const locations = require('../config/locations');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const { getPublishedPosts } = require('../lib/blog-loader');

const PROD = 'https://www.klyfeelectric.com.br';
const PROD_ALT = 'https://klyfeelectric.com.br';

async function probe(base, url, { follow = false } = {}) {
  const res = await fetch(base + url, {
    redirect: follow ? 'follow' : 'manual',
    headers: { 'user-agent': 'KlyfeAuditBot/1.0' }
  });
  const status = res.status;
  const loc = res.headers.get('location') || '';
  let html = '';
  let theme = null;
  let title = null;
  const ct = res.headers.get('content-type') || '';
  if (status >= 200 && status < 300 && ct.includes('text/html')) {
    html = await res.text();
    const tm = html.match(/data-theme="([^"]+)"/);
    theme = tm ? tm[1] : null;
    const ti = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    title = ti ? ti[1].trim() : null;
  } else if (status >= 200 && status < 400) {
    try { await res.arrayBuffer(); } catch (_) {}
  }
  return { status, loc, theme, title, len: html.length };
}

function buildLocalApp() {
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use((req, res, next) => {
    res.locals.cityKey = 'default';
    res.locals.cityData = locations.default;
    res.locals.page = '';
    res.locals.theme = null;
    res.locals.tracking = { gtmId: '', metaPixelId: '', googleAdsId: '', googleAdsConversionLabel: '' };
    next();
  });
  app.use('/', routes);
  app.use((req, res) => res.status(404).send('404'));
  return app;
}

const critical = [
  // themes / hubs
  { url: '/', expectLocal: { status: 200, theme: 'solar-warm' }, expectProdAfterDeploy: { theme: 'solar-warm' }, note: 'Home Solar theme' },
  { url: '/energia-solar/', expectLocal: { status: 200, theme: 'azure-sky' }, expectProdAfterDeploy: { status: 200 }, note: 'Hub solar novo' },
  { url: '/energia-solar', expectLocal: { status: 200 }, note: 'Hub sem trailing' },

  // redirects Google cares about
  { url: '/solucoes/solar', expectLocal: { status: 301, loc: '/energia-solar/' }, expectProdAfterDeploy: { status: 301 }, note: 'URL indexada Google' },
  { url: '/campina-grande/solucoes/solar', expectLocal: { status: 301, loc: '/energia-solar/' }, note: 'Cidade legado' },
  { url: '/joao-pessoa/solucoes/solar', expectLocal: { status: 301, loc: '/energia-solar/' }, note: 'Cidade legado' },
  { url: '/nossos-servicos/klyfe-energia-solar', expectLocal: { status: 301, loc: '/energia-solar/' }, note: 'Legacy nossos-servicos' },
  { url: '/energia-solar-para-empresas', expectLocal: { status: 301, loc: '/energia-solar/comercial/' }, note: 'Captura B2B' },
  { url: '/energia-solar-para-fazendas', expectLocal: { status: 301 }, note: 'Captura fazendas' },
  { url: '/energia-solar-para-condominios', expectLocal: { status: 301 }, note: 'Captura condominios' },
  { url: '/energia-solar-para-supermercados', expectLocal: { status: 301 }, note: 'Captura supermercados' },
  { url: '/energia-solar-para-clinicas', expectLocal: { status: 301 }, note: 'Captura clinicas' },
  { url: '/energia-solar-para-hoteis', expectLocal: { status: 301 }, note: 'Captura hoteis' },
  { url: '/energia-solar-para-postos', expectLocal: { status: 301 }, note: 'Captura postos' },
  { url: '/energia-solar-em-recife-pe', expectLocal: { status: 301 }, note: 'Cidade Recife' },
  { url: '/energia-solar-em-joao-pessoa-pb', expectLocal: { status: 301 }, note: 'Cidade JP' },
  { url: '/energia-solar-em-natal-rn', expectLocal: { status: 301 }, note: 'Cidade Natal' },
  { url: '/energia-solar-em-caruaru-pe', expectLocal: { status: 301 }, note: 'Cidade Caruaru' },
  { url: '/blog/quanto-custa-energia-solar-2026', expectLocal: { status: 301 }, note: 'Blog slug legado' },
  { url: '/blog/payback-painel-solar-simulacao', expectLocal: { status: 301 }, note: 'Blog slug legado' },

  // segments
  ...Object.values(solarCapture.segments).map(s => ({
    url: s.urlPath,
    expectLocal: { status: 200, theme: 'azure-sky' },
    note: `Segmento ${s.slug}`
  })),
  // cities
  ...Object.values(solarCapture.cities).map(c => ({
    url: c.urlPath,
    expectLocal: { status: 200, theme: 'azure-sky' },
    note: `Cidade ${c.slug}`
  })),
  // services
  ...Object.values(solarServices).map(s => ({
    url: s.urlPath,
    expectLocal: { status: 200, theme: 'azure-sky' },
    note: `Servico ${s.slug}`
  })),

  // blog sample
  { url: '/blog/', expectLocal: { status: [200, 301] }, note: 'Blog index trailing' },
  { url: '/blog', expectLocal: { status: 200 }, note: 'Blog index' },
  { url: '/blog/o-que-e-energia-solar-fotovoltaica/', expectLocal: { status: 200 }, note: 'Post cluster solar' },
  { url: '/blog/quanto-custa-instalar-energia-solar/', expectLocal: { status: 200 }, note: 'Post custo' },
  { url: '/blog/em-quanto-tempo-a-energia-solar-se-paga/', expectLocal: { status: 200 }, note: 'Post payback' },

  // institutional
  { url: '/quem-somos', expectLocal: { status: 200 }, note: 'Quem somos' },
  { url: '/solucoes', expectLocal: { status: 200 }, note: 'Portal solucoes' },
  { url: '/solucoes/engenharia', expectLocal: { status: 200 }, note: 'Engenharia' },
  { url: '/solucoes/eletrica', expectLocal: { status: 200 }, note: 'Eletrica' },
  { url: '/solucoes/automacao', expectLocal: { status: 200 }, note: 'Automacao' },
  { url: '/contato', expectLocal: { status: 200 }, note: 'Contato' },
  { url: '/projetos', expectLocal: { status: 200 }, note: 'Projetos' },
  { url: '/glossario', expectLocal: { status: 200 }, note: 'Glossario' },
  { url: '/politica-de-privacidade', expectLocal: { status: 200 }, note: 'Privacidade' },
  { url: '/sitemap.xml', expectLocal: { status: 200 }, note: 'Sitemap' },
  { url: '/robots.txt', expectLocal: { status: 200 }, note: 'Robots' },
  { url: '/campina-grande', expectLocal: { status: 200, theme: 'solar-warm' }, note: 'Home CG' },
  { url: '/joao-pessoa', expectLocal: { status: 200, theme: 'solar-warm' }, note: 'Home JP' },
];

function matchStatus(actual, expected) {
  if (expected == null) return true;
  if (Array.isArray(expected)) return expected.includes(actual);
  return actual === expected;
}

const app = buildLocalApp();
const server = app.listen(0, async () => {
  const port = server.address().port;
  const localBase = `http://127.0.0.1:${port}`;
  console.log(`Local audit server :${port}`);
  console.log(`Prod base: ${PROD}\n`);

  const gaps = [];
  const localFails = [];
  const prodOld = [];
  const ok = [];

  for (const item of critical) {
    const local = await probe(localBase, item.url);
    let prod;
    try {
      prod = await probe(PROD, item.url);
    } catch (e) {
      try { prod = await probe(PROD_ALT, item.url); }
      catch (e2) { prod = { status: 'ERR', loc: '', theme: null, title: e2.message }; }
    }

    const exp = item.expectLocal || {};
    const localOk =
      matchStatus(local.status, exp.status ?? 200) &&
      (exp.theme ? local.theme === exp.theme : true) &&
      (exp.loc ? local.loc === exp.loc : true);

    if (!localOk) {
      localFails.push({ ...item, local });
    }

    // Production gap signals
    const prodLooksOld =
      (item.url === '/solucoes/solar' && prod.status === 200) ||
      (item.url === '/energia-solar/' && (prod.status === 404 || prod.status >= 400)) ||
      (item.url === '/' && prod.theme !== 'solar-warm' && prod.status === 200) ||
      (item.url.startsWith('/energia-solar/') && item.url !== '/energia-solar/' && prod.status >= 400) ||
      (item.url.startsWith('/servicos/') && prod.status >= 400);

    if (prodLooksOld) {
      prodOld.push({
        url: item.url,
        note: item.note,
        prodStatus: prod.status,
        prodTheme: prod.theme,
        prodLoc: prod.loc,
        prodTitle: prod.title,
        localStatus: local.status,
        localTheme: local.theme,
        localLoc: local.loc
      });
    } else if (localOk) {
      ok.push(item.url);
    }

    const mark = !localOk ? 'LOCAL-FAIL' : (prodLooksOld ? 'PROD-OLD' : 'OK');
    if (mark !== 'OK') {
      console.log(`${mark.padEnd(10)} ${item.url}`);
      console.log(`           local=${local.status}${local.theme ? ' theme=' + local.theme : ''}${local.loc ? ' -> ' + local.loc : ''}`);
      console.log(`           prod =${prod.status}${prod.theme ? ' theme=' + prod.theme : ''}${prod.loc ? ' -> ' + prod.loc : ''}${prod.title ? ' | ' + prod.title.slice(0, 60) : ''}`);
    }
  }

  // sitemap check local
  const sm = await (await fetch(localBase + '/sitemap.xml')).text();
  const sitemapMust = ['/energia-solar', '/energia-solar/comercial', '/servicos/instalacao-energia-solar', '/blog/o-que-e-energia-solar-fotovoltaica'];
  const sitemapMissing = sitemapMust.filter(u => !sm.includes(u));
  const sitemapHasLegacySolar = sm.includes('/solucoes/solar');

  // prod sitemap
  let prodSitemapMissing = [];
  let prodSitemapHasLegacy = false;
  try {
    const psm = await (await fetch(PROD + '/sitemap.xml')).text();
    prodSitemapMissing = sitemapMust.filter(u => !psm.includes(u));
    prodSitemapHasLegacy = psm.includes('/solucoes/solar');
  } catch (_) {}

  // file presence critical
  const mustExist = [
    'config/solar-capture.js',
    'config/solar-services.js',
    'lib/blog-loader.js',
    'lib/blog-evaluator.js',
    'views/solar.ejs',
    'views/solar-capture.ejs',
    'views/servicos/solar-detalhe.ejs',
    'content/posts/published',
    'public/css/style.css',
  ];
  const missingFiles = mustExist.filter(f => !fs.existsSync(path.join(__dirname, '..', f)));

  // style theme tokens
  const css = fs.readFileSync(path.join(__dirname, '../public/css/style.css'), 'utf8');
  const cssHasSolar = css.includes('[data-theme="solar-warm"]');
  const cssHasAzure = css.includes('[data-theme="azure-sky"]');

  const report = {
    summary: {
      checked: critical.length,
      localFails: localFails.length,
      prodStillOld: prodOld.length,
      okLocalAndAligned: ok.length,
      sitemapMissingLocal: sitemapMissing,
      sitemapHasLegacySolarLocal: sitemapHasLegacySolar,
      sitemapMissingProd: prodSitemapMissing,
      sitemapHasLegacySolarProd: prodSitemapHasLegacy,
      missingFiles,
      cssHasSolar,
      cssHasAzure,
      publishedPosts: getPublishedPosts().length,
      solarSegments: Object.keys(solarCapture.segments).length,
      solarCities: Object.keys(solarCapture.cities).length,
      solarServices: Object.keys(solarServices).length,
    },
    localFails,
    prodOld,
  };

  fs.writeFileSync(path.join(__dirname, 'prod-vs-local-report.json'), JSON.stringify(report, null, 2));

  console.log('\n=== SUMMARY ===');
  console.log('Checked:', critical.length);
  console.log('Local fails:', localFails.length);
  console.log('Prod still OLD / missing new routes:', prodOld.length);
  console.log('Local sitemap missing:', sitemapMissing.length ? sitemapMissing.join(', ') : 'none');
  console.log('Local sitemap has /solucoes/solar?:', sitemapHasLegacySolar);
  console.log('Prod sitemap missing new URLs:', prodSitemapMissing.length ? prodSitemapMissing.join(', ') : 'none');
  console.log('Prod sitemap still has /solucoes/solar?:', prodSitemapHasLegacy);
  console.log('CSS solar-warm:', cssHasSolar, '| azure-sky:', cssHasAzure);
  console.log('Published posts:', report.summary.publishedPosts);
  console.log('Wrote scratch/prod-vs-local-report.json');

  if (prodOld.length) {
    console.log('\n--- PROD GAPS (ainda no ar o antigo) ---');
    prodOld.slice(0, 40).forEach(g => {
      console.log(`- ${g.url}  prod=${g.prodStatus}${g.prodTheme ? ' theme=' + g.prodTheme : ''}  | ${g.note}`);
    });
    if (prodOld.length > 40) console.log(`  ... +${prodOld.length - 40} more`);
  }

  server.close();
});
