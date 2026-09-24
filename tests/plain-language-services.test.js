const assert = require('node:assert/strict');
const locations = require('../config/locations');

const detailServices = Object.entries(locations.default.services)
  .filter(([, service]) => service.template === 'servicos/detalhe-servico');

for (const [serviceKey, service] of detailServices) {
  assert.equal(typeof service.plainLanguage, 'string', serviceKey + ' precisa de resumo em linguagem simples');
  assert.match(service.plainLanguage, /<p>[\s\S]+<\/p>/, serviceKey + ' precisa de parágrafo explicativo');
  assert.doesNotMatch(service.plainLanguage, /100%|inquestionável|garante\s+que|garantindo/i, serviceKey + ' não deve prometer resultado no resumo');
}

console.log('plain-language-services.test.js: ' + detailServices.length + ' páginas verificadas');
