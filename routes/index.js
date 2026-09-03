const express = require('express');
const router = express.Router();
const locations = require('../config/locations');
const glossario = require('../config/glossario');
const business = require('../config/business');
const { getPublishedPosts } = require('../lib/blog-loader');
const { evaluatePosts } = require('../lib/blog-evaluator');

// Sub-routers especializados
const redirectsRouter = require('./redirects');
const servicesRouter = require('./services');
const blogRouter = require('./blog');
const landingPagesRouter = require('./landing-pages');
const apiTrackingRouter = require('./api-tracking');
const seoRouter = require('./seo');
const calculatorRouter = require('./calculator');

const baseUrl = 'https://www.klyfeelectric.com.br';

// 1. Redirecionamentos Legados 301 e normalização de URLs
router.use(redirectsRouter);

// 2. Middleware para disponibilizar ajudantes globais de localização nos templates EJS
router.use((req, res, next) => {
    // Determina a cidade atual diretamente pela URL para evitar falhas de contexto
    const pathParts = req.path.split('/');
    const cityFromUrl = (pathParts[1] === 'campina-grande' || pathParts[1] === 'joao-pessoa') ? pathParts[1] : 'default';

    // Disponibiliza dados da cidade globalmente
    res.locals.cityKey = cityFromUrl;
    res.locals.cityData = locations[cityFromUrl];
    res.locals.locations = locations;

    res.locals.isServiceEnabled = (serviceKey) => {
        const currentData = res.locals.cityData;
        
        // Na Paraíba (default) ou se a cidade tiver tudo habilitado (Campina Grande), retorna true
        if (cityFromUrl === 'default' || (currentData && currentData.allServices === true)) return true;
        
        // Caso contrário, verifica se o serviço específico está no objeto da cidade
        return !!(currentData && currentData.services && currentData.services[serviceKey]);
    };
    
    // Helper para prefixo de URL (SEO Mesh)
    res.locals.homePrefix = (cityFromUrl !== 'default') ? '/' + cityFromUrl : '';
    res.locals.getHomePrefix = () => {
        return (cityFromUrl !== 'default') ? '/' + cityFromUrl : '';
    };

    // Helper para pegar serviços ativos de uma categoria
    res.locals.getServicesByCategory = (cat) => {
        const allPossible = locations.default.services;
        return Object.keys(allPossible).filter(key => {
            const svc = allPossible[key];
            return svc.category === cat && res.locals.isServiceEnabled(key) && key !== cat;
        });
    };

    next();
});

// 3. Montagem dos Sub-Routers
router.use(servicesRouter);
router.use(blogRouter);
router.use(landingPagesRouter);
router.use(apiTrackingRouter);
router.use(seoRouter);
router.use(calculatorRouter);

// ═══ ROTAS ESTÁTICAS E INSTITUCIONAIS CORE ═══

