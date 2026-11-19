'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const { buildCritical } = require('../scripts/build-critical-css');

const homeCss = fs.readFileSync(path.join(root, 'public/css/home.css'), 'utf8');
const critical = buildCritical(homeCss);
const generated = fs.readFileSync(path.join(root, 'views/partials/generated/home-critical-css.ejs'), 'utf8');
const head = fs.readFileSync(path.join(root, 'views/partials/head.ejs'), 'utf8');

// A primeira tela precisa das regras do menu, do hero e da faixa de confiança.
for (const selector of ['.navbar', '.hero-title', '.hero-subtitle', '.btn-primary', '.trust-counter-grid', '.mobile-nav', '@font-face']) {
    assert.ok(critical.includes(selector), `CSS crítico sem ${selector}`);
}

// Seções abaixo da dobra e temas aposentados ficam de fora.
for (const selector of ['.faq-item', '.blog-card-title', '.daily-modern-card', 'data-theme="daylight-gold"']) {
    assert.ok(!critical.includes(selector), `CSS crítico não deveria ter ${selector}`);
}

assert.ok(Buffer.byteLength(critical) < 45000, 'CSS crítico cresceu demais para ir inline');

// O arquivo gerado está em dia com o home.css atual (rode npm run build:css).
assert.ok(generated.includes(critical), 'home-critical-css.ejs desatualizado: rode npm run build:css');
assert.ok(generated.includes('html.home-css-pending main>section'), 'faltou o bloqueio do conteúdo abaixo da dobra');

// head.ejs: crítico inline, bundle completo sem bloquear e fallback sem JS.
assert.match(head, /include\('generated\/home-critical-css'\)/);
assert.match(head, /<link id="home-css" rel="preload" href="\/css\/home\.css\?v=[^"]+" as="style"/);
assert.match(head, /<noscript><link rel="stylesheet" href="\/css\/home\.css/);
assert.match(head, /klyfeHomeCssReady/);
assert.match(head, /classList\.add\('home-css-pending'\)/);
assert.match(head, /classList\.remove\('home-css-pending'\)/);

console.log(`home-critical-css.test.js: OK — ${Buffer.byteLength(critical)} bytes inline`);
