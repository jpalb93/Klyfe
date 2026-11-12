const express = require('express');
const router = express.Router();
const locations = require('../config/locations');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const business = require('../config/business');
const { buildServiceContentRecord } = require('../lib/content-governance');
const { getRelatedServiceLinks } = require('../config/internal-links');

const baseUrl = 'https://www.klyfeelectric.com.br';

const WALLBOX_FAQ = [
    { question: 'O que é um Wallbox?', answer: 'É uma estação de recarga para veículos elétricos ou híbridos plug-in. A instalação elétrica precisa ser avaliada conforme o equipamento e o local de uso.' },
    { question: 'Posso instalar em uma casa existente?', answer: 'Sim, desde que a infraestrutura suporte a solução ou receba as adequações necessárias. A vistoria verifica quadro, padrão, percurso e proteções.' },
    { question: 'É possível instalar em condomínio?', answer: 'É possível avaliar alternativas ligadas ao medidor individual ou a uma estrutura comum. O condomínio, o percurso dos cabos e a medição precisam entrar na definição do escopo.' },
    { question: 'Vocês instalam o carregador que eu já comprei?', answer: 'Podemos avaliar a instalação de um equipamento já adquirido. Antes, conferimos modelo, potência, tensão, manual e compatibilidade com o local.' },
    { question: 'Tomada comum substitui um Wallbox?', answer: 'Não há uma resposta única. A tomada comum pode não ser adequada para altas correntes por longos períodos; a decisão depende do veículo, do carregador e da instalação.' },
    { question: 'Quanto custa instalar um Wallbox?', answer: 'O valor varia principalmente com a distância, o caminho dos cabos, a potência, as proteções e eventuais adequações. A proposta é definida depois de entender o cenário técnico.' }
];

const WALLBOX_RESIDENCIAL_FAQ = [
    { question: 'Qual a potência recomendada para um Wallbox residencial em casa?', answer: 'A potência mais comum para residências é 7,4 kW (32A em 220V), permitindo recarregar a bateria de 20% a 80% durante a noite (cerca de 5 a 7 horas). Se a residência possuir padrão trifásico e o veículo suportar, podemos instalar modelos de 11 kW ou 22 kW.' },
    { question: 'Preciso trocar meu padrão de entrada da Energisa?', answer: 'Depende da carga já instalada (como ar-condicionado e chuveiros). Se o padrão for monofásico de baixa capacidade, a Klyfe realiza o estudo de demanda e conduz a solicitação de aumento de carga para bifásico ou trifásico junto à Energisa PB.' },
    { question: 'Quais proteções elétricas são obrigatórias na instalação residencial?', answer: 'Conforme as normas ABNT NBR 5410 e ABNT NBR 17019, é obrigatório circuito dedicado exclusivo com disjuntor Curva C, interruptor DR Tipo A ou Tipo B (proteção contra fuga residual em corrente contínua > 6mA), DPS Classe II e aterramento com equipotencialização.' },
    { question: 'Por que não devo usar uma tomada comum de 20A?', answer: 'Tomadas comuns de uso geral não foram projetadas para suportar corrente máxima contínua por 8 a 12 horas ininterruptas. O uso contínuo derrete tomadas, superaquece condutores e gera grave risco de incêndio na residência.' },
    { question: 'A Klyfe instala carregadores de marcas como BYD, GWM, Volvo e WEG?', answer: 'Sim. Somos especialistas na instalação e comissionamento de todas as marcas de carregadores do mercado (BYD, WEG, Volvo, GWM, Enel X, Schneider, ABB, Autel, Wallbox Pulsar, Porsche, BMW, etc.).' },
    { question: 'O serviço tem emissão de ART registrada no CREA-PB?', answer: 'Sim. Toda instalação executada pela Klyfe Electric conta com emissão de ART (Anotação de Responsabilidade Técnica) assinada por engenheiro eletricista responsável, garantindo a cobertura do seu seguro residencial e a valorização do imóvel.' }
];

