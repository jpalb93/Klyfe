const express = require('express');
const router = express.Router();
const locations = require('../config/locations');
const glossario = require('../config/glossario');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const blogLoader = require('../lib/blog-loader');
const { evaluatePost, evaluatePosts } = require('../lib/blog-evaluator');
const { buildBlogPostJsonLd, buildJsonLdScript } = require('../lib/blog-schema');

function getPosts() {
    return blogLoader.getPublishedPosts();
}

const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ REDIRECIONAMENTOS 301 (SEO Legacy & Strategy Normalization Redirects) ═══
router.use((req, res, next) => {
    // Normaliza o path: remove barra no final e coloca em lowercase
    let path = req.path.toLowerCase().replace(/\/$/, '');
    if (path === '') path = '/';

    const redirects = {
        // Legacy paths
        '/nossos-servicos/klyfe-energia-solar': '/energia-solar/',
        '/nossos-servicos/klyfe-automacao-residencial': '/solucoes/automacao/automacao-residencial',
        '/nossos-servicos/klyfe-solucoes-eletricas': '/solucoes/eletrica',
        '/nossos-servicos/klyfe-instalacao-eletrica': '/solucoes/eletrica',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia': '/solucoes/engenharia',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia/laudo-de-spda': '/solucoes/engenharia/spda',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia/laudo-de-aterramento': '/solucoes/engenharia/laudos-eletricos',
        '/nossos-servicos/klyfe-spda-para-raios': '/solucoes/engenharia/spda',
        '/nossos-servicos/klyfe-subestacao-de-energia': '/solucoes/engenharia/projeto-subestacao',
        '/nossos-servicos': '/solucoes',
        '/contatos': '/contato',
        '/sobre': '/quem-somos',
        '/solucoes/solar': '/energia-solar/',
        '/campina-grande/solucoes/solar': '/energia-solar/campina-grande-pb/',
        '/joao-pessoa/solucoes/solar': '/energia-solar/joao-pessoa-pb/',

        // Mapeamento dos antigos slugs de captura solar para a nova arquitetura /energia-solar/[segmento]/
        '/energia-solar-para-empresas': '/energia-solar/comercial/',
        '/energia-solar-para-fazendas': '/energia-solar/fazendas-e-irrigacao/',
        '/energia-solar-para-clinicas': '/energia-solar/hospitais-e-clinicas/',
        '/energia-solar-para-hoteis': '/energia-solar/hoteis-e-pousadas/',
        '/energia-solar-para-condominios': '/energia-solar/condominios/',
        '/energia-solar-para-supermercados': '/energia-solar/supermercados/',
        '/energia-solar-para-postos': '/energia-solar/postos-de-combustivel/',

        // Mapeamento das antigas URLs de cidades para a arquitetura /energia-solar/[cidade]/
        '/energia-solar-em-recife-pe': '/energia-solar/recife-pe/',
        '/energia-solar-em-caruaru-pe': '/energia-solar/caruaru-pe/',
        '/energia-solar-em-natal-rn': '/energia-solar/natal-rn/',
        '/energia-solar-em-joao-pessoa-pb': '/energia-solar/joao-pessoa-pb/',
        '/energia-solar-em-cajazeiras-pb': '/energia-solar/',
        '/energia-solar-em-sousa-pb': '/energia-solar/',
        '/energia-solar-em-patos-pb': '/energia-solar/',
        '/energia-solar-em-gravata-pe': '/energia-solar/',

        // Antigos slugs de posts do blog mapeados para os novos do plano
        '/blog/quanto-custa-energia-solar-2026': '/blog/quanto-custa-instalar-energia-solar/',
        '/blog/payback-painel-solar-simulacao': '/blog/em-quanto-tempo-a-energia-solar-se-paga/'
    };

    if (redirects[path]) {
        return res.redirect(301, redirects[path]);
    }

    const cityPattern = /^\/(campina-grande|joao-pessoa)(\/nossos-servicos\/[a-z0-9-]+)/;
    const match = path.match(cityPattern);
    if (match) {
        const cityPrefix = '/' + match[1];
        const oldServicePath = match[2];
        if (redirects[oldServicePath]) {
            return res.redirect(301, cityPrefix + redirects[oldServicePath]);
        }
    }

    if (path.startsWith('/nossos-servicos')) {
        return res.redirect(301, '/solucoes');
    }

    const cityFallbackPattern = /^\/(campina-grande|joao-pessoa)\/nossos-servicos/;
    const fallbackMatch = path.match(cityFallbackPattern);
    if (fallbackMatch) {
        const cityPrefix = '/' + fallbackMatch[1];
        return res.redirect(301, cityPrefix + '/solucoes');
    }

    next();
});

