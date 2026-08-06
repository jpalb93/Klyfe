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
        description: 'Projeto elétrico fotovoltaico com responsabilidade técnica e ART. Dimensionamento preciso, análise de sombreamento e homologação para residências e empresas no Nordeste.',
        intro: 'Um projeto de energia solar de alta performance começa no papel. A Klyfe Electric desenvolve projetos engenheirados com emissão de ART (Anotação de Responsabilidade Técnica), respeitando as normas da ABNT e os requisitos das concessionárias do Nordeste. Dimensionamos o sistema para a curva real de consumo do seu imóvel, sem subdimensionamento que deixa economia na mesa nem oversizing desnecessário.',
        stats: [
            { value: '100%', label: 'Projetos com ART' },
            { value: 'ABNT', label: 'Conformidade NBR' },
            { value: '0% a 95%', label: 'Meta de Abatimento' },
            { value: '24-48h', label: 'Diagnóstico Inicial' }
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
            <p>Para clientes comerciais e industriais no grupo A (média tensão), o projeto de engenharia solar contempla a análise detalhada da demanda contratada e do fator de potência, garantindo que a conexão do sistema fotovoltaico não gere penalidades na fatura.</p>
        `,
        faq: [
            {
                question: 'Por que o projeto precisa de ART (Anotação de Responsabilidade Técnica)?',
                answer: 'A ART emitida junto ao CREA é exigência legal e norma das concessionárias de energia (como Energisa, Neoenergia e Cosern). Ela garante que um engenheiro habilitado responde tecnicamente pela segurança e correto dimensionamento da instalação.'
            },
            {
                question: 'Quanto tempo leva para elaborar o projeto fotovoltaico?',
                answer: 'Para projetos residenciais e pequenos comércios, a elaboração técnica leva entre 2 a 5 dias úteis. Projetos industriais de grande porte levam de 7 a 15 dias úteis.'
            },
            {
                question: 'O projeto já inclui o pedido de homologação na concessionária?',
                answer: 'Sim, o projeto elaborado pela Klyfe já é formatado de acordo com as especificações exigidas pela concessionária local para aprovação imediata do parecer de acesso.'
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
        description: 'Instalação profissional de painéis e inversores solares no Nordeste. Equipe própria certificada em NR-10 e NR-35, garantia de instalação e equipamentos de primeira linha.',
        intro: 'A instalação do sistema fotovoltaico exige precisão mecânica e rigor elétrico. Um módulo mal fixado pode soltar em tempestades; uma conexão elétrica mal crimpada pode gerar arco elétrico e aquecimento. Na Klyfe Electric, a execução é realizada por instaladores e eletricistas treinados sob rigoroso protocolo de segurança do trabalho e engenharia.',
        stats: [
            { value: 'NR-10 / NR-35', label: 'Equipe Certificada' },
            { value: '100%', label: 'Kits com DPS e Aterramento' },
            { value: 'Garantia', label: 'Suporte Pós-Instalação' },
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
            <p>Uma <strong>instalação de energia solar</strong> duradoura deve resistir por mais de 25 anos exposta ao sol intenso, chuvas e ventos da região Nordeste. Por isso, a escolha dos insumos e o método construtivo fazem toda a diferença.</p>
            <p>Utilizamos apenas estruturas de fixação em alumínio anonisado ou aço inoxidável, evitando a corrosão precoce — fator essencial principalmente nas regiões litorâneas do Rio Grande do Norte, Pernambuco e Paraíba. No cabeamento, aplicamos cabos solares flexíveis com proteção contra raios UV e conectores MC4 padrão industrial.</p>
            <p>Após a conclusão física da montagem, realizamos o comissionamento elétrico: testamos as polaridades, a tensão de circuito aberto (VOC), a corrente de curto-circuito (ISC) e a resistência do aterramento antes de energizar o inversor.</p>
        `,
        faq: [
            {
                question: 'Quanto tempo demora a instalação física das placas solares?',
                answer: 'Residências de pequeno e médio porte são instaladas em 1 a 2 dias. Instalações comerciais levam de 3 a 7 dias, a depender da complexidade do telhado.'
            },
            {
                question: 'A instalação das placas fura meu telhado? Há risco de vazar água?',
                answer: 'Utilizamos fixadores específicos para cada tipo de telha (cerâmica, fibrocimento, metálica) com borrachas EPDM de vedação e vedantes estruturais que impedem qualquer infiltração de água.'
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
        intro: 'Sem a homologação correta na distribuidora de energia, o seu sistema fotovoltaico não pode ser ligado à rede elétrica. A homologação garante que o seu gerador cumpre as exigências regulatórias da ANEEL e permite que a concessionária substitua o seu medidor antigo por um modelo bidirecional (que registra a energia injetada e consumida). A Klyfe assume 100% da burocracia técnica.',
        stats: [
            { value: 'Energisa / Cosern', label: 'Distribuidoras do Eixo' },
            { value: '100%', label: 'Acompanhamento de Vistoria' },
            { value: 'ANEEL', label: 'Conformidade com a Lei 14.300' },
            { value: 'Zero', label: 'Dor de cabeça para o cliente' }
        ],
        painPoints: [
            {
                title: 'Reprovações por falha em projetos informais',
                text: 'Projetos sem atenção às normas técnicas locais são reprovados pela distribuidora, atrasando a ligação do sistema e a economia na conta em meses.'
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
            'Agendamento e acompanhamento presencial da vistoria técnica da distribuidora',
            'Ativação do medidor bidirecional e entrada oficial no sistema de créditos'
        ],
        processSteps: [
            { title: 'Protocolo', text: 'Envio do projeto elétrico e documentação do titular para a concessionária.' },
            { title: 'Parecer de Acesso', text: 'Emissão da autorização formal da distribuidora para a conexão do gerador.' },
            { title: 'Solicitação de Vistoria', text: 'Com a obra instalada, solicitamos a inspeção técnica no local.' },
            { title: 'Troca de Medidor', text: 'A concessionária valida a instalação e instala o medidor bidirecional.' }
        ],
        bodyHtml: `
            <p>A <strong>homologação de energia solar</strong> é a etapa jurídica e técnica que autoriza a conexão do sistema de micro ou minigeração distribuída à rede da concessionária (como Energisa na Paraíba, Neoenergia em Pernambuco ou Cosern no Rio Grande do Norte).</p>
            <p>Com as atualizações regulatórias introduzidas pela Lei 14.300 (Marco Legal da Geração Distribuída), o enquadramento tarifário e a análise de fluxo de potência tornaram-se ainda mais exigentes. Qualquer divergência entre o inversor instalado e a documentação enviada resulta em reprovação automática da vistoria.</p>
            <p>A Klyfe Electric cuida de todas as interações burocráticas: preenchimento dos formulários de cadastro de carga, submissão da ART, agendamento de vistoria e acompanhamento até a instalação do medidor bidirecional.</p>
        `,
        faq: [
            {
                question: 'Quanto tempo demora o processo de homologação da energia solar?',
                answer: 'O prazo regulatório da ANEEL para emissão do parecer de acesso é de até 15 dias (para microgeração sem necessidade de obras na rede). A vistoria e troca do medidor ocorrem em até 7 dias úteis após a solicitação.'
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
        ctaTitle: 'Homologue seu sistema solar sem atrasos nem complicações.',
        ctaSubtitle: 'Deixe a burocracia regulatória com a equipe de engenharia da Klyfe.'
    },

    'manutencao-energia-solar': {
        slug: 'manutencao-energia-solar',
        urlPath: '/servicos/manutencao-energia-solar/',
        title: 'Manutenção de Energia Solar | Klyfe Electric',
        h1: 'Manutenção Preventiva e Corretiva em Sistemas Solares',
        eyebrow: 'SERVIÇOS SOLARES · O&M E PERFORMANCE',
        description: 'Manutenção técnica de usinas e sistemas solares no Nordeste. Termografia, reaperto de conexões, diagnóstico de falhas e recuperação de geração.',
        intro: 'Um sistema solar sem manutenção preventiva pode perder entre 10% e 35% de eficiência ao longo dos anos devido a pontos quentes (hotspots), afrouxamento de conectores e degradação de componentes elétricos. A Klyfe Electric oferece serviços especializados de O&M (Operação e Manutenção) preventiva e corretiva para garantir que sua usina gere o máximo de energia possível.',
        stats: [
            { value: 'até +30%', label: 'Recuperação de Geração' },
            { value: 'Termografia', label: 'Detecção de Hotspots' },
            { value: 'Preventiva', label: 'Inspeção Anual' },
            { value: 'Corretiva', label: 'Reparo Rápido' }
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
            <p>Durante a manutenção preventiva, realizamos testes avançados: a varredura termográfica detecta <em>hotspots</em> (pontos quentes) provocados por sombras, sujeira localizada ou defeitos em diodos de bypass, prevenindo danos permanentes às células do módulo.</p>
            <p>Já na manutenção corretiva, nossa equipe atua com agilidade para diagnosticar e reparar falhas em inversores, substituição de fusíveis queimados em String Boxes e correção de falhas de aterramento que desarmam o sistema.</p>
        `,
        faq: [
            {
                question: 'Com qual frequência devo realizar a manutenção preventiva do meu sistema solar?',
                answer: 'Recomendamos a realização de manutenção preventiva pelo menos 1 vez ao ano em instalações residenciais e a cada 6 meses em usinas comerciais ou de solo.'
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
        ctaTitle: 'Recupere a geração máxima do seu sistema solar.',
        ctaSubtitle: 'Agende uma inspeção técnica com relatório termográfico completo.'
    },

    'monitoramento-usina-solar': {
        slug: 'monitoramento-usina-solar',
        urlPath: '/servicos/monitoramento-usina-solar/',
        title: 'Monitoramento de Usina Solar | Klyfe Electric',
        h1: 'Monitoramento de Energia Solar para Máxima Geração',
        eyebrow: 'SERVIÇOS SOLARES · TECNOLOGIA E PERFORMANCE',
        description: 'Monitoramento remoto em tempo real de usinas solares fotovoltaicas. Gestão de alertas, análise de geração diária e acompanhamento de créditos no Nordeste.',
        intro: 'Instalar energia solar e não acompanhar a geração diária é como dirigir sem velocímetro. O monitoramento contínuo permite detectar falhas no inversor no mesmo dia em que ocorrem, evitando que a usina passe semanas desligada sem que você perceba. A Klyfe Electric implementa sistemas de telemetria inteligente e gestão de desempenho.',
        stats: [
            { value: '24/7', label: 'Acompanhamento de Geração' },
            { value: 'Alertas', label: 'Notificação de Falhas' },
            { value: 'App / Web', label: 'Acesso Remoto' },
            { value: '0 kWh', label: 'Energia Desperdiçada' }
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
            <p>Para clientes B2B e usinas de médio e grande porte, nosso time de engenharia monitora remotamente os principais indicadores de desempenho (Performance Ratio - PR), garantindo que qualquer anomalia seja corrigida imediatamente por nossa equipe de campo.</p>
        `,
        faq: [
            {
                question: 'O monitoramento funciona em qualquer marca de inversor?',
                answer: 'Sim, a maioria dos inversores modernos possui comunicação Wi-Fi ou RS485/4G nativa ou via módulo adicional, compatível com as principais plataformas do mercado.'
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
        description: 'Limpeza profissional de placas e painéis solares no Nordeste. Remoção de poeira, dejetos de aves e fuligem com equipamentos e produtos específicos sem riscos.',
        intro: 'No Nordeste, a poeira do sertão, a fuligem de vias movimentadas e a maresia litorânea formam uma camada opaca sobre os módulos solares. Essa sujeira bloqueia a passagem da luz solar e pode reduzir a geração do seu sistema em até 25%. A limpeza técnica profissional restaura a capacidade total das placas solares de forma segura e sem riscar o vidro temperado.',
        stats: [
            { value: 'até +25%', label: 'Ganho Instantâneo de Eficiência' },
            { value: 'Sem Risco', label: 'Escovas Macias Específicas' },
            { value: 'Água Deionizada', label: 'Sem Manchas de Calcário' },
            { value: 'Segurança', label: 'Ancoragem e NR-35' }
        ],
        painPoints: [
            {
                title: 'Perigo de queda ao lavar o telhado sozinho',
                text: 'Subir no telhado sem equipamento de proteção individual (linha de vida, cinto paraquedista) representa alto risco de acidentes graves.'
            },
            {
                title: 'Uso de produtos químicos inadequados',
                text: 'Lavar as placas com sabão em pó, detergentes abrasivos ou produtos ácidos danifica a camada anti-reflexo do vidro e invalida a garantia do fabricante.'
            },
            {
                title: 'Choque térmico e trincas no vidro',
                text: 'Lavar os módulos sob o sol quente do meio-dia com água fria causa choque térmico, trincando as células fotovoltaicas internamente.'
            }
        ],
        benefits: [
            'Utilização de água filtrada/deionizada e escovas rotativas ultra-macias específicas para fotovoltaica',
            'Remoção completa de excrementos de pássaros, poeira mineral, fuligem e resíduos vegetais',
            'Execução no início da manhã ou fim da tarde para evitar choque térmico nas placas',
            'Equipe equipada com linha de vida e equipamentos de segurança NR-35',
            'Inspeção visual inclusa para identificar módulos trincados ou fixadores soltos'
        ],
        processSteps: [
            { title: 'Inspeção Próvia', text: 'Checagem visual das placas e desligamento de segurança do sistema no inversor.' },
            { title: 'Lavagem Técnica', text: 'Aplicação de água pura e escovação macia no ângulo correto do arranjo.' },
            { title: 'Enxágue Pura', text: 'Enxágue final para garantir ausência de depósitos minerais ou manchamento no vidro.' },
            { title: 'Re-energização', text: 'Religamento do sistema e verificação do pico instantâneo de geração no inversor.' }
        ],
        bodyHtml: `
            <p>A <strong>limpeza de painéis solares</strong> é a intervenção de manutenção de menor custo e maior retorno imediato na geração de energia. Em regiões nordestinas com longos períodos de estiagem, a poeira mineral acumulada sobre a superfície de vidro atua como uma barreira física à radiação solar.</p>
            <p>Lavar placas solares não é equivalente a lavar um piso de concreto. Vidros fotovoltaicos possuem tratamento antireflexo e revestimentos especiais. O uso de vassouras de cerdas duras, palhas de aço ou produtos químicos agressivos risca a superfície e reduz permanentemente o rendimento do módulo.</p>
            <p>A Klyfe utiliza equipamentos apropriados: varas telescópicas com escovas de cerdas ultrafinas de nylon e água com baixo teor de minerais, garantindo a remoção da sujeira sem micro-riscos e mantendo a garantia de 25 anos dos fabricantes.</p>
        `,
        faq: [
            {
                question: 'Com que frequência devo lavar meus painéis solares?',
                answer: 'A recomendação geral no Nordeste é lavar os painéis de 1 a 2 vezes por ano. Em locais próximos a estradas de terra, canteiros de obras ou indústrias, a limpeza pode ser necessária a cada 4 meses.'
            },
            {
                question: 'A chuva normal não limpa as placas solares?',
                answer: 'A chuva ajuda a remover a poeira superficial solta, mas não consegue remover excrementos de pássaros secos, fuligem de óleo diesel ou poeira impregnada. Pelo contrário, chuvas fracas costumam espalhar a sujeira e formar manchas.'
            },
            {
                question: 'Vocês limpam instalações de difícil acesso ou telhados muito altos?',
                answer: 'Sim! Nossos técnicos são treinados para acesso seguro em altura (NR-35) com ancoragem apropriada em telhados residenciais, galpões industriais e lajes comerciais.'
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
        description: 'Financiamento de energia solar residencial, comercial e rural no Nordeste. Troque a conta de luz pela parcela do financiamento com carência de até 120 dias.',
        intro: 'Você não precisa descapitalizar seu caixa nem usar suas reservas de emergência para instalar energia solar. Com as linhas de financiamento fotovoltaico atuais, a própria economia gerada na conta de luz cobre o valor da parcela mensal do projeto. Você troca um gasto fundo perdido por uma parcela que tem prazo para acabar.',
        stats: [
            { value: 'Até 100%', label: 'Do Projeto Financiado' },
            { value: 'até 120 dias', label: 'De Carência para 1ª Parcela' },
            { value: 'até 84x', label: 'Prazo de Pagamento' },
            { value: 'PF / PJ / Agro', label: 'Linhas Específicas' }
        ],
        painPoints: [
            {
                title: 'Receio de desembolsar um valor alto à vista',
                text: 'O financiamento permite instalar o sistema sem entrada, utilizando a economia na fatura para pagar as parcelas mensais do banco.'
            },
            {
                title: 'Burocracia bancária e incerteza na aprovação',
                text: 'Ajudamos a preparar toda a documentação técnica e projeto para envio direto aos bancos parceiros com agilidade.'
            },
            {
                title: 'Taxas de juros e cálculo de viabilidade',
                text: 'Comparamos as principais opções do mercado (Santander, BV, Sicredi, Banco do Nordeste, Solfácil) para encontrar a melhor taxa para o seu perfil.'
            }
        ],
        benefits: [
            'Simulação de crédito gratuita comparando múltiplos bancos',
            'Projetos 100% financiados (equipamentos + engenharia + instalação)',
            'Prazos flexíveis de 12 a 84 meses com juros competitivos',
            'Carência de 30 a 120 dias para começar a pagar (prazo ideal para o sistema já estar gerando)',
            'Linhas de crédito com incentivo sustentável (ESG / FNE Sol no Banco do Nordeste)'
        ],
        processSteps: [
            { title: 'Simulação', text: 'Calculamos a parcela ideal com base no valor da sua conta de luz atual.' },
            { title: 'Aprovação', text: 'Envio da documentação e projeto para análise de crédito junto à instituição financeira.' },
            { title: 'Contratação', text: 'Assinatura digital do contrato de financiamento com o banco aprovado.' },
            { title: 'Execução', text: 'Liberação dos recursos para compra de equipamentos e início imediato da instalação.' }
        ],
        bodyHtml: `
            <p>O <strong>financiamento para energia solar</strong> é a ferramenta que democratizou o acesso à energia limpa no Brasil. Em vez de pagar uma tarifa de energia que sobe constantemente acima da inflação, você fixa o valor das parcelas do financiamento fotovoltaico.</p>
            <p>Na prática, se você paga R$ 800 por mês à distribuidora, é possível estruturar um financiamento com parcela de valor semelhante (ou até inferior). Durante o prazo do financiamento, seu custo permanece estável. Após a quitação do contrato, o sistema continua produzindo por mais de 20 anos com custo praticamente zero.</p>
            <p>A Klyfe apoia você em todas as etapas: desde a simulação de crédito até a emissão da documentação técnica exigida pelos bancos comerciais e de desenvolvimento (como BNB / FNE Sol).</p>
        `,
        faq: [
            {
                question: 'Preciso dar algum valor de entrada no financiamento solar?',
                answer: 'Na maioria das instituições parceiras é possível financiar 100% do valor do projeto (equipamentos, engenharia e mão de obra), sem necessidade de entrada.'
            },
            {
                question: 'Quais documentos são necessários para aprovar o crédito solar?',
                answer: 'Para Pessoa Física: documento de identidade (RG/CNH), comprovante de residência e fatura de energia recente. Para Pessoa Física / PJ: contrato social, faturamento dos últimos 12 meses e fatura de energia.'
            },
            {
                question: 'O que é a carência do financiamento solar?',
                answer: 'É o prazo entre a aprovação do contrato e o vencimento da primeira parcela (geralmente entre 30 e 120 dias). Essa carência permite que a instalação e homologação sejam concluídas antes de você começar a pagar a 1ª parcela.'
            }
        ],
        ctaTitle: 'Faça uma simulação de financiamento solar sem compromisso.',
        ctaSubtitle: 'Veja como trocar a sua conta de luz por um investimento próprio.'
    }
};

module.exports = solarServices;
