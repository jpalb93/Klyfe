const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const locations = require('../config/locations');
const { resolveTrackingContext } = require('../lib/site-tracking');

const localPrefixes = ['', '/campina-grande', '/joao-pessoa'];
const serviceEntries = Object.entries(locations.default.services)
  .filter(([key]) => key !== 'solar');

for (const [serviceKey, service] of serviceEntries) {
  for (const prefix of localPrefixes) {
    const pathname = prefix + '/solucoes/' + service.category + '/' + serviceKey;
    const context = resolveTrackingContext(pathname);
    assert.notEqual(context.contentCategory, 'solar', pathname + ' não pode usar contexto Solar');
    assert.ok(
      context.waMsg.toLowerCase().includes(service.label.toLowerCase()),
      pathname + ' precisa identificar o serviço'
    );
    assert.match(context.waUrl, /[?&]text=/, pathname + ' precisa abrir o WhatsApp com mensagem');
  }
}

for (const pathname of ['/solucoes', '/contato', '/projetos', '/quem-somos', '/blog', '/glossario']) {
  const context = resolveTrackingContext(pathname);
  assert.match(context.waUrl, /[?&]text=/, pathname + ' precisa abrir o WhatsApp com mensagem');
  assert.notEqual(context.waMsg, locations.default.whatsappMessage, pathname + ' não deve cair na mensagem genérica da cidade');
}

const nonSolarTemplates = [
  'views/aprovacao-energisa.ejs',
  'views/automacao-residencial.ejs',
  'views/automacao.ejs',
  'views/carregador-veicular.ejs',
  'views/contato.ejs',
  'views/correcao-fator-potencia.ejs',
  'views/eletrica.ejs',
  'views/engenharia.ejs',
  'views/instalacoes-industriais.ejs',
  'views/laudos-eletricos.ejs',
  'views/projeto-eletrico.ejs',
  'views/projeto-rede.ejs',
  'views/servicos/detalhe-servico.ejs',
  'views/servicos/laudos-eletricos.ejs',
  'views/servicos/manutencao-subestacao.ejs',
  'views/solucoes.ejs',
  'views/subestacao-aerea.ejs',
  'views/wallbox-residencial.ejs',
  'views/wallbox-condominio.ejs',
  'views/wallbox-empresa.ejs',
  'views/wallbox-energia-solar.ejs'
];

for (const relative of nonSolarTemplates) {
  const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');
  assert.doesNotMatch(source, /https:\/\/wa\.me\/5583991330972["']/i, relative + ' não pode ter WhatsApp sem mensagem');
}

const { getPostBySlug } = require('../lib/blog-loader');
const { evaluatePost, buildLocals } = require('../lib/blog-evaluator');

const wallboxSlugs = [
  'quanto-custa-instalar-wallbox',
  'wallbox-ou-tomada-comum',
  'wallbox-em-condominio',
  'qual-potencia-wallbox-escolher',
  'wallbox-com-energia-solar',
  'quadro-eletrico-wallbox',
  'como-escolher-instalador-wallbox',
  'cuidados-seguranca-carregador-veicular'
];

const evaluatedMessagesDefault = new Set();

for (const slug of wallboxSlugs) {
  const rawPost = getPostBySlug(slug);
  assert.ok(rawPost, 'Post ' + slug + ' deve existir');
  assert.ok(rawPost.whatsappMessage, 'Post ' + slug + ' deve ter whatsappMessage personalizada');

  for (const [cityKey, expectedPhrase] of [
    ['default', 'na Paraíba'],
    ['campina-grande', 'em Campina Grande'],
    ['joao-pessoa', 'em João Pessoa']
  ]) {
    const cityBase = locations[cityKey];
    const locals = buildLocals(cityKey, cityBase);
    const evaluated = evaluatePost(rawPost, locals);

    assert.ok(
      evaluated.whatsappMessage.includes(expectedPhrase),
      `Post ${slug} (${cityKey}) deve conter "${expectedPhrase}". Obtido: "${evaluated.whatsappMessage}"`
    );

    if (cityKey === 'default') {
      evaluatedMessagesDefault.add(evaluated.whatsappMessage);
    }

    const tracking = resolveTrackingContext('/blog/' + slug, {
      contentCategory: 'wallbox',
      waPhone: '5583991330972',
      waMsg: evaluated.whatsappMessage
    });
    assert.equal(tracking.waPhone, '5583991330972');
    assert.match(tracking.waUrl, /[?&]text=/, 'waUrl deve conter parâmetro text');
    assert.ok(tracking.waUrl.includes(encodeURIComponent(evaluated.whatsappMessage)));
  }
}

// Cada um dos 8 posts deve ter mensagem diferente
assert.equal(evaluatedMessagesDefault.size, 8, 'Cada um dos 8 posts de Wallbox deve possuir mensagem de CTA única');

console.log('whatsapp-cta-governance.test.js: OK');