// Middleware para disponibilizar ajudantes globais nos templates EJS
router.use((req, res, next) => {
    const pathParts = req.path.split('/');
    const cityFromUrl = (pathParts[1] === 'campina-grande' || pathParts[1] === 'joao-pessoa') ? pathParts[1] : 'default';

    res.locals.cityKey = cityFromUrl;
    res.locals.cityData = locations[cityFromUrl];
    res.locals.locations = locations;

    res.locals.isServiceEnabled = (serviceKey) => {
        const currentData = res.locals.cityData;
        if (cityFromUrl === 'default' || (currentData && currentData.allServices === true)) return true;
        return !!(currentData && currentData.services && currentData.services[serviceKey]);
    };
    
    res.locals.getHomePrefix = () => {
        return (cityFromUrl !== 'default') ? '/' + cityFromUrl : '';
    };

    res.locals.getServicesByCategory = (cat) => {
        const allPossible = locations.default.services;
        return Object.keys(allPossible).filter(key => {
            const svc = allPossible[key];
            return svc.category === cat && res.locals.isServiceEnabled(key) && key !== cat;
        });
    };

    next();
});

// ═══ GERADOR DE ROTAS DINÂMICAS PARA SERVIÇOS LEGADOS (Power Pages) ═══
Object.keys(locations.default.services).forEach(serviceKey => {
    const defaultSvc = locations.default.services[serviceKey];
    if (serviceKey === defaultSvc.category) return;

    router.get(`/:city(campina-grande|joao-pessoa)?/solucoes/:category/${serviceKey}`, (req, res, next) => {
        const cityKey = req.params.city || 'default';
        const cityBase = locations[cityKey] || locations['default'];
        
        if (!res.locals.isServiceEnabled(serviceKey)) {
            return next();
        }

        const citySvc = { ...defaultSvc, ...(cityBase.services?.[serviceKey] || {}) };
        const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
        const canonical = `${baseUrl}${homePrefix}/solucoes/${defaultSvc.category}/${serviceKey}`;

        const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
        const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
        const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/${defaultSvc.category}/${serviceKey}`;

        const jsonLd = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}${homePrefix}/" },
            { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}${homePrefix}/solucoes" },
            { "@type": "ListItem", "position": 3, "name": "${citySvc.category.toUpperCase()}", "item": "${baseUrl}${homePrefix}/solucoes/${citySvc.category}" },
            { "@type": "ListItem", "position": 4, "name": "${citySvc.label}", "item": "${canonical}" }
          ]
        }
        </script>
        `;

        res.render(defaultSvc.template, {
            title: `${citySvc.label} ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
            pageTitle: `${citySvc.label} ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
            description: `${citySvc.label} ${cityBase.preposition} ${cityBase.name} e região. ${citySvc.painPoint} Atendimento especializado com engenharia e ART.`,
            metaDesc: `${citySvc.label} ${cityBase.preposition} ${cityBase.name} e região. ${citySvc.painPoint} Atendimento especializado com engenharia e ART.`,
            canonical,
            robots: 'index, follow',
            page: citySvc.category,
            cityData: cityBase,
            cityKey: cityKey,
            serviceData: citySvc,
            alternateCityName,
            alternateUrl,
            jsonLd: jsonLd,
            ...(defaultSvc.category === 'solar' ? { theme: 'azure-sky' } : {})
        });
    });
});

