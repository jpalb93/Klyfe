const RELATIONS = {
    engenharia: [
        { key: 'spda', label: 'SPDA — projeto, instalação e laudo', description: 'Projeto, execução, adequação, inspeção e manutenção.' },
        { key: 'projeto-subestacao', label: 'Projeto de subestação', description: 'Planejamento de média tensão e cabine.' },
        { key: 'manutencao-subestacao', label: 'Manutenção de subestação', description: 'Rotinas preventivas e diagnóstico.' },
        { key: 'laudos-eletricos', label: 'Laudos elétricos', description: 'Inspeção, documentação e recomendações.' },
        { key: 'projeto-eletrico', label: 'Projeto elétrico', description: 'Projetos residenciais, prediais e industriais.' }
    ],
    eletrica: [
        { key: 'wallbox-residencial', label: 'Wallbox Residencial', description: 'Instalação em casa com circuito exclusivo e proteção.' },
        { key: 'wallbox-condominio', label: 'Wallbox em Condomínio', description: 'Medição individual e balanceamento dinâmico de carga.' },
        { key: 'wallbox-empresa', label: 'Wallbox para Empresas', description: 'Totens corporativos, OCPP e recarga para frotas.' },
        { key: 'wallbox-energia-solar', label: 'Wallbox + Energia Solar', description: 'Recarga planejada com a geração fotovoltaica disponível.' },
        { key: 'carregador-veicular', label: 'Instalação de Wallbox (Hub)', description: 'Avaliação técnica e infraestrutura para carregadores.' },
        { key: 'instalacoes-industriais', label: 'Instalações industriais', description: 'Infraestrutura elétrica para plantas e operações.' },
        { key: 'projeto-rede', label: 'Redes e cabeamento', description: 'Infraestrutura de dados e conectividade.' }
    ],
    automacao: [
        { key: 'automacao-residencial', label: 'Automação residencial', description: 'Integração de iluminação, segurança e conforto.' }
    ]
};

function getRelatedServiceLinks({ category, serviceKey, homePrefix = '', isEnabled = () => true } = {}) {
    const isWallbox = (key) => key === 'carregador-veicular' || key.startsWith('wallbox-');
    return (RELATIONS[category] || [])
        .filter(item => item.key !== serviceKey && isEnabled(item.key))
        .map(item => ({
            ...item,
            href: `${homePrefix}/solucoes/${category}/${item.key}${isWallbox(item.key) ? '/' : ''}`
        }));
}

module.exports = { RELATIONS, getRelatedServiceLinks };
