/**
 * Taxonomia editorial que conecta cada serviço aos conceitos que ajudam o
 * visitante a entender o escopo técnico da página.
 *
 * Os nomes são resolvidos contra config/glossario.js. Assim, os links sempre
 * usam os slugs estáveis gerados pelo glossário e não âncoras digitadas à mão.
 */
const glossary = require('./glossario');

const termsByName = new Map(glossary.terms.map(term => [term.term, term]));

const categoryTermNames = {
    engenharia: [
        'Projeto elétrico',
        'Laudo de instalações elétricas',
        'Inspeção elétrica',
        'ART (Anotação de Responsabilidade Técnica)',
        'Diagrama unifilar',
        'NBR 5410'
    ],
    eletrica: [
        'Quadro elétrico',
        'Disjuntor',
        'Circuito dedicado',
        'Aterramento elétrico',
        'Queda de tensão',
        'NBR 5410'
    ],
    automacao: [
        'Automação residencial',
        'IoT (Internet das Coisas)',
        'Protocolo de comunicação',
        'Sensor de presença',
        'Cenas de automação',
        'BMS (Building Management System)'
    ],
    solar: [
        'Energia solar fotovoltaica',
        'Módulo fotovoltaico',
        'Inversor solar',
        'Geração distribuída',
        'Homologação de energia solar',
        'kWh (quilowatt-hora)'
    ]
};

const serviceTermNames = {
    engenharia: categoryTermNames.engenharia,
    eletrica: categoryTermNames.eletrica,
    'laudos-eletricos': [
        'Laudo de instalações elétricas',
        'Inspeção elétrica',
        'Termografia elétrica',
        'ART (Anotação de Responsabilidade Técnica)',
        'NR-10',
        'SPDA (Sistema de Proteção contra Descargas Atmosféricas)'
    ],
    'projeto-eletrico': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Quadro elétrico',
        'NBR 5410',
        'ART (Anotação de Responsabilidade Técnica)'
    ],
    'projeto-eletrico-multifamiliar': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Quadro elétrico',
        'Circuito dedicado',
        'Queda de tensão'
    ],
    'projeto-eletrico-unifamiliar': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Quadro elétrico',
        'Circuito dedicado',
        'Queda de tensão'
    ],
    'projeto-eletrico-comercial': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Quadro elétrico',
        'Demanda contratada',
        'Queda de tensão'
    ],
    'projeto-eletrico-industrial': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Subestação',
        'Demanda contratada',
        'NBR 14039',
        'Queda de tensão'
    ],
    'projeto-eletrico-multiplas-unidades': [
        'Projeto elétrico',
        'Diagrama unifilar',
        'Prumada elétrica',
        'Quadro elétrico',
        'Demanda contratada'
    ],
    'aprovacao-energisa': [
        'Demanda contratada',
        'Projeto elétrico',
        'Diagrama unifilar',
        'Subestação',
        'Cabine primária',
        'NBR 5410'
    ],
    'projeto-luminotecnico': [
        'Eficiência energética',
        'Potência elétrica',
        'Circuito dedicado',
        'Projeto elétrico',
        'Automação residencial'
    ],
    spda: [
        'SPDA (Sistema de Proteção contra Descargas Atmosféricas)',
        'Análise de risco de descargas atmosféricas',
        'Captação',
        'Descidas',
        'DPS (Dispositivo de Proteção contra Surtos)',
        'Equipotencialização'
    ],
    'subestacao-aerea': [
        'Subestação',
        'Cabine primária',
        'NBR 14039',
        'Demanda contratada',
        'Aterramento elétrico',
        'Inspeção elétrica'
    ],
    'projeto-subestacao': [
        'Subestação',
        'Cabine primária',
        'NBR 14039',
        'Demanda contratada',
        'Aterramento elétrico',
        'Diagrama unifilar'
    ],
    'manutencao-subestacao': [
        'Subestação',
        'Cabine primária',
        'Manutenção preventiva',
        'Termografia elétrica',
        'Aterramento elétrico',
        'Inspeção elétrica'
    ],
    'correcao-fator-potencia': [
        'Fator de potência',
        'Harmônicas',
        'Potência elétrica',
        'Eficiência energética',
        'Demanda contratada'
    ],
    'pericia-ressarcimento-danos': [
        'Inspeção elétrica',
        'Laudo de instalações elétricas',
        'Termografia elétrica',
        'Diagrama unifilar',
        'ART (Anotação de Responsabilidade Técnica)'
    ],
    'pericia-furto-energia': [
        'Inspeção elétrica',
        'Laudo de instalações elétricas',
        'Termografia elétrica',
        'Diagrama unifilar',
        'ART (Anotação de Responsabilidade Técnica)'
    ],
    'viabilidade-carregador-veicular': [
        'Viabilidade elétrica para carregador',
        'Wallbox',
        'Circuito dedicado para carregador',
        'Balanceamento de carga',
        'Demanda contratada',
        'Queda de tensão'
    ],
    'instalacoes-industriais': [
        'Quadro elétrico',
        'Disjuntor',
        'Circuito dedicado',
        'Queda de tensão',
        'Termografia elétrica',
        'Diagrama unifilar'
    ],
    'tomadas-interruptores': [
        'Circuito dedicado',
        'Disjuntor',
        'Quadro elétrico',
        'Aterramento elétrico',
        'Tensão elétrica'
    ],
    iluminacao: [
        'Potência elétrica',
        'Eficiência energética',
        'Circuito dedicado',
        'Automação residencial',
        'Tensão elétrica'
    ],
    'chuveiro-eletrico': [
        'Circuito dedicado',
        'Disjuntor',
        'Potência elétrica',
        'Tensão elétrica',
        'Queda de tensão'
    ],
    ventiladores: [
        'Potência elétrica',
        'Tensão elétrica',
        'Disjuntor',
        'Eficiência energética'
    ],
    'quadro-distribuicao': [
        'Quadro elétrico',
        'Disjuntor',
        'Dispositivo DR',
        'DPS (Dispositivo de Proteção contra Surtos)',
        'Barramento elétrico',
        'Diagrama unifilar'
    ],
    'fiacao-cabeamento': [
        'Corrente elétrica',
        'Tensão elétrica',
        'Queda de tensão',
        'Circuito dedicado',
        'Diagrama unifilar'
    ],
    'ar-condicionado': [
        'Circuito dedicado',
        'Potência elétrica',
        'Demanda contratada',
        'Disjuntor',
        'Eficiência energética',
        'Queda de tensão'
    ],
    'carregador-veicular': [
        'Wallbox',
        'EVSE (Electric Vehicle Supply Equipment)',
        'Recarga AC',
        'Circuito dedicado para carregador',
        'Viabilidade elétrica para carregador'
    ],
    'wallbox-residencial': [
        'Wallbox',
        'EVSE (Electric Vehicle Supply Equipment)',
        'Recarga AC',
        'Circuito dedicado para carregador',
        'Viabilidade elétrica para carregador'
    ],
    'wallbox-condominio': [
        'Wallbox',
        'EVSE (Electric Vehicle Supply Equipment)',
        'Recarga AC',
        'Circuito dedicado para carregador',
        'Balanceamento de carga',
        'Viabilidade elétrica para carregador'
    ],
    'wallbox-empresa': [
        'Wallbox',
        'EVSE (Electric Vehicle Supply Equipment)',
        'Recarga AC',
        'Circuito dedicado para carregador',
        'Balanceamento de carga',
        'Demanda contratada'
    ],
    'wallbox-energia-solar': [
        'Wallbox',
        'Recarga AC',
        'Energia solar fotovoltaica',
        'Inversor solar',
        'Circuito dedicado para carregador',
        'Balanceamento de carga'
    ],
    'projeto-rede': [
        'IoT (Internet das Coisas)',
        'Protocolo de comunicação',
        'Automação residencial',
        'Circuito dedicado',
        'Aterramento elétrico'
    ],
    automacao: [
        'Automação residencial',
        'Automação industrial',
        'CLP (Controlador Lógico Programável)',
        'IoT (Internet das Coisas)',
        'BMS (Building Management System)',
        'Protocolo de comunicação'
    ],
    'automacao-residencial': [
        'Automação residencial',
        'IoT (Internet das Coisas)',
        'Sensor de presença',
        'Cenas de automação',
        'Protocolo de comunicação'
    ],
    solar: [
        'Energia solar fotovoltaica',
        'Módulo fotovoltaico',
        'Inversor solar',
        'Geração distribuída',
        'Homologação de energia solar',
        'kWh (quilowatt-hora)'
    ]
};