// ═══ PÁGINA PILAR CENTRAL DE ENERGIA SOLAR ═══
router.get('/energia-solar', (req, res) => {
    const cityKey  = 'default';
    const cityBase = locations.default;
    const canonical = `${baseUrl}/energia-solar/`;

    const titleText = `Energia Solar no Nordeste | Klyfe Electric`;
    const descText = `Energia Solar para Residências e Empresas no Nordeste. Projetos de alta performance, homologação e manutenção em PB, RN e PE com a Klyfe Electric.`;

    const jsonLdData = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": titleText,
            "url": canonical,
            "description": descText,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
                    { "@type": "ListItem", "position": 2, "name": "Energia Solar", "item": canonical }
                ]
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Klyfe Electric",
            "image": `${baseUrl}/img/hero-klyfe.webp`,
            "telephone": "+5583991330972",
            "url": baseUrl,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Campina Grande",
                "addressRegion": "PB",
                "addressCountry": "BR"
            },
            "areaServed": ["Paraíba", "Rio Grande do Norte", "Pernambuco"]
        }
    ];

    const jsonLd = jsonLdData.map(b => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');

    res.render('solar', {
        title: titleText,
        pageTitle: titleText,
        description: descText,
        metaDesc: descText,
        canonical,
        cityKey,
        cityData: cityBase,
        alternateCityName: 'João Pessoa',
        alternateUrl: `${baseUrl}/energia-solar/joao-pessoa-pb/`,
        page: 'solar',
        jsonLd,
        solarSegments: solarCapture.getSegmentList(),
        solarCities: solarCapture.getCityList(),
        theme: 'azure-sky'
    });
});

// ═══ PÁGINAS COMERCIAIS DE SERVIÇOS SOLARES (/servicos/[servico]) ═══
router.get('/servicos/:serviceSlug', (req, res, next) => {
    const slug = req.params.serviceSlug;
    const serviceData = solarServices[slug];
    if (!serviceData) {
        return next(); // Passa para 404
    }

    const canonical = `${baseUrl}${serviceData.urlPath}`;
    const jsonLdData = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviceData.h1,
            "serviceType": serviceData.h1,
            "description": serviceData.description,
            "url": canonical,
            "provider": {
                "@type": "LocalBusiness",
                "name": "Klyfe Electric",
                "telephone": "+5583991330972",
                "image": `${baseUrl}/img/hero-klyfe.webp`,
                "url": baseUrl
            },
            "areaServed": ["Paraíba", "Rio Grande do Norte", "Pernambuco"]
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
                { "@type": "ListItem", "position": 2, "name": "Energia Solar", "item": `${baseUrl}/energia-solar/` },
                { "@type": "ListItem", "position": 3, "name": serviceData.h1, "item": canonical }
            ]
        }
    ];

    if (serviceData.faq && serviceData.faq.length) {
        jsonLdData.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": serviceData.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": { "@type": "Answer", "text": item.answer }
            }))
        });
    }

    const jsonLd = jsonLdData.map(b => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');

    res.render('servicos/solar-detalhe', {
        title: serviceData.title,
        description: serviceData.description,
        canonical,
        page: 'servicos-solar',
        serviceData,
        jsonLd,
        cityKey: 'default',
        cityData: locations.default,
        theme: 'azure-sky'
    });
});

