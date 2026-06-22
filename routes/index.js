const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const locations = require('../config/locations');
const glossario = require('../config/glossario');
const posts = require('../config/blog');


const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ REDIRECIONAMENTOS 301 (SEO Legacy Redirects) ═══
router.use((req, res, next) => {
    // Normaliza o path: remove barra no final e coloca em lowercase
    let path = req.path.toLowerCase().replace(/\/$/, '');
    if (path === '') path = '/';

    const redirects = {
        '/nossos-servicos/klyfe-energia-solar': '/solucoes/solar',
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
        '/empresa': '/quem-somos'
    };

    // Caso o path exato esteja no mapeamento, redireciona com status 301
    if (redirects[path]) {
        return res.redirect(301, redirects[path]);
    }

    // Suporte para URLs com prefixo de cidade caso existam
    // Ex: /campina-grande/nossos-servicos/klyfe-energia-solar -> /campina-grande/solucoes/solar
    const cityPattern = /^\/(campina-grande|joao-pessoa)(\/nossos-servicos\/[a-z0-9-]+)/;
    const match = path.match(cityPattern);
    if (match) {
        const cityPrefix = '/' + match[1];
        const oldServicePath = match[2];
        if (redirects[oldServicePath]) {
            return res.redirect(301, cityPrefix + redirects[oldServicePath]);
        }
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
    
    // Render posts dynamic values with cityData context
    const evaluatedPosts = posts.slice(0, 2).map(post => {
        const locals = {
            cityKey,
            cityData: cityBase,
            getHomePrefix: () => cityKey !== 'default' ? '/' + cityKey : ''
        };
        return {
            ...post,
            title: ejs.render(post.title, locals),
            summary: ejs.render(post.summary, locals)
        };
    });

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
        jsonLd
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

// Solar
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/solar', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/solar`;

    res.render('solar', {
        title: `Energia Solar ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Energia Solar ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Energia solar fotovoltaica para residências, comércios e indústrias ${cityBase.preposition} ${cityBase.name}. Economize até 95% com homologação rápida na Energisa.`,
        metaDesc: `Energia solar fotovoltaica para residências, comércios e indústrias ${cityBase.preposition} ${cityBase.name}. Economize até 95% com homologação rápida na Energisa.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/solar` : `${baseUrl}/${cityKey}/solucoes/solar`,
        cityKey, cityData: cityBase, alternateCityName, alternateUrl, page: 'solar', jsonLd: ''
    });
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
    
    // Render posts dynamic values with cityData context
    const evaluatedPosts = posts.map(post => {
        const locals = {
            cityKey,
            cityData: cityBase,
            getHomePrefix: () => cityKey !== 'default' ? '/' + cityKey : ''
        };
        return {
            ...post,
            title: ejs.render(post.title, locals),
            summary: ejs.render(post.summary, locals)
        };
    });

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
    
    // Find post in raw database
    const post = posts.find(p => p.slug === postSlug);
    if (!post) {
        return next(); // Proceed to 404
    }

    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const canonical = `${baseUrl}${homePrefix}/blog/${postSlug}`;
    
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/blog/${postSlug}`;

    // Evaluated post
    const locals = {
        cityKey,
        cityData: cityBase,
        getHomePrefix: () => homePrefix
    };
    
    const evaluatedPost = {
        ...post,
        title: ejs.render(post.title, locals),
        summary: ejs.render(post.summary, locals),
        contentHtml: ejs.render(post.contentHtml, locals),
        faq: post.faq.map(item => ({
            question: ejs.render(item.question, locals),
            answer: ejs.render(item.answer, locals)
        }))
    };

    // Recommended articles: other 3 posts (excluding current one)
    const recommended = posts
        .filter(p => p.slug !== postSlug)
        .slice(0, 3)
        .map(p => ({
            ...p,
            title: ejs.render(p.title, locals),
            summary: ejs.render(p.summary, locals)
        }));

    // Date ISO format helper
    const dateMap = {
        '15 de Maio de 2026': '2026-05-15',
        '28 de Abril de 2026': '2026-04-28',
        '02 de Junho de 2026': '2026-06-02',
        '20 de Maio de 2026': '2026-05-20',
        '10 de Março de 2026': '2026-03-10',
        '05 de Junho de 2026': '2026-06-05'
    };
    const dateIso = dateMap[post.date] || '2026-06-06';

    // JSON-LD dynamic construction
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
                "image": `${baseUrl}${evaluatedPost.heroImage}`,
                "datePublished": `${dateIso}T08:00:00Z`,
                "dateModified": `${dateIso}T08:00:00Z`,
                "author": {
                    "@type": "Person",
                    "name": evaluatedPost.author
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
        jsonLd
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

// POST Contato
router.post('/contato', (req, res) => {
    res.json({ success: true, message: 'Recebido!' });
});

// Sitemap XML
router.get('/sitemap.xml', (req, res) => {
    const urls = [];
    const cities = Object.keys(locations);
    const statics = ['', '/solucoes', '/quem-somos', '/projetos', '/blog', '/contato', '/glossario'];
    const hubs = ['engenharia', 'eletrica', 'solar', 'automacao'];
    const serviceKeys = Object.keys(locations.default.services);

    // 1. URLs Estáticas e Hubs para cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        statics.forEach(s => urls.push(`${prefix}${s}`));
        hubs.forEach(h => urls.push(`${prefix}/solucoes/${h}`));
    });

    // 2. Projeto estático (sem prefixo de cidade)
    urls.push('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu');

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

            if (isServiceEnabled(city, sKey)) {
                urls.push(`${prefix}/solucoes/${defaultSvc.category}/${sKey}`);
            }
        });
    });

    // 4. URLs dinâmicas dos posts do blog em cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        posts.forEach(post => {
            urls.push(`${prefix}/blog/${post.slug}`);
        });
    });

    const uniqueUrls = [...new Set(urls)];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    uniqueUrls.forEach(url => {
        const formattedUrl = url === '' ? '/' : url.replace(/\/$/, '');
        sitemap += `  <url><loc>${baseUrl}${formattedUrl}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
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
