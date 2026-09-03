/**
 * Páginas SEO de captura — Energia Solar (Segmentos + Cidades do Eixo PB-RN-PE).
 * Copy longa, única, orientada a keyword, conversão e autoridade semântica.
 */

const segments = {
  residencial: {
    slug: 'residencial',
    label: 'Residencial',
    urlPath: '/energia-solar/residencial/',
    h1: 'Energia Solar para Casas e Apartamentos',
    h2Body: 'Transforme o sol do Nordeste em geração própria para sua família.',
    eyebrow: 'SOLAR RESIDENCIAL · NORDESTE',
    title: 'Energia Solar Residencial | Klyfe Electric',
    description: 'Energia solar residencial com análise de consumo, projeto, ART, instalação e acompanhamento da conexão na distribuidora. Solicite um estudo.',
    intro: 'Um sistema de energia solar residencial pode reduzir a parcela compensável da fatura, mas o resultado depende do consumo, do telhado, da geração e das cobranças aplicáveis. A Klyfe dimensiona o projeto a partir dos dados do imóvel e apresenta as premissas da estimativa.',
    stats: [
      { value: 'Fatura', label: 'Consumo Analisado' },
      { value: 'Cenários', label: 'Payback Calculado' },
      { value: 'Fabricante', label: 'Garantias Documentadas' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Bandeiras tarifárias imprevisíveis',
        text: 'Bandeira amarela e vermelha encarecem a fatura de um mês para o outro. Com geração solar própria, você fixa seu custo energético.'
      },
      {
        title: 'Uso intenso de ar-condicionado',
        text: 'No calor do Nordeste, o ar-condicionado é essencial. A energia solar gera o pico de eletricidade justamente nos horários mais quentes do dia.'
      },
      {
        title: 'Investimento incorporado ao imóvel',
        text: 'Imóveis com usina solar fotovoltaica instalada têm valor de mercado superior e maior liquidez para venda ou locação.'
      }
    ],
    benefits: [
      'Projeto elétrico sob medida com emissão de ART',
      'Estruturas de fixação em alumínio resistentes a intempéries e maresia',
      'Homologação completa na distribuidora de energia',
      'Aplicativo de monitoramento em tempo real no celular',
      'Orientação para comparar financiamento, economia estimada e custo total'
    ],
    processSteps: [
      { title: 'Estudo Grátis', text: 'Análise da sua fatura e cálculo da quantidade de placas necessárias.' },
      { title: 'Projeto & ART', text: 'Engenheiro desenvolve o projeto elétrico e emite a ART no CREA.' },
      { title: 'Instalação', text: 'Montagem limpa e segura por equipe treinada em NR-10 e NR-35.' },
      { title: 'Homologação', text: 'Protocolo na concessionária até a ativação do medidor bidirecional.' }
    ],
    kWpRange: '3 a 12 kWp',
    paybackHint: 'calculado para o consumo e investimento',
    bodyHtml: `
      <p>A <strong>energia solar residencial</strong> é uma das decisões financeiras mais inteligentes para famílias no Nordeste. Graças ao alto índice de irradiação solar da nossa região, os painéis solares residenciais geram mais kWh por metro quadrado do que na média nacional.</p>
      <p>A Klyfe Electric cuida de todas as etapas: dimensionamos os módulos de acordo com o consumo da sua família, instalamos com suporte apropriado para o seu telhado (cerâmico, fibrocimento ou laje) e realizamos toda a homologação burocrática na concessionária.</p>
      <p>O projeto considera as regras aplicáveis da Lei 14.300, o autoconsumo e a energia compensada. O retorno é apresentado por cenários e não como prazo garantido.</p>
    `,
    faq: [
      {
        question: 'Energia solar residencial funciona em apartamento?',
        answer: 'Sim! Se você mora em apartamento, é possível instalar a usina solar no telhado do condomínio (se aprovado em assembleia) ou produzir energia em um imóvel próprio/terreno e transferir os créditos para a fatura do seu apartamento.'
      },
      {
        question: 'O que acontece em dias de chuva ou à noite?',
        answer: 'Em dias nublados ou chuvosos o sistema continua gerando em menor intensidade. À noite, sua casa utiliza a energia da rede elétrica tradicional, abatendo os créditos acumulados durante o dia.'
      },
      {
        question: 'Quanto espaço preciso no telhado para instalar as placas solares?',
        answer: 'Em média, cada módulo fotovoltaico ocupa cerca de 2,2 m². Um sistema residencial padrão de 4 a 6 kWp necessita de aproximadamente 20 a 30 m² de área útil sem sombras.'
      }
    ],
    ctaTitle: 'Descubra quanto sua casa pode economizar com energia solar.',
    ctaSubtitle: 'Peça um estudo de viabilidade gratuito e sem compromisso.',
    relatedSegments: ['condominios', 'comercial', 'fazendas-e-irrigacao'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn']
  },

  comercial: {
    slug: 'comercial',
    label: 'Comercial',
    urlPath: '/energia-solar/comercial/',
    h1: 'Energia Solar para Empresas e Comércios',
    h2Body: 'Pare de financiar a concessionária. Comece a financiar o próprio lucro.',
    eyebrow: 'SOLAR CORPORATIVO · NORDESTE',
    title: 'Energia Solar Comercial | Klyfe Electric',
    description: 'Energia solar para empresas com análise da curva de carga, demanda, projeto, ART, instalação e conexão. Avalie economia e retorno por cenários.',
    intro: 'Para empresas, a energia solar pode reduzir parte do custo de energia e transformar investimento em capacidade própria de geração. O dimensionamento parte da curva de carga, da modalidade tarifária e das condições do imóvel; retorno e economia são estimados por cenários.',
    stats: [
      { value: 'Curva de carga', label: 'Consumo Analisado' },
      { value: 'Cenários', label: 'Payback B2B' },
      { value: '15–500+ kWp', label: 'porte comercial/industrial' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Demanda contratada elevando a fatura',
        text: 'Analisamos o histórico de consumo e perfil diurno para dimensionar a usina sem sobrecarregar a estrutura nem deixar economia na mesa.'
      },
      {
        title: 'Regras da Lei 14.300 e Fio B',
        text: 'Simulamos o ROI considerando as tarifas vigentes e as regras de compensação da distribuidora local com números transparentes.'
      },
      {
        title: 'Instalação sem interrupção das atividades',
        text: 'Trabalhamos com cronograma flexível para que a montagem no telhado do galpão ou loja não paralise a rotina da sua empresa.'
      }
    ],
    benefits: [
      'Estudo de viabilidade técnica e financeira completo com VPL e TIR',
      'Dimensionamento otimizado para tarifação de baixa ou média tensão (Grupo A/B)',
      'Homologação burocrática acelerada junto à concessionária',
      'Monitoramento remoto da usina com alertas no celular',
      'Orientação para financiamento via linhas de crédito B2B / ESG'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise detalhada das faturas de energia e levantamento da estrutura do imóvel.' },
      { title: 'Engenharia', text: 'Dimensionamento elétrico, desenho dos arranjos e emissão da ART no CREA.' },
      { title: 'Instalação', text: 'Execução segura por equipes treinadas sem prejudicar a operação comercial.' },
      { title: 'Ativação', text: 'Acompanhamento da vistoria e da troca do medidor pela distribuidora para ativação dos créditos.' }
    ],
    kWpRange: '15 a 500+ kWp',
    paybackHint: 'calculado para a operação da empresa',
    bodyHtml: `
      <p>A <strong>energia solar para empresas</strong> é uma decisão estratégica de gestão financeira. No Nordeste, a irradiação abundante faz com que os sistemas fotovoltaicos comerciais entreguem um custo nivelado de energia (LCOE) extremamente baixo.</p>
      <p>A Klyfe Electric desenvolve projetos para escritórios, lojas, galpões de distribuição e prestadores de serviço. Avaliamos a viabilidade de instalação no telhado ou em solo, a inclusão de múltiplas unidades consumidoras sob o mesmo CNPJ e as regras de compensação de créditos.</p>
      <p>O setor financeiro recebe as premissas de geração, economia e fluxo de caixa para comparar cenários. O payback é uma estimativa e varia com investimento, tarifa, operação e custo de capital.</p>
    `,
    faq: [
      {
        question: 'Energia solar comercial ainda vale a pena com a cobrança do Fio B?',
        answer: 'Com certeza. Empresas possuem perfil de consumo predominantemente diurno, usufruindo do autoconsumo direto no momento da geração e minimizando o impacto das regras de injeção na rede.'
      },
      {
        question: 'Posso utilizar uma única usina para abater a conta de várias filiais?',
        answer: 'Sim, desde que as filiais estejam sob o mesmo CNPJ (ou CNPJ raiz) e dentro da área de concessão da mesma distribuidora de energia.'
      },
      {
        question: 'Qual o tempo médio de instalação para um sistema comercial?',
        answer: 'Sistemas comerciais de médio porte levam entre 3 e 10 dias úteis para instalação física, sem interferir no atendimento ao cliente.'
      }
    ],
    ctaTitle: 'Solicite um estudo de ROI para sua empresa.',
    ctaSubtitle: 'Análise técnica e financeira sem compromisso para seu negócio.',
    relatedSegments: ['supermercados', 'hospitais-e-clinicas', 'postos-de-combustivel', 'industrial'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  industrial: {
    slug: 'industrial',
    label: 'Industrial',
    urlPath: '/energia-solar/industrial/',
    h1: 'Energia Solar para Indústrias',
    h2Body: 'Reduza o custo de produção com engenharia solar de alta potência.',
    eyebrow: 'SOLAR INDUSTRIAL · NORDESTE',
    title: 'Energia Solar Industrial | Klyfe Electric',
    description: 'Energia solar para indústrias e fábricas no Nordeste. Usinas solares de alta potência em média e alta tensão com ART, comissionamento e ROI robusto.',
    intro: 'Na indústria, a eletricidade é insumo direto de produção. Variações tarifárias e custos de demanda contratada impactam diretamente a margem do produto final. A energia solar industrial oferece previsibilidade de custos e alta rentabilidade para fábricas e parques industriais.',
    stats: [
      { value: '50–1000+ kWp', label: 'Usinas de Alta Potência' },
      { value: 'Grupo A', label: 'Média / Alta Tensão' },
      { value: 'NBR 5410/16690', label: 'Rigor Técnico' },
      { value: 'Escopo', label: 'Engenharia Dedicada' }
    ],
    painPoints: [
      {
        title: 'Alto consumo em horários de ponta e fora de ponta',
        text: 'Estruturamos usinas que reduzem o consumo global da planta e otimizam o enquadramento tarifário industrial.'
      },
      {
        title: 'Exigências rigorosas de segurança do trabalho',
        text: 'O planejamento considera os requisitos aplicáveis de segurança e a integração exigida pela planta antes da execução.'
      },
      {
        title: 'Necessidade de relatórios de conformidade e ESG',
        text: 'Fornecemos dados auditáveis de geração de energia limpa e redução de emissões de CO2 para balanço de sustentabilidade.'
      }
    ],
    benefits: [
      'Projetos de minigeração distribuída sob medida para plantas industriais',
      'Análise de viabilidade em telhados metálicos, lajes ou usina de solo integrada',
      'Estudo detalhado de proteção elétrica, cabine primária e subestação de transformação',
      'Monitoramento de alta precisão com medição por string e análise de performance',
      'Documentação técnica completa para obtenção de parecer de acesso no Grupo A'
    ],
    processSteps: [
      { title: 'Auditoria Energética', text: 'Leitura das memórias de massa, faturas do Grupo A e visita técnica à fábrica.' },
      { title: 'Projeto de Minigeração', text: 'Desenvolvimento do projeto elétrico completo e integração à subestação.' },
      { title: 'Montagem Industrial', text: 'Instalação das estruturas, cabeamento de grande bitola e quadros de proteção.' },
      { title: 'Comissionamento', text: 'Testes de isolamento, parametrização de relés e sincronismo com a rede.' }
    ],
    kWpRange: '50 a 1000+ kWp',
    paybackHint: 'calculado com demanda e curva de carga',
    bodyHtml: `
      <p>A <strong>energia solar industrial</strong> exige engenharia de alto nível. Planta fábricas possuem motores elétricos, compressores e cargas indutivas pesadas que demandam dimensionamento elétrico preciso para evitar distorções harmônicas e queda de fator de potência.</p>
      <p>A Klyfe Electric projeta e executa usinas fotovoltaicas industriais integradas às subestações existentes da fábrica. Avaliamos a capacidade portante das estruturas de cobertura metálica e propomos soluções de montagem seguras e duradouras.</p>
      <p>Com uma usina solar industrial, sua empresa ganha competitividade no preço final dos produtos e atende às exigências de sustentabilidade dos grandes compradores.</p>
    `,
    faq: [
      {
        question: 'Indústrias do Grupo A (média tensão) podem instalar energia solar?',
        answer: 'Sim! Indústrias conectadas em média tensão podem instalar usinas de minigeração distribuída e abater a energia consumida nos postos tarifários conforme a regulamentação vigente.'
      },
      {
        question: 'A estrutura do galpão industrial suporta o peso das placas solares?',
        answer: 'Realizamos a verificação da capacidade de carga da estrutura metálica ou de concreto antes de qualquer instalação. O peso médio dos módulos fotovoltaicos é baixo (cerca de 10 a 12 kg/m²), sendo suportado pela grande maioria das estruturas industriais.'
      },
      {
        question: 'É possível instalar a usina solar no solo do terreno da fábrica?',
        answer: 'Sim, se a fábrica possuir área livre sem sombreamento, a usina de solo (ground mount) é uma excelente opção com facilidade de manutenção e inclinação ideal.'
      }
    ],
    ctaTitle: 'Fale com nossos engenheiros de energia industrial.',
    ctaSubtitle: 'Solicite um estudo de minigeração solar para sua fábrica.',
    relatedSegments: ['comercial', 'supermercados', 'fazendas-e-irrigacao'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'caruaru-pe']
  },

  supermercados: {
    slug: 'supermercados',
    label: 'Supermercados',
    urlPath: '/energia-solar/supermercados/',
    h1: 'Energia Solar para Supermercados e Redes de Varejo',
    h2Body: 'Geração solar dimensionada para o perfil de refrigeração do negócio.',
    eyebrow: 'SOLAR VAREJO · REFRIGERAÇÃO',
    title: 'Energia Solar para Supermercados | Klyfe Electric',
    description: 'Energia solar para supermercados, mercearias e atacadistas no Nordeste. Reduza o custo com ilhas de frio e ar-condicionado. Projeto e homologação.',
    intro: 'Supermercados e redes de varejo alimentício dependem de balcões refrigerados, câmaras frias e iluminação constante. A energia elétrica é um dos maiores custos operacionais do setor. A energia solar para supermercados gera eletricidade nos momentos de maior calor, aliviando o custo da refrigeração.',
    stats: [
      { value: 'Fatura', label: 'Economia Estimada' },
      { value: 'Perfil', label: 'Refrigeração Analisada' },
      { value: '20–300 kWp', label: 'Porte Típico de Varejo' },
      { value: 'ART', label: 'Projeto Registrado' }
    ],
    painPoints: [
      {
        title: 'Câmaras frias e balcões rodando 24 horas',
        text: 'A refrigeração comercial consome energia ininterruptamente. A energia solar cobre a demanda diurna e gera créditos para cobrir o consumo noturno.'
      },
      {
        title: 'Margens operacionais apertadas no varejo',
        text: 'Reduzir o custo fixo de energia aumenta diretamente a margem líquida de lucro sobre as vendas do supermercado.'
      },
      {
        title: 'Aproveitamento de grandes áreas de telhado',
        text: 'Coberturas amplas podem oferecer área para módulos, mas estrutura, sombras, equipamentos e acessos precisam ser descontados no levantamento.'
      }
    ],
    benefits: [
      'Dimensionamento técnico para carga pesada de refrigeração e climatização',
      'Estudo estrutural para fixação segura em telhados de grande vão livre',
      'Acompanhamento do processo de homologação na distribuidora',
      'Potencial de redução do custo operacional (OPEX) do supermercado',
      'Certificado de empresa sustentável para atração de clientes'
    ],
    processSteps: [
      { title: 'Levantamento', text: 'Análise das contas de luz, demanda contratada e medição da área de cobertura.' },
      { title: 'Engenharia', text: 'Projeto elétrico otimizado para o perfil de consumo do varejo alimentício.' },
      { title: 'Instalação', text: 'Montagem ágil sem impactar o fluxo de clientes na loja.' },
      { title: 'Ativação', text: 'Homologação e substituição do medidor para início dos créditos.' }
    ],
    kWpRange: '20 a 300 kWp',
    paybackHint: 'calculado para consumo e investimento',
    bodyHtml: `
      <p><strong>Energia solar para supermercados</strong> pode aproveitar parte do consumo diurno de refrigeração. A aderência entre geração e carga precisa ser medida, pois horários, sazonalidade e equipamentos variam entre operações.</p>
      <p>A Klyfe Electric analisa a curva de carga da loja e dimensiona um sistema capaz de suprir tanto o consumo diurno quanto gerar excedente de energia a ser injetado na rede elétrica para compensação noturna.</p>
      <p>Se o supermercado possuir filiais ou centro de distribuição, a energia gerada na matriz pode abater as faturas das demais lojas da rede.</p>
    `,
    faq: [
      {
        question: 'A instalação das placas no telhado exige fechar o supermercado?',
        answer: 'Não. A instalação ocorre inteiramente na parte externa (telhado e sala técnica de inversores), sem interromper a operação de vendas da loja.'
      },
      {
        question: 'Dá para abater a conta do centro de distribuição e de filiais menores?',
        answer: 'Sim! Se as faturas estiverem sob a mesma titularidade (CNPJ) e dentro da mesma concessionária, os créditos excedentes são distribuídos entre os imóveis da rede.'
      },
      {
        question: 'Como fica a garantia da instalação para o supermercado?',
        answer: 'Módulos, inversores e instalação possuem garantias diferentes. A proposta deve identificar fornecedor, prazo, cobertura, condições e responsável por cada garantia, sem usar um período único para todo o sistema.'
      }
    ],
    ctaTitle: 'Reduza o custo de energia do seu supermercado.',
    ctaSubtitle: 'Peça um estudo de viabilidade solar gratuito para sua loja.',
    relatedSegments: ['comercial', 'hospitais-e-clinicas', 'postos-de-combustivel', 'industrial'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  'hospitais-e-clinicas': {
    slug: 'hospitais-e-clinicas',
    label: 'Hospitais e Clínicas',
    urlPath: '/energia-solar/hospitais-e-clinicas/',
    h1: 'Energia Solar para Hospitais, Clínicas e Laboratórios',
    h2Body: 'Climatização, equipamentos de diagnóstico e operação contínua sob controle.',
    eyebrow: 'SOLAR SAÚDE · NORDESTE',
    title: 'Energia Solar para Hospitais e Clínicas | Klyfe Electric',
    description: 'Energia solar para hospitais, clínicas médicas e laboratórios no Nordeste. Economia com climatização e equipamentos críticos com projeto engenheirado.',
    intro: 'Unidades de saúde consomem energia de forma intensa: sistemas de climatização (HVAC) ininterruptos, equipamentos de imagem, autoclaves e laboratórios. A energia solar para hospitais e clínicas reduz drasticamente este custo fixo, permitindo reinvestir recursos na melhoria do atendimento aos pacientes.',
    stats: [
      { value: '8–150 kWp', label: 'Porte Clínico / Hospitalar' },
      { value: 'Sob medida', label: 'Análise de Retorno' },
      { value: 'ART', label: 'Responsabilidade Técnica' },
      { value: 'Diurno', label: 'Perfil Ideal de Geração' }
    ],
    painPoints: [
      {
        title: 'Ar-condicionado e climatização contínua',
        text: 'Salas de cirurgia, exames e recepções exigem conforto térmico ininterrupto, gerando contas de luz elevadas.'
      },
      {
        title: 'Rigor com segurança elétrica e continuidade',
        text: 'O projeto solar considera a interface com geradores e nobreaks existentes, sem substituir os sistemas de emergência responsáveis pelas cargas hospitalares.'
      },
      {
        title: 'Instalação silenciosa sem incomodar pacientes',
        text: 'Planejamos a execução física da obra com isolamento de áreas e horários adequados à rotina de atendimento de saúde.'
      }
    ],
    benefits: [
      'Dimensionamento específico para cargas clínicas e de diagnóstico por imagem',
      'Integração segura com sistemas de apoio elétrico (geradores a diesel / nobreaks)',
      'Projeto assinado por engenheiros eletricistas com emissão de ART',
      'Homologação regulatória completa na concessionária local',
      'Fortalecimento da imagem institucional como centro de saúde sustentável'
    ],
    processSteps: [
      { title: 'Auditoria de Cargas', text: 'Análise técnica da fatura, demanda e rotina dos equipamentos médicos.' },
      { title: 'Projeto Especial', text: 'Desenvolvimento do arranjo solar respeitando regras de vigilância e engenharia.' },
      { title: 'Instalação Limpa', text: 'Montagem por técnicos treinados em ambiente hospitalar/clínico.' },
      { title: 'Conexão', text: 'Vistoria, substituição do medidor e início da economia mensal.' }
    ],
    kWpRange: '8 a 150 kWp',
    paybackHint: 'calculado conforme consumo, demanda, tarifa e investimento',
    bodyHtml: `
      <p><strong>Energia solar para hospitais e clínicas</strong> pode reduzir custos e apoiar metas socioambientais. Quando parte da demanda por climatização ocorre durante o período de sol, a geração pode ser consumida no próprio imóvel e reduzir a energia importada da rede.</p>
      <p>A Klyfe Electric projeta sistemas seguros que não interferem nos circuitos sensíveis de emergência da instituição. Avaliamos a área de cobertura de lajes e telhados para maximizar a captação solar por metro quadrado.</p>
      <p>Além disso, o monitoramento e a manutenção ajudam a identificar desvios de geração e a acompanhar a disponibilidade da usina ao longo do ano.</p>
    `,
    faq: [
      {
        question: 'O sistema de energia solar substitui o gerador a diesel do hospital?',
        answer: 'Não. O sistema solar on-grid opera conectado à rede elétrica para gerar economia na conta de luz. Em caso de falta de energia na rede pública, o gerador a diesel continua sendo o responsável pela alimentação de emergência.'
      },
      {
        question: 'É possível instalar painéis solares em prédios de consultórios médicos?',
        answer: 'Sim! É possível instalar no telhado do edifício e distribuir os créditos de energia entre os consultórios integrantes do condomínio médico.'
      },
      {
        question: 'A instalação provoca ruídos que atrapalhem as consultas?',
        answer: 'A fixação das estruturas é realizada na cobertura do prédio com planejamento de horários para minimizar ruídos nas áreas de atendimento.'
      }
    ],
    ctaTitle: 'Reduza os custos de energia da sua clínica ou hospital.',
    ctaSubtitle: 'Solicite uma consultoria técnica de energia solar com nossos engenheiros.',
    relatedSegments: ['comercial', 'supermercados', 'hoteis-e-pousadas', 'escolas-e-faculdades'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  'hoteis-e-pousadas': {
    slug: 'hoteis-e-pousadas',
    label: 'Hotéis e Pousadas',
    urlPath: '/energia-solar/hoteis-e-pousadas/',
    h1: 'Energia Solar para Hotéis, Pousadas e Turismo',
    h2Body: 'Conforto para os hóspedes com custos operacionais sob controle.',
    eyebrow: 'SOLAR TURISMO · HOSPITALIDADE',
    title: 'Energia Solar para Hotéis e Pousadas | Klyfe Electric',
    description: 'Energia solar para hotéis, pousadas e resorts no Nordeste. Economize na conta de ar-condicionado e aquecimento de água. Projeto com homologação.',
    intro: 'No setor hoteleiro do Nordeste, o conforto térmico é indispensável: ar-condicionado em todas as suítes, iluminação de áreas comuns, bombeamento de piscinas e lavanderia. A energia solar para hotéis e pousadas reduz a conta de luz, amplia as margens do estabelecimento e atrai hóspedes que valorizam o turismo sustentável.',
    stats: [
      { value: 'Fatura', label: 'Análise do Consumo' },
      { value: '15–200 kWp', label: 'Porte Hoteleiro Típico' },
      { value: 'Cenários', label: 'Análise de Retorno' },
      { value: 'ESG', label: 'Indicadores de Sustentabilidade' }
    ],
    painPoints: [
      {
        title: 'Faturas elevadas na alta estação',
        text: 'Nos meses de maior ocupação, climatização e serviços elevam o consumo. A análise compara essa sazonalidade com a geração estimada mês a mês.'
      },
      {
        title: 'Custo de bombeamento de piscinas e lavanderia',
        text: 'Filtros de piscina e secadoras de roupas consomem muita energia. O sistema solar cobre essas cargas diurnas com facilidade.'
      },
      {
        title: 'Competitividade tarifária no turismo',
        text: 'Reduzir custos fixos permite oferecer tarifas mais competitivas sem abrir mão da margem de lucro da pousada.'
      }
    ],
    benefits: [
      'Estudo de viabilidade técnica considerando a sazonalidade de ocupação hoteleira',
      'Projeto elétrico assinado com ART e homologação junto à concessionária',
      'Instalação com cronograma discreto para não incomodar os hóspedes',
      'Monitoramento remoto da usina solar pelo celular',
      'Posicionamento de marketing ecológico e sustentável para o hotel'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise do histórico de consumo mensal e perfil de uso do hotel.' },
      { title: 'Projeto', text: 'Dimensionamento solar otimizado para o espaço disponível de cobertura.' },
      { title: 'Instalação', text: 'Execução discreta e organizada em horários combinados com a gerência.' },
      { title: 'Ativação', text: 'Acompanhamento da homologação e da troca de medidor pela distribuidora.' }
    ],
    kWpRange: '15 a 200 kWp',
    paybackHint: 'calculado conforme consumo, sazonalidade, tarifa e investimento',
    bodyHtml: `
      <p><strong>Energia solar para hotéis e pousadas</strong> é um investimento de alto impacto no setor hoteleiro nordestino. Com praias e paisagens ensolaradas durante quase todo o ano, os estabelecimentos do litoral e do interior podem transformar essa abundante luz solar em ativo financeiro.</p>
      <p>A Klyfe Electric desenvolve projetos para pousadas charmosas, hotéis urbanos e resorts. Avaliamos a viabilidade de instalação em telhados de chalés, lajes de prédios ou estruturas de solo integradas às áreas verdes do hotel.</p>
      <p>Além da possível redução de custos, o hotel pode comunicar seus indicadores de geração renovável com transparência, usando os dados do sistema em iniciativas próprias de sustentabilidade.</p>
    `,
    faq: [
      {
        question: 'O sistema fotovoltaico produz energia suficiente para o ar-condicionado de todos os quartos?',
        answer: 'O dimensionamento considera as faturas, a ocupação e as cargas de climatização. A capacidade de atendimento depende da área disponível, do perfil de consumo e da geração estimada para o endereço.'
      },
      {
        question: 'A instalação prejudica o silêncio dos hóspedes?',
        answer: 'Não. Alinhamos a montagem com a gerência para realizar trabalhos barulhentos nos horários de menor permanência de hóspedes nos quartos.'
      },
      {
        question: 'É possível financiar o sistema solar do hotel?',
        answer: 'Podem existir linhas de crédito para turismo ou projetos sustentáveis, sempre sujeitas à análise da instituição financeira. A comparação deve considerar CET, prazo, entrada e cenários de geração; a economia não é garantia de cobertura integral da parcela.'
      }
    ],
    ctaTitle: 'Transforme o sol no melhor aliado do seu hotel.',
    ctaSubtitle: 'Peça um estudo de viabilidade solar gratuito para sua pousada.',
    relatedSegments: ['comercial', 'hospitais-e-clinicas', 'supermercados', 'condominios'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  condominios: {
    slug: 'condominios',
    label: 'Condomínios',
    urlPath: '/energia-solar/condominios/',
    h1: 'Energia Solar para Condomínios Residenciais e Comerciais',
    h2Body: 'Reduza o custo de energia das áreas comuns com projeto dimensionado para o condomínio.',
    eyebrow: 'SOLAR CONDOMINIAL · NORDESTE',
    title: 'Energia Solar para Condomínios | Klyfe Electric',
    description: 'Energia solar para áreas comuns de condomínios no Nordeste. Reduza o custo com bombas, elevadores e iluminação com projeto e ART.',
    intro: 'A taxa de condomínio é fortemente impactada pelas despesas de energia elétrica das áreas comuns: elevadores, bombas de água e piscina, iluminação de garagens e portaria 24h. A energia solar para condomínios reduz esse custo fixo, evita aumentos na cota condominial e valoriza todos os apartamentos ou salas do empreendimento.',
    stats: [
      { value: 'Fatura', label: 'Análise das Áreas Comuns' },
      { value: '10–100 kWp', label: 'Porte Condominial' },
      { value: 'Cenários', label: 'Análise de Retorno' },
      { value: 'Assembleia', label: 'Material de Apoio' }
    ],
    painPoints: [
      {
        title: 'Cota condominial subindo devido à tarifa de energia',
        text: 'A energia solar pode reduzir a parcela de consumo compensável das áreas comuns. A proposta também informa as cobranças que podem permanecer na fatura.'
      },
      {
        title: 'Aprovação em assembleia de moradores',
        text: 'Fornecemos apresentação executiva com estudo de ROI claro para ajudar o síndico a apresentar a proposta aos condôminos.'
      },
      {
        title: 'Rateio de créditos entre os apartamentos',
        text: 'Estruturamos a modalidade de Geração Compartilhada ou Empreendimento de Múltiplas Unidades Consumidoras conforme regras da ANEEL.'
      }
    ],
    benefits: [
      'Estudo técnico e financeiro formatado para apresentação em assembleias condominiais',
      'Potencial de redução do custo de energia de elevadores, bombas e iluminação comum',
      'Possibilidade de rateio de créditos solares excedentes entre os condôminos',
      'Instalação com total respeito às normas de segurança do condomínio',
      'Projetos com ART e homologação junto à concessionária de energia'
    ],
    processSteps: [
      { title: 'Vistoria Técnica', text: 'Inspeção do telhado/laje do prédio e análise das faturas da área comum.' },
      { title: 'Proposta para Assembleia', text: 'Elaboração de material gráfico com simulação de parcelas e economia.' },
      { title: 'Instalação', text: 'Execução segura por equipes certificadas em trabalho em altura.' },
      { title: 'Homologação', text: 'Ativação do medidor bidirecional e início da redução da taxa condominial.' }
    ],
    kWpRange: '10 a 100 kWp',
    paybackHint: 'calculado conforme consumo das áreas comuns, tarifa e investimento',
    bodyHtml: `
      <p>A <strong>energia solar para condomínios</strong> é uma alternativa para síndicos e administradoras que buscam eficiência na gestão financeira. O sistema pode compensar parte do consumo das áreas comuns, conforme demanda, geração estimada, área disponível e regras aplicáveis.</p>
      <p>A Klyfe Electric orienta o síndico em todo o processo: preparamos o estudo de viabilidade, participamos das reuniões explicativas e definimos a solução de fixação depois de avaliar estrutura e impermeabilização da cobertura.</p>
      <p>Além disso, sob as regras da Resolução ANEEL, é possível criar um sistema onde o excedente gerado no topo do prédio seja rateado proporcionalmente na fatura particular de cada apartamento.</p>
    `,
    faq: [
      {
        question: 'Qual o quórum necessário na assembleia para aprovar a instalação de energia solar no condomínio?',
        answer: 'O quórum depende do escopo da obra, da convenção e das circunstâncias do condomínio. O síndico deve validar a regra aplicável com a administradora ou assessoria jurídica antes da votação.'
      },
      {
        question: 'A instalação das placas no topo do prédio danifica a impermeabilização da laje?',
        answer: 'A solução depende da estrutura e da impermeabilização existentes. A vistoria define se serão usados contrapesos, fixadores ou outra técnica, com os cuidados e responsabilidades descritos na proposta.'
      },
      {
        question: 'O condomínio pode financiar a instalação solar?',
        answer: 'Podem existir linhas de crédito para condomínios, sujeitas à análise financeira e às aprovações internas. É necessário comparar CET, prazo e parcelas com cenários conservadores de economia.'
      }
    ],
    ctaTitle: 'Apresente uma solução de economia ao seu condomínio.',
    ctaSubtitle: 'Solicite uma proposta técnica da Klyfe para a próxima assembleia.',
    relatedSegments: ['residencial', 'comercial', 'hospitais-e-clinicas', 'escolas-e-faculdades'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  'fazendas-e-irrigacao': {
    slug: 'fazendas-e-irrigacao',
    label: 'Fazendas e Irrigação',
    urlPath: '/energia-solar/fazendas-e-irrigacao/',
    h1: 'Energia Solar para Fazendas, Bombeamento e Irrigação',
    h2Body: 'Irrigação, galpões e sede com a energia abundante do sol do Sertão.',
    eyebrow: 'SOLAR RURAL · SEMIÁRIDO',
    title: 'Energia Solar para Fazendas e Irrigação | Klyfe',
    description: 'Energia solar para fazendas, irrigação e agronegócio no Nordeste. Sistemas on-grid, off-grid e bombeamento solar com engenharia Klyfe.',
    intro: 'No agronegócio do Nordeste, o custo da energia para irrigação e bombeamento de água pesa no bolso do produtor rural. A energia solar para fazendas aproveita a irradiação do semiárido para atender cargas agrícolas e reduzir a parcela compensável da fatura rural.',
    stats: [
      { value: '5–150 kWp', label: 'Porte Rural Típico' },
      { value: 'Cenários', label: 'Análise de Retorno' },
      { value: 'On / Off / Híbrido', label: 'Sistemas Flexíveis' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Bombas de irrigação pesando na tarifa rural',
        text: 'Dimensionamos o sistema fotovoltaico para cobrir os picos de bombeamento solar e irrigação em lavouras e pastagens.'
      },
      {
        title: 'Rede elétrica rural instável ou distante',
        text: 'Oferecemos soluções on-grid para áreas atendidas e sistemas off-grid ou híbridos com baterias para locais isolados.'
      },
      {
        title: 'Poeira e intempéries do sertão',
        text: 'Utilizamos estruturas reforçadas e orientamos o plano de limpeza e manutenção adequado para o clima da região.'
      }
    ],
    benefits: [
      'Projetos para irrigação por gotejamento/pivô, galpões de avicultura, laticínios e sede',
      'Opções de usinas de solo (ground mount) ou instalação em telhados rurais',
      'Integração com inversor de frequência para bombeamento direto',
      'Suporte para linhas de financiamento rural (FNE Sol / Pronaf / Plano Safra)',
      'Monitoramento remoto da usina via celular de qualquer lugar'
    ],
    processSteps: [
      { title: 'Levantamento Rural', text: 'Análise da demanda das bombas, perfil de irrigação e estrutura da propriedade.' },
      { title: 'Dimensionamento', text: 'Cálculo da potência solar ideal para suprir as cargas agrícolas.' },
      { title: 'Instalação no Campo', text: 'Fixação de estruturas de solo ou telhado com aterramento e proteções.' },
      { title: 'Conexão', text: 'Homologação na distribuidora ou comissionamento do sistema off-grid.' }
    ],
    kWpRange: '5 a 150 kWp',
    paybackHint: 'calculado conforme cargas, operação, tarifa e investimento',
    bodyHtml: `
      <p>A <strong>energia solar para fazendas</strong> no Nordeste pode atender cargas produtivas em uma região de boa disponibilidade solar. O estudo relaciona a geração estimada com a rotina de irrigação, bombeamento e outras cargas da propriedade.</p>
      <p>A Klyfe Electric atende produtores rurais de pequeno, médio e grande porte. Projetamos usinas fotovoltaicas no solo ou em galpões agrícolas que cobrem o consumo de bombas de água, cercas elétricas, resfriadores de leite, aviários e residências rurais.</p>
      <p>Trabalhamos com seriedade técnica: entregamos projeto elétrico com ART e especificamos aterramento e proteções conforme as condições levantadas para o sistema.</p>
    `,
    faq: [
      {
        question: 'É possível acionar bombas de irrigação diretamente com energia solar?',
        answer: 'Sim! Utilizamos inversores drive de bombeamento solar que alimentam motores e bombas trifásicas/monofásicas diretamente a partir dos painéis solares.'
      },
      {
        question: 'O produtor rural tem desconto no financiamento solar?',
        answer: 'Podem existir linhas de crédito rural para energia, sujeitas às condições vigentes e à análise da instituição financeira. Compare CET, garantias, prazo e carência antes da contratação.'
      },
      {
        question: 'E se a fazenda não tiver rede elétrica da concessionária?',
        answer: 'Nesse caso, avaliamos sistema off-grid com baterias ou bombeamento solar direto. A autonomia depende das cargas, da disponibilidade solar, do armazenamento e das margens adotadas no projeto.'
      }
    ],
    ctaTitle: 'Leve energia solar para a sua propriedade rural.',
    ctaSubtitle: 'Solicite um estudo gratuito de bombeamento e energia para sua fazenda.',
    relatedSegments: ['comercial', 'industrial', 'residencial'],
    relatedCities: ['campina-grande-pb', 'caruaru-pe', 'mossoro-rn', 'joao-pessoa-pb']
  },

  postos: {
    slug: 'postos-de-combustivel',
    label: 'Postos de Combustível',
    urlPath: '/energia-solar/postos-de-combustivel/',
    h1: 'Energia Solar para Postos de Combustível e Conveniência',
    h2Body: 'Pistas iluminadas, compressores e lojas de conveniência sem susto na conta.',
    eyebrow: 'SOLAR AUTOMOTIVO · CONVENIÊNCIA',
    title: 'Energia Solar para Postos de Combustível | Klyfe',
    description: 'Energia solar para postos de combustível, lavajatos e lojas de conveniência no Nordeste. Aproveite a cobertura da pista para gerar energia limpa.',
    intro: 'Postos de combustível operam em regime intensivo: iluminação potente da cobertura da pista, compressores de ar, lavajato e refrigeração 24h das lojas de conveniência. A energia solar para postos de combustível aproveita a grande área da cobertura da pista para gerar eletricidade e reduzir o custo operacional do posto.',
    stats: [
      { value: 'Fatura', label: 'Análise do Consumo' },
      { value: '15–100 kWp', label: 'Porte Típico em Postos' },
      { value: 'Cenários', label: 'Análise de Retorno' },
      { value: 'ART', label: 'Responsabilidade Técnica' }
    ],
    painPoints: [
      {
        title: 'Iluminação forte de pista e conveniência rodando 24h',
        text: 'A iluminação de segurança e as geladeiras da conveniência representam faturas elevadas mês a mês.'
      },
      {
        title: 'Cuidados com estrutura metálica da pista',
        text: 'Dimensionamos os fixadores no telhado metálico da cobertura da pista sem comprometer a estrutura existente.'
      },
      {
        title: 'Margens operacionais pressionadas nos combustíveis',
        text: 'A economia gerada pela usina solar reduz os custos fixos do posto, aumentando a rentabilidade líquida do empresário.'
      }
    ],
    benefits: [
      'Aproveitamento inteligente da área da cobertura da pista de abastecimento',
      'Projeto elétrico assinado por engenheiros com emissão de ART',
      'Homologação burocrática completa na concessionária de energia local',
      'Monitoramento em tempo real do sistema fotovoltaico pelo smartphone',
      'Instalação limpa com cumprimento rigoroso de normas de segurança'
    ],
    processSteps: [
      { title: 'Estudo Técnico', text: 'Análise do consumo do posto, loja de conveniência e estrutura da cobertura.' },
      { title: 'Projeto com ART', text: 'Dimensionamento solar com proteção elétrica dedicada contra surtos.' },
      { title: 'Instalação', text: 'Montagem ágil sem interromper o fluxo de abastecimento dos clientes.' },
      { title: 'Ativação', text: 'Acompanhamento da homologação e da substituição do medidor pela distribuidora.' }
    ],
    kWpRange: '15 a 100 kWp',
    paybackHint: 'calculado conforme consumo, tarifa, área e investimento',
    bodyHtml: `
      <p>A <strong>energia solar para postos de combustível</strong> é uma das aplicações comerciais mais eficientes no setor automotivo e de varejo. A cobertura da pista de abastecimento oferece uma ampla área plana ou com inclinação suave, perfeitamente posicionada para a captação de radiação solar.</p>
      <p>A Klyfe Electric desenvolve projetos respeitando todas as exigências técnicas das distribuidoras de energia e normas de segurança. A energia gerada pela cobertura supre a iluminação da pista, as bombas de combustível, os compressores de ar e as geladeiras da loja de conveniência.</p>
      <p>Quando há outras unidades consumidoras elegíveis, os créditos podem ser destinados conforme a modalidade e as regras da distribuidora. A proposta deve identificar quais unidades podem participar e quais cobranças permanecem.</p>
    `,
    faq: [
      {
        question: 'As placas solares sobre a cobertura da pista representam algum risco de segurança?',
        answer: 'A instalação exige análise da estrutura, do ambiente e das zonas de risco do posto. O projeto define proteções, aterramento, materiais e procedimentos aplicáveis antes da execução.'
      },
      {
        question: 'A instalação exige fechar o posto de combustível?',
        answer: 'O cronograma é definido depois da vistoria e da análise de segurança. Quando tecnicamente viável, as etapas são organizadas em períodos de menor movimento e com isolamento da área de trabalho.'
      },
      {
        question: 'Dá para abastecer também um carregador de carro elétrico no posto?',
        answer: 'É possível avaliar um carregador veicular como carga adicional. O projeto deve considerar potência disponível, demanda, padrão de entrada, perfil de uso e eventuais adequações elétricas.'
      }
    ],
    ctaTitle: 'Transforme o telhado do seu posto em fonte de economia.',
    ctaSubtitle: 'Solicite um estudo de viabilidade solar gratuito para seu posto.',
    relatedSegments: ['comercial', 'supermercados', 'hoteis-e-pousadas', 'industrial'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  },

  escolas: {
    slug: 'escolas-e-faculdades',
    label: 'Escolas e Faculdades',
    urlPath: '/energia-solar/escolas-e-faculdades/',
    h1: 'Energia Solar para Escolas, Faculdades e Instituições de Ensino',
    h2Body: 'Ensino de qualidade com salas climatizadas e despesas sob controle.',
    eyebrow: 'SOLAR EDUCAÇÃO · NORDESTE',
    title: 'Energia Solar para Escolas e Faculdades | Klyfe Electric',
    description: 'Energia solar para instituições de ensino, colégios e universidades no Nordeste. Reduza a conta de luz de salas climatizadas e laboratórios.',
    intro: 'Salas de aula climatizadas, laboratórios de informática, ginásios e iluminação exigem elevado consumo de energia das instituições de ensino. A energia solar para escolas e faculdades reduz a fatura mensal, proporciona previsibilidade financeira na gestão escolar e serve como exemplo prático de sustentabilidade para alunos.',
    stats: [
      { value: 'Fatura', label: 'Análise do Consumo' },
      { value: '15–200 kWp', label: 'Porte Institucional' },
      { value: 'Cenários', label: 'Análise de Retorno' },
      { value: 'Educação', label: 'Sustentabilidade Prática' }
    ],
    painPoints: [
      {
        title: 'Ar-condicionado ligado em dezenas de salas simultaneamente',
        text: 'O maior pico de consumo das escolas ocorre durante as aulas diurnas, combinando com o horário de máxima produção solar.'
      },
      {
        title: 'Custos fixos pesando na mensalidade escolar',
        text: 'A redução na conta de luz melhora a margem da instituição, permitindo investir em tecnologia e estrutura pedagógica.'
      },
      {
        title: 'Período de férias escolares com geração sobressalente',
        text: 'Durante as férias de janeiro e julho, a usina continua gerando energia a pleno vapor, acumulando créditos para os meses letivos.'
      }
    ],
    benefits: [
      'Projeto elétrico com ART assinado por engenheiros especializados',
      'Dimensionamento técnico considerando o calendário escolar e férias',
      'Projeto e acompanhamento do processo de homologação na distribuidora',
      'Monitoramento remoto da usina com painel pedagógico para os estudantes',
      'Dados de geração que podem apoiar iniciativas pedagógicas e de sustentabilidade'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise da fatura de energia e medição das coberturas dos blocos acadêmicos.' },
      { title: 'Projeto Executivo', text: 'Desenvolvimento do diagrama unifilar e especificações de segurança.' },
      { title: 'Instalação', text: 'Montagem ágil planejada preferencialmente para finais de semana ou férias.' },
      { title: 'Homologação', text: 'Vistoria da concessionária e troca do medidor para ativação dos créditos.' }
    ],
    kWpRange: '15 a 200 kWp',
    paybackHint: 'calculado conforme consumo, calendário, tarifa e investimento',
    bodyHtml: `
      <p>A <strong>energia solar para escolas e faculdades</strong> traz um duplo benefício: grande retorno econômico e valor educacional inestimável. Ao adotar a energia fotovoltaica, a instituição de ensino demonstra aos alunos, pais e comunidade a aplicação prática da ciência e do respeito ao meio ambiente.</p>
      <p>A Klyfe Electric desenvolve projetos para colégios infantis, cursos preparatórios, faculdades e centros universitários. Aproveitamos os amplos telhados de quadras cobertas e blocos de salas para instalar os painéis solares.</p>
      <p>Durante os meses de férias escolares, quando o consumo da instituição cai substancialmente, a usina solar continua gerando créditos na concessionária, que são utilizados para abater a conta nos meses de aulas intensas.</p>
    `,
    faq: [
      {
        question: 'É possível instalar as placas solares sobre o telhado da quadra de esportes da escola?',
        answer: 'Pode ser viável, desde que a vistoria confirme capacidade estrutural, estado da cobertura, área útil, orientação e sombreamento.'
      },
      {
        question: 'A instalação das placas é feita no período de aulas?',
        answer: 'Para total conforto e segurança dos alunos, organizamos a etapa de montagem mecânica no telhado em horários específicos, finais de semana ou durante o período de recesso escolar.'
      },
      {
        question: 'Como a escola pode usar a usina solar no aprendizado dos alunos?',
        answer: 'Quando o equipamento e o escopo contratados oferecem monitoramento, os dados de geração podem apoiar atividades de física, geografia e matemática.'
      }
    ],
    ctaTitle: 'Transforme sua escola em uma instituição sustentável.',
    ctaSubtitle: 'Solicite um estudo de viabilidade solar gratuito para sua escola.',
    relatedSegments: ['comercial', 'hospitais-e-clinicas', 'condominios', 'supermercados'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  }
};

module.exports = segments;
