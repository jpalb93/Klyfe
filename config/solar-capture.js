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
    h2Body: 'Transforme o sol do Nordeste em economia imediata para sua família.',
    eyebrow: 'SOLAR RESIDENCIAL · NORDESTE',
    title: 'Energia Solar Residencial | Klyfe Electric',
    description: 'Energia solar para casas e condomínios no Nordeste. Economize até 95% na conta de luz com projeto engenheirado, ART e homologação rápida.',
    intro: 'A conta de luz da sua casa não precisa subir todo ano com as bandeiras tarifárias. Com um sistema de energia solar residencial projetado pela Klyfe Electric, você gera a própria eletricidade, valoriza o seu imóvel e alcança redução de até 95% na fatura mensal.',
    stats: [
      { value: 'até 95%', label: 'de redução na conta' },
      { value: '2,5–3,5 anos', label: 'payback residencial' },
      { value: '25 anos', label: 'garantia de geração dos módulos' },
      { value: '100%', label: 'projeto com ART' }
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
        title: 'Valorização imediata do imóvel',
        text: 'Imóveis com usina solar fotovoltaica instalada têm valor de mercado superior e maior liquidez para venda ou locação.'
      }
    ],
    benefits: [
      'Projeto elétrico sob medida com emissão de ART',
      'Estruturas de fixação em alumínio resistentes a intempéries e maresia',
      'Homologação completa na distribuidora de energia',
      'Aplicativo de monitoramento em tempo real no celular',
      'Opções de financiamento com parcelas menores que a conta de luz antiga'
    ],
    processSteps: [
      { title: 'Estudo Grátis', text: 'Análise da sua fatura e cálculo da quantidade de placas necessárias.' },
      { title: 'Projeto & ART', text: 'Engenheiro desenvolve o projeto elétrico e emite a ART no CREA.' },
      { title: 'Instalação', text: 'Montagem limpa e segura por equipe treinada em NR-10 e NR-35.' },
      { title: 'Homologação', text: 'Protocolo na concessionária até a ativação do medidor bidirecional.' }
    ],
    kWpRange: '3 a 12 kWp',
    paybackHint: '2,5 a 3,5 anos no Nordeste',
    bodyHtml: `
      <p>A <strong>energia solar residencial</strong> é uma das decisões financeiras mais inteligentes para famílias no Nordeste. Graças ao alto índice de irradiação solar da nossa região, os painéis solares residenciais geram mais kWh por metro quadrado do que na média nacional.</p>
      <p>A Klyfe Electric cuida de todas as etapas: dimensionamos os módulos de acordo com o consumo da sua família, instalamos com suporte apropriado para o seu telhado (cerâmico, fibrocimento ou laje) e realizamos toda a homologação burocrática na concessionária.</p>
      <p>Além disso, com a Lei 14.300, estruturamos seu projeto para maximizar o autoconsumo e a compensação de créditos, garantindo que mesmo com a cobrança gradual do Fio B o seu retorno financeiro continue rápido e seguro.</p>
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
    description: 'Energia solar para empresas no Nordeste: reduza até 95% da conta de luz, estude ROI com demanda contratada e homologue com engenharia Klyfe.',
    intro: 'Se a conta de luz virou um dos maiores custos fixos da sua empresa, a energia solar comercial transforma gasto recorrente em ativo de caixa. Projetamos sistemas fotovoltaicos B2B dimensionados para a curva diurna do seu negócio, garantindo retorno sobre o investimento entre 2,5 e 4 anos.',
    stats: [
      { value: 'até 95%', label: 'de redução na conta' },
      { value: '2,5–4 anos', label: 'payback típico B2B' },
      { value: '15–500+ kWp', label: 'porte comercial/industrial' },
      { value: '100%', label: 'projeto com ART' }
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
      { title: 'Ativação', text: 'Vistoria da concessionária e troca do medidor para início imediato do abatimento.' }
    ],
    kWpRange: '15 a 500+ kWp',
    paybackHint: '2,5 a 4 anos (perfil comercial Nordeste)',
    bodyHtml: `
      <p>A <strong>energia solar para empresas</strong> é uma decisão estratégica de gestão financeira. No Nordeste, a irradiação abundante faz com que os sistemas fotovoltaicos comerciais entreguem um custo nivelado de energia (LCOE) extremamente baixo.</p>
      <p>A Klyfe Electric desenvolve projetos para escritórios, lojas, galpões de distribuição e prestadores de serviço. Avaliamos a viabilidade de instalação no telhado ou em solo, a inclusão de múltiplas unidades consumidoras sob o mesmo CNPJ e as regras de compensação de créditos.</p>
      <p>Com a Klyfe, o setor financeiro da sua empresa recebe relatórios claros com projeção de economia, fluxo de caixa e tempo exato de payback.</p>
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
      { value: '100%', label: 'Engenharia Dedicada' }
    ],
    painPoints: [
      {
        title: 'Alto consumo em horários de ponta e fora de ponta',
        text: 'Estruturamos usinas que reduzem o consumo global da planta e otimizam o enquadramento tarifário industrial.'
      },
      {
        title: 'Exigências rigorosas de segurança do trabalho',
        text: 'Nossas equipes atendem integralmente às normas industriais de segurança (NR-10, NR-12, NR-35), com integração de segurança aprovada.'
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
    paybackHint: '3 a 4,5 anos em plantas industriais',
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
    h2Body: 'Refrigeração 24h pagando até 95% a menos na conta de energia.',
    eyebrow: 'SOLAR VAREJO · REFRIGERAÇÃO',
    title: 'Energia Solar para Supermercados | Klyfe Electric',
    description: 'Energia solar para supermercados, mercearias e atacadistas no Nordeste. Reduza o custo com ilhas de frio e ar-condicionado. Projeto e homologação.',
    intro: 'Supermercados e redes de varejo alimentício dependem de balcões refrigerados, câmaras frias e iluminação constante. A energia elétrica é um dos maiores custos operacionais do setor. A energia solar para supermercados gera eletricidade nos momentos de maior calor, aliviando o custo da refrigeração.',
    stats: [
      { value: 'até 95%', label: 'de economia na conta' },
      { value: '24/7', label: 'Proteção contra tarifas' },
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
        text: 'Supermercados possuem grandes coberturas que podem ser 100% aproveitadas para geração de energia limpa.'
      }
    ],
    benefits: [
      'Dimensionamento técnico para carga pesada de refrigeração e climatização',
      'Estudo estrutural para fixação segura em telhados de grande vão livre',
      'Homologação ágil junto à concessionária de energia',
      'Redução imediata do custo operacional (OPEX) do supermercado',
      'Certificado de empresa sustentável para atração de clientes'
    ],
    processSteps: [
      { title: 'Levantamento', text: 'Análise das contas de luz, demanda contratada e medição da área de cobertura.' },
      { title: 'Engenharia', text: 'Projeto elétrico otimizado para o perfil de consumo do varejo alimentício.' },
      { title: 'Instalação', text: 'Montagem ágil sem impactar o fluxo de clientes na loja.' },
      { title: 'Ativação', text: 'Homologação e substituição do medidor para início dos créditos.' }
    ],
    kWpRange: '20 a 300 kWp',
    paybackHint: '2,5 a 3,5 anos para supermercados',
    bodyHtml: `
      <p><strong>Energia solar para supermercados</strong> é uma das aplicações de mais rápido retorno no varejo. Como os compressores de refrigeração trabalham com mais força nos horários quentes do dia, a curva de geração fotovoltaica coincide perfeitamente com o momento de maior consumo do supermercado.</p>
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
        answer: 'Os módulos solares possuem 25 anos de garantia de eficiência, os inversores têm de 10 a 15 anos de garantia de fábrica e a Klyfe oferece garantia de instalação e suporte técnico.'
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
      { value: '2,5–4 anos', label: 'Payback no Setor de Saúde' },
      { value: '100%', label: 'Conformidade e ART' },
      { value: 'Diurno', label: 'Perfil Ideal de Geração' }
    ],
    painPoints: [
      {
        title: 'Ar-condicionado e climatização contínua',
        text: 'Salas de cirurgia, exames e recepções exigem conforto térmico ininterrupto, gerando contas de luz elevadas.'
      },
      {
        title: 'Rigor com segurança elétrica e continuidade',
        text: 'O projeto solar é desenhado em harmonia com geradores e nobreaks existentes, garantindo estabilidade e segurança às cargas hospitalares.'
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
    paybackHint: '2,5 a 4 anos para área de saúde',
    bodyHtml: `
      <p><strong>Energia solar para hospitais e clínicas</strong> alia alta economia a um forte compromisso socioambiental. Como a demanda por climatização atinge seu pico exatamente nos horários de maior incidência de sol, a energia gerada pelos painéis solares supre de forma imediata os aparelhos de ar-condicionado e equipamentos do centro médico.</p>
      <p>A Klyfe Electric projeta sistemas seguros que não interferem nos circuitos sensíveis de emergência da instituição. Avaliamos a área de cobertura de lajes e telhados para maximizar a captação solar por metro quadrado.</p>
      <p>Além disso, oferecemos suporte técnico contínuo para garantir que a usina solar do hospital opere com 100% de disponibilidade durante todo o ano.</p>
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
      { value: 'até 95%', label: 'Economia na Fatura' },
      { value: '15–200 kWp', label: 'Porte Hoteleiro Típico' },
      { value: '2,5–3,5 anos', label: 'Retorno do Investimento' },
      { value: 'ESG', label: 'Selo de Hotel Sustentável' }
    ],
    painPoints: [
      {
        title: 'Faturas elevadas na alta estação',
        text: 'Nos meses de pico de ocupação turística, a conta de luz dispara. A energia solar gera o máximo de energia justamente no período de maior sol e ocupação.'
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
      { title: 'Ativação', text: 'Homologação e troca de medidor para início imediato da economia.' }
    ],
    kWpRange: '15 a 200 kWp',
    paybackHint: '2,5 a 3,5 anos para hotéis e pousadas',
    bodyHtml: `
      <p><strong>Energia solar para hotéis e pousadas</strong> é um investimento de alto impacto no setor hoteleiro nordestino. Com praias e paisagens ensolaradas durante quase todo o ano, os estabelecimentos do litoral e do interior podem transformar essa abundante luz solar em ativo financeiro.</p>
      <p>A Klyfe Electric desenvolve projetos para pousadas charmosas, hotéis urbanos e resorts. Avaliamos a viabilidade de instalação em telhados de chalés, lajes de prédios ou estruturas de solo integradas às áreas verdes do hotel.</p>
      <p>Além da economia financeira direta, a pousada pode exibir o selo de energia limpa, atraindo viajantes conscientes que preferem se hospedar em estabelecimentos sustentáveis.</p>
    `,
    faq: [
      {
        question: 'O sistema fotovoltaico produz energia suficiente para o ar-condicionado de todos os quartos?',
        answer: 'Sim! Dimensionamos o sistema com base na capacidade total de climatização do hotel para suprir o consumo necessário.'
      },
      {
        question: 'A instalação prejudica o silêncio dos hóspedes?',
        answer: 'Não. Alinhamos a montagem com a gerência para realizar trabalhos barulhentos nos horários de menor permanência de hóspedes nos quartos.'
      },
      {
        question: 'É possível financiar o sistema solar do hotel?',
        answer: 'Sim, existem linhas de financiamento de turismo e crédito sustentável com prazos longos que permitem pagar a parcela com a própria economia de energia.'
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
    h2Body: 'Zere a conta de luz das áreas comuns e reduza a taxa de condomínio.',
    eyebrow: 'SOLAR CONDOMINIAL · NORDESTE',
    title: 'Energia Solar para Condomínios | Klyfe Electric',
    description: 'Energia solar para áreas comuns de condomínios no Nordeste. Reduza o custo com bombas, elevadores e iluminação. Projeto e homologação rápida.',
    intro: 'A taxa de condomínio é fortemente impactada pelas despesas de energia elétrica das áreas comuns: elevadores, bombas de água e piscina, iluminação de garagens e portaria 24h. A energia solar para condomínios reduz esse custo fixo, evita aumentos na cota condominial e valoriza todos os apartamentos ou salas do empreendimento.',
    stats: [
      { value: 'até 95%', label: 'de Redução nas Áreas Comuns' },
      { value: '10–100 kWp', label: 'Porte Condominial' },
      { value: '2,5–3,5 anos', label: 'Payback Estimado' },
      { value: '100%', label: 'Aprovado para Assembleias' }
    ],
    painPoints: [
      {
        title: 'Cota condominial subindo devido à tarifa de energia',
        text: 'A energia solar zera a conta de luz das áreas comuns, estabilizando o orçamento do condomínio.'
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
      'Redução drástica do custo de energia de elevadores, bombas e iluminação comum',
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
    paybackHint: '2,5 a 3,5 anos para condomínios',
    bodyHtml: `
      <p>A <strong>energia solar para condomínios</strong> é uma solução inteligente para síndicos e administradoras que buscam eficiência na gestão financeira do prédio. As áreas comuns de edifícios residenciais e comerciais possuem consumo contínuo que pode ser totalmente suprido por um gerador solar fotovoltaico instalado na laje ou telhado do próprio prédio.</p>
      <p>A Klyfe Electric orienta o síndico em todo o processo: preparamos o estudo de viabilidade, participamos das reuniões explicativas para os moradores e garantimos uma instalação segura que preserva a impermeabilização da laje.</p>
      <p>Além disso, sob as regras da Resolução ANEEL, é possível criar um sistema onde o excedente gerado no topo do prédio seja rateado proporcionalmente na fatura particular de cada apartamento.</p>
    `,
    faq: [
      {
        question: 'Qual o quórum necessário na assembleia para aprovar a instalação de energia solar no condomínio?',
        answer: 'Geralmente, por se tratar de benfeitoria útil que gera economia de despesas para o condomínio, exige-se a aprovação por maioria simples dos condôminos presentes na assembleia (conforme interpretação do Código Civil).'
      },
      {
        question: 'A instalação das placas no topo do prédio danifica a impermeabilização da laje?',
        answer: 'Não. Utilizamos estruturas de fixação com blocos de concreto de contrapeso (sem perfuração da laje) ou fixadores especiais devidamente vedados.'
      },
      {
        question: 'O condomínio pode financiar a instalação solar?',
        answer: 'Sim! Existem linhas de crédito bancário específicas para condomínios, onde a parcela do financiamento é paga com a própria economia da conta de energia.'
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
    intro: 'No agronegócio do Nordeste, o custo da energia para irrigação e bombeamento de água pesa no bolso do produtor rural. A energia solar para fazendas transforma a intensa irradiação do semiárido em aliado da produção agrícola, garantindo água nos roçados e economia na fatura rural.',
    stats: [
      { value: '5–150 kWp', label: 'Porte Rural Típico' },
      { value: '2–4 anos', label: 'Payback no Campo' },
      { value: 'On / Off / Híbrido', label: 'Sistemas Flexíveis' },
      { value: '100%', label: 'Projeto com ART' }
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
    paybackHint: '2 a 4 anos no agronegócio',
    bodyHtml: `
      <p>A <strong>energia solar para fazendas</strong> no Nordeste é uma combinação perfeita entre recurso natural e necessidade produtiva. Nossas terras possuem um dos maiores índices de irradiação solar do mundo, coincidindo com as demandas de irrigação nos períodos de estiagem.</p>
      <p>A Klyfe Electric atende produtores rurais de pequeno, médio e grande porte. Projetamos usinas fotovoltaicas no solo ou em galpões agrícolas que cobrem o consumo de bombas de água, cercas elétricas, resfriadores de leite, aviários e residências rurais.</p>
      <p>Trabalhamos com seriedade técnica: entregamos projeto elétrico com ART, aterramento reforçado contra descargas atmosféricas e proteções elétricas que garantem o funcionamento contínuo do seu sistema.</p>
    `,
    faq: [
      {
        question: 'É possível acionar bombas de irrigação diretamente com energia solar?',
        answer: 'Sim! Utilizamos inversores drive de bombeamento solar que alimentam motores e bombas trifásicas/monofásicas diretamente a partir dos painéis solares.'
      },
      {
        question: 'O produtor rural tem desconto no financiamento solar?',
        answer: 'Sim, existem linhas de crédito rurais com taxas de juros incentivadas (como o FNE Sol no Banco do Nordeste e linhas do Plano Safra) com prazos longos de carência.'
      },
      {
        question: 'E se a fazenda não tiver rede elétrica da concessionária?',
        answer: 'Neste caso, projetamos um sistema off-grid com banco de baterias ou bombeamento solar direto, garantindo energia autônoma para a propriedade.'
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
      { value: 'até 95%', label: 'de Economia na Fatura' },
      { value: '15–100 kWp', label: 'Porte Típico em Postos' },
      { value: '2,5–3,5 anos', label: 'Payback do Investimento' },
      { value: '100%', label: 'Normas de Segurança' }
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
      { title: 'Ativação', text: 'Homologação e substituição do medidor para início imediato dos créditos.' }
    ],
    kWpRange: '15 a 100 kWp',
    paybackHint: '2,5 a 3,5 anos em postos de combustível',
    bodyHtml: `
      <p>A <strong>energia solar para postos de combustível</strong> é uma das aplicações comerciais mais eficientes no setor automotivo e de varejo. A cobertura da pista de abastecimento oferece uma ampla área plana ou com inclinação suave, perfeitamente posicionada para a captação de radiação solar.</p>
      <p>A Klyfe Electric desenvolve projetos respeitando todas as exigências técnicas das distribuidoras de energia e normas de segurança. A energia gerada pela cobertura supre a iluminação da pista, as bombas de combustível, os compressores de ar e as geladeiras da loja de conveniência.</p>
      <p>Se o revendedor possuir outros postos ou lavajatos sob a mesma raiz de CNPJ, o excedente solar pode ser compartilhado para zerar outras faturas.</p>
    `,
    faq: [
      {
        question: 'As placas solares sobre a cobertura da pista representam algum risco de segurança?',
        answer: 'Não. Os projetos são desenvolvidos em conformidade com as normas ABNT (NBR 5410 e NBR 16690), contando com String Box equipadas com DPS (Dispositivo de Proteção contra Surtos) e aterramento elétrico rigoroso.'
      },
      {
        question: 'A instalação exige fechar o posto de combustível?',
        answer: 'Não. A instalação mecânica nos módulos ocorre no telhado da cobertura e a conexão elétrica é agendada em momentos de menor movimento.'
      },
      {
        question: 'Dá para abastecer também um carregador de carro elétrico no posto?',
        answer: 'Com certeza! A energia gerada pelas placas solares pode alimentar um carregador veicular elétrico (Wallbox) instalado no posto para atender seus clientes.'
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
      { value: 'até 95%', label: 'de Economia na Fatura' },
      { value: '15–200 kWp', label: 'Porte Institucional' },
      { value: '2,5–3,5 anos', label: 'Payback Estimado' },
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
      'Homologação burocrática rápida junto à distribuidora de energia',
      'Monitoramento remoto da usina com painel pedagógico para os estudantes',
      'Certificado de Escola Sustentável e alinhamento com a agenda ESG'
    ],
    processSteps: [
      { title: 'Diagnóstico', text: 'Análise da fatura de energia e medição das coberturas dos blocos acadêmicos.' },
      { title: 'Projeto Executivo', text: 'Desenvolvimento do diagrama unifilar e especificações de segurança.' },
      { title: 'Instalação', text: 'Montagem ágil planejada preferencialmente para finais de semana ou férias.' },
      { title: 'Homologação', text: 'Vistoria da concessionária e troca do medidor para ativação dos créditos.' }
    ],
    kWpRange: '15 a 200 kWp',
    paybackHint: '2,5 a 3,5 anos para instituições de ensino',
    bodyHtml: `
      <p>A <strong>energia solar para escolas e faculdades</strong> traz um duplo benefício: grande retorno econômico e valor educacional inestimável. Ao adotar a energia fotovoltaica, a instituição de ensino demonstra aos alunos, pais e comunidade a aplicação prática da ciência e do respeito ao meio ambiente.</p>
      <p>A Klyfe Electric desenvolve projetos para colégios infantis, cursos preparatórios, faculdades e centros universitários. Aproveitamos os amplos telhados de quadras cobertas e blocos de salas para instalar os painéis solares.</p>
      <p>Durante os meses de férias escolares, quando o consumo da instituição cai substancialmente, a usina solar continua gerando créditos na concessionária, que são utilizados para abater a conta nos meses de aulas intensas.</p>
    `,
    faq: [
      {
        question: 'É possível instalar as placas solares sobre o telhado da quadra de esportes da escola?',
        answer: 'Sim! As coberturas metálicas de quadras poliesportivas são excelentes locais para instalação de painéis solares devido à grande área sem sombreamento.'
      },
      {
        question: 'A instalação das placas é feita no período de aulas?',
        answer: 'Para total conforto e segurança dos alunos, organizamos a etapa de montagem mecânica no telhado em horários específicos, finais de semana ou durante o período de recesso escolar.'
      },
      {
        question: 'Como a escola pode usar a usina solar no aprendizado dos alunos?',
        answer: 'Fornecemos acesso ao aplicativo de monitoramento, onde os professores de física, geografia e matemática podem utilizar os dados reais de geração de energia em suas aulas práticas.'
      }
    ],
    ctaTitle: 'Transforme sua escola em uma instituição sustentável.',
    ctaSubtitle: 'Solicite um estudo de viabilidade solar gratuito para sua escola.',
    relatedSegments: ['comercial', 'hospitais-e-clinicas', 'condominios', 'supermercados'],
    relatedCities: ['campina-grande-pb', 'joao-pessoa-pb', 'recife-pe', 'natal-rn', 'caruaru-pe']
  }
};

const cities = {
  'campina-grande-pb': {
    slug: 'campina-grande-pb',
    label: 'Campina Grande',
    name: 'Campina Grande',
    stateAbbr: 'PB',
    preposition: 'em',
    urlPath: '/energia-solar/campina-grande-pb/',
    h1: 'Energia Solar em Campina Grande',
    eyebrow: 'SEDE KLYFE ELECTRIC · CAMPINA GRANDE - PB',
    title: 'Energia Solar em Campina Grande PB | Klyfe Electric',
    description: 'Energia solar em Campina Grande PB com a sede da Klyfe Electric. Projetos residenciais, comerciais e industriais com engenharia própria, ART e homologação Energisa.',
    intro: 'Sede da Klyfe Electric, Campina Grande é o nosso centro de engenharia e operações. Com altos índices de irradiação solar no Agreste paraibano, atendemos residências, comércios e indústrias da Rainha da Borborema com suporte presencial rápido, projetos registrados no CREA-PB e homologação ágil na Energisa Paraíba.',
    irradiacao: '5,5 kWh/m²/dia (Agreste PB)',
    concessionaria: 'Energisa Paraíba',
    validationStatus: 'confirmed',
    hqProximity: 'Sede Própria em Campina Grande (PB)',
    stats: [
      { value: 'Sede', label: 'Campina Grande - PB' },
      { value: 'CREA-PB', label: 'Engenharia Registrada' },
      { value: 'Energisa', label: 'Homologação Rápida' },
      { value: 'até 95%', label: 'Economia Estimada' }
    ],
    painPoints: [
      {
        title: 'Atendimento presencial e suporte local',
        text: 'Nossa equipe técnica e comercial está sediada em Campina Grande, garantindo visitas de engenharia, vistoria e pós-venda ágeis.'
      },
      {
        title: 'Tarifas e regras da Energisa Paraíba',
        text: 'Conhecemos detalhadamente o trâmite normativo e os padrões de entrada exigidos pela Energisa na região de Campina Grande.'
      },
      {
        title: 'Ventos e estrutura climática do Agreste',
        text: 'Projetamos arranjos com fixação mecânica calculada para a velocidade de ventos e variações térmicas locais.'
      }
    ],
    benefits: [
      'Atendimento presencial rápido com engenheiros da sede de Campina Grande',
      'Visita técnica no imóvel para análise de telhado e padrão elétrico',
      'Projeto elétrico assinado com ART registrada no CREA-PB',
      'Homologação direta com a Energisa Paraíba até a troca do medidor',
      'Suporte pós-instalação e plano de manutenção técnica local'
    ],
    processSteps: [
      { title: 'Visita Técnica', text: 'Nossa equipe de Campina Grande realiza a medição presencial no seu imóvel.' },
      { title: 'Engenharia Local', text: 'Desenvolvimento do projeto elétrico e emissão da ART no CREA-PB.' },
      { title: 'Instalação', text: 'Execução da montagem com equipes próprias sob supervisão de engenheiro.' },
      { title: 'Conexão Energisa', text: 'Acompanhamento da vistoria e ativação do medidor bidirecional.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em Campina Grande</strong> vive um crescimento acelerado em bairros residenciais como Catolé, Alto Branco, Bodocongó, Mirante e Prata, assim como no Distrito Industrial e centros comerciais do centro da cidade.</p>
      <p>Como a Klyfe Electric tem sua sede em Campina Grande, nossos clientes contam com a máxima segurança: suporte presencial direto dos nossos engenheiros, equipe técnica própria e proximidade para qualquer necessidade de manutenção ou atendimento.</p>
      <p>Desenvolvemos soluções completas para residências, empresas, clínicas, supermercados e propriedades rurais do Agreste. Cuidamos do projeto, instalação física e homologação na Energisa Paraíba.</p>
    `,
    faq: [
      {
        question: 'Onde fica a sede da Klyfe Electric em Campina Grande?',
        answer: 'Nossa sede operacional fica em Campina Grande (PB), de onde gerenciamos nossos projetos de engenharia, estoque e equipes de atendimento para toda a Paraíba, Pernambuco e Rio Grande do Norte.'
      },
      {
        question: 'Quanto tempo leva para homologar um projeto solar com a Energisa em Campina Grande?',
        answer: 'Graças à proximidade e conformidade dos nossos projetos, a aprovação do parecer de acesso e a vistoria da Energisa em Campina Grande costumam ocorrer dentro dos prazos regulatórios mais rápidos da região.'
      },
      {
        question: 'Posso agendar uma visita técnica gratuita no meu imóvel em Campina Grande?',
        answer: 'Com certeza! Basta entrar em contato pelo nosso WhatsApp ou formulário para agendarmos a visita técnica de um engenheiro ao seu imóvel.'
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
    h1: 'Energia Solar em João Pessoa',
    eyebrow: 'ATENDIMENTO REGIONAL · JOÃO PESSOA - PB',
    title: 'Energia Solar em João Pessoa PB | Klyfe Electric',
    description: 'Energia solar em João Pessoa PB. Projetos de energia solar residencial e empresarial com suporte da equipe de engenharia Klyfe na Paraíba.',
    intro: 'Na capital paraibana, a energia solar combina o sol forte durante todo o ano com a busca por redução na conta de luz. A Klyfe Electric atende a Grande João Pessoa com suporte de engenharia especializado, projetos com ART e execução rigorosa ajustada ao clima litorâneo.',
    irradiacao: '5,7 kWh/m²/dia (Litoral PB)',
    concessionaria: 'Energisa Paraíba',
    validationStatus: 'logistics',
    hqProximity: 'Deslocamento logístico ágil a partir da sede em Campina Grande (~120 km / 1h30 via BR-230)',
    stats: [
      { value: '~1h30', label: 'Deslocamento da Sede CG' },
      { value: 'Energisa', label: 'Homologação na Capital' },
      { value: 'Anti-Maresia', label: 'Estruturas de Alumínio' },
      { value: '100%', label: 'Projeto com ART' }
    ],
    painPoints: [
      {
        title: 'Maresia e corrosão litorânea',
        text: 'Em bairros como Manaíra, Cabo Branco, Tambaú e Altiplano, utilizamos apenas fixadores e estruturas de alumínio anonisado resistentes ao salitre.'
      },
      {
        title: 'Consumo elevado de ar-condicionado em apartamentos e casas',
        text: 'O calor da capital exige climatização constante. A energia solar residencial zera o impacto financeiro do uso de ar-condicionado.'
      },
      {
        title: 'Suporte de engenharia rápida na Grande JP',
        text: 'Nossas equipes de campo atendem João Pessoa, Cabedelo, Santa Rita e Bayeux com rapidez logística via BR-230.'
      }
    ],
    benefits: [
      'Projetos dimensionados para o clima e radiação de João Pessoa',
      'Estruturas e conectores reforçados com proteção contra corrosão salina',
      'Homologação rápida junto à Energisa Paraíba',
      'Atendimento a residências, condomínios verticais e empresas',
      'Monitoramento remoto da usina pelo celular'
    ],
    processSteps: [
      { title: 'Estudo Inicial', text: 'Análise da fatura de energia e simulação do potencial solar na capital.' },
      { title: 'Projeto & ART', text: 'Engenharia elabora o projeto elétrico completo registrado no CREA-PB.' },
      { title: 'Instalação', text: 'Deslocamento da equipe técnica e montagem segura do gerador fotovoltaico.' },
      { title: 'Homologação', text: 'Acompanhamento presencial da vistoria da Energisa até a troca do medidor.' }
    ],
    bodyHtml: `
      <p>A <strong>energia solar em João Pessoa</strong> é uma solução de altíssima rentabilidade. A capital paraibana conta com uma das maiores taxas de insolação do litoral nordestino, permitindo que os painéis solares operem em sua máxima capacidade de produção.</p>
      <p>A Klyfe Electric atende a Grande João Pessoa com total cobertura logística a partir de nossa sede em Campina Grande (apenas 120 km via rodovia duplicada BR-230). Nossos engenheiros garantem visitas técnicas, acompanhamento de obra e homologação na Energisa Paraíba.</p>
      <p>Seja em casas residenciais nos bairros dos Estados, Bessa e Portal do Sol, ou em estabelecimentos comerciais e condomínios, entregamos engenharia solar sólida e duradoura.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe atende a cidade de João Pessoa?',
        answer: 'Nossas equipes técnicas de instalação e engenharia se deslocam diariamente da nossa sede em Campina Grande via BR-230 (cerca de 1h30 de viagem), garantindo atendimento rápido para orçamentos, obras e vistorias em João Pessoa e Cabedelo.'
      },
      {
        question: 'A maresia de João Pessoa pode danificar os painéis solares?',
        answer: 'Os módulos fotovoltaicos possuem vidro temperado selado e moldura em alumínio anodizado próprios para ambientes litorâneos. A Klyfe utiliza exclusivamente parafusos e estruturas inoxidáveis e com tratamento anticorrosivo.'
      },
      {
        question: 'Posso instalar energia solar em casas de praia em Cabedelo ou Lucena?',
        answer: 'Sim! Projetamos usinas solares para casas de praia e veraneio na Grande João Pessoa e Litoral Norte/Sul da Paraíba.'
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
      { value: '100%', label: 'Engenharia com ART' }
    ],
    painPoints: [
      {
        title: 'Tarifas elevadas na região metropolitana',
        text: 'O custo do kWh em Pernambuco torna a energia solar um dos investimentos de maior taxa interna de retorno (TIR) da região.'
      },
      {
        title: 'Projetos em condomínios e edifícios comerciais',
        text: 'Aproveitamos lajes de prédios em Boa Viagem, Graças, Espinheiro e Ilha do Leite para suprir condomínios e centros médicos.'
      },
      {
        title: 'Trâmite técnico junto à Neoenergia Pernambuco',
        text: 'Acompanhamos integralmente os processos regulatórios de parecer de acesso e vistoria da concessionária pernambucana.'
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
      <p>A Klyfe Electric estende sua capacidade operacional para Pernambuco, garantindo que clientes em Recife, Olinda e Jaboatão dos Guararapes recebam o mesmo padrão de engenharia, segurança e suporte que nos tornou referência na Paraíba.</p>
      <p>Elaboramos projetos de micro e minigeração distribuída, garantindo retorno financeiro atrativo e total conformidade com a regulamentação da ANEEL.</p>
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
      { value: '100%', label: 'Projeto com ART' }
    ],
    painPoints: [
      {
        title: 'Aproveitamento do recorde de irradiação solar',
        text: 'A abundante luz solar em Natal permite paybacks ainda mais curtos para residências e hotéis da Via Costeira e Ponta Negra.'
      },
      {
        title: 'Resistência à maresia e ventos litorâneos',
        text: 'Instalamos painéis e suportes de alumínio estrutural preparados para suportar o vento contínuo e a salinidade da costa do RN.'
      },
      {
        title: 'Burocracia com a distribuidora Cosern',
        text: 'Assumimos 100% dos trâmites técnicos e documentais no portal da Neoenergia Cosern para uma aprovação sem entraves.'
      }
    ],
    benefits: [
      'Projetos otimizados para extrair a máxima geração na Cidade do Sol',
      'Estruturas de fixação com tratamento de alta resistência contra a maresia',
      'Homologação ágil na Neoenergia Cosern',
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
      <p>A <strong>energia solar em Natal</strong> é um investimento natural. Com sol brilhando durante praticamente todos os meses do ano, investir em placas solares na capital potiguar garante um retorno financeiro sólido e previsível.</p>
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
    ctaTitle: 'Aproveite o sol de Natal para zerar sua conta de luz.',
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
      { value: '100%', label: 'Projeto com ART' }
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
      <p>Nossos projetos de engenharia solar entregam alta performance, homologação garantida e suporte de longo prazo.</p>
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
        answer: 'A economia imediata na conta de luz reduz as despesas operacionais da loja ou galpão, garantindo preços mais competitivos no mercado.'
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
    h1: 'Energia Solar em Mossoró',
    eyebrow: 'ATENDIMENTO REGIONAL · MOSSORÓ - RN',
    title: 'Energia Solar em Mossoró RN | Klyfe Electric',
    description: 'Energia solar em Mossoró RN. Soluções fotovoltaicas para o agronegócio, fruticultura, salinas e comércio no Oeste potiguar com suporte Klyfe.',
    intro: 'Segunda maior cidade do Rio Grande do Norte, Mossoró destaca-se pela força do agronegócio, fruticultura irrigada, indústria salineira e forte comércio local. Com insolação intensa do semiárido potiguar, a energia solar em Mossoró transforma o sol escaldante em redução drástica na fatura de energia.',
    irradiacao: '5,9 kWh/m²/dia (Semiárido RN)',
    concessionaria: 'Neoenergia Cosern (RN)',
    validationStatus: 'logistics',
    hqProximity: 'Atendimento regional com logística estruturada a partir da sede em Campina Grande',
    stats: [
      { value: '5,9 kWh', label: 'Excelente Irradiação' },
      { value: 'Cosern', label: 'Homologação no RN' },
      { value: 'Agro / B2B', label: 'Foco de Engenharia' },
      { value: '100%', label: 'Projeto com ART' }
    ],
    painPoints: [
      {
        title: 'Custo de energia no bombeamento da fruticultura irrigada',
        text: 'A irrigação de fazendas de melão e fruticultura consome muita energia. A solar reduz o custo produtivo por hectare.'
      },
      {
        title: 'Sol intenso e temperaturas elevadas',
        text: 'Utilizamos inversores e módulos com excelente coeficiente de temperatura para manter o rendimento mesmo nos dias mais quentes.'
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
      <p>A <strong>energia solar em Mossoró</strong> encontra um dos cenários mais favoráveis de todo o Brasil. O índice de radiação solar no Oeste do Rio Grande do Norte garante excelente eficiência na geração de energia fotovoltaica.</p>
      <p>A Klyfe Electric estende seu atendimento a Mossoró e municípios vizinhos do Oeste potiguar, fornecendo engenharia de ponta para produtores rurais, fazendas irrigadas, comércios, postos de combustível e residências.</p>
      <p>Oferecemos suporte técnico do projeto inicial à homologação na Neoenergia Cosern, garantindo que seu investimento entregue o payback estimado com segurança.</p>
    `,
    faq: [
      {
        question: 'Como a Klyfe atende projetos de energia solar em Mossoró (RN)?',
        answer: 'Organizamos o atendimento a Mossoró com planejamento logístico dedicado para visitas técnicas, entrega de materiais e equipes de execução de obra sob coordenação de nossa engenharia.'
      },
      {
        question: 'A energia solar funciona bem para bombeamento de água em fazendas de Mossoró?',
        answer: 'Excelente! A curva de geração solar em Mossoró é perfeita para acionar motores e sistemas de irrigação durante as horas de sol.'
      },
      {
        question: 'O calor extremo de Mossoró reduz a eficiência dos painéis solares?',
        answer: 'Temperaturas elevadas alteram levemente a tensão dos módulos, mas a alta quantidade de irradiação solar de Mossoró supera essa variação, mantendo a geração diária em níveis altíssimos. Selecionamos equipamentos com baixos coeficientes de temperatura.'
      }
    ],
    ctaTitle: 'Transforme o sol de Mossoró em economia para seu negócio.',
    ctaSubtitle: 'Solicite um estudo de viabilidade solar gratuito com a Klyfe.',
    relatedSegments: ['fazendas-e-irrigacao', 'comercial', 'industrial', 'postos-de-combustivel'],
    relatedCities: ['natal-rn', 'campina-grande-pb', 'caruaru-pe', 'joao-pessoa-pb']
  }
};

// Legacy alias definitions to resolve links gracefully without breaking
function getSegmentList() {
  return Object.values(segments).map(s => ({
    slug: s.slug,
    label: s.label,
    href: s.urlPath,
    title: s.title
  }));
}

function getCityList() {
  return Object.values(cities).map(c => ({
    slug: c.slug,
    name: c.name,
    stateAbbr: c.stateAbbr,
    href: c.urlPath,
    title: c.title,
    validationStatus: c.validationStatus,
    hqProximity: c.hqProximity
  }));
}

function resolveRelatedLink(key) {
  if (segments[key]) {
    return { label: segments[key].h1, href: segments[key].urlPath };
  }
  const segmentBySlug = Object.values(segments).find(s => s.slug === key);
  if (segmentBySlug) {
    return { label: segmentBySlug.h1, href: segmentBySlug.urlPath };
  }
  if (cities[key]) {
    return { label: `Energia Solar em ${cities[key].name}`, href: cities[key].urlPath };
  }
  const cityBySlug = Object.values(cities).find(c => c.slug === key);
  if (cityBySlug) {
    return { label: `Energia Solar em ${cityBySlug.name}`, href: cityBySlug.urlPath };
  }
  return null;
}

module.exports = {
  segments,
  cities,
  getSegmentList,
  getCityList,
  resolveRelatedLink
};
