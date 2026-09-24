const fs = require('node:fs');
const path = require('node:path');

const dir = path.join(__dirname, '..', 'content', 'posts', 'published');
const files = new Map(fs.readdirSync(dir).filter(name => name.endsWith('.json')).map(name => [name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.json$/, ''), name]));
const today = '2026-09-22';

function paragraph(value) { return `<p>${value}</p>`; }
function section([heading, ...parts]) { return `<h2>${heading}</h2>${parts.map(paragraph).join('\n')}`; }
function checklist(items) { return `<h2>Checklist para o próximo passo</h2><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`; }

const revisions = {
  'energia-solar-para-supermercados': {
    title: 'Energia solar em supermercados: dados para estudar a viabilidade',
    keyword: 'viabilidade de energia solar em supermercados',
    summary: 'Quais dados de consumo, refrigeração e operação reunir antes de avaliar energia solar em um supermercado ou atacadista.',
    lead: 'Antes de pedir uma proposta de energia solar para um supermercado, vale entender como a loja consome eletricidade. Refrigeração, climatização, iluminação e horários de funcionamento formam um perfil próprio. O telhado disponível, sozinho, não informa se o investimento faz sentido.',
    sections: [
      ['Por onde começar o levantamento?', 'Separe as faturas recentes e identifique cada unidade consumidora. Se houver mais de uma loja, mantenha os dados de cada endereço separados: horários, medição, titularidade e condições físicas podem ser diferentes.', 'Anote mudanças previstas, como novas câmaras frias, expansão da área de vendas ou substituição de equipamentos. Uma simulação feita apenas sobre o consumo antigo pode perder relevância antes da instalação.'],
      ['Refrigeração e horários mudam a análise', 'Um supermercado pode manter cargas de refrigeração depois de fechar as portas. Já iluminação e climatização variam com a ocupação. Para estudar o encontro entre geração solar e consumo, é útil conhecer o horário de operação e, quando disponível, a curva de carga.', 'Não presuma que toda energia gerada será consumida no mesmo instante. A participação da rede, eventual compensação e estrutura tarifária precisam ser avaliadas para a unidade específica.'],
      ['O que observar na área disponível?', 'Documente telhados, coberturas de estacionamento e áreas de solo que poderiam ser estudadas. Compartilhe plantas existentes, fotos, histórico de infiltração, reformas e limitações de acesso. A condição estrutural, as sombras, a manutenção futura e as exigências do imóvel dependem de avaliação técnica.', 'Se a operação não pode sofrer interrupções em certos horários, registre essas janelas desde o início. O planejamento de obra deve considerar a rotina da loja, sem prometer ausência total de impacto.'],
      ['Como comparar propostas com mais clareza?', 'Peça que as premissas da estimativa sejam apresentadas: consumo considerado, geração projetada, perdas, custos incluídos, responsabilidades de projeto e conexão, e hipóteses financeiras. Compare cenários equivalentes; uma projeção otimista e outra conservadora não representam propostas diretamente comparáveis.', 'Economia e prazo de retorno não são universais. Dependem da tarifa, do consumo, das regras aplicáveis e do desempenho real do sistema.']
    ],
    items: ['Faturas e identificação de cada unidade consumidora.', 'Horários da loja e cargas que operam fora do expediente.', 'Mudanças previstas em refrigeração, climatização e expansão.', 'Plantas, fotos e informações sobre áreas disponíveis.', 'Restrições de acesso e períodos críticos para a operação.'],
    service: '/energia-solar/supermercados/',
    serviceLabel: 'solução de energia solar para supermercados',
    faq: [
      ['Faturas bastam para decidir?', 'Elas são o ponto de partida. O estudo também precisa considerar perfil de uso, instalação e condições do imóvel.'],
      ['O telhado grande garante retorno rápido?', 'Não. Área, consumo, investimento e regras de compensação precisam ser avaliados em conjunto.']
    ]
  },
  'energia-solar-para-hospitais': {
    title: 'Energia solar em hospitais: o que levantar antes do projeto',
    keyword: 'planejamento de energia solar em hospitais',
    summary: 'Um roteiro para reunir dados de consumo, cargas críticas, infraestrutura e janelas de trabalho em hospitais e clínicas.',
    lead: 'Em hospitais e clínicas, o estudo de energia solar deve começar pela operação da unidade. O consumo elétrico pode incluir climatização, diagnóstico, tecnologia e processos assistenciais com exigências distintas. A geração fotovoltaica precisa ser analisada sem confundir economia na fatura com continuidade de alimentação.',
    sections: [
      ['Separe consumo e criticidade', 'Reúna faturas, horários de funcionamento e inventário dos sistemas relevantes. Identifique quais áreas não podem ser interrompidas e quem responde pelos planos de continuidade. O consumo total mensal não mostra, por si só, quando cada carga opera.', 'A engenharia clínica, a manutenção predial e a gestão assistencial podem fornecer informações complementares. Uma decisão de projeto tomada sem essas áreas pode ignorar restrições importantes.'],
      ['Energia solar não substitui o plano de contingência', 'Um sistema fotovoltaico conectado à rede não deve ser tratado como fonte automática para cargas críticas durante uma falta de energia. A relação com geradores, nobreaks e demais sistemas de contingência depende da arquitetura existente e de projeto específico.', 'Antes de comparar economias, documente diagramas, pontos de conexão e rotinas de teste existentes. Qualquer intervenção deve respeitar o planejamento de segurança e continuidade da instituição.'],
      ['Como planejar a implantação?', 'Registre áreas disponíveis, acessos, horários sensíveis e obras simultâneas. Telhado, impermeabilização, estruturas e sombreamento precisam de avaliação própria. Em clínicas que operam em imóveis alugados, esclareça também quem pode autorizar alterações físicas.', 'Peça que a proposta apresente etapas, interfaces com a operação, responsabilidades e condições para conexão. Uma promessa genérica de instalação sem impacto não substitui o planejamento de cada unidade.'],
      ['Como ler a análise econômica?', 'Confira quais faturas e tarifas entraram no estudo, as hipóteses de geração e os custos incluídos. Observe se a simulação distingue consumo local de créditos e explicita limitações. O resultado pode variar entre hospital, clínica, laboratório e unidades com horários diferentes.']
    ],
    items: ['Faturas e horários de operação.', 'Diagramas e inventário de cargas críticas.', 'Responsáveis por engenharia clínica, manutenção e segurança.', 'Áreas disponíveis e restrições de acesso.', 'Janelas possíveis para levantamentos e obras.'],
    service: '/energia-solar/hospitais-e-clinicas/',
    serviceLabel: 'solução de energia solar para hospitais e clínicas',
    faq: [
      ['Painéis solares mantêm o hospital ligado em um apagão?', 'A geração fotovoltaica conectada à rede não equivale a um sistema de contingência. Essa necessidade exige avaliação da arquitetura elétrica e das fontes de reserva.'],
      ['Toda clínica exige o mesmo projeto?', 'Não. Consumo, cargas, imóvel e horários de atendimento mudam as premissas.']
    ]
  },
  'energia-solar-para-condominios': {
    title: 'Energia solar em condomínio: como preparar a assembleia e os dados',
    keyword: 'planejamento de energia solar em condomínio',
    summary: 'Organize faturas, áreas comuns, interessados, critérios de rateio e documentos antes de discutir energia solar na assembleia.',
    lead: 'Uma proposta de energia solar para condomínio precisa responder primeiro a perguntas administrativas: quem consome, quem participa, como a decisão será tomada e quais áreas podem ser avaliadas. O objetivo deste guia é ajudar síndico e moradores a preparar essa conversa antes de contratar um projeto.',
    sections: [
      ['Mapeie as unidades consumidoras', 'Separe a fatura das áreas comuns das faturas de apartamentos, lojas ou outras unidades. Anote titularidade, endereço e consumo de cada ponto de interesse. O modelo de participação não deve ser escolhido apenas pelo nome “condomínio”; a configuração de medição e as regras aplicáveis importam.', 'A ANEEL descreve modalidades de geração distribuída, inclusive empreendimentos de múltiplas unidades consumidoras e geração compartilhada. A opção viável para o caso concreto exige conferência com a distribuidora e apoio técnico e jurídico quando necessário.'],
      ['Prepare uma pauta útil para a assembleia', 'Apresente o problema que se pretende resolver, as contas consideradas, as áreas a estudar, os custos que ainda não foram definidos e quem poderá conduzir o levantamento. Separe autorização para estudar a solução de aprovação de uma obra e de seu orçamento.', 'Consulte convenção, regimento e regras de deliberação aplicáveis ao condomínio. Este artigo não estabelece quórum nem substitui orientação jurídica.'],
      ['Levante as condições do imóvel', 'Reúna plantas, informações de cobertura, histórico de impermeabilização, áreas técnicas e restrições de acesso. O fato de existir espaço livre não confirma capacidade estrutural ou adequação elétrica.', 'Defina também quem ficará responsável por receber documentos, responder à equipe de engenharia e comunicar mudanças de escopo aos moradores.'],
      ['Compare propostas sem misturar premissas', 'Peça descrição do modelo de compensação, das unidades contempladas, da geração estimada, das responsabilidades de manutenção e do investimento total. Uma economia prometida para “o prédio” pode se referir apenas às áreas comuns; confirme essa distinção por escrito.']
    ],
    items: ['Faturas das áreas comuns e unidades interessadas.', 'Convenção, regimento e processo de deliberação.', 'Plantas e histórico da cobertura.', 'Lista de perguntas dos moradores sobre participação e custos.', 'Responsável pelo contato e documentação.'],
    service: '/energia-solar/condominios/',
    serviceLabel: 'solução de energia solar para condomínios',
    faq: [
      ['A instalação na área comum reduz a conta de todos?', 'Isso depende do modelo adotado, das unidades participantes e das regras de compensação. A proposta deve dizer exatamente quais contas foram consideradas.'],
      ['Qual é o quórum de aprovação?', 'O quórum depende das regras aplicáveis e da natureza da intervenção. Consulte a convenção e orientação jurídica para o caso concreto.']
    ]
  },
  'energia-solar-para-fazendas': {
    title: 'Energia solar em fazendas: como levantar consumo e irrigação',
    keyword: 'consumo de energia solar em fazendas',
    summary: 'Roteiro para reunir dados de bombeamento, sazonalidade, cargas e áreas antes de estudar energia solar na propriedade rural.',
    lead: 'Em uma fazenda, uma estimativa de energia solar pode mudar bastante conforme a safra, o regime de irrigação e os equipamentos em uso. O primeiro passo é descrever quando a propriedade consome energia e quais atividades esse consumo sustenta.',
    sections: [
      ['Faça um inventário das cargas', 'Liste bombas, motores, refrigeração, beneficiamento, iluminação e outras cargas relevantes. Registre potência conhecida, horário de operação e sazonalidade. Se o sistema de irrigação muda ao longo do ano, uma única fatura pode não representar a demanda real.', 'Separe unidades consumidoras e pontos de fornecimento. Documente também ampliações previstas, novos equipamentos e mudanças de cultivo que possam alterar o consumo.'],
      ['Entenda o bombeamento antes de escolher a solução', 'Anote origem da água, altura de bombeamento, vazão necessária, horários de irrigação e existência de reservação. Esses dados ajudam a equipe técnica a avaliar a relação entre geração solar e funcionamento das bombas.', 'Não escolha equipamentos apenas pela potência indicada em uma placa. As condições hidráulicas e elétricas do conjunto precisam ser verificadas.'],
      ['Mapeie áreas e infraestrutura', 'Identifique telhados, solo disponível, sombras, distâncias até as cargas, acesso de veículos e condições de manutenção. Estruturas, proteção elétrica e conexão devem ser definidas em projeto; terreno livre não significa automaticamente implantação simples.', 'Quando a área é remota, informe limitações de comunicação, segurança e logística. Esses fatores podem influenciar monitoramento, manutenção e custo.'],
      ['Peça cenários comparáveis', 'Solicite que as propostas explicitem consumo usado na simulação, sazonalidade, alternativa de conexão e custos de instalação e operação. Financiamento, quando houver, precisa ser avaliado separadamente das hipóteses técnicas de geração e economia.']
    ],
    items: ['Faturas de diferentes épocas do ano.', 'Inventário de bombas, motores e demais cargas.', 'Horários de irrigação e plano de expansão.', 'Dados de vazão, altura e reservação disponíveis.', 'Fotos, mapas e informações de acesso às áreas.'],
    service: '/energia-solar/fazendas-e-irrigacao/',
    serviceLabel: 'solução de energia solar para fazendas e irrigação',
    faq: [
      ['Uma fatura basta para dimensionar a fazenda?', 'Pode não bastar quando há sazonalidade ou mudanças de atividade. O estudo deve representar os períodos relevantes.'],
      ['Bomba solar precisa sempre de bateria?', 'Não existe resposta única: a solução depende do regime de bombeamento, da disponibilidade de água e da arquitetura elétrica escolhida.']
    ]
  },
  'como-funciona-a-energia-solar-em-casas': {
    title: 'Como funciona a energia solar em casa: do painel à conta de luz',
    keyword: 'como funciona energia solar em casa',
    summary: 'Entenda a sequência entre painéis, inversor, consumo da casa, rede e medição, sem confundir geração com independência elétrica.',
    lead: 'Em uma casa, o painel fotovoltaico transforma luz em eletricidade; o inversor adapta essa energia para uso na instalação. A dúvida principal de quem começa a pesquisar é o que acontece entre o telhado, os aparelhos e a conta de luz.',
    sections: [
      ['O que cada componente faz?', 'Os módulos geram corrente contínua. O inversor converte e controla a entrega de energia ao circuito da casa. Proteções, estrutura e medição fazem parte da solução e devem ser especificadas conforme o imóvel.', 'A energia produzida muda com sol, temperatura, orientação, sombra e condições do equipamento. A potência anunciada de um módulo não é uma promessa de geração mensal fixa.'],
      ['A casa consome primeiro ou envia para a rede?', 'Em um sistema conectado à rede, geração e consumo acontecem ao longo do dia. Quando a produção supera o consumo instantâneo, pode haver excedente destinado à rede sob as regras aplicáveis. Quando a produção é insuficiente, a casa continua usando a rede.', 'Por isso, o padrão de uso da residência importa. Pessoas em casa durante o dia, ar-condicionado à noite e mudanças de rotina podem alterar o resultado econômico.'],
      ['O que muda quando falta luz?', 'Um sistema conectado à rede convencional não deve ser entendido como alimentação de emergência. Soluções com armazenamento e operação de reserva exigem componentes e projeto próprios.', 'Mesmo com geração solar, a fatura pode incluir cobranças que não desaparecem. Avalie a proposta com as contas reais e as regras vigentes, sem assumir “conta zero”.'],
      ['O que levar a um estudo da residência?', 'Reúna faturas, fotos do telhado, informações sobre sombra e reformas planejadas. O estudo técnico verificará viabilidade física, elétrica e econômica; o guia de funcionamento não substitui esse dimensionamento.']
    ],
    items: ['Faturas recentes.', 'Fotos e plantas da cobertura, se disponíveis.', 'Informações sobre sombras e mudanças de consumo.', 'Dúvidas sobre falta de energia e baterias.', 'Identificação do titular e do endereço da unidade.'],
    service: '/energia-solar/residencial/',
    serviceLabel: 'solução de energia solar residencial',
    faq: [
      ['O painel alimenta a casa durante a noite?', 'Sem armazenamento, a geração solar ocorre quando há luz; à noite, a casa usa a rede no sistema conectado.'],
      ['A casa fica independente da distribuidora?', 'Não em uma instalação conectada à rede convencional. A arquitetura de autonomia exige avaliação específica.']
    ]
  },
  'wallbox-em-condominio': {
    title: 'Wallbox em condomínio: como preparar o pedido ao síndico',
    keyword: 'aprovação de wallbox em condomínio',
    summary: 'Organize autorização, medição, capacidade elétrica e responsabilidades antes de solicitar um ponto de recarga na garagem.',
    lead: 'O pedido de um ponto de recarga em garagem coletiva precisa esclarecer quem utiliza, quem paga, de onde vem a energia e como a instalação será avaliada. Para o morador, o primeiro passo é organizar informações; a definição elétrica e as exigências do condomínio dependem de análise do caso.',
    sections: [
      ['O que apresentar à administração?', 'Descreva a vaga, o equipamento pretendido, o uso estimado e o responsável pelo contato. Pergunte quais documentos o condomínio exige, como são tratadas intervenções em áreas comuns e quem deve analisar a proposta.', 'Evite assumir que o síndico pode aprovar ou negar sozinho em qualquer situação. Convenção, decisões internas e regras aplicáveis precisam ser verificadas.'],
      ['Como discutir a medição?', 'A cobrança pode exigir medição individual, sistema compartilhado ou outra solução definida para o empreendimento. Antes de escolher, esclareça onde seria o ponto de alimentação, como registrar o consumo e quem pagará implantação e manutenção.', 'Não use uma extensão ou tomada existente como atalho de projeto. A solução depende da capacidade da instalação e dos critérios de segurança pertinentes.'],
      ['O edifício suporta novas cargas?', 'Peça à administração diagramas, informações sobre transformador, quadros e histórico de ampliação. A avaliação de capacidade deve considerar o conjunto do prédio e a possibilidade de outros moradores solicitarem recarga no futuro.', 'Uma vaga isolada pode parecer simples, mas passagens de cabos, proteção, sinalização e acesso às áreas técnicas precisam ser estudados.'],
      ['Como fechar responsabilidades?', 'Registre quem contrata projeto, quem aprova a intervenção, quem executa, quem guarda documentos e quem atende futuras manutenções. Uma proposta comercial deve separar levantamento, eventuais adequações e instalação.']
    ],
    items: ['Convenção e regras internas disponíveis.', 'Identificação da vaga e do veículo/equipamento pretendido.', 'Diagramas e informações da instalação comum.', 'Critério preliminar de medição e pagamento.', 'Responsável pela análise e comunicação aos moradores.'],
    service: '/solucoes/eletrica/wallbox-condominio/',
    serviceLabel: 'instalação de wallbox em condomínio',
    faq: [
      ['O síndico pode autorizar sozinho?', 'A competência depende das regras internas e da natureza da intervenção. Consulte a convenção e a administração antes de assumir um rito de aprovação.'],
      ['Uma tomada da garagem resolve?', 'Não é possível afirmar sem avaliação da instalação, da carga e da proteção. O ponto de recarga deve ser definido tecnicamente.']
    ]
  },
  'wallbox-com-energia-solar': {
    title: 'Como integrar wallbox e energia solar: fluxo e pré-requisitos',
    keyword: 'como integrar wallbox e energia solar',
    summary: 'Entenda a relação entre geração fotovoltaica, consumo da casa e recarga do carro, além dos dados necessários para estudar a integração.',
    lead: 'É possível planejar a recarga de um carro elétrico em um imóvel com geração fotovoltaica, mas a energia dos painéis também atende outras cargas. Para entender a integração, observe quando o carro está conectado, quanto ele consome e como o sistema solar opera.',
    sections: [
      ['O que acontece em um sistema conectado à rede?', 'A geração e o consumo variam durante o dia. Se o carro carrega enquanto há produção solar, parte da energia pode coincidir com a recarga; se carrega à noite, a rede normalmente participa do suprimento. A fatura e a compensação seguem as regras aplicáveis.', 'Não há uma quantidade universal de painéis “por carro”. Quilometragem, eficiência do veículo, rotina de recarga, consumo da casa e condições do telhado mudam o estudo.'],
      ['Quais dados reunir antes de dimensionar?', 'Separe faturas, potência e capacidade de recarga admitidas pelo veículo, horários em que ele fica estacionado e quilometragem habitual. Informe também a potência instalada do sistema solar e seus registros de geração, caso ele já exista.', 'Um projeto precisa avaliar capacidade do quadro, alimentação, proteções e eventuais adequações. A existência de painéis não garante que o circuito disponível suporte o wallbox.'],
      ['O que significa priorizar excedente solar?', 'Alguns equipamentos e sistemas de gestão conseguem ajustar a recarga conforme a geração disponível, mas os recursos variam por modelo e configuração. Confirme compatibilidade, medição necessária e comportamento quando a produção cai.', 'Priorizar excedente não equivale a dispensar a rede ou a ter recarga gratuita. O resultado depende do perfil de uso e da arquitetura instalada.'],
      ['Como comparar propostas de integração?', 'Peça que a proposta separe o ponto de recarga, eventuais alterações no sistema fotovoltaico, medição, automação e condições de manutenção. Assim fica claro o que a integração faz e o que é apenas uma estimativa financeira.']
    ],
    items: ['Faturas e geração solar registrada.', 'Modelo do veículo e características de recarga.', 'Horários de estacionamento e quilometragem.', 'Fotos e dados do quadro elétrico.', 'Objetivo: recarga simples, priorização solar ou outro recurso.'],
    service: '/solucoes/eletrica/wallbox-energia-solar/',
    serviceLabel: 'solução de wallbox com energia solar',
    faq: [
      ['O carro só pode carregar quando há sol?', 'Não necessariamente. Em sistemas conectados à rede, a forma de alimentação e o controle da recarga dependem da configuração.'],
      ['Preciso comprar mais painéis?', 'Depende da geração existente, do consumo do imóvel e do uso do veículo. Um estudo compara esses dados antes de propor expansão.']
    ]
  },
  'nr10-laudo-eletrico-empresa': {
    title: 'NR-10 na empresa: como organizar documentos e pendências elétricas',
    keyword: 'documentos NR-10 empresa',
    summary: 'Entenda quais informações reunir para avaliar a situação elétrica da empresa e acompanhar as recomendações técnicas.',
    lead: 'A NR-10 trata de segurança em instalações e serviços com eletricidade. Para o gestor da empresa, a tarefa inicial é saber quais instalações existem, quais documentos estão disponíveis e como as pendências são acompanhadas. Um artigo não determina conformidade nem substitui avaliação de profissional habilitado.',
    sections: [
      ['Comece pelo inventário da instalação', 'Reúna diagramas, identificação de quadros, registros de intervenções, contratos de manutenção e apontamentos de falhas. Se os documentos estiverem desatualizados, registre a lacuna; não trate um desenho antigo como retrato garantido da instalação.', 'Indique quem responde pela operação, quem pode acessar áreas elétricas e quais mudanças ocorreram desde a última avaliação.'],
      ['O que distinguir entre documento e condição real?', 'Um relatório pode registrar achados e recomendações; o prontuário reúne documentos exigidos conforme as características da instalação; procedimentos e registros de treinamento têm funções diferentes. O nome informal “laudo NR-10” não define sozinho um escopo suficiente.', 'A NR-10 traz exigências específicas, inclusive para o Prontuário de Instalações Elétricas quando aplicável. Peça ao responsável técnico que indique quais itens se aplicam ao estabelecimento.'],
      ['Como acompanhar pendências?', 'Separe cada recomendação por local, prioridade técnica, responsável e situação. Combine como registrar correção e verificação posterior. Uma lista sem dono ou prazo interno tende a perder utilidade quando mudam equipe ou fornecedor.', 'Se houver indício de risco imediato, encaminhe à equipe competente; este guia não orienta intervenção em equipamentos energizados.'],
      ['Que perguntas fazer antes de contratar uma avaliação?', 'Peça definição de instalações abrangidas, documentos de entrada, inspeções previstas, entregáveis e limites do trabalho. Verifique como serão tratadas áreas inacessíveis e recomendações que exigirem projeto ou obra separados.']
    ],
    items: ['Diagramas e lista de quadros/equipamentos.', 'Histórico de manutenção, reformas e ocorrências.', 'Documentos de segurança e responsabilidades disponíveis.', 'Pendências conhecidas e áreas de acesso restrito.', 'Escopo esperado e entregáveis a discutir com a equipe técnica.'],
    service: '/solucoes/engenharia/laudos-eletricos',
    serviceLabel: 'serviço de laudos e avaliações elétricas',
    faq: [
      ['Todo documento elétrico é um “laudo NR-10”?', 'Não. Documentos diferentes cumprem funções diferentes; o escopo deve ser definido segundo a instalação e os requisitos aplicáveis.'],
      ['A empresa pode declarar conformidade só com este checklist?', 'Não. O checklist ajuda a reunir informações, mas não substitui avaliação técnica.']
    ]
  },
  'automacao-industrial-nordeste': {
    title: 'Automação industrial: como escolher o primeiro processo para melhorar',
    keyword: 'por onde começar automação industrial',
    summary: 'Roteiro para mapear gargalos, definir indicadores e escolher uma primeira etapa de automação sem começar pela compra de equipamentos.',
    lead: 'A primeira decisão de automação industrial não é a marca de um CLP. É escolher um problema de produção que possa ser descrito, medido e acompanhado após a mudança. Uma fábrica pode começar por paradas recorrentes, desperdício, rastreabilidade ou variabilidade de processo.',
    sections: [
      ['Descreva o processo atual', 'Registre sequência de operação, intervenções manuais, entradas, saídas, alarmes e falhas frequentes. Ouça produção e manutenção: elas podem perceber causas diferentes para o mesmo sintoma.', 'Evite definir a solução antes de identificar a restrição principal. Um painel novo não corrige automaticamente falta de sensores, documentação ou rotina de manutenção.'],
      ['Escolha um indicador que importe', 'Defina como será observado o resultado: tempo de parada, refugo, repetição de falhas, consumo ou segurança operacional, conforme o objetivo. Registre uma linha de base antes da intervenção para poder comparar depois.', 'Não prometa percentual de ganho sem dados da operação. Projetos semelhantes podem ter resultados diferentes por processo e disciplina de uso.'],
      ['Verifique a infraestrutura disponível', 'Separe diagramas, lista de equipamentos, histórico de falhas, rede de comunicação e restrições de parada. Ambientes com poeira, calor ou umidade podem impor requisitos adicionais à solução; isso deve ser avaliado no local.', 'A capacidade da equipe de operar e manter a tecnologia também faz parte da escolha. Inclua treinamento, documentação e suporte no planejamento.'],
      ['Planeje uma primeira etapa verificável', 'Defina escopo limitado, testes, critérios de aceitação e o que ficará fora da primeira entrega. Depois de validar o resultado, a empresa pode decidir se expande para outras linhas ou sistemas.']
    ],
    items: ['Fluxo do processo e gargalo prioritário.', 'Indicador atual e resultado desejado.', 'Diagramas, equipamentos e histórico de falhas.', 'Janelas de parada e requisitos de segurança.', 'Responsáveis por operação, manutenção e decisão.'],
    service: '/solucoes/automacao',
    serviceLabel: 'serviços de automação da Klyfe',
    faq: [
      ['É preciso automatizar toda a fábrica de uma vez?', 'Não. Um escopo inicial definido e mensurável pode ajudar a validar a solução antes de expandir.'],
      ['Um CLP sempre resolve o problema?', 'Não. A arquitetura depende do processo, dos sinais, da segurança e da equipe que fará operação e manutenção.']
    ]
  },
  'energia-solar-vale-a-pena-no-nordeste': {
    title: 'Energia solar vale a pena no Nordeste? Como avaliar o seu caso',
    keyword: 'energia solar vale a pena no Nordeste',
    summary: 'Veja quais dados de consumo, tarifa, imóvel e investimento usar para avaliar energia solar no Nordeste sem promessas universais de retorno.',
    lead: 'A disponibilidade de sol é importante, mas não responde sozinha se energia solar vale a pena para um imóvel no Nordeste. A conclusão exige olhar consumo, tarifa, área, custo da solução e regras aplicáveis à unidade consumidora.',
    sections: [
      ['Quais dados entram na conta?', 'Comece por faturas de meses diferentes, horários de consumo e eventuais mudanças planejadas no imóvel. Separe o valor pago pela energia de outras cobranças da fatura. A simulação deve mostrar quais parcelas poderiam ser afetadas.', 'Uma propriedade com sombra, limitação estrutural ou pouca área disponível pode exigir solução diferente de outra com consumo mensal parecido.'],
      ['Como comparar investimento e economia?', 'Peça que a proposta explicite preço total, manutenção prevista, geração estimada e hipóteses de reajuste ou tarifa. Compare o resultado em cenários e procure entender quais variáveis mais alteram o retorno.', 'Não trate prazo de payback como garantia. A economia efetiva pode variar com consumo, geração, regras e operação do sistema.'],
      ['O que o clima regional muda?', 'A irradiação disponível influencia o potencial de geração, mas temperatura, sombras, orientação e qualidade da instalação também importam. Dados regionais são ponto de partida; projeto e simulação precisam representar o imóvel.', 'A pergunta útil é quanto o sistema proposto tende a gerar naquele endereço e quanto dessa energia será aproveitada sob o perfil de consumo considerado.'],
      ['Qual é o próximo passo?', 'Se ainda faltam dados do imóvel, organize-os antes de solicitar um preço fechado. Uma avaliação individual pode indicar se a solução é viável, qual porte faz sentido e quais riscos precisam ser esclarecidos.']
    ],
    items: ['Faturas e identificação da unidade consumidora.', 'Mudanças futuras de consumo.', 'Fotos da cobertura e informações de sombra.', 'Propostas com premissas e custos completos.', 'Dúvidas sobre manutenção e conexão.'],
    service: '/energia-solar/', serviceLabel: 'soluções de energia solar',
    faq: [['Há um retorno garantido para todo imóvel do Nordeste?', 'Não. O resultado depende do imóvel, do consumo, da tarifa, do investimento e das regras aplicáveis.'], ['Mais sol sempre significa melhor economia?', 'Não necessariamente. O aproveitamento da geração e o custo da solução também importam.']]
  },
  'quanto-custa-instalar-energia-solar': {
    title: 'Quanto custa instalar energia solar? Entenda o que compõe o orçamento',
    keyword: 'fatores do custo de instalar energia solar',
    summary: 'Aprenda a comparar equipamentos, projeto, adequações, instalação, conexão e manutenção em um orçamento fotovoltaico.',
    lead: 'O preço de uma instalação solar não cabe em um valor universal por telhado ou por quantidade de painéis. Dois imóveis com consumo parecido podem exigir estruturas, proteções e adequações diferentes. Por isso, o orçamento precisa mostrar o que está incluído.',
    sections: [
      ['Equipamentos não são o custo inteiro', 'Módulos, inversor, estrutura, cabeamento e proteções são itens visíveis. Projeto, instalação, testes, documentação e conexão também compõem a entrega. Peça que a proposta separe cada grupo e identifique marcas ou especificações relevantes.', 'Um preço menor pode refletir escopo menor. Compare o que será entregue, as responsabilidades e as exclusões antes de comparar totais.'],
      ['O imóvel muda o orçamento', 'Estado da cobertura, altura, acesso, distância até o ponto de conexão e condição da instalação elétrica podem alterar materiais e horas de trabalho. Uma visita ou levantamento técnico pode revelar adequações que não aparecem numa estimativa inicial.', 'Pergunte como serão tratadas surpresas na obra e quem aprovará mudança de escopo antes de executá-la.'],
      ['Como ler uma estimativa financeira?', 'Confira consumo considerado, geração estimada, parcelas da fatura que continuam existindo e custos de operação. Evite usar uma tabela genérica de preço ou economia como promessa para o seu caso.', 'Se houver financiamento, compare custo do crédito e fluxo de caixa separadamente da performance técnica. Parcela semelhante à conta atual não demonstra, sozinha, retorno positivo.'],
      ['O que exigir da proposta?', 'Peça prazo de validade, cronograma, garantias com seus responsáveis, documentação de entrega e critérios para alterações. Uma proposta comparável deixa claras as premissas, não apenas o valor final.']
    ],
    items: ['Consumo e dados do imóvel usados no cálculo.', 'Lista de equipamentos e escopo de instalação.', 'Adequações incluídas e excluídas.', 'Responsáveis por projeto, conexão e entrega.', 'Condições de pagamento, garantias e manutenção.'],
    service: '/servicos/instalacao-energia-solar/', serviceLabel: 'serviço de instalação de energia solar',
    faq: [['Existe preço fixo por painel?', 'Um valor isolado por painel não representa projeto, adequações e condições da instalação.'], ['Uma tabela de preço substitui a visita?', 'Não quando faltam informações sobre cobertura e infraestrutura elétrica.']]
  },
  'como-escolher-uma-empresa-de-energia-solar': {
    title: 'Como comparar empresas de energia solar antes de contratar',
    keyword: 'como comparar empresas de energia solar',
    summary: 'Critérios verificáveis para analisar escopo, responsável técnico, equipamentos, garantias e suporte em propostas solares.',
    lead: 'Escolher uma empresa de energia solar fica mais simples quando as propostas respondem às mesmas perguntas. A comparação deve examinar escopo técnico, responsabilidades e suporte, sem se apoiar apenas em depoimentos, selos genéricos ou promessa de economia.',
    sections: [
      ['Confira quem responde pelo projeto', 'Peça identificação do responsável técnico e documentação pertinente à atividade. Verifique quem fará levantamento, projeto, execução e acompanhamento da conexão. Um intermediário comercial pode participar da venda; o importante é saber quem responde por cada etapa.', 'Solicite exemplos de entregáveis, como diagramas, memorial, orientações de operação e registros de testes, conforme o escopo.'],
      ['Compare premissas de geração', 'As propostas devem explicar consumo usado, potência prevista, sombras, perdas consideradas e resultado estimado. Uma projeção maior não significa necessariamente melhor solução quando as hipóteses são diferentes.', 'Pergunte como mudanças no imóvel ou no consumo serão tratadas antes da instalação.'],
      ['Entenda garantias e suporte', 'Separe garantias dos fabricantes das responsabilidades da instaladora. Verifique canais de atendimento, condições de manutenção e o que acontece se um equipamento parar de comunicar ou gerar como esperado.', 'Peça contrato com escopo, prazos, exclusões e procedimento para mudanças. Evite escolher apenas por slogans como “chave na mão” ou “economia garantida”.'],
      ['Registre a comparação por escrito', 'Monte uma tabela com critérios iguais para todas as empresas. Se uma proposta não trouxer informação essencial, peça complementação antes de decidir.']
    ],
    items: ['Responsável por cada etapa.', 'Premissas de consumo e geração.', 'Equipamentos e documentos entregues.', 'Garantias, manutenção e suporte.', 'Exclusões, cronograma e mudanças de escopo.'],
    service: '/servicos/instalacao-energia-solar/', serviceLabel: 'serviço de instalação da Klyfe',
    faq: [['O menor preço é o melhor critério?', 'Não isoladamente. Compare escopo, premissas, responsabilidades e suporte.'], ['A garantia do painel cobre toda a instalação?', 'Não necessariamente. Confirme as garantias de cada equipamento e a responsabilidade pela instalação.']]
  },
  'como-funciona-a-homologacao-da-energia-solar': {
    title: 'Homologação da energia solar: documentos e etapas a acompanhar',
    keyword: 'etapas da homologação de energia solar',
    summary: 'Entenda que informações preparar e como acompanhar a solicitação de conexão de geração solar junto à distribuidora.',
    lead: 'Para conectar uma instalação de geração distribuída à rede, é necessário seguir o procedimento aplicável da distribuidora. Para o proprietário, o mais útil é saber quais documentos reunir, quem protocola a solicitação e como acompanhar exigências e marcos do processo.',
    sections: [
      ['O que preparar antes do protocolo?', 'Separe identificação do titular e da unidade consumidora, faturas e informações do imóvel. A equipe responsável pelo projeto definirá os documentos técnicos necessários segundo a modalidade e as regras da distribuidora.', 'Se houver divergência de titularidade, reformas no padrão de entrada ou mudança de carga, informe antes da solicitação para que o fluxo seja avaliado corretamente.'],
      ['Como acompanhar a análise?', 'Registre número de protocolo, data, responsável pelo contato e documentos enviados. Quando a distribuidora pedir complementação, arquive a exigência e a resposta. Isso ajuda a distinguir espera de análise, pendência documental e execução de obra.', 'Prazos variam conforme modalidade, etapa e condições do caso. Evite tomar uma tabela genérica como prazo prometido para sua instalação.'],
      ['O que ocorre após a instalação?', 'A sequência pode envolver comunicação de conclusão, verificações e adequação de medição conforme o procedimento aplicável. O responsável técnico deve informar quando o sistema pode operar de acordo com a autorização e as condições de conexão.', 'Não energize ou altere o sistema por conta própria para acelerar o processo.'],
      ['O que guardar ao final?', 'Arquive projeto entregue, protocolos, respostas, documentos da instalação e instruções de operação. Esse histórico será útil para manutenção, ampliação ou troca de titularidade.']
    ],
    items: ['Dados do titular e da unidade consumidora.', 'Faturas e informações do imóvel.', 'Projeto e documentação técnica definida pelo responsável.', 'Protocolos e exigências da distribuidora.', 'Documentos finais de conexão e operação.'],
    service: '/servicos/homologacao-energia-solar/', serviceLabel: 'serviço de homologação de energia solar',
    faq: [['Há um prazo igual para todas as solicitações?', 'Não. Prazos dependem da modalidade, do procedimento e de eventuais pendências.'], ['Posso ligar o sistema enquanto aguardo?', 'A operação deve seguir as condições de conexão e autorização aplicáveis; confirme com o responsável técnico.']]
  },
  'como-escolher-instalador-wallbox': {
    title: 'Como escolher um instalador de wallbox: perguntas para fazer',
    keyword: 'como avaliar instalador de wallbox',
    summary: 'Confira o que perguntar sobre vistoria, capacidade elétrica, proteção, escopo e documentação antes de contratar a instalação.',
    lead: 'Um orçamento de wallbox precisa considerar a instalação existente e a forma de uso do veículo. A decisão sobre o profissional não deve se apoiar apenas no preço nem em uma lista universal de materiais: peça explicações sobre avaliação, projeto, execução e entrega.',
    sections: [
      ['O que será vistoriado?', 'Pergunte se a equipe analisará quadro, alimentação, percurso do circuito, capacidade disponível e características do carregador. O escopo do levantamento deve aparecer na proposta, inclusive quando houver limitações de acesso.', 'Uma resposta dada só pela potência nominal do wallbox pode deixar de fora adequações da instalação.'],
      ['Quem assume a responsabilidade técnica?', 'Peça identificação da empresa e dos profissionais responsáveis pelas atividades que exigirem habilitação. Confirme quais documentos serão emitidos conforme o escopo e as exigências aplicáveis.', 'Evite assumir que um documento específico sempre será necessário ou suficiente em todo imóvel.'],
      ['Como comparar a proposta?', 'Separe equipamento, materiais, mão de obra, adequações, testes e eventuais serviços de terceiros. Peça explicação do que não está incluído e do que muda caso a vistoria revele outra necessidade.', 'Confirme orientações de uso, manutenção e canais de suporte após a entrega.'],
      ['E se for condomínio?', 'Além da instalação elétrica, pode haver regras internas, medição e autorização de intervenção em área comum. Trate essas questões antes de fechar o escopo da obra.']
    ],
    items: ['Vistoria e limites de acesso.', 'Capacidade do quadro e percurso do circuito.', 'Responsáveis técnicos e documentos previstos.', 'Itens incluídos e excluídos.', 'Testes, orientações e suporte.'],
    service: '/solucoes/eletrica/carregador-veicular/', serviceLabel: 'serviço de instalação de carregador veicular',
    faq: [['Basta informar o modelo do carregador para ter preço fechado?', 'Geralmente faltam informações sobre a instalação e o percurso elétrico; peça que as premissas do preço sejam explícitas.'], ['Todo imóvel precisa da mesma adequação?', 'Não. A necessidade depende da capacidade e das condições verificadas.']]
  },
  'quanto-custa-instalar-wallbox': {
    title: 'Quanto custa instalar wallbox? Itens para comparar no orçamento',
    keyword: 'itens do orçamento de wallbox',
    summary: 'Veja como percurso elétrico, capacidade do quadro, proteções, equipamento e adequações influenciam a proposta de instalação.',
    lead: 'O preço para instalar um wallbox varia com o imóvel e com o escopo. O mesmo carregador pode exigir percursos de cabo e adequações diferentes em uma casa, garagem coletiva ou empresa. Uma faixa genérica de valores não substitui um levantamento.',
    sections: [
      ['Quais itens entram na conta?', 'Peça discriminação de equipamento, circuito, materiais, proteções, mão de obra, testes e documentação prevista. Se o wallbox será comprado separadamente, confirme compatibilidade e responsabilidades de garantia.', 'Compare também o que foi excluído: reparos civis, adequação do padrão, medição individual ou reforço da infraestrutura podem alterar o custo final.'],
      ['Por que o percurso importa?', 'Distância até o quadro, forma de passagem, obstáculos e áreas comuns influenciam materiais e tempo de instalação. Um trajeto curto em metros pode ser complexo se exigir acesso restrito ou intervenção em acabamento.', 'Peça que a proposta descreva o caminho previsto e as condições que podem levar a revisão do preço.'],
      ['O quadro suporta a recarga?', 'A disponibilidade elétrica precisa ser avaliada junto às demais cargas do imóvel. Se houver necessidade de adequação, peça escopo e preço separados para entender o investimento total.', 'Não considere a potência máxima anunciada do equipamento como indicação de que o imóvel pode usá-la sem ajustes.'],
      ['Como comparar propostas?', 'Use as mesmas premissas de potência, percurso e entrega. Verifique responsáveis, prazo, testes e suporte. Uma proposta mais barata com escopo incompleto pode resultar em aditivos depois.']
    ],
    items: ['Equipamento incluído ou fornecido pelo cliente.', 'Percurso e materiais previstos.', 'Capacidade elétrica e adequações.', 'Documentos, testes e garantia.', 'Exclusões e condições de revisão do preço.'],
    service: '/solucoes/eletrica/carregador-veicular/', serviceLabel: 'serviço de instalação de carregador veicular',
    faq: [['Existe preço único por wallbox?', 'Não. O equipamento é apenas parte do custo; a infraestrutura do imóvel altera a instalação.'], ['Posso comparar apenas o valor final?', 'Compare escopo, exclusões, testes e responsabilidades para evitar propostas incomparáveis.']]
  }
};

