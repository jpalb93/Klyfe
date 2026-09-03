'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const cities = require('../config/solar-capture/cities');

const prioritySlugs = ['campina-grande-pb', 'joao-pessoa-pb'];

test('páginas solares prioritárias têm metadados e conteúdo de decisão', () => {
  prioritySlugs.forEach((slug) => {
    const city = cities[slug];
    assert.ok(city, `configuração ausente para ${slug}`);
    assert.ok(city.title.length >= 30 && city.title.length <= 60, `title fora da faixa em ${slug}`);
    assert.ok(city.description.length >= 120 && city.description.length <= 160, `description fora da faixa em ${slug}`);
    assert.ok(city.faq.length >= 6, `FAQ insuficiente em ${slug}`);
    assert.equal(city.decisionGuide.priceFactors.length, 3);
    assert.ok(city.decisionGuide.sizingInputs.length >= 4);
    assert.ok(city.decisionGuide.proposalDeliverables.length >= 4);
    assert.ok(city.serviceAreas.length >= 4);
    assert.ok(city.officialSources.length >= 3);
  });
});

test('copy prioritária evita promessas absolutas não demonstradas', () => {
  prioritySlugs.forEach((slug) => {
    const copy = JSON.stringify(cities[slug]).toLowerCase();
    assert.doesNotMatch(copy, /até 95%/);
    assert.doesNotMatch(copy, /homologa[cç][aã]o rápida/);
    const zeroBillFaq = cities[slug].faq.find(item => /zera toda a conta/i.test(item.question));
    assert.ok(zeroBillFaq, `FAQ de transparência sobre a fatura ausente em ${slug}`);
    assert.match(zeroBillFaq.answer, /^Não necessariamente\./);
  });
});

test('navegação e sitemap preservam e reforçam as URLs solares locais', () => {
  const navbar = fs.readFileSync(path.join(__dirname, '../views/partials/navbar.ejs'), 'utf8');
  const sitemap = fs.readFileSync(path.join(__dirname, '../routes/seo.js'), 'utf8');

  assert.match(navbar, /\/energia-solar\/campina-grande-pb\//);
  assert.match(navbar, /\/energia-solar\/joao-pessoa-pb\//);
  assert.match(navbar, /const isSolarContext = currentPage\.includes\('solar'\)/);
  assert.match(sitemap, /'\/energia-solar\/campina-grande-pb'/);
  assert.match(sitemap, /'\/energia-solar\/joao-pessoa-pb'/);
  assert.match(sitemap, /2026-08-27/);
});

test('rotas solares publicam Service e BreadcrumbList sem criar filial em João Pessoa', () => {
  const routes = fs.readFileSync(path.join(__dirname, '../routes/services.js'), 'utf8');
  assert.match(routes, /"@type": "Service"/);
  assert.match(routes, /"@type": "BreadcrumbList"/);
  assert.match(routes, /city\.slug === 'campina-grande-pb'/);
  assert.match(routes, /city\.slug === 'joao-pessoa-pb'/);
  assert.doesNotMatch(JSON.stringify(cities['joao-pessoa-pb']), /sede (?:física )?em João Pessoa/i);
});
