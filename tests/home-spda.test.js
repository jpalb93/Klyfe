const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const homeEngineering = fs.readFileSync(path.join(root, 'views/partials/home/engineering-automation.ejs'), 'utf8');
const homeHero = fs.readFileSync(path.join(root, 'views/partials/home/hero.ejs'), 'utf8');
const homeCss = fs.readFileSync(path.join(root, 'public/css/modules/20-home-sections.css'), 'utf8');

assert.match(homeHero, /https:\/\/wa\.me\/5583991430929\?text=/);
assert.match(homeHero, /class="btn btn-primary"[^>]*data-content-category="solar"[^>]*data-content-name="home-hero-solar-study"/);
assert.match(homeHero, /Solicitar Estudo Solar/);
assert.match(homeHero, /cityData\.preposition/);
assert.match(homeHero, /cityData\.name/);

assert.match(homeEngineering, /class="home-engineering-featured-grid"/);
assert.match(homeEngineering, /class="home-engineering-featured home-spda-featured"/);
assert.match(homeEngineering, /href="<%= homePrefix %>\/solucoes\/engenharia\/spda"/);
assert.match(homeEngineering, /href="<%= homePrefix %>\/solucoes\/engenharia\/subestacao-aerea"/);
assert.match(homeEngineering, /href="<%= homePrefix %>\/solucoes\/engenharia\/projeto-eletrico-industrial"/);
assert.match(homeEngineering, /Projeto e laudo de SPDA/);
assert.match(homeEngineering, /Subestações e cabines primárias/);
assert.match(homeEngineering, /Projetos elétricos industriais/);
assert.match(homeEngineering, /homePrefix/);
assert.equal((homeEngineering.match(/class="home-engineering-featured(?: home-[^"]+-featured)?"/g) || []).length, 3);
assert.ok(homeEngineering.indexOf('class="eng-modern-card eng fade-in"') < homeEngineering.indexOf('class="eng-modern-card auto fade-in"'));
assert.doesNotMatch(homeEngineering, /Projetos elétricos executivos/);
assert.doesNotMatch(homeEngineering, /Projetos de subestações/);
assert.doesNotMatch(homeEngineering, /href="<%= homePrefix %>\/solucoes\/engenharia\/laudos-eletricos"[\s\S]{0,180}Laudos de NR-10 e SPDA/);
assert.match(homeCss, /.home-engineering-featured-grid/);
assert.match(homeCss, /.home-engineering-featured/);
assert.match(homeCss, /\.home-spda-featured/);
assert.match(homeCss, /\.home-eng-pillars-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/);

console.log('home-spda.test.js: OK');
