const express = require('express');
const router = express.Router();
const business = require('../config/business');
const { PHONE_SOLAR, MESSAGES, buildWaUrl } = require('../lib/site-tracking');

const baseUrl = 'https://www.klyfeelectric.com.br';

const lpSolarWaMsg = MESSAGES.solar;
const lpSolarWaUrl = buildWaUrl(PHONE_SOLAR, lpSolarWaMsg);

const CITY_CONFIG = {
    'campina-grande': {
        name: 'Campina Grande',
        prep: 'em Campina Grande',
        localTag: 'EM CAMPINA GRANDE'
    },
    'joao-pessoa': {
        name: 'João Pessoa',
        prep: 'em João Pessoa',
        localTag: 'EM JOÃO PESSOA'
    },
    'paraiba': {
        name: 'Paraíba',
        prep: 'na Paraíba',
        localTag: 'NA PARAÍBA'
    }
};

const DEFAULT_CITY = {
    name: 'Paraíba',
    prep: 'na Paraíba',
    localTag: 'NA PARAÍBA'
};

const INTENT_CONFIG = {
    'preco': {
        eyebrow: (geo) => `ESTIMATIVA SOLAR • KLYFE ELECTRIC`,
        h1: (geo) => `Quer saber quanto custa energia solar ${geo.prep}? Comece pela sua conta de luz.`,
        subheadline: (geo) => `Informe quanto você paga por mês, veja quanto esse gasto representa em 5 anos e solicite uma estimativa personalizada do seu projeto.`
    },
    'orcamento': {
        eyebrow: (geo) => `ORÇAMENTO DE ENERGIA SOLAR • ${geo.localTag}`,
        h1: (geo) => `Informe o valor da sua conta de luz e solicite um orçamento de energia solar ${geo.prep}.`,
        subheadline: (geo) => `Veja quanto você gasta em 5 anos de energia e solicite uma análise do seu imóvel.`
    },
    'empresa': {
        eyebrow: (geo) => `EMPRESA DE ENERGIA SOLAR • ${geo.localTag}`,
        h1: (geo) => `Empresa de energia solar ${geo.prep} com projeto, instalação e homologação.`,
        subheadline: (geo) => `Informe sua conta de luz, veja o valor acumulado em 5 anos e solicite uma análise inicial do seu projeto.`
    },
    'geral': {
        eyebrow: (geo) => `ENGENHARIA SOLAR ${geo.localTag} (CREA-PB)`,
        h1: (geo) => `Energia solar ${geo.prep}: transforme sua conta de luz em geração própria.`,
        subheadline: (geo) => `Informe quanto você paga de energia por mês, veja quanto esse gasto representa em 5 anos e solicite uma análise inicial do seu projeto.`
    }
};

function resolveSolarHeroVariant(queryCidade, queryIntent) {
    const cityKey = String(queryCidade || '').toLowerCase().trim();
    const intentKey = String(queryIntent || '').toLowerCase().trim();

    const geo = CITY_CONFIG[cityKey] || DEFAULT_CITY;
    const intentObj = INTENT_CONFIG[intentKey] || INTENT_CONFIG['geral'];

    return {
        eyebrow: intentObj.eyebrow(geo),
        h1: intentObj.h1(geo),
        subheadline: intentObj.subheadline(geo),
        city: geo
    };
}

// ═══ LP ADS: ENERGIA SOLAR EMPRESAS ═══
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

// ═══ LP ADS: ENERGIA SOLAR FAZENDAS ═══
router.get('/lp/energia-solar-fazendas', (req, res) => {
    res.render('lp/solar-fazendas', {
        title: 'Energia Solar para Fazendas & Agronegócio | Klyfe Electric',
        description: 'Reduza o custo de irrigação e bombeamento rural com energia solar fotovoltaica. Linhas FNE Verde, Pronaf e engenharia com ART na PB/PE/RN.',
        canonical: `${baseUrl}/lp/energia-solar-fazendas`,
        robots: 'noindex, nofollow',
        page: 'lp-solar-fazendas',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-fazendas',
        fireViewContent: true,
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: false
    });
});

