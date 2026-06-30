module.exports = {
  name: 'Paraíba',
  preposition: 'na',
  region: 'todo o estado paraibano',
  state: 'Paraíba',
  concessionaria: 'Energisa Paraíba e Borborema',
  address: 'Atendimento em todo o Estado da Paraíba',
  phone: '(83) 99133-0972',
  whatsappMessage: 'Olá! Vi o site da Klyfe e gostaria de um orçamento para minha região.',
  cta: 'Solicite consultoria com nossa equipe técnica estadual.',
  allServices: true,
  solarContent: {
    distribuidora: "Energisa Paraíba e Energisa Borborema",
    distribuidoraSlug: "energisa",
    irradiacao: "5,5 a 6,0 kWh/m²/dia",
    contextoRegional: "O estado da Paraíba possui um dos maiores potenciais de geração de energia fotovoltaica do Brasil. Com médias de irradiação solar que variam de 5,5 kWh/m²/dia no litoral a até 6,0 kWh/m²/dia no sertão, a instalação de placa solar na Paraíba é um investimento de alta rentabilidade. Um sistema de 5 kWp produz entre 580 e 640 kWh/mês no estado, garantindo retorno financeiro acelerado para residências, empresas e propriedades rurais.",
    homologacao: "O processo de homologação técnica de microgeração distribuída é realizado junto às concessionárias locais (Energisa Paraíba ou Energisa Borborema), seguindo as diretrizes e prazos oficiais da ANEEL. A Klyfe Electric gerencia todas as etapas: desde a elaboração do projeto elétrico assinado por engenheiros especialistas até a vistoria de conexão e instalação do medidor bidirecional pela distribuidora.",
    mercadoAlvo: "Atendemos a residências em áreas urbanas e litorâneas, indústrias de médio e grande porte, redes de comércio e supermercados, além de de sistemas de irrigação e bombeamento solar no semiárido paraibano."
  },

  services: {
    'laudos-eletricos': {
      label: 'Laudos Técnicos & ART',
      category: 'engenharia',
      template: 'servicos/laudos-eletricos',
      bairros: 'Atendimento em todo o estado da Paraíba',
      serviceContext: `
        <p>Emitimos laudos técnicos elétricos em toda a Paraíba. Garantimos a conformidade com as normas NR-10 e NBR 5410. Nossas auditorias trazem segurança total para sua empresa ou indústria.</p>
        <p>Usamos termografia e tecnologia de ponta. Atendemos indústrias, comércios, hotéis e condomínios com rapidez e precisão.</p>
      `,
      painPoint: 'Conformidade normativa e segurança operacional em nível estadual.',
      cta: 'Solicitar laudo técnico na Paraíba.',
      faqExtra: {
        question: 'Os laudos da Klyfe são aceitos por seguradoras na Paraíba?',
        answer: 'Sim, todos os nossos laudos são emitidos com ART (Anotação de Responsabilidade Técnica) e seguem rigorosamente as normas brasileiras, sendo plenamente aceitos por seguradoras e órgãos fiscalizadores.'
      }
    },
    'engenharia': {
      label: 'Engenharia Elétrica',
      category: 'engenharia',
      template: 'engenharia',
      bairros: 'Campina Grande, João Pessoa e principais cidades do interior',
      serviceContext: `
        <p>Somos referência em projetos e consultoria de engenharia elétrica na Paraíba. Atendemos indústrias no interior e edifícios na capital. Nossa equipe é altamente qualificada.</p>
        <p>Aprovamos projetos com agilidade na concessionária Energisa. Seguimos todas as normas técnicas vigentes e garantimos segurança e economia para sua obra.</p>
      `,
      painPoint: 'Expertise técnica e normativa em nível estadual para grandes empreendimentos.',
      cta: 'Consultar engenharia técnica na Paraíba.',
      faqExtra: {
        question: 'A Klyfe atende cidades além de Campina Grande e João Pessoa?',
        answer: 'Sim, possuímos logística para atender indústrias, condomínios e grandes comércios em todos os municípios da Paraíba, mantendo o mesmo padrão de excelência em engenharia.'
      }
    },
    'projeto-eletrico': {
      label: 'Projetos eletrotécnicos com ART',
      category: 'engenharia',
      template: 'projeto-eletrico',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Desenvolvimento de projetos elétricos residenciais, comerciais e industriais com foco em eficiência e segurança.</p>',
      painPoint: 'Necessidade de projetos técnicos aprovados e seguros.',
      cta: 'Solicitar projeto elétrico.'
    },
    'projeto-eletrico-multifamiliar': {
      label: 'Projeto Elétrico Multifamiliar',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/detalhamento-prumada-eletrica-edificio.webp',
      subtitle: 'PROJETOS PREDIAIS EM BIM',
      introText: 'Desenvolvimento de projetos elétricos prediais completos para condomínios e edifícios multifamiliares. Modelagem inteligente em BIM para eliminação de erros de obra.',
      painPoint: 'Dimensionamento de demanda coletiva e distribuição vertical segura.',
      whatsIncluded: [
        'Cálculo de demanda e fator de simultaneidade',
        'Modelagem 3D em BIM (compatibilização)',
        'Projeto de prumada elétrica vertical',
        'Dimensionamento de quadros de áreas comuns',
        'Esquemas unifilares e detalhes de montagem',
        'Emissão de ART perante o CREA-PB'
      ],
      benefits: [
        { title: 'Tecnologia BIM 3D', description: 'Garante que os eletrodutos e dutos de energia não colidam com vigas ou instalações hidráulicas no canteiro de obras.', icon: 'fas fa-cube' },
        { title: 'Dimensionamento Otimizado', description: 'Evita desperdício de condutores e superdimensionamento de disjuntores, reduzindo custos de compra de materiais.', icon: 'fas fa-dollar-sign' },
        { title: 'Conformidade Concessionária', description: 'Projetos 100% aprovados nas normas vigentes e de acordo com as exigências da Energisa.', icon: 'fas fa-check-double' }
      ],
      process: [
        { title: 'Estudo Arquitetônico', description: 'Análise da planta e definição do posicionamento do centro de medição.' },
        { title: 'Desenho & Cálculo', description: 'Dimensionamento dos circuitos, cargas e caminhos físicos em ambiente BIM.' },
        { title: 'Documentação', description: 'Memorial de cálculo, memorial descritivo e geração de pranchas.' },
        { title: 'Aprovação e ART', description: 'Registro técnico da ART e protocolo dos arquivos de projeto.' }
      ],
      faq: [
        { question: 'O que é a prumada elétrica vertical?', answer: 'É a tubulação e fiação principal que sobe pelos andares do edifício a partir do centro de medição para alimentar o quadro de cada apartamento.' },
        { question: 'Por que o projeto em BIM é melhor para edifícios?', answer: 'Ele permite detectar interferências físicas tridimensionais (clash detection) com projetos de estruturas, hidrossanitário e climatização, evitando atrasos e quebras de alvenaria na obra.' },
        { question: 'A Klyfe aprova o projeto multifamiliar na Energisa?', answer: 'Sim. Nós cuidamos de todo o processo de aprovação técnica do projeto predial junto à concessionária de energia.' }
      ]
    },
    'projeto-eletrico-unifamiliar': {
      label: 'Projeto Elétrico Unifamiliar',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/planta-projeto-eletrico-predial-bim.webp',
      subtitle: 'PROJETOS RESIDENCIAIS PERSONALIZADOS',
      introText: 'Projetos elétricos de alta qualidade para residências de médio e alto padrão. Segurança, distribuição inteligente de circuitos e dimensionamento preciso em conformidade com a NBR 5410.',
      painPoint: 'Falta de tomadas, circuitos sobrecarregados e riscos de curtos-circuitos domésticos.',
      whatsIncluded: [
        'Distribuição ergonômica de pontos de tomada',
        'Divisão equilibrada de circuitos elétricos',
        'Projeto de aterramento e proteção contra surtos (DPS)',
        'Modelagem 3D em BIM para compatibilização',
        'Especificação e lista de materiais quantitativa',
        'ART (Anotação de Responsabilidade Técnica)'
      ],
      benefits: [
        { title: 'Segurança Familiar', description: 'Instalação projetada para neutralizar riscos de incêndios por sobrecarga e choques acidentais em tomadas.', icon: 'fas fa-user-shield' },
        { title: 'Praticidade Operacional', description: 'Posicionamento planejado de tomadas e interruptores de acordo com o design de interiores e rotina da casa.', icon: 'fas fa-lightbulb' },
        { title: 'Economia com Sobras', description: 'Uma lista quantitativa exata de materiais evita compras em excesso ou faltas recorrentes durante a construção.', icon: 'fas fa-clipboard-list' }
      ],
      process: [
        { title: 'Entrevista Layout', description: 'Alinhamento com o cliente e arquiteto sobre o posicionamento de móveis e aparelhos.' },
        { title: 'Dimensionamento', description: 'Divisão de tomadas comuns, circuitos de chuveiros, ar condicionado e áreas molhadas.' },
        { title: 'Compatibilização', description: 'Geração do modelo 3D em BIM para garantir fluidez construtiva.' },
        { title: 'Entrega Técnica', description: 'Disponibilização das pranchas impressas e digitais junto com a guia de ART.' }
      ],
      faq: [
        { question: 'O projeto elétrico residencial previne queima de aparelhos?', answer: 'Sim. O dimensionamento correto de disjuntores e a inclusão de DPS (Dispositivos de Proteção contra Surtos) protegem os equipamentos eletrônicos contra oscilações e descargas da rede elétrica.' },
        { question: 'A Klyfe atende projetos residenciais integrados à automação?', answer: 'Com certeza. Desenhamos a infraestrutura elétrica já preparada para sistemas de automação de iluminação, áudio e climatização.' },
        { question: 'Qual a norma que rege o projeto elétrico unifamiliar?', answer: 'A principal diretriz é a ABNT NBR 5410, que estabelece as regras para instalações elétricas de baixa tensão em todo o Brasil.' }
      ]
    },
    'projeto-eletrico-comercial': {
      label: 'Projeto Elétrico Comercial',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/vista-3d-projeto-eletrico-predial-bim.webp',
      subtitle: 'PROJETOS DE ENGENHARIA CORPORATIVA',
      introText: 'Engenharia elétrica sob medida para lojas, escritórios, restaurantes e clínicas. Projetos que aliam eficiência energética, flexibilidade de layout e conformidade com as exigências dos bombeiros.',
      painPoint: 'Incompatibilidade de carga para novos equipamentos comerciais e vistorias travadas.',
      whatsIncluded: [
        'Dimensionamento de carga instalada e demanda',
        'Distribuição de circuitos de força e iluminação',
        'Infraestrutura para cabeamento estruturado (VDI)',
        'Sistemas de alimentação ininterrupta (Nobreak/Geradores)',
        'Detalhes de quadros de distribuição comerciais',
        'ART e documentação para órgãos fiscalizadores'
      ],
      benefits: [
        { title: 'Flexibilidade Espacial', description: 'Projeto preparado para adaptações e mudanças de layout físico sem necessidade de reformas destrutivas.', icon: 'fas fa-arrows-alt' },
        { title: 'Segurança Normativa', description: 'Garantia de conformidade técnica para obtenção e renovação de habite-se e laudos de bombeiros.', icon: 'fas fa-shield-alt' },
        { title: 'Continuidade de Operação', description: 'Previsão de sistemas auxiliares (nobreaks, geradores) para evitar paradas em comércios críticos.', icon: 'fas fa-sync' }
      ],
      process: [
        { title: 'Análise de Cargas', description: 'Inventário completo de equipamentos comerciais e sua potência de consumo.' },
        { title: 'Traçado de Rotas', description: 'Modelagem dos caminhos de calhas, perfilados e eletrodutos suspensos.' },
        { title: 'Projeto Iluminação', description: 'Integração técnica com o design luminoso para eficiência do consumo.' },
        { title: 'Aprovação e Entrega', description: 'Emissão de toda a documentação legal e ART técnica.' }
      ],
      faq: [
        { question: 'Quando o comércio precisa aprovar o projeto na Energisa?', answer: 'A aprovação prévia na concessionária é exigida sempre que a demanda calculada for superior aos limites de ligação direta de baixa tensão da concessionária.' },
        { question: 'Vocês fazem a infraestrutura de redes e TI comercial?', answer: 'Sim. Projetamos calhas dedicadas e caminhos físicos para dados, voz e imagem (VDI) integrados ao elétrico.' },
        { question: 'Como garantir que o comércio não tenha apagões por falha na rede externa?', answer: 'Incluímos no projeto estudos de viabilidade de geradores automáticos e sistemas de nobreaks estruturados para as cargas críticas do negócio.' }
      ]
    },
    'projeto-eletrico-industrial': {
      label: 'Projeto Elétrico Industrial',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/infraestrutura-predial-eletrica-bim.webp',
      subtitle: 'PROJETOS PARA INFRAESTRUTURA INDUSTRIAL',
      introText: 'Projetos elétricos industriais robustos focados em alta disponibilidade de potência e máxima segurança. Dimensionamento de painéis, CCMs, caminhos elétricos pesados e conformidade rígida com a NR-10.',
      painPoint: 'Paradas de produção inesperadas, multas de reativo e riscos graves de acidentes elétricos.',
      whatsIncluded: [
        'Estudo de fluxo de carga e curto-circuito',
        'Dimensionamento de quadros gerais (QGDF e CCM)',
        'Caminhos elétricos pesados (leitos, calhas, eletrodutos galvanizados)',
        'Malha de aterramento e equipotencialização',
        'Projetos de diagramas lógicos e comando',
        'Laudos de conformidade com a NR-10 e ART'
      ],
      benefits: [
        { title: 'Alta Disponibilidade', description: 'Dimensionamento conservador de cabos e proteções para assegurar que a fábrica opere sem desligamentos térmicos.', icon: 'fas fa-industry' },
        { title: 'Segurança Sob a NR-10', description: 'Projetos desenhados para proteger operadores contra contatos acidentais e efeitos de arcos elétricos.', icon: 'fas fa-hard-hat' },
        { title: 'Eficiência Energética', description: 'Estudos focados em reduzir perdas por efeito Joule e otimizar circuitos de motores industriais.', icon: 'fas fa-chart-line' }
      ],
      process: [
        { title: 'Coleta de Layout', description: 'Levantamento da posição física das máquinas na planta industrial.' },
        { title: 'Modelagem de Força', description: 'Dimensionamento das linhas de alimentação pesadas e barramentos.' },
        { title: 'Seletividade', description: 'Estudo de coordenação de disjuntores para isolar falhas de forma localizada.' },
        { title: 'ART e Homologação', description: 'Entrega final com documentação técnica completa e responsabilidade registrada.' }
      ],
      faq: [
        { question: 'O que é o estudo de seletividade em projeto industrial?', answer: 'É a coordenação das proteções elétricas para garantir que, caso ocorra um curto-circuito em uma máquina, apenas o disjuntor daquela máquina desarme, e não o disjuntor geral da fábrica, evitando paradas gerais de produção.' },
        { question: 'Vocês projetam painéis elétricos industriais customizados?', answer: 'Sim. Desenhamos a engenharia interna de painéis elétricos de comando, painéis de capacitores e painéis de controle de motores (CCM).' },
        { question: 'Quais normas regulam os projetos elétricos industriais?', answer: 'Seguimos a NBR 5410 (baixa tensão), NBR 14039 (média tensão), NR-10 (segurança do trabalho) e as normas internacionais como a IEC quando necessário.' }
      ]
    },
    'projeto-eletrico-multiplas-unidades': {
      label: 'Projeto Elétrico Padrão Múltiplas Unidades',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/projeto-padrao-multiplas-unidades-energisa.webp',
      subtitle: 'HOMOLOGAÇÃO DE ENTRADAS DE ENERGIA COLETIVAS',
      introText: 'Elaboração e aprovação de projetos de centro de medição agrupada para edifícios comerciais, residenciais e vilas de casas. Projetos 100% adequados às especificações técnicas vigentes da Energisa.',
      painPoint: 'Reprovações de ligação de energia na concessionária e atraso no habite-se.',
      whatsIncluded: [
        'Dimensionamento de caixas de medição agrupadas',
        'Estudo técnico de queda de tensão de ramais',
        'Cálculo de demanda coletiva declarada',
        'Projeto de aterramento do centro de medição',
        'Diagrama unifilar e trifilar da entrada de serviço',
        'Protocolo de aprovação e emissão de ART'
      ],
      benefits: [
        { title: 'Aprovação Rápida', description: 'Equipe altamente experiente nos trâmites normativos e exigências técnicas da Energisa.', icon: 'fas fa-shipping-fast' },
        { title: 'Conformidade Construtiva', description: 'Detalhamento exato de alvenaria e fixação mecânica das caixas para evitar reprovações em vistorias.', icon: 'fas fa-tools' },
        { title: 'Segurança Operacional', description: 'Quadros dimensionados com proteção contra curto-circuitos e disjuntor geral de proteção da entrada.', icon: 'fas fa-shield-alt' }
      ],
      process: [
        { title: 'Estudo do Ramal', description: 'Verificação do ponto de entrega disponível na rede pública de distribuição.' },
        { title: 'Projeto Detalhado', description: 'Desenho das caixas de medição, fiação interna, barramentos e proteções.' },
        { title: 'Protocolo Energisa', description: 'Envio da documentação e acompanhamento técnico da análise de projeto.' },
        { title: 'Emissão de ART', description: 'Garantia técnica do engenheiro responsável pelo dimensionamento.' }
      ],
      faq: [
        { question: 'Quando é exigido projeto para múltiplas unidades?', answer: 'A Energisa exige projeto técnico assinado por engenheiro sempre que houver agrupamento de medição (acima de 3 unidades) ou quando a demanda calculada exceder o limite de atendimento direto.' },
        { question: 'A Klyfe vende os quadros de medição prontos?', answer: 'Nós elaboramos o projeto de engenharia detalhado. Indicamos montadores e fabricantes homologados parceiros para que você compre com segurança.' },
        { question: 'Quanto tempo demora a aprovação do projeto na concessionária?', answer: 'O prazo de análise da Energisa costuma variar entre 15 e 30 dias a partir do protocolo da documentação completa.' }
      ]
    },
    'aprovacao-energisa': {
      label: 'Aprovação de Projeto na Energisa',
      category: 'engenharia',
      template: 'aprovacao-energisa',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Homologação e aprovação de projetos elétricos residenciais, comerciais, industriais e de subestações junto à Energisa Paraíba e Borborema.</p>',
      painPoint: 'Exigência de homologação e aprovação de projetos pela concessionária de energia local.',
      cta: 'Aprovar projeto elétrico na Energisa.'
    },
    'projeto-luminotecnico': {
      label: 'Projeto Luminotécnico',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/detalhe-eletrodutos-circuitos-bim.webp',
      subtitle: 'ENGENHARIA DE ILUMINAÇÃO DE ALTO PADRÃO',
      introText: 'Cálculo e projeto de iluminação técnica e corporativa. Projetos luminotécnicos focados em eficiência de consumo, conforto visual e conformidade absoluta com a NBR ISO/CIE 8995-1.',
      painPoint: 'Ambientes escuros, ofuscamento visual e alto consumo de energia com iluminação obsoleta.',
      whatsIncluded: [
        'Modelagem e simulação computacional de iluminância (Dialux)',
        'Cálculo de nível de iluminamento médio (Lux)',
        'Estudo de uniformidade e índice de ofuscamento (UGR)',
        'Especificação de tecnologias de luminárias (LED)',
        'Desenho de layout de pontos luminosos no teto',
        'ART de responsabilidade técnica pelo projeto'
      ],
      benefits: [
        { title: 'Conforto e Produtividade', description: 'Iluminação dimensionada para evitar fadiga ocular de funcionários em escritórios e indústrias.', icon: 'fas fa-eye' },
        { title: 'Redução na Conta', description: 'Especificação técnica inteligente e aproveitamento de luz natural diminuem o consumo de energia elétrica.', icon: 'fas fa-leaf' },
        { title: 'Normas Cumpridas', description: 'Garantia de atendimento aos níveis mínimos de lux exigidos pelo Ministério do Trabalho para cada atividade.', icon: 'fas fa-file-invoice-dollar' }
      ],
      process: [
        { title: 'Simulação 3D', description: 'Modelagem do espaço físico e inserção de dados fotométricos de luminárias.' },
        { title: 'Cálculos de Lux', description: 'Cálculo e verificação do nível médio de iluminamento por ambiente de trabalho.' },
        { title: 'Especificação', description: 'Geração de memorial com especificações exatas de potência, fluxo luminoso e temperatura de cor.' },
        { title: 'Projeto Elétrico', description: 'Conexão dos pontos luminosos aos circuitos e comandos elétricos.' }
      ],
      faq: [
        { question: 'O que é a NBR ISO/CIE 8995-1?', answer: 'É a norma regulamentadora brasileira que estabelece a iluminância mínima exigida em ambientes internos de trabalho, visando a segurança e o desempenho das atividades.' },
        { question: 'O que é o estudo de luxometria no projeto luminotécnico?', answer: 'É a simulação ou medição da quantidade de fluxo luminoso por metro quadrado (Lux) que incide sobre o plano de trabalho, verificando se há uniformidade.' },
        { question: 'Vocês realizam projetos para áreas externas ou industriais?', answer: 'Sim. Projetamos iluminação de grandes pátios, indústrias, iluminação pública e áreas externas decorativas.' }
      ]
    },
    'spda': {
      label: 'Projeto e Laudo de SPDA',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/infraestrutura-predial-vdi-bim.webp',
      subtitle: 'PROTEÇÃO CONTRA DESCARGAS ATMOSFÉRICAS',
      introText: 'Engenharia de proteção contra raios. Elaboração de projetos, inspeções e laudos técnicos de SPDA e sistemas de aterramento em conformidade rigorosa com a NBR 5419 e a NR-10.',
      painPoint: 'Raios danificando equipamentos, riscos estruturais e seguros que exigem laudo para cobrir sinistros.',
      whatsIncluded: [
        'Análise de gerenciamento de risco (NBR 5419-2)',
        'Projeto de sistemas de captação, descida e aterramento',
        'Estudo de necessidade de DPS (Dispositivos de Proteção contra Surtos)',
        'Medição de continuidade das armaduras e resistência',
        'Laudo pericial com fotos e recomendações corretivas',
        'Emissão de ART de inspeção/projeto pelo engenheiro'
      ],
      benefits: [
        { title: 'Segurança Estrutural', description: 'Protege a edificação contra rachaduras, danos estruturais e incêndios causados por incidência direta de raios.', icon: 'fas fa-house-damage' },
        { title: 'Redução de Queimas', description: 'A coordenação de DPS nos quadros elétricos evita que surtos de tensão entrem pelas redes de fiação.', icon: 'fas fa-bolt' },
        { title: 'Validade Perante Seguros', description: 'Garante o documento técnico oficial exigido por seguradoras e bombeiros para cobrir eventuais perdas.', icon: 'fas fa-file-contract' }
      ],
      process: [
        { title: 'Análise de Risco', description: 'Cálculo estatístico da necessidade de proteção com base no índice de raios local.' },
        { title: 'Inspeção Visual/Testes', description: 'Vistoria presencial com equipamentos calibrados para testar continuidade.' },
        { title: 'Dimensionamento', description: 'Projeto de caminhos de descida, captação e eletrodos de aterramento.' },
        { title: 'Laudo com ART', description: 'Geração do relatório técnico descritivo acompanhado da ART.' }
      ],
      faq: [
        { question: 'Qual a validade do laudo de SPDA?', answer: 'Em geral, a validade recomendada por norma é anual para vistorias visuais, e de 3 a 5 anos para inspeções completas, dependendo do tipo de edificação e do nível de proteção.' },
        { question: 'A Klyfe realiza a instalação física do para-raios?', answer: 'Nós realizamos o projeto e o laudo de engenharia. Prestamos o suporte técnico de fiscalização da montagem.' },
        { question: 'O que mudou na NBR 5419 nos últimos anos?', answer: 'A norma passou a exigir um estudo de gerenciamento de risco muito mais detalhado e dividiu a especificação de proteção em 4 partes distintas.' }
      ]
    },
    'subestacao-aerea': {
      label: 'Subestações e cabines primárias',
      category: 'engenharia',
      template: 'subestacao-aerea',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Projetos e montagem de subestações aéreas até 500kVA e cabines primárias.</p>',
      painPoint: 'Demanda de alta carga e necessidade de subestação própria.',
      cta: 'Solicitar projeto de subestação.'
    },
    'projeto-subestacao': {
      label: 'Projeto de Subestação',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/hero-klyfe.webp',
      subtitle: 'MÉDIA TENSÃO E CABINES PRIMÁRIAS',
      introText: 'Desenvolvimento de projetos técnicos de subestações aéreas até 500kVA e subestações abrigadas. Engenharia de alta performance para receber energia da rede de média tensão da concessionária.',
      painPoint: 'Necessidade de aumento de carga indisponível em baixa tensão e tarifas industriais.',
      whatsIncluded: [
        'Dimensionamento do transformador de potência',
        'Projeto de proteção de média tensão (chaves fusíveis, disjuntor)',
        'Malha de aterramento da subestação e equipotencialização',
        'Estudo de coordenação e seletividade de proteção',
        'Memorial descritivo e de cálculo para homologação',
        'Acompanhamento e ART técnica do CREA-PB'
      ],
      benefits: [
        { title: 'Custo de Energia Menor', description: 'A contratação de energia em média tensão (Grupo A) gera tarifas mais econômicas por kWh para empresas.', icon: 'fas fa-chart-pie' },
        { title: 'Autonomia Energética', description: 'Garante potência dedicada e estável para sua indústria ou condomínio de grande porte.', icon: 'fas fa-plug' },
        { title: 'Conformidade Concessionária', description: 'Cuidamos de 100% da burocracia e aprovação técnica de média tensão junto à Energisa.', icon: 'fas fa-file-invoice' }
      ],
      process: [
        { title: 'Dimensionamento Carga', description: 'Cálculo exato da demanda e escolha do transformador ideal (ex: 75kVA, 112.5kVA, 150kVA).' },
        { title: 'Desenho Detalhado', description: 'Projeto mecânico civil da estrutura física da subestação e layout dos equipamentos.' },
        { title: 'Protocolo Analítico', description: 'Protocolo do projeto e documentação no portal corporativo da concessionária.' },
        { title: 'ART e Homologação', description: 'Garantia técnica e aprovação formal de energização da cabine.' }
      ],
      faq: [
        { question: 'Quando é obrigatória a instalação de uma subestação própria?', answer: 'A subestação é exigida sempre que a carga instalada ou demanda contratada do imóvel exceder o limite padrão de fornecimento em baixa tensão da concessionária (geralmente acima de 75 kW).' },
        { question: 'Qual a diferença entre subestação aérea e abrigada?', answer: 'A aérea é montada diretamente em postes externos, com custo menor e limite de potência até 500kVA. A abrigada é construída em uma cabine interna de alvenaria para maiores potências ou requisitos de espaço.' },
        { question: 'A Klyfe acompanha a vistoria de ligação da subestação?', answer: 'Sim. Nós acompanhamos as vistorias técnicas finais da Energisa até a ligação definitiva e ativação da subestação.' }
      ]
    },
    'manutencao-subestacao': {
      label: 'Manutenção de subestações',
      category: 'engenharia',
      template: 'servicos/manutencao-subestacao',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Manutenção preventiva e corretiva de subestações, com termografia e análise de óleo.</p>',
      painPoint: 'Risco de parada operacional por falha em subestação.',
      cta: 'Agendar manutenção de subestação.'
    },
    'correcao-fator-potencia': {
      label: 'Correção de fator de potência',
      category: 'engenharia',
      template: 'correcao-fator-potencia',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Análise e instalação de bancos de capacitores para eliminação de multas por energia reativa.</p>',
      painPoint: 'Multas elevadas na conta de energia por baixo fator de potência.',
      cta: 'Eliminar multas de reativo.'
    },
    'pericia-ressarcimento-danos': {
      label: 'Perícia Elétrica para Ressarcimento de Danos',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/hero-klyfe.webp',
      subtitle: 'ENGENHARIA LEGAL E DIAGNÓSTICA',
      introText: 'Vistoria técnica especializada e emissão de laudo pericial para solicitação de ressarcimento de danos em equipamentos causados por oscilações ou distúrbios na rede elétrica da concessionária.',
      painPoint: 'Queima de equipamentos de alto custo e concessionária que recusa o ressarcimento.',
      whatsIncluded: [
        'Vistoria técnica presencial com registro fotográfico',
        'Análise de nexo causal técnico do evento elétrico',
        'Aferição das instalações elétricas internas do imóvel',
        'Redação do laudo técnico pericial assinado por engenheiro',
        'Recomendações técnicas de blindagem de equipamentos',
        'ART (Anotação de Responsabilidade Técnica)'
      ],
      benefits: [
        { title: 'Comprovação Jurídica', description: 'Laudo pericial robusto e inquestionável para embasar ações judiciais ou processos administrativos.', icon: 'fas fa-balance-scale' },
        { title: 'Nexo Causal Preciso', description: 'Investigação aprofundada para comprovar tecnicamente que a queima foi gerada por anomalia da concessionária.', icon: 'fas fa-search' },
        { title: 'ART Inclusa', description: 'Documento registrado perante o CREA-PB que confere validade legal oficial à perícia técnica.', icon: 'fas fa-award' }
      ],
      process: [
        { title: 'Vistoria de Campo', description: 'Visita do engenheiro eletricista ao local para inspecionar os equipamentos danificados.' },
        { title: 'Análise de Histórico', description: 'Estudo dos relatórios de distúrbios e quedas de energia na região na data do dano.' },
        { title: 'Elaboração do Laudo', description: 'Redação das justificativas técnicas, memorial fotográfico e conclusões.' },
        { title: 'Entrega com ART', description: 'Emissão do documento técnico legal para protocolo formal.' }
      ],
      faq: [
        { question: 'Qual o prazo para pedir o ressarcimento de aparelhos queimados?', answer: 'Segundo a resolução da ANEEL, o consumidor tem até 90 dias a partir da data da queima para registrar a reclamação oficial na concessionária.' },
        { question: 'A Energisa é obrigada a ressarcir aparelhos danificados?', answer: 'Sim, caso fique comprovada a ocorrência de distúrbio na rede elétrica de responsabilidade da distribuidora que tenha causado o dano no equipamento.' },
        { question: 'Como o laudo de perícia ajuda no processo?', answer: 'Ele serve como prova técnica definitiva. Em casos onde a concessionária recusa inicialmente o ressarcimento sob alegações frágeis, o laudo pericial contesta essas recusas juridicamente.' }
      ]
    },
    'pericia-furto-energia': {
      label: 'Perícia Elétrica para Contestação de Furto de Energia (TOI)',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/hero-klyfe.webp',
      subtitle: 'ASSESSORIA TÉCNICA EM ANOMALIAS DE MEDIÇÃO',
      introText: 'Perícia técnica e laudo pericial para contestar Termos de Ocorrência e Inspeção (TOI) emitidos com irregularidades pela concessionária de energia. Defesa técnica qualificada por engenheiro habilitado.',
      painPoint: 'Cobranças indevidas de valores astronômicos decorrentes de suposto desvio ou furto de energia.',
      whatsIncluded: [
        'Análise minuciosa das alegações técnicas da concessionária',
        'Vistoria técnica presencial com medição no padrão',
        'Estudo do histórico de faturamento de consumo real',
        'Emissão de laudo técnico de contestação pericial',
        'Parecer técnico descritivo para defesa administrativa/jurídica',
        'ART (Anotação de Responsabilidade Técnica)'
      ],
      benefits: [
        { title: 'Defesa Especializada', description: 'Contraposição técnica direta de erros de medição ou procedimentos fora das normas da ANEEL.', icon: 'fas fa-shield-alt' },
        { title: 'Economia com Multas', description: 'Possibilidade de anulação ou redução significativa de cobranças unilaterais de diferenças de consumo.', icon: 'fas fa-piggy-bank' },
        { title: 'Validade no CREA', description: 'Documentação assinada com ART por engenheiro qualificado como assistente técnico.', icon: 'fas fa-graduation-cap' }
      ],
      process: [
        { title: 'Análise do TOI', description: 'Estudo do documento lavrado pela Energisa e suas fotos de acusação.' },
        { title: 'Vistoria no Padrão', description: 'Inspeção física do medidor, conexões e verificação de integridade técnica.' },
        { title: 'Cálculo de Consumo', description: 'Auditoria de consumo real com base na carga do imóvel e média histórica.' },
        { title: 'Emissão de Laudo', description: 'Entrega do parecer técnico e ART para instrução do recurso.' }
      ],
      faq: [
        { question: 'O que é o TOI (Termo de Ocorrência de Inspeção)?', answer: 'É o termo lavrado pela concessionária após realizar uma inspeção no medidor de energia, no qual acusa a existência de alguma irregularidade na medição.' },
        { question: 'A Energisa pode cobrar a diferença de consumo de uma vez só?', answer: 'Embora a distribuidora calcule a diferença retroativa de consumo que supostamente deixou de faturar, o procedimento de cálculo e notificação deve seguir regras estritas da ANEEL, que frequentemente contêm falhas formais.' },
        { question: 'Como a perícia pode anular a multa do TOI?', answer: 'A perícia atesta se o medidor estava realmente adulterado ou se houve erro técnico de leitura, defeito do equipamento de medição ou descumprimento dos procedimentos de inspeção previstos em regulamento.' }
      ]
    },
    'viabilidade-carregador-veicular': {
      label: 'Laudos e Estudo de Viabilidade para Carregadores Elétricos',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/detalhamento-eletrico-vdi-predial.webp',
      subtitle: 'ESTUDO DE INFRAESTRUTURA PARA MOBILIDADE ELÉTRICA',
      introText: 'Estudo de Viabilidade Técnica (EVT) e laudo de demanda para instalação segura de carregadores de veículos elétricos (Wallbox) em condomínios e indústrias, garantindo capacidade de energia disponível.',
      painPoint: 'Condomínios que proíbem carregadores por medo de sobrecarga e falta de infraestrutura comum.',
      whatsIncluded: [
        'Análise da capacidade instalada da subestação/quadro geral',
        'Estudo de demanda de pico e carga residual do imóvel',
        'Proposta de roteamento físico do cabeamento coletivo',
        'Estudo de sistemas de gestão de recarga (controle de demanda)',
        'Laudo técnico de conformidade com a NBR 5410 e ART',
        'Anotação de Responsabilidade Técnica (ART)'
      ],
      benefits: [
        { title: 'Evita Sobrecargas', description: 'Garante que o carregamento de múltiplos veículos elétricos simultaneamente não desarme o disjuntor geral do prédio.', icon: 'fas fa-exclamation-triangle' },
        { title: 'Segurança Condominial', description: 'Estudo formal assinado por engenheiro que serve como aval técnico para aprovação em assembleias de condomínio.', icon: 'fas fa-users' },
        { title: 'Gestão Inteligente', description: 'Proposição de tecnologias de compartilhamento e controle de carga dinâmica para economizar investimentos.', icon: 'fas fa-brain' }
      ],
      process: [
        { title: 'Medição de Carga', description: 'Medição da curva de consumo elétrico do edifício em horários de pico.' },
        { title: 'Cálculo de Capacidade', description: 'Determinação de quantos carregadores e de qual potência a rede suporta atualmente.' },
        { title: 'Projeto Sugerido', description: 'Desenho preliminar dos caminhos físicos das calhas e painéis de recarga.' },
        { title: 'Emissão de Laudo', description: 'Entrega do laudo técnico conclusivo com ART registrada no CREA.' }
      ],
      faq: [
        { question: 'Por que o condomínio precisa de um laudo de viabilidade?', answer: 'A recarga de veículos elétricos tem alta demanda por longos períodos. O laudo atesta se o condomínio possui capacidade excedente de carga ou se precisará fazer adequação técnica/aumento de carga na subestação.' },
        { question: 'O que é a gestão inteligente de recarga (load shedding)?', answer: 'É um sistema de software e hardware que divide e controla a potência enviada a cada veículo conforme o consumo total do prédio no momento, evitando ultrapassar a demanda contratada.' },
        { question: 'A Klyfe faz o projeto elétrico completo e a execução?', answer: 'Sim. Elaboramos desde o estudo de viabilidade, o projeto elétrico detalhado da infraestrutura geral até o suporte para homologação e instalação.' }
      ]
    },
    'eletrica': {
      label: 'Serviços Elétricos',
      category: 'eletrica',
      template: 'eletrica',
      bairros: 'Principais polos comerciais e industriais da Paraíba',
      serviceContext: `
        <p>Oferecemos serviços elétricos completos para empresas e residências na Paraíba. Fazemos novas instalações e reformas elétricas gerais. Trabalhamos com foco em segurança.</p>
        <p>Todas as nossas obras contam com supervisão de engenheiros e emissão de ART. Garantimos que sua rede elétrica siga rigorosamente a norma NBR 5410.</p>
      `,
      painPoint: 'Serviços elétricos de alto padrão com supervisão de engenharia em todo o estado.',
      cta: 'Solicite orçamento técnico na Paraíba.',
      faqExtra: {
        question: 'Os serviços elétricos da Klyfe possuem garantia técnica?',
        answer: 'Sim, todos os nossos serviços são acompanhados de garantia técnica e documentação necessária para conformidade com normas regulamentadoras.'
      }
    },
    'instalacoes-industriais': {
      label: 'Instalações Elétricas Industriais',
      category: 'eletrica',
      template: 'instalacoes-industriais',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Montagens e manutenções elétricas industriais pesadas com foco em continuidade operacional.</p>',
      painPoint: 'Infraestrutura industrial robusta e segura.',
      cta: 'Solicitar instalação industrial.'
    },
    'tomadas-interruptores': {
      label: 'Tomadas e Interruptores',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-plug',
      summary: 'Instalação, troca e realocação conforme NBR 14136.',
      bairros: 'Atendimento estadual',
      painPoint: 'Instalação, troca e realocação segura de tomadas e interruptores.',
      cta: 'Solicitar serviço elétrico.'
    },
    'iluminacao': {
      label: 'Iluminação',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-lightbulb',
      summary: 'Luminárias, iluminação externa, decorativa e LED.',
      bairros: 'Atendimento estadual',
      painPoint: 'Projetos e instalação de sistemas de iluminação LED e decorativa.',
      cta: 'Solicitar projeto de iluminação.'
    },
    'chuveiro-eletrico': {
      label: 'Chuveiro Elétrico',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-shower',
      summary: 'Instalação com circuito independente e DR.',
      bairros: 'Atendimento estadual',
      painPoint: 'Instalação segura de chuveiros elétricos com proteção contra choques.',
      cta: 'Solicitar instalação de chuveiro.'
    },
    'ventiladores': {
      label: 'Ventiladores',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-fan',
      summary: 'Teto e parede com balanceamento profissional.',
      bairros: 'Atendimento estadual',
      painPoint: 'Montagem and balanceamento de ventiladores de teto e parede.',
      cta: 'Solicitar instalação de ventilador.'
    },
    'quadro-distribuicao': {
      label: 'Quadro de Distribuição',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-border-all',
      summary: 'Troca, upgrade e balanceamento de fases.',
      bairros: 'Atendimento estadual',
      painPoint: 'Manutenção e atualização técnica de quadros de distribuição elétricos.',
      cta: 'Solicitar manutenção de quadro.'
    },
    'fiacao-cabeamento': {
      label: 'Fiação e Cabeamento',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-route',
      summary: 'Instalação e reparo de fiação antichama NBR 5410.',
      bairros: 'Atendimento estadual',
      painPoint: 'Revisão e substituição de fiações elétricas antigas ou inadequadas.',
      cta: 'Solicitar troca de fiação.'
    },
    'ar-condicionado': {
      label: 'Ar Condicionado',
      category: 'eletrica',
      template: 'eletrica',
      icon: 'fa-snowflake',
      summary: 'Infraestrutura elétrica para climatização residencial.',
      bairros: 'Atendimento estadual',
      painPoint: 'Preparação de rede e infraestrutura elétrica para aparelhos de ar-condicionado.',
      cta: 'Solicitar infraestrutura de clima.'
    },
    'carregador-veicular': {
      label: 'Carregador Veicular',
      category: 'eletrica',
      template: 'carregador-veicular',
      icon: 'fa-charging-station',
      summary: 'Wallboxes EVSE para carros elétricos e híbridos.',
      bairros: 'Atendimento em todo o estado',
      serviceContext: '<p>Instalação de estações de recarga residencial, comercial e em condomínios com segurança total.</p>',
      painPoint: 'Carga rápida e segura de veículos elétricos.',
      cta: 'Solicitar instalação de Wallbox.'
    },
    'projeto-rede': {
      label: 'Redes, Telefonia & Antenas',
      category: 'eletrica',
      template: 'projeto-rede',
      icon: 'fa-network-wired',
      summary: 'Cabeamento estruturado, Wi-Fi sem zonas mortas e antena coletiva para condomínios.',
      bairros: 'Atendimento em todo o estado',
      serviceContext: '<p>Projetos de conectividade e infraestrutura de dados de alta performance para residências e empresas.</p>',
      painPoint: 'Sinal Wi-Fi estável e rede estruturada de alta velocidade.',
      cta: 'Solicitar projeto de rede.'
    },
    'automacao': {
      label: 'Automação Smart',
      category: 'automacao',
      template: 'automacao',
      bairros: 'Cidades inteligentes e polos industriais paraibanos',
      serviceContext: `
        <p>Criamos sistemas de automação sob medida para residências e indústrias na Paraíba. Integramos luz, som e clima em uma interface simples. Economize energia e ganhe conforto.</p>
        <p>Nossos projetos de casa inteligente usam tecnologia moderna e segura. Atendemos indústrias, comércios e residências de alto padrão em todo o estado.</p>
      `,
      painPoint: 'Inovação tecnológica e eficiência energética para o mercado paraibano.',
      cta: 'Ver soluções de automação na Paraíba.',
      faqExtra: {
        question: 'Quais as vantagens de automatizar uma empresa na Paraíba?',
        answer: 'A principal vantagem é a redução drástica de custos operacionais com climatização e iluminação, além de aumentar o controle e a segurança dos processos através de sistemas integrados.'
      }
    },
    'automacao-residencial': {
      label: 'Automação Residencial (Smart Home)',
      category: 'automacao',
      template: 'automacao-residencial',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Controle de iluminação, som, climatização e segurança na palma da sua mão.</p>',
      painPoint: 'Desejo por conforto, luxo e controle inteligente do lar.',
      cta: 'Ver soluções smart home.'
    },
    'solar': {
      label: 'Energia Solar',
      category: 'solar',
      template: 'solar',
      bairros: 'Litoral, Agreste, Sertão e Curimataú Paraibano',
      serviceContext: `
        <p>A Klyfe Electric é referência na <strong>instalação de placa solar na Paraíba</strong>. Projetamos e executamos a montagem de sistemas de energia solar fotovoltaica sob medida, aproveitando a alta incidência solar do nosso estado para proporcionar o máximo de eficiência energética.</p>
        <p>Cuidamos de todas as etapas: desde o estudo de viabilidade, o projeto de engenharia, até a <strong>instalação de painel solar na Paraíba</strong> e a homologação completa na Energisa. Garanta até 95% de economia mensal na conta de energia da sua empresa ou residência.</p>
      `,
      painPoint: 'Necessidade de redução de custos com energia elétrica em todo o estado.',
      cta: 'Simular economia solar na Paraíba.',
      faqExtra: {
        question: 'A Klyfe ajuda no processo de financiamento solar na Paraíba?',
        answer: 'Sim, auxiliamos nossos clientes a encontrar e aprovar as melhores linhas de crédito sustentáveis disponíveis nos bancos regionais e nacionais atuantes no estado.'
      }
    }
  }
};
