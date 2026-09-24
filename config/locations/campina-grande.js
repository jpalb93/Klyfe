module.exports = {
  name: 'Campina Grande',
  preposition: 'em',
  region: 'Agreste Paraibano',
  state: 'Paraíba',
  concessionaria: 'Energisa Borborema',
  address: 'Av. Pref. Severino Bezerra Cabral, 1225 - Mirante, Campina Grande - PB, 58410-640',
  phone: '(83) 99133-0972',
  whatsappMessage: 'Olá! Vi o site da Klyfe em Campina Grande e gostaria de um orçamento.',
  cta: 'Solicite orçamento com nossa equipe em Campina Grande.',
  allServices: true,

  solarContent: {
    distribuidora: "Energisa Borborema",
    distribuidoraSlug: "energisa-borborema",
    irradiacao: "5,9 kWh/m²/dia",
    contextoRegional: "A instalação de placa solar em Campina Grande é uma das decisões financeiras mais inteligentes para empresas e proprietários residenciais. Inserida no Agreste paraibano, a cidade apresenta uma das maiores médias de irradiação solar do Brasil — cerca de 5,9 kWh/m²/dia — superando com folga capitais do Sul e Sudeste. Um sistema de 5 kWp com instalação de painel solar em Campina Grande gera cerca de 620 kWh mensais. Esse alto rendimento, aliado aos ventos constantes da região que ajudam no resfriamento natural dos módulos fotovoltaicos, garante o máximo aproveitamento térmico e durabilidade dos equipamentos.",
    homologacao: "A homologação para instalação de placa solar junto à Energisa Borborema (distribuidora responsável por Campina Grande) é integralmente gerenciada pela Klyfe Electric. Seguimos as normas de microgeração da ANEEL e do PRODIST Módulo 3. Elaboramos o projeto elétrico assinado por engenheiro credenciado no CREA-PB e realizamos a vistoria física para ativação do medidor bidirecional de energia solar em Campina Grande.",
    mercadoAlvo: "Nosso foco abrange desde indústrias no Distrito Industrial de Campina Grande (setores têxtil, cerâmico e tecnológico) que buscam reduzir custos operacionais com sistemas de grande porte, até residências de alto padrão nos condomínios Serraville, Alphaville, Monte Ville e Privilege, onde o telhado solar valoriza o imóvel e zera a conta de luz."
  },

  industrialContent: {
    polosIndustriais: "O Distrito Industrial de Campina Grande concentra empresas dos setores têxtil (maior polo têxtil do Nordeste), cerâmico e de tecnologia, com demandas elétricas de média tensão, sistemas de proteção contra surtos, quadros de força e CCMs (Centros de Controle de Motores). A Klyfe Electric atende projetos de infraestrutura elétrica industrial e automação de processos para plantas industriais no Distrito Industrial e no entorno do CAGEPA e SESI.",
    automacaoContexto: "O ecossistema tecnológico de Campina Grande — cidade que abriga o maior parque tecnológico do interior do Nordeste, o Porto Digital CG, e instituições como UFCG e INEP — gera demanda por automação predial avançada, controle de acesso, sistemas CFTV integrados e infraestrutura elétrica para data centers e laboratórios de pesquisa."
  },

  services: {
    'laudos-eletricos': {
      label: 'Laudos Técnicos & ART',
      category: 'engenharia',
      template: 'servicos/laudos-eletricos',
      bairros: 'Catolé, Bodocongó, Alto Branco, Prata e Distrito Industrial',
      serviceContext: `
        <p>Instalações com muitos equipamentos podem exigir uma vistoria organizada para atender à NR-10 ou a uma solicitação de alvará. O escopo é definido conforme a atividade e o imóvel.</p>
        <p>Variações de temperatura podem afetar conexões. A termografia pode ser indicada para localizar pontos de aquecimento que merecem investigação.</p>
      `,
      painPoint: 'Conformidade NR-10 para indústrias e renovação de alvarás.',
      cta: 'Solicite seu laudo técnico em Campina Grande.',
      faqExtra: {
        question: 'Laudos elétricos são exigidos para empresas do Distrito Industrial de Campina Grande?',
        answer: 'Algumas empresas podem precisar de laudos para NR-10, alvarás ou seguros. A exigência deve ser conferida com o órgão, a apólice e o responsável técnico.'
      }
    },
    'engenharia': {
      label: 'Engenharia Elétrica',
      category: 'engenharia',
      template: 'engenharia',
      bairros: 'Bodocongó, Distrito Industrial, Catolé e Alto Branco',
      serviceContext: `
        <p>O polo industrial e tecnológico de Campina Grande exige uma infraestrutura elétrica robusta e confiável. Nossa engenharia atua desde o projeto de subestações industriais no Distrito Industrial de Campina Grande até a automação de processos complexos.</p>
        <p>Com conhecimento das normas da Energisa Borborema, podemos preparar projetos e documentação para análise da concessionária quando essa etapa fizer parte do escopo. O prazo, a aprovação e os ganhos de consumo dependem do caso.</p>
      `,
      painPoint: 'Necessidade de alta disponibilidade energética para processos industriais e tecnológicos no Agreste.',
      cta: 'Consultar nossa engenharia em Campina Grande.',
      faqExtra: {
        question: 'Vocês fazem projetos de subestações para indústrias em Campina Grande?',
        answer: 'Podemos avaliar projetos de subestações aéreas e abrigadas para o setor industrial e comercial de Campina Grande. Documentação, protocolo e acompanhamento junto à Energisa Borborema dependem do escopo contratado.'
      }
    },
    'manutencao-subestacao': {
      label: 'Manutenção de Subestação',
      category: 'engenharia',
      template: 'servicos/manutencao-subestacao',
      bairros: 'Distrito Industrial, Bodocongó, Catolé e região metropolitana',
      serviceContext: `
        <p>Subestações do Distrito Industrial podem operar com cargas contínuas. Ciclos térmicos afetam conexões, isolamentos e contatos ao longo do tempo.</p>
        <p>Poeira e variação de temperatura favorecem o acúmulo de sujeira em isoladores e buchas. Limpeza e termografia podem ser indicadas após a inspeção.</p>
        <p>Relatório técnico, laudo e ART são tratados conforme a instalação, a contratação e as exigências do responsável pelo imóvel.</p>
      `,
      painPoint: 'Continuidade operacional de subestações industriais em ambiente semiárido.',
      cta: 'Solicite manutenção de subestação em Campina Grande.',
      faqExtra: {
        question: 'Com que frequência subestações industriais do Distrito Industrial de Campina Grande devem ser mantidas?',
        answer: 'A frequência depende do regime de carga, do ambiente, do histórico e do risco da instalação. O responsável técnico pode propor um intervalo e ajustá-lo conforme os resultados das inspeções.'
      }
    },
    'eletrica': {
      label: 'Serviços Elétricos',
      category: 'eletrica',
      template: 'eletrica',
      bairros: 'Centro, Prata, Catolé, Bodocongó e Liberdade',
      serviceContext: `
        <p>Oferecemos suporte técnico completo para o setor comercial e empresarial de Campina Grande. Desde o cabeamento estruturado para escritórios de tecnologia até instalações elétricas industriais complexas.</p>
        <p>Nossas soluções de infraestrutura elétrica podem reduzir riscos de sobrecarga em edifícios mais antigos da região central. A adequação para novas tecnologias e demandas de climatização depende da vistoria e do dimensionamento.</p>
      `,
      painPoint: 'Infraestrutura elétrica robusta para o polo tecnológico e comercial.',
      cta: 'Solicite um eletricista qualificado em Campina Grande.',
      faqExtra: {
        question: 'Vocês atendem emergências elétricas comerciais no Centro de Campina Grande?',
        answer: 'Podemos avaliar manutenções preventivas e corretivas em estabelecimentos comerciais e empresariais de Campina Grande. A janela de atendimento e o impacto na operação dependem da instalação e do plano aprovado.'
      }
    },
    'instalacoes-industriais': {
      label: 'Instalações Elétricas Industriais',
      category: 'eletrica',
      template: 'instalacoes-industriais',
      bairros: 'Distrito Industrial, Bodocongó e região metropolitana de Campina Grande',
      serviceContext: '<p>Desenvolvimento e montagem de infraestrutura elétrica industrial pesada no Distrito Industrial de Campina Grande, com foco em continuidade de operação e eficiência técnica.</p>',
      painPoint: 'Necessidade de infraestrutura industrial pesada em conformidade com as normas.',
      cta: 'Solicitar instalação industrial em Campina Grande.'
    },
    'carregador-veicular': {
      label: 'Instalação de Wallbox',
      category: 'eletrica',
      template: 'carregador-veicular',
      icon: 'fa-charging-station',
      summary: 'Instalação de carregador Wallbox com circuito dedicado em Campina Grande.',
      bairros: 'Alto Branco, Catolé, Prata, Mirante e condomínios de Campina Grande',
      serviceContext: '<p>Em Campina Grande, avaliamos a infraestrutura existente em residências, condomínios e empresas antes de definir o circuito dedicado e as proteções para o carregador.</p>',
      painPoint: 'Circuito dedicado e proteção elétrica para recarga em Campina Grande.',
      cta: 'Solicitar instalação de Wallbox em Campina Grande.'
    },
    'wallbox-residencial': {
      label: 'Instalação de Wallbox Residencial',
      category: 'eletrica',
      template: 'wallbox-residencial',
      heroImage: '/img/wallbox/wallbox-casa.webp',
      icon: 'fa-house-chimney',
      summary: 'Instalação de Wallbox residencial com circuito dedicado em Campina Grande.',
      bairros: 'Mirante, Alto Branco, Catolé, Prata, Sandra Cavalcante e condomínios Sierra, Nações, Alphaville Campina Grande',
      serviceContext: '<p>Instalação de carregadores veiculares residenciais em Campina Grande com projeto de engenharia, adequação de disjuntores e cabeamento antichamas dimensionado para suportar recargas contínuas de 7,4 kW a 22 kW sem riscos à rede da casa.</p>',
      painPoint: 'Evitar superaquecimento de condutores e desarmes na rede elétrica residencial.',
      cta: 'Solicitar orçamento de Wallbox residencial em Campina Grande.'
    },
    'wallbox-condominio': {
      label: 'Instalação de Wallbox em Condomínio',
      category: 'eletrica',
      template: 'wallbox-condominio',
      heroImage: '/img/wallbox/wallbox-condominio.webp',
      icon: 'fa-building',
      summary: 'Infraestrutura de recarga veicular para edifícios e condomínios em Campina Grande.',
      bairros: 'Condomínios no Mirante, Catolé, Alto Branco, Centro e Prata',
      serviceContext: '<p>Projetos técnicos completos para condomínios em Campina Grande: laudo de viabilidade de carga da subestação/quadro geral, instalação de barramentos, medição individual de energia e apresentação técnica para síndicos e conselho.</p>',
      painPoint: 'Viabilizar a recarga elétrica sem comprometer a capacidade elétrica do edifício e com medição justa.',
      cta: 'Solicitar projeto para condomínio em Campina Grande.'
    },
    'wallbox-empresa': {
      label: 'Instalação de Wallbox para Empresas',
      category: 'eletrica',
      template: 'wallbox-empresa',
      heroImage: '/img/wallbox/wallbox-empresa.webp',
      icon: 'fa-briefcase',
      summary: 'Estações de recarga veicular para empresas, indústrias e comércio em Campina Grande.',
      bairros: 'Distrito Industrial, Mirante, Catolé, Centro e polo de tecnologia de Bodocongó',
      serviceContext: '<p>Soluções de recarga elétrica para o setor comercial e industrial de Campina Grande: carregadores rápidos AC e DC, integração com sistemas de bilhetagem e faturamento, controle de frota elétrica e laudos com ART no CREA-PB.</p>',
      painPoint: 'Eletrificação corporativa com segurança de carga e controle de custos de abastecimento.',
      cta: 'Solicitar projeto corporativo em Campina Grande.'
    },
    'wallbox-energia-solar': {
      label: 'Wallbox com Energia Solar',
      category: 'eletrica',
      template: 'wallbox-energia-solar',
      heroImage: '/img/wallbox/wallbox-com-energia-solar.webp',
      icon: 'fa-solar-panel',
      summary: 'Sistemas integrados de geração solar fotovoltaica e carregamento elétrico veicular em Campina Grande e Agreste.',
      bairros: 'Campina Grande, Lagoa Seca, Queimadas, Esperança e região da Borborema',
      serviceContext: '<p>Estude a integração entre geração solar e recarga em Campina Grande com base na rotina do veículo, no consumo do imóvel e na infraestrutura elétrica disponível.</p>',
      painPoint: 'Relacionar horários de recarga à geração disponível e avaliar as adequações necessárias.',
      cta: 'Solicitar projeto Solar + Wallbox em Campina Grande.'
    },
    'projeto-rede': {
      label: 'Redes, Telefonia & Antenas',
      category: 'eletrica',
      template: 'projeto-rede',
      icon: 'fa-network-wired',
      summary: 'Cabeamento estruturado e Wi-Fi estável para o polo de tecnologia de Campina Grande.',
      bairros: 'Bodocongó, Centro, Catolé e bairros residenciais',
      serviceContext: '<p>Projetos de infraestrutura de rede, cabeamento estruturado e Wi-Fi de alta densidade sob medida para startups, empresas de tecnologia e residências de alto padrão em Campina Grande.</p>',
      painPoint: 'Infraestrutura de dados robusta e eliminação de zonas de sombra Wi-Fi.',
      cta: 'Solicitar projeto de rede em Campina Grande.'
    },
    'automacao': {
      label: 'Automação Smart',
      category: 'automacao',
      template: 'automacao',
      bairros: 'Alto Branco, Catolé, Mirante e Distrito Industrial',
      serviceContext: `
        <p>Em Campina Grande, a automação vai do controle de processos industriais com CLPs em fábricas até projetos de Smart Home de alto padrão em bairros como Alto Branco e Catolé.</p>
        <p>No setor corporativo, automatizamos a climatização e iluminação para combater as altas temperaturas do agreste com o máximo de eficiência energética, reduzindo os custos operacionais.</p>
      `,
      painPoint: 'Controle inteligente de processos industriais e climatização de ambientes.',
      cta: 'Agende uma visita técnica de automação em Campina.',
      faqExtra: {
        question: 'A Klyfe realiza automação para indústrias em Campina Grande?',
        answer: 'Sim, projetamos painéis de comando e sistemas de automação industrial para otimizar linhas de produção no polo industrial de Campina Grande.'
      }
    },
    'solar': {
      label: 'Energia Solar',
      category: 'solar',
      template: 'solar',
      bairros: 'Catolé, Cruzeiro, Bodocongó, Alto Branco e Região Rural',
      serviceContext: `
        <p>Somos especialistas na <strong>instalação de placa solar em Campina Grande</strong> e toda a região do Agreste. Desenvolvemos projetos inteligentes de energia solar fotovoltaica de alto rendimento para converter os excelentes níveis de irradiação local em economia real na sua fatura da Energisa Borborema.</p>
        <p>Atendemos desde residências em condomínios fechados até indústrias no Distrito Industrial de Campina Grande, garantindo uma <strong>instalação de painel solar em Campina Grande</strong> com módulos fotovoltaicos de altíssima eficiência e inversores dimensionados para operar com máxima performance térmica no clima semiárido.</p>
      `,
      painPoint: 'Alto custo de energia elétrica e necessidade de sistemas solares eficientes no agreste.',
      cta: 'Simule sua economia solar em Campina Grande.',
      faqExtra: {
        question: 'O clima quente de Campina Grande afeta a geração de energia solar?',
        answer: 'Sistemas mal dimensionados podem perder eficiência no calor extremo. Por isso, a Klyfe Electric utiliza equipamentos premium de alta tolerância térmica, garantindo geração máxima mesmo nos dias mais quentes do agreste.'
      }
    },
    'projeto-eletrico-multifamiliar': {
      bairros: 'Catolé, Alto Branco, Mirante, Prata e Bodocongó',
      serviceContext: `
        <p>Novos edifícios do Catolé, Alto Branco e Mirante reúnem várias unidades e áreas comuns. O projeto separa essas cargas e compatibiliza prumadas, quadros e caminhos de cabos com a arquitetura.</p>
        <p>A modelagem em BIM ajuda a revisar interferências antes da obra e a orientar a execução. O atendimento no canteiro, quando necessário, é definido na contratação.</p>
      `,
      painPoint: 'Necessidade de projetos multifamiliares robustos em BIM para construtoras do Agreste.',
      faqExtra: {
        question: 'Vocês dão suporte presencial no canteiro de obras em Campina Grande?',
        answer: 'Podemos avaliar visitas técnicas quando a fiscalização fizer parte do escopo. A frequência e o conteúdo dependem do cronograma e do contrato.'
      }
    },
    'projeto-eletrico-unifamiliar': {
      bairros: 'Condomínios fechados (Serraville, Alphaville, Monte Ville, Privilege)',
      serviceContext: `
        <p>Residências em condomínios fechados de Campina Grande precisam de pontos compatíveis com a planta, a rotina da família e os equipamentos previstos. O levantamento orienta tomadas, iluminação, climatização e o quadro de distribuição.</p>
        <p>O dimensionamento ajuda a reduzir quedas de tensão e organiza circuitos para futuras mudanças. A infraestrutura para automação entra quando estiver prevista no projeto.</p>
      `,
      painPoint: 'Distribuição de pontos e proteções compatíveis com residências de Campina Grande.',
      faqExtra: {
        question: 'O projeto elétrico residencial pode prever infraestrutura para carregador veicular?',
        answer: 'Podemos prever infraestrutura para carregador veicular, automação, climatização ou outros equipamentos quando isso estiver definido no programa da obra. Cada preparação é dimensionada conforme a carga prevista.'
      }
    },
    'projeto-eletrico-comercial': {
      bairros: 'Centro, Prata, Catolé e complexos empresariais',
      serviceContext: `
        <p>Clínicas da Prata, escritórios do Centro e restaurantes do Catolé podem ter equipamentos e layouts diferentes. O projeto organiza circuitos de força, iluminação e infraestrutura de dados conforme o uso do negócio.</p>
        <p>As cargas futuras e as proteções são avaliadas com os dados disponíveis. Apoio à aprovação na Energisa entra quando essa etapa estiver prevista.</p>
      `,
      painPoint: 'Adequar carga e layout para operações comerciais de Campina Grande.',
      faqExtra: {
        question: 'Como é feita a aprovação comercial junto à Energisa Borborema?',
        answer: 'Podemos preparar e acompanhar a documentação quando a aprovação fizer parte do escopo. O canal, a análise e o prazo dependem da Energisa Borborema.'
      }
    },
    'projeto-eletrico-industrial': {
      bairros: 'Distrito Industrial de Campina Grande e Bodocongó',
      serviceContext: `
        <p>Indústrias do Distrito Industrial e de Bodocongó precisam relacionar máquinas, motores e expansão de carga ao projeto elétrico. O levantamento orienta leitos de cabos, painéis, centros de controle e aterramento.</p>
        <p>Estudos de curto-circuito, seletividade e média tensão podem ser incluídos para apoiar a operação. Cada medida depende dos dados da planta e do escopo contratado.</p>
      `,
      painPoint: 'Organização de potência e proteção para plantas industriais do Agreste.',
      faqExtra: {
        question: 'Vocês realizam estudos de curto-circuito e seletividade em indústrias no Distrito Industrial de CG?',
        answer: 'Podemos elaborar estudos de curto-circuito e coordenação quando esses itens fizerem parte do escopo. O resultado depende das cargas, dos equipamentos e dos dados fornecidos pela planta.'
      }
    },
    'projeto-eletrico-multiplas-unidades': {
      bairros: 'Centro, Bodocongó, Catolé e áreas residenciais',
      serviceContext: `
        <p>Prédios, conjuntos comerciais e vilas de Campina Grande podem compartilhar uma entrada de energia com várias medições. O projeto separa unidades e áreas comuns e detalha caixas, barramentos, circuitos e aterramento.</p>
        <p>Os desenhos são organizados para a análise da Energisa Borborema. Protocolo, vistoria e eventuais ajustes dependem da documentação completa e das regras da ligação.</p>
      `,
      painPoint: 'Organizar medições coletivas e reduzir retrabalho na ligação de energia.',
      faqExtra: {
        question: 'A Energisa Borborema exige projeto para quantas caixas de medição em Campina Grande?',
        answer: 'A exigência depende do agrupamento de medição, da demanda calculada e dos limites de atendimento definidos pela Energisa Borborema para cada ligação.'
      }
    },
    'projeto-luminotecnico': {
      bairros: 'Centro, Prata, Catolé e polos de escritórios',
      serviceContext: `
        <p>Escritórios, salas de aula e comércios de Campina Grande precisam equilibrar conforto visual e consumo. O estudo considera a atividade de cada ambiente, a luz natural e a posição das luminárias.</p>
        <p>Simulações podem comparar iluminância, uniformidade e ofuscamento antes da compra. Medições e especificações finais dependem do escopo contratado.</p>
      `,
      painPoint: 'Iluminação irregular e consumo elevado em ambientes de Campina Grande.',
      faqExtra: {
        question: 'Como o projeto luminotécnico é validado para empresas em Campina Grande?',
        answer: 'Podemos simular os ambientes e incluir medições após a montagem quando essa etapa estiver contratada. Os critérios de iluminação são definidos conforme a atividade e o projeto.'
      }
    },
    'spda': {
      bairros: 'Bodocongó, Distrito Industrial, Catolé e Alto Branco',
      serviceContext: `
        <p>Em Campina Grande, empreendimentos do Distrito Industrial, galpões e edifícios podem precisar de uma avaliação de SPDA conforme o uso, a ocupação, a exposição, as características da construção e as exigências aplicáveis ao imóvel.</p>
        <p>A Klyfe pode avaliar, projetar, instalar, adequar e inspecionar SPDA com referência à ABNT NBR 5419 vigente. Os testes de continuidade, aterramento e conexões são definidos conforme a edificação e o escopo técnico.</p>
        <p>Em plantas do Distrito Industrial, o levantamento pode ser compatibilizado com coberturas metálicas, estruturas de utilidades, linhas de produção e rotas de cabos. A equipe identifica interferências e registra as premissas antes de definir a solução.</p>
        <p>Para prédios comerciais, residenciais e instalações rurais do Agreste, a inspeção pode observar descidas aparentes, conexões, caixas de inspeção, eletrodos e registros anteriores. Qualquer correção é recomendada somente depois de avaliar o estado encontrado.</p>
      `,
      painPoint: 'Necessidade de diagnosticar SPDA, documentação e condições de continuidade em edificações de Campina Grande.',
      faqExtra: {
        question: 'Com que frequência as empresas do Distrito Industrial de CG devem inspecionar o SPDA?',
        answer: 'A periodicidade depende do tipo de edificação, do ambiente, do histórico e das exigências do responsável pelo imóvel. A NBR 5419 e o responsável técnico orientam o plano de inspeção aplicável.'
      }
    },
    'projeto-subestacao': {
      bairros: 'Distrito Industrial de Campina Grande, Bodocongó e Zona Rural',
      serviceContext: `
        <p>Quando a carga ou a demanda supera o limite de atendimento em baixa tensão, a instalação pode precisar de uma subestação própria. A Energisa Borborema confirma o enquadramento de cada ligação.</p>
        <p>Elaboramos projetos civis e elétricos para subestações aéreas e abrigadas. A potência, a proteção e os documentos são definidos conforme a demanda, o local e as regras da Energisa Borborema.</p>
      `,
      painPoint: 'Necessidade de expansão de carga para novos maquinários industriais em Campina Grande.',
      faqExtra: {
        question: 'Quais os tipos de subestação mais aprovados pela Energisa Borborema?',
        answer: 'A escolha entre subestação aérea e abrigada depende da demanda, do espaço, da segurança e das regras de atendimento. O limite de 500 kVA é uma referência do serviço, não uma regra para todos os projetos.'
      }
    },
    'pericia-ressarcimento-danos': {
      bairros: 'Todos os bairros e indústrias do Distrito Industrial de Campina Grande',
      serviceContext: `
        <p>Após uma oscilação ou outro distúrbio, a perícia em Campina Grande reúne registros do evento, do equipamento e da instalação interna. A vistoria pode incluir fotos, identificação das cargas e análise dos documentos disponíveis.</p>
        <p>O laudo descreve os achados e os limites da análise. Ele pode apoiar um pedido de ressarcimento, cuja decisão depende da Energisa Borborema e das regras aplicáveis.</p>
      `,
      painPoint: 'Danos em equipamentos e necessidade de organizar evidências técnicas.',
      faqExtra: {
        question: 'O que fazer caso a Energisa Borborema recuse o pedido administrativo de ressarcimento?',
        answer: 'O pedido deve seguir os canais, prazos e documentos informados pela Energisa Borborema. Um laudo de terceiro pode organizar os achados quando fizer parte do escopo contratado; questões jurídicas devem ser avaliadas com advogado.'
      }
    },
    'pericia-furto-energia': {
      bairros: 'Centro, Bodocongó, Catolé, Prata e bairros periféricos',
      serviceContext: `
        <p>Um TOI registra uma irregularidade apontada pela concessionária durante a inspeção do medidor. Em Campina Grande, a análise independente pode revisar o termo, as fotos, o padrão de entrada e o histórico de consumo.</p>
        <p>O parecer organiza os dados que podem ser usados em uma contestação. O resultado depende das provas reunidas e da autoridade que analisa o caso.</p>
      `,
      painPoint: 'Cobranças de consumo que precisam de conferência técnica.',
      faqExtra: {
        question: 'A perícia da Klyfe consegue suspender a cobrança do TOI da Energisa Borborema?',
        answer: 'A análise técnica pode ajudar a organizar uma contestação. Cobrança, suspensão e medidas judiciais dependem do caso e devem ser avaliadas com advogado.'
      }
    },
    'viabilidade-carregador-veicular': {
      bairros: 'Condomínios fechados do Catolé, Alto Branco e Mirante',
      serviceContext: `
        <p>Em condomínios do Catolé, Alto Branco e Mirante, a instalação de carregadores precisa considerar vagas, caminhos de cabos e a capacidade da infraestrutura comum. O estudo reúne o perfil de consumo e a potência pretendida.</p>
        <p>O parecer indica se a rede atende ao uso previsto ou se serão necessárias adequações. A decisão do condomínio e o eventual protocolo seguem o escopo e as regras aplicáveis.</p>
      `,
      painPoint: 'Dúvidas sobre capacidade e infraestrutura para carregadores em condomínios.',
      faqExtra: {
        question: 'O laudo de viabilidade de carregador evita a necessidade de trocar o transformador do prédio em Campina Grande?',
        answer: 'O estudo compara a demanda atual com a potência dos carregadores e pode avaliar controle de demanda ou adequações. A necessidade de trocar o transformador só pode ser definida após os dados do local.'
      }
    }
  }
};
