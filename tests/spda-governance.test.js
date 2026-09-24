const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const locations = require('../config/locations');
const glossary = require('../config/glossario');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const article = JSON.parse(read('content/posts/published/2026-03-10-spda-para-raios-obrigatorio.json'));
const articleText = article.contentHtml + JSON.stringify(article.faq);
const legacyText = read('config/blog.legacy.js');
const oldRiskyClaims = /cancelada por negligência|primeira documentação cobrada|laudo técnico de SPDA anual|superior a 15 metros|exigem manutenções preventivas do SPDA|renovados anualmente|seguradoras recusam o pagamento/i;

const spda = locations.default.services.spda;
assert.equal(spda.template, 'servicos/detalhe-servico');
assert.match(spda.introText, /projeto.*instalação.*adequação.*inspeção.*manutenção/i);
assert.match(spda.serviceDescription, /conforme a edificação e o escopo contratado/i);
assert.ok(Array.isArray(spda.technicalReferences) && spda.technicalReferences.length >= 2);
assert.deepEqual([spda.heroWidth, spda.heroHeight], [1400, 787]);
const spdaScopeText = JSON.stringify(spda).toLowerCase();
assert.ok(['projeto', 'instalação', 'adequação', 'inspeção', 'manutenção'].every(term => spdaScopeText.includes(term)));

assert.match(article.title, /avaliar a necessidade/i);
assert.ok(Array.isArray(article.sources) && article.sources.length >= 2);
assert.ok(article.dateModified >= '2026-09-12');
assert.doesNotMatch(articleText, oldRiskyClaims);
assert.doesNotMatch(legacyText, oldRiskyClaims);

const blogRoute = read('routes/blog.js');
assert.doesNotMatch(blogRoute, /"@type"\s*:\s*"FAQPage"/);
assert.doesNotMatch(read('views/laudos-eletricos.ejs'), oldRiskyClaims);
assert.doesNotMatch(read('views/servicos/laudos-eletricos.ejs'), oldRiskyClaims);
assert.match(read('public/llms.txt'), /instalação.*adequação.*inspeção.*manutenção/i);
assert.match(read('public/llms-full.txt'), /instalação.*adequação.*inspeção.*manutenção/i);
assert.ok(glossary.terms.some(item => item.serviceLink && item.serviceLink.path === '/solucoes/engenharia/spda'));
assert.match(read('config/locations/joao-pessoa.js'), /atmosfera salina/i);
assert.match(read('config/locations/campina-grande.js'), /Distrito Industrial/i);
assert.match(read('views/servicos/detalhe-servico.ejs'), /technicalReferences/);

console.log('spda-governance.test.js: OK');
