/**
 * Full-site link & route audit for Klyfe
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('../routes');
const locations = require('../config/locations');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const { getPublishedPosts } = require('../lib/blog-loader');

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
app.use((req, res) => {
  res.status(404).send('404');
});

function walkViews(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkViews(full, acc);
    else if (entry.name.endsWith('.ejs')) acc.push(full);
  }
  return acc;
}

function extractHrefs(html) {
  const hrefs = new Set();
  const re = /href=["']([^"'#][^"']*)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1].trim();
    if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('//') || href.startsWith('data:')) continue;
    // strip query
    href = href.split('?')[0];
    if (!href.startsWith('/')) continue;
    hrefs.add(href);
  }
  return [...hrefs];
}

function seedUrls() {
  const urls = new Set([
    '/',
    '/quem-somos',
    '/solucoes',
    '/solucoes/engenharia',
    '/solucoes/eletrica',
    '/solucoes/automacao',
    '/contato',
    '/blog',
    '/projetos',
    '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu',
    '/politica-de-privacidade',
    '/glossario',
    '/energia-solar/',
    '/campina-grande',
    '/joao-pessoa',
    '/campina-grande/blog',
    '/joao-pessoa/blog',
    '/sitemap.xml',
    '/robots.txt',
  ]);

  for (const s of Object.values(solarCapture.segments)) urls.add(s.urlPath);
  for (const c of Object.values(solarCapture.cities)) urls.add(c.urlPath);
  for (const s of Object.values(solarServices)) urls.add(s.urlPath);
  for (const p of getPublishedPosts()) {
    urls.add(`/blog/${p.slug}`);
    urls.add(`/blog/${p.slug}/`);
  }

  // legacy that should redirect
  urls.add('/solucoes/solar');
  urls.add('/campina-grande/solucoes/solar');
  urls.add('/energia-solar-para-empresas');
  urls.add('/blog/quanto-custa-energia-solar-2026');
  urls.add('/blog/payback-painel-solar-simulacao');

  return [...urls];
}

const server = app.listen(0, async () => {
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  console.log(`Audit server on ${port}`);

  const queue = seedUrls();
  const seen = new Set();
  const results = [];
  const broken = [];
  const redirects = [];
  const themeIssues = [];

  async function check(url) {
    if (seen.has(url)) return;
    seen.add(url);
    try {
      const res = await fetch(base + url, { redirect: 'manual' });
      const status = res.status;
      const loc = res.headers.get('location') || '';
      let html = '';
      if (status >= 200 && status < 300 && (res.headers.get('content-type') || '').includes('text/html')) {
        html = await res.text();
        // crawl more links from HTML
        for (const href of extractHrefs(html)) {
          if (!seen.has(href) && !queue.includes(href)) queue.push(href);
        }
        // theme expectations
        if (url === '/' || url === '/campina-grande' || url === '/joao-pessoa') {
          if (!html.includes('data-theme="solar-warm"')) themeIssues.push({ url, expect: 'solar-warm' });
        }
        if (url.startsWith('/energia-solar') || url.startsWith('/servicos/')) {
          if (!html.includes('data-theme="azure-sky"')) themeIssues.push({ url, expect: 'azure-sky' });
        }
      } else if (status >= 200 && status < 300) {
        // consume body
        await res.arrayBuffer();
      }

      const row = { url, status, loc };
      results.push(row);
      if (status >= 400) broken.push(row);
      if (status >= 300 && status < 400) redirects.push(row);
      process.stdout.write(status >= 400 ? 'x' : status >= 300 ? '>' : '.');
    } catch (err) {
      broken.push({ url, status: 'ERR', loc: String(err.message) });
      process.stdout.write('!');
    }
  }

  while (queue.length) {
    const batch = queue.splice(0, 12);
    await Promise.all(batch.map(check));
  }

  // static image refs scan from views
  const imgBroken = [];
  const viewFiles = walkViews(path.join(__dirname, '../views'));
  const imgRe = /(?:src|href)=["'](\/img\/[^"']+)["']/gi;
  const imgs = new Set();
  for (const vf of viewFiles) {
    const txt = fs.readFileSync(vf, 'utf8');
    let m;
    while ((m = imgRe.exec(txt))) imgs.add(m[1].split('?')[0]);
  }
  for (const img of imgs) {
    const filePath = path.join(__dirname, '../public', img);
    if (!fs.existsSync(filePath)) imgBroken.push(img);
  }

  // legacy string scan
  const legacyHits = [];
  const legacyPatterns = [
    /\/solucoes\/solar(?![-\w])/g,
    /config\/blog\.legacy/g,
    /theme\s*=\s*['"]['"]/g,
  ];
  for (const vf of [...viewFiles, path.join(__dirname, '../routes/index.js'), path.join(__dirname, '../server.js')]) {
    const txt = fs.readFileSync(vf, 'utf8');
    const rel = path.relative(path.join(__dirname, '..'), vf);
    if (txt.includes('/solucoes/solar') && !rel.includes('test') && !txt.includes("'/solucoes/solar': '/energia-solar/'") && !txt.includes("'/solucoes/solar': '/energia-solar/'") ) {
      // count occurrences that look like href targets
      const hrefHits = [...txt.matchAll(/href=["']([^"']*\/solucoes\/solar[^"']*)["']/g)].map(x => x[1]);
      if (hrefHits.length) legacyHits.push({ file: rel, hrefHits });
    }
  }

  console.log('\n\n=== SUMMARY ===');
  console.log('Pages checked:', results.length);
  console.log('OK (2xx):', results.filter(r => r.status >= 200 && r.status < 300).length);
  console.log('Redirects (3xx):', redirects.length);
  console.log('Broken (4xx/5xx/ERR):', broken.length);
  console.log('Theme issues:', themeIssues.length);
  console.log('Missing images referenced in views:', imgBroken.length);
  console.log('Legacy /solucoes/solar hrefs remaining:', legacyHits.length);

  if (broken.length) {
    console.log('\n--- BROKEN ---');
    broken.forEach(b => console.log(b.status, b.url, b.loc || ''));
  }
  if (themeIssues.length) {
    console.log('\n--- THEME ISSUES ---');
    themeIssues.forEach(t => console.log(t.url, 'expected', t.expect));
  }
  if (imgBroken.length) {
    console.log('\n--- MISSING IMAGES ---');
    imgBroken.slice(0, 40).forEach(i => console.log(i));
    if (imgBroken.length > 40) console.log(`... +${imgBroken.length - 40} more`);
  }
  if (legacyHits.length) {
    console.log('\n--- LEGACY HREFS ---');
    legacyHits.forEach(h => console.log(h.file, h.hrefHits.join(', ')));
  }

  // write report json
  const report = { checked: results.length, broken, redirects, themeIssues, imgBroken, legacyHits };
  fs.writeFileSync(path.join(__dirname, 'audit-report.json'), JSON.stringify(report, null, 2));
  console.log('\nWrote scratch/audit-report.json');
  server.close();
});
