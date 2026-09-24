const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const glossary = require('../config/glossario');

assert.equal(glossary.categories.length, 7, 'o glossário deve cobrir as sete áreas técnicas estratégicas');
assert.ok(glossary.terms.length >= 60, 'o glossário deve ter uma base robusta de termos');
assert.ok(glossary.references.length >= 4, 'o glossário deve ter referências editoriais');
assert.ok(glossary.terms.some(item => item.category === 'energia-solar-fotovoltaica' && /inversor solar/i.test(item.term)));
assert.ok(glossary.terms.some(item => item.category === 'spda-e-protecao' && /^SPDA/i.test(item.term)));
assert.ok(glossary.terms.some(item => item.category === 'carregamento-veicular' && /^Wallbox$/i.test(item.term)));
assert.ok(glossary.terms.every(item => item.definition && item.practical && item.importance));
assert.equal(new Set(glossary.terms.map(item => item.slug)).size, glossary.terms.length, 'slugs do glossário devem ser únicos');
assert.ok(glossary.terms.every(item => item.relatedTerms === undefined || Array.isArray(item.relatedTerms)));

const glossaryView = read('views/glossario.ejs');
const indexRoutes = read('routes/index.js');
assert.match(glossaryView, /glossary-search/);
assert.match(glossaryView, /data-category-jump/);
assert.match(glossaryView, /Na prática/);
assert.match(glossaryView, /Por que importa/);
assert.match(glossaryView, /Fontes e limites deste conteúdo/);
assert.match(indexRoutes, /DefinedTermSet/);
assert.match(indexRoutes, /hasDefinedTerm/);
assert.doesNotMatch(glossaryView, /linkHtml/);

console.log(`glossario-governance.test.js: OK (${glossary.terms.length} termos)`);
