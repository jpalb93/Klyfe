const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const locations = require('../config/locations');
const glossary = require('../config/glossario');
const {
    getServiceGlossaryLinks,
    getServiceGlossaryTerms,
    inferServiceGlossaryKey,
    serviceTermNames
} = require('../config/service-glossary');

const glossarySlugs = new Set(glossary.terms.map(term => term.slug));
const serviceEntries = Object.entries(locations.default.services);

assert.equal(serviceEntries.length, 36, 'a auditoria deve cobrir todos os serviços cadastrados');
for (const [serviceKey, service] of serviceEntries) {
    const terms = getServiceGlossaryTerms(serviceKey, service.category);
    const links = getServiceGlossaryLinks(serviceKey, 'default', service.category);

    assert.ok(serviceTermNames[serviceKey], `serviço sem mapa editorial: ${serviceKey}`);
    assert.ok(terms.length >= 4, `serviço com poucos termos relacionados: ${serviceKey}`);
    assert.ok(terms.length <= 6, `serviço com termos demais: ${serviceKey}`);
    assert.equal(links.length, terms.length, `links devem refletir os termos de ${serviceKey}`);
    assert.ok(links.every(link => glossarySlugs.has(link.slug)), `link inválido no serviço ${serviceKey}`);
    assert.ok(links.every(link => link.href === `/glossario#${link.slug}`), `href inconsistente em ${serviceKey}`);
    assert.ok(links.every(link => link.definition && link.practical && link.importance), `conteúdo modal incompleto em ${serviceKey}`);
    assert.ok(links.every(link => Array.isArray(link.related)), `relações ausentes em ${serviceKey}`);
}

for (const cityKey of ['campina-grande', 'joao-pessoa']) {
    const links = getServiceGlossaryLinks('spda', cityKey);
    assert.ok(links.every(link => link.href.startsWith(`/${cityKey}/glossario#`)));
}

assert.equal(inferServiceGlossaryKey('/solucoes/engenharia/spda/'), 'spda');
assert.equal(inferServiceGlossaryKey('/campina-grande/solucoes/eletrica/wallbox-empresa/'), 'wallbox-empresa');
assert.equal(inferServiceGlossaryKey('/joao-pessoa/solucoes/automacao'), 'automacao');
assert.equal(inferServiceGlossaryKey('/energia-solar/joao-pessoa-pb/'), 'solar');
assert.equal(inferServiceGlossaryKey('/contato'), null);

const footer = read('views/partials/footer.ejs');
const bridge = read('views/partials/related-glossary.ejs');
const modalScript = read('public/js/glossary-modal.js');
const css = read('public/css/modules/46-shared-glossary.css');
// O rodapé de todas as páginas (inclusive a Home) inclui a ponte do glossário,
// então o estilo precisa estar em todos os bundles principais.
for (const bundle of ['home.css', 'style.css', 'solar.css']) {
    assert.match(read(`public/css/${bundle}`), /\.service-glossary-bridge \{/, `${bundle} sem estilos do glossário`);
}
assert.match(footer, /related-glossary/);
assert.match(footer, /getServiceGlossaryLinks\(activeGlossaryServiceKey, activeGlossaryCategory, currentCityKey\)/);
assert.match(bridge, /service-glossary-bridge/);
assert.match(bridge, /data-glossary-trigger/);
assert.match(bridge, /data-glossary-template/);
assert.match(bridge, /href="<%= link.href %>"/);
assert.match(modalScript, /data-glossary-modal/);
assert.match(modalScript, /event\.key === 'Escape'/);
assert.match(css, /\.service-glossary-bridge/);
assert.match(css, /\.service-glossary-modal/);
assert.doesNotMatch(read('views/automacao.ejs'), /glossario#/);
assert.doesNotMatch(read('views/eletrica.ejs'), /glossario#/);
assert.doesNotMatch(read('views/servicos/laudos-eletricos.ejs'), /glossario#/);
assert.doesNotMatch(read('views/servicos/manutencao-subestacao.ejs'), /glossario#/);

console.log(`service-glossary.test.js: OK (${serviceEntries.length} serviços, ${glossary.terms.length} termos disponíveis)`);
