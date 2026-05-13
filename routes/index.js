const express = require('express');
const router = express.Router();

const baseUrl = 'https://www.klyfeelectric.com.br';

// Rota Home
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Klyfe Electric | Soluções Elétricas, Automação e Energia Solar em Campina Grande/PB',
        description: 'Klyfe Electric: projetos elétricos, automação e energia solar em Campina Grande e João Pessoa. 5★ no Google · (83) 99133-0972',
        canonical: `${baseUrl}/`,
        page: 'home'
    });
});

// Rota Quem Somos
router.get('/quem-somos', (req, res) => {
    res.render('quem-somos', {
        title: 'Quem Somos | Klyfe Electric — Campina Grande/PB',
        description: 'Conheça a Klyfe Electric: engenharia elétrica, automação e energia solar em Campina Grande. 5★ no Google, 200+ projetos entregues.',
        canonical: `${baseUrl}/quem-somos`,
        page: 'quem-somos'
    });
});

// Rota Portal de Soluções (Hub)
router.get('/solucoes', (req, res) => {
    res.render('solucoes', {
        title: 'Nossas Soluções em Engenharia, Elétrica e Automação | Klyfe Electric',
        description: 'Conheça o ecossistema completo de soluções da Klyfe Electric na Paraíba. Engenharia de precisão, automação inteligente e energia solar.',
        canonical: `${baseUrl}/solucoes`,
        page: 'solucoes'
    });
});

// Rota Engenharia Elétrica
router.get('/solucoes/engenharia', (req, res) => {
    res.render('engenharia', {
        title: 'Engenharia Elétrica em Campina Grande | Klyfe Electric',
        description: 'Projetos elétricos de alto nível, subestações, laudos NR-10 e consultoria técnica em Campina Grande e João Pessoa. Engenharia de precisão com ART.',
        canonical: `${baseUrl}/solucoes/engenharia`,
        page: 'engenharia'
    });
});

// Rota Específica Laudos Elétricos (SEO)
router.get('/solucoes/engenharia/laudos-eletricos', (req, res) => {
    res.render('laudos-eletricos', {
        title: 'Laudos Elétricos em Campina Grande e Paraíba | Klyfe Electric',
        description: 'Laudos elétricos completos (NBR 5410, NR-10, SPDA, aterramento, subestação) com inspeção, medições, termografia e ART. Atendemos residências, comércios, indústrias e condomínios.',
        canonical: `${baseUrl}/solucoes/engenharia/laudos-eletricos`,
        page: 'engenharia'
    });
});

// Rota Serviços Elétricos (Eletricista)
router.get('/solucoes/eletrica', (req, res) => {
    res.render('eletrica', {
        title: 'Serviços Elétricos e Eletricista em Campina Grande | Klyfe Electric',
        description: 'Serviços de eletricista em Campina Grande: manutenção, reparos, instalações residenciais e comerciais. Tomadas, luminárias, ventiladores e chuveiros.',
        canonical: `${baseUrl}/solucoes/eletrica`,
        page: 'eletrica'
    });
});

// Rota Específica Carregador Veicular (SEO)
router.get('/solucoes/servicos-eletricos/montagem-carregador-veicular', (req, res) => {
    res.render('carregador-veicular', {
        title: 'Montagem de Carregador Veicular em Campina Grande | Klyfe Electric',
        description: 'Montagem segura de carregadores veiculares (EV) em residências, empresas e estacionamentos em Campina Grande. Integração com rede e sistemas solares.',
        canonical: `${baseUrl}/solucoes/servicos-eletricos/montagem-carregador-veicular`,
        page: 'eletrica'
    });
});

// Rota Específica Projeto de Rede (SEO)
router.get('/solucoes/eletrica/projeto-rede-telefonia-antena', (req, res) => {
    res.render('projeto-rede', {
        title: 'Projeto de Rede, Telefonia e Antena em Campina Grande | Klyfe Electric',
        description: 'Projetos de rede estruturada, telefonia e antena com ART, memorial descritivo e aprovação técnica em Campina Grande e Paraíba.',
        canonical: `${baseUrl}/solucoes/eletrica/projeto-rede-telefonia-antena`,
        page: 'eletrica'
    });
});

