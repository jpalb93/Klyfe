const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const templates = [
    ['views/engenharia.ejs', /cityPrefix\s*%>\/contato/],
    ['views/eletrica.ejs', /getHomePrefix\(\)\s*%>\/contato/],
    ['views/automacao.ejs', /getHomePrefix\(\)\s*%>\/contato/],
    ['views/solucoes.ejs', /cityPrefix\s*%>\/contato/],
    ['views/aprovacao-energisa.ejs', /getHomePrefix\(\)\s*%>\/solucoes\/engenharia/],
    ['views/correcao-fator-potencia.ejs', /getHomePrefix\(\)\s*%>\/solucoes\/engenharia/],
    ['views/laudos-eletricos.ejs', /getHomePrefix\(\)\s*%>\/solucoes\/engenharia/]
];

for (const [relative, pattern] of templates) {
    const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');
    assert.match(source, pattern, `${relative} perdeu o prefixo local`);
}

const indexRoutes = fs.readFileSync(path.join(__dirname, '..', 'routes/index.js'), 'utf8');
assert.match(indexRoutes, /localizedGlossario/);
assert.match(indexRoutes, /localizedPrefixPath/);
assert.match(indexRoutes, /energia-solar\/campina-grande-pb/);
assert.match(indexRoutes, /energia-solar\/joao-pessoa-pb/);

console.log('local-links.test.js: OK');