const WALLBOX_CONDOMINIO_FAQ = [
    { question: 'Como funciona a instalação de Wallbox na vaga da garagem do condomínio?', answer: 'Pode ser realizada por conexão direta ao medidor da unidade privativa (quando a prumada e a distância permitirem) ou através de prumada coletiva ligada ao quadro geral do condomínio com medidor individual de energia homologado pelo Inmetro.' },
    { question: 'Preciso de autorização do síndico ou aprovação em assembleia?', answer: 'Sim. Qualquer intervenção em áreas comuns exige notificação ao síndico com apresentação de laudo técnico de viabilidade e projeto com ART. A Klyfe fornece toda a documentação de engenharia necessária para aprovação célere pelo condomínio.' },
    { question: 'Como é feito o rateio do consumo de energia no condomínio?', answer: 'Instalamos medidores digitais homologados pelo Inmetro em cada ponto de recarga privativo, permitindo leitura individualizada mensal pelo condomínio ou integração com plataformas de bilhetagem automática com cobrança direta no cartão de crédito do morador.' },
    { question: 'O condomínio corre risco de sobrecarga se muitos moradores comprarem carros elétricos?', answer: 'Para evitar desarmes no disjuntor geral do edifício, projetamos sistemas com Balanceamento Dinâmico de Carga (DLB). Essa tecnologia gerencia a potência entregue aos veículos em tempo real de acordo com o consumo instantâneo das áreas comuns do prédio.' },
    { question: 'Quem é responsável pela segurança contra incêndio na garagem?', answer: 'A instalação deve obedecer rigorosamente à ABNT NBR 17019 e às diretrizes do Corpo de Bombeiros Militar da Paraíba (CBMPB), com tubulações metálicas antichamas, proteções DR adequadas, seccionamento de emergência e ART assinada por engenheiro.' },
    { question: 'Como o condomínio pode se preparar para a demanda futura de carros elétricos?', answer: 'Recomendamos a elaboração de um Plano Diretor de Infraestrutura para Mobilidade Elétrica: estudo de capacidade do transformador existente, projeto de eletrocalhas coletivas e padronização das regras no regimento interno.' }
];

const WALLBOX_EMPRESA_FAQ = [
    { question: 'Quais as vantagens de instalar pontos de recarga na minha empresa?', answer: 'Sua empresa atrai e fideliza clientes com veículos elétricos, fortalece compromissos ESG, viabiliza a transição de frotas comerciais com redução drástica no custo de combustível e pode monetizar as recargas gerando nova receita.' },
    { question: 'É possível cobrar dos clientes pela energia consumida na recarga?', answer: 'Sim. Instalamos carregadores inteligentes com protocolo aberto OCPP 1.6 ou 2.0.1 integrados a plataformas de pagamento via smartphone ou cartão RFID, com repasse automático do valor faturado para sua empresa.' },
    { question: 'Qual a potência indicada para empresas e estacionamentos comerciais?', answer: 'Para locais de permanência de 1 a 3 horas (shoppings, restaurantes, clínicas, supermercados), recomendamos estações AC semirrápidas de 11 kW ou 22 kW. Para frotas que rodam intensamente ou paradas rápidas em rodovias, indicamos carregadores rápidos DC de 30 kW a 60 kW.' },
    { question: 'Como saber se a entrada de energia da minha empresa suporta as estações?', answer: 'A engenharia da Klyfe realiza o estudo de demanda da subestação e quadro geral da empresa. Havendo necessidade de aumento de demanda ou adequação de transformador, elaboramos o projeto e cuidamos de todo o processo junto à Energisa PB.' },
    { question: 'A empresa pode controlar quem tem permissão para carregar?', answer: 'Sim. O sistema permite controle de acesso por cartões RFID cadastrados, liberação remota por aplicativo, agendamento de horários fora do horário de ponta tarifária e regras tarifárias diferenciadas para colaboradores e visitantes.' },
    { question: 'Qual a economia ao eletrificar a frota da empresa?', answer: 'O custo por quilômetro rodado de um veículo elétrico abastecido na rede corporativa chega a ser até 80% menor do que com gasolina ou diesel, além de custos de manutenção mecânica substancialmente inferiores.' }
];

