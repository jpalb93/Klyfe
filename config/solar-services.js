/**
 * Configuração central de Serviços de Energia Solar — Klyfe Electric
 * Cobre as 7 páginas comerciais de serviços descritas no plano estratégico.
 */

const solarServices = {
    'projeto-energia-solar': {
        slug: 'projeto-energia-solar',
        urlPath: '/servicos/projeto-energia-solar/',
        title: 'Projeto de Energia Solar Fotovoltaica | Klyfe Electric',
        h1: 'Projeto de Energia Solar com Engenharia Especializada',
        eyebrow: 'SERVIÇOS SOLARES · ENGENHARIA E DIMENSIONAMENTO',
        description: 'Projeto de energia solar com dimensionamento, análise de sombreamento, responsabilidade técnica, ART e documentação para conexão na distribuidora.',
        intro: 'Um projeto de energia solar de alta performance começa no papel. A Klyfe Electric desenvolve projetos engenheirados com emissão de ART (Anotação de Responsabilidade Técnica), respeitando as normas da ABNT e os requisitos das concessionárias do Nordeste. Dimensionamos o sistema para a curva real de consumo do seu imóvel, sem subdimensionamento que deixa economia na mesa nem oversizing desnecessário.',
        stats: [
            { value: 'ART', label: 'Responsabilidade Técnica' },
            { value: 'ABNT', label: 'Conformidade NBR' },
            { value: 'Sob medida', label: 'Meta de Redução' },
            { value: 'Análise', label: 'Diagnóstico Inicial' }
        ],
        painPoints: [
            {
                title: 'Erros de dimensionamento comercial',
                text: 'Muitos orçamentos consideram apenas a média simples da fatura. Nossa engenharia analisa o histórico de consumo, tarifas horárias, demanda contratada (B2B) e projeção de crescimento.'
            },
            {
                title: 'Análise de viabilidade estrutural e sombreamento',
                text: 'Sombreamentos parciais de árvores, caixas d’água ou prédios vizinhos reduzem substancialmente a geração. Mapeamos a inclinação, orientação solar e inclinação ideal para o Nordeste.'
            },
            {
                title: 'Segurança elétrica e proteção contra surtos',
                text: 'Projetamos arranjos fotovoltaicos com string box dedicadas, DPS CC/CA, disjuntores adequados e aterramento em conformidade com a NBR 5410 e NBR 16690.'
            }
        ],
        benefits: [
            'Estudo de viabilidade técnica e financeira detalhado',
            'Memorial descriptivo completo com assinatura de engenheiro Eletricista',
            'Desenho técnico em CAD/BIM com diagramas unifilares e trifilares',
            'Simulação de geração estimada com dados de irradiação solar do INMET/SolarGIS',
            'Documentação pronta para protocolo de acesso junto à distribuidora'
        ],
        processSteps: [
            { title: 'Levantamento', text: 'Coleta de dados da fatura de energia, visita técnica ou análise via satélite do imóvel.' },
            { title: 'Simulação', text: 'Modelagem 3D do telhado/solo, estudo de orientação solar e cálculo de geração.' },
            { title: 'Elaboração', text: 'Desenvolvimento do diagrama elétrico, especificação dos equipamentos e emissão da ART.' },
            { title: 'Entregável', text: 'Apresentação do projeto completo ao cliente e envio para fase de homologação.' }
        ],
        bodyHtml: `
            <p>O <strong>projeto de energia solar fotovoltaica</strong> é o coração de uma usina solar eficiente e duradoura. Não basta adquirir placas solares; é fundamental calcular o arranjo elétrico, a tensão de partida dos inversores, o agrupamento de strings e a proteção elétrica necessária para suportar intempéries e variações de tensão da rede elétrica.</p>
            <p>Na Klyfe Electric, cada projeto solar é elaborado por engenheiros eletricistas capacitados. Avaliamos a capacidade da estrutura do telhado (fibrocimento, metálico, cerâmico ou laje) e determinamos as estruturas de fixação adequadas para ventos fortes característicos do litoral e do sertão nordestino.</p>
            <p>Para clientes comerciais e industriais no grupo A, o projeto pode incluir a análise da demanda contratada, da curva de carga e das condições de conexão. Essas verificações ajudam a estimar o efeito do sistema na fatura sem prometer eliminação de cobranças ou penalidades.</p>
        `,
        faq: [
            {
                question: 'Por que o projeto precisa de ART (Anotação de Responsabilidade Técnica)?',
                answer: 'A ART identifica o profissional responsável pelas atividades técnicas abrangidas e formaliza esse vínculo perante o CREA. O documento precisa corresponder ao escopo efetivamente contratado.'
            },
            {
                question: 'Quanto tempo leva para elaborar o projeto fotovoltaico?',
                answer: 'O prazo depende do porte, da vistoria, da disponibilidade de dados e das análises necessárias. O cronograma é informado após o levantamento inicial e separado do prazo de análise da distribuidora.'
            },
            {
                question: 'O projeto já inclui o pedido de homologação na concessionária?',
                answer: 'O pedido de conexão pode ser incluído no escopo da proposta. A documentação segue os requisitos aplicáveis, mas a aprovação e o prazo de análise dependem da distribuidora e das condições do projeto.'
            }
        ],
        ctaTitle: 'Projete seu sistema solar com engenheiros especialistas.',
        ctaSubtitle: 'Receba um diagnóstico técnico completo para o seu imóvel.'
    },

    'instalacao-energia-solar': {
        slug: 'instalacao-energia-solar',
        urlPath: '/servicos/instalacao-energia-solar/',
        title: 'Instalação de Energia Solar | Klyfe Electric',
        h1: 'Instalação de Energia Solar com Segurança e Performance',
        eyebrow: 'SERVIÇOS SOLARES · EXECUÇÃO E SEGURANÇA',
        description: 'Instalação de painéis e inversores solares com planejamento, proteções elétricas, comissionamento e cuidados de segurança para cada imóvel.',
        intro: 'A instalação do sistema fotovoltaico exige precisão mecânica e rigor elétrico. Um módulo mal fixado pode soltar em tempestades; uma conexão elétrica mal crimpada pode gerar arco elétrico e aquecimento. Na Klyfe Electric, a execução é realizada por instaladores e eletricistas treinados sob rigoroso protocolo de segurança do trabalho e engenharia.',
        stats: [
            { value: 'NR-10 / NR-35', label: 'Segurança Aplicável' },
            { value: 'Projeto', label: 'DPS e Aterramento' },
            { value: 'Contrato', label: 'Garantias Definidas' },
            { value: 'Nordeste', label: 'Atendimento Regional' }
        ],
        painPoints: [
            {
                title: 'Risco de infiltrações no telhado',
                text: 'Trabalhamos com vedação técnica em cada ponto de fixação (parafusos brocantes, tirantes ou vedantes específicos), preservando a integridade da sua estrutura.'
            },
            {
                title: 'Segurança em trabalho em altura e alta tensão',
                text: 'Toda nossa equipe utiliza EPIs/EPCs atualizados e segue rigorosamente a NR-35 (Trabalho em Altura) e NR-10 (Segurança em Instalações Elétricas).'
            },
            {
                title: 'Montagem limpa e acabamento estético',
                text: 'Eletrodutos organizados, cabeamento solar protegido contra radiação UV em calhas ou conduítes blindados, mantendo a estética visual da fachada.'
            }
        ],
        benefits: [
            'Montagem de estruturas de alumínio anonisado resistentes à maresia',
            'Crimpage de conectores MC4 com alicate calibrado para evitar sobreaquecimentos',
            'Instalação de quadro de proteção (String Box) com DPS e disjuntores CC/CA',
            'Comissionamento elétrico completo com testes de isolamento e VOC',
            'Limpeza e organização do local após a conclusão da obra'
        ],
        processSteps: [
            { title: 'Check-in Técnico', text: 'Conferência de materiais, estruturas de apoio e checagem das condições do local.' },
            { title: 'Fixação Mecânica', text: 'Instalação dos trilhos de alumínio e fixadores de acordo com o tipo de telhado.' },
            { title: 'Conexão Elétrica', text: 'Fixação dos painéis, passagem do cabeamento solar, montagem da string box e inversor.' },
            { title: 'Comissionamento', text: 'Testes de continuidade, aferição de tensão, parametrização do inversor e entrega técnica.' }
        ],
        bodyHtml: `
            <p>Uma <strong>instalação de energia solar</strong> é projetada para operar por longo prazo exposta ao sol, à chuva e ao vento. A vida útil real depende dos equipamentos, da estrutura, da execução, do ambiente e da manutenção.</p>
            <p>Utilizamos apenas estruturas de fixação em alumínio anonisado ou aço inoxidável, evitando a corrosão precoce — fator essencial principalmente nas regiões litorâneas do Rio Grande do Norte, Pernambuco e Paraíba. No cabeamento, aplicamos cabos solares flexíveis com proteção contra raios UV e conectores MC4 padrão industrial.</p>
            <p>Após a conclusão física da montagem, realizamos o comissionamento elétrico: testamos as polaridades, a tensão de circuito aberto (VOC), a corrente de curto-circuito (ISC) e a resistência do aterramento antes de energizar o inversor.</p>
        `,
        faq: [
            {
                question: 'Quanto tempo demora a instalação física das placas solares?',
                answer: 'O prazo depende do porte do sistema, do telhado, do acesso, das adequações e das condições climáticas. A proposta informa o cronograma estimado depois da vistoria e da definição do escopo.'
            },
            {
                question: 'A instalação das placas fura meu telhado? Há risco de vazar água?',
                answer: 'A fixação é escolhida conforme o tipo e o estado da cobertura. Vedações e procedimentos corretos reduzem o risco de infiltração, mas a condição existente do telhado também precisa ser avaliada antes da instalação.'
            },
            {
                question: 'Vocês realizam a instalação em telhados de laje ou no solo?',
                answer: 'Sim, instalamos em lajes com estruturas inclinadas com suporte de concreto ou alumínio, e também realizamos usinas de solo com estacamento ou bases de concreto.'
            }
        ],
        ctaTitle: 'Garanta uma instalação solar segura e profissional.',
        ctaSubtitle: 'Fale com nossa equipe técnica e solicite um orçamento de execução.'
    },

    'homologacao-energia-solar': {
        slug: 'homologacao-energia-solar',
        urlPath: '/servicos/homologacao-energia-solar/',
        title: 'Homologação de Energia Solar junto à Concessionária | Klyfe',
        h1: 'Homologação de Sistema Solar com Suporte Completo',
        eyebrow: 'SERVIÇOS SOLARES · REGULARIZAÇÃO E CONEXÃO',
        description: 'Homologação de energia solar fotovoltaica junto à Energisa, Neoenergia e Cosern. Suporte burocrático e técnico do parecer de acesso à troca do medidor.',
        intro: 'Um sistema fotovoltaico conectado à rede precisa seguir o processo de conexão da distribuidora antes de injetar energia. A Klyfe pode elaborar e acompanhar as etapas técnicas incluídas no contrato, enquanto a análise, os prazos e os atos de conexão que cabem à distribuidora permanecem sob responsabilidade dela.',
        stats: [
            { value: 'Energisa / Cosern', label: 'Distribuidoras do Eixo' },
            { value: 'Protocolo', label: 'Acompanhamento Técnico' },
            { value: 'ANEEL', label: 'Conformidade com a Lei 14.300' },
            { value: 'Transparência', label: 'Pendências Informadas' }
        ],
        painPoints: [
            {
                title: 'Reprovações por falha em projetos informais',
                text: 'Documentação incompleta ou divergente pode gerar pendências e retrabalho. A revisão prévia reduz esse risco, mas não garante aprovação automática.'
            },
            {
                title: 'Exigências de adequação do padrão de entrada',
                text: 'Identificamos previamente se o seu padrão de entrada precisa de adequação de caixa, ramal de ligação ou disjuntor antes de submeter o protocolo.'
            },
            {
                title: 'Burocracia e acompanhamento de prazos',
                text: 'Nossa equipe acompanha cada etapa no portal da distribuidora, do Parecer de Acesso até a visita de vistoria e troca do medidor.'
            }
        ],
        benefits: [
            'Solicitação de Acesso (Parecer de Acesso) protocolado via sistema oficial',
            'Submissão de diagramas unifilares, memoriais e ART de projeto/execução',
            'Adequação do padrão de entrada conforme norma técnica da concessionária',
            'Solicitação e acompanhamento das verificações previstas pela distribuidora',
            'Orientação ao cliente até a conclusão das etapas contratadas'
        ],
        processSteps: [
            { title: 'Protocolo', text: 'Envio do projeto elétrico e documentação do titular para a concessionária.' },
            { title: 'Parecer de Acesso', text: 'Emissão da autorização formal da distribuidora para a conexão do gerador.' },
            { title: 'Solicitação de Vistoria', text: 'Com a obra instalada, solicitamos a inspeção técnica no local.' },
            { title: 'Troca de Medidor', text: 'A concessionária valida a instalação e instala o medidor bidirecional.' }
        ],
        bodyHtml: `
            <p>A <strong>homologação de energia solar</strong> é a etapa jurídica e técnica que autoriza a conexão do sistema de micro ou minigeração distribuída à rede da concessionária (como Energisa na Paraíba, Neoenergia em Pernambuco ou Cosern no Rio Grande do Norte).</p>
            <p>A Lei 14.300 e a regulamentação da ANEEL estabelecem regras para a micro e minigeração distribuída. Divergências entre a documentação e o sistema instalado podem gerar pendências que precisam ser corrigidas.</p>
            <p>A Klyfe Electric pode cuidar dos formulários, documentos técnicos, ART e acompanhamento previstos no escopo. A distribuidora analisa a solicitação e define as condições de conexão aplicáveis.</p>
        `,
        faq: [
            {
                question: 'Quanto tempo demora o processo de homologação da energia solar?',
                answer: 'Não existe um prazo único para todos os projetos. Potência, nível de tensão, documentação, necessidade de obras e o procedimento vigente alteram o cronograma. A proposta deve separar o prazo interno da Klyfe do prazo da distribuidora.'
            },
            {
                question: 'Posso ligar meu inversor antes da concessionária trocar o medidor?',
                answer: 'Não. Ligar o sistema antes da substituição do medidor pode fazer com que a energia gerada seja registrada pelo medidor antigo como consumo, aumentando indevidamente sua fatura.'
            },
            {
                question: 'O que acontece se o padrão de entrada da minha casa for antigo?',
                answer: 'Identificamos a necessidade de adequação durante a visita técnica prévia. Se necessário, realizamos a adequação do padrão para que atenda às exigências da concessionária antes da vistoria.'
            }
        ],
        ctaTitle: 'Organize a conexão do seu sistema solar com suporte técnico.',
        ctaSubtitle: 'Entenda documentos, responsabilidades e etapas antes de protocolar.'
    },

    'manutencao-energia-solar': {
        slug: 'manutencao-energia-solar',
        urlPath: '/servicos/manutencao-energia-solar/',
        title: 'Manutenção de Energia Solar | Klyfe Electric',
        h1: 'Manutenção Preventiva e Corretiva em Sistemas Solares',
        eyebrow: 'SERVIÇOS SOLARES · O&M E PERFORMANCE',
        description: 'Manutenção técnica de usinas e sistemas solares no Nordeste. Termografia, reaperto de conexões, diagnóstico de falhas e recuperação de geração.',
        intro: 'Quedas de geração podem estar relacionadas a sujeira, sombreamento, alarmes, conexões, inversores ou indisponibilidade. A manutenção preventiva e corretiva busca identificar a causa com inspeções e medições compatíveis com o sistema, sem aplicar um percentual genérico de perda ou recuperação.',
        stats: [
            { value: 'Diagnóstico', label: 'Causa da Queda' },
            { value: 'Termografia', label: 'Detecção de Hotspots' },
            { value: 'Preventiva', label: 'Plano por Condição' },
            { value: 'Corretiva', label: 'Reparo por Diagnóstico' }
        ],
        painPoints: [
            {
                title: 'Queda não explicada na geração diária',
                text: 'Inversores indicando alarmes de falha de isolamento, subtensão ou string desconectada que reduzem silenciosamente a sua economia.'
            },
            {
                title: 'Risco de incêndio por conexões frouxas',
                text: 'Sobre-aquecimento em conectores e disjuntores por falta de reaperto com torquímetro calibrado nas revisões periódicas.'
            },
            {
                title: 'Microfissuras e pontos quentes nos módulos',
                text: 'Células solares danificadas por impactos ou sujeira acumulada que passam despercebidas sem inspeção termográfica.'
            }
        ],
        benefits: [
            'Inspeção termográfica com câmera infravermelha para identificar células sobreaquecidas',
            'Reaperto de todas as conexões mecânicas e terminais elétricos com torquímetro',
            'Teste de isolamento elétrico e integridade dos cabos solares',
            'Aferição dos parâmetros de entrada e saída do inversor fotovoltaico',
            'Relatório técnico com diagnóstico de saúde da usina e recomendações de melhoria'
        ],
        processSteps: [
            { title: 'Agendamento', text: 'Definição da data da visita de inspecão técnica na usina residencial ou comercial.' },
            { title: 'Inspeção Térmica', text: 'Varredura com câmera infravermelha nos módulos, inversores e quadros de proteção.' },
            { title: 'Testes Elétricos', text: 'Medição de corrente, tensão, resistência de aterramento e reaperto de bornes.' },
            { title: 'Relatório', text: 'Entrega de relatório técnico detalhado com histórico e ações corretivas executadas.' }
        ],
        bodyHtml: `
            <p>A <strong>manutenção de energia solar</strong> preventiva é a chave para proteger o retorno financeiro do seu investimento fotovoltaico. Embora os sistemas solares sejam altamente duráveis, as intempéries, vibrações e variações extremas de temperatura no Nordeste exigem acompanhamento técnico regular.</p>
            <p>Quando indicada, a termografia ajuda a localizar aquecimentos anormais que precisam ser interpretados junto com a inspeção e os dados elétricos. O diagnóstico diferencia sujeira, sombra, defeito de componente e problema de conexão antes de recomendar uma intervenção.</p>
            <p>Já na manutenção corretiva, nossa equipe atua com agilidade para diagnosticar e reparar falhas em inversores, substituição de fusíveis queimados em String Boxes e correção de falhas de aterramento que desarmam o sistema.</p>
        `,
        faq: [
            {
                question: 'Com qual frequência devo realizar a manutenção preventiva do meu sistema solar?',
                answer: 'A frequência depende do manual dos equipamentos, do ambiente, do porte, do histórico de falhas e dos dados de desempenho. Uma inspeção inicial permite definir um plano baseado nas condições reais da usina.'
            },
            {
                question: 'Como saber se o meu sistema está precisando de manutenção?',
                answer: 'Se a sua fatura de energia aumentou subitamente sem mudança de consumo, se o aplicativo do inversor indica alarmes ou se a geração mensal caiu significativamente em comparação ao mesmo período do ano anterior.'
            },
            {
                question: 'Vocês atendem sistemas solares instalados por outras empresas?',
                answer: 'Sim! Realizamos diagnósticos, manutenção corretiva e otimização de sistemas instalados por terceiros em toda a Paraíba, Pernambuco e Rio Grande do Norte.'
            }
        ],
        ctaTitle: 'Identifique a causa da queda de geração do seu sistema.',
        ctaSubtitle: 'Agende uma inspeção técnica com relatório termográfico completo.'
    },

    'monitoramento-usina-solar': {
        slug: 'monitoramento-usina-solar',
        urlPath: '/servicos/monitoramento-usina-solar/',
        title: 'Monitoramento de Usina Solar | Klyfe Electric',
        h1: 'Monitoramento de Energia Solar e Acompanhamento da Geração',
        eyebrow: 'SERVIÇOS SOLARES · TECNOLOGIA E PERFORMANCE',
        description: 'Monitoramento remoto em tempo real de usinas solares fotovoltaicas. Gestão de alertas, análise de geração diária e acompanhamento de créditos no Nordeste.',
        intro: 'Instalar energia solar e não acompanhar a geração diária é como dirigir sem velocímetro. O monitoramento contínuo permite detectar falhas no inversor no mesmo dia em que ocorrem, evitando que a usina passe semanas desligada sem que você perceba. A Klyfe Electric implementa sistemas de telemetria inteligente e gestão de desempenho.',
        stats: [
            { value: 'Histórico', label: 'Acompanhamento de Geração' },
            { value: 'Alertas', label: 'Notificação de Falhas' },
            { value: 'App / Web', label: 'Acesso Remoto' },
            { value: 'Dados', label: 'Decisão de Manutenção' }
        ],
        painPoints: [
            {
                title: 'Inversor travado sem o cliente notar',
                text: 'Sem monitoramento ativo, o inversor pode desarmar devido a uma oscilação na rede e ficar dias sem gerar energia, estragando o planejamento do mês.'
            },
            {
                title: 'Falta de comparativo entre o estimado e o gerado',
                text: 'Sem dados consolidados, você não consegue comprovar se o sistema está entregando o payback projetado na proposta comercial.'
            },
            {
                title: 'Dificuldade de controlar créditos em múltiplas faturas',
                text: 'Acompanhar o saldo de créditos injetados na concessionária e a distribuição entre matriz e filiais exige gestão organizada.'
            }
        ],
        benefits: [
            'Configuração de dataloggers Wi-Fi / 4G e sincronização de aplicativos de monitoramento',
            'Painel de controle com acompanhamento em tempo real da geração em kWh e economia em R$',
            'Sistema automático de alertas no celular em caso de queda brusca na geração',
            'Análise comparativa da geração real contra a irradiação solar esperada no mês',
            'Relatório mensal de desempenho enviado ao cliente'
        ],
        processSteps: [
            { title: 'Conectividade', text: 'Conexão e parametrização da comunicação Wi-Fi/4G do inversor.' },
            { title: 'Configuração', text: 'Cadastro da usina no sistema de gestão de telemetria da Klyfe.' },
            { title: 'Calibração', text: 'Ajuste de metas de geração baseadas na capacidade instalada (kWp).' },
            { title: 'Gestão Contínua', text: 'Acompanhamento diário com emissão de relatórios de saúde do gerador.' }
        ],
        bodyHtml: `
            <p>O <strong>monitoramento de usinas solares</strong> transforma dados brutos em decisões inteligentes de gestão energética. Ao acompanhar a curva diária de geração de energia (kWh), é possível identificar rapidamente o impacto de sombras, sujeira nos módulos ou oscilações de tensão da concessionária.</p>
            <p>A Klyfe integra plataformas de telemetria que operam em nuvem, permitindo que o cliente acompanhe a geração da usina de qualquer lugar via smartphone ou computador.</p>
            <p>Para clientes B2B e usinas de maior porte, o escopo pode incluir acompanhamento remoto de indicadores de desempenho. Alertas ajudam a detectar anomalias, mas diagnóstico, prazo de resposta e atendimento em campo dependem do contrato e da causa encontrada.</p>
        `,
        faq: [
            {
                question: 'O monitoramento funciona em qualquer marca de inversor?',
                answer: 'A compatibilidade depende da marca, do modelo, do protocolo de comunicação, do datalogger e da plataforma. A análise técnica confirma as opções disponíveis antes da contratação.'
            },
            {
                question: 'Preciso ter internet Wi-Fi no local da instalação?',
                answer: 'O ideal é ter sinal Wi-Fi estável onde o inversor está instalado. Em locais remotos ou áreas rurais sem Wi-Fi, podemos instalar dataloggers com chip 4G móvel.'
            },
            {
                question: 'O que acontece se a internet cair?',
                answer: 'Se a internet desconectar temporariamente, o inversor continua gerando energia normalmente e armazenando os dados na memória interna. Assim que a conexão retornar, o histórico é atualizado no aplicativo.'
            }
        ],
        ctaTitle: 'Tenha o controle total da sua geração solar na palma da mão.',
        ctaSubtitle: 'Fale com nossa equipe técnica para configurar o monitoramento da sua usina.'
    },

    'limpeza-de-paineis-solares': {
        slug: 'limpeza-de-paineis-solares',
        urlPath: '/servicos/limpeza-de-paineis-solares/',
        title: 'Limpeza de Painéis Solares | Klyfe Electric',
        h1: 'Limpeza Técnica de Painéis Solares',
        eyebrow: 'SERVIÇOS SOLARES · MANUTENÇÃO E EFICIÊNCIA',
        description: 'Limpeza de painéis solares com avaliação de sujeira, segurança de acesso e procedimentos compatíveis com o manual dos módulos e as condições locais.',
        intro: 'Poeira, fuligem, resíduos de aves e névoa salina podem se depositar sobre os módulos. O efeito na geração varia conforme clima, inclinação e tipo de sujeira; por isso, a limpeza deve ser indicada a partir de inspeção, dados do sistema e orientações do fabricante.',
        stats: [
            { value: 'Inspeção', label: 'Necessidade Confirmada' },
            { value: 'Manual', label: 'Método Compatível' },
            { value: 'Água', label: 'Qualidade Avaliada' },
            { value: 'NR-35', label: 'Segurança em Altura' }
        ],
        painPoints: [
            {
                title: 'Perigo de queda ao lavar o telhado sozinho',
                text: 'Subir no telhado sem equipamento de proteção individual (linha de vida, cinto paraquedista) representa alto risco de acidentes graves.'
            },
            {
                title: 'Uso de produtos químicos inadequados',
                text: 'Produtos e ferramentas não autorizados podem danificar o revestimento ou contrariar as condições de garantia. O manual do módulo define o procedimento compatível.'
            },
            {
                title: 'Choque térmico e trincas no vidro',
                text: 'Temperatura dos módulos, qualidade da água e condições de operação precisam entrar no planejamento para evitar estresse térmico e riscos durante a atividade.'
            }
        ],
        benefits: [
            'Utilização de água filtrada/deionizada e escovas rotativas ultra-macias específicas para fotovoltaica',
            'Remoção dos depósitos identificados na inspeção e compatíveis com o escopo',
            'Horário e procedimento definidos pelas condições do local e pelo manual',
            'Planejamento de acesso e proteções aplicáveis ao trabalho em altura',
            'Inspeção visual inclusa para identificar módulos trincados ou fixadores soltos'
        ],
        processSteps: [
            { title: 'Inspeção Próvia', text: 'Checagem visual das placas e desligamento de segurança do sistema no inversor.' },
            { title: 'Lavagem Técnica', text: 'Aplicação de água pura e escovação macia no ângulo correto do arranjo.' },
            { title: 'Enxágue Pura', text: 'Enxágue final para garantir ausência de depósitos minerais ou manchamento no vidro.' },
            { title: 'Re-energização', text: 'Religamento do sistema e verificação do pico instantâneo de geração no inversor.' }
        ],
        bodyHtml: `
            <p>A <strong>limpeza de painéis solares</strong> pode recuperar parte da geração perdida por sujeira quando o diagnóstico confirma essa causa. Em regiões com estiagem, obras, vias movimentadas ou exposição costeira, a inspeção ajuda a definir a necessidade e a periodicidade.</p>
            <p>Lavar placas solares não é equivalente a lavar um piso de concreto. Vidros fotovoltaicos possuem tratamento antireflexo e revestimentos especiais. O uso de vassouras de cerdas duras, palhas de aço ou produtos químicos agressivos risca a superfície e reduz permanentemente o rendimento do módulo.</p>
            <p>Os equipamentos, a pressão, a água e os produtos são definidos conforme o manual do módulo e o acesso. A garantia é concedida pelo respectivo fornecedor e continua sujeita aos termos e às condições documentadas por ele.</p>
        `,
        faq: [
            {
                question: 'Com que frequência devo lavar meus painéis solares?',
                answer: 'Não há um intervalo universal. Dados de geração, inspeção visual, chuva, inclinação e tipo de depósito ajudam a definir a frequência, sempre respeitando o manual do fabricante.'
            },
            {
                question: 'A chuva normal não limpa as placas solares?',
                answer: 'A chuva ajuda a remover a poeira superficial solta, mas não consegue remover excrementos de pássaros secos, fuligem de óleo diesel ou poeira impregnada. Pelo contrário, chuvas fracas costumam espalhar a sujeira e formar manchas.'
            },
            {
                question: 'Vocês limpam instalações de difícil acesso ou telhados muito altos?',
                answer: 'O atendimento depende de uma avaliação de acesso, ancoragem, altura, cobertura e riscos. A Klyfe confirma a viabilidade e as medidas de segurança antes de incluir o serviço na proposta.'
            }
        ],
        ctaTitle: 'Recupere a potência do seu sistema com uma limpeza profissional.',
        ctaSubtitle: 'Solicite um orçamento para lavagem técnica de painéis solares.'
    },

    'financiamento-energia-solar': {
        slug: 'financiamento-energia-solar',
        urlPath: '/servicos/financiamento-energia-solar/',
        title: 'Financiamento para Energia Solar | Klyfe Electric',
        h1: 'Como Financiar Seu Sistema de Energia Solar',
        eyebrow: 'SERVIÇOS SOLARES · LINHAS DE CRÉDITO E PAYBACK',
        description: 'Entenda como financiar energia solar, quais custos comparar e por que entrada, juros, carência e aprovação dependem da instituição e do perfil do cliente.',
        intro: 'O financiamento pode reduzir o desembolso inicial, mas cria um compromisso de crédito que precisa ser comparado com a economia estimada. Entrada, prazo, juros, carência, seguros e aprovação dependem da instituição financeira e do perfil do cliente; a parcela não é automaticamente menor que a redução da fatura.',
        stats: [
            { value: 'CET', label: 'Custo Total Comparado' },
            { value: 'Crédito', label: 'Sujeito à Aprovação' },
            { value: 'Cenários', label: 'Parcela e Economia' },
            { value: 'PF / PJ / Agro', label: 'Perfis Analisados' }
        ],
        painPoints: [
            {
                title: 'Receio de desembolsar um valor alto à vista',
                text: 'Algumas linhas podem reduzir a entrada, conforme análise de crédito. Compare o Custo Efetivo Total e mantenha margem caso a economia fique abaixo da projeção.'
            },
            {
                title: 'Burocracia bancária e incerteza na aprovação',
                text: 'A Klyfe pode preparar a documentação técnica do projeto. A relação com instituições, os documentos financeiros e o prazo de análise são confirmados em cada proposta.'
            },
            {
                title: 'Taxas de juros e cálculo de viabilidade',
                text: 'Taxa nominal não basta: compare CET, entrada, prazo, carência, seguros, garantias e condições para quitação antecipada.'
            }
        ],
        benefits: [
            'Levantamento do investimento total necessário para o projeto',
            'Separação entre economia projetada e obrigação de pagamento',
            'Checklist para comparar entrada, prazo, juros, seguros e CET',
            'Documentação técnica do sistema conforme o escopo contratado',
            'Avaliação das condições vigentes apresentadas pela instituição financeira'
        ],
        processSteps: [
            { title: 'Projeto', text: 'Dimensionamento do sistema e definição do investimento necessário.' },
            { title: 'Comparação', text: 'Análise das propostas de crédito e do Custo Efetivo Total.' },
            { title: 'Aprovação', text: 'Envio de documentos e decisão de crédito pela instituição escolhida.' },
            { title: 'Execução', text: 'Início do projeto conforme liberação, contrato e cronograma técnico.' }
        ],
        bodyHtml: `
            <p>O <strong>financiamento para energia solar</strong> transforma parte do investimento inicial em parcelas. A comparação responsável usa o Custo Efetivo Total, e não apenas a taxa anunciada ou o valor da primeira prestação.</p>
            <p>A economia solar é uma estimativa sujeita a geração, consumo, tarifa, cobranças remanescentes e disponibilidade. Já a parcela é uma obrigação contratual. Por isso, a análise deve testar cenários conservador, provável e favorável, com margem financeira.</p>
            <p>A Klyfe pode fornecer o orçamento e a documentação técnica previstos no escopo. A aprovação, as condições e a contratação do crédito são definidas pela instituição financeira escolhida pelo cliente.</p>
        `,
        faq: [
            {
                question: 'Preciso dar algum valor de entrada no financiamento solar?',
                answer: 'Depende da instituição, do produto de crédito e da análise do cliente. Algumas propostas podem exigir entrada, garantias ou financiar apenas parte do escopo. Confirme tudo no contrato bancário.'
            },
            {
                question: 'Quais documentos são necessários para aprovar o crédito solar?',
                answer: 'Os documentos variam por instituição e perfil. Em geral, podem incluir identificação, comprovantes financeiros, fatura de energia e dados do projeto. A lista oficial deve vir da instituição escolhida.'
            },
            {
                question: 'O que é a carência do financiamento solar?',
                answer: 'Carência é o intervalo previsto no contrato antes do início dos pagamentos. Ela não é garantida e pode gerar juros ou encargos. Compare o CET e não presuma que instalação e conexão terminarão antes da primeira parcela.'
            }
        ],
        ctaTitle: 'Compare o financiamento solar com premissas claras.',
        ctaSubtitle: 'Solicite o orçamento técnico antes de avaliar as condições de crédito.'
    }
};

module.exports = solarServices;
