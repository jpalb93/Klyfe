module.exports = {
  name: 'Paraíba',
  preposition: 'na',
  region: 'todo o estado paraibano',
  state: 'Paraíba',
  concessionaria: 'Energisa Paraíba e Borborema',
  address: 'Av. Pref. Severino Bezerra Cabral, 1225 - Mirante, Campina Grande - PB, 58410-640',
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
      heroImage: '/img/engenharia/laudos-eletricos.webp',
      bairros: 'Atendimento em todo o estado da Paraíba',
      serviceContext: `
        <p>Emitimos laudos técnicos elétricos em toda a Paraíba, conforme o objetivo da inspeção e as condições encontradas. A aplicação de NR-10, NBR 5410 e outras referências é definida pelo responsável técnico.</p>
        <p>A termografia pode ser indicada para investigar aquecimentos. Atendemos indústrias, comércios, hotéis e condomínios conforme a disponibilidade, os instrumentos e o escopo contratado.</p>
      `,
      painPoint: 'Conformidade normativa e segurança operacional em nível estadual.',
      cta: 'Solicitar laudo técnico na Paraíba.',
      faqExtra: {
        question: 'Os laudos da Klyfe são aceitos por seguradoras na Paraíba?',
        answer: 'A aceitação depende dos requisitos da seguradora ou do órgão solicitante. Quando previsto, o laudo é emitido com ART e registra os critérios, achados e limites da inspeção.'
      }
    },
    'engenharia': {
      label: 'Engenharia Elétrica',
      category: 'engenharia',
      template: 'engenharia',
      bairros: 'Campina Grande, João Pessoa e principais cidades do interior',
      serviceContext: `
        <p>Somos referência em projetos e consultoria de engenharia elétrica na Paraíba. Atendemos indústrias no interior e edifícios na capital. Nossa equipe é altamente qualificada.</p>
        <p>Podemos preparar e acompanhar a documentação para análise da Energisa quando essa etapa estiver no escopo. As normas aplicáveis, o prazo e a decisão final dependem do projeto e da concessionária.</p>
      `,
      painPoint: 'Expertise técnica e normativa em nível estadual para grandes empreendimentos.',
      cta: 'Consultar engenharia técnica na Paraíba.',
      faqExtra: {
        question: 'A Klyfe atende cidades além de Campina Grande e João Pessoa?',
        answer: 'Podemos avaliar atendimento em outras cidades da Paraíba conforme a localidade, o escopo, a agenda e a logística necessária. A disponibilidade é confirmada antes da proposta.'
      }
    },
    'projeto-eletrico': {
      label: 'Projetos eletrotécnicos com ART',
      category: 'engenharia',
      template: 'projeto-eletrico',
      heroImage: '/img/engenharia/projeto-eletrico.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Desenvolvimento de projetos elétricos residenciais, comerciais e industriais com foco em eficiência e segurança.</p>',
      painPoint: 'Necessidade de projetos técnicos aprovados e seguros.',
      cta: 'Solicitar projeto elétrico.'
    },
    'projeto-eletrico-multifamiliar': {
      label: 'Projeto Elétrico Multifamiliar',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/projeto-eletrico-multifamiliar.webp',
      subtitle: 'PROJETOS PREDIAIS EM BIM',
      introText: 'Desenvolvimento de projetos elétricos prediais para condomínios e edifícios multifamiliares. A modelagem em BIM ajuda a antecipar incompatibilidades e orientar a obra.',
      plainLanguage: `
        <p>Este projeto organiza a energia de um edifício: áreas comuns, prumadas e unidades. Primeiro levantamos as cargas e a planta; depois definimos circuitos, quadros e caminhos dos cabos.</p>
        <p>A modelagem em BIM ajuda a comparar o projeto elétrico com a arquitetura e outras instalações antes da obra. Assim, a equipe consegue identificar ajustes enquanto ainda é simples revisar os desenhos.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Separação entre áreas comuns e unidades.</li>
          <li>Prumadas, quadros e caminhos de cabos dimensionados.</li>
          <li>Memoriais e registros previstos no escopo contratado.</li>
        </ul>
      `,
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
        { title: 'Tecnologia BIM 3D', description: 'Ajuda a verificar se os eletrodutos e dutos de energia interferem com vigas ou outras instalações antes da obra.', icon: 'fas fa-cube' },
        { title: 'Dimensionamento coerente', description: 'Os cálculos ajudam a evitar desperdício de condutores e escolhas incompatíveis com a carga prevista.', icon: 'fas fa-dollar-sign' },
        { title: 'Documentação organizada', description: 'O projeto reúne os registros necessários para a análise da concessionária, quando essa etapa fizer parte do escopo.', icon: 'fas fa-check-double' }
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
        { question: 'A Klyfe apoia a aprovação do projeto multifamiliar?', answer: 'Podemos preparar e acompanhar a documentação quando essa etapa estiver prevista. A análise e a decisão final pertencem à concessionária.' }
      ]
    },
    'projeto-eletrico-unifamiliar': {
      label: 'Projeto Elétrico Unifamiliar',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/projeto-eletrico-unifamiliar.webp',
      subtitle: 'PROJETOS RESIDENCIAIS PERSONALIZADOS',
      introText: 'Projetos elétricos para residências de diferentes portes, com distribuição de circuitos e dimensionamento conforme a NBR 5410 e as características da obra.',
      plainLanguage: `
        <p>O projeto transforma a planta da casa em um mapa elétrico. Ele mostra onde ficam tomadas, iluminação, chuveiros, ar-condicionado e o quadro de distribuição.</p>
        <p>Também calculamos a carga prevista e indicamos proteções para que a instalação seja executada com segurança. O resultado serve de guia para comprar materiais e orientar a obra.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Posição dos pontos conforme a rotina da família.</li>
          <li>Circuitos separados para equipamentos de maior potência.</li>
          <li>Lista de materiais e documentação conforme o escopo.</li>
        </ul>
      `,
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
        { title: 'Segurança Familiar', description: 'A separação de circuitos e as proteções previstas ajudam a reduzir riscos de sobrecarga e choques.', icon: 'fas fa-user-shield' },
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
        { question: 'O projeto elétrico residencial ajuda a proteger aparelhos?', answer: 'O dimensionamento de disjuntores e a avaliação de DPS podem reduzir a exposição a sobrecargas e surtos. A proteção depende da instalação e dos equipamentos escolhidos.' },
        { question: 'A Klyfe atende projetos residenciais integrados à automação?', answer: 'Podemos desenhar a infraestrutura elétrica preparada para automação de iluminação, áudio e climatização quando esses sistemas estiverem definidos no programa da obra.' },
        { question: 'Qual a norma que rege o projeto elétrico unifamiliar?', answer: 'A principal diretriz é a ABNT NBR 5410, que estabelece as regras para instalações elétricas de baixa tensão em todo o Brasil.' }
      ]
    },
    'projeto-eletrico-comercial': {
      label: 'Projeto Elétrico Comercial',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/projeto-eletrico-comercial.webp',
      subtitle: 'PROJETOS DE ENGENHARIA CORPORATIVA',
      introText: 'Engenharia elétrica para lojas, escritórios, restaurantes e clínicas. O projeto considera carga, layout, iluminação e os documentos exigidos para cada etapa da obra.',
      plainLanguage: `
        <p>O projeto comercial considera como o negócio funciona: equipamentos, horários de uso, iluminação, climatização e mudanças de layout. Com esse levantamento, organizamos a carga e os circuitos de cada ambiente.</p>
        <p>Também deixamos registradas as rotas de cabos, os quadros e as proteções. Sistemas de backup, rede de dados e aprovação junto à concessionária entram quando fizerem parte do escopo.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Cargas e circuitos separados por uso.</li>
          <li>Infraestrutura preparada para o layout previsto.</li>
          <li>Documentação técnica para as etapas contratadas.</li>
        </ul>
      `,
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
        { title: 'Segurança Normativa', description: 'A documentação técnica pode apoiar a obtenção de licenças e laudos, conforme as exigências do empreendimento.', icon: 'fas fa-shield-alt' },
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
      heroImage: '/img/engenharia/projeto-eletrico-industrial.webp',
      subtitle: 'PROJETOS PARA INFRAESTRUTURA INDUSTRIAL',
      introText: 'Projetos elétricos industriais para organizar potência, painéis, CCMs e caminhos elétricos. Os estudos consideram a planta e os requisitos de segurança aplicáveis, incluindo a NR-10.',
      plainLanguage: `
        <p>Em uma indústria, o projeto precisa entender as máquinas, os motores e o processo de produção. A equipe levanta as cargas e define como a energia chegará aos painéis, aos centros de controle e aos pontos de uso.</p>
        <p>Os cálculos de curto-circuito, proteção e seletividade ajudam a planejar uma resposta mais controlada a falhas. Cada estudo depende dos dados reais da planta e do escopo contratado.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Inventário de máquinas e cargas de processo.</li>
          <li>Rotas, painéis, aterramento e proteções documentados.</li>
          <li>Memoriais e ART quando previstos na contratação.</li>
        </ul>
      `,
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
        { title: 'Continuidade planejada', description: 'O dimensionamento e a coordenação das proteções ajudam a reduzir desligamentos por falhas de circuito.', icon: 'fas fa-industry' },
        { title: 'Segurança sob a NR-10', description: 'O projeto registra medidas de proteção e afastamento para orientar a execução conforme o escopo.', icon: 'fas fa-hard-hat' },
        { title: 'Uso eficiente da energia', description: 'Os estudos podem apontar perdas e oportunidades de ajuste nos circuitos de motores.', icon: 'fas fa-chart-line' }
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
      heroImage: '/img/engenharia/projeto-eletrico-multiplas-unidades.webp',
      subtitle: 'HOMOLOGAÇÃO DE ENTRADAS DE ENERGIA COLETIVAS',
      introText: 'Elaboração e apoio à aprovação de projetos de centro de medição agrupada para edifícios comerciais, residenciais e vilas de casas, conforme as especificações vigentes da Energisa e os dados do local.',
      plainLanguage: `
        <p>Este projeto organiza uma entrada de energia compartilhada por várias casas ou salas. Ele separa o que pertence a cada unidade do que é comum e mostra como a medição será montada.</p>
        <p>Também conferimos demanda, queda de tensão, aterramento e espaço para as caixas. O protocolo e a aprovação dependem da documentação completa e da análise da concessionária.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Definição da quantidade e do arranjo das medições.</li>
          <li>Diagramas, circuitos e proteções da entrada.</li>
          <li>Acompanhamento somente quando incluído no escopo.</li>
        </ul>
      `,
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
        { title: 'Processo organizado', description: 'A documentação é preparada para facilitar a conferência dos requisitos da Energisa.', icon: 'fas fa-shipping-fast' },
        { title: 'Detalhamento construtivo', description: 'O projeto mostra alvenaria, fixação e posição das caixas para orientar a execução e a vistoria.', icon: 'fas fa-tools' },
        { title: 'Segurança Operacional', description: 'Quadros dimensionados com proteção contra curto-circuitos e disjuntor geral de proteção da entrada.', icon: 'fas fa-shield-alt' }
      ],
      process: [
        { title: 'Estudo do Ramal', description: 'Verificação do ponto de entrega disponível na rede pública de distribuição.' },
        { title: 'Projeto Detalhado', description: 'Desenho das caixas de medição, fiação interna, barramentos e proteções.' },
        { title: 'Protocolo Energisa', description: 'Envio da documentação e acompanhamento técnico da análise de projeto.' },
        { title: 'Emissão de ART', description: 'Garantia técnica do engenheiro responsável pelo dimensionamento.' }
      ],
      faq: [
        { question: 'Quando é exigido projeto para múltiplas unidades?', answer: 'A exigência depende do agrupamento de medição, da demanda calculada e dos limites de atendimento definidos pela Energisa para cada ligação.' },
        { question: 'A Klyfe vende os quadros de medição prontos?', answer: 'Nós elaboramos o projeto de engenharia detalhado. Indicamos montadores e fabricantes homologados parceiros para que você compre com segurança.' },
        { question: 'Quanto tempo demora a aprovação do projeto na concessionária?', answer: 'O prazo depende do tipo de ligação, da documentação, de eventuais pendências e do fluxo vigente da concessionária. A proposta separa o prazo interno da Klyfe do prazo de análise externo.' }
      ]
    },
    'aprovacao-energisa': {
      label: 'Aprovação de Projeto na Energisa',
      category: 'engenharia',
      template: 'aprovacao-energisa',
      heroImage: '/img/engenharia/aprovacao-energisa.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Homologação e aprovação de projetos elétricos residenciais, comerciais, industriais e de subestações junto à Energisa Paraíba e Borborema.</p>',
      painPoint: 'Exigência de homologação e aprovação de projetos pela concessionária de energia local.',
      cta: 'Aprovar projeto elétrico na Energisa.'
    },
    'projeto-luminotecnico': {
      label: 'Projeto Luminotécnico',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/projeto-luminotecnico.webp',
      subtitle: 'ENGENHARIA DE ILUMINAÇÃO DE ALTO PADRÃO',
      introText: 'Cálculo e projeto de iluminação técnica e corporativa. O estudo busca equilibrar consumo, conforto visual e os níveis indicados pela NBR ISO/CIE 8995-1 para cada ambiente.',
      plainLanguage: `
        <p>O projeto luminotécnico define quanta luz cada ambiente precisa e onde posicionar as luminárias. Consideramos a atividade realizada, o tamanho do espaço, a luz natural e o conforto de quem usa o local.</p>
        <p>As simulações ajudam a comparar modelos de luminária e níveis de iluminância antes da compra. A especificação final e as medições dependem dos dados disponíveis e do escopo contratado.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Distribuição dos pontos e circuitos de iluminação.</li>
          <li>Comparação de níveis de luz e uniformidade.</li>
          <li>Memorial com luminárias e premissas do estudo.</li>
        </ul>
      `,
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
        { title: 'Critérios documentados', description: 'O memorial registra os níveis de iluminância adotados e as premissas aplicáveis a cada ambiente.', icon: 'fas fa-file-invoice-dollar' }
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
      heroImage: '/img/engenharia/spda.webp',
      subtitle: 'PROTEÇÃO CONTRA DESCARGAS ATMOSFÉRICAS',
      introText: 'Projeto, instalação, adequação, inspeção e manutenção de Sistemas de Proteção contra Descargas Atmosféricas (SPDA) %location%, com engenharia especializada, responsabilidade técnica e documentação conforme o escopo contratado e as normas aplicáveis.',
      metaDescription: 'Projeto e laudo de SPDA (para-raios) %location%: instalação, adequação, inspeção e manutenção conforme o escopo técnico.',
      serviceDescription: 'Solução completa em SPDA %location%, do levantamento e projeto à instalação, adequação, inspeção, documentação técnica e manutenção, conforme a edificação e o escopo contratado.',
      cta: 'Solicitar orçamento de SPDA',
      finalCtaTitle: 'Solicitar orçamento de SPDA',
      heroWidth: 1400,
      heroHeight: 787,
      technicalReferences: [
        { title: 'ABNT NBR 5419 — Proteção contra descargas atmosféricas', url: 'https://www.abntcatalogo.com.br/default.aspx?P=C0N63GK2P5N1', publisher: 'ABNT Catálogo' },
        { title: 'NT-11 — Procedimentos Administrativos', url: 'https://bravo.bombeiros.pb.gov.br/portal/wp-content/uploads/2024/11/NT-11-Procedimentos-Administrativos.pdf', publisher: 'Corpo de Bombeiros Militar da Paraíba' }
      ],
      plainLanguage: `
        <p><strong>SPDA</strong> significa Sistema de Proteção contra Descargas Atmosféricas. Popularmente, ele é associado ao termo “para-raios”, mas tecnicamente o sistema é mais amplo do que um único captor.</p>
        <p>Conforme a edificação e o escopo contratado, o sistema pode envolver captação, descidas, aterramento, equipotencialização e medidas de proteção contra surtos. O aterramento é uma parte relacionada ao SPDA, mas não é sinônimo do sistema inteiro; da mesma forma, o DPS é um dispositivo de proteção contra surtos e não substitui o SPDA.</p>
        <p>O laudo registra as condições encontradas na inspeção e pode indicar ensaios, ajustes, adequações e documentos necessários para o uso pretendido. A necessidade de ART ou de apresentação a seguradora e órgão público é confirmada conforme cada caso e a responsabilidade técnica envolvida.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Análise da edificação, do uso e do sistema existente, quando houver.</li>
          <li>Projeto, instalação ou adequação dos elementos previstos no escopo.</li>
          <li>Inspeção, verificações e documentação técnica dos serviços realizados.</li>
        </ul>
      `,
      painPoint: 'Sistemas de proteção incompletos, necessidade de laudo e adequações técnicas em edificações de diferentes usos.',
      whatsIncluded: [
        'Avaliação do risco de descargas atmosféricas conforme a ABNT NBR 5419 vigente',
        'Projeto de captação, descidas e aterramento',
        'Dimensionamento e definição do sistema conforme os dados da edificação',
        'Fornecimento e instalação dos componentes previstos no escopo',
        'Adequação de SPDA existente e execução das correções previstas',
        'Equipotencialização e DPS/proteção contra surtos, quando aplicável',
        'Inspeções, ensaios e verificações previstos no escopo',
        'Laudo com fotos, achados e recomendações',
        'ART correspondente à responsabilidade e ao escopo técnico',
        'Manutenção e inspeções posteriores, quando contratadas'
      ],
      executionScope: [
        {
          title: 'Projeto e engenharia',
          items: [
            'Análise da edificação e de suas características construtivas',
            'Gerenciamento de risco',
            'Dimensionamento',
            'Definição do sistema conforme o escopo técnico'
          ]
        },
        {
          title: 'Instalação e execução',
          items: [
            'Instalação do SPDA',
            'Captação e descidas',
            'Aterramento e equipotencialização',
            'DPS/proteção contra surtos, quando aplicável',
            'Fornecimento dos componentes previstos no escopo'
          ]
        },
        {
          title: 'Inspeção e adequação',
          items: [
            'Avaliação de sistemas existentes',
            'Ensaios, testes e verificações',
            'Identificação de não conformidades',
            'Execução das correções previstas'
          ]
        },
        {
          title: 'Documentação e manutenção',
          items: [
            'Laudo técnico e registros',
            'ART conforme responsabilidade e escopo',
            'Manutenção do sistema',
            'Inspeções posteriores, quando necessárias e contratadas'
          ]
        }
      ],
      commercialScenarios: [
        {
          title: 'SPDA para novas edificações',
          description: 'Para obras novas, avaliamos a edificação, desenvolvemos o projeto, orientamos o fornecimento e podemos executar a instalação e a documentação técnica previstas no escopo.'
        },
        {
          title: 'Inspeção e manutenção de SPDA',
          description: 'Para imóveis que já possuem o sistema, avaliamos as condições encontradas, realizamos ensaios e verificações previstos e registramos as necessidades de manutenção.'
        },
        {
          title: 'Adequação de SPDA existente',
          description: 'Para sistemas antigos, incompletos ou irregulares, o diagnóstico orienta o projeto de correção, a execução das adequações e uma nova verificação conforme o escopo contratado.'
        }
      ],
      benefits: [
        { title: 'Engenharia e execução coordenadas', description: 'O levantamento, o projeto e a execução podem ser organizados em uma solução compatível com a edificação e o escopo contratado.', icon: 'fas fa-drafting-compass' },
        { title: 'Adequação do sistema existente', description: 'Quando há um SPDA instalado, a avaliação técnica orienta as correções e intervenções que forem definidas na proposta.', icon: 'fas fa-tools' },
        { title: 'Documentação técnica', description: 'Laudos, registros e ARTs são entregues conforme a responsabilidade profissional e os documentos previstos no escopo.', icon: 'fas fa-file-contract' }
      ],
      process: [
        { title: 'Levantamento e análise', description: 'Entendimento da edificação, do uso, das características construtivas e do sistema existente, quando houver.' },
        { title: 'Definição técnica e projeto', description: 'Avaliação das medidas necessárias e desenvolvimento do projeto conforme o escopo contratado.' },
        { title: 'Instalação ou adequação', description: 'Execução do sistema novo ou das intervenções necessárias em um SPDA existente.' },
        { title: 'Inspeção e verificações', description: 'Avaliação da execução, conexões, continuidade e demais verificações previstas.' },
        { title: 'Documentação técnica', description: 'Entrega dos documentos, registros e ARTs correspondentes à responsabilidade e ao escopo contratado.' },
        { title: 'Manutenção', description: 'Inspeções posteriores e intervenções futuras quando necessárias e contratadas.' }
      ],
      faq: [
        { question: 'Qual a validade do laudo de SPDA?', answer: 'A validade depende do tipo de inspeção, da edificação e das exigências do responsável pelo imóvel. O prazo aplicável é informado no laudo e deve ser conferido com a norma e o órgão solicitante.' },
        { question: 'A Klyfe realiza a instalação física do SPDA?', answer: 'Sim. A Klyfe pode atuar desde o levantamento e projeto até a instalação, adequação, inspeção e documentação técnica do sistema, conforme as necessidades da edificação e o escopo contratado.' },
        { question: 'Vocês fazem apenas o projeto ou podem executar toda a solução?', answer: 'A Klyfe pode assumir tanto etapas específicas quanto uma solução completa, incluindo engenharia, instalação, adequação, inspeção e documentação.' },
        { question: 'Meu prédio já possui SPDA. Vocês fazem inspeção e manutenção?', answer: 'Sim. Sistemas existentes podem ser inspecionados para avaliar suas condições, identificar necessidades de manutenção ou adequação e definir as intervenções necessárias.' },
        { question: 'Vocês adequam sistemas antigos?', answer: 'Sim. A Klyfe pode avaliar o sistema existente, identificar necessidades de correção e executar as adequações previstas no escopo técnico.' },
        { question: 'SPDA impede que um raio atinja a edificação?', answer: 'Não. O SPDA não impede a ocorrência de descargas atmosféricas nem permite prometer risco zero. O sistema é projetado para organizar caminhos e medidas de proteção que reduzam os efeitos da descarga na edificação, conforme a avaliação técnica e o escopo contratado.' },
        { question: 'Vocês emitem ART?', answer: 'As atividades técnicas são acompanhadas das ARTs correspondentes quando previstas e aplicáveis ao escopo contratado e à responsabilidade do profissional habilitado.' },
        { question: 'O que a NBR 5419 orienta?', answer: 'A ABNT NBR 5419 reúne referências para avaliação de risco, projeto, instalação, inspeção e manutenção de sistemas de proteção contra descargas atmosféricas. A aplicação depende das características da edificação, da ocupação e do escopo técnico.' }
      ]
    },
    'subestacao-aerea': {
      label: 'Subestações e cabines primárias',
      category: 'engenharia',
      template: 'subestacao-aerea',
      heroImage: '/img/engenharia/subestacao-aerea.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Projetos e montagem de subestações aéreas até 500kVA e cabines primárias.</p>',
      painPoint: 'Demanda de alta carga e necessidade de subestação própria.',
      cta: 'Solicitar projeto de subestação.'
    },
    'projeto-subestacao': {
      label: 'Projeto de Subestação',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/projeto-subestacao.webp',
      subtitle: 'MÉDIA TENSÃO E CABINES PRIMÁRIAS',
      introText: 'Desenvolvemos projetos de subestações aéreas e abrigadas para instalações que precisam receber energia em média tensão. O tipo de subestação, a potência, a documentação e a interface com a concessionária são definidos conforme a demanda e o local.',
      plainLanguage: `
        <p>Uma subestação adapta a energia recebida da rede de média tensão para o nível usado pela instalação. Ela reúne transformador, proteção, aterramento e os documentos necessários para a solução escolhida.</p>
        <p>O projeto começa pelo levantamento de cargas e das condições do local. Depois, a equipe compara a alternativa aérea ou abrigada e organiza os desenhos, memoriais e registros previstos no escopo.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Potência e demanda estimadas para a instalação.</li>
          <li>Proteções, aterramento e layout dos equipamentos.</li>
          <li>Documentação e interface com a concessionária, quando contratadas.</li>
        </ul>
      `,
      painPoint: 'Necessidade de aumento de carga indisponível em baixa tensão e tarifas industriais.',
      whatsIncluded: [
        'Dimensionamento do transformador conforme a demanda',
        'Projeto de proteção de média tensão',
        'Malha de aterramento e equipotencialização',
        'Estudo de coordenação e seletividade, quando aplicável',
        'Memorial descritivo e de cálculo',
        'Acompanhamento e ART quando previstos no escopo'
      ],
      benefits: [
        { title: 'Decisão dimensionada', description: 'A potência e os equipamentos são escolhidos a partir das cargas e das condições da instalação.', icon: 'fas fa-chart-pie' },
        { title: 'Proteção organizada', description: 'O projeto registra proteção, aterramento e layout para orientar as próximas etapas.', icon: 'fas fa-plug' },
        { title: 'Documentação clara', description: 'Os documentos e a interface com a concessionária são definidos conforme o escopo contratado.', icon: 'fas fa-file-invoice' }
      ],
      process: [
        { title: 'Levantamento de demanda', description: 'Análise das cargas, do padrão de entrada e das condições do local.' },
        { title: 'Projeto técnico', description: 'Desenhos, memoriais, proteção, aterramento e layout da solução.' },
        { title: 'Documentação', description: 'Organização dos registros previstos no orçamento e nas exigências aplicáveis.' },
        { title: 'Interface', description: 'Protocolo e acompanhamento somente quando incluídos na contratação.' }
      ],
      faq: [
        { question: 'Quando uma subestação própria pode ser necessária?', answer: 'A necessidade depende da carga, da demanda contratada e dos limites de atendimento em baixa tensão. A concessionária informa os requisitos aplicáveis a cada ligação.' },
        { question: 'Qual a diferença entre subestação aérea e abrigada?', answer: 'A aérea fica em uma estrutura elevada e aberta. A abrigada fica em uma cabine ou edificação fechada. A escolha considera potência, espaço, segurança, acesso e exigências da concessionária.' },
        { question: 'A Klyfe acompanha a vistoria de ligação?', answer: 'Podemos apoiar essa etapa quando ela fizer parte do escopo. O protocolo, a vistoria e a decisão final pertencem à concessionária.' }
      ]
    },
    'manutencao-subestacao': {
      label: 'Manutenção de subestações',
      category: 'engenharia',
      template: 'servicos/manutencao-subestacao',
      heroImage: '/img/engenharia/manutencao-subestacao.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Manutenção preventiva e corretiva de subestações, com termografia e análise de óleo.</p>',
      painPoint: 'Risco de parada operacional por falha em subestação.',
      cta: 'Agendar manutenção de subestação.'
    },
    'correcao-fator-potencia': {
      label: 'Correção de fator de potência',
      category: 'engenharia',
      template: 'correcao-fator-potencia',
      heroImage: '/img/engenharia/correcao-fator-potencia.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Análise e instalação de bancos de capacitores para eliminação de multas por energia reativa.</p>',
      painPoint: 'Multas elevadas na conta de energia por baixo fator de potência.',
      cta: 'Eliminar multas de reativo.'
    },
    'pericia-ressarcimento-danos': {
      label: 'Perícia Elétrica para Ressarcimento de Danos',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/pericia-ressarcimento-danos.webp',
      subtitle: 'ENGENHARIA LEGAL E DIAGNÓSTICA',
      introText: 'Vistoria técnica e laudo pericial para apoiar pedidos de ressarcimento por danos em equipamentos após oscilações ou distúrbios na rede elétrica.',
      plainLanguage: `
        <p>Quando um equipamento queima após uma oscilação, a perícia reúne os dados para entender o que aconteceu. A vistoria observa o aparelho, a instalação interna, os registros disponíveis e a data do evento.</p>
        <p>O laudo descreve os achados e informa se há elementos técnicos que sustentem a relação entre o distúrbio e o dano. A decisão de ressarcimento pertence à concessionária ou ao órgão responsável pelo processo.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Registro fotográfico e identificação dos equipamentos.</li>
          <li>Análise das instalações e dos documentos disponíveis.</li>
          <li>Conclusão técnica com ART quando prevista no escopo.</li>
        </ul>
      `,
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
        { title: 'Base técnica organizada', description: 'O laudo reúne registros que podem apoiar uma análise administrativa ou judicial.', icon: 'fas fa-balance-scale' },
        { title: 'Análise do evento', description: 'A vistoria procura elementos técnicos que ajudem a relacionar o dano ao distúrbio informado.', icon: 'fas fa-search' },
        { title: 'ART quando aplicável', description: 'A responsabilidade técnica e o registro são definidos conforme o escopo contratado.', icon: 'fas fa-award' }
      ],
      process: [
        { title: 'Vistoria de Campo', description: 'Visita do engenheiro eletricista ao local para inspecionar os equipamentos danificados.' },
        { title: 'Análise de Histórico', description: 'Estudo dos relatórios de distúrbios e quedas de energia na região na data do dano.' },
        { title: 'Elaboração do Laudo', description: 'Redação das justificativas técnicas, memorial fotográfico e conclusões.' },
        { title: 'Entrega com ART', description: 'Emissão do documento técnico legal para protocolo formal.' }
      ],
      faq: [
        { question: 'Qual o prazo para pedir o ressarcimento de aparelhos queimados?', answer: 'O pedido deve observar os prazos e canais informados pela concessionária e pela regulamentação vigente na data do evento. Confirme o prazo oficial antes de protocolar.' },
        { question: 'A Energisa é obrigada a ressarcir aparelhos danificados?', answer: 'O ressarcimento depende da análise do evento, da responsabilidade atribuída à distribuidora e das regras aplicáveis ao pedido.' },
        { question: 'Como o laudo de perícia ajuda no processo?', answer: 'Ele organiza os achados técnicos, os documentos e as limitações da análise para apoiar a reclamação ou o processo.' }
      ]
    },
    'pericia-furto-energia': {
      label: 'Perícia Elétrica para Contestação de Furto de Energia (TOI)',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/pericia-furto-energia.webp',
      subtitle: 'ASSESSORIA TÉCNICA EM ANOMALIAS DE MEDIÇÃO',
      introText: 'Perícia técnica e laudo para analisar Termos de Ocorrência e Inspeção (TOI), os registros da concessionária e as condições do padrão de entrada.',
      plainLanguage: `
        <p>O TOI é um documento emitido depois de uma inspeção no medidor. A análise técnica revisa o termo, as fotos, o histórico de consumo e as condições do padrão para identificar o que está comprovado e o que precisa de esclarecimento.</p>
        <p>O parecer organiza os dados para uma contestação administrativa ou judicial. Ele não garante o resultado do processo; a decisão depende das provas reunidas e da autoridade responsável.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Leitura do TOI e dos registros entregues pela concessionária.</li>
          <li>Vistoria do medidor, conexões e padrão de entrada.</li>
          <li>Relatório técnico e ART quando contratados.</li>
        </ul>
      `,
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
        { title: 'Análise da cobrança', description: 'O parecer pode identificar pontos técnicos para esclarecer ou contestar a diferença de consumo apresentada.', icon: 'fas fa-piggy-bank' },
        { title: 'Responsabilidade técnica', description: 'A documentação pode ser assinada com ART quando esse item estiver previsto na contratação.', icon: 'fas fa-graduation-cap' }
      ],
      process: [
        { title: 'Análise do TOI', description: 'Estudo do documento lavrado pela Energisa e suas fotos de acusação.' },
        { title: 'Vistoria no Padrão', description: 'Inspeção física do medidor, conexões e verificação de integridade técnica.' },
        { title: 'Cálculo de Consumo', description: 'Auditoria de consumo real com base na carga do imóvel e média histórica.' },
        { title: 'Emissão de Laudo', description: 'Entrega do parecer técnico e ART para instrução do recurso.' }
      ],
      faq: [
        { question: 'O que é o TOI (Termo de Ocorrência de Inspeção)?', answer: 'É o termo lavrado pela concessionária após realizar uma inspeção no medidor de energia, no qual acusa a existência de alguma irregularidade na medição.' },
        { question: 'A Energisa pode cobrar a diferença de consumo de uma vez só?', answer: 'A distribuidora deve informar o cálculo, a origem da cobrança e os canais de contestação conforme as regras aplicáveis. Eventuais falhas formais precisam ser conferidas nos documentos do caso concreto.' },
        { question: 'Como a perícia pode ajudar na contestação do TOI?', answer: 'A análise compara o termo, os registros, o medidor e o histórico de consumo. Ela pode apontar inconsistências, mas não garante o resultado da contestação.' }
      ]
    },
    'viabilidade-carregador-veicular': {
      label: 'Laudos e Estudo de Viabilidade para Carregadores Elétricos',
      category: 'engenharia',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/engenharia/viabilidade-carregador-veicular.webp',
      subtitle: 'ESTUDO DE INFRAESTRUTURA PARA MOBILIDADE ELÉTRICA',
      introText: 'Estudo de Viabilidade Técnica (EVT) e laudo de demanda para avaliar a instalação de carregadores de veículos elétricos (Wallbox) em condomínios e indústrias.',
      plainLanguage: `
        <p>Antes de instalar um carregador, precisamos saber quanta energia o imóvel já usa e quanto ainda pode receber. O estudo compara a demanda atual com a potência dos carregadores e observa quadros, cabos, proteção e espaço físico.</p>
        <p>O resultado mostra se a infraestrutura atende ao uso previsto ou se serão necessárias adequações. A quantidade de carregadores, o sistema de controle e o projeto executivo dependem dos dados do local e da contratação.</p>
        <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
          <li>Levantamento de demanda e capacidade disponível.</li>
          <li>Alternativas de cabeamento, proteção e controle de carga.</li>
          <li>Laudo e ART somente nos itens previstos no escopo.</li>
        </ul>
      `,
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
        { title: 'Planejamento de carga', description: 'A análise compara o uso dos carregadores com a capacidade disponível e orienta medidas para reduzir o risco de sobrecarga.', icon: 'fas fa-exclamation-triangle' },
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
        { question: 'Por que o condomínio precisa de um laudo de viabilidade?', answer: 'A recarga pode aumentar a demanda por longos períodos. O estudo indica se há capacidade disponível ou se será preciso avaliar adequações na instalação.' },
        { question: 'O que é a gestão inteligente de recarga (load shedding)?', answer: 'É um sistema de software e hardware que divide e controla a potência enviada a cada veículo conforme o consumo total do prédio no momento, evitando ultrapassar a demanda contratada.' },
        { question: 'A Klyfe faz o projeto elétrico completo e a execução?', answer: 'O estudo de viabilidade é o foco desta página. Projeto executivo, apoio à homologação e execução podem ser avaliados separadamente quando fizerem parte da contratação.' }
      ]
    },
    'eletrica': {
      label: 'Serviços Elétricos',
      category: 'eletrica',
      template: 'eletrica',
      bairros: 'Principais polos comerciais e industriais da Paraíba',
      serviceContext: `
        <p>Oferecemos serviços elétricos completos para empresas e residências na Paraíba. Fazemos novas instalações e reformas elétricas gerais. Trabalhamos com foco em segurança.</p>
        <p>A supervisão de engenharia, a emissão de ART e as referências normativas são definidas conforme o tipo de serviço e a contratação. A equipe registra as premissas e os limites aplicáveis à instalação.</p>
      `,
      painPoint: 'Serviços elétricos de alto padrão com supervisão de engenharia em todo o estado.',
      cta: 'Solicite orçamento técnico na Paraíba.',
      faqExtra: {
        question: 'Os serviços elétricos da Klyfe possuem garantia técnica?',
        answer: 'A garantia, os documentos e as responsabilidades são definidos na proposta conforme o serviço, os materiais e as condições da instalação. Quando aplicável, a documentação técnica acompanha a entrega.'
      }
    },
    'instalacoes-industriais': {
      label: 'Instalações Elétricas Industriais',
      category: 'eletrica',
      template: 'instalacoes-industriais',
      heroImage: '/img/eletrica/instalacoes-industriais.webp',
      bairros: 'Atendimento estadual',
      serviceContext: '<p>Montagens e manutenções elétricas industriais pesadas com foco em continuidade operacional.</p>',
      painPoint: 'Infraestrutura industrial robusta e segura.',
      cta: 'Solicitar instalação industrial.'
    },
    'tomadas-interruptores': {
      label: 'Tomadas e Interruptores',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/tomadas-interruptores.webp',
      icon: 'fa-plug',
      subtitle: 'PONTOS DE USO E COMANDO',
      introText: 'Instalação, troca e remanejamento de tomadas e interruptores conforme a carga, o ambiente e o padrão da instalação.',
      plainLanguage: '<p>Este serviço organiza os pontos onde você liga equipamentos e aciona a iluminação. A equipe verifica a caixa, a fiação, a proteção e a posição desejada antes de intervir.</p><p>Quando necessário, o circuito é ajustado para a carga prevista e os componentes são escolhidos conforme o uso do ambiente.</p>',
      summary: 'Instalação, troca e realocação conforme NBR 14136.',
      bairros: 'Atendimento estadual',
      painPoint: 'Instalação, troca e realocação segura de tomadas e interruptores.',
      cta: 'Solicitar instalação de tomadas e interruptores.',
      finalCtaTitle: 'Atualize seus pontos elétricos',
      whatsIncluded: ['Vistoria dos pontos existentes e das caixas de passagem', 'Verificação de cabos, conexões e proteções do circuito', 'Instalação ou remanejamento de tomadas e interruptores', 'Testes de funcionamento e organização do local'],
      benefits: [
        { title: 'Ponto adequado à carga', description: 'A solução considera a potência dos equipamentos e o uso previsto para cada ambiente.', icon: 'fas fa-plug' },
        { title: 'Acabamento organizado', description: 'Os componentes são instalados com alinhamento, identificação e limpeza após o serviço.', icon: 'fas fa-check-circle' }
      ],
      process: [
        { title: 'Levantamento', description: 'Identificação dos pontos, do circuito e da necessidade de remanejamento.' },
        { title: 'Definição', description: 'Escolha dos componentes e das adequações compatíveis com a instalação.' },
        { title: 'Execução e teste', description: 'Instalação, conferência das conexões e teste de funcionamento.' }
      ],
      faq: [
        { question: 'É possível mudar uma tomada de lugar?', answer: 'Sim, desde que a caixa, o caminho dos cabos e a capacidade do circuito permitam a alteração. A viabilidade é conferida no local.' },
        { question: 'Tomadas para equipamentos potentes precisam de circuito próprio?', answer: 'Equipamentos de maior potência podem exigir circuito dedicado e proteção compatível. A necessidade depende da carga e da instalação existente.' },
        { question: 'Vocês trocam apenas o espelho ou também a fiação?', answer: 'O escopo pode incluir o componente, a caixa, a fiação e a proteção. A proposta separa o que será substituído após a vistoria.' }
      ]
    },
    'iluminacao': {
      label: 'Iluminação',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/iluminacao.webp',
      icon: 'fa-lightbulb',
      subtitle: 'ILUMINAÇÃO RESIDENCIAL E COMERCIAL',
      introText: 'Projeto e instalação de iluminação LED, decorativa e externa com distribuição dos pontos, comandos e carga definidos para cada ambiente.',
      plainLanguage: '<p>O serviço transforma a necessidade de luz em pontos, luminárias e comandos organizados. Avaliamos o ambiente, a rotina de uso e a infraestrutura disponível.</p><p>A solução pode incluir troca de luminárias, novos pontos, circuitos e ajustes de comando. O tipo de equipamento e o nível de iluminância dependem do projeto.</p>',
      summary: 'Luminárias, iluminação externa, decorativa e LED.',
      bairros: 'Atendimento estadual',
      painPoint: 'Projetos e instalação de sistemas de iluminação LED e decorativa.',
      cta: 'Solicitar projeto de iluminação.',
      finalCtaTitle: 'Planeje uma iluminação mais eficiente',
      whatsIncluded: ['Levantamento dos pontos e comandos existentes', 'Definição de luminárias e potência compatíveis', 'Instalação ou remanejamento de pontos de luz', 'Testes de acionamento e orientação de uso'],
      benefits: [
        { title: 'Conforto visual', description: 'A distribuição dos pontos considera circulação, tarefas e características de cada ambiente.', icon: 'fas fa-lightbulb' },
        { title: 'Consumo sob controle', description: 'Equipamentos e circuitos são especificados conforme a carga e o uso esperado.', icon: 'fas fa-bolt' }
      ],
      process: [
        { title: 'Briefing', description: 'Entendimento do uso do ambiente, do efeito desejado e das restrições existentes.' },
        { title: 'Definição técnica', description: 'Escolha dos pontos, comandos, luminárias e circuitos necessários.' },
        { title: 'Instalação', description: 'Montagem, testes e conferência do acabamento dos pontos.' }
      ],
      faq: [
        { question: 'A Klyfe instala iluminação LED em pontos existentes?', answer: 'Sim. A troca pode ser feita quando a caixa, o circuito e a potência são compatíveis com a luminária escolhida.' },
        { question: 'É possível criar comandos independentes para um mesmo ambiente?', answer: 'Sim, desde que a infraestrutura permita separar os circuitos ou instalar a solução de comando prevista no projeto.' },
        { question: 'O projeto de iluminação inclui cálculo de iluminância?', answer: 'Quando necessário, o escopo pode incluir simulação ou medição. O nível de detalhamento é definido conforme o ambiente e o objetivo.' }
      ]
    },
    'chuveiro-eletrico': {
      label: 'Chuveiro Elétrico',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/chuveiro-eletrico.webp',
      icon: 'fa-shower',
      subtitle: 'CIRCUITO DE ALTA POTÊNCIA',
      introText: 'Instalação e adequação de circuitos para chuveiros elétricos, com dimensionamento de cabos e proteção conforme a potência do equipamento.',
      plainLanguage: '<p>O chuveiro puxa muita corrente e precisa de um circuito preparado para isso. A equipe confere a potência, a bitola dos cabos, o disjuntor e as conexões.</p><p>Se a instalação não suportar o equipamento, a proposta indica as adequações necessárias antes da ligação.</p>',
      summary: 'Instalação com circuito independente e DR.',
      bairros: 'Atendimento estadual',
      painPoint: 'Instalação segura de chuveiros elétricos com proteção contra choques.',
      cta: 'Solicitar instalação de chuveiro.',
      finalCtaTitle: 'Instale seu chuveiro com proteção adequada',
      whatsIncluded: ['Conferência da potência e da tensão do chuveiro', 'Verificação ou criação de circuito dedicado', 'Dimensionamento de cabos, disjuntor e DR quando aplicável', 'Testes de aperto, continuidade e funcionamento'],
      benefits: [
        { title: 'Circuito dimensionado', description: 'A seção dos cabos e a proteção são avaliadas conforme a potência e o percurso.', icon: 'fas fa-bolt' },
        { title: 'Proteção contra choques', description: 'A necessidade de DR e aterramento é verificada conforme as condições da instalação.', icon: 'fas fa-shield-alt' }
      ],
      process: [
        { title: 'Conferência', description: 'Leitura da potência, da tensão e das condições do ponto existente.' },
        { title: 'Dimensionamento', description: 'Definição do circuito, dos cabos e das proteções compatíveis.' },
        { title: 'Instalação e teste', description: 'Montagem, aperto das conexões e teste antes da entrega.' }
      ],
      faq: [
        { question: 'Chuveiro elétrico precisa de circuito independente?', answer: 'Na maioria das instalações, sim. A necessidade depende da potência, da tensão e da distribuição existente e deve ser conferida no local.' },
        { question: 'Posso trocar o chuveiro sem trocar os cabos?', answer: 'Somente se os cabos e as proteções forem compatíveis com a nova potência. A verificação evita aquecimento e desarme indevido.' },
        { question: 'O DR é obrigatório em toda instalação de chuveiro?', answer: 'A aplicação depende das características da instalação e das normas vigentes. A equipe avalia o quadro, o aterramento e o circuito antes de recomendar a solução.' }
      ]
    },
    'ventiladores': {
      label: 'Ventiladores',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/ventiladores.webp',
      icon: 'fa-fan',
      subtitle: 'VENTILAÇÃO DE TETO E PAREDE',
      introText: 'Instalação e substituição de ventiladores de teto e parede com verificação do suporte, do circuito e do comando elétrico.',
      plainLanguage: '<p>Além de fixar o equipamento, o serviço verifica se o teto ou a parede suporta o conjunto e se os cabos e comandos estão adequados.</p><p>Depois da montagem, fazemos o balanceamento e testamos ruído, sentido de giro e acionamento conforme o modelo.</p>',
      summary: 'Teto e parede com balanceamento profissional.',
      bairros: 'Atendimento estadual',
      painPoint: 'Montagem e balanceamento de ventiladores de teto e parede.',
      cta: 'Solicitar instalação de ventilador.',
      finalCtaTitle: 'Instale seu ventilador com segurança',
      whatsIncluded: ['Avaliação do ponto e do suporte de fixação', 'Montagem do ventilador e conexão do comando', 'Balanceamento e conferência de vibração', 'Teste de acionamento e orientação de uso'],
      benefits: [
        { title: 'Fixação conferida', description: 'O suporte e o ponto de instalação são avaliados antes da montagem.', icon: 'fas fa-fan' },
        { title: 'Funcionamento estável', description: 'O balanceamento e os testes reduzem vibração e ajudam a identificar ajustes necessários.', icon: 'fas fa-check-circle' }
      ],
      process: [
        { title: 'Avaliação', description: 'Conferência do suporte, do ponto elétrico e do espaço disponível.' },
        { title: 'Montagem', description: 'Fixação do equipamento e ligação do comando conforme o manual.' },
        { title: 'Balanceamento', description: 'Teste de giro, ruído, vibração e acionamento.' }
      ],
      faq: [
        { question: 'É possível instalar ventilador onde existe apenas um ponto de luz?', answer: 'Em muitos casos, sim. A adaptação depende da caixa, do suporte, da fiação e do comando desejado.' },
        { question: 'Vocês fazem a instalação em laje ou forro?', answer: 'A equipe avalia o tipo de teto e define o suporte adequado. Forros podem exigir reforço independente da estrutura.' },
        { question: 'O balanceamento está incluído?', answer: 'Sim, a montagem prevê conferência de vibração e ajustes compatíveis com o modelo instalado.' }
      ]
    },
    'quadro-distribuicao': {
      label: 'Quadro de Distribuição',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/quadro-distribuicao.webp',
      icon: 'fa-border-all',
      subtitle: 'PROTEÇÃO E ORGANIZAÇÃO DOS CIRCUITOS',
      introText: 'Troca, organização e atualização de quadros de distribuição com identificação dos circuitos, balanceamento e proteções compatíveis.',
      plainLanguage: '<p>O quadro distribui a energia e concentra os dispositivos de proteção da instalação. A equipe identifica os circuitos, verifica aquecimentos e confere se os disjuntores correspondem às cargas.</p><p>Quando o quadro está cheio, antigo ou desorganizado, o serviço pode incluir troca, expansão ou reorganização conforme o espaço e o projeto.</p>',
      summary: 'Troca, upgrade e balanceamento de fases.',
      bairros: 'Atendimento estadual',
      painPoint: 'Manutenção e atualização técnica de quadros de distribuição elétricos.',
      cta: 'Solicitar manutenção de quadro.',
      finalCtaTitle: 'Organize e proteja seu quadro elétrico',
      whatsIncluded: ['Inspeção visual e termográfica quando aplicável', 'Identificação e organização dos circuitos', 'Verificação de disjuntores, DR, DPS e barramentos', 'Relatório das adequações recomendadas'],
      benefits: [
        { title: 'Circuitos identificados', description: 'A organização facilita a manutenção e o desligamento seguro de cada circuito.', icon: 'fas fa-list' },
        { title: 'Proteção compatível', description: 'Os dispositivos são avaliados em relação às cargas, aos cabos e ao padrão da instalação.', icon: 'fas fa-shield-alt' }
      ],
      process: [
        { title: 'Diagnóstico', description: 'Levantamento dos circuitos, cargas, aquecimentos e espaço disponível.' },
        { title: 'Plano de adequação', description: 'Definição dos componentes e da sequência de intervenção.' },
        { title: 'Execução', description: 'Montagem, identificação, testes e entrega das orientações.' }
      ],
      faq: [
        { question: 'Quando é necessário trocar o quadro de distribuição?', answer: 'A troca pode ser indicada por falta de espaço, aquecimento, componentes incompatíveis, corrosão ou dificuldade de manutenção. A decisão depende da vistoria.' },
        { question: 'O quadro pode receber novos circuitos?', answer: 'Sim, se houver espaço e capacidade compatíveis. A equipe avalia a carga, os cabos, a proteção e o balanceamento antes de ampliar.' },
        { question: 'Vocês identificam os disjuntores do quadro?', answer: 'A identificação dos circuitos pode fazer parte do escopo e é registrada conforme o que for possível confirmar durante a inspeção.' }
      ]
    },
    'fiacao-cabeamento': {
      label: 'Fiação e Cabeamento',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/fiacao-cabeamento.webp',
      icon: 'fa-route',
      subtitle: 'REDE ELÉTRICA E INFRAESTRUTURA',
      introText: 'Revisão, substituição e organização de fiação elétrica antiga ou inadequada, com avaliação de cabos, caminhos e proteções.',
      plainLanguage: '<p>A fiação pode perder desempenho por aquecimento, umidade, emendas ou dimensionamento inadequado. O diagnóstico localiza os trechos críticos e verifica o que precisa ser corrigido.</p><p>A troca é planejada por circuito para reduzir interrupções e manter a instalação organizada durante a execução.</p>',
      summary: 'Instalação e reparo de fiação antichama NBR 5410.',
      bairros: 'Atendimento estadual',
      painPoint: 'Revisão e substituição de fiações elétricas antigas ou inadequadas.',
      cta: 'Solicitar troca de fiação.',
      finalCtaTitle: 'Revise a fiação da sua instalação',
      whatsIncluded: ['Inspeção de cabos, emendas e caminhos aparentes', 'Identificação de aquecimento, sobrecarga ou isolamento comprometido', 'Substituição dos trechos previstos no escopo', 'Testes e organização após a intervenção'],
      benefits: [
        { title: 'Diagnóstico por circuito', description: 'A equipe separa os problemas por trecho e prioridade para orientar a proposta.', icon: 'fas fa-search' },
        { title: 'Execução organizada', description: 'A troca segue uma sequência definida para preservar a segurança e o funcionamento possível do imóvel.', icon: 'fas fa-route' }
      ],
      process: [
        { title: 'Inspeção', description: 'Leitura dos cabos, emendas, conduítes e sinais de aquecimento.' },
        { title: 'Dimensionamento', description: 'Definição da seção, do tipo de cabo e das proteções para cada circuito.' },
        { title: 'Substituição e teste', description: 'Troca dos trechos contratados, testes e identificação dos circuitos.' }
      ],
      faq: [
        { question: 'Como saber se a fiação da casa precisa ser trocada?', answer: 'Aquecimento, cheiro de queimado, desarmes frequentes, isolamento ressecado e emendas improvisadas são sinais para solicitar uma inspeção.' },
        { question: 'A troca de fiação exige quebrar paredes?', answer: 'Depende dos caminhos existentes e do estado dos conduítes. A vistoria indica o que pode ser aproveitado e onde haverá intervenção.' },
        { question: 'Vocês trocam a fiação de toda a casa de uma vez?', answer: 'O serviço pode ser dividido por circuito ou ambiente. O escopo e a sequência são definidos conforme o risco, a obra e a disponibilidade do cliente.' }
      ]
    },
    'ar-condicionado': {
      label: 'Ar Condicionado',
      category: 'eletrica',
      template: 'servicos/detalhe-servico',
      heroImage: '/img/eletrica/ar-condicionado.webp',
      icon: 'fa-snowflake',
      subtitle: 'INFRAESTRUTURA ELÉTRICA PARA CLIMATIZAÇÃO',
      introText: 'Preparação de circuitos e pontos elétricos para aparelhos de ar-condicionado, considerando potência, distância, proteção e local de instalação.',
      plainLanguage: '<p>O aparelho de ar-condicionado precisa de um ponto elétrico compatível com a potência e a tensão do modelo. Avaliamos o quadro, o caminho dos cabos e o local do equipamento.</p><p>O serviço pode preparar um ponto novo, adequar o circuito ou corrigir uma instalação que desarma e aquece. A parte de gás e drenagem deve ser confirmada separadamente.</p>',
      summary: 'Infraestrutura elétrica para climatização residencial.',
      bairros: 'Atendimento estadual',
      painPoint: 'Preparação de rede e infraestrutura elétrica para aparelhos de ar-condicionado.',
      cta: 'Solicitar infraestrutura de clima.',
      finalCtaTitle: 'Prepare o ponto elétrico do ar-condicionado',
      whatsIncluded: ['Avaliação da potência e da tensão do equipamento', 'Dimensionamento de circuito e proteção dedicada', 'Passagem ou adequação dos cabos até o ponto', 'Testes e orientação para a instalação do aparelho'],
      benefits: [
        { title: 'Ponto compatível', description: 'A infraestrutura é calculada conforme potência, distância e condições do quadro.', icon: 'fas fa-snowflake' },
        { title: 'Proteção do circuito', description: 'A proposta considera disjuntor, cabos e organização necessários para o equipamento.', icon: 'fas fa-shield-alt' }
      ],
      process: [
        { title: 'Levantamento', description: 'Conferência do modelo, da distância, do quadro e do local do aparelho.' },
        { title: 'Dimensionamento', description: 'Definição do circuito, dos cabos e das proteções compatíveis.' },
        { title: 'Preparação e teste', description: 'Execução do ponto, conferência das conexões e teste de funcionamento elétrico.' }
      ],
      faq: [
        { question: 'Ar-condicionado precisa de circuito dedicado?', answer: 'Em muitos casos, sim. A necessidade depende da potência, da tensão, da distância e da capacidade do quadro existente.' },
        { question: 'A Klyfe instala o aparelho de ar-condicionado?', answer: 'O foco desta página é a infraestrutura elétrica. A instalação do equipamento e os serviços de refrigeração devem ser confirmados no escopo da proposta.' },
        { question: 'É possível preparar o ponto antes de comprar o aparelho?', answer: 'Sim, desde que a potência e a tensão estimadas sejam informadas. A escolha final do equipamento pode exigir conferência antes da energização.' }
      ]
    },
    'carregador-veicular': {
      label: 'Instalação de Wallbox',
      category: 'eletrica',
      template: 'carregador-veicular',
      heroImage: '/img/wallbox/wallbox-hero-dusk.webp',
      icon: 'fa-charging-station',
      summary: 'Instalação de carregador veicular para casas, condomínios e empresas.',
      bairros: 'Atendimento em todo o estado',
      serviceContext: '<p>A solução é dimensionada a partir do veículo, do carregador, da distância até o ponto de recarga e da capacidade disponível no imóvel.</p>',
      painPoint: 'Ponto de recarga seguro e compatível com a instalação elétrica.',
      cta: 'Solicitar instalação de Wallbox.'
    },
    'wallbox-residencial': {
      label: 'Instalação de Wallbox Residencial',
      category: 'eletrica',
      template: 'wallbox-residencial',
      heroImage: '/img/wallbox/wallbox-casa.webp',
      icon: 'fa-house-chimney',
      summary: 'Instalação de carregador veicular Wallbox em residências com circuito dedicado e segurança elétrica.',
      bairros: 'Atendimento em residências e condomínios horizontais em todo o estado',
      serviceContext: '<p>Avaliação da capacidade do padrão Energisa, quadro de distribuição, cabeamento dedicado e proteções DR Tipo A/B e DPS para recarga segura do seu veículo elétrico em casa.</p>',
      painPoint: 'Recarga rápida, segura e sem sobrecarga na fiação da residência.',
      cta: 'Solicitar instalação de Wallbox residencial.'
    },
    'wallbox-condominio': {
      label: 'Instalação de Wallbox em Condomínio',
      category: 'eletrica',
      template: 'wallbox-condominio',
      heroImage: '/img/wallbox/wallbox-condominio.webp',
      icon: 'fa-building',
      summary: 'Instalação de carregadores elétricos em condomínios com medição individualizada, prumada técnica e aprovação em assembleia.',
      bairros: 'Atendimento a condomínios verticais e horizontais em todo o estado',
      serviceContext: '<p>Soluções completas para vagas privativas e rotativas em condomínios: projeto elétrico com ART, medição individual homologada pelo Inmetro, gestão de carga e assessoria para síndicos.</p>',
      painPoint: 'Instalação regularizada, rateio justo de energia e segurança contra riscos de incêndio na garagem coletiva.',
      cta: 'Solicitar projeto de Wallbox para condomínio.'
    },
    'wallbox-empresa': {
      label: 'Instalação de Wallbox para Empresas',
      category: 'eletrica',
      template: 'wallbox-empresa',
      heroImage: '/img/wallbox/wallbox-empresa.webp',
      icon: 'fa-briefcase',
      summary: 'Estações de recarga veicular para empresas, frotas comerciais, estacionamentos, hotéis e centros de saúde.',
      bairros: 'Atendimento corporativo e comercial em toda a Paraíba e região',
      serviceContext: '<p>Infraestrutura de recarga corporativa com protocolo OCPP 1.6/2.0.1, controle de acesso por RFID/aplicativo, totens de alta potência e estudo de demanda de transformador/subestação.</p>',
      painPoint: 'Eletrificação de frota com eficiência, valorização do negócio e atração de clientes com veículos elétricos.',
      cta: 'Solicitar projeto de recarga corporativa.'
    },
    'wallbox-energia-solar': {
      label: 'Wallbox com Energia Solar',
      category: 'eletrica',
      template: 'wallbox-energia-solar',
      heroImage: '/img/wallbox/wallbox-com-energia-solar.webp',
      icon: 'fa-solar-panel',
      summary: 'Integração entre geração fotovoltaica e carregador Wallbox conforme o consumo e a infraestrutura do imóvel.',
      bairros: 'Atendimento para projetos integrados residencial, comercial e rural em todo o estado',
      serviceContext: '<p>Combine geração solar e recarga veicular com avaliação do consumo, da capacidade elétrica e dos recursos de controle compatíveis.</p>',
      painPoint: 'Planejar a recarga com os dados de geração e consumo do imóvel, sem prometer custo por quilômetro universal.',
      cta: 'Solicitar integração Solar + Wallbox.'
    },
    'projeto-rede': {
      label: 'Redes, Telefonia & Antenas',
      category: 'eletrica',
      template: 'projeto-rede',
      heroImage: '/img/eletrica/projeto-rede.webp',
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
        answer: 'A automação pode reduzir desperdícios e melhorar o controle de climatização e iluminação, mas o resultado depende do perfil de uso, dos equipamentos e das regras configuradas no projeto.'
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
