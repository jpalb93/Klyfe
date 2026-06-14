const http = require('http');
const locations = require('../config/locations');

// Todas as rotas base estáticas
const staticPaths = [
    '',
    '/quem-somos',
    '/solucoes',
    '/projetos',
    '/contato',
    '/glossario',
    '/blog',
    '/solucoes/eletrica',
    '/solucoes/engenharia',
    '/solucoes/solar',
    '/solucoes/automacao',
    '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu'
];

// Prefixo de cidades
const cities = ['', '/campina-grande', '/joao-pessoa'];

// Todas as possíveis chaves de serviços
const serviceKeys = Object.keys(locations.default.services);

const urlsToTest = [];

// 1. Gera URLs estáticas para cada cidade
cities.forEach(city => {
    staticPaths.forEach(path => {
        // Evita duplicar projetos estáticos que não aceitam prefixo de cidade
        if (path === '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu' && city !== '') return;
        urlsToTest.push(`${city}${path}`);
    });
});

// Helper para verificar se serviço é habilitado para dada cidade
function isServiceEnabled(cityKey, serviceKey) {
    const currentData = locations[cityKey];
    if (cityKey === 'default' || (currentData && currentData.allServices === true)) return true;
    return !!(currentData && currentData.services && currentData.services[serviceKey]);
}

// 2. Gera URLs dinâmicas de serviços seguindo o SEO Mesh
cities.forEach(cityPrefix => {
    const cityKey = cityPrefix === '' ? 'default' : cityPrefix.replace('/', '');
    
    serviceKeys.forEach(serviceKey => {
        const defaultSvc = locations.default.services[serviceKey];
        if (serviceKey === defaultSvc.category) return; // ignora a categoria em si (já testada em staticPaths)

        // Apenas testa se o serviço está habilitado para aquela cidade
        if (isServiceEnabled(cityKey, serviceKey)) {
            urlsToTest.push(`${cityPrefix}/solucoes/${defaultSvc.category}/${serviceKey}`);
        } else {
            // Se NÃO estiver habilitado, deve retornar 404! Vamos testar se realmente dá 404
            urlsToTest.push({ path: `${cityPrefix}/solucoes/${defaultSvc.category}/${serviceKey}`, expectedStatus: 404 });
        }
    });
});

console.log(`[TESTADOR] Iniciando teste de ${urlsToTest.length} URLs...\n`);

function testUrl(urlObj) {
    return new Promise((resolve) => {
        const path = typeof urlObj === 'string' ? urlObj : urlObj.path;
        const expected = typeof urlObj === 'string' ? 200 : urlObj.expectedStatus;

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path === '' ? '/' : path,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (TestRunner)'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                const is404Page = data.includes('Página Não Encontrada');
                const actualStatus = is404Page ? 404 : res.statusCode;

                if (actualStatus === expected) {
                    resolve({ path, status: actualStatus, success: true });
                } else {
                    resolve({ path, status: actualStatus, expected, success: false });
                }
            });
        });

        req.on('error', (err) => {
            resolve({ path, error: err.message, success: false });
        });

        req.end();
    });
}

async function runTests() {
    const results = [];
    for (const url of urlsToTest) {
        const res = await testUrl(url);
        results.push(res);
    }

    const failures = results.filter(r => !r.success);
    const successes = results.filter(r => r.success);

    console.log(`\n=== RESULTADO DOS TESTES ===`);
    console.log(`Sucessos: ${successes.length}/${results.length}`);
    console.log(`Falhas: ${failures.length}/${results.length}`);

    if (failures.length > 0) {
        console.log(`\n--- DETALHES DAS FALHAS ---`);
        failures.forEach(f => {
            if (f.error) {
                console.log(`❌ ${f.path} -> ERRO DE CONEXÃO: ${f.error}`);
            } else {
                console.log(`❌ ${f.path} -> Status real: ${f.status} | Esperado: ${f.expected}`);
            }
        });
    } else {
        console.log(`\n✅ Excelente! Todas as páginas e slugs ativos responderam com sucesso (200), e as rotas inativas/desabilitadas retornaram 404 corretamente.`);
    }
}

// Pequeno atraso para garantir que o script de importação de rotas está pronto
setTimeout(runTests, 500);