const examples = {
  'energia-solar-para-supermercados': ['Uma loja abre cedo e mantém câmaras frias ligadas após o fechamento. Outra opera em shopping, com cobertura e horário de acesso definidos pelo condomínio. Mesmo com faturas mensais parecidas, os horários de consumo, a área disponível e as condições de obra são diferentes. O levantamento precisa mostrar essas diferenças antes de comparar geração e investimento.', 'Se a rede possui filiais, comece pela unidade onde a usina poderia ser instalada e identifique as demais contas que se pretende avaliar. A possibilidade de compensação entre unidades depende da modalidade aplicável e deve ser confirmada no estudo.'],
  'energia-solar-para-hospitais': ['Considere uma clínica com atendimento apenas durante o dia e um hospital com internação contínua. O consumo, as restrições para obras e os processos que não podem ser interrompidos são diferentes. Uma mesma projeção por metro quadrado de telhado não representa as duas operações.', 'O gestor deve separar perguntas de economia das perguntas de continuidade: quais cargas já têm fontes de reserva, quem gerencia esses sistemas e quais áreas podem receber uma intervenção. Essas respostas orientam a avaliação sem atribuir à geração solar uma função de emergência que ela não foi projetada para cumprir.'],
  'energia-solar-para-condominios': ['Imagine um edifício que deseja reduzir a fatura das áreas comuns e outro que pretende incluir também unidades privadas. O primeiro debate pode se concentrar na conta condominial; o segundo exige discutir participantes, medição e modelo de compensação. Ambos precisam de deliberação e documentação compatíveis com seu caso.', 'Na assembleia, apresente uma proposta de estudo como etapa distinta da aprovação da obra. Isso permite examinar estrutura, custo e regras antes de assumir um investimento definitivo.'],
  'energia-solar-para-fazendas': ['Uma propriedade usa bombas intensamente por alguns meses e quase não irriga no restante do ano. Outra mantém câmaras frias e beneficiamento todos os dias. A mesma soma anual de quilowatt-hora não descreve como cada uma consome, portanto o estudo deve olhar meses e horários relevantes.', 'Se uma nova área irrigada está planejada, documente a expansão separadamente. Projetar apenas com as faturas anteriores pode criar uma solução inadequada para a operação futura.'],
  'como-funciona-a-energia-solar-em-casas': ['Uma família gera mais energia ao meio-dia e consome mais à noite. Outra permanece em casa durante o dia. O caminho elétrico básico é semelhante, mas o encontro entre geração e consumo muda. A análise financeira precisa usar a rotina da residência, não apenas a potência do telhado.', 'Se a principal motivação é manter aparelhos ligados em faltas de rede, diga isso antes do projeto. Essa necessidade muda a conversa sobre arquitetura e armazenamento.'],
  'wallbox-em-condominio': ['Um morador dispõe de vaga próxima ao quadro comum; outro estaciona a vários pavimentos do ponto de alimentação. A distância, o caminho dos cabos e a forma de cobrança alteram a proposta. É melhor esclarecer essas condições com a administração antes de comprar o carregador.', 'Quando vários moradores têm interesse, o condomínio pode avaliar uma solução compartilhada de infraestrutura em vez de tratar cada solicitação isoladamente. A decisão depende da capacidade disponível e das regras internas.'],
  'wallbox-com-energia-solar': ['Um veículo chega em casa ao fim da tarde, depois do período de maior geração solar. Outro permanece estacionado durante o dia. A possibilidade de coincidir recarga e produção será diferente; a economia não pode ser deduzida apenas pela existência de painéis.', 'Se o proprietário já tem dados de geração e consumo, eles ajudam a comparar recarga imediata, agendada e eventual controle por excedente. A compatibilidade desses recursos precisa ser verificada no equipamento proposto.'],
  'nr10-laudo-eletrico-empresa': ['Uma empresa possui diagramas recentes, porém várias recomendações de inspeção sem comprovação de conclusão. Outra tem manutenção registrada, mas os desenhos deixaram de refletir uma ampliação. O ponto de partida documental muda, e a avaliação deve registrar essas lacunas antes de declarar qualquer situação da instalação.', 'Para cada pendência, anote evidência de origem, responsável por decidir, ação prevista e registro de verificação. Isso ajuda o gestor a acompanhar o trabalho contratado.'],
  'automacao-industrial-nordeste': ['Uma linha perde tempo porque o operador precisa repetir uma sequência manual; outra tem paradas frequentes por sensores mal identificados. Comprar o mesmo controlador para as duas linhas não resolve necessariamente ambos os problemas. Mapeie causas e indicadores antes de desenhar a automação.', 'Uma etapa piloto pode medir se a mudança realmente reduziu paradas ou retrabalho e quais ajustes de operação e manutenção ainda faltam.'],
  'energia-solar-vale-a-pena-no-nordeste': ['Duas casas vizinhas podem ter a mesma irradiação regional, mas consumo, sombra e custo de instalação distintos. A resposta “vale a pena” pode ser diferente para cada uma. Peça cenários que expliquem quais dados levaram à conclusão.', 'Se o imóvel passará a ter ar-condicionado adicional ou veículo elétrico, registre a mudança como hipótese futura em vez de misturá-la ao consumo atual.'],
  'quanto-custa-instalar-energia-solar': ['Uma proposta inclui estrutura, projeto, conexão e testes; outra cita apenas módulos e inversor. O segundo total pode parecer menor porque parte da entrega ainda não foi precificada. Faça uma lista de inclusão e exclusão antes de comparar.', 'Também vale pedir que cada empresa informe o que acontece se o levantamento encontrar necessidade de reforço no telhado ou mudança no ponto de conexão.'],
  'como-escolher-uma-empresa-de-energia-solar': ['Se duas empresas projetam potências diferentes para o mesmo imóvel, peça as premissas de consumo, área e perdas. A diferença pode ser uma escolha técnica justificável, mas também pode indicar que uma proposta não considerou alguma restrição.', 'Registre respostas por escrito e compare documentação e responsabilidades com o mesmo critério para todos os fornecedores.'],
  'como-funciona-a-homologacao-da-energia-solar': ['Uma solicitação pode aguardar análise da distribuidora; outra pode estar parada por documento incompleto. Ambas parecem “em homologação”, mas exigem ações diferentes. O histórico de protocolo e exigências permite saber quem precisa agir.', 'O titular deve receber ao final os documentos e orientações necessários para acompanhar a instalação, inclusive em futuras manutenções.'],
  'como-escolher-instalador-wallbox': ['Dois orçamentos para o mesmo carregador podem partir de premissas diferentes: um considera quadro existente e percurso livre; outro inclui novo circuito e passagem em área comum. Antes de concluir que um está caro, confira se os escopos coincidem.', 'Peça que os testes e as orientações de entrega sejam descritos. Eles fazem parte da instalação, mesmo quando não aparecem como item separado de material.'],
  'quanto-custa-instalar-wallbox': ['Um ponto de recarga próximo ao quadro não tem necessariamente o mesmo custo de uma garagem distante ou compartilhada. Diferenças de percurso, acesso e capacidade elétrica podem ser decisivas. Um preço anunciado sem vistoria deve ser lido como estimativa condicionada.', 'Se houver necessidade de adequar o quadro, peça orçamento separado para essa etapa e confirme quem autoriza a intervenção.']
};