// Rota Automação
router.get('/solucoes/automacao', (req, res) => {
    res.render('automacao', {
        title: 'Automação Residencial e Industrial em Campina Grande | Klyfe Electric',
        description: 'Smart home, programação de CLPs, SCADA e automação industrial em CG e JP. Siemens, WEG, Allen-Bradley. (83) 99133-0972',
        canonical: `${baseUrl}/solucoes/automacao`,
        page: 'automacao'
    });
});

// Rota Específica Automação Residencial (SEO)
router.get('/solucoes/automacao/automacao-residencial', (req, res) => {
    res.render('automacao-residencial', {
        title: 'Automação Residencial em Campina Grande e João Pessoa | Klyfe Electric',
        description: 'Transforme sua casa em uma verdadeira casa inteligente com a automação residencial da Klyfe Electric. Controle iluminação, climatização, segurança e som ambiente pelo celular ou voz.',
        canonical: `${baseUrl}/solucoes/automacao/automacao-residencial`,
        page: 'automacao'
    });
});

// Rota Energia Solar
router.get('/solucoes/solar', (req, res) => {
    res.render('solar', {
        title: 'Energia Solar em Campina Grande e João Pessoa | Klyfe Electric',
        description: 'Instalação de painéis solares fotovoltaicos em Campina Grande e João Pessoa. On-grid, off-grid e híbrido. Economize até 95%. (83) 99133-0972',
        canonical: `${baseUrl}/solucoes/solar`,
        page: 'solar'
    });
});

// Rota Projetos
router.get('/projetos', (req, res) => {
    res.render('projetos', {
        title: 'Projetos e Portfólio | Klyfe Electric',
        description: 'Conheça nosso portfólio de obras elétricas, automação e energia solar entregues na Paraíba.',
        canonical: `${baseUrl}/projetos`,
        page: 'projetos'
    });
});

// Rota Blog
router.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog e Artigos Técnicos | Klyfe Electric',
        description: 'Artigos sobre engenharia elétrica, automação residencial e industrial, energia solar e tecnologias.',
        canonical: `${baseUrl}/blog`,
        page: 'blog'
    });
});

// Rota Contato (GET)
router.get('/contato', (req, res) => {
    res.render('contato', {
        title: 'Contato e Orçamento | Klyfe Electric — (83) 99133-0972',
        description: 'Solicite seu orçamento. R. da Cerâmica, 34, Santa Rosa, Campina Grande/PB. (83) 99133-0972. Atende CG, JP e região.',
        canonical: `${baseUrl}/contato`,
        page: 'contato'
    });
});

// Rota Contato (POST) - Mock para logs
router.post('/contato', (req, res) => {
    console.log('=== Novo Contato Recebido ===');
    console.log(req.body);
    console.log('=============================');
    
    // Simula uma resposta de sucesso enviando para uma página de sucesso ou recarregando com mensagem
    // Por enquanto, enviamos um JSON de sucesso, assumindo que o frontend enviará via Fetch/AJAX.
    res.json({ success: true, message: 'Mensagem recebida com sucesso! Em breve entraremos em contato.' });
});

// Rota Sitemap XML
router.get('/sitemap.xml', (req, res) => {
    const urls = [
        '/', '/quem-somos', '/solucoes',
        '/solucoes/engenharia', '/solucoes/engenharia/laudos-eletricos', 
        '/solucoes/eletrica', '/solucoes/servicos-eletricos/montagem-carregador-veicular', '/solucoes/eletrica/projeto-rede-telefonia-antena',
        '/solucoes/automacao', '/solucoes/automacao/automacao-residencial', 
        '/solucoes/solar', '/projetos', '/blog', '/contato'
    ];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urls.forEach(url => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${url}</loc>\n`;
        sitemap += `    <changefreq>weekly</changefreq>\n`;
        let priority = '0.8';
        if (url === '/') priority = '1.0';
        if (url === '/solucoes') priority = '0.9';
        sitemap += `    <priority>${priority}</priority>\n`;
        sitemap += `  </url>\n`;
    });
    
    sitemap += `</urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Rota Robots.txt
router.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
});

module.exports = router;
