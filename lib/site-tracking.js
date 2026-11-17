'use strict';

const locations = require('../config/locations');

const PHONE_DEFAULT = '5583991330972';
const PHONE_SOLAR = '5583991430929';

const MESSAGES = {
    solar: 'Olá! Vi o site da Klyfe e gostaria de um orçamento de ENERGIA SOLAR.',
    wallbox: 'Olá! Vi o site da Klyfe e gostaria de avaliar uma instalação de WALLBOX.',
    eletrica: 'Olá! Vi o site da Klyfe e gostaria de um orçamento de SERVIÇOS ELÉTRICOS.',
    automacao: 'Olá! Vi o site da Klyfe e gostaria de um orçamento de AUTOMAÇÃO.',
    engenharia: 'Olá! Vi o site da Klyfe e gostaria de um orçamento de ENGENHARIA ELÉTRICA / LAUDOS.',
    geral: 'Olá! Vi o site da Klyfe e gostaria de um orçamento para minha região.'
};

const SERVICO_TO_CATEGORY = {
    'Energia Solar Fotovoltaica': 'solar',
    'Engenharia e Projetos': 'engenharia',
    'Manutenção de Subestações': 'engenharia',
    'Instalações Industriais': 'eletrica',
    'Instalação de Wallbox': 'wallbox',
    'Laudos e Termografia': 'engenharia',
    'Automação Predial/Industrial': 'automacao',
    Outro: 'geral'
};

const SERVICE_LABELS = Object.fromEntries(
    Object.entries(locations.default.services || {}).map(([key, service]) => [key, service.label])
);

const PAGE_LABELS = [
    ['/solucoes', 'Soluções da Klyfe'],
    ['/contato', 'Contato com a equipe técnica'],
    ['/quem-somos', 'Klyfe Electric'],
    ['/projetos/avaliacao-qualidade-instalacoes-eletricas-hu', 'Avaliação de instalações elétricas'],
    ['/projetos', 'Portfólio de projetos'],
    ['/glossario', 'Glossário técnico'],
    ['/politica-de-privacidade', 'Atendimento geral'],
    ['/blog', 'Blog técnico'],
    ['/', 'Serviços da Klyfe']
];

function normalizePath(pathname) {
    const raw = String(pathname || '').split('?')[0].toLowerCase();
    if (!raw || raw === '/') return '/';
    return '/' + raw.replace(/^\/+|\/+$/g, '');
}

function cityFromPath(pathname) {
    const p = normalizePath(pathname);
    if (p === '/campina-grande' || p.startsWith('/campina-grande/')) return 'Campina Grande';
    if (p === '/joao-pessoa' || p.startsWith('/joao-pessoa/')) return 'João Pessoa';
    return 'Paraíba';
}

function serviceKeyFromPath(pathname) {
    const p = normalizePath(pathname);
    const segments = p.split('/').filter(Boolean);
    const solucoesIndex = segments.indexOf('solucoes');

    if (solucoesIndex >= 0) {
        const childKey = segments[solucoesIndex + 2];
        const categoryKey = segments[solucoesIndex + 1];
        if (childKey && SERVICE_LABELS[childKey]) return childKey;
        if (categoryKey && SERVICE_LABELS[categoryKey]) return categoryKey;
    }

    const lastSegment = segments[segments.length - 1];
    if (lastSegment && SERVICE_LABELS[lastSegment]) return lastSegment;
    return null;
}

function serviceLabelFromPath(pathname) {
    const p = normalizePath(pathname);
    const serviceKey = serviceKeyFromPath(p);
    if (serviceKey) return SERVICE_LABELS[serviceKey];

    const pagePath = p.replace(/^\/(?:campina-grande|joao-pessoa)(?=\/|$)/, '') || '/';
    const pageMatch = PAGE_LABELS.find(([prefix]) => {
        if (prefix === '/') return pagePath === '/';
        return pagePath === prefix || pagePath.startsWith(prefix + '/');
    });
    return pageMatch ? pageMatch[1] : null;
}