const deepDives = {
  'energia-solar-para-supermercados': [
    ['Rede de lojas: avalie cada endereço antes de somar números', 'Matriz, filiais e centros de distribuição podem ter titulares, tarifas e condições de conexão diferentes. Mantenha uma planilha com endereço, unidade consumidora, consumo, demanda quando aplicável, área disponível e responsável por fornecer os dados. Só depois discuta se faz sentido estudar uma ou mais unidades em conjunto.', 'Se a estratégia considerar compensação de créditos entre endereços, a modalidade de geração distribuída deve ser verificada com base nas regras vigentes e na configuração das unidades. Não presuma que o excedente de uma loja servirá automaticamente a todas as outras.'],
    ['Manutenção e rotina do varejo', 'Telhados sobre áreas de venda e estoque precisam continuar acessíveis para inspeções e reparos. O levantamento deve incluir histórico de impermeabilização, ocupação por equipamentos, restrições de segurança e rotas de acesso. Pergunte também como futuras obras de refrigeração ou climatização serão compatibilizadas com o sistema.', 'Ao comparar propostas, peça um plano de entrega que indique como a operação da loja será comunicada e quais etapas exigirão isolamento ou restrição de acesso.']
  ],
  'energia-solar-para-hospitais': [
    ['Integração com infraestrutura existente', 'Hospitais podem ter sistemas de alimentação, medição e proteção organizados por blocos ou áreas. Peça diagramas atualizados e identificação dos pontos de conexão propostos. A equipe responsável deve avaliar como a geração se relaciona com o arranjo existente, sem alterar a lógica de contingência por suposição.', 'Se os desenhos não refletem reformas recentes, registre isso como uma etapa de levantamento. Uma simulação baseada em instalação desconhecida pode gerar orçamento incompleto.'],
    ['Governança da decisão', 'Defina quem aprova acesso, quem responde por instalações elétricas e quem comunica as áreas assistenciais. O cronograma precisa mostrar levantamentos, projeto, obra, testes e documentação de entrega, além de condições para mudanças de escopo.', 'A análise financeira deve chegar acompanhada das limitações técnicas identificadas. Isso ajuda a gestão a decidir sem tratar a economia projetada como único critério.']
  ],
  'energia-solar-para-condominios': [
    ['Participação e prestação de contas', 'Antes de estimar benefício por apartamento, esclareça quais unidades participariam e como as informações de consumo serão obtidas. Registre quem aprova o modelo, quem acompanha o desempenho e quem presta contas aos moradores. Essas decisões administrativas interferem na forma de apresentar a proposta.', 'Se o objetivo for apenas reduzir despesas comuns, informe isso claramente. É diferente de prometer redução individual para cada condômino.'],
    ['Custos após a instalação', 'Inclua na discussão inspeção, limpeza quando necessária, monitoramento, acesso à cobertura e eventual substituição de componentes. Pergunte como esses gastos serão previstos no orçamento do condomínio e quem receberá alertas de desempenho.', 'Uma proposta útil deve permitir que futuros síndicos entendam documentos, garantias, contatos e responsabilidades sem depender da memória da gestão que aprovou a obra.']
  ],
  'energia-solar-para-fazendas': [
    ['Consumo fora da irrigação', 'Além das bombas, inventarie câmaras frias, ordenha, beneficiamento, ventilação e moradias vinculadas às unidades consumidoras estudadas. Registre quais cargas são diurnas e quais continuam após o pôr do sol. Isso evita atribuir toda a fatura à irrigação e superestimar a coincidência entre geração e consumo.', 'Quando houver motores com partida ou operação particular, a equipe técnica precisará avaliar as condições elétricas, e não apenas o consumo acumulado da fatura.'],
    ['Operação e manutenção no campo', 'Áreas de solo podem ser afetadas por circulação de máquinas, poeira, vegetação e acesso para manutenção. Telhados rurais podem ter limitações estruturais ou reformas previstas. Leve essas informações ao levantamento para que a implantação não atrapalhe a rotina da propriedade.', 'Peça que a proposta explique como desempenho e falhas serão acompanhados, sobretudo se a conectividade for limitada.']
  ],
  'wallbox-em-condominio': [
    ['Um pedido individual pode abrir uma decisão coletiva', 'Quando a primeira instalação ocupa espaço em shafts, quadros ou rotas compartilhadas, a administração precisa considerar solicitações futuras. Pergunte se o prédio possui diretriz para novos pontos de recarga e se uma infraestrutura comum poderia evitar obras repetidas.', 'O estudo de capacidade deve identificar limites existentes e alternativas de implantação. O artigo não define quantos carregadores o edifício suporta; isso depende da instalação real.'],
    ['Documente a entrega', 'Após aprovação e execução, mantenha registros do circuito instalado, medições, documentos técnicos, responsáveis e orientações de uso. Defina também quem será acionado em caso de falha e como o morador comunicará troca de equipamento ou aumento de potência.', 'Esse histórico ajuda o condomínio a administrar os pontos de recarga e a avaliar novos pedidos com informações confiáveis.']
  ],
  'wallbox-com-energia-solar': [
    ['Recarga agendada e prioridade solar são coisas diferentes', 'Agendar a recarga para determinado horário pode coincidir com a produção solar, mas não mede automaticamente quanto excedente há naquele instante. Um sistema que ajusta potência à geração disponível requer recursos de controle e medição compatíveis. Confirme o comportamento do conjunto antes de comprar equipamentos.', 'Se o carro precisa estar pronto para sair em horário fixo, registre essa restrição. Uma estratégia baseada apenas no excedente pode não atender à rotina.'],
    ['Como verificar o resultado depois', 'Guarde dados de geração fotovoltaica, consumo do imóvel e energia entregue ao veículo, quando a medição permitir. Compare períodos semelhantes e observe mudanças de uso. Uma fatura isolada pode ser insuficiente para atribuir economia ao modo de recarga.', 'O objetivo é verificar se a solução opera como planejado e ajustar horários ou configurações dentro dos limites definidos pelo projeto.']
  ]
};

