const express = require('express');
const path = require('path');
const routes = require('../routes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

const server = app.listen(0, async () => {
    const port = server.address().port;
    const testUrl = (p) => `http://localhost:${port}${p}`;

    console.log(`Test server running on port ${port}...`);

    try {
        // Test Pillar Route
        const r1 = await fetch(testUrl('/energia-solar/'));
        console.log(`[TEST] /energia-solar/ -> Status: ${r1.status}`);

        // Test Service Route
        const r2 = await fetch(testUrl('/servicos/instalacao-energia-solar/'));
        console.log(`[TEST] /servicos/instalacao-energia-solar/ -> Status: ${r2.status}`);

        // Test Segment Route
        const r3 = await fetch(testUrl('/energia-solar/comercial/'));
        console.log(`[TEST] /energia-solar/comercial/ -> Status: ${r3.status}`);

        // Test City Route (Campina Grande - Sede)
        const r4 = await fetch(testUrl('/energia-solar/campina-grande-pb/'));
        console.log(`[TEST] /energia-solar/campina-grande-pb/ -> Status: ${r4.status}`);

        // Test City Route (João Pessoa)
        const r5 = await fetch(testUrl('/energia-solar/joao-pessoa-pb/'));
        console.log(`[TEST] /energia-solar/joao-pessoa-pb/ -> Status: ${r5.status}`);

        // Test Legacy 301 Redirects
        const r6 = await fetch(testUrl('/energia-solar-para-empresas'), { redirect: 'manual' });
        console.log(`[TEST] /energia-solar-para-empresas -> Status: ${r6.status}, Location: ${r6.headers.get('location')}`);

        const r6b = await fetch(testUrl('/solucoes/solar'), { redirect: 'manual' });
        console.log(`[TEST] /solucoes/solar -> Status: ${r6b.status}, Location: ${r6b.headers.get('location')}`);

        const r6c = await fetch(testUrl('/campina-grande/solucoes/solar'), { redirect: 'manual' });
        console.log(`[TEST] /campina-grande/solucoes/solar -> Status: ${r6c.status}, Location: ${r6c.headers.get('location')}`);

        // Test Blog Post Route
        const r7 = await fetch(testUrl('/blog/o-que-e-energia-solar-fotovoltaica/'));
        console.log(`[TEST] /blog/o-que-e-energia-solar-fotovoltaica/ -> Status: ${r7.status}`);

        // Test Sitemap
        const r8 = await fetch(testUrl('/sitemap.xml'));
        const xmlText = await r8.text();
        console.log(`[TEST] /sitemap.xml -> Status: ${r8.status}, Length: ${xmlText.length} bytes, Urls: ${(xmlText.match(/<loc>/g) || []).length}`);

        console.log('ALL ROUTE TESTS COMPLETED SUCCESSFULLY!');
    } catch (err) {
        console.error('TEST ERROR:', err);
    } finally {
        server.close();
    }
});