// ═══ PÁGINAS DE CAPTURA SOLAR: SEGMENTOS E CIDADES (/energia-solar/[slug]) ═══
function buildSolarCaptureJsonLd(capture, captureType, canonical) {
    const name = capture.h1;
    const description = capture.description;
    const areaName = captureType === 'city'
        ? `${capture.name}, ${capture.stateAbbr}`
        : 'Nordeste (PB, RN, PE)';

    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        serviceType: 'Instalação de Energia Solar Fotovoltaica',
        description,
        url: canonical,
        provider: {
            '@type': 'LocalBusiness',
            name: 'Klyfe Electric',
            telephone: '+5583991330972',
            image: `${baseUrl}/img/hero-klyfe.webp`,
            url: baseUrl
        },
        areaServed: {
            '@type': 'AdministrativeArea',
            name: areaName
        }
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Energia Solar', item: `${baseUrl}/energia-solar/` },
            { '@type': 'ListItem', position: 3, name: capture.h1, item: canonical }
        ]
    };

    const blocks = [serviceLd, breadcrumbLd];

    if (capture.faq && capture.faq.length) {
        blocks.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: capture.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer }
            }))
        });
    }

    return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');
}

function relatedLinksFor(keys) {
    return (keys || [])
        .map((k) => solarCapture.resolveRelatedLink(k))
        .filter(Boolean)
        .slice(0, 5);
}

// Router único para /energia-solar/:slug
router.get('/energia-solar/:slug', (req, res, next) => {
    const slug = req.params.slug;

    // Tenta encontrar em segmentos
    const segment = Object.values(solarCapture.segments).find(s => s.slug === slug);
    if (segment) {
        const canonical = `${baseUrl}${segment.urlPath}`;
        const jsonLd = buildSolarCaptureJsonLd(segment, 'segment', canonical);
        return res.render('solar-capture', {
            title: segment.title,
            description: segment.description,
            canonical,
            page: 'solar-capture',
            captureType: 'segment',
            capture: segment,
            relatedLinks: relatedLinksFor(segment.relatedSegments.concat(segment.relatedCities || [])),
            jsonLd,
            cityKey: 'default',
            cityData: locations.default,
            theme: 'azure-sky'
        });
    }

    // Tenta encontrar em cidades
    const city = Object.values(solarCapture.cities).find(c => c.slug === slug);
    if (city) {
        const canonical = `${baseUrl}${city.urlPath}`;
        const jsonLd = buildSolarCaptureJsonLd(city, 'city', canonical);
        return res.render('solar-capture', {
            title: city.title,
            description: city.description,
            canonical,
            page: 'solar-capture',
            captureType: 'city',
            capture: city,
            relatedLinks: relatedLinksFor(city.relatedSegments.concat(city.relatedCities || [])),
            jsonLd,
            cityKey: 'default',
            cityData: locations.default,
            theme: 'azure-sky'
        });
    }

    next(); // Passa para 404
});


// ═══ ROTAS ESTÁTICAS E INSTITUCIONAIS ═══

// Home
router.get('/:city(campina-grande|joao-pessoa)?', (req, res) => {
    const cityKey  = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = cityKey === 'default' ? `${baseUrl}/` : `${baseUrl}/${cityKey}`;
    
    const evaluatedPosts = evaluatePosts(getPosts().slice(0, 2), cityKey, cityBase);

    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Klyfe Electric",
      "alternateName": ["Klyfe", "Klyfe Electric Engenharia"],
      "url": "${baseUrl}${homePrefix}/"
    }
    </script>
    `;

    res.render('index', {
        title: `Klyfe Electric | Engenharia, Elétrica e Solar ${cityBase.preposition} ${cityBase.name}`,
        description: `Especialistas em projetos elétricos, automação inteligente e energia solar ${cityBase.preposition} ${cityBase.name} e região. Engenharia de alta performance com ART e segurança total.`,
        canonical,
        cityKey,
        cityData: cityBase,
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

// Engenharia Hub
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/engenharia', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/engenharia`;
    
    res.render('engenharia', {
        title: `Engenharia Elétrica ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Engenharia Elétrica ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Projetos elétricos, laudos de SPDA, aterramento e perícias ${cityBase.preposition} ${cityBase.name}. Engenharia de precisão com emissão de ART e conformidade normativa.`,
        metaDesc: `Projetos elétricos, laudos de SPDA, aterramento e perícias ${cityBase.preposition} ${cityBase.name}. Engenharia de precisão com emissão de ART e conformidade normativa.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/engenharia` : `${baseUrl}/${cityKey}/solucoes/engenharia`,
        cityKey, cityData: cityBase, alternateCityName, alternateUrl, page: 'engenharia', jsonLd: ''
    });
});

