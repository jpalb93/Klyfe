/**
 * Cidades atendidas pelo ecossistema Solar Klyfe.
 */
const cities = {
  'campina-grande-pb': {
    slug: 'campina-grande-pb',
    label: 'Campina Grande',
    name: 'Campina Grande',
    stateAbbr: 'PB',
    preposition: 'em',
    urlPath: '/energia-solar/campina-grande-pb/',
    heroImage: '/img/cidades/campina-grande.webp',
    h1: 'Energia Solar em Campina Grande',
    eyebrow: 'SEDE KLYFE ELECTRIC · CAMPINA GRANDE - PB',
    title: 'Energia Solar em Campina Grande PB | Klyfe Electric',
    description: 'Energia solar em Campina Grande com projeto, instalação, ART e homologação Energisa. Atendimento pela sede local da Klyfe. Solicite um estudo.',
    intro: 'A Klyfe projeta e instala energia solar em Campina Grande para residências, empresas, condomínios e propriedades rurais. A sede da empresa fica na cidade: o atendimento parte da equipe local e inclui análise da fatura, vistoria técnica, projeto com ART, instalação e homologação junto à Energisa Paraíba.',
    irradiacao: 'calculada para o endereço do projeto',
    concessionaria: 'Energisa Paraíba',
    validationStatus: 'confirmed',
    hqProximity: 'Sede Própria em Campina Grande (PB)',
    stats: [
      { value: 'Sede', label: 'Campina Grande - PB' },
      { value: 'CREA-PB', label: 'Engenharia Registrada' },
      { value: 'Energisa PB', label: 'Processo de Conexão' },
      { value: 'Residencial e B2B', label: 'Projetos Sob Medida' }
    ],
    painPoints: [
      {
        title: 'Atendimento presencial e suporte local',
        text: 'A equipe técnica e comercial está sediada em Campina Grande, o que facilita visitas, acompanhamento da instalação e suporte pós-venda.'
      },
      {
        title: 'Tarifas e regras da Energisa Paraíba',
        text: 'O projeto considera o padrão de entrada, as regras da geração distribuída e os documentos exigidos pela Energisa Paraíba.'
      },
      {
        title: 'Telhado, sombreamento e consumo real',
        text: 'A potência não é definida apenas pelo valor da conta: avaliamos consumo, orientação, sombras, área disponível e condição da instalação elétrica.'
      }
    ],
    benefits: [
      'Atendimento presencial rápido com engenheiros da sede de Campina Grande',
      'Visita técnica no imóvel para análise de telhado e padrão elétrico',
      'Projeto elétrico assinado com ART registrada no CREA-PB',
      'Protocolo e acompanhamento do processo junto à Energisa Paraíba',
      'Orientação de uso, monitoramento e suporte pós-instalação local'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Analisamos a fatura, o histórico de consumo e o objetivo do investimento.' },
      { title: 'Vistoria e projeto', text: 'Verificamos telhado, sombras, padrão elétrico e elaboramos o projeto com ART.' },
      { title: 'Instalação', text: 'Executamos a montagem elétrica e mecânica conforme o projeto aprovado.' },
      { title: 'Conexão Energisa', text: 'Protocolamos a solicitação e acompanhamos as etapas sob responsabilidade da distribuidora.' }
    ],
    bodyHtml: `
      <p>Para contratar <strong>energia solar em Campina Grande</strong>, o primeiro passo é dimensionar o sistema a partir do consumo do imóvel — não de uma promessa genérica de economia. A Klyfe cruza a fatura com a área útil, a orientação do telhado, o sombreamento e as condições do padrão de entrada.</p>
      <p>Com sede em Campina Grande, atendemos imóveis residenciais e comerciais em bairros como Catolé, Alto Branco, Bodocongó, Mirante e Prata, além do Distrito Industrial e de municípios do entorno. A proximidade facilita a vistoria e o suporte depois da instalação.</p>
      <p>A proposta informa as premissas de geração, os equipamentos especificados, as garantias de fabricante e o escopo técnico. Também explicamos os valores que podem permanecer na fatura, como custo de disponibilidade, iluminação pública e outras cobranças aplicáveis.</p>
    `,
    decisionGuide: {
      title: 'Quanto custa e como dimensionar energia solar em Campina Grande?',
      intro: 'O preço correto depende do consumo e das condições do imóvel. Para comparar propostas, peça que todas apresentem as mesmas premissas.',
      priceFactors: [
        { title: 'Consumo e modalidade tarifária', text: 'As últimas faturas mostram sazonalidade, média de kWh, tipo de ligação e cobranças que não desaparecem com a geração.' },
        { title: 'Local de instalação', text: 'Tipo de telhado, inclinação, sombras, distância até o quadro e necessidade de adequações alteram materiais e mão de obra.' },
        { title: 'Equipamentos e proteção', text: 'Marca e modelo de módulos e inversores, estrutura, cabos, proteções e monitoramento devem estar identificados na proposta.' }
      ],
      sizingInputs: [
        'Faturas recentes e expectativa de aumento de consumo',
        'Área disponível, orientação do telhado e pontos de sombra',
        'Tipo de ligação e condição do padrão de entrada',
        'Perfil de consumo diurno, noturno e entre unidades consumidoras'
      ],
      proposalDeliverables: [
        'Estimativa mensal de geração e premissas utilizadas',
        'Potência do sistema e lista dos equipamentos propostos',
        'Projeto elétrico, ART e escopo da homologação Energisa',
        'Garantias de fabricante, instalação e suporte pós-venda'
      ]
    },
    serviceAreas: ['Campina Grande', 'Lagoa Seca', 'Queimadas', 'Esperança', 'Boqueirão e municípios do Agreste sob análise logística'],
    officialSources: [
      { label: 'ANEEL — Micro e Minigeração Distribuída', href: 'https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida' },
      { label: 'Energisa — Geração Distribuída', href: 'https://cse.energisa.com.br/para-sua-casa/servicos/outros-servicos/geracao-distribuida' },
      { label: 'Lei nº 14.300/2022', href: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm' }
    ],
    lastReviewed: '27 de agosto de 2026',
    faq: [
      {
        question: 'Onde fica a sede da Klyfe Electric em Campina Grande?',
        answer: 'A sede da Klyfe fica no bairro Mirante, em Campina Grande (PB). É de lá que partem a engenharia e o atendimento dos projetos locais; o endereço completo está na página de contato.'
      },
      {
        question: 'Quanto tempo leva a homologação na Energisa Paraíba?',
        answer: 'O prazo varia conforme a potência, a documentação, eventuais adequações e a análise da distribuidora. A Klyfe prepara o projeto e acompanha o protocolo, mas não promete um prazo que dependa da Energisa.'
      },
      {
        question: 'Posso agendar uma visita técnica gratuita no meu imóvel em Campina Grande?',
        answer: 'Sim. Primeiro analisamos a fatura e os dados básicos do imóvel; quando a vistoria é necessária, a equipe local agenda a avaliação técnica em Campina Grande e região.'
      },
      {
        question: 'Energia solar zera toda a conta de luz?',
        answer: 'Não necessariamente. O sistema pode reduzir fortemente a energia compensável, mas podem permanecer custo de disponibilidade, iluminação pública, demanda contratada ou outras cobranças aplicáveis à unidade.'
      },
      {
        question: 'Como saber quantas placas solares eu preciso?',
        answer: 'O número depende do consumo em kWh, da potência dos módulos, da radiação no endereço, das sombras, da orientação e da área disponível. A Klyfe calcula esses fatores no estudo técnico.'
      },
      {
        question: 'Por quanto tempo os créditos de energia são válidos?',
        answer: 'Pelas regras da geração distribuída, os créditos podem ser utilizados por até 60 meses, respeitando as condições da mesma área de concessão e as regras aplicáveis à unidade consumidora.'
      }
    ],
    ctaTitle: 'Fale com a engenharia da Klyfe na sede em Campina Grande.',
    ctaSubtitle: 'Solicite seu orçamento gratuito de energia solar com atendimento local.',
    relatedSegments: ['residencial', 'comercial', 'industrial', 'supermercados'],
    relatedCities: ['joao-pessoa-pb', 'caruaru-pe', 'recife-pe', 'natal-rn']
  },

  'joao-pessoa-pb': {
    slug: 'joao-pessoa-pb',
    label: 'João Pessoa',
    name: 'João Pessoa',
    stateAbbr: 'PB',
    preposition: 'em',
    urlPath: '/energia-solar/joao-pessoa-pb/',
    heroImage: '/img/cidades/joao-pessoa.webp',
    h1: 'Energia Solar em João Pessoa',
    eyebrow: 'ATENDIMENTO REGIONAL · JOÃO PESSOA - PB',
    title: 'Energia Solar em João Pessoa PB | Klyfe Electric',
    description: 'Energia solar em João Pessoa com projeto, instalação, ART e homologação Energisa. Atendimento técnico na Grande João Pessoa. Solicite um estudo.',
    intro: 'A Klyfe atende projetos de energia solar em João Pessoa, Cabedelo, Bayeux e Santa Rita a partir da sua sede em Campina Grande. O serviço inclui análise de consumo, vistoria técnica, projeto com ART, instalação e acompanhamento da homologação na Energisa Paraíba, com especificação adequada ao ambiente litorâneo.',
    irradiacao: 'calculada para o endereço do projeto',
    concessionaria: 'Energisa Paraíba',
    validationStatus: 'logistics',
    hqProximity: 'Atendimento na Grande João Pessoa a partir da sede da Klyfe em Campina Grande; a empresa não declara filial física na capital.',
    stats: [
      { value: 'Grande João Pessoa', label: 'Área de Atendimento' },
      { value: 'Energisa PB', label: 'Processo de Conexão' },
      { value: 'Ambiente Litorâneo', label: 'Especificação Técnica' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Maresia e corrosão litorânea',
        text: 'A proximidade do mar exige selecionar estruturas, fixadores e componentes compatíveis com o nível de exposição do endereço e com as instruções dos fabricantes.'
      },
      {
        title: 'Consumo elevado de ar-condicionado em apartamentos e casas',
        text: 'O uso intenso de climatização aumenta o consumo. O dimensionamento considera esse perfil para estimar quanto da energia poderá ser compensado.'
      },
      {
        title: 'Atendimento sem endereço fictício',
        text: 'A Klyfe atende a Grande João Pessoa, mas sua sede física fica em Campina Grande. A página descreve uma área de serviço, não uma filial na capital.'
      }
    ],
    benefits: [
      'Projetos dimensionados para o clima e radiação de João Pessoa',
      'Especificação de estruturas e conectores conforme a exposição do endereço',
      'Protocolo e acompanhamento do processo junto à Energisa Paraíba',
      'Atendimento a residências, condomínios verticais e empresas',
      'Monitoramento remoto da usina pelo celular'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Analisamos a fatura, o histórico de consumo e o objetivo do investimento.' },
      { title: 'Vistoria e projeto', text: 'Avaliamos telhado, sombras, exposição litorânea, padrão elétrico e emitimos a ART.' },
      { title: 'Instalação', text: 'Planejamos o deslocamento e executamos a montagem conforme o projeto.' },
      { title: 'Conexão Energisa', text: 'Protocolamos a solicitação e acompanhamos as etapas sob responsabilidade da distribuidora.' }
    ],
    bodyHtml: `
      <p>Um projeto de <strong>energia solar em João Pessoa</strong> precisa conciliar consumo, espaço disponível, sombreamento e exposição ao ambiente litorâneo. Por isso, a proposta é feita depois da análise da fatura e das condições reais do imóvel.</p>
      <p>Atendemos residências, condomínios e empresas em bairros como Bessa, Manaíra, Tambaú, Cabo Branco, Altiplano e Bancários, além de Cabedelo, Bayeux e Santa Rita. O cronograma de visita e instalação é combinado conforme o escopo e a logística do projeto.</p>
      <p>A Klyfe não mantém uma sede física anunciada em João Pessoa: o atendimento parte de Campina Grande. Essa transparência evita confundir área de serviço com endereço comercial e não altera a responsabilidade técnica ou o acompanhamento do projeto.</p>
    `,
    decisionGuide: {
      title: 'Quanto custa e como escolher energia solar em João Pessoa?',
      intro: 'O orçamento depende do consumo e das condições do imóvel. Compare propostas pela geração estimada, pelo escopo e pelas garantias — não apenas pelo número de placas.',
      priceFactors: [
        { title: 'Consumo e tarifa', text: 'Faturas recentes revelam a média em kWh, a sazonalidade, o tipo de ligação e as cobranças que podem continuar após a instalação.' },
        { title: 'Cobertura e ambiente', text: 'Área útil, sombras, tipo de telha, distância elétrica e exposição litorânea influenciam estrutura, materiais e execução.' },
        { title: 'Equipamentos e garantias', text: 'Módulos, inversores, proteções, fixadores e monitoramento precisam aparecer por marca, modelo e condição de garantia.' }
      ],
      sizingInputs: [
        'Faturas recentes e expectativa de aumento de consumo',
        'Área útil, orientação do telhado e pontos de sombra',
        'Distância do mar e condições de exposição do imóvel',
        'Tipo de ligação, padrão de entrada e perfil de consumo'
      ],
      proposalDeliverables: [
        'Estimativa mensal de geração com as premissas do cálculo',
        'Potência do sistema e especificação dos equipamentos',
        'Projeto elétrico, ART e escopo da homologação Energisa',
        'Cronograma, garantias e condições de suporte pós-venda'
      ]
    },
    serviceAreas: ['João Pessoa', 'Cabedelo', 'Bayeux', 'Santa Rita', 'Conde e outros municípios da Grande João Pessoa sob análise logística'],
    officialSources: [
      { label: 'ANEEL — Micro e Minigeração Distribuída', href: 'https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida' },
      { label: 'Energisa — Geração Distribuída', href: 'https://cse.energisa.com.br/para-sua-casa/servicos/outros-servicos/geracao-distribuida' },
      { label: 'Lei nº 14.300/2022', href: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm' }
    ],
    lastReviewed: '27 de agosto de 2026',
    faq: [
      {
        question: 'Como a Klyfe atende a cidade de João Pessoa?',
        answer: 'A sede da Klyfe fica em Campina Grande. O atendimento em João Pessoa é planejado por projeto, com análise remota inicial e agendamento de vistoria, instalação e suporte na Grande João Pessoa.'
      },
      {
        question: 'A maresia de João Pessoa pode danificar os painéis solares?',
        answer: 'A exposição litorânea pode acelerar a corrosão de componentes inadequados. A especificação deve considerar a distância do mar, materiais compatíveis e as condições de garantia dos fabricantes.'
      },
      {
        question: 'Posso instalar energia solar em casas de praia em Cabedelo ou Lucena?',
        answer: 'Sim, desde que a vistoria confirme área, estrutura, padrão elétrico e materiais adequados ao ambiente. O consumo de uma casa de uso sazonal também precisa ser considerado no dimensionamento.'
      },
      {
        question: 'Energia solar zera toda a conta de luz?',
        answer: 'Não necessariamente. O sistema pode reduzir fortemente a energia compensável, mas podem permanecer custo de disponibilidade, iluminação pública, demanda contratada ou outras cobranças aplicáveis.'
      },
      {
        question: 'Quanto tempo leva a homologação na Energisa Paraíba?',
        answer: 'O prazo varia conforme a potência, a documentação, eventuais adequações e a análise da distribuidora. A Klyfe acompanha o processo, mas não controla os prazos da Energisa.'
      },
      {
        question: 'Por quanto tempo os créditos de energia são válidos?',
        answer: 'Pelas regras da geração distribuída, os créditos podem ser utilizados por até 60 meses, respeitando as condições da mesma área de concessão e as regras da unidade consumidora.'
      }
    ],
    ctaTitle: 'Peça seu estudo de energia solar para João Pessoa.',
    ctaSubtitle: 'Engenharia especializada com suporte ágil na capital paraibana.',
    relatedSegments: ['residencial', 'comercial', 'hoteis-e-pousadas', 'condominios'],
    relatedCities: ['campina-grande-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  'recife-pe': {
    slug: 'recife-pe',
    label: 'Recife',
    name: 'Recife',
    stateAbbr: 'PE',
    preposition: 'em',
    urlPath: '/energia-solar/recife-pe/',
    h1: 'Energia Solar em Recife',
    eyebrow: 'ATENDIMENTO REGIONAL · RECIFE - PE',
    title: 'Energia Solar em Recife PE | Klyfe Electric',
    description: 'Energia solar em Recife PE. Soluções fotovoltaicas para empresas, edifícios e residências com suporte de engenharia Klyfe e homologação Neoenergia.',
    intro: 'Na capital pernambucana, a energia solar atende a uma demanda crescente por eficiência em empresas, edifícios comerciais, hospitais e residências. A Klyfe Electric presta atendimento técnico especializado no eixo Recife-Olinda-Jaboatão, homologando projetos na Neoenergia Pernambuco.',
    irradiacao: '5,6 kWh/m²/dia (Litoral PE)',
    concessionaria: 'Neoenergia Pernambuco (CELPE)',
    validationStatus: 'logistics',
    hqProximity: 'Deslocamento logístico pela malha rodoviária a partir da sede em Campina Grande (~200 km)',
    stats: [
      { value: '~200 km', label: 'Acesso Rodoviário da Sede' },
      { value: 'Neoenergia', label: 'Homologação em Pernambuco' },
      { value: 'B2B / Predial', label: 'Especialidade Técnica' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Tarifas elevadas na região metropolitana',
        text: 'A tarifa e o perfil de consumo influenciam a viabilidade do investimento. O retorno precisa ser calculado para cada imóvel e proposta.'
      },
      {
        title: 'Projetos em condomínios e edifícios comerciais',
        text: 'Aproveitamos lajes de prédios em Boa Viagem, Graças, Espinheiro e Ilha do Leite para suprir condomínios e centros médicos.'
      },
      {
        title: 'Trâmite técnico junto à Neoenergia Pernambuco',
        text: 'Preparamos e acompanhamos o escopo técnico e documental contratado para análise e vistoria pela distribuidora pernambucana.'
      }
    ],
    benefits: [
      'Estudo de viabilidade personalizado para imóveis residenciais e comerciais em Recife',
      'Projeto assinado por engenheiro Eletricista habilitado com emissão de ART',
      'Adequação técnica de padrão de entrada conforme normas da Neoenergia PE',
      'Estruturas resistentes à salinidade do litoral pernambucano',
      'Telemetria e monitoramento em tempo real via aplicativo mobile'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise da conta de luz e levantamento remoto/presencial das condições da cobertura.' },
      { title: 'Engenharia', text: 'Dimensionamento solar e protocolo do projeto na Neoenergia Pernambuco.' },
      { title: 'Instalação', text: 'Execução da montagem mecânica e elétrica com rigor de segurança.' },
      { title: 'Conexão', text: 'Acompanhamento da vistoria da distribuidora e ligação do medidor bidirecional.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em Recife</strong> consolida-se como um diferencial competitivo indispensável para o setor de serviços, polos médicos, restaurantes, colégios e residências da Região Metropolitana.</p>
      <p>A Klyfe Electric organiza o atendimento a Recife, Olinda e Jaboatão dos Guararapes a partir da sede em Campina Grande, com escopo, logística e cronograma definidos para cada projeto.</p>
      <p>Elaboramos projetos de micro e minigeração distribuída com estimativas de geração, análise financeira e documentação técnica aplicável ao processo de conexão.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe atende projetos de energia solar em Recife (PE)?',
        answer: 'Nossa equipe de engenharia emite os projetos e coordena o deslocamento de equipes técnicas de instalação a partir da nossa sede regional para a Região Metropolitana do Recife, cobrindo visitas, instalações e vistorias na Neoenergia.'
      },
      {
        question: 'Qual a distribuidora responsável pela homologação em Recife?',
        answer: 'Em Recife e em todo o estado de Pernambuco, a homologação do sistema fotovoltaico é realizada junto à Neoenergia Pernambuco (antiga CELPE).'
      },
      {
        question: 'Vocês atendem clínicas e escritórios no polo médico da Ilha do Leite?',
        answer: 'Sim! Desenvolvemos projetos comerciais específicos para clínicas, laboratórios e escritórios na região central e zona sul de Recife.'
      }
    ],
    ctaTitle: 'Solicite seu estudo de energia solar para Recife.',
    ctaSubtitle: 'Análise técnica de viabilidade sem compromisso em Pernambuco.',
    relatedSegments: ['comercial', 'hospitais-e-clinicas', 'supermercados', 'condominios'],
    relatedCities: ['campina-grande-pb', 'caruaru-pe', 'joao-pessoa-pb', 'natal-rn']
  },

  'natal-rn': {
    slug: 'natal-rn',
    label: 'Natal',
    name: 'Natal',
    stateAbbr: 'RN',
    preposition: 'em',
    urlPath: '/energia-solar/natal-rn/',
    heroImage: '/img/cidades/natal.webp',
    h1: 'Energia Solar em Natal',
    eyebrow: 'ATENDIMENTO REGIONAL · NATAL - RN',
    title: 'Energia Solar em Natal RN | Klyfe Electric',
    description: 'Energia solar em Natal RN. Soluções fotovoltaicas para residências, hotéis e empresas no Rio Grande do Norte com homologação Cosern.',
    intro: 'Conhecida como a Cidade do Sol, Natal possui um dos mais elevados índices de insolação da América do Sul. A Klyfe Electric oferece engenharia de energia solar para residências, hotéis, pousadas e comércios da Grande Natal, com homologação junto à Neoenergia Cosern.',
    irradiacao: '5,8 kWh/m²/dia (Litoral RN)',
    concessionaria: 'Neoenergia Cosern (RN)',
    validationStatus: 'logistics',
    hqProximity: 'Suporte logístico rodoviário a partir da sede em Campina Grande (~260 km via BR-104 / BR-226 / BR-304)',
    stats: [
      { value: '5,8 kWh', label: 'Irradiação Diária Alta' },
      { value: 'Cosern', label: 'Homologação no RN' },
      { value: 'Hoteleiro / Residencial', label: 'Foco de Atuação' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Aproveitamento do recorde de irradiação solar',
        text: 'A disponibilidade solar favorece a geração, mas o payback depende de consumo, tarifa, área útil, equipamentos e investimento.'
      },
      {
        title: 'Resistência à maresia e ventos litorâneos',
        text: 'Instalamos painéis e suportes de alumínio estrutural preparados para suportar o vento contínuo e a salinidade da costa do RN.'
      },
      {
        title: 'Burocracia com a distribuidora Cosern',
        text: 'Preparamos e acompanhamos o escopo técnico e documental contratado no processo da Neoenergia Cosern; a análise e os prazos pertencem à distribuidora.'
      }
    ],
    benefits: [
      'Projetos dimensionados a partir do consumo e das condições do endereço',
      'Estruturas de fixação com tratamento de alta resistência contra a maresia',
      'Acompanhamento do processo de homologação na Neoenergia Cosern',
      'Atendimento a hotéis, pousadas, restaurantes, comércios e residências',
      'Acompanhamento de geração em tempo real pelo celular'
    ],
    processSteps: [
      { title: 'Simulação', text: 'Cálculo de geração estimado com base na irradiação solar de Natal.' },
      { title: 'Engenharia & ART', text: 'Elaboração do projeto elétrico com anotação no CREA.' },
      { title: 'Instalação', text: 'Equipes qualificadas realizam a montagem física com segurança.' },
      { title: 'Conexão Cosern', text: 'Inspeção técnica e substituição do medidor para início dos créditos.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em Natal</strong> pode reduzir custos de residências, hotéis e empresas. A geração e o retorno são estimados a partir do endereço, consumo, tarifa, área disponível e investimento.</p>
      <p>A Klyfe Electric atende a Grande Natal (incluindo Parnamirim e São Gonçalo do Amarante), oferecendo soluções sob medida para casas em condomínios fechados, estabelecimentos do setor hoteleiro e empresas de comércio e serviços.</p>
      <p>Contamos com uma estrutura de engenharia preparada para atuar em todo o Rio Grande do Norte, entregando projetos robustos, homologados e com suporte pós-venda.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe realiza o atendimento de projetos em Natal (RN)?',
        answer: 'Nossa equipe de engenharia coordena o atendimento em Natal a partir da nossa estrutura central, alocando equipes de instalação para execução de obras e acompanhamento de vistorias junto à Cosern no Rio Grande do Norte.'
      },
      {
        question: 'Qual a concessionária responsável pela energia solar em Natal?',
        answer: 'No estado do Rio Grande do Norte, os projetos de energia solar são homologados junto à Neoenergia Cosern.'
      },
      {
        question: 'Hotéis da Via Costeira e Ponta Negra podem instalar solar?',
        answer: 'Sim! Hotéis e pousadas de Natal são excelentes candidatos à energia solar para abater custos de ar-condicionado e piscinas.'
      }
    ],
    ctaTitle: 'Aproveite o sol de Natal para reduzir sua conta de luz.',
    ctaSubtitle: 'Solicite uma simulação gratuita de energia solar com a Klyfe.',
    relatedSegments: ['hoteis-e-pousadas', 'residencial', 'comercial', 'supermercados'],
    relatedCities: ['campina-grande-pb', 'mossoro-rn', 'joao-pessoa-pb', 'recife-pe']
  },

  'caruaru-pe': {
    slug: 'caruaru-pe',
    label: 'Caruaru',
    name: 'Caruaru',
    stateAbbr: 'PE',
    preposition: 'em',
    urlPath: '/energia-solar/caruaru-pe/',
    h1: 'Energia Solar em Caruaru',
    eyebrow: 'ATENDIMENTO REGIONAL · CARUARU - PE',
    title: 'Energia Solar em Caruaru PE | Klyfe Electric',
    description: 'Energia solar em Caruaru PE. Soluções fotovoltaicas para o polo têxtil, comércio e residências do Agreste pernambucano com engenharia Klyfe.',
    intro: 'Capital do Agreste pernambucano, Caruaru destaca-se pelo seu dinâmico polo comercial, têxtil e industrial. A Klyfe Electric oferece engenharia de energia solar para confecções, postos de combustível, supermercados e residências em Caruaru e região, reduzindo custos de produção e faturas de energia.',
    irradiacao: '5,6 kWh/m²/dia (Agreste PE)',
    concessionaria: 'Neoenergia Pernambuco (CELPE)',
    validationStatus: 'logistics',
    hqProximity: 'Proximidade geográfica direta a partir da sede em Campina Grande (~140 km via BR-104)',
    stats: [
      { value: '~140 km', label: 'Acesso Direto via BR-104' },
      { value: 'Polo Têxtil', label: 'Foco Comercial / Industrial' },
      { value: 'Neoenergia', label: 'Homologação em PE' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Custo de energia nas lavanderias e confecções têxteis',
        text: 'O setor têxtil do Agreste consome muita eletricidade. A energia solar reduz o custo produtivo por peça confeccionada.'
      },
      {
        title: 'Sol forte durante todo o ano no Agreste',
        text: 'A irradiação de Caruaru proporciona altos níveis de geração de energia fotovoltaica diária.'
      },
      {
        title: 'Logística rápida pela conexão BR-104',
        text: 'Nossas equipes atendem Caruaru, Toritama e Santa Cruz do Capibaribe com facilidade logística a partir de Campina Grande.'
      }
    ],
    benefits: [
      'Projetos solares dimensionados para o perfil do comércio e indústria têxtil do Agreste',
      'Projetos elétricos completos com ART registrada no CREA',
      'Homologação regulatória na Neoenergia Pernambuco',
      'Soluções em telhado metálico, laje e usina de solo',
      'Monitoramento remoto da produção solar no smartphone'
    ],
    processSteps: [
      { title: 'Visita & Análise', text: 'Coleta de dados da fatura e vistoria técnica do local em Caruaru.' },
      { title: 'Projeto', text: 'Engenheiros elaboram o dimensionamento solar ideal para a carga.' },
      { title: 'Instalação', text: 'Montagem limpa por técnicos habilitados com equipamentos de proteção.' },
      { title: 'Conexão', text: 'Vistoria e instalação do medidor bidirecional pela concessionária.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em Caruaru</strong> é uma forte aliada da competitividade industrial e comercial do Agreste pernambucano. Em uma cidade marcada pelo empreendedorismo, cortar despesas fixas com eletricidade libera caixa para reinvestimento nas empresas.</p>
      <p>A Klyfe Electric possui forte ligação logística com Caruaru (apenas 140 km pela BR-104 a partir de nossa sede em Campina Grande). Atendemos galpões de confecção, feirantes, postos de combustível, hospitais e residências na Capital do Forró.</p>
      <p>Nossos projetos apresentam estimativas de geração, escopo de engenharia, processo de homologação e condições de suporte.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe atende clientes em Caruaru (PE)?',
        answer: 'Pela extrema proximidade geográfica entre Campina Grande e Caruaru via BR-104 (cerca de 1h40 de deslocamento), atendemos Caruaru e todo o polo de confecções com visitas técnicas rápidas e equipes próprias de instalação.'
      },
      {
        question: 'Confecções e lavanderias de Toritama e Santa Cruz também são atendidas?',
        answer: 'Sim! Atendemos todas as cidades do Polo Têxtil do Agreste Pernambucano (Caruaru, Toritama, Santa Cruz do Capibaribe e região).'
      },
      {
        question: 'Qual a vantagem da energia solar para o comércio de Caruaru?',
        answer: 'A redução da parcela compensável da fatura pode diminuir despesas operacionais. O impacto depende do consumo, da tarifa, do dimensionamento e das condições comerciais do investimento.'
      }
    ],
    ctaTitle: 'Leve energia solar para sua empresa em Caruaru.',
    ctaSubtitle: 'Fale com nossa equipe técnica e receba um orçamento gratuito.',
    relatedSegments: ['comercial', 'industrial', 'supermercados', 'fazendas-e-irrigacao'],
    relatedCities: ['campina-grande-pb', 'recife-pe', 'joao-pessoa-pb', 'mossoro-rn']
  },

  'mossoro-rn': {
    slug: 'mossoro-rn',
    label: 'Mossoró',
    name: 'Mossoró',
    stateAbbr: 'RN',
    preposition: 'em',
    urlPath: '/energia-solar/mossoro-rn/',
    heroImage: '/img/cidades/mossoro.webp',
    h1: 'Energia Solar em Mossoró',
    eyebrow: 'ATENDIMENTO REGIONAL · MOSSORÓ - RN',
    title: 'Energia Solar em Mossoró RN | Klyfe Electric',
    description: 'Energia solar em Mossoró RN. Soluções fotovoltaicas para o agronegócio, fruticultura, salinas e comércio no Oeste potiguar com suporte Klyfe.',
    intro: 'Segunda maior cidade do Rio Grande do Norte, Mossoró destaca-se pela força do agronegócio, fruticultura irrigada, indústria salineira e comércio local. A energia solar em Mossoró pode aproveitar a disponibilidade solar do semiárido para reduzir a parcela compensável da fatura.',
    irradiacao: '5,9 kWh/m²/dia (Semiárido RN)',
    concessionaria: 'Neoenergia Cosern (RN)',
    validationStatus: 'logistics',
    hqProximity: 'Atendimento regional com logística estruturada a partir da sede em Campina Grande',
    stats: [
      { value: '5,9 kWh', label: 'Excelente Irradiação' },
      { value: 'Cosern', label: 'Homologação no RN' },
      { value: 'Agro / B2B', label: 'Foco de Engenharia' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Custo de energia no bombeamento da fruticultura irrigada',
        text: 'A irrigação de fazendas de melão e fruticultura consome muita energia. A solar reduz o custo produtivo por hectare.'
      },
      {
        title: 'Sol intenso e temperaturas elevadas',
        text: 'A especificação considera o coeficiente de temperatura dos módulos e inversores e as condições de ventilação do local.'
      },
      {
        title: 'Demanda de estabelecimentos comerciais e residenciais',
        text: 'Climatizar imóveis em Mossoró exige uso constante de ar-condicionado. A energia solar gera o pico de energia nos momentos mais quentes.'
      }
    ],
    benefits: [
      'Projetos customizados para o agronegócio, fruticultura, fazendas e indústrias',
      'Dimensionamento térmico e elétrico resistente ao calor do semiárido',
      'Homologação regulatória completa junto à Neoenergia Cosern',
      'Projetos assinados por engenheiro Eletricista com emissão de ART',
      'Monitoramento online do gerador solar na palma da mão'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise da demanda de energia e estudo da estrutura do imóvel/terreno em Mossoró.' },
      { title: 'Engenharia', text: 'Projeto elétrico fotovoltaico com proteção contra surtos e memorial descritivo.' },
      { title: 'Instalação', text: 'Execução da montagem técnica por instaladores capacitados.' },
      { title: 'Conexão', text: 'Homologação junto à Cosern e substituição do medidor elétrico.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em Mossoró</strong> pode aproveitar a disponibilidade solar do Oeste do Rio Grande do Norte. A geração real depende do endereço, da orientação, das sombras, da temperatura e dos equipamentos especificados.</p>
      <p>A Klyfe Electric estende seu atendimento a Mossoró e municípios vizinhos do Oeste potiguar, fornecendo engenharia de ponta para produtores rurais, fazendas irrigadas, comércios, postos de combustível e residências.</p>
      <p>Oferecemos suporte técnico do projeto inicial ao acompanhamento da homologação na Neoenergia Cosern, com premissas de geração e análise de retorno documentadas na proposta.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe atende projetos de energia solar em Mossoró (RN)?',
        answer: 'Organizamos o atendimento a Mossoró com planejamento logístico dedicado para visitas técnicas, entrega de materiais e equipes de execução de obra sob coordenação de nossa engenharia.'
      },
      {
        question: 'A energia solar funciona bem para bombeamento de água em fazendas de Mossoró?',
        answer: 'Pode ser uma aplicação viável. O dimensionamento deve considerar potência e partida dos motores, vazão, altura manométrica, horas de operação e disponibilidade solar.'
      },
      {
        question: 'O calor extremo de Mossoró reduz a eficiência dos painéis solares?',
        answer: 'Temperaturas elevadas podem reduzir o desempenho instantâneo dos módulos. A estimativa de geração deve considerar clima, ventilação, orientação e o coeficiente de temperatura dos equipamentos especificados.'
      }
    ],
    ctaTitle: 'Transforme o sol de Mossoró em economia para seu negócio.',
    ctaSubtitle: 'Solicite um estudo de viabilidade solar gratuito com a Klyfe.',
    relatedSegments: ['fazendas-e-irrigacao', 'comercial', 'industrial', 'postos-de-combustivel'],
    relatedCities: ['natal-rn', 'campina-grande-pb', 'caruaru-pe', 'joao-pessoa-pb']
  }
};

// Legacy alias definitions to resolve links gracefully without breaking

module.exports = cities;
