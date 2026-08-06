const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const locations = require('../config/locations');
const glossario = require('../config/glossario');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const { getPublishedPosts, getPostBySlug } = require('../lib/blog-loader');
const { evaluatePosts, evaluatePost, buildLocals } = require('../lib/blog-evaluator');
const { resolveTrackingContext, PHONE_SOLAR, MESSAGES, buildWaUrl, categoryFromServico } = require('../lib/site-tracking');
const { sendMetaCapiEvent, newEventId } = require('../lib/meta-capi');

const baseUrl = 'https://www.klyfeelectric.com.br';

const ALLOWED_CAPI_EVENTS = new Set(['PageView', 'ViewContent', 'Lead', 'Contact']);

// ═══ REDIRECIONAMENTOS 301 (SEO Legacy Redirects) ═══
router.use((req, res, next) => {
    // Normaliza o path: remove barra no final e coloca em lowercase
    let path = req.path.toLowerCase().replace(/\/$/, '');
    if (path === '') path = '/';

    const redirects = {
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
        '/empresa': '/quem-somos',
        '/solucoes/solar': '/energia-solar/',
        '/energia-solar-para-empresas': '/energia-solar/comercial/',
        '/energia-solar-para-fazendas': '/energia-solar/fazendas-e-irrigacao/',
        '/energia-solar-para-clinicas': '/energia-solar/hospitais-e-clinicas/',
        '/energia-solar-para-hoteis': '/energia-solar/hoteis-e-pousadas/',
        '/energia-solar-para-condominios': '/energia-solar/condominios/',
        '/energia-solar-para-supermercados': '/energia-solar/supermercados/',
        '/energia-solar-para-postos': '/energia-solar/postos-de-combustivel/',
        '/energia-solar-em-recife-pe': '/energia-solar/recife-pe/',
        '/energia-solar-em-caruaru-pe': '/energia-solar/caruaru-pe/',
        '/energia-solar-em-natal-rn': '/energia-solar/natal-rn/',
        '/energia-solar-em-joao-pessoa-pb': '/energia-solar/joao-pessoa-pb/',
        '/energia-solar-em-cajazeiras-pb': '/energia-solar/',
        '/energia-solar-em-sousa-pb': '/energia-solar/',
        '/energia-solar-em-patos-pb': '/energia-solar/',
        '/energia-solar-em-gravata-pe': '/energia-solar/',
        '/blog/quanto-custa-energia-solar-2026': '/blog/quanto-custa-instalar-energia-solar/',
        '/blog/payback-painel-solar-simulacao': '/blog/em-quanto-tempo-a-energia-solar-se-paga/'
    };

    // Caso o path exato esteja no mapeamento, redireciona com status 301
    if (redirects[path]) {
        return res.redirect(301, redirects[path]);
    }

    // Suporte para URLs com prefixo de cidade caso existam
    // Ex: /campina-grande/nossos-servicos/klyfe-energia-solar -> /campina-grande/solucoes/... OR /energia-solar/
    const cityPattern = /^\/(campina-grande|joao-pessoa)(\/nossos-servicos\/[a-z0-9-]+)/;
    const match = path.match(cityPattern);
    if (match) {
        const cityPrefix = '/' + match[1];
        const oldServicePath = match[2];
        if (redirects[oldServicePath]) {
            // Energia solar agora é hub global (sem prefixo de cidade)
            if (redirects[oldServicePath].startsWith('/energia-solar')) {
                return res.redirect(301, redirects[oldServicePath]);
            }
            return res.redirect(301, cityPrefix + redirects[oldServicePath]);
        }
    }

    // /campina-grande/solucoes/solar -> /energia-solar/
    if (/^\/(campina-grande|joao-pessoa)\/solucoes\/solar$/.test(path)) {
        return res.redirect(301, '/energia-solar/');
    }

    // Fallback para qualquer outra rota sob "nossos-servicos" não mapeada exaustivamente
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

// ═══ ROTAS ESTÁTICAS E INSTITUCIONAIS ═══

// Home
router.get('/:city(campina-grande|joao-pessoa)?', (req, res) => {
    const cityKey  = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = cityKey === 'default' ? `${baseUrl}/` : `${baseUrl}/${cityKey}`;
    
    const allPosts = getPublishedPosts();
    const evaluatedPosts = evaluatePosts(allPosts.slice(0, 2), cityKey, cityBase);

    // WebSite Schema para ajudar o Google a gerar sitelinks ricos na busca da marca
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
        "provider": { "@type": "LocalBusiness", "name": "Klyfe Electric", "url": baseUrl }
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
        const jsonLd = `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": city.title,
            "url": canonical,
            "description": city.description
        })}</script>`;

        return res.render('solar-capture', {
            title: city.title,
            description: city.description,
            canonical,
            cityKey: 'default',
            cityData: locations.default,
            page: 'solar-capture',
            captureType: 'city',
            capture: city,
            jsonLd,
            theme: 'azure-sky'
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

// Blog
router.get('/:city(campina-grande|joao-pessoa)?/blog', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const evaluatedPosts = evaluatePosts(getPublishedPosts(), cityKey, cityBase);

    res.render('blog', {
        title: `Blog Técnico | Klyfe Electric — ${cityBase.name}`,
        description: `Artigos técnicos e guias sobre engenharia elétrica, segurança e energia solar ${cityBase.preposition} ${cityBase.name}. Mantenha-se informado with nossos especialistas.`,
        canonical: cityKey === 'default' ? `${baseUrl}/blog` : `${baseUrl}/${cityKey}/blog`,
        cityKey,
        cityData: cityBase,
        page: 'blog',
        posts: evaluatedPosts
    });
});

// Blog Post Detail Route
router.get('/:city(campina-grande|joao-pessoa)?/blog/:postSlug', (req, res, next) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const postSlug = req.params.postSlug;
    
    const post = getPostBySlug(postSlug);
    if (!post) {
        return next();
    }

    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = `${baseUrl}${homePrefix}/blog/${postSlug}`;
    
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/blog/${postSlug}`;

    const locals = buildLocals(cityKey, cityBase);
    const evaluatedPost = evaluatePost(post, locals);
    const allPosts = getPublishedPosts();

    const recommended = allPosts
        .filter(p => p.slug !== postSlug)
        .slice(0, 3)
        .map(p => ({
            ...p,
            title: ejs.render(p.title, locals),
            summary: ejs.render(p.summary, locals)
        }));

    const dateIso = post.dateIso || post.publishAt || '2026-06-06';

    let schemaJson = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "@id": `${canonical}#blogposting`,
                "isPartOf": {
                    "@type": "WebPage",
                    "@id": canonical
                },
                "headline": evaluatedPost.title,
                "description": evaluatedPost.summary,
                "image": `${baseUrl}${evaluatedPost.heroImage || '/img/hero-klyfe.webp'}`,
                "datePublished": `${dateIso}T08:00:00Z`,
                "dateModified": `${dateIso}T08:00:00Z`,
                "author": {
                    "@type": "Person",
                    "name": evaluatedPost.author || 'Klyfe Electric'
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Klyfe Electric",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.klyfeelectric.com.br/img/Assinatura%20Completa%20-%20AmareloB%20-%20Klyfe.webp"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonical
                }
            }
        ]
    };

    if (evaluatedPost.faq && evaluatedPost.faq.length > 0) {
        schemaJson["@graph"].push({
            "@type": "FAQPage",
            "@id": `${canonical}#faq`,
            "mainEntity": evaluatedPost.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        });
    }

    const jsonLd = `
    <script type="application/ld+json">
    ${JSON.stringify(schemaJson)}
    </script>
    `;

    const solarish = /solar|fotovolta|painel|inversor|homologacao/i.test(postSlug + ' ' + (post.category || '') + ' ' + (post.title || ''));
    const trackingExtras = solarish
        ? resolveTrackingContext('/energia-solar/', { contentCategory: 'solar' })
        : {};

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
        ...trackingExtras
    });
});