// Elétrica Hub
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/eletrica', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/eletrica`;

    res.render('eletrica', {
        title: `Serviços Elétricos ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Serviços Elétricos ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Serviços de eletricista, instalações e manutenção corretiva ${cityBase.preposition} ${cityBase.name}. Mão de obra qualificada com supervisão de engenharia e ART.`,
        metaDesc: `Serviços de eletricista, instalações e manutenção corretiva ${cityBase.preposition} ${cityBase.name}. Mão de obra qualificada com supervisão de engenharia e ART.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/eletrica` : `${baseUrl}/${cityKey}/solucoes/eletrica`,
        cityKey, cityData: cityBase, alternateCityName, alternateUrl, page: 'eletrica', jsonLd: ''
    });
});

// Automação Hub
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/automacao', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/automacao`;

    res.render('automacao', {
        title: `Automação Smart ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Automação Smart ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Projetos de automação residencial Smart Home e processos industriais ${cityBase.preposition} ${cityBase.name}. Mais conforto, segurança e economia para o seu imóvel.`,
        metaDesc: `Projetos de automação residencial Smart Home e processos industriais ${cityBase.preposition} ${cityBase.name}. Mais conforto, segurança e economia para o seu imóvel.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/automacao` : `${baseUrl}/${cityKey}/solucoes/automacao`,
        cityKey, cityData: cityBase, alternateCityName, alternateUrl, page: 'automacao', jsonLd: ''
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

// Blog List
router.get('/:city(campina-grande|joao-pessoa)?/blog', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const evaluatedPosts = evaluatePosts(getPosts(), cityKey, cityBase);

    res.render('blog', {
        title: `Blog Técnico de Energia Solar | Klyfe Electric — ${cityBase.name}`,
        description: `Artigos técnicos e guias de autoridade sobre energia solar, engenharia elétrica e economia ${cityBase.preposition} ${cityBase.name}.`,
        canonical: cityKey === 'default' ? `${baseUrl}/blog` : `${baseUrl}/${cityKey}/blog`,
        cityKey,
        cityData: cityBase,
        page: 'blog',
        posts: evaluatedPosts,
        theme: 'azure-sky'
    });
});

// Blog Post Detail Route
router.get('/:city(campina-grande|joao-pessoa)?/blog/:postSlug', (req, res, next) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const postSlug = req.params.postSlug;
    
    const post = getPosts().find(p => p.slug === postSlug);
    if (!post) {
        return next();
    }

    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = `${baseUrl}${homePrefix}/blog/${postSlug}`;
    
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/blog/${postSlug}`;

    const locals = {
        cityKey,
        cityData: cityBase,
        getHomePrefix: () => homePrefix
    };
    
    const evaluatedPost = evaluatePost(post, locals);
    const dateIso = post.publishAt || post.dateIso || '2026-06-10';

    const recommended = evaluatePosts(
        getPosts().filter(p => p.slug !== postSlug).slice(0, 3),
        cityKey,
        cityBase
    );

    const graph = buildBlogPostJsonLd({ canonical, evaluatedPost, dateIso });
    const jsonLd = buildJsonLdScript(graph);

    res.render('blog-post', {
        title: `${evaluatedPost.title} | Klyfe Electric`,
        description: evaluatedPost.summary,
        canonical,
        cityKey,
        cityData: cityBase,
        post: evaluatedPost,
        recommendedPosts: recommended,
        alternateCityName,
        alternateUrl,
        page: 'blog',
        jsonLd,
        theme: 'azure-sky'
    });
});

// Contato
router.get('/:city(campina-grande|joao-pessoa)?/contato', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    res.render('contato', {
        title: `Contato ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Solicite orçamento ou consultoria técnica para projetos elétricos, laudos ou energia solar ${cityBase.preposition} ${cityBase.name}. Fale com nosso time de engenharia.`,
        canonical: cityKey === 'default' ? `${baseUrl}/contato` : `${baseUrl}/${cityKey}/contato`,
        cityKey, cityData: cityBase, page: 'contato'
    });
});

// Landing Page — Energia Solar Empresas (tráfego pago)
const lpSolarWaMsg = 'Olá! Vim da campanha de energia solar para empresas e quero um estudo de ROI / demanda.';
const lpSolarWaUrl = `https://wa.me/5583991330972?text=${encodeURIComponent(lpSolarWaMsg)}`;

function getLpTracking() {
    return {
        gtmId: process.env.GTM_ID || '',
        metaPixelId: process.env.META_PIXEL_ID || '',
        googleAdsId: process.env.GOOGLE_ADS_ID || '',
        googleAdsConversionLabel: process.env.GOOGLE_ADS_CONVERSION_LABEL || '',
    };
}

router.get('/lp/energia-solar-empresas', (req, res) => {
    const cityBase = locations.default;
    res.render('lp/solar-empresas', {
        title: 'Energia Solar para Empresas | Estudo de ROI e Demanda | Klyfe Electric',
        description: 'Reduza o custo operacional da sua empresa ou galpão com energia solar. Estudo gratuito de ROI, demanda contratada e payback na Paraíba. Homologação Energisa inclusa.',
        canonical: `${baseUrl}/lp/energia-solar-empresas`,
        robots: 'noindex, nofollow',
        cityKey: 'default',
        cityData: cityBase,
        page: 'lp-solar-empresas',
        waUrl: lpSolarWaUrl,
        waMessage: lpSolarWaMsg,
        tracking: getLpTracking(),
        theme: 'azure-sky'
    });
});

router.get('/lp/energia-solar-empresas/obrigado', (req, res) => {
    const cityBase = locations.default;
    res.render('lp/solar-empresas-obrigado', {
        title: 'Solicitação recebida | Klyfe Electric',
        description: 'Recebemos seu pedido de estudo solar. Nossa equipe técnica entrará em contato em breve.',
        canonical: `${baseUrl}/lp/energia-solar-empresas/obrigado`,
        robots: 'noindex, nofollow',
        cityKey: 'default',
        cityData: cityBase,
        page: 'lp-solar-empresas-obrigado',
        waUrl: lpSolarWaUrl,
        waMessage: lpSolarWaMsg,
        tracking: getLpTracking(),
        fireLeadConversion: true,
        theme: 'azure-sky'
    });
});

// POST Contato
router.post('/contato', async (req, res) => {
    const body = req.body || {};
    const agentsUrl = (process.env.AGENTS_API_URL || '').replace(/\/$/, '');
    const agentsSecret = process.env.AGENTS_API_SECRET || '';

    let agentsForwarded = false;
    let agentsError = null;

    const leadSource = body.source || 'website';
    const formId = leadSource === 'lp-solar-empresas' ? 'lp-solar-empresas' : 'contato';
    const utm = {
        utm_source: body.utm_source || undefined,
        utm_medium: body.utm_medium || undefined,
        utm_campaign: body.utm_campaign || undefined,
        utm_content: body.utm_content || undefined,
        gclid: body.gclid || undefined,
        fbclid: body.fbclid || undefined,
    };
    const baseMessage = body.mensagem || body.message || '';
    const extras = [];
    if (body.empresa) extras.push(`Empresa: ${body.empresa}`);
    if (body.conta_media) extras.push(`Conta média: ${body.conta_media}`);
    const message = extras.length
        ? [baseMessage, extras.join(' | ')].filter(Boolean).join('\n')
        : (baseMessage || undefined);

    if (agentsUrl && agentsSecret) {
        try {
            const payload = {
                name: body.nome || body.name || 'Lead site',
                email: body.email || undefined,
                phone: String(body.telefone || body.phone || '').replace(/\D/g, '') || '00000000000',
                city: body.cidade || body.city || undefined,
                interest: body.servico || body.interest || undefined,
                message,
                source: leadSource,
                metadata: {
                    form: formId,
                    empresa: body.empresa || undefined,
                    conta_media: body.conta_media || undefined,
                    utm,
                    raw: body,
                },
            };
            const r = await fetch(`${agentsUrl}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-secret': agentsSecret,
                },
                body: JSON.stringify(payload),
            });
            agentsForwarded = r.ok;
            if (!r.ok) {
                agentsError = await r.text();
                console.error('[contato→agents]', r.status, agentsError);
            }
        } catch (err) {
            agentsError = err.message;
            console.error('[contato→agents]', err);
        }
    }

    res.json({
        success: true,
        message: 'Recebido!',
        agentsForwarded,
        ...(agentsError && process.env.NODE_ENV !== 'production' ? { agentsError } : {}),
    });
});

// ═══ GERADOR COMPLETO DE SITEMAP XML DINÂMICO ═══
router.get('/sitemap.xml', (req, res) => {
    const urls = [];

    // 1. Pilar de Energia Solar
    urls.push('/energia-solar/');

    // 2. Rotas Comerciais de Serviços Solares sob /servicos/
    Object.keys(solarServices).forEach(serviceKey => {
        urls.push(solarServices[serviceKey].urlPath);
    });

    // 3. Rotas de Segmentos Solares sob /energia-solar/
    Object.keys(solarCapture.segments).forEach(segKey => {
        urls.push(solarCapture.segments[segKey].urlPath);
    });

    // 4. Rotas de Cidades Prioritárias sob /energia-solar/
    Object.keys(solarCapture.cities).forEach(cityKey => {
        urls.push(solarCapture.cities[cityKey].urlPath);
    });

    // 5. Rotas Estáticas Principais
    const statics = ['', '/solucoes', '/quem-somos', '/projetos', '/blog', '/contato', '/glossario', '/politica-de-privacidade'];
    statics.forEach(s => urls.push(s));

    // 6. Hubs Legados e Serviços Dinâmicos por Cidade
    const citiesKeys = Object.keys(locations);
    const hubs = ['engenharia', 'eletrica', 'automacao'];
    const serviceKeys = Object.keys(locations.default.services);

    citiesKeys.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        hubs.forEach(h => urls.push(`${prefix}/solucoes/${h}`));
        serviceKeys.forEach(sk => {
            const sObj = locations.default.services[sk];
            if (sObj && sObj.category) {
                urls.push(`${prefix}/solucoes/${sObj.category}/${sk}`);
            }
        });
    });

    // Projeto estático HU
    urls.push('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu');

    // 7. Todos os Posts do Blog Publicados
    getPosts().forEach(post => {
        urls.push(`/blog/${post.slug}`);
    });

    const uniqueUrls = [...new Set(urls)];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    uniqueUrls.forEach(url => {
        const formattedUrl = url === '' ? '/' : (url.endsWith('/') ? url : url + '/');
        const priority = url === '/' || url === '/energia-solar/' ? '1.0' : (url.startsWith('/servicos/') || url.startsWith('/energia-solar/') ? '0.9' : '0.8');
        sitemap += `  <url><loc>${baseUrl}${formattedUrl}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>\n`;
    });
    sitemap += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /lp/

# Explicit rules for AI Crawlers (Allow for AI Search Presence)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`);
});

module.exports = router;
