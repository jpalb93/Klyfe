module.exports = {
  name: 'João Pessoa',
  preposition: 'em',
  region: 'Grande João Pessoa',
  state: 'Paraíba',
  concessionaria: 'Energisa Paraíba',
  address: 'Atendimento Presencial e Consultoria - João Pessoa - PB',
  phone: '(83) 99133-0972',
  whatsappMessage: 'Olá! Vi o site da Klyfe em João Pessoa e gostaria de um orçamento.',
  cta: 'Fale com nosso consultor técnico em João Pessoa.',

  solarContent: {
    distribuidora: "Energisa Paraíba",
    distribuidoraSlug: "energisa-paraiba",
    irradiacao: "5,6 kWh/m²/dia",
    contextoRegional: "João Pessoa, no litoral paraibano, apresenta média de irradiação solar de 5,6 kWh/m²/dia — ligeiramente inferior ao interior do estado devido à maior umidade e nebulosidade costeira, mas ainda acima da média nacional. Um sistema de 5 kWp em João Pessoa produz em média 590 kWh/mês, suficiente para eliminar ou reduzir drasticamente a conta de energia em residências e comércios com consumo até 600 kWh/mês.",
    homologacao: "Em João Pessoa, a distribuidora responsável é a Energisa Paraíba. O processo de homologação segue o mesmo marco regulatório (ANEEL/PRODIST Módulo 3), com prazo médio de conexão de 30 a 60 dias após entrega da documentação completa. A Klyfe Electric realiza o projeto elétrico, a instalação certificada e todo o acompanhamento junto à Energisa Paraíba, incluindo a solicitação de troca do medidor bidirecional.",
    mercadoAlvo: "A capital concentra grande demanda em condomínios residenciais de médio e alto padrão nos bairros do Altiplano, Bessa e Cabo Branco, além de estabelecimentos comerciais na orla e no Centro Histórico."
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
        <p>As instalações na faixa litorânea enfrentam condições severas: a maresia corrói componentes com velocidade muito maior do que no interior. Conexões oxidadas aumentam o risco de arco elétrico.</p>
        <p>A termografia é recomendada para Manaíra, Tambaú e Altiplano, onde a degradação por salinidade é acelerada. O laudo de SPDA litorâneo também exige aterramento diferenciado.</p>
      `,
      painPoint: 'Corrosão por maresia em conexões e quadros elétricos litorâneos.',
      cta: 'Solicite seu laudo técnico em João Pessoa.',
      faqExtra: {
        question: 'A maresia de João Pessoa exige laudos elétricos mais frequentes?',
        answer: 'Sim. A salinidade acelera a oxidação em quadros elétricos. Para condomínios na orla (Cabo Branco, Tambaú, Bessa), a termografia é essencial para evitar curtos-circuitos causados por conexões deterioradas.'
      }
    },
    'engenharia': {
      label: 'Engenharia Elétrica',
      category: 'engenharia',
      template: 'engenharia',
      bairros: 'Manaíra, Altiplano, Tambaú e Distrito Industrial',
      serviceContext: `
        <p>Nossa engenharia em João Pessoa foca em garantir a segurança e continuidade de grandes empreendimentos através de diagnósticos técnicos precisos e manutenções críticas.</p>
        <p>Através de laudos técnicos e manutenção de subestações, garantimos que sua edificação ou indústria esteja protegida contra falhas e em total conformidade com as normas.</p>
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
        <p>Subestações na orla de João Pessoa sofrem com a maresia constante, que oxida componentes e aumenta o risco de falhas graves. Nossa manutenção preventiva é essencial para garantir a vida útil dos equipamentos.</p>
        <p>Realizamos limpeza técnica, termografia e testes de isolação, atendendo condomínios e indústrias na capital.</p>
      `,
      painPoint: 'Corrosão por maresia e risco de parada energética em subestações.',
      cta: 'Solicitar manutenção de subestação em João Pessoa.',
      faqExtra: {
        question: 'A maresia de João Pessoa exige manutenção mais frequente?',
        answer: 'Sim. A concentração de cloretos acelera a corrosão em subestações litorâneas. Recomendamos manutenção semestral para garantir a segurança e evitar paradas não programadas.'
      }
    },
    'eletrica': {
      label: 'Serviços Elétricos',
      category: 'eletrica',
      template: 'eletrica',
      bairros: 'Altiplano, Manaíra, Tambaú, Bessa e Cabo Branco',
      serviceContext: `
        <p>Oferecemos suporte técnico especializado para a infraestrutura elétrica de João Pessoa. Atuamos em reformas, manutenções preventivas e instalações de alto padrão para condomínios e empresas litorâneas.</p>
        <p>Nossa equipe utiliza materiais e técnicas resistentes à oxidação, garantindo a durabilidade das instalações elétricas mesmo sob efeito constante da maresia típica de João Pessoa.</p>
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
      label: 'Carregador Veicular (Wallbox)',
      category: 'eletrica',
      template: 'carregador-veicular',
      icon: 'fa-charging-station',
      summary: 'Instalação de Wallbox com proteção maresia-proof e circuito dedicado em João Pessoa.',
      bairros: 'Manaíra, Altiplano, Bessa, Cabo Branco, Tambaú e região',
      serviceContext: '<p>A proximidade com o mar exige materiais e conexões com tratamento anticorrosivo rigoroso na instalação de carregadores veiculares na orla de João Pessoa. Garantimos a proteção e durabilidade do seu EV Charger.</p>',
      painPoint: 'Necessidade de carregamento rápido e resistente à corrosão litorânea.',
      cta: 'Solicitar instalação de Wallbox em João Pessoa.'
    },
    'projeto-rede': {
      label: 'Redes, Telefonia & Antenas',
      category: 'eletrica',
      template: 'projeto-rede',
      icon: 'fa-network-wired',
      summary: 'Infraestrutura de dados de alta performance e Wi-Fi estável sem zonas mortas.',
      bairros: 'Altiplano, Manaíra, Tambaú, Bessa e Cabedelo',
      serviceContext: '<p>Projetos de conectividade cabeada e Wi-Fi Mesh dimensionados para apartamentos de alto padrão e empresas em João Pessoa, garantindo estabilidade total.</p>',
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
        <p>Especialistas em integrar tecnologias que otimizam o consumo de energia em prédios e residências de alto padrão no Altiplano e bairros da orla.</p>
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
        <p>João Pessoa possui um dos melhores índices de irradiação solar do país. A Klyfe Electric projeta e instala sistemas fotovoltaicos focados na máxima durabilidade litorânea.</p>
        <p>Utilizamos suportes e proteções com tratamento anticorrosivo rigoroso, protegendo seu investimento contra a maresia e garantindo até 95% de economia na conta de energia solar.</p>
      `,
      painPoint: 'Altos custos de energia e necessidade de sistemas solares resistentes à corrosão litorânea.',
      cta: 'Simular economia solar em João Pessoa.'
    },
    'projeto-eletrico-multifamiliar': {
      bairros: 'Altiplano, Cabo Branco, Tambaú, Manaíra e Bessa',
      serviceContext: `
        <p>O Altiplano Nobre e a orla de João Pessoa reúnem alguns dos arranha-céus residenciais mais altos do país. Projetar a rede elétrica de edifícios dessa magnitude exige uma engenharia de alto nível e precisão absoluta.</p>
        <p>Na Klyfe Electric, elaboramos projetos elétricos prediais em BIM tridimensional com foco na facilidade de execução física e proteção total contra o desgaste por salinidade. Garantimos que todas as prumadas verticais e centrais de distribuição estejam em conformidade estrita com as regulamentações técnicas da Energisa Paraíba.</p>
      `,
      painPoint: 'Segurança e compatibilização estrutural em BIM para arranha-céus residenciais da capital.',
      faqExtra: {
        question: 'Como a maresia afeta os projetos elétricos multifamiliares na orla de João Pessoa?',
        answer: 'Em edifícios costeiros, a salinidade penetra nos quadros e eletrodutos externos. Por isso, a Klyfe especifica materiais com tratamento especial (como PVC pesado, calhas de fibra e conexões de latão/inox) nos projetos da orla da capital, prolongando a vida útil do sistema.'
      }
    },
    'projeto-eletrico-unifamiliar': {
      bairros: 'Condomínios horizontais (Alphaville Paraíba, Bosque das Gameleiras, Cabo Branco Privê)',
      serviceContext: `
        <p>Projetar residências em condomínios fechados em João Pessoa exige compatibilização estreita com arquitetos locais e foco em automação.</p>
        <p>Desenhamos a rede elétrica prevendo a ergonometria total dos circuitos e protegendo os eletrodomésticos contra surtos elétricos induzidos. Nossa modelagem tridimensional em BIM assegura que a tubulação seja integrada às estruturas de concreto armado da casa, eliminando quebras desnecessárias de alvenaria.</p>
      `,
      painPoint: 'Projetos integrados a sistemas inteligentes e proteção total contra curtos em residências de alto padrão de João Pessoa.',
      faqExtra: {
        question: 'Quais normas a Klyfe segue para projetos residenciais unifamiliares em condomínios fechados de João Pessoa?',
        answer: 'Nossos projetos seguem rigorosamente a NBR 5410 da ABNT e as normas internas da Energisa Paraíba para o padrão de entrada monofásico, bifásico ou trifásico de energia.'
      }
    },
    'projeto-eletrico-comercial': {
      bairros: 'Tambaú, Cabo Branco, Manaíra, Bessa e Centro',
      serviceContext: `
        <p>O dinâmico setor de turismo e serviços em João Pessoa — hotéis em Tambaú, restaurantes no Cabo Branco e escritórios no Bessa — necessita de instalações elétricas flexíveis.</p>
        <p>Elaboramos projetos comerciais customizados para layouts de alta rotatividade. Dimensionamos circuitos dedicados de força, redes de dados estruturadas e prevemos geradores de emergência para que sua empresa continue faturando mesmo em caso de panes temporárias na rede externa da capital.</p>
      `,
      painPoint: 'Evitar inatividade comercial e garantir aprovação veloz de projetos na Energisa Paraíba.',
      faqExtra: {
        question: 'A Klyfe aprova projetos comerciais para novos estabelecimentos na orla de João Pessoa?',
        answer: 'Sim. Cuidamos do processo integral de homologação e aprovação de aumento de carga comercial junto à Energisa Paraíba, eliminando a burocracia para que sua empresa inicie as atividades no prazo acordado.'
      }
    },
    'projeto-eletrico-industrial': {
      bairros: 'Polo Industrial de Conde, Cabedelo e Distrito Industrial de JP',
      serviceContext: `
        <p>A Grande João Pessoa concentra indústrias petroquímicas, metalúrgicas, cimenteiras e centros logísticos portuários em Cabedelo. Operações industriais não toleram falhas no fornecimento elétrico de seus motores e linhas de montagem.</p>
        <p>A Klyfe desenvolve projetos industriais robustos focados na estabilidade de corrente e na proteção contra arcos elétricos. Projetamos painéis de força e controle, barramentos blindados e malhas de aterramento de alto desempenho, tudo em conformidade com as diretrizes de segurança da NR-10.</p>
      `,
      painPoint: 'Mitigação de blackouts internos e adequação de segurança à NR-10 em plantas fabris de João Pessoa.',
      faqExtra: {
        question: 'Como a Klyfe protege instalações elétricas industriais em áreas portuárias de Cabedelo?',
        answer: 'Especificamos invólucros estanques com elevado índice de proteção (IP) e tratamentos anticorrosivos específicos nos projetos industriais litorâneos, isolando barramentos contra o ar salino altamente corrosivo.'
      }
    },
    'projeto-eletrico-multiplas-unidades': {
      bairros: 'Torre, Miramar, Manaíra, Altiplano e Cabedelo',
      serviceContext: `
        <p>Desenvolvemos projetos de entradas de energia agrupadas (padrão de múltiplas unidades) adequados às normas e exigências da Energisa Paraíba para condomínios residenciais e centros comerciais na capital.</p>
        <p>A Klyfe projeta a alvenaria, o dimensionamento de barramentos de cobre e a fiação do centro de medição. Assim, garantimos que a distribuidora aprove a ligação de energia sem atrasos ou impedimentos burocráticos durante as vistorias de ligação final.</p>
      `,
      painPoint: 'Garantir a ligação de energia rápida e sem reprovações na vistoria técnica da Energisa Paraíba.',
      faqExtra: {
        question: 'Onde o projeto de múltiplas unidades é protocolado em João Pessoa?',
        answer: 'Ele é submetido digitalmente através do sistema de atendimento de média/baixa tensão corporativo da Energisa Paraíba, com acompanhamento técnico diário da nossa equipe de engenheiros.'
      }
    },
    'projeto-luminotecnico': {
      bairros: 'Manaíra, Altiplano, Cabo Branco, Tambaú e Miramar',
      serviceContext: `
        <p>A iluminação em João Pessoa tem papel fundamental no setor comercial e hoteleiro. Projetos luminotécnicos de qualidade devem aliar economia no faturamento com aconchego estético para clientes.</p>
        <p>A Klyfe desenvolve projetos luminotécnicos detalhados usando softwares de simulação 3D, calculando o lux exato de trabalho (NBR ISO/CIE 8995-1) e mapeando o layout de lâmpadas de LED de alto desempenho, eliminando problemas de ofuscamento visual em escritórios ou hotéis.</p>
      `,
      painPoint: 'Falta de uniformidade de luz e alto consumo financeiro em luminárias comerciais de João Pessoa.',
      faqExtra: {
        question: 'O projeto luminotécnico da Klyfe em João Pessoa prevê controle automatizado de intensidade?',
        answer: 'Sim. Projetamos a integração de sistemas luminotécnicos com sensores de luminosidade e dimmers automáticos, ajustando o brilho das luminárias conforme a luz do sol que entra pelas janelas, economizando ainda mais energia.'
      }
    },
    'spda': {
      bairros: 'Altiplano, Manaíra, Cabo Branco, Bessa e Cabedelo',
      serviceContext: `
        <p>A Grande João Pessoa possui alto índice de umidade e vento salino. Em prédios altos do Altiplano e indústrias, os para-raios (SPDA) sofrem desgaste químico severo causado pela maresia, o que pode danificar a malha condutora.</p>
        <p>Projetamos e inspecionamos sistemas SPDA em total conformidade com a NBR 5419. Realizamos testes com equipamentos de precisão para atestar a continuidade das descidas internas e a resistividade da malha de aterramento, fornecendo laudos técnicos oficiais com ART para seguradoras e Corpo de Bombeiros de João Pessoa.</p>
      `,
      painPoint: 'Oxidação acelerada em para-raios e exigências de seguros em condomínios da capital.',
      faqExtra: {
        question: 'A salinidade da praia de João Pessoa afeta o aterramento do SPDA?',
        answer: 'Sim. Embora a umidade do solo litorâneo ajude na condutividade, o sal acelera a corrosão galvânica dos eletrodos de aterramento. Por isso, no projeto da capital especificamos hastes revestidas de alta durabilidade e conexões soldadas para resistir à corrosão.'
      }
    },
    'projeto-subestacao': {
      bairros: 'Distrito Industrial, Conde, Cabedelo, Altiplano e Tambaú',
      serviceContext: `
        <p>Condomínios verticais de grande porte na capital e indústrias de João Pessoa dependem de projetos de subestação eficientes para conexão à rede de média tensão da Energisa Paraíba.</p>
        <p>Elaboramos projetos técnicos civis e elétricos de subestações aéreas e abrigadas. Garantimos o cálculo de seletividade e dimensionamento exato do transformador, viabilizando o fornecimento ininterrupto com o menor custo de implantação possível perante a concessionária local.</p>
      `,
      painPoint: 'Demanda reprimida de energia e necessidade de tarifa verde mais barata na capital.',
      faqExtra: {
        question: 'A Klyfe atende projetos de subestações abrigadas no Altiplano em João Pessoa?',
        answer: 'Sim. Em edifícios de grande altura no Altiplano, projetamos subestações abrigadas de média tensão no subsolo ou em cabines de alvenaria específicas nas áreas comuns, atendendo aos limites da Energisa Paraíba.'
      }
    },
    'pericia-ressarcimento-danos': {
      bairros: 'Todos os bairros e indústrias da Grande João Pessoa',
      serviceContext: `
        <p>Com as frequentes chuvas e ventos costeiros em João Pessoa, oscilações na rede de energia são comuns, podendo causar sobretensões prejudiciais às instalações internas.</p>
        <p>Se as suas instalações na capital sofreram avarias em equipamentos eletroeletrônicos, a Klyfe fornece perícia técnica diagnóstica. Elaboramos laudos periciais detalhados atestando o nexo causal com ART registrada, oferecendo a sustentação técnica necessária para reverter recusas administrativas de indenização por parte da Energisa Paraíba.</p>
      `,
      painPoint: 'Recusas da Energisa Paraíba em indenizar aparelhos queimados na capital.',
      faqExtra: {
        question: 'Como abrir um processo de ressarcimento contra a Energisa Paraíba?',
        answer: 'A reclamação deve ser aberta no site ou atendimento da Energisa. Caso eles exijam laudo técnico detalhado de terceiros ou neguem o pedido, a Klyfe elabora o laudo pericial oficial assinado por engenheiro para fundamentar a contestação.'
      }
    },
    'pericia-furto-energia': {
      bairros: 'Manaíra, Bessa, Tambaú, Cabo Branco, Centro e Geisel',
      serviceContext: `
        <p>Inspeções e multas unilaterais por suposto desvio de consumo (TOI) emitidas pela concessionária local em João Pessoa necessitam de análise técnica independente.</p>
        <p>Atuamos como peritos de parte (assistentes técnicos) para contestações de TOI da Energisa Paraíba. Realizamos vistoria técnica independente na caixa de medição, auditamos o padrão de entrada do cliente e elaboramos laudo pericial para refutar acusações ilegais ou erros de cálculo da distribuidora, visando à anulação das cobranças.</p>
      `,
      painPoint: 'Recebimento de cobrança arbitrária por anomalia de medição na capital.',
      faqExtra: {
        question: 'A Energisa Paraíba pode suspender o fornecimento de luz por recusa do pagamento do TOI?',
        answer: 'Não. A jurisprudência proíbe o corte de energia baseado em débito de TOI, já que este é gerado unilateralmente. O laudo pericial da Klyfe fornece a base de segurança jurídica para contestar a suspensão.'
      }
    },
    'viabilidade-carregador-veicular': {
      bairros: 'Altiplano, Cabo Branco, Tambaú, Manaíra e Bessa',
      serviceContext: `
        <p>João Pessoa concentra uma alta frota de carros elétricos em bairros nobres e na orla. A instalação de carregadores em garagens de condomínios tem gerado dúvidas técnicas complexas nas assembleias prediais.</p>
        <p>Elaboramos Estudos de Viabilidade Técnica (EVT) para recarga veicular na capital. Inspecionamos a capacidade da subestação do edifício, medimos o perfil de consumo e geramos o parecer conclusivo atestando se a rede elétrica do condomínio comporta as novas cargas sem desarmes, garantindo segurança na aprovação.</p>
      `,
      painPoint: 'Dificuldades na aprovação de Wallboxes em garagens de prédios de João Pessoa.',
      faqExtra: {
        question: 'Como funciona o estudo de viabilidade para carregadores em prédios do Altiplano?',
        answer: 'Realizamos medições de consumo contínuo nas áreas comuns e subestação. Caso a capacidade geral esteja próxima do limite, propomos o sistema de controle de demanda inteligente para permitir que vários condôminos carreguem seus carros sem sobrecarregar a rede.'
      }
    }
  }
};