function getServiceGlossaryTerms(serviceKey, category) {
    const names = serviceTermNames[serviceKey] || categoryTermNames[category] || [];
    const seen = new Set();

    return names
        .map(name => termsByName.get(name))
        .filter(term => {
            if (!term || seen.has(term.slug)) return false;
            seen.add(term.slug);
            return true;
        })
        .slice(0, 6);
}

function getServiceGlossaryLinks(serviceKey, cityKey = 'default', category) {
    const prefix = cityKey && cityKey !== 'default' ? `/${cityKey}` : '';

    return getServiceGlossaryTerms(serviceKey, category).map(term => ({
        slug: term.slug,
        term: term.term,
        label: term.term.split(' (')[0],
        href: `${prefix}/glossario#${term.slug}`,
        definition: term.definition,
        practical: term.practical,
        importance: term.importance,
        related: (term.related || [])
            .map(name => termsByName.get(name))
            .filter(Boolean)
            .slice(0, 4)
            .map(relatedTerm => ({
                term: relatedTerm.term,
                slug: relatedTerm.slug,
                href: `${prefix}/glossario#${relatedTerm.slug}`
            }))
    }));
}

function inferServiceGlossaryKey(pathname = '') {
    const cleanPath = (pathname.split('?')[0].replace(/\/+$/, '') || '/')
        .replace(/^\/(?:campina-grande|joao-pessoa)(?=\/|$)/, '') || '/';

    if (/^\/energia-solar(?:\/|$)/.test(cleanPath)) return 'solar';

    const servicePath = cleanPath.match(/^\/solucoes\/(?:engenharia|eletrica|automacao)(?:\/([^/]+))?$/);
    if (!servicePath) return null;

    return servicePath[1] || cleanPath.split('/')[2];
}

module.exports = {
    categoryTermNames,
    serviceTermNames,
    getServiceGlossaryTerms,
    getServiceGlossaryLinks,
    inferServiceGlossaryKey
};
