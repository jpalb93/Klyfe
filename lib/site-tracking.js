'use strict';

const PHONE_DEFAULT = '5583991330972';
const PHONE_SOLAR = '5583991430929';

const MESSAGES = {
    solar: 'Olá! Vi o site da Klyfe e gostaria de um orçamento de ENERGIA SOLAR.',
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
    'Laudos e Termografia': 'engenharia',
    'Automação Predial/Industrial': 'automacao',
    Outro: 'geral'
};

function categoryFromPath(pathname) {
    const p = String(pathname || '').toLowerCase();
    if (
        p.includes('/energia-solar') ||
        p.includes('/lp/energia-solar') ||
        p.includes('/solucoes/solar')
    ) {
        return 'solar';
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
    const waMsg = overrides.waMsg || MESSAGES[contentCategory] || MESSAGES.geral;
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
    resolveTrackingContext,
    buildWaUrl
};
