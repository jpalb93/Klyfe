module.exports = {
  name: 'João Pessoa',
  preposition: 'em',
  region: 'Grande João Pessoa',
  state: 'Paraíba',
  concessionaria: 'Energisa Paraíba',
  address: 'Av. Pref. Severino Bezerra Cabral, 1225 - Mirante, Campina Grande - PB, 58410-640',
  phone: '(83) 99133-0972',
  whatsappMessage: 'Olá! Vi o site da Klyfe em João Pessoa e gostaria de um orçamento.',
  cta: 'Fale com nosso consultor técnico em João Pessoa.',
  allServices: true,

  solarContent: {
    distribuidora: "Energisa Paraíba",
    distribuidoraSlug: "energisa-paraiba",
    irradiacao: "5,6 kWh/m²/dia",
    contextoRegional: "A instalação de placa solar em João Pessoa e região metropolitana aproveita uma média excepcional de irradiação solar de 5,6 kWh/m²/dia. Embora a nebulosidade costeira seja ligeiramente maior que no sertão, os índices estão muito acima da média nacional. Um projeto de energia solar de 5 kWp gera em média 590 kWh/mês na capital. A Klyfe Electric projeta sistemas sob medida para a orla marítima, garantindo que a instalação de painel solar em João Pessoa suporte a ação do tempo, transformando a abundante luz do litoral paraibano em economia imediata de até 95% na conta de luz.",
    homologacao: "Para a instalação de placa solar em João Pessoa, cuidamos de todo o processo de homologação técnica junto à Energisa Paraíba. Nossa equipe cuida de toda a burocracia: da submissão do projeto elétrico predial ou residencial à distribuidora de acordo com o Módulo 3 do PRODIST até a vistoria de conformidade técnica e a instalação do medidor bidirecional, assegurando que o sistema seja ativado de forma rápida e segura.",
    mercadoAlvo: "Atendemos a demandas residenciais de alto padrão nos bairros do Altiplano Nobre, Bessa, Cabo Branco, Tambaú e condomínios horizontais da Grande João Pessoa, além de hotéis, restaurantes e estabelecimentos comerciais na orla que buscam diminuir os custos operacionais fixos com energia solar."
  },

  industrialContent: {
    polosIndustriais: "A Grande João Pessoa concentra o Polo Industrial de Conde e o Porto de Cabedelo, com demandas elétricas industriais de grande porte: subestações, cabines primárias, sistemas de aterramento em áreas portuárias e instalações elétricas para armazéns de logística. O setor hoteleiro e de grande varejo na orla também demanda projetos de instalações comerciais de médio porte com eficiência energética.",
    automacaoContexto: "O mercado de automação em João Pessoa é impulsionado pelo crescimento imobiliário de alto padrão nos bairros do Altiplano e Cabo Branco, com demanda por automação residencial (home automation), sistemas de segurança integrados e infraestrutura elétrica para condomínios de luxo."
  },

  services: {
    'laudos-eletricos': {
      label: 'Laudos Técnicos & ART',
      category: 'engenharia',
      template: 'servicos/laudos-eletricos',
      bairros: 'Manaíra, Altiplano, Bessa, Tambaú, Cabo Branco e Cabedelo',
      serviceContext: `
        <p>Em áreas litorâneas, a maresia pode acelerar a oxidação de componentes. Conexões e quadros devem ser observados durante a vistoria.</p>
        <p>A termografia e a avaliação do SPDA são escolhidas conforme o ambiente, o histórico e o objetivo do laudo. A necessidade de materiais ou testes específicos é confirmada no escopo.</p>
      `,
      painPoint: 'Corrosão por maresia em conexões e quadros elétricos litorâneos.',
      cta: 'Solicite seu laudo técnico em João Pessoa.',
      faqExtra: {
        question: 'A maresia de João Pessoa exige laudos elétricos mais frequentes?',
        answer: 'A salinidade pode acelerar a oxidação em quadros e conexões. A periodicidade e os testes indicados dependem do ambiente, do histórico e da avaliação do responsável técnico.'
      }
    },
    'engenharia': {
      label: 'Engenharia Elétrica',
      category: 'engenharia',
      template: 'engenharia',
      bairros: 'Manaíra, Altiplano, Tambaú e Distrito Industrial',
      serviceContext: `
        <p>Nossa engenharia em João Pessoa atua na segurança e na continuidade de grandes empreendimentos por meio de diagnósticos técnicos e planos de manutenção definidos para cada instalação.</p>
        <p>Laudos e manutenção de subestações podem apoiar a identificação de riscos e a organização das adequações. A conformidade depende das condições encontradas, das normas aplicáveis e do escopo contratado.</p>
      `,
      painPoint: 'Necessidade de laudos técnicos e manutenção de subestações em ambiente litorâneo.',
      cta: 'Consultar nossa engenharia técnica em João Pessoa.'
    },
    'manutencao-subestacao': {
      label: 'Manutenção de Subestação',
      category: 'engenharia',
      template: 'servicos/manutencao-subestacao',
      bairros: 'Manaíra, Tambaú, Bessa, Cabo Branco, Altiplano e Cabedelo',
      serviceContext: `
        <p>Na orla de João Pessoa, a maresia pode acelerar a oxidação de componentes. A inspeção ajuda a identificar conexões e materiais que merecem atenção.</p>
        <p>O atendimento pode incluir limpeza, termografia e testes de isolação, conforme o estado da subestação e o escopo contratado.</p>
      `,
      painPoint: 'Corrosão por maresia e risco de parada energética em subestações.',
      cta: 'Solicitar manutenção de subestação em João Pessoa.',
      faqExtra: {
        question: 'A maresia de João Pessoa exige manutenção mais frequente?',
        answer: 'A maresia pode exigir inspeções mais frequentes em alguns ambientes. A periodicidade é definida pelo histórico, pelo estado dos componentes e pela avaliação do responsável técnico.'
      }
    },
    'eletrica': {
      label: 'Serviços Elétricos',
      category: 'eletrica',
      template: 'eletrica',
      bairros: 'Altiplano, Manaíra, Tambaú, Bessa e Cabo Branco',
      serviceContext: `
        <p>Oferecemos suporte técnico especializado para a infraestrutura elétrica de João Pessoa. Atuamos em reformas, manutenções preventivas e instalações de alto padrão para condomínios e empresas litorâneas.</p>
        <p>Nossa equipe pode especificar materiais e técnicas com resistência à oxidação quando o ambiente exigir. A durabilidade depende da exposição, da instalação, da manutenção e dos componentes escolhidos.</p>
      `,
      painPoint: 'Necessidade de eletricistas especializados em ambientes litorâneos e maresia.',
      cta: 'Solicitar eletricista em João Pessoa.'
    },
    'instalacoes-industriais': {
      label: 'Instalações Elétricas Industriais',
      category: 'eletrica',
      template: 'instalacoes-industriais',
      bairros: 'Distrito Industrial de João Pessoa e região metropolitana',
      serviceContext: '<p>Montagens e manutenções elétricas industriais robustas focadas em alta disponibilidade e segurança para fábricas da Grande João Pessoa.</p>',
      painPoint: 'Continuidade operacional e segurança para infraestrutura industrial pesada.',
      cta: 'Solicitar instalação industrial em João Pessoa.'
    },
    'carregador-veicular': {
      label: 'Instalação de Wallbox',
      category: 'eletrica',
      template: 'carregador-veicular',
      icon: 'fa-charging-station',
      summary: 'Instalação de carregador Wallbox com circuito dedicado em João Pessoa.',
      bairros: 'Manaíra, Altiplano, Bessa, Cabo Branco, Tambaú e região',
      serviceContext: '<p>A proximidade com o mar pode exigir materiais e conexões com tratamento anticorrosivo na instalação de carregadores veiculares na orla de João Pessoa. A especificação é definida após avaliar a exposição e o equipamento.</p>',
      painPoint: 'Infraestrutura de recarga adequada para imóveis em João Pessoa e região.',
      cta: 'Solicitar instalação de Wallbox em João Pessoa.'
    },
    'wallbox-residencial': {
      label: 'Instalação de Wallbox Residencial',
      category: 'eletrica',
      template: 'wallbox-residencial',
      heroImage: '/img/wallbox/wallbox-casa.webp',
      icon: 'fa-house-chimney',
      summary: 'Instalação de Wallbox residencial com circuito dedicado em João Pessoa e Cabedelo.',
      bairros: 'Altiplano, Manaíra, Cabo Branco, Bessa, Tambaú, Intermares e condomínios Alphaville, Bosque das Gameleiras, Bougainville, Cabo Branco Privê',
      serviceContext: '<p>Em residências e condomínios horizontais de João Pessoa e Cabedelo, dimensionamos o circuito elétrico dedicado, quadro de distribuição e proteções DR Tipo A/B e DPS para recarga segura de veículos elétricos.</p>',
      painPoint: 'Recarga rápida e segura em casa, sem risco de desarmar o disjuntor geral.',
      cta: 'Solicitar orçamento de Wallbox residencial em João Pessoa.'
    },
    'wallbox-condominio': {
      label: 'Instalação de Wallbox em Condomínio',
      category: 'eletrica',
      template: 'wallbox-condominio',
      heroImage: '/img/wallbox/wallbox-condominio.webp',
      icon: 'fa-building',
      summary: 'Infraestrutura de recarga elétrica para condomínios verticais em João Pessoa com medição individual.',
      bairros: 'Edifícios em Manaíra, Altiplano, Cabo Branco, Tambaú, Bessa e Jardim Oceania',
      serviceContext: '<p>Projetos com ART no CREA-PB para condomínios em João Pessoa: viabilidade técnica de carga, passagem de cabeamento em prumadas coletivas, medidores digitais homologados pelo Inmetro e suporte técnico para assembleias.</p>',
      painPoint: 'Regularização técnica com o síndico, medição individual de energia e segurança contra sobrecargas.',
      cta: 'Solicitar consultoria para condomínio em João Pessoa.'
    },
    'wallbox-empresa': {
      label: 'Instalação de Wallbox para Empresas',
      category: 'eletrica',
      template: 'wallbox-empresa',
      heroImage: '/img/wallbox/wallbox-empresa.webp',
      icon: 'fa-briefcase',
      summary: 'Estações de recarga veicular para empresas, clínicas, hotéis e centros comerciais de João Pessoa.',
      bairros: 'Av. Epitácio Pessoa, Centro, Manaíra, Bessa, Bancários, Distrito Industrial e Polo Turístico',
      serviceContext: '<p>Soluções corporativas completas na Grande João Pessoa: totens de alta potência, protocolo aberto OCPP, autenticação por RFID/App e dimensionamento de carga compatível com a entrada de energia da empresa.</p>',
      painPoint: 'Eletrificação de frota, atendimento a clientes de veículos elétricos e selo de sustentabilidade empresarial.',
      cta: 'Solicitar projeto de recarga corporativa em João Pessoa.'
    },
    'wallbox-energia-solar': {
      label: 'Wallbox com Energia Solar',
      category: 'eletrica',
      template: 'wallbox-energia-solar',
      heroImage: '/img/wallbox/wallbox-com-energia-solar.webp',
      icon: 'fa-solar-panel',
      summary: 'Recarga veicular inteligente alimentada por energia solar fotovoltaica em João Pessoa e região.',
      bairros: 'João Pessoa, Cabedelo, Conde, Lucena, Santa Rita e Bayeux',
      serviceContext: '<p>Estude a integração entre geração solar e recarga em João Pessoa com base na rotina do veículo, no consumo do imóvel e na infraestrutura elétrica disponível.</p>',
      painPoint: 'Aproveitar a geração disponível para recarga sem presumir economia ou independência da rede.',
      cta: 'Solicitar projeto Solar + Wallbox em João Pessoa.'
    },
    'projeto-rede': {
      label: 'Redes, Telefonia & Antenas',
      category: 'eletrica',
      template: 'projeto-rede',
      icon: 'fa-network-wired',
      summary: 'Infraestrutura de dados de alta performance e Wi-Fi estável sem zonas mortas.',
      bairros: 'Altiplano, Manaíra, Tambaú, Bessa e Cabedelo',
      serviceContext: '<p>Projetos de conectividade cabeada e Wi-Fi Mesh podem ser dimensionados para apartamentos de alto padrão e empresas em João Pessoa. A cobertura e a estabilidade dependem do layout, dos equipamentos e da infraestrutura.</p>',
      painPoint: 'Problemas de cobertura Wi-Fi em edifícios de alta densidade no Altiplano e orla.',
      cta: 'Solicitar projeto de rede em João Pessoa.'
    },
    'automacao': {
      label: 'Automação Smart',
      category: 'automacao',
      template: 'automacao',
      bairros: 'Altiplano, Bessa, Manaíra, Tambaú e Intermares',
      serviceContext: `
        <p>Levamos o conforto e a sofisticação da automação residencial para os melhores endereços de João Pessoa. Projetos de Smart Home com controle total de iluminação, climatização e segurança via smartphone.</p>
        <p>Integramos tecnologias que podem apoiar o controle de energia em prédios e residências de alto padrão no Altiplano e nos bairros da orla. O resultado depende dos dispositivos, das regras e do perfil de uso.</p>
      `,
      painPoint: 'Busca por conforto, sofisticação e controle tecnológico em residências de alto padrão.',
      cta: 'Agendar consultoria de automação em João Pessoa.'
    },
    'solar': {
      label: 'Energia Solar',
      category: 'solar',
      template: 'solar',
      bairros: 'Bessa, Intermares, Cabedelo, Altiplano e João Pessoa',
      serviceContext: `
        <p>Oferecemos o serviço especializado de <strong>instalação de placa solar em João Pessoa</strong> e em toda a faixa litorânea. Projetamos sistemas fotovoltaicos sob medida para aproveitar ao máximo a irradiação da capital paraibana com altíssima eficiência.</p>
        <p>Nossa equipe utiliza suportes de alumínio e ferragens com tratamento anticorrosivo rigoroso para proteger a <strong>instalação de painel solar em João Pessoa</strong> contra a ação direta da maresia. Tenha até 95% de economia na fatura de energia com homologação inclusa na Energisa Paraíba.</p>
      `,
      painPoint: 'Altos custos de energia e necessidade de sistemas solares resistentes à corrosão litorânea.',
      cta: 'Simular economia solar em João Pessoa.'
    },
    'projeto-eletrico-multifamiliar': {
      bairros: 'Altiplano, Cabo Branco, Tambaú, Manaíra e Bessa',
      serviceContext: `
        <p>Edifícios do Altiplano e da orla de João Pessoa costumam reunir muitas unidades e áreas comuns. O projeto elétrico precisa separar essas cargas e compatibilizar prumadas, quadros e caminhos de cabos com a arquitetura.</p>
        <p>A modelagem em BIM ajuda a revisar interferências antes da obra. Em locais sujeitos à maresia, o estudo também pode considerar o ambiente e os materiais adequados, conforme os dados do empreendimento.</p>
      `,
      painPoint: 'Segurança e compatibilização estrutural em BIM para arranha-céus residenciais da capital.',
      faqExtra: {
        question: 'Como a maresia afeta os projetos elétricos multifamiliares na orla de João Pessoa?',
        answer: 'Em edifícios costeiros, a salinidade pode acelerar a corrosão de quadros e eletrodutos externos. O projeto pode considerar materiais e acabamentos adequados após avaliar exposição, instalação e requisitos do empreendimento.'
      }
    },
    'projeto-eletrico-unifamiliar': {
      bairros: 'Condomínios horizontais (Alphaville Paraíba, Bosque das Gameleiras, Cabo Branco Privê)',
      serviceContext: `
        <p>Residências em condomínios de João Pessoa precisam de pontos elétricos compatíveis com a planta, a rotina da família e os equipamentos previstos. O levantamento orienta tomadas, iluminação, climatização e o quadro de distribuição.</p>
        <p>Quando solicitado, a modelagem em BIM ajuda a comparar a rede elétrica com a arquitetura. A especificação de proteções e de infraestrutura para automação depende do projeto e do escopo contratado.</p>
      `,
      painPoint: 'Distribuição de pontos e proteções compatíveis com residências de João Pessoa.',
      faqExtra: {
        question: 'Quais normas a Klyfe segue para projetos residenciais unifamiliares em condomínios fechados de João Pessoa?',
        answer: 'Usamos a NBR 5410 como referência para instalações de baixa tensão e conferimos as exigências da Energisa aplicáveis ao padrão de entrada da obra.'
      }
    },
    'projeto-eletrico-comercial': {
      bairros: 'Tambaú, Cabo Branco, Manaíra, Bessa e Centro',
      serviceContext: `
        <p>Hotéis, restaurantes e escritórios de Tambaú, Cabo Branco e Bessa podem ter mudanças de layout e equipamentos com cargas diferentes. O projeto registra circuitos de força, iluminação e infraestrutura de dados conforme o uso do negócio.</p>
        <p>Geradores, nobreaks e apoio à aprovação na Energisa entram somente quando forem necessários e estiverem previstos na contratação.</p>
      `,
      painPoint: 'Adequar carga e layout para operações comerciais na capital.',
      faqExtra: {
        question: 'A Klyfe aprova projetos comerciais para novos estabelecimentos na orla de João Pessoa?',
        answer: 'Podemos preparar e acompanhar a documentação quando a aprovação ou o aumento de carga fizer parte do escopo. A análise e o prazo dependem da Energisa.'
      }
    },
    'projeto-eletrico-industrial': {
      bairros: 'Polo Industrial de Conde, Cabedelo e Distrito Industrial de JP',
      serviceContext: `
        <p>Indústrias de João Pessoa, Conde e Cabedelo precisam relacionar máquinas, motores, turnos e expansão de carga ao projeto elétrico. O levantamento orienta painéis, centros de controle, rotas de cabos e aterramento.</p>
        <p>Estudos de curto-circuito, seletividade e proteção podem ser incluídos para apoiar a operação e a manutenção. Cada medida depende dos dados da planta e do escopo contratado.</p>
      `,
      painPoint: 'Organização de potência e proteção para plantas industriais da região.',
      faqExtra: {
        question: 'Como a Klyfe protege instalações elétricas industriais em áreas portuárias de Cabedelo?',
        answer: 'Em áreas próximas ao mar, o ambiente pode influenciar a escolha de invólucros e materiais. A especificação é definida após avaliar exposição, instalação e requisitos do projeto.'
      }
    },
    'projeto-eletrico-multiplas-unidades': {
      bairros: 'Torre, Miramar, Manaíra, Altiplano e Cabedelo',
      serviceContext: `
        <p>Condomínios e centros comerciais de João Pessoa podem compartilhar uma entrada de energia com várias medições. O projeto separa unidades e áreas comuns e detalha caixas, barramentos, circuitos e aterramento.</p>
        <p>Os desenhos são organizados para a análise da Energisa. Protocolo, vistoria e eventuais ajustes dependem da documentação completa e das regras da ligação.</p>
      `,
      painPoint: 'Organizar medições coletivas e reduzir retrabalho na ligação de energia.',
      faqExtra: {
        question: 'Onde o projeto de múltiplas unidades é protocolado em João Pessoa?',
        answer: 'O canal e os documentos dependem do tipo de ligação. Quando contratado, o protocolo pode ser preparado e acompanhado conforme as orientações da Energisa.'
      }
    },
    'projeto-luminotecnico': {
      bairros: 'Manaíra, Altiplano, Cabo Branco, Tambaú e Miramar',
      serviceContext: `
        <p>Hotéis, restaurantes e escritórios de João Pessoa precisam equilibrar aparência, conforto e consumo de energia. O estudo considera a atividade de cada ambiente, a luz natural e a posição das luminárias.</p>
        <p>Simulações podem comparar níveis de iluminância, uniformidade e ofuscamento antes da compra. Medições e especificações finais dependem do escopo contratado.</p>
      `,
      painPoint: 'Iluminação irregular e consumo elevado em ambientes comerciais da capital.',
      faqExtra: {
        question: 'O projeto luminotécnico da Klyfe em João Pessoa prevê controle automatizado de intensidade?',
        answer: 'Podemos estudar sensores e dimmers quando o sistema de controle fizer parte do escopo. A solução depende do layout, dos equipamentos e da automação existente.'
      }
    },
    'spda': {
      bairros: 'Altiplano, Manaíra, Cabo Branco, Bessa e Cabedelo',
      serviceContext: `
        <p>Em áreas da Grande João Pessoa expostas à umidade e à atmosfera salina, a corrosão pode influenciar o estado de conexões, condutores e eletrodos. Essa condição não é presumida para toda edificação: ela é verificada no levantamento e na inspeção.</p>
        <p>A Klyfe avalia, projeta, instala e adequa SPDA em João Pessoa conforme a ABNT NBR 5419 vigente e o escopo técnico. A inspeção pode incluir continuidade, aterramento, conexões e registro fotográfico, de acordo com as condições encontradas.</p>
        <p>Em condomínios, hotéis, comércios e edifícios de João Pessoa e Cabedelo, o levantamento pode precisar compatibilizar cobertura, fachadas, áreas técnicas, estruturas metálicas e caminhos de cabos. A solução é definida depois de verificar o imóvel e os documentos disponíveis.</p>
        <p>Quando já existe um sistema, a equipe registra o estado das descidas, conexões, eletrodos e pontos de inspeção antes de recomendar manutenção ou adequação. A exposição costeira é tratada como uma condição a investigar, não como uma conclusão automática.</p>
      `,
      painPoint: 'Necessidade de avaliar corrosão, continuidade e documentação técnica em SPDA de edificações da Grande João Pessoa.',
      faqExtra: {
        question: 'A salinidade da praia de João Pessoa afeta o aterramento do SPDA?',
        answer: 'A exposição à atmosfera salina pode acelerar a corrosão de eletrodos e conexões em algumas instalações. Por isso, o projeto ou a inspeção deve avaliar o ambiente, os materiais e o estado do aterramento antes de definir qualquer intervenção.'
      }
    },
    'projeto-subestacao': {
      bairros: 'Distrito Industrial, Conde, Cabedelo, Altiplano e Tambaú',
      serviceContext: `
        <p>Condomínios verticais de grande porte na capital e indústrias de João Pessoa dependem de projetos de subestação eficientes para conexão à rede de média tensão da Energisa Paraíba.</p>
        <p>Elaboramos projetos civis e elétricos para subestações aéreas e abrigadas. O cálculo de proteção, a potência do transformador e a documentação são definidos conforme a demanda e as exigências da concessionária.</p>
      `,
      painPoint: 'Demanda reprimida de energia e necessidade de tarifa verde mais barata na capital.',
      faqExtra: {
        question: 'A Klyfe atende projetos de subestações abrigadas no Altiplano em João Pessoa?',
        answer: 'Podemos avaliar subestações abrigadas para edifícios de grande altura no Altiplano. A solução, o local da cabine e os limites de atendimento são confirmados no estudo e com a Energisa Paraíba.'
      }
    },
    'pericia-ressarcimento-danos': {
      bairros: 'Todos os bairros e indústrias da Grande João Pessoa',
      serviceContext: `
        <p>Após uma oscilação ou outro distúrbio, a perícia em João Pessoa reúne registros do evento, do equipamento e da instalação interna. A vistoria pode incluir fotos, identificação das cargas e análise dos documentos disponíveis.</p>
        <p>O laudo descreve os achados e os limites da análise. Ele pode apoiar um pedido de ressarcimento, cuja decisão depende da Energisa e das regras aplicáveis.</p>
      `,
      painPoint: 'Danos em equipamentos e necessidade de organizar evidências técnicas.',
      faqExtra: {
        question: 'Como abrir um processo de ressarcimento contra a Energisa Paraíba?',
        answer: 'O pedido começa pelos canais da Energisa e deve seguir os prazos e documentos informados pela distribuidora. Um laudo de terceiro pode ser preparado quando fizer parte do escopo contratado.'
      }
    },
    'pericia-furto-energia': {
      bairros: 'Manaíra, Bessa, Tambaú, Cabo Branco, Centro e Geisel',
      serviceContext: `
        <p>Um TOI registra uma irregularidade apontada pela concessionária durante a inspeção do medidor. Em João Pessoa, a análise independente pode revisar o termo, as fotos, o padrão de entrada e o histórico de consumo.</p>
        <p>O parecer organiza os dados que podem ser usados em uma contestação. O resultado depende das provas reunidas e da autoridade que analisa o caso.</p>
      `,
      painPoint: 'Cobranças de consumo que precisam de conferência técnica.',
      faqExtra: {
        question: 'A Energisa Paraíba pode suspender o fornecimento de luz por recusa do pagamento do TOI?',
        answer: 'As medidas de cobrança e eventual suspensão dependem do caso e das regras aplicáveis. Questões jurídicas devem ser avaliadas com advogado; a perícia fornece apenas a análise técnica contratada.'
      }
    },
    'viabilidade-carregador-veicular': {
      bairros: 'Altiplano, Cabo Branco, Tambaú, Manaíra e Bessa',
      serviceContext: `
        <p>Em condomínios de João Pessoa, a instalação de carregadores precisa considerar vagas, caminhos de cabos e a capacidade da infraestrutura comum. O estudo reúne o perfil de consumo e a potência pretendida.</p>
        <p>O parecer indica se a rede atende ao uso previsto ou se serão necessárias adequações. A decisão do condomínio e a aprovação de qualquer alteração seguem o escopo e as regras aplicáveis.</p>
      `,
      painPoint: 'Dúvidas sobre capacidade e infraestrutura para carregadores em condomínios.',
      faqExtra: {
        question: 'Como funciona o estudo de viabilidade para carregadores em prédios do Altiplano?',
        answer: 'O estudo pode incluir medições e uma comparação entre a demanda atual e a potência dos carregadores. Se houver pouco espaço de carga, podem ser avaliados controle de demanda ou adequações.'
      }
    }
  }
};