const WALLBOX_SOLAR_FAQ = [
    { question: 'Como funciona o carregamento de carro elétrico com energia solar?', answer: 'O sistema fotovoltaico gera energia durante o dia. A recarga pode coincidir com essa geração ou usar a rede, conforme horários, consumo do imóvel e configuração do carregador. Um estudo identifica a integração possível e seus custos.' },
    { question: 'O que é o modo de recarga por excedente solar (Solar Matching)?', answer: 'Carregadores inteligentes com Solar Matching monitoram a geração em tempo real através de TC (transformador de corrente). Quando há sobra de energia solar que seria injetada na rede, o carregador modula sua amperagem para injetar exatamente esse excedente na bateria do carro.' },
    { question: 'Preciso de baterias estacionárias para carregar o carro à noite?', answer: 'Não é obrigatório em sistemas conectados à rede (On-Grid): durante o dia você injeta créditos de energia solar na rede da Energisa PB e à noite consome esses créditos para recarregar o veículo. Para autonomia total contra apagões, pode-se integrar um inversor híbrido com bateria de lítio.' },
    { question: 'Quantas placas solares a mais preciso instalar para abastecer um carro elétrico?', answer: 'Em média, um veículo elétrico que roda 40 km por dia consome cerca de 180 a 220 kWh por mês. Na Paraíba, com nosso excelente índice solar, isso equivale a apenas 3 a 4 placas solares de alta potência (580W a 600W).' },
    { question: 'Qual a economia ao integrar energia solar e carro elétrico?', answer: 'A economia é máxima. Um motorista que gasta R$ 1.200 a R$ 1.800 mensais com gasolina reduz esse custo para praticamente R$ 0,00 em combustível, acelerando o retorno do investimento tanto da usina solar quanto do Wallbox.' },
    { question: 'A Klyfe faz o projeto completo da usina solar junto com o Wallbox?', answer: 'Sim! A Klyfe Electric é especialista tanto em engenharia solar fotovoltaica quanto em mobilidade elétrica. Desenvolvemos o projeto unificado, dimensionamos a usina e o carregador, e cuidamos da homologação completa junto à Energisa PB com ART do CREA-PB.' }
];