for (const [slug, revision] of Object.entries(revisions)) {
  const filename = files.get(slug);
  if (!filename) throw new Error(`Missing post: ${slug}`);
  const filepath = path.join(dir, filename);
  const post = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const content = [
    `<p class="lead">${revision.lead}</p>`,
    ...revision.sections.map(section),
    ...(deepDives[slug] || []).map(section),
    `<h2>Exemplo para comparar situações</h2>${examples[slug].map(paragraph).join('\n')}`,
    checklist(revision.items),
    `<h2>Quando passar do estudo para o serviço?</h2><p>Com os dados organizados, veja a <a href="${revision.service}">${revision.serviceLabel}</a> para entender a solução oferecida e solicitar uma avaliação do seu caso. O escopo técnico e comercial depende das condições verificadas.</p>`
  ].join('\n');
  Object.assign(post, {
    title: revision.title,
    metaTitle: revision.title,
    seoTitle: revision.title,
    ogTitle: revision.title,
    summary: revision.summary,
    metaDescription: revision.summary,
    seoDescription: revision.summary,
    ogDescription: revision.summary,
    primaryKeyword: revision.keyword,
    keywords: [revision.keyword],
    searchIntent: 'informacional',
    contentHtml: content,
    contentAppendHtml: '',
    faq: revision.faq.map(([question, answer]) => ({ question, answer })),
    dateModified: today,
    dateModifiedIso: '2026-09-22T12:00:00-03:00',
    readTime: `${Math.max(3, Math.ceil(content.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 190))} min`
  });
  fs.writeFileSync(filepath, JSON.stringify(post, null, 2) + '\n');
  process.stdout.write(`${slug}\n`);
}
