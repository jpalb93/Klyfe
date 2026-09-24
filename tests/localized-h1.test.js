const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const serviceTemplates = [
    'views/servicos/detalhe-servico.ejs',
    'views/servicos/laudos-eletricos.ejs',
    'views/servicos/manutencao-subestacao.ejs',
    'views/projeto-eletrico.ejs',
    'views/projeto-rede.ejs',
    'views/carregador-veicular.ejs',
    'views/automacao-residencial.ejs',
    'views/aprovacao-energisa.ejs',
    'views/correcao-fator-potencia.ejs',
    'views/subestacao-aerea.ejs',
    'views/instalacoes-industriais.ejs',
    'views/engenharia.ejs',
    'views/eletrica.ejs',
    'views/automacao.ejs',
    'views/laudos-eletricos.ejs',
    'views/wallbox-residencial.ejs',
    'views/wallbox-condominio.ejs',
    'views/wallbox-empresa.ejs',
    'views/wallbox-energia-solar.ejs'
];

for (const relative of serviceTemplates) {
    const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');
    const h1 = source.match(/<h1[\s\S]*?<\/h1>/i)?.[0];
    assert.ok(h1, `${relative} precisa ter H1`);
    assert.match(h1, /cityData(?:\.preposition|\s*\?)/, `${relative} precisa localizar o H1`);
    assert.doesNotMatch(h1, /—\s*<%[\s\S]*?cityData/, `${relative} não deve separar serviço e localidade por travessão`);
}

console.log('localized-h1.test.js: OK');