// ═══ GERADOR DE ROTAS DINÂMICAS PARA SERVIÇOS (Power Pages) ═══
Object.keys(locations.default.services).forEach(serviceKey => {
    const defaultSvc = locations.default.services[serviceKey];
    
    // Ignora as rotas de categoria (Hubs) que já possuem lógica manual complexa
    if (serviceKey === defaultSvc.category) return;

    router.get(`/:city(campina-grande|joao-pessoa)?/solucoes/:category/${serviceKey}`, (req, res, next) => {
        const cityKey = req.params.city || 'default';
        const cityBase = locations[cityKey] || locations['default'];

        // A categoria faz parte da identidade canônica do serviço. Não
        // publique cópias quando alguém inventar outra categoria na URL.
        if (req.params.category !== defaultSvc.category) return next();
        
        // Validação de segurança: o serviço deve existir e estar habilitado para esta cidade
        if (!res.locals.isServiceEnabled(serviceKey)) {
            return next();
        }

        const citySvc = { ...defaultSvc, ...(cityBase.services?.[serviceKey] || {}) };
        const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
        const isWallboxGroup = serviceKey === 'carregador-veicular' || serviceKey.startsWith('wallbox-');
        const canonicalPath = `${homePrefix}/solucoes/${defaultSvc.category}/${serviceKey}${isWallboxGroup ? '/' : ''}`;
        const canonical = `${baseUrl}${canonicalPath}`;
        const locationLabel = `${cityBase.preposition} ${cityBase.name}`;
        const localizeServiceText = (value) => typeof value === 'string'
            ? value.replaceAll('%location%', locationLabel)
            : value;
        const localizedServiceData = {
            ...citySvc,
            introText: localizeServiceText(citySvc.introText),
            plainLanguage: localizeServiceText(citySvc.plainLanguage),
            serviceContext: localizeServiceText(citySvc.serviceContext)
        };

        const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
        const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
        const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/${defaultSvc.category}/${serviceKey}${isWallboxGroup ? '/' : ''}`;
        const contentRecord = buildServiceContentRecord({
            serviceKey,
            service: citySvc,
            cityKey,
            cityData: cityBase,
            canonical
        });
        const relatedLinks = getRelatedServiceLinks({
            category: defaultSvc.category,
            serviceKey,
            homePrefix,
            isEnabled: res.locals.isServiceEnabled
        });
        const isWallbox = isWallboxGroup;
        const serviceDescription = localizeServiceText(citySvc.serviceDescription) || [
            isWallbox
                ? `${citySvc.label} ${locationLabel} e região com engenharia elétrica e ART no CREA-PB.`
                : `${citySvc.label} ${locationLabel} e região.`,
            citySvc.painPoint,
            'Consulte o escopo, a disponibilidade e as condições do atendimento.'
        ].filter(Boolean).join(' ');
        const metaDescriptionBase = localizeServiceText(citySvc.metaDescription) || [
            isWallbox
                ? `${citySvc.label} ${locationLabel}: ${citySvc.summary}`
                : `${citySvc.label} ${locationLabel}.`,
            citySvc.painPoint,
            'Consulte o escopo, a disponibilidade e a logística.'
        ].filter(Boolean).join(' ');
        const metaDescription = metaDescriptionBase.length <= 160
            ? metaDescriptionBase
            : `${metaDescriptionBase.slice(0, 157).replace(/\s+\S*$/, '')}…`;

        // JSON-LD compatível com a intenção da página: um serviço declarado
        // e a trilha de navegação, sem avaliações ou promessas implícitas.
        const serviceSchema = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${canonical}#service`,
            name: citySvc.label,
            serviceType: citySvc.label,
            url: canonical,
            description: serviceDescription,
            provider: { '@id': `${baseUrl}/#localbusiness` },
            areaServed: { '@type': 'AdministrativeArea', name: cityBase.name }
        };
        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}${homePrefix}/` },
                { '@type': 'ListItem', position: 2, name: 'Soluções', item: `${baseUrl}${homePrefix}/solucoes` },
                { '@type': 'ListItem', position: 3, name: citySvc.category.toUpperCase(), item: `${baseUrl}${homePrefix}/solucoes/${citySvc.category}` },
                { '@type': 'ListItem', position: 4, name: citySvc.label, item: canonical }
            ]
        };

        let faqList = null;
        if (serviceKey === 'carregador-veicular') faqList = WALLBOX_FAQ;
        else if (serviceKey === 'wallbox-residencial') faqList = WALLBOX_RESIDENCIAL_FAQ;
        else if (serviceKey === 'wallbox-condominio') faqList = WALLBOX_CONDOMINIO_FAQ;
        else if (serviceKey === 'wallbox-empresa') faqList = WALLBOX_EMPRESA_FAQ;
        else if (serviceKey === 'wallbox-energia-solar') faqList = WALLBOX_SOLAR_FAQ;

        const faqSchema = faqList ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqList.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer }
            }))
        } : null;
        const jsonLd = [serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean)
            .map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
            .join('\n');

        const pageHeroImage = citySvc.heroImage || (isWallboxGroup ? '/img/wallbox/wallbox-hero-dusk.webp' : defaultSvc.heroImage);
        const heroImgBase = pageHeroImage ? pageHeroImage.replace(/\.webp$/, '') : '';
        const preloadImagesrcset = pageHeroImage
            ? `${heroImgBase}-480.webp 480w, ${heroImgBase}-768.webp 768w, ${heroImgBase}-1200.webp 1200w, ${pageHeroImage} 1400w`
            : undefined;

        res.render(defaultSvc.template, {
            title: `${citySvc.label} ${locationLabel} | Klyfe Electric`,
            pageTitle: `${citySvc.label} ${locationLabel} | Klyfe Electric`,
            description: metaDescription,
            metaDesc: metaDescription,
            image: isWallboxGroup ? (citySvc.heroImage || '/img/wallbox/wallbox-og.webp') : citySvc.heroImage,
            preloadImage: pageHeroImage,
            preloadImagesrcset,
            preloadImagesizes: '(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1200px) 50vw, 580px',
            canonical,
            robots: 'index, follow',
            page: citySvc.category,
            cityData: cityBase,
            cityKey: cityKey,
            serviceData: localizedServiceData,
            faqList: faqList,
            contentCategory: isWallboxGroup ? 'wallbox' : defaultSvc.category,
            contentVertical: contentRecord.vertical,
            serviceKey,
            contentName: serviceKey,
            contentRecord,
            relatedLinks,
            spdaGuides: serviceKey === 'spda' ? require('../config/spda-guides') : [],
            substationGuides: ['projeto-subestacao', 'subestacao-aerea', 'manutencao-subestacao'].includes(serviceKey) ? require('../config/substation-guides') : [],
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
    const serviceData = { ...locations.default.services.engenharia, ...(cityBase.services?.engenharia || {}) };
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/engenharia`;
    
    res.render('engenharia', {
        title: `Engenharia Elétrica ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Engenharia Elétrica ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Projetos elétricos, laudos de SPDA, aterramento e perícias ${cityBase.preposition} ${cityBase.name}. Atendimento conforme escopo técnico e necessidade do empreendimento.`,
        metaDesc: `Projetos elétricos, laudos de SPDA, aterramento e perícias ${cityBase.preposition} ${cityBase.name}. Atendimento conforme escopo técnico e necessidade do empreendimento.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/engenharia` : `${baseUrl}/${cityKey}/solucoes/engenharia`,
        cityKey, cityData: cityBase, serviceData, alternateCityName, alternateUrl, page: 'engenharia',
        contentCategory: 'engenharia', contentVertical: 'engenharia', serviceKey: 'engenharia', contentName: 'engenharia', jsonLd: ''
    });
});