// ═══ LP ADS: ENERGIA SOLAR SUPERMERCADOS E CLÍNICAS ═══
router.get('/lp/energia-solar-supermercados-clinicas', (req, res) => {
    res.render('lp/solar-supermercados-clinicas', {
        title: 'Energia Solar para Supermercados, Clínicas & Postos | Klyfe Electric',
        description: 'Elimine o custo de climatização e refrigeração 24/7 na sua empresa. Estudo de demanda B3/A4, payback rápido e engenharia com ART.',
        canonical: `${baseUrl}/lp/energia-solar-supermercados-clinicas`,
        robots: 'noindex, nofollow',
        page: 'lp-solar-supermercados-clinicas',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-supermercados-clinicas',
        fireViewContent: true,
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: false
    });
});

// ═══ LP ADS: ENERGIA SOLAR RESIDENCIAL ═══
router.get('/lp/energia-solar-residencial', (req, res) => {
    res.render('lp/solar-residencial', {
        title: 'Energia Solar Residencial | Economize até 95% na conta de luz | Klyfe',
        description: 'Energia solar para casas, condomínios e pequenos comércios a partir de 300 kWh/mês. Parcela que substitui a conta com 25 anos de garantia.',
        canonical: `${baseUrl}/lp/energia-solar-residencial`,
        robots: 'noindex, nofollow',
        page: 'lp-solar-residencial',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-residencial',
        fireViewContent: true,
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: false
    });
});

// ═══ LP ADS: ALTA CONVERSÃO SOLAR (RESIDENCIAL & COMERCIAL NA PB) ═══
router.get(['/lp/energia-solar-alta-conversao', '/lp/energia-solar'], (req, res) => {
    const canonical = `${baseUrl}/lp/energia-solar`;
    const heroVariant = resolveSolarHeroVariant(req.query.cidade, req.query.intent);

    const jsonLdData = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Simulador Solar & Engenharia | Klyfe Electric Paraíba",
            "url": canonical,
            "description": "Simule seu sistema solar em Campina Grande ou João Pessoa. Projeto com ART, homologação Energisa PB e 25 anos de garantia."
        },
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${business.url}/#localbusiness`,
            "name": business.name,
            "legalName": business.legalName,
            "taxID": business.taxId,
            "telephone": business.telephone,
            "email": business.email,
            "url": business.url,
            "hasMap": business.mapsUrl,
            "openingHoursSpecification": business.openingHoursSpecification,
            "address": {
                "@type": "PostalAddress",
                ...business.address
            },
            "sameAs": business.sameAs,
            "areaServed": ["Campina Grande", "João Pessoa", "Paraíba"]
        }
    ];

    const jsonLd = jsonLdData.map(b => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');

    res.render('lp/solar-alta-conversao', {
        title: 'Simulador Solar & Ativo de Energia | Klyfe Electric Paraíba',
        description: 'Transforme sua conta de luz em um ativo próprio em Campina Grande e João Pessoa. Simule o valor acumulado em 10 segundos e peça seu projeto com ART.',
        canonical,
        robots: 'noindex, nofollow',
        page: 'lp-solar-alta-conversao',
        contentCategory: 'solar',
        contentName: '/lp/energia-solar-alta-conversao',
        fireViewContent: true,
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: false,
        heroVariant,
        jsonLd
    });
});

// ═══ OBRIGADO (LEAD CONVERTIDO) ═══
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
        leadContentName: 'lp-solar',
        leadContentCategory: 'solar',
        waUrl: lpSolarWaUrl,
        waMsg: lpSolarWaMsg,
        waPhone: PHONE_SOLAR,
        expectLpLead: true
    });
});

module.exports = router;
