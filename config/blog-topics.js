/**
 * Keywords seed, categorias e imagens hero para geração automática de posts.
 */
module.exports = {
    categories: {
        solar: {
            label: 'Solar',
            serviceUrl: '/energia-solar/',
            topics: [
                'tarifa Fio B energia solar 2026',
                'homologação sistema solar Energisa Paraíba',
                'homologação solar Neoenergia Pernambuco passo a passo',
                'homologação solar Cosern Natal RN',
                'inversor híbrido vs string para residências',
                'bateria de armazenamento solar vale a pena',
                'Lei 14.300 geração distribuída atualizações',
                'microinversor vs inversor central comparativo',
                'energia solar em condomínios normas ANEEL',
                'energia solar para hotéis payback Nordeste',
                'energia solar para fazendas irrigação semiárido',
                'energia solar para postos de combustível',
                'manutenção preventiva painéis fotovoltaicos'
            ]
        },
        eletrica: {
            label: 'Elétrica',
            serviceUrl: '<%- getHomePrefix() %>/solucoes/eletrica',
            topics: [
                'laudo NR-10 obrigatoriedade empresas',
                'SPDA NBR 5419: como avaliar a necessidade conforme o caso',
                'aterramento NBR 5410 requisitos',
                'quadro elétrico industrial dimensionamento',
                'termografia infravermelha instalações elétricas',
                'multifilar vs unifilar projeto elétrico',
                'proteção contra surtos DPS residencial',
                'eficiência energética indústria Paraíba'
            ]
        },
        automacao: {
            label: 'Automação',
            serviceUrl: '<%- getHomePrefix() %>/solucoes/automacao',
            topics: [
                'CLP vs relés painéis industriais',
                'Indústria 4.0 Nordeste casos práticos',
                'SCADA supervisório fábricas médio porte',
                'IoT industrial sensores e monitoramento',
                'retrofit painéis elétricos automação',
                'protocolo Modbus industrial explicado',
                'IHM vs supervisório SCADA diferenças',
                'manutenção preditiva automação industrial'
            ]
        },
        engenharia: {
            label: 'Engenharia',
            serviceUrl: '<%- getHomePrefix() %>/solucoes/engenharia',
            topics: [
                'ART projeto elétrico quando exigir',
                'laudo de conformidade CREA fiscalização',
                'subestação aérea projeto requisitos',
                'projeto elétrico predial NBR 5410',
                'BIM engenharia elétrica vantagens',
                'laudo SPDA e documentação exigida pela apólice: o que verificar',
                'projeto elétrico industrial dimensionamento',
                'regularização instalação elétrica antiga'
            ]
        }
    },

    heroImages: [
        '/img/vista-3d-projeto-eletrico-predial-bim.webp',
        '/img/infraestrutura-predial-eletrica-bim.webp',
        '/img/projeto-vdi-infraestrutura-bim.webp',
        '/img/planta-projeto-eletrico-predial-bim.webp',
        '/img/infraestrutura-predial-vdi-bim.webp',
        '/img/detalhe-eletrodutos-circuitos-bim.webp'
    ],

    internalLinks: [
        { anchor: 'Energia Solar', url: '/energia-solar/' },
        { anchor: 'Energia Solar para Empresas', url: '/energia-solar-para-empresas' },
        { anchor: 'Energia Solar para Fazendas', url: '/energia-solar-para-fazendas' },
        { anchor: 'Energia Solar para Hotéis', url: '/energia-solar-para-hoteis' },
        { anchor: 'Energia Solar para Condomínios', url: '/energia-solar-para-condominios' },
        { anchor: 'Energia Solar em Patos', url: '/energia-solar-em-patos' },
        { anchor: 'Energia Solar em Recife', url: '/energia-solar-em-recife' },
        { anchor: 'Energia Solar em Natal', url: '/energia-solar-em-natal' },
        { anchor: 'Soluções Elétricas', url: '<%- getHomePrefix() %>/solucoes/eletrica' },
        { anchor: 'Automação Industrial', url: '<%- getHomePrefix() %>/solucoes/automacao' },
        { anchor: 'Engenharia e Laudos', url: '<%- getHomePrefix() %>/solucoes/engenharia' },
        { anchor: 'Laudos Elétricos', url: '<%- getHomePrefix() %>/solucoes/engenharia/laudos-eletricos' },
        { anchor: 'Projeto de Subestação', url: '<%- getHomePrefix() %>/solucoes/engenharia/projeto-subestacao' },
        { anchor: 'SPDA', url: '<%- getHomePrefix() %>/solucoes/engenharia/spda' }
    ],

    rssFeeds: [
        'https://www.gov.br/aneel/pt-br/assuntos/noticias-da-aneel/RSS',
        'https://www.absolar.org.br/feed/'
    ]
};