// Elétrica
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/eletrica', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const serviceData = { ...locations.default.services.eletrica, ...(cityBase.services?.eletrica || {}) };
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/eletrica`;

    res.render('eletrica', {
        title: `Serviços Elétricos ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Serviços Elétricos ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Serviços de eletricista, instalações e manutenção corretiva ${cityBase.preposition} ${cityBase.name}. Atendimento conforme a necessidade da instalação e o escopo contratado.`,
        metaDesc: `Serviços de eletricista, instalações e manutenção corretiva ${cityBase.preposition} ${cityBase.name}. Atendimento conforme a necessidade da instalação e o escopo contratado.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/eletrica` : `${baseUrl}/${cityKey}/solucoes/eletrica`,
        cityKey, cityData: cityBase, serviceData, alternateCityName, alternateUrl, page: 'eletrica',
        contentCategory: 'eletrica', contentVertical: 'eletrica', serviceKey: 'eletrica', contentName: 'eletrica', jsonLd: ''
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
        contentCategory: 'solar',
        contentVertical: 'solar',
        serviceKey: 'solar',
        contentName: 'energia-solar',
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
        contentCategory: 'solar',
        contentVertical: 'solar',
        serviceKey: req.params.slug,
        contentName: req.params.slug,
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
            contentCategory: 'solar',
            contentVertical: 'solar',
            serviceKey: segment.slug,
            contentName: segment.slug,
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
            contentCategory: 'solar',
            contentVertical: 'solar',
            serviceKey: city.slug,
            contentName: city.slug,
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
    const serviceData = { ...locations.default.services.automacao, ...(cityBase.services?.automacao || {}) };
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/solucoes/automacao`;

    res.render('automacao', {
        title: `Automação Smart ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        pageTitle: `Automação Smart ${cityBase.preposition} ${cityBase.name} | Klyfe Electric`,
        description: `Projetos de automação residencial Smart Home e processos industriais ${cityBase.preposition} ${cityBase.name}. Mais conforto, segurança e economia para o seu imóvel.`,
        metaDesc: `Projetos de automação residencial Smart Home e processos industriais ${cityBase.preposition} ${cityBase.name}. Mais conforto, segurança e economia para o seu imóvel.`,
        canonical: cityKey === 'default' ? `${baseUrl}/solucoes/automacao` : `${baseUrl}/${cityKey}/solucoes/automacao`,
        cityKey, cityData: cityBase, serviceData, alternateCityName, alternateUrl, page: 'automacao',
        contentCategory: 'automacao', contentVertical: 'automacao', serviceKey: 'automacao', contentName: 'automacao', jsonLd: ''
    });
});

module.exports = router;