function buildContextualMessage(pathname) {
    const label = serviceLabelFromPath(pathname);
    const city = cityFromPath(pathname);
    const locationPhrase = city === 'Paraíba' ? 'na Paraíba' : 'em ' + city;
    if (!label) return null;

    if (label === 'Serviços da Klyfe') {
        return 'Olá! Vim da página inicial da Klyfe e gostaria de falar sobre engenharia elétrica, serviços elétricos ou automação ' + locationPhrase + '.';
    }
    if (label === 'Atendimento geral' || label === 'Contato com a equipe técnica') {
        return 'Olá! Vim da página de atendimento da Klyfe ' + locationPhrase + ' e gostaria de falar com a equipe técnica.';
    }
    if (label === 'Blog técnico') {
        return 'Olá! Vim do blog técnico da Klyfe ' + locationPhrase + ' e gostaria de tirar uma dúvida sobre um serviço.';
    }
    if (label === 'Glossário técnico') {
        return 'Olá! Vim do glossário técnico da Klyfe ' + locationPhrase + ' e gostaria de tirar uma dúvida sobre um serviço.';
    }
    if (label === 'Portfólio de projetos') {
        return 'Olá! Vim do portfólio de projetos da Klyfe ' + locationPhrase + ' e gostaria de conhecer uma solução semelhante.';
    }
    if (label === 'Klyfe Electric') {
        return 'Olá! Vim da página Quem Somos da Klyfe ' + locationPhrase + ' e gostaria de conhecer os serviços da empresa.';
    }
    if (label === 'Soluções da Klyfe') {
        return 'Olá! Vim da página de soluções da Klyfe ' + locationPhrase + ' e gostaria de falar sobre um serviço técnico.';
    }
    return 'Olá! Vim da página de ' + label + ' ' + locationPhrase + ' e gostaria de solicitar uma avaliação e orçamento.';
}

function categoryFromPath(pathname) {
    const p = String(pathname || '').toLowerCase();
    // Páginas de energia solar e usinas: todo WhatsApp vai para o número solar.
    if (
        p.includes('/energia-solar') ||
        p.includes('/lp/energia-solar') ||
        p.includes('/solucoes/solar') ||
        p.includes('/usinas-solares') ||
        p.includes('/calculadora-solar')
    ) {
        return 'solar';
    }
    if (p.includes('/carregador-veicular') || p.includes('/carregador-ev') || p.includes('/wallbox')) {
        return 'wallbox';
    }
    if (p.startsWith('/servicos/')) {
        if (p.includes('subestacao') || p.includes('manutencao-subestacao') || p.includes('laudo')) return 'engenharia';
        if (p.includes('solar')) return 'solar';
        return 'geral';
    }
    if (p.includes('/solucoes/eletrica') || p.includes('/carregador')) return 'eletrica';
    if (p.includes('/solucoes/automacao') || p.includes('automacao-residencial')) return 'automacao';
    if (p.includes('/solucoes/engenharia') || p.includes('/laudo') || p.includes('/subestacao') || p.includes('/spda')) {
        return 'engenharia';
    }
    return 'geral';
}

function buildWaUrl(phone, message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Resolve content category + WhatsApp CTA from path (and optional overrides).
 * ViewContent (Meta) só para funil Solar — otimização de campanhas solares.
 * @param {string} pathname
 * @param {{ contentCategory?: string, waMsg?: string, waPhone?: string }} [overrides]
 */
function resolveTrackingContext(pathname, overrides = {}) {
    const contentCategory = overrides.contentCategory || categoryFromPath(pathname);
    const waPhone = overrides.waPhone || (contentCategory === 'solar' ? PHONE_SOLAR : PHONE_DEFAULT);
    const contextualMessage = contentCategory === 'solar' ? null : buildContextualMessage(pathname);
    const waMsg = overrides.waMsg || contextualMessage || MESSAGES[contentCategory] || MESSAGES.geral;
    return {
        contentCategory,
        waPhone,
        waMsg,
        waUrl: buildWaUrl(waPhone, waMsg),
        fireViewContent: contentCategory === 'solar'
    };
}

function categoryFromServico(servico) {
    if (!servico) return 'geral';
    return SERVICO_TO_CATEGORY[servico] || 'geral';
}

module.exports = {
    PHONE_DEFAULT,
    PHONE_SOLAR,
    MESSAGES,
    SERVICO_TO_CATEGORY,
    categoryFromPath,
    categoryFromServico,
    cityFromPath,
    serviceKeyFromPath,
    serviceLabelFromPath,
    buildContextualMessage,
    resolveTrackingContext,
    buildWaUrl
};