// Home
router.get('/:city(campina-grande|joao-pessoa)?', (req, res) => {
    const cityKey  = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = cityKey === 'default' ? `${baseUrl}/` : `${baseUrl}/${cityKey}`;
    const homeSeoByCity = {
        default: {
            title: 'Energia Solar na Paraíba com Engenharia | Klyfe',
            description: 'Energia solar na Paraíba com projeto, ART, instalação e homologação. Sede em Campina Grande e atendimento regional. Solicite seu estudo.',
            eyebrow: 'KLYFE ELECTRIC | ENGENHARIA & ENERGIA',
            h1Lead: 'Energia Solar',
            h1Middle: 'com Engenharia na',
            h1Location: 'Paraíba',
            heroText: 'Projetos e instalação de energia solar com análise da fatura, dimensionamento, ART e acompanhamento da homologação. Com sede em Campina Grande, a Klyfe também atua com projetos e serviços de engenharia elétrica, laudos, subestações e automação.',
            localProofLink: '/energia-solar/',
            localProofLinkText: 'Conhecer energia solar na Paraíba'
        },
        'campina-grande': {
            title: 'Energia Solar em Campina Grande | Klyfe Electric',
            description: 'Energia solar em Campina Grande com projeto, ART, instalação e homologação Energisa. Atendimento pela sede local da Klyfe. Solicite seu estudo.',
            eyebrow: 'KLYFE ELECTRIC | ENGENHARIA & ENERGIA',
            h1Lead: 'Energia Solar',
            h1Middle: 'com Engenharia em',
            h1Location: 'Campina Grande',
            heroText: 'Energia solar em Campina Grande com atendimento pela sede local, análise da fatura, projeto com ART, instalação e acompanhamento da homologação na Energisa Borborema. A Klyfe também desenvolve projetos e serviços de engenharia elétrica, laudos, subestações e automação.',
            localProofLink: '/energia-solar/campina-grande-pb/',
            localProofLinkText: 'Ver energia solar em Campina Grande'
        },
        'joao-pessoa': {
            title: 'Energia Solar em João Pessoa | Klyfe Electric',
            description: 'Energia solar em João Pessoa com projeto, ART, instalação e homologação Energisa. Atendimento a partir de Campina Grande. Solicite seu estudo.',
            eyebrow: 'KLYFE ELECTRIC | ENGENHARIA & ENERGIA',
            h1Lead: 'Energia Solar',
            h1Middle: 'com Engenharia em',
            h1Location: 'João Pessoa',
            heroText: 'Projetos de energia solar em João Pessoa para residências, condomínios e empresas, com atendimento organizado a partir da sede em Campina Grande. A Klyfe também atua com engenharia elétrica, laudos, subestações e automação, conforme o escopo e a logística do projeto.',
            localProofLink: '/energia-solar/joao-pessoa-pb/',
            localProofLinkText: 'Ver energia solar em João Pessoa'
        }
    };
    const homeSeo = homeSeoByCity[cityKey];
    
    const allPosts = getPublishedPosts();
    const evaluatedPosts = evaluatePosts(allPosts.slice(0, 4), cityKey, cityBase);

    // A entidade WebSite já é publicada pelo head global; a Home descreve a página atual.
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "${canonical}#webpage",
      "url": "${canonical}",
      "name": ${JSON.stringify(homeSeo.title)},
      "description": ${JSON.stringify(homeSeo.description)},
      "inLanguage": "pt-BR",
      "isPartOf": { "@id": "${baseUrl}/#website" },
      "about": { "@id": "${baseUrl}/#localbusiness" },
      "publisher": { "@id": "${baseUrl}/#localbusiness" }
    }
    </script>
    `;

    res.render('index', {
        title: homeSeo.title,
        description: homeSeo.description,
        canonical,
        cityKey,
        cityData: cityBase,
        homeSeo,
        page: 'home',
        posts: evaluatedPosts,
        jsonLd,
        theme: 'solar-warm'
    });
});

// Quem Somos
router.get('/:city(campina-grande|joao-pessoa)?/quem-somos', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    res.render('quem-somos', {
        title: `Quem Somos | Klyfe Electric ${cityBase.preposition} ${cityBase.name}`,
        description: `Conheça a história da Klyfe Electric, referência em engenharia elétrica, automação residencial e energia solar ${cityBase.preposition} ${cityBase.name} e toda a região.`,
        canonical: cityKey === 'default' ? `${baseUrl}/quem-somos` : `${baseUrl}/${cityKey}/quem-somos`,
        cityKey, cityData: cityBase, page: 'quem-somos'
    });
});

// Política de Privacidade (LGPD / Meta App Review)
router.get('/politica-de-privacidade', (req, res) => {
    const cityBase = locations.default;
    res.render('politica-de-privacidade', {
        title: 'Política de Privacidade | Klyfe Electric',
        description:
            'Política de Privacidade da Klyfe Electric: como tratamos dados pessoais no site, WhatsApp, formulários e canais digitais, em conformidade com a LGPD.',
        canonical: `${baseUrl}/politica-de-privacidade`,
        cityKey: 'default',
        cityData: cityBase,
        page: 'politica-de-privacidade',
    });
});

// Portal de Soluções
router.get('/:city(campina-grande|joao-pessoa)?/solucoes', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    res.render('solucoes', {
        title: `Nossas Soluções ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Engenharia elétrica, automação residencial e energia solar fotovoltaica ${cityBase.preposition} ${cityBase.name}. Projetos seguros com responsabilidade técnica e ART.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes` : `${baseUrl}/${cityKey}/solucoes`,
        cityKey, cityData: cityBase, page: 'solucoes'
    });
});

// Projetos
router.get('/:city(campina-grande|joao-pessoa)?/projetos', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    res.render('projetos', {
        title: `Projetos ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Portfólio de casos de sucesso em engenharia, laudos técnicos e instalações elétricas ${cityBase.preposition} ${cityBase.name}. Qualidade garantida por nossa equipe.`,
        canonical: cityKey === 'default' ? `${baseUrl}/projetos` : `${baseUrl}/${cityKey}/projetos`,
        cityKey, cityData: cityBase, page: 'projetos'
    });
});

// Glossário Técnico
router.get('/:city(campina-grande|joao-pessoa)?/glossario', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    res.render('glossario', {
        title: `Glossário Técnico de Engenharia Elétrica | Klyfe Electric ${cityBase.preposition} ${cityBase.name}`,
        description: `Dicionário técnico de engenharia elétrica, automação e energia solar. Entenda os principais termos do setor ${cityBase.preposition} ${cityBase.name}.`,
        canonical: cityKey === 'default' ? `${baseUrl}/glossario` : `${baseUrl}/${cityKey}/glossario`,
        cityKey, cityData: cityBase, page: 'glossario',
        glossario: glossario,
        jsonLd: ''
    });
});

// Projeto Específico HU
router.get('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu', (req, res) => {
    res.render('projeto-hu-cg', {
        title: 'Projeto Hospital Universitário CG | Klyfe Electric',
        description: 'Laudo completo de instalações, termografia e conformidade normativa (NBR 5410/NR-10) realizado pela Klyfe no Hospital Universitário (HU) em Campina Grande.',
        canonical: `${baseUrl}/projetos/avaliacao-qualidade-instalacoes-eletricas-hu`,
        page: 'projetos'
    });
});

// Contato
router.get('/:city(campina-grande|joao-pessoa)?/contato', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const canonical = cityKey === 'default' ? `${baseUrl}/contato` : `${baseUrl}/${cityKey}/contato`;
    const jsonLd = `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contato | ${business.name}`,
        url: canonical,
        mainEntity: { '@id': `${business.url}/#localbusiness` }
    })}</script>`;
    res.render('contato', {
        title: `Contato ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Solicite orçamento ou consultoria técnica para projetos elétricos, laudos ou energia solar ${cityBase.preposition} ${cityBase.name}. Fale com nosso time de engenharia.`,
        canonical,
        cityKey, cityData: cityBase, page: 'contato', jsonLd
    });
});

module.exports = router;
