const express = require('express');
const router = express.Router();
const locations = require('../config/locations');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const business = require('../config/business');

const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ GERADOR DE ROTAS DINÂMICAS PARA SERVIÇOS (Power Pages) ═══
Object.keys(locations.default.services).forEach(serviceKey => {
    const defaultSvc = locations.default.services[serviceKey];
    
    // Ignora as rotas de categoria (Hubs) que já possuem lógica manual complexa
    if (serviceKey === defaultSvc.category) return;

    router.get(`/:city(campina-grande|joao-pessoa)?/solucoes/:category/${serviceKey}`, (req, res, next) => {
        const cityKey = req.params.city || 'default';
        const cityBase = locations[cityKey] || locations['default'];
        
        // Validação de segurança: o serviço deve existir e estar habilitado para esta cidade
        if (!res.locals.isServiceEnabled(serviceKey)) {
            return next();
        }

        const citySvc = { ...defaultSvc, ...(cityBase.services?.[serviceKey] || {}) };
        const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
        const canonical = `${baseUrl}${homePrefix}/solucoes/${defaultSvc.category}/${serviceKey}`;

        const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
        const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
        const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/${defaultSvc.category}/${serviceKey}`;

        // Geração de JSON-LD Básico (Breadcrumbs)
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
            jsonLd: jsonLd
        });
    });
});

// ═══ HUB ROUTES ═══

// Engenharia
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

// Elétrica
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

// Solar (legado) → hub /energia-solar/
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/solar', (req, res) => {
    return res.redirect(301, '/energia-solar/');
});

// ═══ HUB ENERGIA SOLAR ═══
router.get('/energia-solar', (req, res) => {
    const cityKey = 'default';
    const cityBase = locations.default;
    const canonical = `${baseUrl}/energia-solar/`;

    const titleText = `Energia Solar na Paraíba | Projeto e Instalação | Klyfe`;
    const descText = `Energia solar na Paraíba com projeto, instalação, ART e homologação Energisa. Atendimento em Campina Grande e João Pessoa. Solicite um estudo.`;

    const jsonLdData = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": titleText,
            "url": canonical,
            "description": descText,
            "about": { "@id": `${canonical}#service` },
            "isPartOf": { "@id": `${baseUrl}/#website` }
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${canonical}#service`,
            "name": "Projeto e instalação de energia solar na Paraíba",
            "serviceType": "Projeto, instalação e homologação de sistema fotovoltaico",
            "url": canonical,
            "description": descText,
            "provider": { "@id": `${baseUrl}/#localbusiness` },
            "areaServed": [
                { "@type": "State", "name": "Paraíba" },
                { "@type": "City", "name": "Campina Grande", "containedInPlace": { "@type": "State", "name": "Paraíba" } },
                { "@type": "City", "name": "João Pessoa", "containedInPlace": { "@type": "State", "name": "Paraíba" } }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
                { "@type": "ListItem", "position": 2, "name": "Energia Solar na Paraíba", "item": canonical }
            ]
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

// Páginas comerciais de serviços solares
router.get('/servicos/:slug', (req, res, next) => {
    const service = solarServices[req.params.slug];
    if (!service) return next();

    const canonical = `${baseUrl}${service.urlPath}`;
    const jsonLd = `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.h1,
        "description": service.description,
        "url": canonical,
        "provider": { "@type": "LocalBusiness", "name": business.name, "url": baseUrl }
    })}</script>`;

    res.render('servicos/solar-detalhe', {
        title: service.title,
        description: service.description,
        canonical,
        cityKey: 'default',
        cityData: locations.default,
        page: 'solar-service',
        serviceData: service,
        jsonLd,
        theme: 'azure-sky'
    });
});

// Captura solar: segmentos e cidades
router.get('/energia-solar/:slug', (req, res, next) => {
    const slug = req.params.slug;
    const segment = Object.values(solarCapture.segments).find(s => s.slug === slug) || solarCapture.segments[slug];
    const city = Object.values(solarCapture.cities).find(c => c.slug === slug) || solarCapture.cities[slug];

    if (segment) {
        const canonical = `${baseUrl}${segment.urlPath}`;
        const jsonLd = `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": segment.title,
            "url": canonical,
            "description": segment.description,
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
                    { "@type": "ListItem", "position": 2, "name": "Energia Solar", "item": `${baseUrl}/energia-solar/` },
                    { "@type": "ListItem", "position": 3, "name": segment.h1, "item": canonical }
                ]
            }
        })}</script>`;

        return res.render('solar-capture', {
            title: segment.title,
            description: segment.description,
            canonical,
            cityKey: 'default',
            cityData: locations.default,
            page: 'solar-capture',
            captureType: 'segment',
            capture: segment,
            jsonLd,
            theme: 'azure-sky'
        });
    }

    if (city) {
        const canonical = `${baseUrl}${city.urlPath}`;
        const localCityKey = city.slug === 'campina-grande-pb'
            ? 'campina-grande'
            : (city.slug === 'joao-pessoa-pb' ? 'joao-pessoa' : 'default');
        const localCityData = locations[localCityKey] || locations.default;
        const isPriorityParaibaPage = localCityKey !== 'default';
        const citySchema = [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": city.title,
                "url": canonical,
                "description": city.description,
                "about": { "@id": `${canonical}#service` },
                "isPartOf": { "@id": `${baseUrl}/#website` },
                ...(city.lastReviewed ? { "dateModified": "2026-08-27" } : {})
            },
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${canonical}#service`,
                "name": city.h1,
                "serviceType": "Projeto, instalação e homologação de sistema fotovoltaico",
                "url": canonical,
                "description": city.description,
                "provider": { "@id": `${baseUrl}/#localbusiness` },
                "areaServed": {
                    "@type": "City",
                    "name": city.name,
                    "containedInPlace": { "@type": "State", "name": city.stateAbbr === 'PB' ? 'Paraíba' : city.stateAbbr }
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
                    { "@type": "ListItem", "position": 2, "name": "Energia Solar na Paraíba", "item": `${baseUrl}/energia-solar/` },
                    { "@type": "ListItem", "position": 3, "name": city.h1, "item": canonical }
                ]
            }
        ];
        const jsonLd = citySchema.map(block => `<script type="application/ld+json">${JSON.stringify(block)}</script>`).join('\n');

        return res.render('solar-capture', {
            title: city.title,
            description: city.description,
            canonical,
            cityKey: localCityKey,
            cityData: localCityData,
            page: 'solar-capture',
            captureType: 'city',
            capture: city,
            jsonLd,
            theme: 'azure-sky',
            robots: isPriorityParaibaPage ? 'index, follow' : undefined
        });
    }

    return next();
});

// Automação
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

module.exports = router;