// ═══ LP Ads: Energia Solar Empresas (noindex) ═══
const lpSolarWaMsg = MESSAGES.solar;
const lpSolarWaUrl = buildWaUrl(PHONE_SOLAR, lpSolarWaMsg);

router.get('/lp/energia-solar-empresas', (req, res) => {
    res.render('lp/solar-empresas', {
        title: 'Energia Solar para Empresas | Reduza até 95% da conta | Klyfe',
        description: 'Projeto, instalação e homologação de energia solar para empresas no Nordeste. Simule economia e fale com a Klyfe Electric.',
        canonical: `${baseUrl}/lp/energia-solar-empresas`,
        robots: 'noindex, nofollow',
        page: 'lp-solar-empresas',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-empresas',
        fireViewContent: true,
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: false
    });
});

router.get('/lp/energia-solar-empresas/obrigado', (req, res) => {
    res.render('lp/solar-empresas-obrigado', {
        title: 'Solicitação recebida | Klyfe Electric',
        description: 'Recebemos seu pedido de estudo solar. Em breve nossa equipe entra em contato.',
        canonical: `${baseUrl}/lp/energia-solar-empresas/obrigado`,
        robots: 'noindex, nofollow',
        page: 'lp-solar-empresas-obrigado',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-empresas/obrigado',
        fireViewContent: false,
        leadContentName: 'lp-solar-empresas',
        leadContentCategory: 'solar',
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: true
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

/**
 * Meta CAPI (browser dedup via event_id).
 * Aceita PageView | ViewContent | Lead | Contact.
 * IMPORTANTE: await no Vercel — fire-and-forget após res.json é cortado.
 */
router.post('/api/tracking/event', async (req, res) => {
    const body = req.body || {};
    const eventName = String(body.event_name || '');
    if (!ALLOWED_CAPI_EVENTS.has(eventName)) {
        return res.status(400).json({ success: false, message: 'event_name inválido' });
    }
    const eventId = String(body.event_id || newEventId('capi'));
    const user = body.user_data || {};
    const customData = body.custom_data || {};

    // Lead padrão Meta só no funil Solar
    if (eventName === 'Lead' && customData.content_category && customData.content_category !== 'solar') {
        return res.status(400).json({ success: false, message: 'Lead padrão restrito a solar' });
    }

    const sourceUrl =
        body.event_source_url ||
        req.get('referer') ||
        baseUrl;

    const clientIp = req.headers['x-forwarded-for']
        ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
        : (req.ip || '').replace(/^::ffff:/, '');

    const capi = await sendMetaCapiEvent({
        eventName,
        eventId,
        eventSourceUrl: sourceUrl,
        customData,
        userData: {
            email: user.email || user.em,
            phone: user.phone || user.ph,
            firstName: user.firstName || user.fn,
            lastName: user.lastName || user.ln,
            fbp: user.fbp,
            fbc: user.fbc
        },
        clientIp,
        userAgent: req.get('user-agent') || ''
    });

    res.json({
        success: true,
        event_id: eventId,
        capi_ok: !!(capi && capi.ok),
        capi_skipped: !!(capi && capi.skipped)
    });
});

// POST Contato (+ CAPI Lead solar com event_id para dedup com Pixel)
router.post('/contato', async (req, res) => {
    const body = req.body || {};
    const category = categoryFromServico(body.servico);
    const isLpSolar = body.source === 'lp-solar-empresas';
    const isSolarLead = category === 'solar' || isLpSolar;
    const eventId = String(body.event_id || newEventId('lead'));

    let capi = null;
    if (isSolarLead) {
        const clientIp = req.headers['x-forwarded-for']
            ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
            : (req.ip || '').replace(/^::ffff:/, '');

        capi = await sendMetaCapiEvent({
            eventName: 'Lead',
            eventId,
            eventSourceUrl: body.event_source_url || (isLpSolar
                ? `${baseUrl}/lp/energia-solar-empresas`
                : `${baseUrl}/contato`),
            customData: {
                content_name: isLpSolar ? 'lp-solar-empresas' : 'contato',
                content_category: 'solar',
                content_category_label: body.servico || 'Energia Solar Fotovoltaica'
            },
            userData: {
                email: body.email,
                phone: body.telefone,
                firstName: (body.nome || '').split(/\s+/)[0],
                lastName: (body.nome || '').split(/\s+/).slice(1).join(' '),
                fbp: body.fbp,
                fbc: body.fbc
            },
            clientIp,
            userAgent: req.get('user-agent') || ''
        });
    }

    res.json({
        success: true,
        message: 'Recebido!',
        event_id: eventId,
        content_category: isSolarLead ? 'solar' : category,
        capi_ok: isSolarLead ? !!(capi && capi.ok) : undefined
    });
});

// Sitemap XML
router.get('/sitemap.xml', (req, res) => {
    const urls = [];
    const cities = Object.keys(locations);
    const statics = ['', '/solucoes', '/quem-somos', '/projetos', '/blog', '/contato', '/glossario'];
    const hubs = ['engenharia', 'eletrica', 'automacao']; // solar migrou para /energia-solar/
    const serviceKeys = Object.keys(locations.default.services);

    // 1. URLs Estáticas e Hubs para cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        statics.forEach(s => urls.push(`${prefix}${s}`));
        hubs.forEach(h => urls.push(`${prefix}/solucoes/${h}`));
    });

    // Página legal (sem prefixo de cidade)
    urls.push('/politica-de-privacidade');

    // 2. Projeto estático (sem prefixo de cidade)
    urls.push('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu');

    // 2b. Hub Solar + segmentos + cidades + serviços comerciais
    urls.push('/energia-solar/');
    Object.values(solarCapture.segments).forEach(s => urls.push(s.urlPath));
    Object.values(solarCapture.cities).forEach(c => urls.push(c.urlPath));
    Object.values(solarServices).forEach(s => urls.push(s.urlPath));

    // Helper para verificar se serviço é habilitado para dada cidade
    function isServiceEnabled(cityKey, serviceKey) {
        const currentData = locations[cityKey];
        if (cityKey === 'default' || (currentData && currentData.allServices === true)) return true;
        return !!(currentData && currentData.services && currentData.services[serviceKey]);
    }

    // 3. URLs dinâmicas de serviços ativos em cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        serviceKeys.forEach(sKey => {
            const defaultSvc = locations.default.services[sKey];
            if (sKey === defaultSvc.category) return; // ignora hubs já adicionados
            if (defaultSvc.category === 'solar') return; // solar agora está em /energia-solar e /servicos

            if (isServiceEnabled(city, sKey)) {
                urls.push(`${prefix}/solucoes/${defaultSvc.category}/${sKey}`);
            }
        });
    });

    // 4. URLs dinâmicas dos posts do blog em cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        getPublishedPosts().forEach(post => {
            urls.push(`${prefix}/blog/${post.slug}`);
        });
    });

    const uniqueUrls = [...new Set(urls)];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    uniqueUrls.forEach(url => {
        const formattedUrl = url === '' ? '/' : url.replace(/\/$/, '');
        const priority = formattedUrl === '/' || formattedUrl === '/energia-solar' ? '1.0' : (formattedUrl.startsWith('/energia-solar') || formattedUrl.startsWith('/servicos') ? '0.9' : '0.8');
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
