const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const locations = require('../config/locations');

const electricalDetailKeys = [
  'tomadas-interruptores',
  'iluminacao',
  'chuveiro-eletrico',
  'ventiladores',
  'quadro-distribuicao',
  'fiacao-cabeamento',
  'ar-condicionado'
];

for (const key of electricalDetailKeys) {
  const service = locations.default.services[key];
  assert.equal(service.template, 'servicos/detalhe-servico', key + ' precisa de template de detalhe');
  assert.equal(typeof service.introText, 'string', key + ' precisa de intro específica');
  assert.equal(typeof service.plainLanguage, 'string', key + ' precisa de resumo em linguagem simples');
  assert.ok(Array.isArray(service.faq) && service.faq.length >= 3, key + ' precisa de FAQ própria');
  assert.ok(Array.isArray(service.whatsIncluded) && service.whatsIncluded.length > 0, key + ' precisa de escopo próprio');
  assert.equal(typeof service.cta, 'string', key + ' precisa de CTA próprio');
}

const detailTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'servicos', 'detalhe-servico.ejs'), 'utf8');
assert.match(detailTemplate, /serviceData\.faqExtra/, 'template de detalhe precisa renderizar FAQ regional');
assert.match(detailTemplate, /const serviceCta/, 'template de detalhe precisa usar CTA contextual');
assert.match(detailTemplate, /const finalCtaTitle/, 'template de detalhe precisa usar fechamento contextual');

for (const relative of [
  'views/engenharia.ejs',
  'views/eletrica.ejs',
  'views/automacao.ejs',
  'views/servicos/laudos-eletricos.ejs',
  'views/servicos/manutencao-subestacao.ejs'
]) {
  const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');
  assert.match(source, /serviceData\.faqExtra/, relative + ' precisa usar FAQ do serviço');
}

const solarTerms = /\b(?:energia solar|sistema(?:s)? fotovolta|fotovolta|placa solar|painel solar|telhado solar|inversor(?:es)? fotovolta|módulos fotovolta)\b/i;
for (const relative of ['views/automacao-residencial.ejs']) {
  const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');
  assert.doesNotMatch(source, solarTerms, relative + ' não deve conter Solar no conteúdo da página');
}

const campina = fs.readFileSync(path.join(__dirname, '..', 'config', 'locations', 'campina-grande.js'), 'utf8');
const residentialFaq = campina.match(/'projeto-eletrico-unifamiliar':[\s\S]*?faqExtra:\s*\{[\s\S]*?\}/)?.[0] || '';
assert.doesNotMatch(residentialFaq, solarTerms, 'FAQ residencial de Campina Grande não deve conter Solar');

console.log('service-semantic-integrity.test.js: OK');
