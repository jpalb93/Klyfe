const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content', 'posts', 'published');
const TODAY = '2026-09-16';
const AUTHOR = {
  author: 'Equipe Técnica Klyfe Electric',
  authorType: 'Organization',
  authorRole: 'Engenharia elétrica, energia solar e mobilidade elétrica',
  authorBio: 'Conteúdo técnico preparado pela Klyfe Electric a partir de critérios de engenharia, fontes públicas e limites declarados. Escopo, valores e exigências devem ser confirmados para cada imóvel e contratação.'
};

const SOURCES = {
  aneelSolar: { title: 'Micro e Minigeração Distribuída', publisher: 'ANEEL', url: 'https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida' },
  law14300: { title: 'Lei nº 14.300/2022', publisher: 'Presidência da República', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm' },
  energisa: { title: 'Geração Distribuída', publisher: 'Energisa', url: 'https://www.energisa.com.br/para-sua-casa/servicos/outros-servicos/geracao-distribuida' },
  energisaNormas: { title: 'Normas técnicas de conexão', publisher: 'Energisa', url: 'https://www.energisa.com.br/normas-tecnicas' },
  nr10: { title: 'Norma Regulamentadora nº 10', publisher: 'Ministério do Trabalho e Emprego', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10' },
  abnt17019: { title: 'ABNT NBR 17019:2022 — Alimentação de veículos elétricos', publisher: 'ABNT Catálogo', url: 'https://www.abntcatalogo.com.br/default.aspx?P=C0W59PS6VY3A' },
  aneelEv: { title: 'Veículos elétricos', publisher: 'ANEEL', url: 'https://www.gov.br/aneel/pt-br/assuntos/veiculos-eletricos' },
  inpe: { title: 'Atlas Brasileiro de Energia Solar', publisher: 'INPE', url: 'https://www.gov.br/pt-br/servicos/obter-dados-do-atlas-brasileiro-de-energia-solar-atlas-solar?id=12305&origem=servico' },
  nrelPv: { title: 'Solar Electricity Basics', publisher: 'National Renewable Energy Laboratory', url: 'https://www.nrel.gov/docs/fy09osti/43844.pdf' },
  spda: { title: 'ABNT NBR 5419 — Proteção contra descargas atmosféricas', publisher: 'ABNT Catálogo', url: 'https://www.abntcatalogo.com.br/default.aspx?P=C0N63GK2P5N1' },
  cbmPb: { title: 'NT-11 — Procedimentos Administrativos', publisher: 'Corpo de Bombeiros Militar da Paraíba', url: 'https://bravo.bombeiros.pb.gov.br/portal/wp-content/uploads/2024/11/NT-11-Procedimentos-Administrativos.pdf' }
};

function source(key) {
  return { ...SOURCES[key], lastVerifiedAt: TODAY };
}

function link(slug, label) {
  return `<a href="/blog/${slug}">${label}</a>`;
}

function renderExpansion(slug, data) {
  const checklist = data.checklist.map(item => `<li>${item}</li>`).join('');
  const related = data.related.map(item => `<li>${link(item[0], item[1])}</li>`).join('');
  return `
<section class="blog-editorial-expansion" data-blog-block="editorial-expansion-v1">
  <h2>${data.heading}</h2>
  <p><strong>Resposta curta:</strong> ${data.answer}</p>
  <p>${data.context}</p>

  <h2>Como avaliar o seu caso</h2>
  <p>${data.method}</p>
  <ul>${checklist}</ul>

  <h2>O que este guia não promete</h2>
  <p>${data.caution}</p>

  <h2>Próximo passo recomendado</h2>
  <p>${data.next}</p>
  <aside class="blog-content-cta" data-blog-block="related-links-v1">
    <h3>Continue a pesquisa</h3>
    <ul>${related}</ul>
  </aside>
</section>`;
}

const reviews = {
  'spda-para-raios-obrigatorio': {
    primaryKeyword: 'o que é SPDA', searchIntent: 'informacional', seoTitle: 'O que é SPDA? Guia de Para-raios e Avaliação Técnica', seoDescription: 'Entenda o que é SPDA, quais elementos podem fazer parte do sistema e quando uma avaliação técnica deve considerar a edificação e a NBR 5419.',
    keywords: ['o que é SPDA', 'sistema de proteção contra descargas atmosféricas', 'projeto de SPDA', 'laudo de SPDA', 'NBR 5419'], tags: ['SPDA', 'Para-raios', 'NBR 5419', 'Segurança elétrica'], imageAlt: 'Infraestrutura predial analisada para projeto de SPDA e proteção contra descargas atmosféricas', sources: ['spda', 'cbmPb'], related: [['nr10-laudo-eletrico-empresa', 'laudo elétrico e documentação de segurança'], ['quanto-tempo-duram-os-paineis-solares', 'manutenção e vida útil de sistemas'], ['documentos-para-instalar-energia-solar', 'checklist de documentos técnicos']],
    expansion: { heading: 'SPDA na prática: projeto, inspeção e documentação', answer: 'SPDA não é apenas uma haste no topo do imóvel. É um conjunto de medidas de proteção que precisa ser definido conforme a edificação, a ocupação, a exposição e a avaliação de risco.', context: 'O mesmo termo pode aparecer em propostas diferentes: projeto, instalação, adequação, inspeção ou laudo. Antes de comparar preços, confirme qual dessas entregas está sendo contratada e quais partes da instalação serão verificadas.', method: 'Peça a identificação do objetivo do trabalho, a versão das referências usadas, os desenhos ou registros entregues e os limites da inspeção. Em uma edificação existente, o diagnóstico deve registrar o que foi observado e o que não pôde ser confirmado sem ensaio ou acesso específico.', checklist: ['identificar a ocupação e as características da edificação;', 'verificar captação, descidas, aterramento e equipotencialização conforme o escopo;', 'separar proteção externa contra descargas de DPS e proteção interna;', 'registrar fotos, medições, pendências e recomendações de correção;'], caution: 'A existência de um SPDA não elimina todos os efeitos possíveis de uma descarga atmosférica. Obrigatoriedade, periodicidade e documentação dependem da norma vigente, do projeto, do órgão competente, da apólice e das condições reais do imóvel.', next: 'Se a dúvida surgiu por reforma, regularização, seguro ou mudança de uso, organize esses dados antes da vistoria. A página de serviço deve receber um briefing claro, para que o responsável técnico defina o escopo adequado.' }
  },
  'nr10-laudo-eletrico-empresa': {
    primaryKeyword: 'laudo NR-10 para empresas', searchIntent: 'informacional-comercial', seoTitle: 'Laudo NR-10 para Empresas: O que Avaliar', seoDescription: 'Saiba o que um laudo NR-10 pode analisar em uma empresa, como organizar o PIE e quais limites devem constar na avaliação técnica.',
    keywords: ['laudo NR-10 para empresas', 'NR-10 instalações elétricas', 'PIE NR-10', 'inspeção elétrica empresarial', 'segurança em eletricidade'], tags: ['NR-10', 'Laudos', 'PIE', 'Segurança do trabalho'], imageAlt: 'Quadro elétrico empresarial durante avaliação técnica de segurança conforme NR-10', sources: ['nr10'], related: [['spda-para-raios-obrigatorio', 'avaliação de SPDA'], ['clp-vs-reles-paineis', 'automação e painéis industriais'], ['automacao-industrial-nordeste', 'automação industrial no Nordeste']],
    expansion: { heading: 'Laudo NR-10, inspeção e PIE: qual é a diferença?', answer: 'A avaliação NR-10 organiza evidências sobre instalações, serviços, documentos e medidas de controle. O relatório não é uma aprovação automática: ele deve mostrar achados, escopo, limites e prioridades.', context: 'O Prontuário de Instalações Elétricas (PIE) reúne documentos aplicáveis à instalação e à rotina de trabalho. A composição depende da empresa, da tensão, das atividades, dos trabalhadores envolvidos e dos documentos já existentes.', method: 'Comece por um inventário dos quadros, painéis, salas elétricas, máquinas e intervenções realizadas. Depois, confronte diagramas, identificação, aterramento, proteções, sinalização, procedimentos e capacitação com a realidade encontrada.', checklist: ['definir as áreas e instalações incluídas;', 'separar inspeção visual, medições e análise documental;', 'registrar não conformidades com evidência e prioridade;', 'indicar o que depende de projeto, adequação ou validação adicional;'], caution: 'NR-10 não substitui projeto elétrico, laudo de SPDA, manutenção, treinamento ou documentação de outras normas. Também não é adequado prometer conformidade total sem verificar todos os itens relevantes.', next: 'Para solicitar uma avaliação, reúna plantas, diagramas, histórico de manutenção, relação de máquinas e o motivo da contratação. Isso ajuda a dimensionar o escopo e evita um laudo genérico.' }
  },
  'automacao-industrial-nordeste': {
    primaryKeyword: 'automação industrial', searchIntent: 'informacional-comercial', seoTitle: 'Automação Industrial: Guia de Indústria 4.0 no Nordeste', seoDescription: 'Entenda como CLPs, sensores, supervisórios e dados podem melhorar processos industriais no Nordeste, com diagnóstico e implantação por etapas.',
    keywords: ['automação industrial', 'Indústria 4.0 Nordeste', 'CLP industrial', 'supervisório SCADA', 'retrofit de máquinas'], tags: ['Automação industrial', 'Indústria 4.0', 'CLP', 'SCADA'], imageAlt: 'Painel de automação industrial com controlador, sensores e supervisório', sources: ['nr10'], related: [['clp-vs-reles-paineis', 'CLP ou relés'], ['nr10-laudo-eletrico-empresa', 'segurança de painéis'], ['spda-para-raios-obrigatorio', 'proteção elétrica industrial']],
    expansion: { heading: 'Como começar um projeto de automação industrial', answer: 'Automação industrial começa pelo processo e pelo problema operacional, não pela compra de um CLP. O diagnóstico deve medir perdas, paradas, retrabalho, variabilidade e riscos antes de definir a arquitetura.', context: 'Em uma fábrica do Nordeste, temperatura, poeira, maresia, disponibilidade de peças, conectividade e capacidade da equipe de manutenção podem alterar a solução. Um bom projeto registra essas condições e define uma implantação compatível com a operação.', method: 'Mapeie entradas, saídas, intertravamentos, alarmes, dados necessários e pontos de intervenção humana. Em seguida, escolha a menor etapa que permita medir resultado e evoluir sem parar a produção além do necessário.', checklist: ['descrever o processo atual e seus gargalos;', 'definir indicadores de produção, qualidade e manutenção;', 'verificar painéis, instrumentação, rede e documentação existentes;', 'planejar testes, treinamento, backup e manutenção;'], caution: 'Indústria 4.0 não significa instalar sensores em tudo. Sem arquitetura, governança de dados e rotina de uso, a tecnologia pode aumentar custo e complexidade sem resolver o gargalo.', next: 'Se o objetivo é retrofit, leve fotos dos painéis, listas de I/O, diagramas e histórico de falhas. A engenharia pode então estimar a sequência de automação e as interfaces com a operação.' }
  },
  'clp-vs-reles-paineis': {
    primaryKeyword: 'CLP ou relé', searchIntent: 'comercial-investigação', seoTitle: 'CLP ou Relés: Como Escolher para Automação Industrial', seoDescription: 'Compare CLP e relés por complexidade, manutenção, expansão, diagnóstico e custo total para escolher a arquitetura de automação do processo.',
    keywords: ['CLP ou relé', 'CLP vs relés', 'painel de automação', 'retrofit industrial', 'controlador lógico programável'], tags: ['CLP', 'Relés', 'Painéis', 'Automação'], imageAlt: 'Comparação entre painel de relés e painel com controlador lógico programável', sources: ['nr10'], related: [['automacao-industrial-nordeste', 'guia de automação industrial'], ['nr10-laudo-eletrico-empresa', 'avaliação de painéis'], ['spda-para-raios-obrigatorio', 'proteção da instalação']],
    expansion: { heading: 'CLP ou relés: a decisão depende da lógica do processo', answer: 'Relés podem atender comandos simples e estáveis; CLPs tendem a fazer mais sentido quando há muitas condições, temporizações, alarmes, receitas, mudanças de lógica ou necessidade de diagnóstico.', context: 'O custo de compra é apenas uma parte da decisão. Horas de parada, disponibilidade de peças, tempo de manutenção, espaço no painel, documentação e possibilidade de expansão pesam no custo total de propriedade.', method: 'Desenhe a sequência de operação e conte entradas, saídas, intertravamentos, temporizadores e exceções. Depois, simule como a equipe localizará uma falha e como a lógica será alterada quando o processo mudar.', checklist: ['quantidade e tipo de sinais de campo;', 'necessidade de comunicação com inversores ou supervisório;', 'frequência de mudanças no processo;', 'capacidade de programação e manutenção da equipe;', 'plano de testes e documentação da entrega;'], caution: 'CLP não é automaticamente melhor, e relé não é automaticamente inseguro. A arquitetura deve respeitar o risco da máquina, as proteções físicas e a competência de quem fará manutenção.', next: 'Para um retrofit, compare uma solução mínima com uma solução expansível. O orçamento deve mostrar o que é equipamento, montagem, programação, testes e treinamento.' }
  },
  'o-que-e-energia-solar-fotovoltaica': {
    primaryKeyword: 'o que é energia solar fotovoltaica', searchIntent: 'informacional', seoTitle: 'O que é Energia Solar Fotovoltaica? Como Funciona', seoDescription: 'Entenda o que é energia solar fotovoltaica, como painéis e inversor transformam luz em eletricidade e o que muda entre consumo e conexão à rede.',
    keywords: ['o que é energia solar fotovoltaica', 'como funciona energia solar', 'painel fotovoltaico', 'inversor solar', 'sistema conectado à rede'], tags: ['Energia solar', 'Fotovoltaica', 'Fundamentos', 'Inversor'], imageAlt: 'Módulos fotovoltaicos e inversor formando um sistema de energia solar conectado à rede', sources: ['nrelPv', 'aneelSolar', 'inpe'], related: [['como-funciona-a-energia-solar-em-casas', 'energia solar em casas'], ['o-que-e-inversor-solar', 'função do inversor solar'], ['diferenca-entre-energia-solar-conectada-e-isolada', 'on-grid e off-grid']],
    expansion: { heading: 'Do fóton ao consumo: o que acontece em um sistema fotovoltaico', answer: 'O módulo fotovoltaico converte parte da luz em corrente contínua. O inversor adapta essa energia para o circuito de corrente alternada e, em sistemas conectados, coordena a operação com a rede.', context: 'A quantidade de energia produzida varia com irradiação, temperatura, orientação, inclinação, sombras, sujeira, perdas elétricas e disponibilidade do equipamento. Por isso, potência nominal do painel não é igual à energia mensal garantida.', method: 'Separe três perguntas: como a eletricidade é gerada, como ela é consumida no imóvel e como o excedente é tratado pela rede. A resposta muda conforme o sistema é on-grid, híbrido ou isolado.', checklist: ['identificar módulos, inversor, proteções e estrutura;', 'verificar se o projeto considera sombras e características do telhado;', 'entender consumo instantâneo, excedente e créditos;', 'consultar regras da distribuidora e do sistema de compensação;'], caution: 'Energia solar não significa independência automática da distribuidora nem conta sempre igual a zero. O resultado depende de projeto, consumo, tarifa, regras vigentes e operação do sistema.', next: 'Depois de entender os fundamentos, avance para o artigo sobre energia solar residencial ou para a comparação entre on-grid, off-grid e híbrido.' }
  },
  'como-funciona-a-energia-solar-em-casas': {
    primaryKeyword: 'energia solar residencial', searchIntent: 'informacional-comercial', seoTitle: 'Energia Solar Residencial: Como Funciona em Casas', seoDescription: 'Veja como a energia solar residencial é dimensionada, instalada e conectada à rede, quais custos permanecem e que dados entram no projeto.',
    keywords: ['energia solar residencial', 'energia solar em casas', 'instalação fotovoltaica residencial', 'medidor bidirecional', 'projeto solar residencial'], tags: ['Energia solar', 'Residencial', 'On-grid', 'Projeto'], imageAlt: 'Instalação de energia solar fotovoltaica em telhado residencial', sources: ['aneelSolar', 'law14300', 'energisa'], related: [['o-que-e-energia-solar-fotovoltaica', 'fundamentos da energia fotovoltaica'], ['quanto-custa-instalar-energia-solar', 'custos e escopo do orçamento'], ['como-funciona-a-homologacao-da-energia-solar', 'homologação do sistema']],
    expansion: { heading: 'Como o projeto residencial transforma consumo em dimensionamento', answer: 'O sistema não é dimensionado apenas pelo tamanho do telhado. A equipe precisa analisar histórico de consumo, padrão de entrada, orientação, sombras, área disponível e regras da distribuidora.', context: 'Em uma casa, parte da geração pode ser consumida no mesmo instante e o excedente pode seguir o procedimento de compensação aplicável. A fatura continua sujeita a componentes que não são compensados da mesma forma.', method: 'Use as últimas faturas e destaque mudanças futuras, como ar-condicionado, carregador de veículo, piscina ou ampliação. O melhor projeto é aquele que explicita premissas e mostra o que acontece se o consumo mudar.', checklist: ['reunir faturas e identificar sazonalidade;', 'avaliar telhado, acesso, sombras e estrutura;', 'conferir quadro, padrão e proteções;', 'separar geração estimada de economia líquida;', 'confirmar etapas de projeto, instalação e conexão;'], caution: 'Prazo de obra, troca de medidor, economia e adequações variam conforme o imóvel e a distribuidora. Evite promessas fixas baseadas apenas em uma média comercial.', next: 'Compare propostas usando o escopo completo, não somente a quantidade de módulos ou a parcela do financiamento.' }
  },
  'diferenca-entre-energia-solar-conectada-e-isolada': {
    primaryKeyword: 'on-grid ou off-grid', searchIntent: 'comercial-investigação', seoTitle: 'On-Grid ou Off-Grid: Qual Sistema Solar Escolher?', seoDescription: 'Compare sistemas on-grid, off-grid e híbridos por rede, baterias, continuidade, custo, manutenção e perfil de consumo antes de escolher.',
    keywords: ['sistema on-grid e off-grid', 'energia solar isolada', 'energia solar conectada à rede', 'sistema híbrido solar', 'bateria solar'], tags: ['On-grid', 'Off-grid', 'Híbrido', 'Baterias'], imageAlt: 'Diagrama comparativo entre sistema solar on-grid, off-grid e híbrido', sources: ['aneelSolar', 'nrelPv', 'law14300'], related: [['energia-solar-funciona-sem-luz', 'energia solar durante apagões'], ['precisa-de-bateria-para-energia-solar', 'quando usar bateria'], ['o-que-e-inversor-solar', 'tipos de inversor']],
    expansion: { heading: 'On-grid, off-grid e híbrido: qual problema cada arquitetura resolve?', answer: 'On-grid prioriza a conexão e a compensação com a rede; off-grid precisa produzir e armazenar energia localmente; híbrido combina rede, geração e armazenamento conforme a estratégia de backup.', context: 'A escolha depende de confiabilidade da rede, cargas críticas, espaço, orçamento, autonomia desejada e capacidade de manutenção. Não é uma disputa entre tecnologia melhor e pior, mas uma decisão de arquitetura.', method: 'Liste as cargas que não podem desligar, quantas horas de autonomia são necessárias e em que períodos ocorre o consumo. Depois, dimensione geração, inversor, bateria e proteção com base nesse cenário.', checklist: ['definir se apagões são frequentes ou críticos;', 'separar cargas essenciais de cargas de conforto;', 'considerar reposição e descarte das baterias;', 'verificar ventilação, segurança e espaço técnico;', 'calcular custo total e não só o preço do kit;'], caution: 'Uma bateria não transforma qualquer sistema em backup total. Potência instantânea, capacidade útil, compatibilidade, transferência e proteções precisam ser verificadas.', next: 'Se o principal problema for falta de luz, leia o guia de backup. Se for autonomia econômica, compare com o artigo sobre necessidade de bateria.' }
  },
  'o-que-e-inversor-solar': {
    primaryKeyword: 'inversor solar', searchIntent: 'informacional-comercial', seoTitle: 'Inversor Solar: O que é e Como Escolher', seoDescription: 'Entenda a função do inversor solar, MPPT, anti-ilhamento, string, microinversor e os critérios técnicos para escolher o equipamento.',
    keywords: ['inversor solar', 'como funciona inversor fotovoltaico', 'inversor string', 'microinversor', 'MPPT solar'], tags: ['Inversor', 'MPPT', 'Microinversor', 'Fotovoltaica'], imageAlt: 'Inversor solar fotovoltaico instalado em ambiente técnico protegido', sources: ['nrelPv', 'aneelSolar'], related: [['o-que-e-energia-solar-fotovoltaica', 'como a energia fotovoltaica funciona'], ['diferenca-entre-energia-solar-conectada-e-isolada', 'arquiteturas solares'], ['quanto-tempo-duram-os-paineis-solares', 'vida útil dos componentes']],
    expansion: { heading: 'Inversor solar: desempenho, proteção e monitoramento', answer: 'O inversor converte corrente contínua em alternada, busca o ponto de operação dos módulos, monitora condições elétricas e aplica funções de proteção previstas para a conexão.', context: 'String, microinversor e híbrido atendem cenários diferentes. Sombreamento, número de orientações, potência, tensão, acesso para manutenção, backup e expansão devem aparecer na justificativa do projeto.', method: 'Compare faixa de tensão MPPT, corrente máxima, número de entradas, proteção, grau de proteção, comunicação, garantia e assistência. A compatibilidade elétrica deve ser conferida com os módulos e com a rede do imóvel.', checklist: ['avaliar sombras e orientações dos módulos;', 'conferir limites de tensão e corrente;', 'definir onde o equipamento será instalado;', 'planejar monitoramento e atualização;', 'registrar condições de garantia e atendimento;'], caution: 'Eficiência de catálogo não equivale à eficiência anual da usina. Também não é correto tratar todos os microinversores ou inversores string como superiores em qualquer telhado.', next: 'O próximo passo é comparar a arquitetura do sistema com o seu consumo e com a infraestrutura elétrica disponível.' }
  },
  'energia-solar-vale-a-pena-no-nordeste': {
    primaryKeyword: 'energia solar vale a pena', searchIntent: 'comercial-investigação', seoTitle: 'Energia Solar Vale a Pena? Análise de Retorno', seoDescription: 'Veja quando a energia solar pode fazer sentido no Nordeste e como avaliar retorno, consumo, tarifa, regras de compensação e custos do projeto.',
    keywords: ['energia solar vale a pena', 'retorno energia solar', 'energia solar Nordeste', 'viabilidade fotovoltaica', 'ROI energia solar'], tags: ['Viabilidade', 'ROI', 'Nordeste', 'Energia solar'], imageAlt: 'Usina fotovoltaica em operação no Nordeste para análise de viabilidade', sources: ['inpe', 'aneelSolar', 'law14300'], related: [['quanto-custa-instalar-energia-solar', 'quanto custa o sistema'], ['em-quanto-tempo-a-energia-solar-se-paga', 'como calcular payback'], ['quanto-da-para-economizar-com-energia-solar', 'economia líquida']],
    expansion: { heading: 'Vale a pena para qual perfil de consumidor?', answer: 'A energia solar tende a fazer mais sentido quando há consumo previsível, telhado ou terreno adequado, horizonte de permanência no imóvel e proposta com premissas transparentes.', context: 'O Nordeste tem bom recurso solar, mas o resultado de um projeto ainda depende de sombras, temperatura, perdas, tarifa, estrutura, conexão, manutenção e financiamento. Recurso solar é vantagem de projeto, não promessa de retorno.', method: 'Monte cenários conservador, esperado e sensível. Inclua investimento, economia líquida, custos de manutenção, degradação, tarifa, crédito e o valor das cobranças que permanecem na fatura.', checklist: ['usar consumo real em kWh, não apenas o valor em reais;', 'verificar as condições do imóvel e do telhado;', 'separar payback simples de retorno descontado;', 'comparar proposta técnica e contrato;', 'confirmar regras vigentes da distribuidora;'], caution: 'Não existe payback universal, economia garantida ou retorno idêntico entre cidades. Números publicitários precisam ser reproduzidos com os dados da sua unidade consumidora.', next: 'Comece pelo custo do sistema e depois valide a economia líquida. Essa ordem evita comparar uma parcela de financiamento com uma economia bruta.' }
  },
  'quanto-custa-instalar-energia-solar': {
    primaryKeyword: 'quanto custa instalar energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Quanto Custa Instalar Energia Solar? Guia 2026', seoDescription: 'Entenda o que compõe o preço de instalar energia solar, quais dados mudam o orçamento e como comparar propostas sem confundir kit e projeto.',
    keywords: ['quanto custa instalar energia solar', 'preço energia solar 2026', 'orçamento energia solar', 'custo projeto fotovoltaico', 'financiamento solar'], tags: ['Preço', 'Orçamento', 'Financiamento', 'Energia solar'], imageAlt: 'Engenheiro analisando orçamento e projeto de instalação de energia solar', sources: ['aneelSolar', 'law14300', 'energisa'], related: [['em-quanto-tempo-a-energia-solar-se-paga', 'payback da energia solar'], ['como-escolher-uma-empresa-de-energia-solar', 'como comparar integradoras'], ['documentos-para-instalar-energia-solar', 'documentos do projeto']],
    expansion: { heading: 'Como transformar uma faixa de preço em orçamento comparável', answer: 'O preço depende de potência, equipamentos, estrutura, distância, proteções, padrão, projeto, homologação, instalação e condições de pagamento. Uma tabela de mercado só serve como triagem.', context: 'Duas propostas com a mesma potência podem entregar escopos diferentes. O orçamento deve dizer o que está incluído, quais adequações são condicionais e quais itens permanecem sob responsabilidade do cliente.', method: 'Peça uma proposta com premissas: consumo, produção estimada, marcas e modelos, garantias, cronograma, documentos, testes, comissionamento e suporte. Compare o custo total e não apenas o valor inicial.', checklist: ['confirmar se projeto, ART e homologação estão incluídos;', 'separar equipamento, material, mão de obra e adequação;', 'verificar garantias de produto e de instalação;', 'comparar juros, entrada, carência e Custo Efetivo Total;', 'registrar o que acontece se a vistoria apontar pendências;'], caution: 'Não use valores desta página como promessa comercial, pois câmbio, equipamentos, logística, obras e regras podem mudar. O preço final só deve ser fechado depois do diagnóstico.', next: 'Depois de comparar o escopo, calcule economia líquida e payback com a mesma base. Isso evita aceitar uma proposta barata que omite etapas essenciais.' }
  },
  'em-quanto-tempo-a-energia-solar-se-paga': {
    primaryKeyword: 'payback da energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Payback da Energia Solar: Como Calcular', seoDescription: 'Aprenda a calcular o payback da energia solar com investimento, economia líquida, custos, degradação, tarifa e cenários sem prazo garantido.',
    keywords: ['payback energia solar', 'tempo de retorno solar', 'retorno investimento fotovoltaico', 'economia solar líquida', 'simulação energia solar'], tags: ['Payback', 'Retorno', 'Economia', 'Simulação'], imageAlt: 'Planilha de cálculo do retorno do investimento em energia solar', sources: ['aneelSolar', 'law14300', 'inpe'], related: [['quanto-custa-instalar-energia-solar', 'custo do projeto'], ['quanto-da-para-economizar-com-energia-solar', 'economia líquida'], ['energia-solar-vale-a-pena-no-nordeste', 'viabilidade no Nordeste']],
    expansion: { heading: 'Payback não é prazo de garantia: é um cenário de decisão', answer: 'Payback simples divide o investimento pela economia líquida estimada. Ele é útil para comparar cenários, mas não representa sozinho o retorno financeiro completo.', context: 'A simulação muda quando entram inflação, tarifa, degradação, disponibilidade, manutenção, custo do financiamento, valor residual e regras de compensação. Por isso, uma resposta responsável mostra premissas e sensibilidade.', method: 'Calcule primeiro a economia mensal com base em kWh e tarifa. Depois desconte custos que permanecem, reserve manutenção e projete cenários com variação de geração e consumo.', checklist: ['usar faturas reais e sazonalidade;', 'separar economia bruta de economia líquida;', 'informar se o cálculo é simples ou descontado;', 'testar aumento de consumo, sombra e indisponibilidade;', 'recalcular quando a proposta ou regra mudar;'], caution: 'Não é seguro prometer retorno em um número fixo de meses sem vistoria e sem declarar premissas. Financiamento também precisa ser analisado pelo custo total.', next: 'Use este artigo junto ao guia de preço. A decisão fica mais sólida quando investimento e benefício são calculados na mesma data e para o mesmo sistema.' }
  },
  'quanto-da-para-economizar-com-energia-solar': {
    primaryKeyword: 'quanto economiza com energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Quanto Economiza com Energia Solar? Veja como Calcular', seoDescription: 'Entenda como calcular a economia da energia solar, o que permanece na fatura e por que o resultado depende do consumo e das regras vigentes.',
    keywords: ['quanto economiza energia solar', 'economia na conta de luz', 'conta de luz com energia solar', 'custo de disponibilidade', 'Fio B energia solar'], tags: ['Economia', 'Conta de luz', 'Fio B', 'SCEE'], imageAlt: 'Comparação de consumo e economia na conta de luz após instalação fotovoltaica', sources: ['aneelSolar', 'law14300'], related: [['quanto-custa-instalar-energia-solar', 'custo do sistema'], ['em-quanto-tempo-a-energia-solar-se-paga', 'payback'], ['como-funciona-a-energia-solar-em-casas', 'funcionamento residencial']],
    expansion: { heading: 'Economia solar é diferente de conta zerada', answer: 'A redução depende de quanto a usina produz, quanto é consumido no imóvel, do modelo de compensação e das parcelas da fatura que continuam sendo cobradas.', context: 'O cálculo correto parte de kWh e não de um percentual publicitário. Consumo instantâneo, excedente, tarifa, classe de tensão, custo de disponibilidade, iluminação pública e componentes regulatórios precisam ser separados.', method: 'Compare a média das faturas antes do projeto com uma projeção mensal depois do projeto. Mostre o cenário de geração menor, o consumo maior e os itens que não entram na compensação.', checklist: ['usar pelo menos um histórico de faturas;', 'separar tarifas e cobranças fixas;', 'considerar sazonalidade e mudanças de hábito;', 'não tratar crédito como dinheiro recebido;', 'atualizar o cálculo quando a regulamentação mudar;'], caution: 'Percentual de economia não é universal e uma conta residual pode continuar existindo. A proposta deve mostrar uma faixa e explicar por que ela pode variar.', next: 'Se a economia estimada parecer alta demais, revise a geração, a tarifa, o consumo diurno e as cobranças residuais antes de contratar.' }
  },
  'energia-solar-funciona-em-dia-nublado': {
    primaryKeyword: 'energia solar em dia nublado', searchIntent: 'informacional', seoTitle: 'Energia Solar em Dia Nublado: Entenda a Geração', seoDescription: 'Descubra como a radiação difusa mantém a geração em dias nublados, quais perdas são esperadas e como o projeto considera clima e sombras.',
    keywords: ['energia solar em dia nublado', 'painel solar na chuva', 'radiação difusa fotovoltaica', 'produção solar no inverno', 'sombreamento painel solar'], tags: ['Clima', 'Geração', 'Radiação', 'Fotovoltaica'], imageAlt: 'Painéis fotovoltaicos gerando energia sob céu nublado e chuva leve', sources: ['inpe', 'nrelPv'], related: [['o-que-e-energia-solar-fotovoltaica', 'fundamentos fotovoltaicos'], ['quanto-tempo-duram-os-paineis-solares', 'degradação e durabilidade'], ['painel-solar-precisa-de-limpeza', 'efeito da sujeira na geração']],
    expansion: { heading: 'Nublado não significa geração zero', answer: 'Módulos fotovoltaicos usam luz, não apenas sol direto. Em nuvens, a radiação difusa pode manter a produção, normalmente com potência menor e mais variável.', context: 'A queda depende da espessura e do tipo de nuvem, do horário, da orientação, da temperatura, da sujeira e do sombreamento. O dado relevante é a energia acumulada no período, não um instante isolado.', method: 'Observe a curva do monitoramento e compare dias com condições semelhantes. Se a queda persistir fora do padrão climático, investigue sujeira, falha, sombra nova, conexão e disponibilidade do inversor.', checklist: ['diferenciar nuvem de sombra fixa;', 'acompanhar kWh e não só potência instantânea;', 'considerar a série histórica local;', 'verificar alarmes e indisponibilidade;', 'limpar e inspecionar quando os dados indicarem necessidade;'], caution: 'Não é correto prometer a mesma produção em qualquer clima. O projeto deve trabalhar com estimativa e perdas, não com uma geração diária fixa.', next: 'Combine este conteúdo com a avaliação de limpeza e com a análise de vida útil para interpretar o desempenho da usina ao longo do ano.' }
  },
  'painel-solar-precisa-de-limpeza': {
    primaryKeyword: 'limpeza de painel solar', searchIntent: 'informacional-comercial', seoTitle: 'Limpeza de Painel Solar: Quando Fazer e Como', seoDescription: 'Saiba quando limpar o painel solar, como identificar perda por sujeira e quais cuidados evitam danos ao módulo, telhado e instalação elétrica.',
    keywords: ['limpeza de painel solar', 'manutenção de painel solar', 'sujeira painel fotovoltaico', 'soiling solar', 'manutenção fotovoltaica'], tags: ['Limpeza', 'Manutenção', 'Soiling', 'Energia solar'], imageAlt: 'Limpeza técnica de painéis solares em telhado com segurança de acesso', sources: ['inpe', 'nrelPv', 'nr10'], related: [['energia-solar-funciona-em-dia-nublado', 'como clima afeta a geração'], ['quanto-tempo-duram-os-paineis-solares', 'vida útil dos painéis'], ['quanto-da-para-economizar-com-energia-solar', 'impacto na economia']],
    expansion: { heading: 'A frequência de limpeza deve vir dos dados do sistema', answer: 'Não existe uma periodicidade única para todos os telhados. Poeira, fuligem, maresia, inclinação, chuva e acesso definem a velocidade de acúmulo e o risco da operação.', context: 'Antes de lavar, compare a produção com períodos equivalentes e procure depósitos aderidos, fezes de aves, sombra nova ou falhas do inversor. A perda de geração pode ter mais de uma causa.', method: 'Crie um registro com data, fotos, kWh, condições climáticas e observações de segurança. Quando houver trabalho em altura, planeje acesso, proteção coletiva e procedimento compatível com a instalação.', checklist: ['consultar manual do fabricante;', 'usar água e materiais compatíveis com o módulo;', 'não caminhar sobre os painéis;', 'verificar conexões e estrutura durante a inspeção;', 'registrar o resultado após o serviço;'], caution: 'Lavagem doméstica improvisada pode causar choque, queda, trinca, risco de infiltração ou dano ao revestimento. A chuva também não remove necessariamente todo depósito aderido.', next: 'Se a usina está produzindo menos, faça diagnóstico antes de contratar apenas uma lavagem. O relatório deve dizer o que foi verificado e o que ficou fora do escopo.' }
  },
  'quanto-tempo-duram-os-paineis-solares': {
    primaryKeyword: 'vida útil do painel solar', searchIntent: 'informacional', seoTitle: 'Vida Útil do Painel Solar: Durabilidade e Garantia', seoDescription: 'Entenda a vida útil dos painéis solares, degradação, garantias, inversor, estrutura e cuidados que influenciam a durabilidade do sistema.',
    keywords: ['vida útil do painel solar', 'durabilidade painel fotovoltaico', 'garantia painel solar', 'degradação módulo solar', 'manutenção usina solar'], tags: ['Durabilidade', 'Garantia', 'Manutenção', 'Painéis'], imageAlt: 'Detalhe de módulo fotovoltaico mostrando células solares e estrutura de proteção', sources: ['nrelPv', 'inpe'], related: [['painel-solar-precisa-de-limpeza', 'manutenção dos módulos'], ['o-que-e-inversor-solar', 'vida útil do inversor'], ['quanto-custa-instalar-energia-solar', 'escopo do sistema']],
    expansion: { heading: 'Vida útil não é o mesmo que prazo de garantia', answer: 'O painel pode continuar operando depois do prazo comercial de garantia, mas sua potência, integridade, segurança e desempenho devem ser acompanhados.', context: 'Módulos, inversores, estruturas, cabos e proteções envelhecem de formas diferentes. Garantia de produto, garantia de potência e garantia da instalação também são documentos distintos.', method: 'Guarde notas, número de série, datasheet, garantias e registros de manutenção. Compare produção medida com a esperada e investigue falhas antes de concluir que a degradação é a causa.', checklist: ['separar garantia de produto e de desempenho;', 'verificar condições de instalação e ambiente;', 'acompanhar sinais de infiltração e corrosão;', 'planejar manutenção do inversor e proteções;', 'manter documentação para eventual acionamento;'], caution: 'Números como 25 ou 30 anos são referências de projeto e garantia, não promessa de potência constante. A condição real depende do equipamento, ambiente e manutenção.', next: 'Use o artigo de limpeza para reduzir perdas operacionais e o de inversor para entender o componente que pode exigir substituição antes dos módulos.' }
  },
  'energia-solar-funciona-sem-luz': {
    primaryKeyword: 'energia solar no apagão', searchIntent: 'informacional', seoTitle: 'Energia Solar no Apagão: On-Grid e Backup', seoDescription: 'Entenda por que sistemas on-grid desligam durante apagões e o que um sistema híbrido com backup precisa ter para alimentar cargas críticas.',
    keywords: ['energia solar funciona quando falta luz', 'energia solar no apagão', 'anti-ilhamento inversor', 'backup solar', 'sistema híbrido com bateria'], tags: ['Apagão', 'Anti-ilhamento', 'Backup', 'Bateria'], imageAlt: 'Sistema solar híbrido com bateria para backup durante interrupção da rede', sources: ['aneelSolar', 'nrelPv'], related: [['diferenca-entre-energia-solar-conectada-e-isolada', 'on-grid, off-grid e híbrido'], ['precisa-de-bateria-para-energia-solar', 'quando a bateria faz sentido'], ['o-que-e-inversor-solar', 'funções do inversor']],
    expansion: { heading: 'Por que o on-grid comum desliga durante o apagão?', answer: 'O inversor conectado à rede precisa detectar a referência da distribuidora e interromper a operação quando a rede cai, evitando energização indevida do circuito externo.', context: 'Painéis continuam recebendo luz, mas isso não significa que a casa terá energia. Para manter cargas durante a interrupção, a arquitetura precisa separar cargas críticas, armazenar energia e controlar a transferência.', method: 'Defina quais equipamentos precisam continuar ligados, por quantas horas e com qual potência de partida. Depois, verifique inversor, bateria, quadro de cargas críticas, proteção e instalação.', checklist: ['listar cargas essenciais e potência de partida;', 'definir autonomia desejada;', 'verificar compatibilidade do inversor e da bateria;', 'planejar manutenção e ventilação;', 'testar o modo de backup com segurança;'], caution: 'Backup não é sinônimo de alimentar a casa inteira. Ar-condicionado, bombas e motores podem exigir potência muito maior que a carga média.', next: 'Leia o comparativo de baterias para decidir se autonomia, continuidade ou economia justificam o investimento adicional.' }
  },
  'precisa-de-bateria-para-energia-solar': {
    primaryKeyword: 'bateria para energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Bateria para Energia Solar: Quando Vale a Pena', seoDescription: 'Descubra quando a bateria é necessária em um sistema solar, como comparar backup e economia e quais custos entram na decisão.',
    keywords: ['precisa de bateria para energia solar', 'bateria solar vale a pena', 'armazenamento fotovoltaico', 'bateria de lítio solar', 'backup energia solar'], tags: ['Baterias', 'Armazenamento', 'Backup', 'Híbrido'], imageAlt: 'Banco de baterias de lítio integrado a sistema solar híbrido', sources: ['aneelSolar', 'nrelPv'], related: [['energia-solar-funciona-sem-luz', 'backup durante apagões'], ['diferenca-entre-energia-solar-conectada-e-isolada', 'arquiteturas solares'], ['quanto-custa-instalar-energia-solar', 'custo do sistema']],
    expansion: { heading: 'Bateria é uma decisão de serviço, não um acessório obrigatório', answer: 'A bateria faz sentido quando o objetivo é backup, deslocamento de consumo, redução de demanda ou operação em local sem rede. Em sistemas on-grid voltados apenas à compensação, ela pode não ser necessária.', context: 'A rede pode receber excedentes e atender o imóvel quando não há sol, conforme as regras aplicáveis. Isso é diferente de ter energia durante um apagão, pois o sistema conectado precisa respeitar a proteção de anti-ilhamento.', method: 'Compare o custo do armazenamento com o valor da continuidade desejada. Dimensione capacidade útil, potência, profundidade de descarga, ciclos, ambiente, substituição e cargas que serão priorizadas.', checklist: ['definir objetivo principal da bateria;', 'calcular energia e potência das cargas críticas;', 'verificar compatibilidade do inversor;', 'considerar vida útil, garantia e descarte;', 'incluir manutenção e segurança no orçamento;'], caution: 'Não use apenas a capacidade nominal em kWh para prometer autonomia. Temperatura, potência simultânea, reserva, perdas e envelhecimento alteram o resultado.', next: 'Se a necessidade é enfrentar apagões, siga para o artigo de backup. Se é reduzir custo, compare o armazenamento com a compensação e o autoconsumo direto.' }
  },
  'energia-solar-para-supermercados': {
    primaryKeyword: 'energia solar para supermercados', searchIntent: 'comercial', seoTitle: 'Energia Solar para Supermercados: Guia de Viabilidade', seoDescription: 'Veja como avaliar energia solar em supermercados e atacadistas considerando refrigeração, demanda, telhado, operação, segurança e retorno.',
    keywords: ['energia solar para supermercados', 'energia solar para atacadista', 'fotovoltaica no varejo alimentar', 'redução de custo supermercado', 'viabilidade solar comercial'], tags: ['Supermercados', 'Comercial', 'Demanda', 'ROI'], imageAlt: 'Sistema fotovoltaico instalado em cobertura de supermercado para consumo comercial', sources: ['aneelSolar', 'law14300', 'inpe'], related: [['energia-solar-para-hospitais', 'energia solar em cargas críticas'], ['energia-solar-para-condominios', 'gestão de áreas comuns'], ['quanto-custa-instalar-energia-solar', 'composição de orçamento']],
    expansion: { heading: 'O diagnóstico de um supermercado começa pela curva de carga', answer: 'Refrigeração, climatização, iluminação e horários de operação definem a oportunidade. A geração só reduz custo quando coincide com o consumo ou quando o excedente é tratado pelo modelo aplicável.', context: 'Telhado, estacionamento, demanda contratada, média tensão, obras, acesso de manutenção e continuidade das vendas precisam ser analisados juntos. Um projeto comercial não deve copiar o dimensionamento residencial.', method: 'Cruze faturas, memória de massa, horários de pico e áreas disponíveis. Simule produção, autoconsumo, excedente, adequações e impacto da obra sobre a operação da loja.', checklist: ['mapear cargas contínuas e críticas;', 'verificar estrutura e impermeabilização da cobertura;', 'avaliar demanda e proteção em média tensão;', 'planejar montagem por etapas sem interromper vendas;', 'modelar retorno com dados reais do grupo tarifário;'], caution: 'Não há payback universal para supermercados. O resultado depende de tarifa, demanda, perfil de consumo, contrato, acesso e condições do local.', next: 'O próximo passo é uma análise de viabilidade que entregue premissas, cenários e lista de adequações antes da proposta final.' }
  },
  'energia-solar-para-hospitais': {
    primaryKeyword: 'energia solar para hospitais', searchIntent: 'comercial', seoTitle: 'Energia Solar para Hospitais e Clínicas: Guia', seoDescription: 'Entenda como avaliar energia solar em hospitais, clínicas e laboratórios sem confundir economia, continuidade, geradores e cargas críticas.',
    keywords: ['energia solar para hospitais', 'energia solar para clínicas', 'fotovoltaica em hospital', 'cargas críticas hospitalares', 'viabilidade solar em saúde'], tags: ['Hospitais', 'Clínicas', 'Cargas críticas', 'Energia solar'], imageAlt: 'Projeto fotovoltaico avaliado para cobertura de hospital ou clínica', sources: ['aneelSolar', 'law14300', 'nr10'], related: [['energia-solar-para-supermercados', 'viabilidade comercial'], ['energia-solar-funciona-sem-luz', 'backup e apagões'], ['nr10-laudo-eletrico-empresa', 'segurança de instalações']],
    expansion: { heading: 'Economia e continuidade são estudos diferentes em saúde', answer: 'A geração fotovoltaica pode reduzir consumo da rede, mas não substitui automaticamente nobreaks, geradores, sistemas de emergência ou protocolos assistenciais.', context: 'Hospitais e clínicas têm cargas sensíveis, operação contínua, áreas técnicas e requisitos próprios de segurança. A compatibilidade deve ser estudada com a instalação existente e com o plano de contingência.', method: 'Separe cargas administrativas, climatização, diagnóstico, TI e suporte à vida. Mapeie quadros, transferências, gerador, nobreak, aterramento, proteção e janelas de manutenção.', checklist: ['validar a curva de carga e a demanda;', 'identificar cargas que não podem sofrer interrupção;', 'compatibilizar projeto com gerador e nobreak;', 'controlar acesso e segurança durante a obra;', 'documentar testes, comissionamento e operação;'], caution: 'Não é adequado prometer “energia ininterrupta” ou compatibilidade total sem projeto específico, ensaios e validação da equipe responsável pelo estabelecimento.', next: 'Leve faturas, diagramas, lista de cargas críticas e regras internas para uma avaliação multidisciplinar.' }
  },
  'energia-solar-para-condominios': {
    primaryKeyword: 'energia solar para condomínios', searchIntent: 'comercial', seoTitle: 'Energia Solar para Condomínios: Como Planejar', seoDescription: 'Saiba como avaliar energia solar para condomínios, áreas comuns, medição, assembleia, telhado, manutenção e regras de compensação.',
    keywords: ['energia solar para condomínios', 'energia solar área comum', 'sistema fotovoltaico condomínio', 'assembleia energia solar', 'medição condomínio solar'], tags: ['Condomínios', 'Áreas comuns', 'Assembleia', 'SCEE'], imageAlt: 'Sistema fotovoltaico em cobertura de condomínio para atender áreas comuns', sources: ['aneelSolar', 'law14300', 'energisa'], related: [['wallbox-em-condominio', 'wallbox em condomínio'], ['quanto-custa-instalar-energia-solar', 'orçamento solar'], ['como-funciona-a-homologacao-da-energia-solar', 'conexão à rede']],
    expansion: { heading: 'Como estruturar uma decisão solar no condomínio', answer: 'O estudo precisa separar consumo das áreas comuns, disponibilidade de cobertura, titularidade, rateio, medição, aprovação e responsabilidade pela manutenção.', context: 'Elevadores, bombas, iluminação, portões e segurança podem ter perfis diferentes. A solução precisa respeitar convenção, assembleia, regras da distribuidora, impermeabilização e acesso de manutenção.', method: 'O síndico deve reunir faturas, atas, plantas, laudos de cobertura e informações do padrão. Com isso, a engenharia consegue avaliar geração, conexão, obras, rateio e cenários de investimento.', checklist: ['definir quem será o titular e responsável;', 'analisar estrutura e impermeabilização;', 'verificar medição e destinação dos créditos;', 'registrar aprovação e escopo em ata/contrato;', 'planejar acesso, limpeza e manutenção;'], caution: '“Zerar a conta” é uma simplificação comercial. Existem componentes de cobrança e custos de operação que precisam ser apresentados à assembleia.', next: 'Use uma apresentação com premissas, riscos, responsabilidades e três cenários. A transparência facilita a decisão e reduz conflitos depois da instalação.' }
  },
  'energia-solar-para-fazendas': {
    primaryKeyword: 'energia solar para fazendas', searchIntent: 'comercial', seoTitle: 'Energia Solar para Fazendas: Irrigação e Viabilidade', seoDescription: 'Veja como planejar energia solar para fazendas, irrigação, bombeamento e galpões considerando distância, sazonalidade, proteção e financiamento.',
    keywords: ['energia solar para fazendas', 'energia solar para irrigação', 'bombeamento solar', 'sistema fotovoltaico rural', 'energia solar no sertão'], tags: ['Agronegócio', 'Irrigação', 'Bombeamento', 'Rural'], imageAlt: 'Sistema fotovoltaico rural alimentando bombeamento e irrigação em uma fazenda', sources: ['inpe', 'aneelSolar', 'law14300'], related: [['energia-solar-vale-a-pena-no-nordeste', 'viabilidade no Nordeste'], ['precisa-de-bateria-para-energia-solar', 'armazenamento e autonomia'], ['quanto-custa-instalar-energia-solar', 'composição de custos']],
    expansion: { heading: 'No campo, a carga e a distância mudam o projeto', answer: 'Irrigação, bombeamento, ordenha, refrigeração e galpões têm horários, partidas de motor e distâncias diferentes. O sistema deve ser dimensionado para a operação real.', context: 'A análise rural também inclui poeira, calor, acesso, segurança, descargas atmosféricas, rede disponível e possibilidade de expansão. O melhor local para os módulos nem sempre é o mais próximo da carga.', method: 'Levante potência de motores, horas de funcionamento, sazonalidade, distância e método de partida. Depois compare conexão à rede, sistema isolado, híbrido e eventual armazenamento.', checklist: ['mapear bombas, motores e correntes de partida;', 'avaliar queda de tensão e extensão da rede;', 'proteger estruturas e quadros no ambiente rural;', 'considerar manutenção e acesso à propriedade;', 'validar financiamento e documentação aplicáveis;'], caution: 'Irradiação favorável não garante água, pressão ou produção agrícola. O projeto elétrico precisa conversar com hidráulica, automação e operação.', next: 'Reúna dados de safra, bombeamento e faturas para que a simulação seja baseada na rotina da fazenda, não em uma média genérica.' }
  },
  'como-escolher-uma-empresa-de-energia-solar': {
    primaryKeyword: 'como escolher empresa de energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Como Escolher Empresa de Energia Solar na PB', seoDescription: 'Confira como comparar uma empresa de energia solar na Paraíba por projeto, escopo, ART, homologação, contrato, garantias e pós-venda.',
    keywords: ['como escolher empresa de energia solar', 'empresa de energia solar Paraíba', 'integradora solar', 'proposta fotovoltaica', 'contratar energia solar'], tags: ['Contratação', 'Proposta', 'ART', 'Pós-venda'], imageAlt: 'Engenheira analisando projeto e proposta de energia solar com o cliente', sources: ['aneelSolar', 'energisa', 'nr10'], related: [['erros-ao-contratar-energia-solar', 'erros comuns na contratação'], ['quanto-custa-instalar-energia-solar', 'como comparar preços'], ['como-funciona-a-homologacao-da-energia-solar', 'homologação']],
    expansion: { heading: 'Checklist de diligência antes de assinar', answer: 'A melhor empresa é a que deixa claro o que diagnostica, projeta, instala, documenta, homologa e atende depois da entrega. Registro e portfólio ajudam, mas não substituem um contrato completo.', context: 'Compare propostas na mesma base: potência, produção estimada, marcas, proteções, estrutura, projeto, ART, homologação, cronograma, garantias, manutenção e exclusões.', method: 'Faça perguntas que um vendedor genérico não consegue responder: quais premissas foram usadas, quem assina, como são feitos os testes, o que acontece com pendências e quem atende a garantia.', checklist: ['confirmar identidade e endereço da empresa;', 'pedir proposta técnica e comercial separadas;', 'verificar referências reais e documentação;', 'ler condições de garantia, prazo e rescisão;', 'guardar protocolo, notas e registros da entrega;'], caution: 'Nenhuma integradora pode garantir economia, aprovação ou ausência de manutenção sem conhecer o imóvel e as regras aplicáveis. Evite urgência artificial e promessas de retorno fixo.', next: 'Use este checklist junto ao artigo de erros. A decisão fica mais segura quando você consegue comprovar o que foi prometido.' }
  },
  'como-funciona-a-homologacao-da-energia-solar': {
    primaryKeyword: 'homologação de energia solar', searchIntent: 'informacional-comercial', seoTitle: 'Homologação de Energia Solar: Etapas e Documentos', seoDescription: 'Entenda como funciona a homologação de energia solar, quais documentos podem ser pedidos e por que prazos dependem da distribuidora e do caso.',
    keywords: ['homologação de energia solar', 'homologação solar Energisa', 'documentos geração distribuída', 'parecer de acesso', 'vistoria conexão solar'], tags: ['Homologação', 'Energisa', 'ANEEL', 'Documentos'], imageAlt: 'Documentação e medidor bidirecional em processo de conexão de geração solar', sources: ['aneelSolar', 'energisa', 'energisaNormas', 'law14300'], related: [['documentos-para-instalar-energia-solar', 'documentos do acesso'], ['quanto-custa-instalar-energia-solar', 'escopo do orçamento'], ['como-escolher-uma-empresa-de-energia-solar', 'escolha da integradora']],
    expansion: { heading: 'Homologação é um processo de conexão, não um carimbo genérico', answer: 'A distribuidora analisa uma solicitação de acesso, a documentação e as condições técnicas da conexão conforme o tipo de unidade e a norma vigente.', context: 'Projeto, orçamento, execução, vistoria, medição e início da operação podem envolver etapas e responsabilidades diferentes. A distribuidora e o titular devem seguir os formulários e canais atuais.', method: 'Confira a norma da concessionária no momento do protocolo. Organize a conta, documentos do titular, projeto, responsabilidade técnica, fichas dos equipamentos e registros da instalação.', checklist: ['identificar a distribuidora e a norma técnica vigente;', 'usar o formulário e canal oficiais;', 'conferir coerência entre projeto e instalação;', 'guardar protocolos, pareceres e pendências;', 'não energizar o sistema fora do procedimento autorizado;'], caution: 'Prazos, documentos, custos de adequação e necessidade de obras não devem ser apresentados como universais. Pendência ou mudança de norma pode alterar o cronograma.', next: 'Antes de contratar, peça um cronograma com responsável por cada etapa e uma regra clara para tratamento de pendências.' }
  },
  'erros-ao-contratar-energia-solar': {
    primaryKeyword: 'erros ao contratar energia solar', searchIntent: 'informacional-comercial', seoTitle: 'Erros ao Contratar Energia Solar: Checklist', seoDescription: 'Evite erros ao contratar energia solar: compare proposta, projeto, proteções, homologação, contrato, garantias e suporte pós-venda.',
    keywords: ['erros ao contratar energia solar', 'contratar empresa solar', 'golpes energia solar', 'proposta fotovoltaica', 'garantia instalação solar'], tags: ['Contratação', 'Segurança', 'Proposta', 'Garantia'], imageAlt: 'Checklist de inspeção de proposta e instalação de energia solar', sources: ['aneelSolar', 'energisa', 'nr10'], related: [['como-escolher-uma-empresa-de-energia-solar', 'como escolher a empresa'], ['quanto-custa-instalar-energia-solar', 'como ler o orçamento'], ['documentos-para-instalar-energia-solar', 'documentos necessários']],
    expansion: { heading: 'Como transformar alerta em verificação objetiva', answer: 'O erro mais caro é contratar sem saber o que será entregue. Cada promessa deve virar um item verificável na proposta, no contrato ou no documento de comissionamento.', context: 'Preço baixo pode refletir escopo menor, mas preço alto também não prova qualidade. A comparação precisa considerar projeto, proteções, estrutura, responsabilidade técnica, conexão, testes e pós-venda.', method: 'Faça uma tabela com “incluído”, “não incluído”, “condicional” e “responsável”. Peça que a empresa explique qualquer estimativa de geração, economia ou prazo.', checklist: ['validar marca e modelo dos equipamentos;', 'confirmar proteção e dimensionamento;', 'ler garantias e exclusões;', 'registrar quem trata pendências da distribuidora;', 'guardar notas, fotos, protocolos e testes;'], caution: 'Não generalize que toda empresa pequena é ruim ou que toda empresa grande é segura. O critério é a evidência do escopo, da competência e do suporte.', next: 'Se você já recebeu uma proposta, use este artigo como roteiro de perguntas antes de comparar o valor final.' }
  },
  'documentos-para-instalar-energia-solar': {
    primaryKeyword: 'documentos para instalar energia solar', searchIntent: 'informacional', seoTitle: 'Documentos para Instalar Energia Solar: Checklist', seoDescription: 'Confira os documentos normalmente usados para instalar energia solar, protocolar a conexão e organizar financiamento, com ressalvas por distribuidora.',
    keywords: ['documentos para instalar energia solar', 'documentos homologação solar', 'conta de luz energia solar', 'ART projeto fotovoltaico', 'documentação financiamento solar'], tags: ['Documentos', 'Homologação', 'ART', 'Financiamento'], imageAlt: 'Checklist de documentos para projeto e instalação de energia solar', sources: ['aneelSolar', 'energisa', 'law14300'], related: [['como-funciona-a-homologacao-da-energia-solar', 'etapas de homologação'], ['como-escolher-uma-empresa-de-energia-solar', 'contratação segura'], ['quanto-custa-instalar-energia-solar', 'escopo do orçamento']],
    expansion: { heading: 'Organize os documentos por finalidade', answer: 'A documentação costuma se dividir em dados do titular e da unidade consumidora, documentos do imóvel, projeto e responsabilidade técnica, além de exigências específicas de crédito.', context: 'A lista exata varia por distribuidora, tipo de conexão, titularidade, imóvel alugado, pessoa jurídica e modelo de financiamento. Use o checklist como preparação, não como lista universal.', method: 'Comece pela fatura completa e identifique UC, titular, classe e histórico. Depois confirme com a distribuidora e com o agente financeiro o que precisa ser atualizado, assinado ou autenticado.', checklist: ['fatura recente e dados da unidade consumidora;', 'documentos do titular ou representante;', 'autorização do proprietário quando aplicável;', 'projeto e responsabilidade técnica;', 'contrato, orçamento e documentos de crédito;'], caution: 'Não envie documentos sensíveis por canais desconhecidos. Também não presuma que a ART substitui autorização do proprietário ou aprovação do acesso.', next: 'Peça à integradora um checklist datado, com responsável, status e próxima ação para cada documento.' }
  },
  'como-escolher-instalador-wallbox': {
    primaryKeyword: 'instalador de wallbox', searchIntent: 'comercial-investigação', seoTitle: 'Como Escolher um Instalador de Wallbox', seoDescription: 'Veja como avaliar um instalador de Wallbox por diagnóstico, projeto, proteção, testes, responsabilidade técnica, garantia e entrega documentada.',
    keywords: ['instalador de wallbox', 'como escolher instalador wallbox', 'instalação carregador veicular', 'ART wallbox', 'engenharia para wallbox'], tags: ['Wallbox', 'Instalação', 'ART', 'Segurança'], imageAlt: 'Instalador avaliando quadro elétrico e rota de cabos para Wallbox', sources: ['abnt17019', 'aneelEv', 'nr10'], related: [['quadro-eletrico-wallbox', 'capacidade do quadro'], ['cuidados-seguranca-carregador-veicular', 'segurança na recarga'], ['quanto-custa-instalar-wallbox', 'composição do orçamento']],
    expansion: { heading: 'O que um instalador profissional precisa demonstrar', answer: 'O profissional deve mostrar como vai avaliar a carga, dimensionar o circuito, selecionar proteção, executar a rota, testar e entregar o sistema conforme o equipamento e o local.', context: 'Registro profissional, ART ou TRT, normas aplicáveis e exigências do condomínio dependem do escopo e da competência legal. O ponto central é a responsabilidade documentada e a instalação verificável.', method: 'Peça vistoria antes do preço fechado. A proposta deve registrar tensão, potência, distância, método de instalação, proteções, testes, acabamento, documentação e limites.', checklist: ['verificar experiência com a potência do carregador;', 'pedir memorial ou justificativa de dimensionamento;', 'confirmar proteção diferencial compatível;', 'exigir testes e orientação de uso;', 'ler garantia da instalação e do equipamento;'], caution: 'A presença de um engenheiro no anúncio não prova que ele analisou sua instalação. Também não é correto afirmar que qualquer ausência de ART cancela automaticamente garantia ou seguro.', next: 'Use o guia de quadro elétrico antes de aprovar o orçamento e confirme o que será medido na vistoria.' }
  },
  'cuidados-seguranca-carregador-veicular': {
    primaryKeyword: 'segurança no carregamento de carro elétrico', searchIntent: 'informacional', seoTitle: 'Segurança no Carregamento de Carro Elétrico', seoDescription: 'Conheça cuidados de segurança na recarga de carro elétrico: circuito, proteção, aquecimento, tomada, Wallbox e manutenção.',
    keywords: ['segurança ao carregar carro elétrico', 'segurança Wallbox', 'DR carregador veicular', 'risco de aquecimento tomada', 'proteção carregador elétrico'], tags: ['Segurança', 'Carro elétrico', 'Wallbox', 'Proteção'], imageAlt: 'Circuito protegido para recarga segura de veículo elétrico em garagem', sources: ['abnt17019', 'aneelEv', 'nr10'], related: [['wallbox-ou-tomada-comum', 'Wallbox ou tomada'], ['quadro-eletrico-wallbox', 'avaliação do quadro'], ['como-escolher-instalador-wallbox', 'instalador qualificado']],
    expansion: { heading: 'Segurança começa antes de conectar o veículo', answer: 'Recarga prolongada exige circuito, conexão, proteção, ambiente e equipamento compatíveis. O risco cresce quando a instalação é improvisada ou usada fora das instruções.', context: 'A corrente nominal do carregador não é o único fator. Estado de tomadas, aperto de bornes, seção do condutor, queda de tensão, proteção diferencial, aterramento, ventilação e rota de cabos também importam.', method: 'Pare a recarga se houver aquecimento anormal, cheiro, ruído, desarme frequente ou dano no cabo. Não aumente disjuntor nem use extensão para esconder falta de capacidade.', checklist: ['usar circuito dimensionado para o carregador;', 'manter conectores limpos e íntegros;', 'não cobrir ventilação do equipamento;', 'inspecionar sinais de calor e umidade;', 'seguir manual e manutenção indicada;'], caution: 'O tipo de DR, DPS e demais proteções deve ser definido conforme a arquitetura, o fabricante e a norma aplicável. Não há uma lista única que substitua o projeto.', next: 'Se a recarga é diária, trate o ponto como instalação elétrica dedicada e peça avaliação antes de alterar o quadro.' }
  },
  'quadro-eletrico-wallbox': {
    primaryKeyword: 'quadro elétrico para wallbox', searchIntent: 'informacional-comercial', seoTitle: 'Quadro Elétrico para Wallbox: Como Avaliar', seoDescription: 'Saiba como verificar se o quadro elétrico suporta um Wallbox, considerando demanda, disjuntor, cabos, proteções, fases e aumento de carga.',
    keywords: ['quadro elétrico para wallbox', 'capacidade do disjuntor para wallbox', 'aumento de carga wallbox', 'bitola cabo carregador', 'avaliação elétrica wallbox'], tags: ['Quadro elétrico', 'Wallbox', 'Carga', 'Disjuntor'], imageAlt: 'Quadro de distribuição avaliado para circuito dedicado de carregador veicular', sources: ['abnt17019', 'aneelEv', 'energisaNormas'], related: [['qual-potencia-wallbox-escolher', 'escolha da potência'], ['quanto-custa-instalar-wallbox', 'custo da infraestrutura'], ['cuidados-seguranca-carregador-veicular', 'proteções e segurança']],
    expansion: { heading: 'Como saber se o quadro suporta um Wallbox', answer: 'É preciso comparar a corrente do carregador com a capacidade do padrão, do alimentador, do quadro e das demais cargas no mesmo período. O disjuntor geral sozinho não responde à pergunta.', context: 'Cabo, barramento, conexões, queda de tensão, fases, aterramento, espaço físico e seletividade também podem exigir adequação. Em condomínios, a rota e o ponto de medição entram no estudo.', method: 'Faça levantamento com o circuito desenergizado por profissional habilitado e, quando necessário, medições sob carga. Só depois defina bitola, disjuntor, proteção diferencial e eventual aumento de carga.', checklist: ['identificar tensão e número de fases;', 'somar cargas simultâneas relevantes;', 'avaliar distância e método de instalação;', 'verificar aquecimento e estado das conexões;', 'confirmar exigências da distribuidora ou condomínio;'], caution: 'Trocar o disjuntor por um de maior corrente sem estudar os condutores pode criar risco. A potência anunciada do Wallbox também não garante que o veículo ou a rede aceitarão essa carga.', next: 'Leve foto do quadro, dados do carro, modelo do carregador e distância até a vaga para a vistoria técnica.' }
  },
  'qual-potencia-wallbox-escolher': {
    primaryKeyword: 'qual potência de wallbox escolher', searchIntent: 'comercial-investigação', seoTitle: 'Qual Potência de Wallbox Escolher? 7,4, 11 ou 22 kW', seoDescription: 'Compare Wallbox de 7,4 kW, 11 kW e 22 kW pelo carregador interno do carro, fases, tempo, quadro, segurança e custo da instalação.',
    keywords: ['qual potência de wallbox escolher', 'Wallbox 7,4 kW 11 kW 22 kW', 'tempo de recarga', 'carregador veicular residencial', 'OBC carro elétrico'], tags: ['Potência', 'Wallbox', 'Recarga', 'OBC'], imageAlt: 'Comparação de carregadores Wallbox de diferentes potências para veículos elétricos', sources: ['abnt17019', 'aneelEv'], related: [['quadro-eletrico-wallbox', 'capacidade da instalação'], ['wallbox-ou-tomada-comum', 'modo de recarga'], ['quanto-custa-instalar-wallbox', 'impacto no orçamento']],
    expansion: { heading: 'A maior potência nem sempre é a melhor escolha', answer: 'A potência útil depende do carregador interno do veículo, da tensão e fases disponíveis, da rotina de uso e da capacidade do imóvel. Um Wallbox maior pode não reduzir o tempo se o carro limitar a entrada.', context: 'Também existe diferença entre potência nominal e potência efetiva. Temperatura, estado da bateria, curva de carregamento e gerenciamento de carga alteram a velocidade ao longo da sessão.', method: 'Consulte o manual do veículo e do carregador. Depois compare a energia que precisa repor por dia com a janela de estacionamento e com a capacidade elétrica disponível.', checklist: ['confirmar potência AC aceita pelo veículo;', 'verificar tensão e fases do imóvel;', 'calcular energia diária necessária;', 'considerar balanceamento e cargas simultâneas;', 'comparar custo da potência extra com o benefício real;'], caution: '7,4, 11 e 22 kW não são níveis intercambiáveis em todos os imóveis. Não aumente a potência sem revisar quadro, condutores, proteção e padrão.', next: 'Defina primeiro a rotina de recarga e, só depois, escolha o equipamento e dimensione a infraestrutura.' }
  },
  'quanto-custa-instalar-wallbox': {
    primaryKeyword: 'quanto custa instalar wallbox', searchIntent: 'comercial', seoTitle: 'Quanto Custa Instalar Wallbox? Guia do Orçamento', seoDescription: 'Entenda o que compõe o custo de instalar Wallbox: potência, distância, quadro, proteções, rota de cabos, condomínio e testes.',
    keywords: ['quanto custa instalar wallbox', 'preço instalação carregador veicular', 'custo infraestrutura wallbox', 'orçamento wallbox', 'instalação wallbox residencial'], tags: ['Preço', 'Wallbox', 'Orçamento', 'Infraestrutura'], imageAlt: 'Vistoria para orçamento de instalação de Wallbox em garagem residencial', sources: ['abnt17019', 'aneelEv', 'nr10'], related: [['quadro-eletrico-wallbox', 'avaliação do quadro'], ['qual-potencia-wallbox-escolher', 'potência do carregador'], ['wallbox-em-condominio', 'custos em condomínio']],
    expansion: { heading: 'O que precisa aparecer no orçamento de Wallbox', answer: 'O preço depende da distância, potência, fases, rota, proteções, quadro, acabamento, medição, documentação e condições do imóvel. Sem vistoria, a faixa é apenas preliminar.', context: 'O aparelho pode ser comprado separadamente da infraestrutura. Um orçamento confiável separa equipamento, materiais, mão de obra, projeto, testes, adequações e itens condicionais.', method: 'Peça um memorial simples com metros de cabo, método de instalação, seção dos condutores, proteção, quadro, pontos de fixação, acabamento e o que ocorrerá se o padrão não suportar a carga.', checklist: ['informar se o carregador está incluído;', 'separar rota e materiais por item;', 'descrever testes e entrega técnica;', 'considerar condomínio, obra civil e acesso;', 'deixar prazo e garantia por escrito;'], caution: 'Valores de referência não são preço final e não devem ser usados como promessa para qualquer cidade. Segurança não deve ser removida para atingir um orçamento menor.', next: 'Use este roteiro com uma vistoria e compare propostas pelo escopo completo, não pelo menor valor isolado.' }
  },
  'wallbox-com-energia-solar': {
    primaryKeyword: 'wallbox com energia solar', searchIntent: 'comercial-investigação', seoTitle: 'Wallbox com Energia Solar: Como Integrar', seoDescription: 'Veja como integrar Wallbox e energia solar, estimar consumo do carro, separar recarga da rede e dimensionar geração e infraestrutura.',
    keywords: ['wallbox com energia solar', 'carregar carro com energia solar', 'energia solar para carro elétrico', 'quantas placas para carro elétrico', 'fotovoltaico e mobilidade elétrica'], tags: ['Wallbox', 'Solar', 'Carro elétrico', 'Autoconsumo'], imageAlt: 'Wallbox conectado a sistema fotovoltaico em residência', sources: ['aneelSolar', 'aneelEv', 'nrelPv'], related: [['quanto-custa-instalar-wallbox', 'custo da instalação'], ['qual-potencia-wallbox-escolher', 'potência de recarga'], ['o-que-e-energia-solar-fotovoltaica', 'como funciona o sistema solar']],
    expansion: { heading: 'Como dimensionar a integração sem prometer “recarga grátis”', answer: 'O carro aumenta o consumo do imóvel. A energia solar pode atender parte desse consumo diretamente durante o dia ou compensá-lo conforme a arquitetura e as regras aplicáveis.', context: 'O cálculo deve partir de quilômetros, consumo do veículo, frequência de recarga, horário de estacionamento e tarifa. A geração adicional precisa caber no telhado e no padrão elétrico.', method: 'Estime kWh por mês do carro e some ao histórico da casa. Depois compare autoconsumo diurno, recarga programada, geração excedente, potência do Wallbox e limites da conexão.', checklist: ['usar consumo real do veículo em kWh/100 km;', 'separar recarga diurna e noturna;', 'verificar capacidade do inversor e do quadro;', 'considerar expansão e gerenciamento de carga;', 'recalcular economia com tarifas e regras vigentes;'], caution: 'A integração não elimina perdas, custos fixos ou necessidade de rede. Número de painéis e economia dependem de local, veículo, uso e projeto.', next: 'Faça primeiro a avaliação do Wallbox e depois incorpore o consumo do veículo ao estudo fotovoltaico.' }
  },
  'wallbox-em-condominio': {
    primaryKeyword: 'wallbox em condomínio', searchIntent: 'informacional-comercial', seoTitle: 'Wallbox em Condomínio: Regras e Medição', seoDescription: 'Entenda como planejar Wallbox em condomínio, com aprovação, rota de cabos, medição, demanda, segurança, responsabilidade e documentação.',
    keywords: ['wallbox em condomínio', 'instalar carregador em condomínio', 'medição Wallbox', 'regras para carro elétrico', 'projeto Wallbox condomínio'], tags: ['Condomínio', 'Wallbox', 'Medição', 'Aprovação'], imageAlt: 'Infraestrutura de recarga Wallbox em garagem de condomínio', sources: ['abnt17019', 'aneelEv', 'nr10'], related: [['quadro-eletrico-wallbox', 'estudo de capacidade'], ['quanto-custa-instalar-wallbox', 'composição do custo'], ['como-escolher-instalador-wallbox', 'critérios do instalador']],
    expansion: { heading: 'Como preparar um pedido de Wallbox para o condomínio', answer: 'O pedido precisa mostrar de onde virá a energia, como será a medição, por onde passarão os cabos, quais proteções serão usadas e quem responde pela obra e pela manutenção.', context: 'Síndico e assembleia podem precisar avaliar fachada, garagem, rotas de fuga, carga do edifício, padrão, rateio e regras internas. O projeto deve conversar com a administração e com o Corpo de Bombeiros quando aplicável.', method: 'Apresente planta da vaga, rota, diagrama, carga, equipamento, proteção, medição e plano de emergência. Separe obras comuns de custos do usuário solicitante.', checklist: ['definir fonte de energia e titularidade;', 'avaliar transformador, quadro e demanda;', 'verificar passagem, selagem e resistência ao fogo;', 'definir medição e rateio;', 'registrar aprovação e responsabilidade;'], caution: 'Não há um modelo único de instalação para todos os condomínios. Regras estaduais, convenção, distribuidora e características do prédio podem alterar o projeto.', next: 'Leve uma proposta técnica curta à administração antes de comprar o carregador. A decisão fica mais rápida quando o condomínio recebe evidência e não só um pedido informal.' }
  },
  'wallbox-ou-tomada-comum': {
    primaryKeyword: 'wallbox ou tomada comum', searchIntent: 'comercial-investigação', seoTitle: 'Wallbox ou Tomada Comum: Qual Escolher?', seoDescription: 'Compare Wallbox e tomada comum para recarregar carro elétrico por segurança, tempo, circuito, potência, proteção e frequência de uso.',
    keywords: ['Wallbox ou tomada comum', 'carregar carro em tomada comum', 'tomada para carro elétrico', 'carregador portátil', 'Modo 2 e Modo 3'], tags: ['Wallbox', 'Tomada', 'Recarga', 'Segurança'], imageAlt: 'Comparação entre carregador Wallbox dedicado e tomada convencional para carro elétrico', sources: ['abnt17019', 'aneelEv', 'nr10'], related: [['cuidados-seguranca-carregador-veicular', 'cuidados de segurança'], ['qual-potencia-wallbox-escolher', 'potência de recarga'], ['quanto-custa-instalar-wallbox', 'custo da infraestrutura']],
    expansion: { heading: 'Tomada comum pode ser emergência; Wallbox é infraestrutura dedicada', answer: 'Uma tomada adequada, em circuito compatível e conforme o manual do carregador, pode atender usos pontuais. Para recarga frequente, o Wallbox oferece controle e infraestrutura projetada para essa finalidade.', context: 'O risco não está apenas na tomada, mas no conjunto: plugue, borne, condutor, disjuntor, aterramento, proteção, ambiente e duração da corrente. Instalações antigas merecem vistoria.', method: 'Confira a corrente de carga, o circuito exclusivo, o estado da tomada e os sinais de aquecimento. Nunca use extensão ou adaptador para compensar uma instalação sem capacidade.', checklist: ['seguir a corrente indicada pelo fabricante;', 'não compartilhar circuito com cargas pesadas;', 'inspecionar aquecimento e escurecimento;', 'proteger o cabo contra água e dano mecânico;', 'planejar solução dedicada para uso diário;'], caution: 'Não é correto dizer que toda tomada comum é proibida ou que todo Wallbox é seguro sem projeto. A decisão depende do equipamento, da instalação e do padrão de uso.', next: 'Se o veículo será carregado diariamente em casa, peça uma avaliação do quadro e da rota antes de escolher entre as duas opções.' }
  }
};

const legacyRedirects = {
  'quanto-custa-energia-solar-2026': 'quanto-custa-instalar-energia-solar',
  'payback-painel-solar-simulacao': 'em-quanto-tempo-a-energia-solar-se-paga'
};

const deepening = {
  'spda-para-raios-obrigatorio': {
    heading: 'Como ler uma proposta de SPDA sem confundir escopos',
    paragraphs: [
      'Uma proposta de SPDA deve dizer se começa por levantamento, avaliação de risco, projeto, instalação, adequação, inspeção ou emissão de relatório. Esses serviços se relacionam, mas não são equivalentes. Um relatório visual não confirma aquilo que exigiria ensaio, acesso a eletrodos ou verificação de continuidade.',
      'Também é importante saber qual edificação está sendo analisada e quais áreas ficaram fora da visita. Cobertura, fachada, subsolo, casa de máquinas, estruturas metálicas, antenas e quadros podem alterar o diagnóstico. O documento final precisa permitir que outra pessoa entenda o que foi observado e o que ainda depende de confirmação.',
      'Em regiões litorâneas ou ambientes agressivos, corrosão e fixação merecem atenção. No interior, poeira, reformas e ampliações também podem mudar o sistema. O contexto local ajuda a definir a inspeção, mas não substitui a avaliação prevista na norma e no escopo profissional.'
    ],
    checklist: ['pedir planta, croqui ou registro equivalente do sistema;', 'identificar pontos inacessíveis e limitações da visita;', 'separar recomendação de adequação de serviço já executado;', 'conferir identificação e responsabilidade técnica do documento;'],
    note: 'A decisão técnica deve ser rastreável: condição encontrada, referência adotada, evidência, risco e recomendação. Isso é mais útil do que apenas declarar que o prédio “tem” ou “não tem” para-raios.'
  },
  'nr10-laudo-eletrico-empresa': {
    heading: 'Como usar o laudo NR-10 em um plano de ação',
    paragraphs: [
      'O valor do laudo está em transformar achados técnicos em prioridades operacionais. Um quadro sem identificação, por exemplo, pode exigir uma correção documental e uma intervenção física diferente de um cabo aquecido ou de uma proteção incompatível. A empresa precisa saber o que deve ser isolado, corrigido, projetado ou apenas acompanhado.',
      'A avaliação também deve conversar com a rotina de manutenção. Diagramas, ordens de serviço, bloqueio e etiquetagem, autorização de trabalhadores, treinamentos e registros de inspeção não podem ficar separados da instalação que descrevem. Quando os documentos não refletem o local, o risco de decisão errada aumenta.',
      'Para auditorias, seguros e contratos, registre a data, o responsável, os instrumentos usados, os pontos visitados e os limites do trabalho. Uma atualização posterior deve deixar claro o que mudou e quais pendências foram encerradas.'
    ],
    checklist: ['classificar riscos por gravidade e urgência;', 'atribuir responsável e prazo para cada ação;', 'bloquear uso de equipamento quando houver risco imediato;', 'atualizar desenhos e procedimentos após a correção;'],
    note: 'Um laudo não deve ser usado como certificado permanente. A instalação muda com carga, layout, manutenção e intervenções; por isso, a gestão precisa prever revisão quando houver alteração relevante.'
  },
  'automacao-industrial-nordeste': {
    heading: 'Arquitetura de automação: do sensor ao indicador',
    paragraphs: [
      'Um projeto de automação robusto começa na camada de campo: sensores, atuadores, motores, válvulas e instrumentos precisam fornecer sinais confiáveis. O CLP ou controlador executa a lógica e o supervisório apresenta estados, alarmes, tendências e históricos. Se a medição de origem for ruim, a tela apenas dará uma aparência digital ao problema.',
      'A rede industrial deve ser planejada com endereçamento, redundância quando necessária, controle de acesso, cópia de segurança e procedimento para falha de comunicação. Também é preciso decidir quais funções permanecem locais para que uma queda de rede não cause uma parada insegura.',
      'A implantação por etapas reduz risco. Primeiro mede-se a situação atual; depois automatiza-se um gargalo; por fim, valida-se o indicador e documenta-se a mudança. O treinamento da manutenção deve fazer parte do escopo, assim como a entrega de programas, diagramas e backups.'
    ],
    checklist: ['mapear sinais e instrumentos existentes;', 'definir alarmes acionáveis e não apenas mensagens;', 'documentar rede, endereços e permissões;', 'testar falhas de sensor, energia e comunicação;'],
    note: 'A meta não é instalar o maior número de tecnologias, e sim tornar o processo mais previsível, seguro e mensurável. Um pequeno retrofit bem documentado pode gerar mais valor do que uma plataforma ampla sem rotina de uso.'
  },
  'clp-vs-reles-paineis': {
    heading: 'Custo total e manutenção na escolha entre CLP e relés',
    paragraphs: [
      'Em um painel com relés, cada mudança de sequência costuma exigir alteração física de fiação, contatos e identificação. Isso pode ser simples quando a lógica é curta e raramente muda. À medida que crescem as intertravagens, os temporizadores e as exceções, localizar uma falha pode consumir mais tempo e exigir leitura detalhada do circuito.',
      'No CLP, a lógica é programável, mas a solução passa a depender de software, backups, versão do programa, diagnóstico e profissional capaz de interpretar o código. A economia de espaço e a flexibilidade só aparecem quando a documentação e a manutenção foram previstas desde o projeto.',
      'A decisão deve considerar o ciclo de vida. Compare disponibilidade de peças, parada anual, horas de engenharia, treinamento, expansão, ambiente do painel e consequências de falha. Para processos críticos, inclua análise de risco e modo seguro de parada.'
    ],
    checklist: ['desenhar a lógica e as exceções do processo;', 'estimar horas de manutenção e parada;', 'definir padrão de programação e documentação;', 'reservar peças e plano de recuperação;'],
    note: 'A comparação técnica deve terminar com uma recomendação explicada. “CLP é moderno” e “relé é mais barato” são atalhos que não substituem o diagnóstico do processo.'
  },
  'quanto-da-para-economizar-com-energia-solar': {
    heading: 'Como montar uma simulação de economia que possa ser conferida',
    paragraphs: [
      'Uma boa simulação começa com o histórico de consumo em kWh. O valor em reais muda com tarifa, impostos, bandeiras e cobranças locais; por isso, usar apenas a conta de um mês pode distorcer o dimensionamento. Quando possível, observe doze meses e marque mudanças de rotina.',
      'Depois, separe geração estimada, consumo no mesmo instante, energia enviada à rede e créditos. A economia bruta não é igual à economia líquida: manutenção, disponibilidade, iluminação pública, regras de compensação e custos financeiros precisam aparecer como linhas próprias.',
      'O relatório deve mostrar pelo menos três cenários: produção esperada, produção menor e consumo maior. Assim, o cliente entende o intervalo de resultado e consegue decidir se o investimento continua fazendo sentido quando a realidade não coincide com a média.'
    ],
    checklist: ['guardar as faturas que sustentaram a projeção;', 'explicar todas as cobranças mantidas;', 'mostrar as premissas de geração e perdas;', 'recalcular após mudança de tarifa ou consumo;'],
    note: 'Uma simulação transparente pode apresentar uma economia menor que a propaganda e ainda ser uma decisão melhor, porque permite comparar risco, investimento e retorno de forma honesta.'
  },
  'energia-solar-vale-a-pena-no-nordeste': {
    heading: 'Quais variáveis mudam a viabilidade no Nordeste',
    paragraphs: [
      'A disponibilidade de sol é apenas uma parte da equação. Temperatura do módulo, orientação, sombras, perdas, limpeza, disponibilidade do inversor e qualidade da instalação também alteram a energia entregue. O Atlas Solar ajuda a entender o recurso regional, mas não substitui a medição e a simulação do imóvel.',
      'O consumo local é igualmente importante. Comércio diurno pode aproveitar mais energia no momento da geração; residência com maior consumo à noite depende mais da rede e das regras de compensação. Empresas em média tensão ainda precisam considerar demanda e estrutura tarifária.',
      'Por isso, a análise deve comparar investimento, economia líquida, financiamento e risco de execução. O resultado pode ser positivo em dois imóveis próximos e diferente em função de telhado, sombra, tarifa ou rotina.'
    ],
    checklist: ['usar dados de irradiação como referência, não garantia;', 'separar consumo diurno e noturno;', 'incluir custos de adequação e manutenção;', 'apresentar cenário conservador e sensibilidade;'],
    note: '“Nordeste é melhor” é uma premissa de recurso solar, não uma conclusão financeira automática. A conclusão só aparece depois do estudo do endereço e do consumo.'
  },
  'energia-solar-funciona-em-dia-nublado': {
    heading: 'Como diagnosticar queda de geração em dias nublados',
    paragraphs: [
      'A comparação correta é entre períodos semelhantes. Um dia com nuvem espessa, chuva e temperatura diferente não deve ser comparado a um dia de céu aberto apenas pela potência instantânea. Avalie kWh, horas de sol, temperatura, sombras e disponibilidade do sistema.',
      'O monitoramento pode indicar queda de uma string, falha de comunicação ou desligamento do inversor. Antes de atribuir tudo ao clima, veja alarmes, tensão, histórico e alterações no entorno. Uma árvore que cresceu ou uma nova construção pode reduzir a produção em horários específicos.',
      'A limpeza também deve ser decidida por evidência. Poeira aderida, excrementos e resíduos podem reduzir a passagem de luz, mas lavar não corrige falha elétrica, sombreamento permanente ou mau contato.'
    ],
    checklist: ['comparar energia acumulada e não somente potência;', 'verificar alarmes e disponibilidade do inversor;', 'observar sombras novas em diferentes horários;', 'registrar chuva, poeira e limpeza;'],
    note: 'O objetivo é distinguir variabilidade climática de defeito. Essa separação reduz visitas desnecessárias e ajuda a concentrar a manutenção no ponto que realmente limita a geração.'
  },
  'quanto-tempo-duram-os-paineis-solares': {
    heading: 'O que acompanhar para preservar a usina',
    paragraphs: [
      'A degradação de um módulo não é observada apenas olhando para o vidro. Produção abaixo do padrão, pontos quentes, delaminação, trincas, infiltração, conectores danificados e corrosão podem exigir inspeção. O diagnóstico deve relacionar sintoma, medição e histórico.',
      'O ambiente influencia a durabilidade. Maresia, poeira, calor, vento, umidade, acesso e qualidade da estrutura mudam a exposição dos componentes. Instalação correta, torque, ventilação e proteção elétrica fazem parte da vida útil, não são detalhes de acabamento.',
      'Quando o inversor chega ao fim de sua vida comercial, a troca precisa considerar compatibilidade com os módulos, conectores, monitoramento, proteção e garantia. A substituição de um componente pode ser planejada sem descartar o restante da usina.'
    ],
    checklist: ['manter serial, datasheet e notas fiscais;', 'acompanhar curvas de geração;', 'inspecionar fixações, cabos e vedação;', 'registrar corrosão e intervenções;', 'planejar troca do inversor com antecedência;'],
    note: 'Garantia não é manutenção e vida útil não é potência garantida. Esses conceitos devem aparecer separados na proposta e no relatório de acompanhamento.'
  },
  'energia-solar-funciona-sem-luz': {
    heading: 'Backup solar exige projeto de cargas críticas',
    paragraphs: [
      'A primeira decisão é escolher o que continuará ligado. Geladeira, iluminação, internet, portão, bomba, equipamentos médicos e servidores podem ter prioridades e potências de partida diferentes. Sem essa lista, a bateria pode parecer grande e ainda não sustentar o uso desejado.',
      'O quadro de cargas críticas precisa ser separado e protegido. O sistema de transferência deve impedir paralelismo indevido com a rede e o modo de operação deve ser testado. O usuário também precisa saber como agir em falha, baixa carga e manutenção.',
      'Se a autonomia desejada for longa, a área de baterias, ventilação, temperatura, acesso e segurança ganham importância. O projeto deve explicar o comportamento quando a bateria estiver baixa ou quando a rede retornar.'
    ],
    checklist: ['listar potência e partida das cargas;', 'definir horas de autonomia;', 'separar quadro de cargas críticas;', 'testar transferência e retorno da rede;', 'documentar operação e manutenção;'],
    note: 'Backup é uma função projetada, não um efeito automático de possuir painéis. O artigo on-grid/off-grid ajuda a entender a arquitetura antes de escolher equipamentos.'
  },
  'precisa-de-bateria-para-energia-solar': {
    heading: 'Como comparar bateria por serviço entregue',
    paragraphs: [
      'A bateria pode entregar autonomia, deslocamento de consumo, controle de demanda ou suporte a cargas críticas. Cada objetivo exige um dimensionamento diferente. Usar apenas a capacidade nominal não informa quantos kWh estarão disponíveis no uso real.',
      'Considere potência contínua, pico, profundidade de descarga, eficiência, temperatura, ciclos, garantia e possibilidade de expansão. O inversor e as proteções precisam ser compatíveis, e o ambiente deve permitir instalação segura e manutenção.',
      'Também compare a bateria com alternativas: gerador, mudança de horário, gerenciamento de carga, aumento de autoconsumo ou melhoria da rede interna. A solução com maior investimento não é necessariamente a de maior valor.'
    ],
    checklist: ['definir qual carga será atendida;', 'calcular autonomia e potência de pico;', 'confirmar ciclo, garantia e substituição;', 'avaliar ambiente e acesso técnico;', 'comparar retorno e benefício de continuidade;'],
    note: 'Uma proposta honesta mostra autonomia em cenários, não uma promessa única. O usuário precisa entender o que acontece com envelhecimento, temperatura e reserva de segurança.'
  },
  'energia-solar-para-hospitais': {
    heading: 'Como organizar o estudo em um estabelecimento de saúde',
    paragraphs: [
      'O estudo começa pela separação de cargas. Climatização, iluminação, diagnóstico, TI, bombeamento, esterilização e suporte à vida podem ter requisitos diferentes. O sistema fotovoltaico pode reduzir parte do consumo, mas não deve ser tratado como substituto de gerador ou nobreak sem análise específica.',
      'A obra também precisa respeitar circulação, higiene, controle de acesso, horários de atendimento e áreas técnicas. A equipe de engenharia deve registrar interfaces com gerador, transferência, aterramento, proteção contra surtos e sistemas de emergência.',
      'O comissionamento deve ser planejado antes da instalação. Documente testes, alarmes, desligamento, recuperação, responsabilidades e treinamento de quem opera o imóvel.'
    ],
    checklist: ['mapear cargas críticas e não críticas;', 'aprovar janelas e rotas de obra;', 'compatibilizar com gerador e nobreak;', 'definir testes e critérios de aceite;', 'entregar documentação para manutenção;'],
    note: '“Segurança elétrica” é um resultado de projeto, execução, operação e manutenção. Não deve ser prometida por uma única tecnologia ou por uma tabela de economia.'
  },
  'energia-solar-para-condominios': {
    heading: 'Documentos e governança para decisão do condomínio',
    paragraphs: [
      'A assembleia precisa receber uma proposta compreensível: objetivo, investimento, rateio, titularidade, área usada, prazo, manutenção, garantias e responsabilidades. Quando esses pontos ficam implícitos, a aprovação pode gerar conflito mesmo que o sistema funcione.',
      'O condomínio deve avaliar telhado, laje, impermeabilização, acesso, rota de cabos, quadro, medição e segurança contra incêndio. O laudo estrutural ou a autorização do proprietário pode ser necessário conforme a configuração do prédio.',
      'Depois da instalação, a administração precisa saber quem acompanha monitoramento, limpeza, falhas e garantias. A entrega técnica deve ser arquivada com atas, projetos, notas e protocolos.'
    ],
    checklist: ['aprovar escopo e responsabilidade em ata;', 'guardar plantas e autorizações;', 'definir acesso para manutenção;', 'registrar rateio e medição;', 'planejar revisão anual do desempenho;'],
    note: 'Condomínio não deve aprovar uma economia percentual isolada. Deve aprovar uma solução, um contrato e uma rotina de governança.'
  },
  'energia-solar-para-fazendas': {
    heading: 'Dados de campo que melhoram a simulação rural',
    paragraphs: [
      'Para bombeamento, a energia necessária não depende somente da potência do motor. Vazão, altura manométrica, tempo de funcionamento, distância, reservatório e sazonalidade alteram o consumo e a estratégia de operação.',
      'Em propriedades afastadas, cabos longos e baixa tensão podem provocar perdas relevantes. Em outros casos, a solução mais econômica pode combinar geração, rede, automação, armazenamento ou bombeamento em horário de maior sol.',
      'A proteção merece atenção especial: estruturas expostas, cercas, motores, quadros e comunicação podem sofrer com descargas atmosféricas e ambiente agressivo. O projeto deve prever manutenção possível no local.'
    ],
    checklist: ['registrar vazão, altura e horas de bomba;', 'medir distância e tensão da alimentação;', 'avaliar poeira, chuva e descargas;', 'definir quem fará manutenção;', 'testar operação na época de maior demanda;'],
    note: 'Uma usina rural bem dimensionada é uma solução de engenharia integrada à operação da propriedade, e não apenas um conjunto de módulos em solo.'
  },
  'documentos-para-instalar-energia-solar': {
    heading: 'Como evitar pendência documental',
    paragraphs: [
      'A maior parte das pendências surge de divergência: titular diferente, endereço incompleto, unidade consumidora errada, assinatura sem autorização ou projeto que não corresponde ao equipamento instalado. Um controle simples de versões reduz retrabalho.',
      'Para pessoa jurídica, confirme quem pode representar a empresa e quais unidades receberão créditos ou serão atendidas. Para imóvel alugado, deixe a autorização e o destino dos equipamentos claros antes de protocolar.',
      'No financiamento, o banco pode pedir documentos próprios, análise de crédito e garantias. A empresa de engenharia não deve prometer aprovação, pois a decisão depende da instituição financeira e do perfil do cliente.'
    ],
    checklist: ['conferir nome, CPF/CNPJ e endereço em todos os documentos;', 'identificar a unidade consumidora correta;', 'guardar autorização do proprietário;', 'separar exigências da distribuidora e do banco;', 'acompanhar protocolo e prazo de resposta;'],
    note: 'Trate o checklist como documento vivo. Se a distribuidora alterar o formulário ou a concessionária exigir informação adicional, atualize a lista antes de enviar novamente.'
  },
  'como-escolher-instalador-wallbox': {
    heading: 'Entrega técnica: o que deve ficar documentado',
    paragraphs: [
      'A instalação não termina quando o carregador acende. O cliente deve receber identificação do circuito, proteção instalada, medições realizadas, instruções de uso, limites do equipamento e indicação do que fazer em caso de falha.',
      'Em garagem coletiva, o relatório também ajuda o condomínio a saber por onde passam cabos, quais áreas foram acessadas e quem é responsável por manutenção. Em uma residência, ele facilita atendimento futuro e preserva a relação com a garantia do equipamento.',
      'Se houver mudança de potência, carregador, veículo ou rota, o projeto pode precisar ser reavaliado. O documento deve registrar a configuração entregue, não apenas um “funciona”.'
    ],
    checklist: ['entregar diagrama ou identificação do circuito;', 'registrar tensão, corrente e testes;', 'fornecer manual e configuração do carregador;', 'orientar sobre aquecimento e desarme;', 'informar canal e prazo de garantia;'],
    note: 'A qualidade do instalador aparece tanto na execução quanto na capacidade de explicar e documentar o que foi feito.'
  },
  'cuidados-seguranca-carregador-veicular': {
    heading: 'Sinais de que a recarga precisa ser interrompida',
    paragraphs: [
      'Aquecimento anormal de tomada, plugue, borne, cabo ou quadro é um sinal de alerta. Escurecimento, cheiro de material aquecido, ruído, faísca, desarme repetido e mensagem de falha também merecem investigação.',
      'Não reaperte conexões energizadas, não substitua disjuntor por outro maior e não use extensão para afastar o carregador. Interrompa a recarga de forma segura e procure profissional habilitado quando houver dano ou comportamento fora do manual.',
      'A manutenção preventiva deve observar cabo, conector, fixação, vedação, ventilação, aplicativo, proteções e registros de falha. O ambiente de garagem pode acrescentar umidade, poeira e risco mecânico.'
    ],
    checklist: ['parar diante de aquecimento ou cheiro;', 'verificar mensagens do fabricante;', 'manter conectores sem sujeira ou umidade;', 'não improvisar adaptadores;', 'registrar falhas para diagnóstico;'],
    note: 'Segurança de recarga combina equipamento adequado, instalação correta e comportamento de uso. Nenhum desses três elementos substitui os outros.'
  },
  'quadro-eletrico-wallbox': {
    heading: 'Quando a solução é gerenciamento de carga',
    paragraphs: [
      'Nem todo imóvel precisa aumentar imediatamente a entrada. Em alguns casos, um sistema de gerenciamento pode limitar ou programar a recarga para evitar que várias cargas atinjam o pico ao mesmo tempo. Essa solução precisa ser compatível com o carregador e com o perfil de uso.',
      'Em outros casos, a instalação exige adequação de alimentador, quadro, padrão ou medição. A decisão depende de medição, cálculo e exigência da distribuidora, não de uma regra baseada só na corrente do Wallbox.',
      'O estudo também deve prever expansão: segundo veículo, ar-condicionado, bomba ou geração solar podem alterar a demanda. Deixar reserva técnica pode ser mais econômico que refazer a infraestrutura.'
    ],
    checklist: ['medir ou estimar cargas simultâneas;', 'definir se a recarga pode ser agendada;', 'avaliar gerenciamento automático;', 'considerar futura expansão;', 'registrar limites da solução entregue;'],
    note: 'A melhor solução pode ser um novo circuito, uma adequação do padrão, um controlador de carga ou uma combinação. O diagnóstico é que define a alternativa.'
  },
  'qual-potencia-wallbox-escolher': {
    heading: 'Tempo de recarga: uma conta simples, com limites',
    paragraphs: [
      'Uma estimativa inicial pode dividir a energia a repor pela potência média de carregamento. Na prática, a curva do veículo reduz a potência em determinados níveis de bateria, e perdas do carregador e da instalação também entram na conta.',
      'Se o carro percorre poucos quilômetros por dia e permanece muitas horas estacionado, uma potência menor pode atender a rotina. Se há pouco tempo de parada, uso intenso ou mais de um veículo, a potência e o gerenciamento precisam ser avaliados em conjunto.',
      'Potência elevada também aumenta exigência de circuito, proteções, fases e eventual obra. A economia de tempo deve ser comparada com o investimento e com a capacidade disponível.'
    ],
    checklist: ['calcular kWh usados por dia;', 'considerar janela de estacionamento;', 'usar potência AC aceita pelo veículo;', 'incluir perdas e redução no fim da carga;', 'comparar obra e benefício;'],
    note: 'O equipamento ideal é aquele que atende a rotina com margem de segurança. Comprar a maior potência sem poder aproveitá-la gera custo sem benefício proporcional.'
  },
  'quanto-custa-instalar-wallbox': {
    heading: 'Como reduzir incerteza antes do preço fechado',
    paragraphs: [
      'Envie ao instalador o modelo do carro, o modelo do carregador, fotos do quadro, tensão, distância aproximada até a vaga e regras do condomínio. Essas informações não substituem vistoria, mas ajudam a evitar orçamento baseado em suposição.',
      'Na visita, registre obstáculos, perfurações, eletrodutos, caixas de passagem, travessias, altura, drenagem, acabamento e acesso. Em condomínios, verifique se haverá medidor individual, rateio ou ligação ao quadro comum.',
      'O contrato deve tratar de alteração de escopo. Se a instalação revelar cabo inadequado, quadro aquecido ou necessidade de aumento de carga, o cliente precisa saber como a decisão e o custo serão aprovados.'
    ],
    checklist: ['fornecer dados do equipamento e do veículo;', 'fotografar quadro e rota;', 'separar obra elétrica de obra civil;', 'prever inspeção e aceite;', 'formalizar qualquer aditivo;'],
    note: 'Preço transparente é aquele que mostra a premissa e o que muda se a premissa estiver errada. Isso é mais confiável que uma promessa de preço fixo sem vistoria.'
  },
  'wallbox-com-energia-solar': {
    heading: 'Recarga solar: autoconsumo, excedente e horário',
    paragraphs: [
      'Se o carro carrega durante o dia, parte da geração pode ser consumida diretamente. À noite, o imóvel dependerá da rede, de créditos ou de armazenamento, conforme o sistema. A programação do carregador pode melhorar o autoconsumo, mas precisa respeitar a rotina do usuário.',
      'O consumo do veículo deve entrar no projeto desde o início. Somar uma recarga depois pode aumentar a fatura, reduzir a folga do inversor ou exigir adequação do padrão e do quadro.',
      'Em sistemas com bateria, a estratégia muda: a energia pode ser reservada para cargas críticas ou usada para carregar o carro. O custo, a perda de ciclos e a prioridade de cada carga devem ser explicitados.'
    ],
    checklist: ['medir quilômetros e kWh mensais do carro;', 'definir horários de estacionamento;', 'verificar capacidade do quadro e inversor;', 'programar recarga quando fizer sentido;', 'separar economia direta de créditos;'],
    note: 'A integração solar e Wallbox é uma decisão conjunta de energia e mobilidade. O dimensionamento precisa atender os dois sistemas sem esconder limites da rede.'
  },
  'wallbox-em-condominio': {
    heading: 'Como reduzir conflitos na aprovação do Wallbox',
    paragraphs: [
      'O pedido ao condomínio deve responder às dúvidas de segurança e custo: por onde o cabo passa, quem paga, como medir, quem repara, o que acontece se outro morador pedir o mesmo e como a instalação será desligada em uma emergência.',
      'Uma solução individual pode usar o medidor da unidade, o quadro comum com medição separada ou infraestrutura coletiva. Cada modelo exige avaliação de carga, autorização e regras de rateio diferentes.',
      'A documentação deve ficar disponível para administração e manutenção. Fotos antes e depois, diagrama, identificação e manual reduzem risco de intervenção futura sem conhecimento.'
    ],
    checklist: ['apresentar planta e rota dos cabos;', 'explicar medição e responsabilidade;', 'avaliar demanda do prédio;', 'incluir manutenção e remoção futura;', 'registrar aprovação e critérios de expansão;'],
    note: 'A aprovação tende a ser mais simples quando o condomínio recebe uma solução replicável, com regras para o primeiro ponto e para os próximos.'
  },
  'wallbox-ou-tomada-comum': {
    heading: 'Escolha pelo padrão de uso, não apenas pelo preço',
    paragraphs: [
      'Para uma recarga ocasional, em circuito comprovadamente adequado e dentro do manual, o carregador portátil pode ser suficiente. Para uso diário, a previsibilidade de um circuito dedicado, proteção adequada e ponto fixo costuma ter mais valor.',
      'Observe o tempo disponível. Se o carro permanece estacionado por uma noite inteira, a potência necessária pode ser menor. Se a rotina exige reposição rápida ou vários veículos, a infraestrutura precisa ser planejada para a carga simultânea.',
      'A tomada deve ser inspecionada quanto a aquecimento, fixação, aterramento, umidade e corrente. Mesmo o Wallbox precisa de circuito, proteção e instalação compatíveis.'
    ],
    checklist: ['definir frequência e duração da recarga;', 'verificar circuito e tomada existentes;', 'seguir o manual do carregador portátil;', 'proteger cabos e conexões;', 'planejar circuito dedicado para uso recorrente;'],
    note: 'A resposta correta pode mudar quando o veículo, a garagem ou a rotina mudarem. Reavalie antes de aumentar corrente ou instalar adaptadores.'
  }
};

const finalDeepening = {
  'nr10-laudo-eletrico-empresa': {
    heading: 'Como transformar achados em evidência de melhoria',
    text: 'Depois da avaliação, a empresa deve registrar a ação, o responsável, a data prevista, a evidência de conclusão e o risco residual. Fotografias, medições, ordens de serviço, diagramas atualizados e treinamentos ajudam a mostrar evolução sem esconder pendências. O plano também precisa distinguir correções imediatas de projetos que exigem parada, orçamento ou aprovação.\n\nQuando houver mudança de processo, ampliação de carga ou acidente, reavalie o diagnóstico. A NR-10 se relaciona com a rotina de trabalho e com as condições reais da instalação; um documento antigo não deve ser tratado como retrato permanente.\n\nO relatório deve ser compreensível para quem toma decisão e para quem executa a correção. Descreva o local, o equipamento, o risco, a evidência e o critério de prioridade. Evite copiar listas genéricas de não conformidade sem dizer por que o item importa naquela instalação.\n\nSe a empresa possui várias unidades, padronize o método de inspeção sem apagar as diferenças de cada site. A matriz pode ser comum, mas a evidência, a urgência e o plano de ação devem ser específicos.'
  },
  'automacao-industrial-nordeste': {
    heading: 'Indicadores para medir se a automação funcionou',
    text: 'Antes de programar, defina como o resultado será medido: tempo de ciclo, paradas, refugo, consumo, disponibilidade, manutenção ou rastreabilidade. Um indicador deve ter fonte, frequência, responsável e critério de comparação. Isso evita atribuir à automação um ganho que veio de outra mudança.\n\nApós a entrada em operação, compare o cenário anterior e o atual, corrija alarmes pouco úteis e registre as versões do programa. A melhoria contínua depende de dados confiáveis, documentação e uma equipe capaz de manter o sistema.\n\nEm um retrofit, preserve as informações que a manutenção já conhece e migre por etapas. Identifique sinais, cabos, bornes, endereços e intertravamentos antes de alterar o painel. A documentação de “como está” é tão importante quanto o desenho de “como ficará”.\n\nTambém defina o que acontece quando um sensor falha, a rede cai ou o controlador reinicia. Uma automação segura precisa de estados de falha previsíveis, alarmes acionáveis e um procedimento de retorno à operação.'
  },
  'clp-vs-reles-paineis': {
    heading: 'Perguntas que fecham a escolha técnica',
    text: 'Pergunte quantas alterações de lógica ocorreram no último ano, quanto tempo a manutenção leva para localizar uma falha e se o processo precisa conversar com inversor, supervisório ou banco de dados. Pergunte também quem fará backup, teste e recuperação se o controlador falhar.\n\nSe as respostas forem incertas, o primeiro investimento pode ser documentação e diagnóstico, não um equipamento novo. A escolha entre CLP e relés deve reduzir risco e custo total; trocar tecnologia sem resolver a causa do problema apenas desloca a complexidade.\n\nPara lógica simples, relés bem identificados podem ser fáceis de manter. Para sequências extensas, o CLP pode concentrar diagnóstico e permitir mudança sem refazer toda a fiação. Em ambos os casos, a proteção da máquina, a parada segura e a separação entre comando e potência precisam ser projetadas.\n\nO orçamento também deve esclarecer se inclui programação, testes em bancada, testes em campo, treinamento, desenhos e arquivos editáveis. Sem esses itens, a empresa pode receber um painel novo e continuar dependente de quem o montou.'
  },
  'quanto-da-para-economizar-com-energia-solar': {
    heading: 'Como conferir a simulação depois da instalação',
    text: 'Após o comissionamento, compare a energia produzida com a projeção ajustada ao clima e ao período. Use o monitoramento do inversor, as leituras da fatura e o histórico de indisponibilidade. Se a economia não aparecer, verifique se o problema está na geração, no consumo, na leitura, na tarifa ou em uma cobrança que não entra na compensação.\n\nA revisão periódica não serve para prometer um percentual fixo, e sim para detectar desvios e decidir quando investigar. Um relatório claro mostra a diferença entre o que o sistema deveria produzir e o que efetivamente entregou.'
  },
  'spda-para-raios-obrigatorio': {
    heading: 'Perguntas que devem acompanhar a avaliação',
    text: 'Pergunte qual é a finalidade do documento, qual parte do sistema foi acessada, quais medições foram realizadas e que evidências sustentam cada recomendação. Também confirme se o serviço inclui projeto, execução, adequação, inspeção ou apenas orientação.\n\nEssa clareza evita que um laudo de escopo limitado seja usado como prova de conformidade integral. Em obras e regularizações, coordene a documentação do SPDA com o projeto elétrico, o Corpo de Bombeiros, o seguro e a manutenção do imóvel.'
  }
};

// Segunda rodada: aprofundamento dos artigos que ainda ficaram abaixo do piso
// editorial de 1.500 palavras no HTML renderizado. O conteúdo é específico por
// intenção para aumentar cobertura sem transformar todos os artigos em cópias.
const secondRound = {
  'spda-para-raios-obrigatorio': {
    heading: 'Como analisar SPDA sem confundir obrigação, projeto e manutenção',
    sections: [
      'A primeira pergunta não deve ser apenas se o prédio “precisa de para-raios”. O diagnóstico começa identificando ocupação, altura, geometria, localização, materiais, circulação de pessoas, equipamentos sensíveis e histórico de alterações. Esses dados alimentam a avaliação de risco e ajudam a definir se o trabalho será uma consulta, um projeto, uma inspeção ou uma adequação.',
      'Também é importante separar captação, descidas, aterramento, equipotencialização, proteção contra surtos e medidas internas. Uma haste visível não representa o sistema inteiro. Em uma vistoria, registre o que está acessível, o que exige abertura ou medição e o que depende de documentos antigos que precisam ser confirmados.',
      'Em edificações existentes, a qualidade da documentação muda completamente a contratação. Plantas, fotos, medições anteriores, certificados de materiais, registros de manutenção e relatórios de ocorrências ajudam a localizar divergências. Quando esses registros não existem, o orçamento deve considerar levantamento e não prometer uma conclusão baseada somente em inspeção visual.',
      'A análise de risco não deve ser substituída por uma regra simplificada de metragem ou número de pavimentos. A necessidade e o nível de proteção dependem da aplicação da norma vigente e das características reais da edificação. Em locais com grande circulação, áreas abertas ou sistemas eletrônicos críticos, o contexto operacional pesa na decisão.',
      'A coordenação com o projeto elétrico evita que o SPDA seja tratado como uma ilha. Caminhos de cabos, barramentos, aterramento, DPS, estruturas metálicas e entradas de energia precisam conversar entre si. Alterações posteriores em cobertura, fachada, gerador ou sistema fotovoltaico devem disparar uma nova conferência de interfaces.',
      'Para a gestão do imóvel, o documento final precisa ser útil depois da entrega. Identifique desenhos, pontos inspecionados, medições, limitações de acesso, não conformidades, prioridade e responsável pela correção. Uma lista genérica de recomendações não ajuda o síndico, o gestor ou a equipe de manutenção a decidir o que fazer primeiro.',
      'Seguradora, Corpo de Bombeiros, auditoria interna e proprietário podem pedir documentos diferentes. Antes de contratar, escreva a finalidade do trabalho e confirme quem aceitará o documento. Isso reduz o risco de pagar por um laudo tecnicamente correto, mas inadequado para a finalidade administrativa pretendida.',
      'Depois da adequação, estabeleça uma rotina de inspeção visual, verificação de conexões, avaliação de corrosão, atualização de desenhos e registro de intervenções. A manutenção não substitui o projeto e o projeto não substitui a inspeção. O resultado confiável vem da combinação entre escopo claro, execução rastreável e reavaliação quando o imóvel muda.'
    ],
    checklist: ['descrever ocupação, altura e características da edificação;', 'definir a finalidade do documento antes da vistoria;', 'separar proteção externa, interna e DPS;', 'mapear acessos, pontos não inspecionados e medições;', 'compatibilizar SPDA com projeto elétrico e fotovoltaico;', 'registrar prioridade, responsável e evidência de correção;', 'manter desenhos e registros atualizados;'],
    questions: [
      ['Um laudo antigo ainda serve?', 'Pode ser uma referência, mas não deve ser tratado como retrato permanente quando houve reforma, mudança de uso, corrosão, descarga ou alteração no sistema elétrico.'],
      ['DPS substitui SPDA?', 'Não. DPS, aterramento, equipotencialização e proteção contra descargas têm funções relacionadas, mas diferentes e precisam ser avaliados no conjunto.'],
      ['O orçamento deve incluir adequação?', 'Somente se isso estiver descrito. Inspeção, projeto, fornecimento, instalação, testes e manutenção são entregas distintas e devem aparecer separadas.']
    ],
    summary: 'A decisão mais segura é contratar o escopo que responde ao risco e à finalidade do imóvel, com referências verificáveis e limites explícitos.'
  },
  'nr10-laudo-eletrico-empresa': {
    heading: 'Como transformar um laudo NR-10 em plano de controle',
    sections: [
      'Um laudo útil começa pelo inventário da instalação. Liste quadros, painéis, subestações, máquinas, salas elétricas, pontos de seccionamento, fontes alternativas e áreas onde trabalhadores atuam. Sem esse mapa, a avaliação pode parecer completa porque tem muitas páginas, mas deixar justamente o equipamento mais crítico fora do escopo.',
      'O Prontuário de Instalações Elétricas não deve ser tratado como uma pasta estática. Diagramas, procedimentos, registros de treinamento, inspeções, medições, ordens de serviço, permissões de trabalho e evidências de manutenção precisam acompanhar a realidade. Sempre que uma expansão mudar a instalação, revise os documentos afetados.',
      'A inspeção visual e a medição respondem perguntas diferentes. Identificação, barreiras, sinalização, grau de proteção, partes expostas e organização aparecem na verificação física; continuidade, resistência, isolação, temperatura ou qualidade da energia podem exigir instrumentos, método e condições definidos no escopo.',
      'O relatório deve descrever risco e evidência, não apenas citar uma norma. Registre localização, equipamento, fotografia ou medição, condição encontrada, consequência possível, recomendação e prioridade. Uma classificação simples como imediato, curto prazo e planejamento ajuda a gestão a decidir sem esconder que os riscos têm gravidades diferentes.',
      'A empresa também precisa olhar para a operação. Quem autoriza o serviço? Quem pode desenergizar? Como é feita a constatação de ausência de tensão? Que procedimento existe para trabalho próximo a partes vivas? Como são controladas ferramentas, EPIs, bloqueios e retorno à operação? Essas perguntas conectam o documento à rotina e evitam conformidade apenas no papel.',
      'Em instalações com terceirizados, o contrato deve dividir responsabilidades. A contratante precisa fornecer informações e controlar o acesso; a contratada deve demonstrar competência, procedimento, treinamento e registros compatíveis com o serviço. O laudo pode apontar lacunas, mas não substitui a gestão diária de segurança.',
      'Após a emissão, converta cada achado em ação com responsável, prazo, orçamento, evidência de conclusão e verificação posterior. Uma correção elétrica sem teste, atualização documental ou orientação aos usuários pode deixar o risco reaparecer. O plano de ação deve dizer também o que depende de projeto ou parada de produção.',
      'Quando houver acidente, quase acidente, mudança de tensão, instalação de geração, nova máquina ou ampliação de carga, reabra a análise. A atualização não precisa apagar o histórico: registre a versão anterior, a causa da mudança e os novos critérios de aceitação para que a empresa mantenha rastreabilidade.'
    ],
    checklist: ['inventariar instalações, painéis e atividades;', 'definir inspeção, medição e análise documental;', 'verificar diagramas, identificação e seccionamento;', 'registrar achados com evidência e prioridade;', 'avaliar competência, treinamento e procedimentos;', 'transformar achados em plano com responsáveis;', 'revisar o PIE após mudanças ou incidentes;'],
    questions: [
      ['Laudo NR-10 é igual a certificado de conformidade?', 'Não. O relatório descreve o escopo avaliado, as evidências e as pendências encontradas. Conclusões dependem da abrangência, dos critérios e das condições verificadas.'],
      ['Toda empresa precisa do mesmo PIE?', 'Não. A composição depende da instalação, tensão, atividades, riscos, trabalhadores e documentos aplicáveis. O inventário define o que precisa existir.'],
      ['O relatório resolve a pendência sozinho?', 'Não. Ele orienta decisões e registra condições. A correção, o teste, a atualização documental e a gestão da rotina continuam necessários.']
    ],
    summary: 'O melhor laudo é aquele que ajuda a empresa a priorizar riscos, comprovar ações e manter a instalação controlada depois da entrega.'
  },
  'automacao-industrial-nordeste': {
    heading: 'Como planejar automação industrial por etapas e resultado',
    sections: [
      'O diagnóstico de automação deve começar pelo processo e não pelo catálogo de equipamentos. Descreva a sequência atual, tempos de ciclo, pontos de espera, retrabalho, paradas, perdas e decisões tomadas pelo operador. A tecnologia escolhida precisa atacar um gargalo mensurável, caso contrário o projeto pode apenas trocar comandos manuais por uma camada adicional de complexidade.',
      'Em ambientes industriais do Nordeste, condições locais também entram no projeto. Temperatura, poeira, maresia, vibração, oscilação de rede, disponibilidade de peças, conectividade e distância até suporte técnico afetam gabinete, instrumentação, comunicação e manutenção. Registrar essas premissas evita copiar uma arquitetura que funciona em outra planta, mas não neste ambiente.',
      'A arquitetura deve distinguir controle, supervisão, histórico e integração. Um CLP pode cuidar da lógica determinística; um supervisório pode apresentar alarmes e tendências; um banco de dados pode registrar produção; e um sistema corporativo pode consumir indicadores. Misturar todas as responsabilidades em um único componente dificulta diagnóstico, expansão e recuperação após falha.',
      'Antes da implantação, defina a lista de entradas e saídas, intertravamentos, estados de falha, permissivos, alarmes, telas, níveis de acesso e comportamento após falta de energia. A sequência de operação precisa ser entendida por produção, manutenção e segurança. O programa deve refletir o processo real, não apenas um diagrama de fornecedor.',
      'A implantação por etapas reduz risco. Comece por um equipamento ou célula representativa, crie uma linha de base, teste em bancada quando possível, faça comissionamento controlado e documente o que mudou. Depois de confirmar a estabilidade, replique o padrão. Uma migração total durante uma parada curta costuma concentrar riscos que poderiam ser isolados.',
      'Dados só geram valor quando têm definição e dono. “Parada”, “produção boa”, “refugo”, “disponibilidade” e “falha” precisam de regras consistentes. Se cada turno interpreta o indicador de uma forma, o painel cria discussão sobre o número em vez de orientar a ação. Inclua dicionário de dados, frequência, fonte e responsável.',
      'A entrega deve incluir arquivos editáveis, backups, lista de componentes, endereçamento, diagramas, versões de programa, senhas sob governança e procedimentos de recuperação. A equipe local precisa saber diagnosticar uma falha simples e pedir suporte com informações suficientes. Sem transferência de conhecimento, a empresa fica dependente de quem implantou.',
      'Depois do go-live, acompanhe alarmes, tempo de ciclo, paradas, manutenção e incidentes. Faça revisão de alarmes que não geram ação, retire telas confusas e registre mudanças. Automação madura não é uma instalação que nunca muda; é uma instalação que muda com método, controle de versão e aprendizado operacional.'
    ],
    checklist: ['medir o gargalo antes de escolher tecnologia;', 'registrar condições ambientais da planta;', 'separar controle, supervisão e integração;', 'definir falhas, alarmes e estados seguros;', 'implantar piloto ou etapa controlada;', 'entregar backups, desenhos e treinamento;', 'acompanhar indicadores após o go-live;'],
    questions: [
      ['Automação é sempre Indústria 4.0?', 'Não. O nível tecnológico deve responder ao problema e à capacidade de operação. Um controle bem documentado pode gerar mais valor que uma integração complexa sem uso.'],
      ['Quanto tempo leva um projeto?', 'Depende de escopo, número de sinais, paradas, interfaces, testes e disponibilidade da planta. Um prazo responsável nasce do levantamento, não de uma promessa genérica.'],
      ['O que precisa ficar com a equipe?', 'Documentação, backups, treinamento, rotina de manutenção, critérios de alarme e procedimento para retorno seguro à operação.']
    ],
    summary: 'Automação robusta combina diagnóstico, arquitetura simples o bastante para manter, implantação controlada e indicadores que provam o resultado.'
  },
  'clp-vs-reles-paineis': {
    heading: 'Como comparar CLP e relés pelo custo total do processo',
    sections: [
      'A comparação começa desenhando a sequência de funcionamento. Liste condições de partida, temporizações, intertravamentos, sensores, saídas, modos manual e automático, falhas e exceções. Uma lógica que parece simples em uma conversa pode exigir dezenas de contatos e caminhos quando o painel precisa atender partida, parada, segurança e diagnóstico.',
      'Relés têm vantagens em comandos pequenos, fixos e conhecidos pela equipe. A leitura física do circuito pode ser direta, a substituição é familiar e a dependência de software é menor. Porém, o espaço, a fiação, a quantidade de contatos e o tempo para localizar uma falha crescem quando a lógica muda ou quando muitos sinais precisam conversar.',
      'O CLP concentra lógica, temporização, contagem, comunicação e diagnóstico em um programa. Isso facilita expansão e alteração controlada, mas exige backup, documentação, proteção de acesso e alguém capaz de interpretar a lógica. Um CLP mal documentado pode ser tão difícil de manter quanto um painel de relés desorganizado.',
      'O custo precisa incluir engenharia, montagem, programação, testes, parada de produção, treinamento, peças sobressalentes e manutenção. Compare também o custo de uma mudança futura: quantos bornes, fios, módulos, horas e testes serão necessários? A solução mais barata na compra pode ser a mais cara quando o processo sofre alterações frequentes.',
      'A segurança da máquina não vem automaticamente da tecnologia de comando. Parada de emergência, proteções físicas, relés ou controladores de segurança, categoria de risco e validação devem ser tratados conforme a máquina e o escopo. O CLP de processo não deve ser apresentado como substituto universal da função de segurança.',
      'Em retrofit, preserve o conhecimento existente. Fotografe o painel, identifique cabos, desenhe o “as is”, registre endereços e mapeie intertravamentos antes de remover componentes. Se a lógica não está documentada, reserve tempo para observar o comportamento real e entrevistar manutenção e operação.',
      'Peça uma FAT ou teste de bancada para conferir lógica, alarmes e comunicação antes da instalação em campo. Depois, faça SAT ou comissionamento com a máquina real, registre pendências e entregue a versão final do programa. Sem esses marcos, a empresa pode descobrir incompatibilidades durante a produção.',
      'A decisão pode ser híbrida: relés para funções simples e CLP para sequências, comunicação e supervisão. A arquitetura deve mostrar por que cada componente existe. O objetivo não é ganhar uma discussão de tecnologia, mas reduzir parada, facilitar manutenção e manter o processo previsível.'
    ],
    checklist: ['desenhar a sequência e as exceções do processo;', 'contar sinais, temporizações e comunicações;', 'calcular custo de mudança e manutenção;', 'separar comando de funções de segurança;', 'documentar o painel existente antes do retrofit;', 'incluir FAT, SAT e arquivos editáveis;', 'definir backup e competência da equipe;'],
    questions: [
      ['CLP sempre é mais moderno e melhor?', 'Não. Ele é mais flexível em muitos cenários, mas pode ser desnecessário ou mal mantido em uma lógica pequena. A escolha depende do processo e da equipe.'],
      ['Relé é inseguro?', 'Não automaticamente. Segurança depende da função, projeto, proteção, validação e manutenção. A tecnologia isolada não define o risco.'],
      ['O orçamento deve incluir programação?', 'Se a entrega usa CLP ou qualquer lógica parametrizada, programação, testes, backup e treinamento precisam aparecer explicitamente no escopo.']
    ],
    summary: 'Escolha a arquitetura que deixa o processo mais diagnosticável, expansível e seguro para quem realmente fará a manutenção.'
  },
  'o-que-e-energia-solar-fotovoltaica': {
    heading: 'Como interpretar a energia fotovoltaica além do painel',
    sections: [
      'O efeito fotovoltaico explica a conversão de luz em corrente contínua, mas a usina é um sistema. Módulos, conectores, cabos, estruturas, proteções, inversor, medição e conexão precisam operar como conjunto. Uma falha ou perda em qualquer etapa reduz a energia entregue, mesmo quando os painéis parecem visualmente em boas condições.',
      'Potência nominal em kWp não equivale à energia mensal. A produção depende de irradiância, temperatura, orientação, inclinação, sombras, sujeira, perdas elétricas, indisponibilidade e estratégia de operação. Por isso, uma proposta deve mostrar premissas de geração e não transformar o número de placas em promessa de economia.',
      'No consumo instantâneo, a energia produzida pode atender cargas do imóvel. O excedente segue o procedimento de conexão e compensação aplicável, enquanto a rede atende a demanda quando a geração é insuficiente. A fatura possui componentes que não devem ser resumidos a uma simples subtração entre geração e consumo.',
      'On-grid, híbrido e off-grid são arquiteturas com objetivos diferentes. O sistema conectado prioriza integração com a rede; o híbrido pode reservar cargas e usar armazenamento; o isolado precisa administrar geração, baterias e demanda sem depender da rede. A escolha deve começar pelo serviço desejado, como economia, autonomia ou continuidade.',
      'O inversor tem papel central na conversão, controle do ponto de operação, monitoramento e proteção. A seleção precisa considerar faixa de tensão, corrente, strings, ambiente, comunicação, garantia, assistência e compatibilidade com módulos. O melhor equipamento é o que atende ao projeto completo, não o que tem apenas a maior eficiência de catálogo.',
      'Antes de contratar, separe as três perguntas: quanto o imóvel consome, quanto o sistema pode produzir e como a energia será tratada quando houver excedente ou falta de geração. Essa separação evita comparar uma potência instalada com uma economia financeira sem passar pelo perfil de uso.',
      'A manutenção inclui inspeção, monitoramento, limpeza quando indicada, reaperto ou termografia quando aplicável, verificação de proteções e atualização de registros. O acompanhamento deve considerar tendência de produção e não apenas um dia isolado. Clima, sombra e indisponibilidade podem explicar variações temporárias.',
      'Uma boa explicação técnica também declara o que não sabe. Sem faturas, vistoria, dados do telhado e regras da distribuidora, qualquer dimensionamento é preliminar. O leitor deve sair sabendo quais dados reunir e quais perguntas fazer, não apenas com uma promessa genérica de redução da conta.'
    ],
    checklist: ['separar potência instalada de energia produzida;', 'mapear módulos, inversor, proteções e medição;', 'considerar sombra, temperatura e perdas;', 'diferenciar on-grid, híbrido e off-grid;', 'verificar regras de conexão e compensação;', 'comparar garantia, assistência e monitoramento;', 'dimensionar com faturas e características do imóvel;'],
    questions: [
      ['Painel produz energia à noite?', 'Não. A geração depende de luz. À noite, o imóvel usa a rede ou o armazenamento, conforme a arquitetura instalada.'],
      ['Mais placas sempre significam mais economia?', 'Não. O sistema precisa respeitar área, inversor, rede, consumo e regras de conexão. Excesso de potência pode não ser aproveitado da mesma forma.'],
      ['Energia solar elimina a distribuidora?', 'Em sistemas conectados, não. A rede continua relevante para atendimento, compensação e condições de conexão.']
    ],
    summary: 'Entender o sistema completo é o primeiro passo para comparar propostas, interpretar a geração e evitar promessas que não cabem no imóvel.'
  },
  'como-funciona-a-energia-solar-em-casas': {
    heading: 'Como dimensionar energia solar residencial com dados reais',
    sections: [
      'O histórico de consumo é o ponto de partida do projeto residencial. Reúna faturas suficientes para observar sazonalidade, mudanças de tarifa e meses fora do padrão. Um único mês pode conter uma viagem, uma obra ou uma falha de leitura e não representa a rotina que o sistema precisará atender.',
      'Depois, identifique o que mudará nos próximos anos. Ar-condicionado, aquecedor, piscina, bomba, home office, veículo elétrico e ampliação da casa podem alterar bastante o consumo. Dimensionar somente o passado pode gerar um sistema pequeno; dimensionar um futuro incerto sem cenários pode elevar o investimento sem necessidade.',
      'O telhado precisa ser analisado além da área livre. Orientação, inclinação, sombras, estrutura, acesso, telhas, corrosão e distância até o quadro interferem no projeto. Também verifique se haverá reforma ou troca de cobertura, porque desmontar a instalação depois costuma custar mais do que coordenar as obras desde o início.',
      'O quadro elétrico e o padrão de entrada definem interfaces importantes. Proteções, aterramento, espaço, condutores, medidor e capacidade de conexão devem ser conferidos. Uma proposta que fala apenas de módulos pode omitir adequações elétricas, obra civil, acesso ao telhado ou exigências da distribuidora.',
      'Produção e economia são números diferentes. A energia gerada pode coincidir com o consumo ou ser injetada conforme as regras aplicáveis, enquanto a fatura continua com cobranças e componentes específicos. A simulação deve mostrar geração, autoconsumo, excedente, custos residuais e faixa de variação.',
      'O contrato deve esclarecer marcas e modelos, projeto, responsabilidade técnica, instalação, testes, conexão, troca do medidor, garantias e assistência. Também deve explicar o que acontece se a vistoria revelar telhado inadequado, padrão insuficiente ou necessidade de obra adicional.',
      'Após a instalação, acompanhe geração, alarmes e faturas. O primeiro ciclo pode ter atraso de conexão, leitura parcial ou período incompleto. Compare meses equivalentes e investigue desvios persistentes antes de concluir que a usina ou a simulação falhou.',
      'Uma decisão residencial boa é aquela que cabe no orçamento e no horizonte de permanência do imóvel. Considere financiamento, manutenção, eventual mudança, expansão de carga e documentação. O sistema deve fazer sentido para a rotina da família, não apenas para uma parcela mensal aparentemente menor.'
    ],
    checklist: ['reunir histórico de faturas;', 'listar novas cargas previstas;', 'avaliar telhado, sombras e estrutura;', 'verificar quadro, padrão e proteções;', 'separar geração de economia líquida;', 'comparar escopo e garantias do contrato;', 'planejar monitoramento após a conexão;'],
    questions: [
      ['Preciso de um telhado grande?', 'Não necessariamente. O tamanho depende do consumo, da eficiência dos módulos, das sombras, da orientação e do objetivo do sistema.'],
      ['A conta fica sempre zerada?', 'Não. Existem componentes residuais e variações de consumo, produção e regras. A proposta deve explicar a fatura projetada.'],
      ['Posso instalar antes de reformar o telhado?', 'É possível, mas a estrutura e o cronograma devem ser avaliados. Instalar sobre uma cobertura que será removida pode gerar retrabalho.']
    ],
    summary: 'Um sistema residencial bem dimensionado nasce de faturas, vistoria, cenário de consumo e contrato transparente, não apenas da área disponível.'
  },
  'diferenca-entre-energia-solar-conectada-e-isolada': {
    heading: 'Como escolher entre on-grid, off-grid e híbrido',
    sections: [
      'A arquitetura on-grid costuma ser escolhida quando o objetivo principal é gerar energia para consumo e compensação com apoio da rede. Ela tende a ter menos equipamentos de armazenamento, mas depende da referência da distribuidora e normalmente interrompe a operação quando a rede cai por causa da proteção de anti-ilhamento.',
      'O sistema off-grid atende locais sem rede ou situações em que a autonomia local é parte central do serviço. Ele precisa equilibrar geração, bateria, cargas e períodos de baixa irradiância. O dimensionamento não pode usar apenas o consumo médio: potência de partida, dias de autonomia e reserva influenciam a capacidade necessária.',
      'O híbrido combina conexão, geração e armazenamento com uma lógica de prioridades. Pode alimentar cargas críticas, reservar energia, deslocar consumo ou reduzir dependência em determinados horários. Para funcionar bem, precisa de quadro de cargas críticas, transferência adequada, compatibilidade e estratégia de manutenção.',
      'Faça uma lista do que não pode desligar. Geladeira, internet, portões, iluminação, bombas, equipamentos médicos e servidores têm perfis diferentes. Some potência contínua e de partida, defina autonomia e veja se a carga realmente precisa permanecer ativa. Alimentar a casa inteira pode ser muito diferente de alimentar um circuito essencial.',
      'O espaço técnico também importa. Baterias precisam de ambiente, ventilação, proteção, acesso e procedimento de manutenção. Cabos, inversores, quadros e proteções devem ser organizados para que a equipe consiga identificar o estado do sistema durante uma falha ou uma intervenção.',
      'A comparação financeira precisa incluir reposição de baterias, degradação, manutenção, eficiência de ida e volta, tarifas, conexão, gerador eventual e valor da continuidade. Um sistema com bateria pode ser justificado pelo serviço prestado, mesmo que não tenha o menor payback; o importante é declarar o objetivo.',
      'Em propostas híbridas, confirme como o equipamento reage a falta de rede, sobrecarga, bateria baixa, retorno da rede e falha de comunicação. Testes de transferência e documentação de cargas são mais importantes do que apenas o número de kWh anunciado.',
      'Reavalie a arquitetura quando o consumo mudar. Um novo ar-condicionado, motor, carregador de veículo ou ampliação pode alterar potência, autonomia e prioridade. A decisão correta hoje deve deixar claras as condições que exigiriam um novo estudo amanhã.'
    ],
    checklist: ['definir economia, autonomia ou continuidade como objetivo;', 'listar cargas críticas e potência de partida;', 'calcular autonomia e reserva;', 'avaliar ambiente e segurança das baterias;', 'verificar transferência e anti-ilhamento;', 'incluir reposição e manutenção no custo total;', 'testar cenários de falha e retorno da rede;'],
    questions: [
      ['On-grid funciona durante apagão?', 'O on-grid comum normalmente desliga quando perde a referência da rede. Backup exige arquitetura e equipamentos preparados para operar de forma segura.'],
      ['Off-grid não precisa de rede?', 'A proposta é operar sem rede, mas precisa de geração e armazenamento suficientes para o perfil de consumo e as condições climáticas.'],
      ['Híbrido alimenta qualquer carga?', 'Não. Potência, partida, prioridade, capacidade da bateria e quadro de cargas precisam ser dimensionados.']
    ],
    summary: 'Escolha a arquitetura pelo serviço que precisa ser entregue: economia, autonomia, backup ou operação em local sem rede.'
  },
  'o-que-e-inversor-solar': {
    heading: 'Como escolher inversor solar pelo projeto, não pelo catálogo',
    sections: [
      'O inversor recebe corrente contínua dos módulos, busca o ponto de operação e entrega corrente alternada compatível com a instalação. Esse caminho envolve limites de tensão, corrente, potência, frequência, temperatura e proteção. Por isso, a ficha técnica precisa ser lida junto com o arranjo fotovoltaico e a rede do imóvel.',
      'A faixa MPPT deve conversar com a quantidade de módulos em série e com a temperatura mínima e máxima esperada. A corrente máxima precisa considerar o módulo escolhido e possíveis condições de irradiância. Um equipamento com potência adequada pode ainda ser incompatível se tensão, corrente ou número de entradas não fecharem.',
      'Inversor string concentra módulos em grupos e pode ser eficiente em telhados com orientações e sombras controladas. Microinversores trabalham próximos aos módulos e podem facilitar arquiteturas com múltiplas orientações, mas aumentam equipamentos distribuídos. Híbridos acrescentam funções de armazenamento e backup que exigem análise de cargas e baterias.',
      'O local de instalação afeta vida útil e manutenção. Calor excessivo, poeira, maresia, umidade, acesso difícil e exposição ao sol podem exigir proteção ou alterar a estratégia de montagem. A proposta deve indicar posição, ventilação, grau de proteção, distância dos cabos e como será feita a inspeção.',
      'Monitoramento não é apenas um aplicativo. Defina quais dados serão vistos, quem receberá alarmes, por quanto tempo o histórico ficará disponível e como a equipe distinguirá baixa geração por clima, sombra, sujeira ou falha. Um alarme sem responsável e sem procedimento vira apenas uma notificação ignorada.',
      'Compare garantia de produto, garantia de instalação, assistência, peças, atualização de firmware e disponibilidade local. O menor preço de compra pode perder sentido se o equipamento exigir logística difícil ou se a empresa não souber diagnosticar a falha.',
      'A proteção externa deve ser compatível com o sistema e com a instalação. Seccionamento, DPS, aterramento, cabos, equipotencialização e proteção contra sobrecorrente devem ser especificados no conjunto. Não use uma lista universal de componentes sem verificar arquitetura e instruções do fabricante.',
      'No comissionamento, registre modelo, número de série, parâmetros, tensão, corrente, alarmes, comunicação e testes. Entregue o acesso ao monitoramento e explique quais sinais exigem parada imediata. Essa documentação reduz tempo de diagnóstico e protege a garantia.'
    ],
    checklist: ['conferir tensão e corrente MPPT;', 'comparar strings, orientações e sombras;', 'avaliar ambiente e acesso para manutenção;', 'definir monitoramento e responsável por alarmes;', 'comparar garantia e assistência;', 'compatibilizar proteções e aterramento;', 'registrar parâmetros e testes de comissionamento;'],
    questions: [
      ['Maior eficiência resolve qualquer projeto?', 'Não. Eficiência é apenas um critério. Compatibilidade elétrica, sombras, manutenção, garantia, ambiente e arquitetura também determinam o resultado.'],
      ['Microinversor é sempre melhor?', 'Não. Pode fazer sentido em determinadas orientações e sombras, mas a decisão depende do telhado, custo, acesso e estratégia de expansão.'],
      ['O aplicativo prova que o sistema está saudável?', 'Ele ajuda, mas precisa ser interpretado com produção, alarmes, faturas e inspeção. Monitoramento não substitui diagnóstico técnico.']
    ],
    summary: 'O inversor certo é o que fecha com os módulos, a rede, o ambiente, o objetivo do sistema e a capacidade de suporte depois da instalação.'
  },
  'energia-solar-vale-a-pena-no-nordeste': {
    heading: 'Como avaliar viabilidade solar no Nordeste com cenários',
    sections: [
      'O bom recurso solar do Nordeste é uma vantagem, mas não elimina as variáveis do projeto. Irradiância local, temperatura, sombras, orientação, sujeira, perdas, tarifa, conexão e perfil de consumo precisam entrar na análise. A região favorece a geração, porém cada telhado e cada unidade consumidora têm um resultado diferente.',
      'Comece pelo consumo em kWh e não somente pelo valor da fatura. A tarifa pode mudar, componentes podem permanecer e o consumo pode ser sazonal. Um imóvel com conta alta por uma tarifa específica não necessariamente precisa da mesma potência de outro com consumo diferente e mais uso durante o dia.',
      'Monte pelo menos três cenários: conservador, esperado e sensível. Varie produção, consumo, tarifa, manutenção, degradação, financiamento e disponibilidade. A finalidade não é adivinhar o futuro, mas mostrar quais premissas controlam o retorno e o que aconteceria se elas fossem diferentes.',
      'O horizonte de permanência importa. Se o proprietário pretende vender, alugar, mudar a operação ou ampliar a carga, o valor percebido do sistema e a forma de recuperar o investimento mudam. Inclua documentação, garantia, transferência, manutenção e possibilidade de expansão na decisão.',
      'A proposta deve separar investimento, economia bruta, economia líquida e cobranças que continuam. Também deve informar se a simulação usa geração estimada, histórico real, tarifa atual ou hipótese de reajuste. Sem essa separação, um payback bonito pode esconder custos importantes.',
      'No Nordeste, logística e ambiente merecem atenção. Distância, acesso, poeira, maresia, calor, corrosão e disponibilidade de assistência podem afetar obra e manutenção. A empresa deve explicar como escolheu estrutura, cabos, proteções, local do inversor e rotina de inspeção.',
      'Compare integradoras pelo escopo, não apenas pelo preço por kWp. Verifique projeto, responsabilidade técnica, equipamentos, garantias, adequações, conexão, comissionamento, monitoramento e suporte. Uma proposta mais cara pode incluir itens que a mais barata deixou condicionais ou fora do contrato.',
      'A viabilidade deve ser revisada quando a regra, a tarifa, o consumo ou o financiamento mudar. O estudo não é uma promessa eterna: é uma decisão baseada em informações que precisam ser atualizadas quando o contexto muda.'
    ],
    checklist: ['usar consumo histórico em kWh;', 'considerar sombras, temperatura e sujeira;', 'montar cenários conservador e esperado;', 'incluir manutenção e financiamento;', 'separar economia bruta e líquida;', 'avaliar logística e assistência regional;', 'comparar escopo completo das propostas;'],
    questions: [
      ['O Nordeste garante payback menor?', 'O recurso solar pode favorecer a geração, mas o retorno depende de tarifa, consumo, preço, financiamento, perdas e regras. Não há prazo universal.'],
      ['Posso usar uma calculadora online?', 'Pode para triagem, desde que os dados e as premissas sejam transparentes. O projeto final exige vistoria e proposta detalhada.'],
      ['Preço por kWp basta para comparar?', 'Não. Escopo, equipamentos, estrutura, conexão, garantias, obra e suporte alteram o valor real da contratação.']
    ],
    summary: 'Energia solar vale a pena quando o projeto fecha com o consumo, o imóvel, o orçamento e um cenário financeiro transparente.'
  },
  'quanto-custa-instalar-energia-solar': {
    heading: 'Como transformar preço de energia solar em orçamento comparável',
    sections: [
      'O preço de uma instalação fotovoltaica é formado por mais do que módulos. Equipamentos, estrutura, inversor, cabos, proteções, projeto, responsabilidade técnica, mão de obra, logística, acesso, adequação do padrão, conexão e pós-venda podem aparecer em linhas diferentes ou escondidos em uma única parcela.',
      'A potência do sistema é apenas uma das variáveis. Telhado complexo, distância entre módulos e quadro, necessidade de andaime, substituição de padrão, reforço estrutural, terreno, obra civil e rota de cabos alteram o orçamento. Duas propostas com o mesmo kWp podem ter custos e riscos de execução muito diferentes.',
      'Peça uma proposta com premissas escritas: consumo considerado, geração estimada, marcas e modelos, quantidade, posição, perdas, garantias, cronograma, testes e limites. Se houver item condicional, como adequação elétrica ou reforço de telhado, defina como será medido e aprovado antes da execução.',
      'Separe preço à vista de custo financiado. Entrada, juros, tarifas, seguros, carência, prazo e custo efetivo total podem mudar completamente a comparação. A economia mensal não deve ser comparada apenas com a parcela sem considerar a fatura residual e o custo total do crédito.',
      'O contrato deve dizer quem providencia projeto, ART ou documento equivalente, protocolo, acompanhamento, troca de medidor, vistoria, comissionamento e entrega. Também deve explicar o que ocorre se a distribuidora solicitar alteração, se o telhado não suportar a solução ou se o prazo depender de terceiro.',
      'Garantias precisam ser separadas. Equipamento, potência do módulo, instalação, estrutura, impermeabilização, inversor e atendimento podem ter prazos e condições diferentes. Verifique quem aciona o fabricante e se a assistência permanece disponível caso a empresa integradora deixe de operar.',
      'Use uma matriz de comparação com pelo menos preço total, potência, geração estimada, equipamento, escopo, prazo, garantia, manutenção e exclusões. Essa tabela torna visível quando uma proposta menor retirou proteções, projeto, acabamento ou suporte.',
      'Um orçamento bom não promete que nenhum custo adicional surgirá. Ele explica quais incertezas existem, como serão tratadas e qual evidência autoriza uma alteração. Transparência sobre condicionais vale mais do que uma faixa muito baixa usada para ganhar a primeira conversa.'
    ],
    checklist: ['solicitar consumo e premissas da simulação;', 'separar equipamentos e serviços;', 'conferir adequações elétricas e estruturais;', 'comparar financiamento pelo custo total;', 'verificar garantias e assistência;', 'registrar itens condicionais e exclusões;', 'comparar propostas em uma matriz única;'],
    questions: [
      ['Existe preço médio confiável?', 'Faixas ajudam na triagem, mas o preço final depende do imóvel, potência, equipamentos, logística, obra e escopo. Vistoria é necessária.'],
      ['Mais módulos significam melhor proposta?', 'Não. O sistema precisa ser compatível com consumo, área, inversor, rede e regras. Quantidade isolada não mede qualidade.'],
      ['Homologação está sempre incluída?', 'Não. O contrato precisa dizer quem prepara, protocola, acompanha e corrige pendências do processo de conexão.']
    ],
    summary: 'Compare o custo total de uma entrega técnica completa, não apenas o preço do kit ou o valor da parcela.'
  },
  'em-quanto-tempo-a-energia-solar-se-paga': {
    heading: 'Como calcular payback solar sem esconder premissas',
    sections: [
      'Payback simples é uma forma de estimar quanto tempo a economia acumulada levaria para alcançar o investimento. Ele ajuda a comparar alternativas, mas não representa sozinho o retorno financeiro, o custo de oportunidade, a inflação, a manutenção ou o risco de a geração e o consumo mudarem.',
      'O cálculo deve partir do investimento efetivo e da economia líquida. Desconte cobranças que continuam, manutenção, seguro, monitoramento, reposição de componentes e eventual custo financeiro. Se usar economia bruta, nomeie assim e não apresente o resultado como prazo final de recuperação.',
      'A geração estimada precisa ser ligada ao consumo e à tarifa. Uma usina pode produzir bastante energia, mas o benefício depender de quando o imóvel consome, de como o excedente é tratado e de quais componentes da fatura permanecem. Mostre kWh, tarifa, consumo instantâneo e excedente.',
      'Use análise de sensibilidade. Reduza a geração, aumente o consumo, altere o reajuste tarifário, inclua indisponibilidade e simule custo de manutenção. Se o resultado continuar aceitável em cenários conservadores, a decisão é mais resistente a surpresas do que uma promessa baseada em um único número.',
      'Financiamento exige uma camada separada. Compare fluxo de caixa da parcela, fatura residual, entrada, juros e custo efetivo total. Um payback contábil do sistema não significa que a prestação será menor que a economia todos os meses.',
      'O horizonte do imóvel também entra no cálculo. Se o consumidor pode mudar, vender ou ampliar a instalação, considere transferência, valorização, documentação, garantia e necessidade de adaptar o sistema. Um retorno interessante em dez anos pode não ser adequado para um uso temporário.',
      'Depois da instalação, atualize a simulação com dados reais. Compare produção, faturas, indisponibilidade e mudanças de consumo. O objetivo do acompanhamento é identificar desvios e melhorar a decisão, não reescrever o passado para fazer o número original parecer correto.',
      'Quando uma proposta usa prazo fixo, peça as premissas por escrito. Pergunte se o valor considera tarifa atual, geração ideal, degradação, custo de capital, cobranças residuais e manutenção. A transparência permite comparar propostas diferentes na mesma base.'
    ],
    checklist: ['definir investimento total;', 'calcular economia líquida mensal;', 'separar payback simples e descontado;', 'simular variações de geração e consumo;', 'incluir financiamento e manutenção;', 'considerar horizonte de permanência;', 'recalcular com dados após a instalação;'],
    questions: [
      ['Qual é o payback normal?', 'Não existe um prazo universal. O resultado depende de preço, consumo, tarifa, geração, financiamento, manutenção e regras vigentes.'],
      ['Payback é igual a lucro?', 'Não. É uma métrica de recuperação do investimento. Retorno total exige considerar fluxo de caixa, vida útil, custos e valor residual.'],
      ['Posso confiar em uma simulação pronta?', 'Use-a como cenário, mas confira dados, premissas, cobranças residuais e sensibilidade antes de contratar.']
    ],
    summary: 'Um payback responsável é uma faixa explicada por premissas, não um prazo fixo usado como promessa comercial.'
  },
  'quanto-da-para-economizar-com-energia-solar': {
    heading: 'Como medir economia solar antes e depois do projeto',
    sections: [
      'A economia começa pela diferença entre o que o imóvel pagaria sem o sistema e o que efetivamente paga depois. Para estimar isso, use consumo em kWh, tarifa, geração, autoconsumo, excedente e cobranças residuais. Um percentual isolado não mostra qual parte da fatura mudou nem por que a conta pode variar.',
      'Consumo instantâneo costuma ter valor diferente de excedente. Quando a geração coincide com o uso, o imóvel evita comprar energia naquele momento; quando sobra, o tratamento segue as regras aplicáveis. O perfil horário da empresa ou residência pode ser tão importante quanto a potência instalada.',
      'O cálculo deve considerar sazonalidade. Chuva, nuvens, temperatura, férias, produção industrial, ar-condicionado e mudanças de turno alteram geração e consumo. Compare médias e meses equivalentes para evitar concluir que um único ciclo representa o desempenho anual.',
      'A fatura não é composta somente pela energia compensável. Componentes fixos, iluminação pública, disponibilidade, demanda, tributos ou cobranças específicas podem permanecer conforme a classe e as regras. A proposta precisa apresentar o valor residual e explicar o que entra ou não na compensação.',
      'Depois da instalação, registre leitura, geração do inversor, créditos, consumo e valor pago. Se a economia ficar abaixo da expectativa, investigue em ordem: conexão, produção, sombreamento, sujeira, consumo maior, leitura, tarifa e premissas. Sem esse diagnóstico, trocar equipamento pode atacar a causa errada.',
      'A economia também pode ser operacional. Em um comércio, reduzir consumo em horário caro ou deslocar carga pode ter efeito diferente de simplesmente gerar mais kWh. Em uma indústria, demanda e fator de carga podem merecer análise específica. O conteúdo da proposta deve respeitar a modalidade da unidade.',
      'Evite usar “conta zero” como objetivo automático. Uma fatura menor pode ser um bom resultado, mas a decisão deve considerar investimento, manutenção, crédito, eventuais obras e comportamento futuro do consumo. A transparência protege tanto o consumidor quanto a qualidade da venda.',
      'Revise a simulação quando houver mudança de tarifa, regra, consumo ou ampliação. Um cálculo datado e documentado é mais útil que uma promessa permanente. Guarde as faturas e os relatórios para comparar o resultado e decidir quando fazer manutenção ou expansão.'
    ],
    checklist: ['usar histórico de faturas em kWh;', 'separar autoconsumo e excedente;', 'identificar cobranças residuais;', 'considerar sazonalidade e perfil horário;', 'medir geração e consumo após a instalação;', 'investigar desvios antes de trocar equipamentos;', 'atualizar simulação quando o contexto mudar;'],
    questions: [
      ['A economia pode chegar a 100%?', 'Não deve ser prometida universalmente. O resultado depende da geração, consumo, tarifa, regras e cobranças que permanecem.'],
      ['Crédito é igual a dinheiro?', 'Não necessariamente. Crédito de energia segue regras próprias e não deve ser tratado automaticamente como recebimento em espécie.'],
      ['Por que a geração está boa e a economia não?', 'Consumo, tarifa, fatura residual, leitura, perfil horário e regras podem explicar o resultado. É preciso comparar toda a cadeia.']
    ],
    summary: 'Meça economia com dados de energia, tarifa e fatura; percentuais sem premissas não são uma análise financeira.'
  },
  'energia-solar-funciona-em-dia-nublado': {
    heading: 'Como interpretar a geração solar em dias nublados',
    sections: [
      'Módulos fotovoltaicos usam radiação, inclusive a parcela difusa que atravessa ou se espalha pelas nuvens. Em um dia nublado, a potência instantânea tende a cair e pode oscilar rapidamente, mas não significa necessariamente geração zero. A curva do sistema precisa ser interpretada junto com clima, horário e orientação.',
      'Nuvem espessa, chuva, neblina e sombra de objetos têm efeitos diferentes. Uma sombra fixa pode reduzir uma parte do arranjo por muitas horas; uma nuvem pode passar e alterar toda a usina. Monitoramento, imagens e comparação com outros dias ajudam a diferenciar causa climática de falha técnica.',
      'Temperatura também afeta o comportamento dos módulos e do inversor. Mais calor não significa automaticamente mais produção. A análise anual deve usar dados de irradiância, temperatura, orientação, perdas e disponibilidade, e não apenas um pico observado em um dia aberto.',
      'Para avaliar uma queda, acompanhe kWh por dia e por mês, potência de pico, horas de operação e alarmes. Compare com períodos equivalentes e com a expectativa do projeto. Um dia isolado raramente justifica intervenção, mas um padrão persistente fora do clima pode exigir inspeção.',
      'Sujeira, fezes de aves, folhas e maresia podem reduzir a captação e produzir sombras locais. Se o sistema está em ambiente com poeira ou poluição, registre fotos e relacione limpeza a desempenho. Não lave o painel apenas porque choveu pouco: o depósito aderido pode continuar.',
      'O inversor pode limitar a saída por proteção, temperatura, tensão de rede ou falha de comunicação. A tela do aplicativo deve ser lida com os códigos de alarme e o manual. Reiniciar sem investigar pode apagar evidências úteis e não resolve a causa.',
      'O projeto pode usar séries históricas e perdas estimadas para trabalhar com a variabilidade. Uma estimativa responsável não promete a mesma produção todos os dias; mostra uma expectativa anual e explica como clima e operação podem afastar o resultado de um mês específico.',
      'A melhor decisão é acompanhar tendência. Se a geração cai apenas com uma frente de chuva, o comportamento pode ser normal. Se cai em dias semelhantes, em uma string específica ou junto com aquecimento e alarmes, registre o evento e peça diagnóstico antes de concluir que é apenas “tempo fechado”.'
    ],
    checklist: ['diferenciar nuvem de sombra fixa;', 'acompanhar kWh e não só potência instantânea;', 'comparar dias e meses equivalentes;', 'verificar alarmes do inversor;', 'observar sujeira e depósitos aderidos;', 'considerar temperatura e disponibilidade;', 'acionar diagnóstico diante de tendência persistente;'],
    questions: [
      ['Painel gera com chuva?', 'Pode gerar enquanto houver radiação, mas a potência tende a ser menor e variável. Chuva não garante limpeza completa.'],
      ['Nublado significa defeito?', 'Não. A queda pode ser normal, mas o padrão deve ser comparado com clima, histórico e curvas de produção.'],
      ['Como saber se é sombra?', 'Observe horário, local, recorrência e monitoramento por string ou módulo. Uma vistoria confirma a causa.']
    ],
    summary: 'Analise geração como série de dados, separando clima, sombra, sujeira, rede e falhas de equipamento.'
  },
  'painel-solar-precisa-de-limpeza': {
    heading: 'Como decidir quando a limpeza do painel realmente compensa',
    sections: [
      'A frequência de limpeza depende do ambiente e do módulo. Poeira, fuligem, maresia, pólen, folhas, fezes de aves, inclinação, chuva e proximidade de estradas alteram a velocidade de acúmulo. Um calendário fixo pode gerar serviço desnecessário em um telhado e deixar outro perder produção por tempo demais.',
      'Antes de limpar, confirme se a perda é realmente sujeira. Compare produção com períodos equivalentes, verifique alarmes, strings, sombras novas e disponibilidade do inversor. Se a queda não mudar após a lavagem, o problema pode estar em conexão, equipamento, cobertura ou condição climática.',
      'O acesso é parte da avaliação. Trabalho em altura exige planejamento, equipamento, proteção coletiva ou individual, isolamento da área e procedimento compatível. Uma limpeza barata não compensa se aumenta risco de queda, quebra de telha, infiltração ou dano ao próprio painel.',
      'Use materiais e método compatíveis com o fabricante. Não caminhe sobre os módulos, não use produtos abrasivos, não force conectores e não aplique água em condições que criem choque térmico ou risco elétrico. Quando houver dúvida sobre o método, consulte o manual e um profissional.',
      'A água da região também importa. Água com muitos minerais pode deixar manchas após secagem; pressão excessiva pode danificar vedações e conexões. O procedimento deve indicar equipamento, temperatura, horário, secagem e inspeção posterior, não apenas “lavar as placas”.',
      'Registre antes e depois com fotos, kWh, data, clima e observações. Se houver melhora, estime o benefício com cautela; a produção pode variar por causa do tempo. Se não houver melhora, não repita a limpeza indefinidamente: encaminhe a investigação para o sistema elétrico.',
      'A limpeza pode ser combinada com inspeção visual de estrutura, cabos, fixações, corrosão e drenagem, sem transformar o serviço em laudo completo. Declare o que foi observado e o que não foi medido. Isso evita que o cliente interprete uma lavagem como certificação da usina.',
      'Para contratos recorrentes, defina gatilhos de atendimento: queda de desempenho, depósito visível, ambiente de alta sujidade ou periodicidade baseada em histórico. A decisão fica mais econômica quando o custo do serviço é comparado com a perda provável e com o risco da operação.'
    ],
    checklist: ['identificar a causa provável da perda;', 'consultar manual do módulo;', 'planejar acesso e segurança em altura;', 'usar água e materiais compatíveis;', 'não caminhar sobre os painéis;', 'registrar produção antes e depois;', 'separar limpeza de inspeção elétrica;'],
    questions: [
      ['Preciso limpar todo mês?', 'Não existe frequência universal. Ambiente, sujeira, chuva, inclinação e dados de produção devem definir a rotina.'],
      ['A chuva limpa o painel?', 'Pode remover parte da poeira, mas não necessariamente depósitos aderidos, folhas, fezes ou resíduos de maresia.'],
      ['Posso fazer a limpeza sozinho?', 'Se houver risco de altura ou contato elétrico, não. A operação deve considerar acesso, proteção e método seguro.']
    ],
    summary: 'Limpeza é manutenção baseada em condição: confirme a causa, opere com segurança e meça o efeito sem prometer ganho fixo.'
  },
  'quanto-tempo-duram-os-paineis-solares': {
    heading: 'Como preservar a vida útil de uma usina solar',
    sections: [
      'Vida útil não é uma data em que o painel deixa de funcionar. Módulos podem continuar gerando após o prazo comercial de garantia, mas potência, integridade, isolamento, conexões, estrutura e segurança devem ser acompanhados. O sistema envelhece por componentes e ambientes diferentes, não como uma peça única.',
      'A degradação depende de tecnologia, ciclos térmicos, umidade, vento, granizo, maresia, amônia, instalação e manutenção. A ficha do fabricante informa condições e garantias específicas. Compare potência esperada com produção medida, mas não atribua toda queda à degradação sem investigar sujeira, sombra, falha ou indisponibilidade.',
      'Inversor, cabos, conectores, DPS, disjuntores, estrutura e vedação podem exigir atenção antes dos módulos. O plano de manutenção deve prever inspeção visual, alarmes, termografia ou medições quando aplicáveis, reaperto conforme procedimento e verificação de corrosão e infiltração.',
      'Guarde datasheets, notas, números de série, garantias, projeto, fotos de instalação e relatórios. Sem documentação, um acionamento de garantia fica mais lento e a equipe pode não saber quais componentes foram usados. Um inventário simples reduz dependência de memória e facilita substituições.',
      'O ambiente de instalação define cuidados. Cobertura quente, maresia, poeira, fezes de aves, sombreamento criado por crescimento de árvores e acesso difícil podem reduzir desempenho e acelerar desgaste. Inclua esses fatores na vistoria e na rotina, em vez de tratar o módulo como livre de manutenção.',
      'Quando um painel ou inversor falha, avalie impacto, causa e compatibilidade da substituição. Misturar equipamentos sem conferir tensão, corrente, string, comunicação e garantia pode criar nova perda. A troca deve manter rastreabilidade e atualizar desenhos e registros.',
      'A garantia de potência não é garantia de uma economia específica. Ela possui condições, método de medição, tolerância e prazos. Também não substitui a garantia de instalação, estrutura ou impermeabilização. Leia os documentos antes de assumir que tudo tem a mesma cobertura.',
      'Planeje financeiramente reposições e manutenção. Uma reserva anual pequena pode ser mais realista do que esperar uma usina sem custo durante décadas. O acompanhamento contínuo aumenta a chance de detectar desvio cedo, quando a correção costuma ser menor.'
    ],
    checklist: ['separar vida útil e garantia;', 'inventariar módulos e componentes;', 'acompanhar produção e alarmes;', 'inspecionar corrosão, conexões e estrutura;', 'guardar documentos e números de série;', 'verificar compatibilidade em substituições;', 'reservar orçamento para manutenção;'],
    questions: [
      ['Painel dura exatamente 25 anos?', 'O número costuma ser referência de projeto ou garantia, não promessa de potência constante. A condição depende do equipamento e do ambiente.'],
      ['O inversor dura tanto quanto o painel?', 'Não necessariamente. Ele possui outra arquitetura, ambiente e ciclo de vida e pode exigir manutenção ou substituição antes.'],
      ['Produção menor prova degradação?', 'Não. Sombra, sujeira, falha, rede e indisponibilidade também reduzem produção. Faça diagnóstico antes de concluir.']
    ],
    summary: 'Durabilidade vem de equipamento adequado, ambiente conhecido, documentação e manutenção baseada em sinais reais do sistema.'
  },
  'energia-solar-funciona-sem-luz': {
    heading: 'Como projetar energia solar para apagões e cargas críticas',
    sections: [
      'O sistema on-grid comum desliga quando a rede cai porque não pode continuar energizando uma rede externa sem referência e controle. Os painéis podem estar recebendo luz, mas o inversor interrompe a operação por segurança. Ter placas no telhado, portanto, não significa ter energia durante qualquer apagão.',
      'Para manter cargas críticas, defina primeiro o serviço. Internet, iluminação, portão, geladeira, bomba, servidor ou equipamento médico têm potências e autonomias diferentes. Liste potência contínua, pico de partida, horas necessárias e o que pode ser desligado para preservar bateria.',
      'O quadro de cargas críticas separa circuitos prioritários dos circuitos de conforto. Essa divisão limita a potência e ajuda o usuário a entender o que ficará disponível. Alimentar a casa inteira pode exigir bateria e inversor muito maiores, especialmente quando há ar-condicionado, motores, chuveiro ou forno.',
      'A autonomia é energia útil, não apenas capacidade nominal. Profundidade de descarga, eficiência, temperatura, envelhecimento, reserva, potência simultânea e estratégia de controle reduzem o valor disponível. Calcule a bateria com cenário de uso e não com uma multiplicação simples de kWh.',
      'A transferência precisa ser segura e previsível. Verifique tempo de comutação, sincronismo, anti-ilhamento, retorno da rede, proteção, aterramento, ventilação e comportamento quando a bateria está baixa. Teste o modo de backup em condições controladas e documente o procedimento para o usuário.',
      'Um gerador pode fazer parte da estratégia, mas exige compatibilidade e comando. A integração deve considerar neutro, fases, frequência, proteção, combustível, ruído e manutenção. Não conecte fontes diferentes por improviso ou extensão; a arquitetura deve impedir paralelismo indevido.',
      'Monitoramento deve mostrar estado da rede, bateria, carga, geração, alarmes e eventos de transferência. O responsável precisa saber se o sistema está em backup, se há reserva e quando reduzir consumo. Sem essa informação, a autonomia pode acabar antes que o usuário perceba.',
      'Depois da instalação, simule apagões e revise a lista de cargas quando a rotina mudar. Um novo freezer, bomba ou carregador de veículo pode superar o projeto original. A continuidade é um serviço que precisa ser testado e mantido, não uma promessa permanente após a compra.'
    ],
    checklist: ['listar cargas críticas;', 'medir potência contínua e de partida;', 'definir autonomia e reserva;', 'separar quadro de cargas essenciais;', 'verificar transferência e anti-ilhamento;', 'testar bateria baixa e retorno da rede;', 'treinar usuário e registrar o procedimento;'],
    questions: [
      ['O on-grid comum funciona no apagão?', 'Normalmente não. Ele desliga para proteger a rede. Backup exige inversor, armazenamento e separação de cargas adequados.'],
      ['Posso ligar qualquer aparelho no backup?', 'Somente dentro da potência, partida e prioridade previstas. Motores e aquecedores podem consumir muito mais que cargas eletrônicas.'],
      ['Bateria grande garante autonomia?', 'Não sozinha. Perdas, potência simultânea, reserva, envelhecimento e comportamento das cargas também determinam o tempo.']
    ],
    summary: 'Backup solar é um projeto de continuidade: cargas, potência, autonomia, transferência, proteção e testes precisam ser tratados em conjunto.'
  },
  'precisa-de-bateria-para-energia-solar': {
    heading: 'Como decidir se uma bateria solar faz sentido',
    sections: [
      'Bateria não é acessório obrigatório de todo sistema solar. Ela resolve um serviço específico: backup, deslocamento de consumo, operação sem rede, redução de demanda ou aproveitamento de geração em outro horário. Se o objetivo é apenas compensar energia com a rede, um sistema on-grid pode atender sem armazenamento.',
      'Comece perguntando por que a bateria está sendo considerada. Apagões frequentes, cargas críticas, tarifa horária, restrição de exportação e distância da rede levam a cálculos diferentes. Sem objetivo, é fácil comprar capacidade cara que não será usada ou insuficiente para a autonomia esperada.',
      'Dimensione energia e potência separadamente. A energia em kWh define por quanto tempo as cargas podem operar; a potência em kW define o que pode ligar simultaneamente e os picos de partida. Um banco com muita energia e pouca potência pode não iniciar uma bomba ou compressor.',
      'A capacidade nominal não é toda utilizável. Reserva, profundidade de descarga, eficiência, temperatura, envelhecimento e limite do inversor reduzem o valor disponível. A proposta deve mostrar capacidade útil, potência contínua, pico, ciclos, vida prevista e estratégia de reposição.',
      'O local de instalação precisa ser estudado. Temperatura, umidade, ventilação, acesso, risco de impacto, distância dos cabos e proteção contra incêndio influenciam segurança e manutenção. Bateria não deve ser tratada como um equipamento que pode ser colocado em qualquer armário.',
      'Compare custo total e serviço entregue. Inclua inversor compatível, quadro, proteções, instalação, monitoramento, manutenção, substituição e descarte. Para backup, compare também o custo de interrupção evitada; para economia, compare o ganho adicional com a alternativa de consumir diretamente.',
      'A operação da bateria depende de configuração. Defina reserva mínima, horários, prioridade de cargas, comportamento em apagão e condição de retorno. O usuário deve saber quando preservar energia e quando o sistema pode usar toda a capacidade para reduzir custo.',
      'Faça revisão periódica. A bateria envelhece, as cargas mudam e o perfil de tarifa pode ser alterado. Teste autonomia com segurança, acompanhe temperatura e alarmes e mantenha registros de ciclos. O melhor investimento é aquele cujo benefício é medido e ainda faz sentido na rotina.'
    ],
    checklist: ['definir objetivo da bateria;', 'separar energia e potência;', 'calcular capacidade útil e reserva;', 'verificar ambiente e segurança;', 'compatibilizar inversor e proteções;', 'incluir substituição e descarte no custo;', 'testar operação e autonomia;'],
    questions: [
      ['Toda energia solar precisa de bateria?', 'Não. Em muitos sistemas conectados, a rede atende períodos sem sol e o armazenamento não é necessário para o objetivo principal.'],
      ['Bateria garante energia a noite toda?', 'Depende das cargas, capacidade útil, potência, perdas e reserva. Autonomia precisa ser dimensionada para o cenário real.'],
      ['A bateria sempre reduz a conta?', 'Não. O benefício financeiro depende de tarifa, perfil de consumo, eficiência, custo e regras. Às vezes o motivo principal é continuidade.']
    ],
    summary: 'A bateria faz sentido quando entrega um serviço mensurável que justifica custo, segurança, manutenção e reposição.'
  },
  'energia-solar-para-supermercados': {
    heading: 'Como avaliar energia solar em supermercados sem olhar só o telhado',
    sections: [
      'Supermercados têm consumo contínuo e cargas críticas, mas o perfil varia com horário, refrigeração, iluminação, climatização, padaria, açougue e câmaras. O diagnóstico deve cruzar faturas, demanda, horários de funcionamento e expansão prevista. A potência solar precisa conversar com o consumo real e com a capacidade da cobertura.',
      'A refrigeração merece atenção especial. Compressores, condensadores e motores têm partidas, ciclos e exigências de continuidade diferentes de iluminação ou tomadas. Um sistema fotovoltaico pode reduzir compra de energia, mas não substitui automaticamente gerador, nobreak ou redundância para preservar alimentos durante falhas da rede.',
      'A cobertura precisa ser vistoriada por estrutura, impermeabilização, acesso, carga, sombras, drenagem e interferência com exaustão ou equipamentos de ar-condicionado. Em lojas alugadas, confirme prazo de ocupação, autorização do proprietário e responsabilidade por manutenção ou remoção futura.',
      'A implantação não pode comprometer operação, segurança alimentar e circulação. Planeje áreas de trabalho, isolamento, horários, rotas de material, risco de queda, desligamentos e comunicação com a loja. O cronograma deve considerar períodos de maior movimento e restrições de acesso ao telhado.',
      'A proposta deve mostrar geração, autoconsumo, excedente, demanda, economia líquida e custos residuais. Em unidades com várias lojas ou medição compartilhada, explique como os créditos e responsabilidades serão tratados. Não use um percentual de redução universal para perfis comerciais diferentes.',
      'O projeto elétrico deve avaliar quadros, transformadores, proteção, seletividade, aterramento, distância, padrão e integração com gerador ou automação. Alterações sem coordenação podem produzir desligamentos, alarmes ou dificuldade de manutenção. A documentação precisa ser entregue para a equipe da loja.',
      'O monitoramento deve permitir separar falha de geração, aumento de consumo e alteração tarifária. Defina quem recebe alarmes, quem aciona manutenção e qual indicador será acompanhado. Um painel com kWh sem contexto não informa se a operação comercial está capturando o benefício esperado.',
      'Depois da implantação, compare o resultado com meses equivalentes e registre mudanças de horário, equipamentos e área refrigerada. O sistema pode ser ampliado quando o consumo crescer, mas expansão exige revisar estrutura, inversor, conexão e contrato. A viabilidade é uma rotina de gestão, não apenas um cálculo inicial.'
    ],
    checklist: ['analisar faturas, demanda e horários;', 'mapear cargas de refrigeração e motores;', 'vistoriar cobertura e impermeabilização;', 'planejar obra sem interromper operação crítica;', 'compatibilizar gerador, quadros e proteções;', 'definir monitoramento e responsáveis;', 'medir resultado por meses equivalentes;'],
    questions: [
      ['Solar mantém refrigeração no apagão?', 'Não automaticamente. Continuidade exige backup dimensionado para cargas e partidas, além de transferência e proteção adequadas.'],
      ['O telhado comercial suporta os módulos?', 'Somente uma avaliação estrutural e de cobertura pode confirmar. Área livre não prova capacidade.'],
      ['O percentual de economia é igual em toda loja?', 'Não. Horário, demanda, refrigeração, tarifa, geração e operação mudam o resultado.']
    ],
    summary: 'No supermercado, energia solar precisa ser analisada junto com refrigeração, operação, demanda, segurança e continuidade.'
  },
  'energia-solar-para-hospitais': {
    heading: 'Como planejar energia solar para hospitais e cargas críticas',
    sections: [
      'Hospitais não podem tratar energia solar como uma simples redução de consumo. O projeto precisa respeitar continuidade assistencial, cargas críticas, áreas técnicas, gerador, nobreak, redundância e protocolos de manutenção. A geração pode reduzir compra de energia, mas não substitui a arquitetura de emergência do estabelecimento.',
      'Separe cargas por prioridade e comportamento. Equipamentos médicos, suporte de vida, TI, refrigeração, climatização, bombas e áreas administrativas têm requisitos diferentes. Identifique o que depende de transferência imediata, o que pode ser desligado e o que deve permanecer em circuito redundante.',
      'A vistoria deve mapear cobertura, salas elétricas, transformadores, quadros, rotas, aterramento, proteção contra surtos e interfaces com gerador. Em ambiente hospitalar, acesso, poeira, ruído, controle de infecção e autorização de trabalho também fazem parte do planejamento da obra.',
      'A implantação deve ser faseada e coordenada com engenharia clínica, manutenção, segurança do trabalho e operação. Desligamentos precisam ser planejados, comunicados e testados. Um cronograma que ignora rotinas assistenciais pode gerar risco mesmo que o arranjo fotovoltaico esteja tecnicamente correto.',
      'A economia deve ser calculada por cenário de consumo e tarifa. Hospitais podem ter operação 24 horas, demanda significativa e cargas sazonais. Mostre produção, autoconsumo, excedente, perdas, custos residuais e o efeito de mudanças na ocupação ou na expansão de equipamentos.',
      'Proteções, equipotencialização, aterramento, seletividade, qualidade da energia e compatibilidade com emergência devem ser verificadas no projeto. A interface com gerador precisa evitar paralelismo indevido, instabilidade e comportamento inesperado durante transferência ou retorno da rede.',
      'Monitoramento deve ter disponibilidade, acesso controlado e histórico suficiente para auditoria. Alarmes precisam chegar à equipe correta, com procedimento de resposta. O hospital também deve guardar desenhos, parâmetros, testes, garantias e registros de manutenção para não depender apenas do integrador.',
      'Após a entrada em operação, faça revisão conjunta dos dados de geração, demanda, eventos e alterações de carga. Se houver reforma, novo equipamento ou mudança de regime, reavalie o sistema. Em instalações críticas, o projeto precisa acompanhar a operação hospitalar ao longo do tempo.'
    ],
    checklist: ['classificar cargas críticas e não críticas;', 'mapear gerador, nobreak e transferências;', 'avaliar cobertura e rotas técnicas;', 'planejar obra com operação assistencial;', 'verificar proteção, aterramento e qualidade;', 'definir alarmes e resposta da manutenção;', 'reavaliar após expansão ou reforma;'],
    questions: [
      ['Solar substitui o gerador hospitalar?', 'Não. Geração fotovoltaica e geração de emergência têm funções diferentes e devem ser coordenadas.'],
      ['O sistema pode ser instalado com o hospital funcionando?', 'Muitas vezes sim, mas o cronograma precisa considerar áreas, acessos, desligamentos e protocolos internos.'],
      ['Economia é o único indicador?', 'Não. Continuidade, segurança, disponibilidade, manutenção e impacto operacional também são critérios relevantes.']
    ],
    summary: 'Em hospitais, a solução deve reduzir custos sem comprometer continuidade, segurança assistencial e coordenação com a infraestrutura de emergência.'
  },
  'energia-solar-para-condominios': {
    heading: 'Como organizar energia solar em condomínios',
    sections: [
      'O condomínio precisa definir o objetivo antes de escolher o sistema: reduzir áreas comuns, atender unidades, alimentar pontos específicos ou criar uma solução compartilhada. Cada modelo envolve medição, rateio, aprovação, espaço, responsabilidade e regras diferentes. O projeto não deve começar pela quantidade de módulos disponível na cobertura.',
      'A assembleia precisa receber informação comparável. Apresente consumo, investimento, geração estimada, economia líquida, custos de manutenção, garantias, prazo, riscos e responsabilidades. Uma apresentação baseada apenas em parcela mensal ou percentual de redução pode gerar aprovação sem que os moradores entendam o escopo.',
      'A cobertura e as áreas comuns devem ser vistoriadas por estrutura, impermeabilização, acesso, sombras, drenagem, antenas, reservatórios e futuras reformas. Confirme titularidade, autorização e condições para instalar, manter e remover equipamentos. Em condomínios, a obra precisa conviver com circulação e regras de segurança.',
      'O quadro elétrico e a medição definem como a energia será tratada. Verifique cargas comuns, centros de medição, padrão, transformadores, proteção, rota de cabos e possibilidade de expansão. A solução precisa explicar o que pertence ao condomínio e o que permanece responsabilidade de cada unidade.',
      'O rateio deve ser documentado. Defina critérios, cadastro de unidades, mudanças de proprietário, inadimplência, manutenção, créditos, consumo das áreas comuns e tratamento de vagas ou lojas. Uma boa engenharia não resolve sozinha um acordo de governança mal definido.',
      'A proposta deve separar investimento, obra, conexão, operação, limpeza, manutenção e reposição. Também deve dizer se há monitoramento, quem acessa dados, como a administradora recebe relatórios e como são aprovadas despesas futuras. Transparência evita conflito quando surgir um item não previsto.',
      'A instalação deve respeitar horários, isolamento de áreas, acesso ao telhado, segurança de moradores e comunicação da obra. Após a entrega, forneça manual, desenhos, garantias, treinamento e rotina de inspeção. O síndico não deve depender de mensagens informais para saber se a usina está operando.',
      'Reavalie o sistema quando houver reforma, aumento de carga, mudança na ocupação, criação de carregadores veiculares ou alteração das regras. O condomínio é uma instalação viva; o projeto deve registrar premissas e indicar quando uma nova análise será necessária.'
    ],
    checklist: ['definir objetivo e beneficiários;', 'preparar material transparente para assembleia;', 'vistoriar cobertura e áreas comuns;', 'mapear medição, quadros e rotas;', 'documentar rateio e responsabilidades;', 'separar obra, operação e manutenção;', 'entregar manual e rotina ao condomínio;'],
    questions: [
      ['Condomínio pode zerar a conta das áreas comuns?', 'O objetivo deve ser reduzir o custo conforme consumo, geração, tarifas e cobranças residuais. Não há garantia universal de conta zero.'],
      ['Todos os moradores precisam participar?', 'Depende do modelo aprovado, da medição e da estrutura jurídica do condomínio. A governança precisa ser definida antes da contratação.'],
      ['A cobertura é sempre suficiente?', 'Não. Estrutura, sombras, acesso, impermeabilização e área útil precisam ser avaliados.']
    ],
    summary: 'No condomínio, engenharia e governança caminham juntas: escopo, rateio, aprovação e manutenção precisam estar claros.'
  },
  'energia-solar-para-fazendas': {
    heading: 'Como dimensionar energia solar para fazendas e propriedades rurais',
    sections: [
      'O consumo rural costuma ser distribuído entre bombas, irrigação, ordenha, resfriamento, galpões, cercas, oficinas e moradia. Mapeie horário, potência de partida, sazonalidade e distância de cada carga. A mesma potência instalada pode ter resultados diferentes conforme a operação concentra consumo durante o dia ou exige autonomia noturna.',
      'Bombas e motores merecem estudo específico. Partida, frequência de acionamento, altura manométrica, vazão e possibilidade de controle alteram a demanda. Um sistema solar conectado pode reduzir energia comprada, mas não deve ser dimensionado apenas pela potência nominal da bomba sem analisar a rotina e a infraestrutura.',
      'A propriedade precisa de uma vistoria de rede e de terreno. Distâncias longas, postes, transformadores, cercas, vegetação, poeira, animais, acesso de máquinas e risco de descargas influenciam cabos, estruturas e proteções. A solução mais barata no arranjo pode perder sentido se exigir uma rota extensa ou manutenção difícil.',
      'Off-grid, híbrido e on-grid têm aplicações rurais diferentes. Local sem rede pode precisar de armazenamento e gerenciamento de cargas; uma fazenda conectada pode priorizar autoconsumo e compensação; uma carga crítica pode exigir gerador ou backup. Defina o serviço antes de decidir a arquitetura.',
      'O ambiente rural exige rotina de inspeção. Poeira, fezes de aves, vegetação, corrosão, roedores, umidade e acesso limitado podem afetar módulos, cabos e quadros. Planeje limpeza quando os dados indicarem necessidade, proteção mecânica, sinalização e procedimento para manutenção sem interromper a operação.',
      'A proposta deve incluir sazonalidade da produção e da atividade. Irrigação de uma safra pode aumentar consumo em certos meses; criação ou expansão pode mudar o perfil. Use faturas e registros de operação, não apenas média anual, e explique o que acontece quando a carga futura não se confirma.',
      'Monitoramento remoto é especialmente valioso em propriedades extensas, mas precisa de comunicação confiável e responsável local. Registre alarmes, produção, indisponibilidade e visitas. A equipe deve saber desligar, isolar e comunicar um problema sem improvisar em área rural.',
      'Após a instalação, acompanhe geração por local e consumo por atividade quando possível. A expansão deve revisar transformador, padrão, cabos, armazenamento e conexão. Um projeto rural robusto é modular, documentado e compatível com a realidade de manutenção da propriedade.'
    ],
    checklist: ['mapear bombas, motores e horários;', 'considerar partida e distância das cargas;', 'avaliar terreno, poeira e acesso;', 'definir on-grid, híbrido ou off-grid;', 'planejar proteção mecânica e manutenção;', 'usar faturas e sazonalidade da operação;', 'definir monitoramento e responsável local;'],
    questions: [
      ['Solar consegue alimentar bomba diretamente?', 'Depende da arquitetura, potência, controle, armazenamento e condições de operação. O sistema precisa ser dimensionado para partida e rotina.'],
      ['Propriedade rural precisa de bateria?', 'Somente quando autonomia, backup ou ausência de rede justificar. Em sistema conectado, pode não ser necessária para economia.'],
      ['Distância dos módulos importa?', 'Sim. Ela afeta cabos, perdas, custo, proteção, queda de tensão e manutenção.']
    ],
    summary: 'Em fazendas, consumo, distância, motores, sazonalidade e acesso de manutenção determinam a solução mais viável.'
  },
  'como-escolher-uma-empresa-de-energia-solar': {
    heading: 'Como comparar empresas de energia solar com critérios verificáveis',
    sections: [
      'Escolher uma empresa começa por confirmar se ela entendeu o imóvel. Antes de comparar preço, veja se houve vistoria ou se a proposta foi feita apenas com uma conta. Pergunte sobre telhado, sombras, padrão, quadro, consumo futuro, acesso, conexão e limitações. Uma proposta genérica revela pouco sobre a capacidade de execução.',
      'A experiência precisa ser relevante para o seu tipo de projeto. Residência, comércio, indústria, condomínio, fazenda e hospital têm exigências diferentes. Peça exemplos compatíveis, mas confirme o que a empresa realmente entregou: projeto, instalação, documentação, monitoramento e pós-venda, não apenas fotos de módulos.',
      'Compare o escopo técnico. Marcas e modelos, potência, geração estimada, estrutura, proteções, cabos, inversor, responsabilidade técnica, ART ou documento aplicável, comissionamento e conexão devem aparecer. Itens condicionais, como reforço de telhado ou mudança de padrão, precisam ter critério de aprovação.',
      'Verifique garantias sem confundir fabricante e integradora. Saiba quem responde por módulo, inversor, instalação, estrutura, impermeabilização e atendimento. Peça procedimento para acionar garantia, prazo de resposta e possibilidade de suporte quando o equipamento precisar de diagnóstico.',
      'A proposta financeira deve ser reproduzível. Confira investimento à vista, financiamento, entrada, juros, prazo, economia projetada, fatura residual e premissas. Desconfie de prazo de retorno fixo, percentual universal ou urgência comercial que impede leitura do contrato.',
      'A comunicação durante a obra é parte da qualidade. Defina cronograma, responsável, acesso ao imóvel, mudanças, testes, documentação e critérios de aceite. Uma empresa pode ter bom produto e ainda falhar na coordenação se o cliente não souber o que acontecerá em cada etapa.',
      'Pesquise reputação, mas não trate avaliações isoladas como prova. Procure padrões: atraso, suporte, infiltração, dificuldade de garantia, acabamento, documentação e resolução de problemas. Pergunte como a empresa lida com uma ocorrência, não apenas se tudo correu bem.',
      'A decisão final deve equilibrar risco, escopo, suporte e custo total. Uma proposta menor pode ser adequada se explicar claramente o que inclui; uma proposta maior pode ser ruim se não demonstrar premissas. Escolha a empresa que consegue tornar o projeto verificável antes, durante e depois da instalação.'
    ],
    checklist: ['confirmar vistoria e premissas;', 'buscar experiência no seu tipo de imóvel;', 'comparar equipamentos e escopo;', 'separar garantias e responsáveis;', 'reproduzir economia e payback;', 'definir cronograma e critérios de aceite;', 'avaliar suporte e pós-venda;'],
    questions: [
      ['Menor preço é melhor?', 'Não necessariamente. O escopo, a qualidade dos equipamentos, a segurança, as garantias e o suporte alteram o custo total.'],
      ['Preciso pedir três orçamentos?', 'Mais importante que a quantidade é comparar propostas na mesma base, com dados e entregas equivalentes.'],
      ['Foto de obra prova experiência?', 'Não sozinha. Peça detalhes do projeto, documentação, desafios e referências compatíveis com o seu caso.']
    ],
    summary: 'Escolha uma empresa pela capacidade de diagnosticar, documentar, executar e atender o sistema depois da entrega.'
  },
  'como-funciona-a-homologacao-da-energia-solar': {
    heading: 'Como organizar a homologação solar e reduzir pendências',
    sections: [
      'A homologação é o processo de conexão do sistema à rede conforme os requisitos da distribuidora. Ela não é apenas o envio de um formulário: envolve dados da unidade, projeto, equipamentos, responsabilidade técnica, análise, eventuais exigências, vistoria e troca ou adequação do medidor conforme o caso.',
      'O primeiro passo é confirmar titularidade, unidade consumidora, padrão, modalidade, tensão, demanda e documentos. Divergência de endereço, número de instalação, titular ou potência pode gerar pendência antes de a análise técnica começar. Um checklist inicial reduz retrabalho e troca de mensagens.',
      'O projeto deve refletir o que será instalado. Módulos, inversor, arranjo, proteções, diagrama, aterramento, padrão e potência precisam ser coerentes entre documento, equipamento e campo. Alterar modelo ou potência depois do protocolo pode exigir atualização e nova análise.',
      'A distribuidora pode solicitar informação adicional ou apontar adequação. O prazo e o resultado dependem do escopo, da documentação e do fluxo aplicável. A empresa deve informar qual etapa controla, qual depende da distribuidora e o que acontece se houver visita ou pendência.',
      'A vistoria de campo deve encontrar instalação identificada, acessível e compatível com o projeto. Proteções, cabos, medição, sinalização, aterramento, inversor e padrão merecem conferência. Um sistema instalado antes de a documentação estar coerente pode exigir desmontagem, alteração ou nova visita.',
      'O cliente deve receber protocolo, documentos enviados, pareceres, registros de exigência, evidências de correção e aprovação final. Sem essa pasta, fica difícil comprovar o processo, acionar garantia ou entender uma mudança futura. A entrega documental faz parte da qualidade da conexão.',
      'Homologação não deve ser vendida como prazo garantido ou aprovação automática. A condução organizada reduz risco de pendências, mas a distribuidora, a instalação e as condições do imóvel influenciam o tempo. O contrato precisa declarar limites e responsabilidades.',
      'Depois da conexão, atualize desenhos, etiquetas, cadastro e manual. Se houver expansão, bateria, novo inversor ou alteração de padrão, verifique se o processo precisa ser reapresentado. A documentação deve acompanhar o sistema ao longo da vida útil.'
    ],
    checklist: ['confirmar unidade e titularidade;', 'validar padrão, tensão e potência;', 'alinhar projeto e equipamentos;', 'registrar protocolo e exigências;', 'preparar instalação para vistoria;', 'entregar pareceres e aprovação;', 'revisar documentação em expansões;'],
    questions: [
      ['Quem faz a homologação?', 'Pode ser a integradora ou o responsável contratado, mas o contrato deve dizer quem prepara, protocola, acompanha e corrige pendências.'],
      ['Quanto tempo demora?', 'Depende da distribuidora, do tipo de conexão, da documentação, da instalação e de eventuais exigências. Não há prazo comercial universal.'],
      ['Posso mudar o inversor depois do protocolo?', 'Somente após verificar impacto documental e técnico. Alterações podem exigir atualização ou nova análise.']
    ],
    summary: 'Homologação bem conduzida depende de dados consistentes, projeto fiel, instalação preparada e documentação entregue ao cliente.'
  },
  'documentos-para-instalar-energia-solar': {
    heading: 'Como organizar documentos para instalar energia solar',
    sections: [
      'A documentação começa antes do orçamento. Separe faturas, dados da unidade consumidora, documentos do titular, informações do imóvel, fotos do padrão e do telhado, plantas quando existirem e histórico de alterações. Quanto melhor o briefing, menor a chance de o projeto ser baseado em suposição.',
      'O conjunto técnico costuma incluir proposta, memorial, diagrama, arranjo, especificações, fichas de equipamentos, proteções, responsabilidade técnica, registros de teste e documentos de conexão. A lista exata depende da distribuidora, da modalidade e do tipo de instalação, portanto deve ser confirmada para cada caso.',
      'Documentos do imóvel também podem ser relevantes. Em condomínio, há autorização, regras de acesso, aprovação e responsabilidade por cobertura ou áreas comuns. Em imóvel alugado, confirme consentimento e condições de remoção. Em empresas, envolva manutenção, segurança, patrimônio e financeiro para não criar conflito de escopo.',
      'A proposta deve distinguir documentos de projeto, documentos de execução e documentos de conexão. Uma planta preliminar não equivale ao as built; um protocolo não equivale à aprovação; uma nota fiscal não equivale ao certificado de garantia. Nomear cada entrega evita falsa sensação de completude.',
      'Guarde versões e datas. Se o arranjo, o inversor, a potência ou o padrão mudarem, arquive a versão anterior e identifique a versão final. Isso ajuda na manutenção, na garantia, na auditoria e em futura expansão. Arquivos editáveis também podem ser necessários para o responsável técnico.',
      'Após a instalação, peça relatório de comissionamento, testes, fotos, etiquetas, parâmetros, acesso ao monitoramento, garantias e manual. Confira se os números de série e modelos entregues coincidem com a documentação. A divergência pode complicar um atendimento futuro.',
      'Digitalize com organização simples: pasta de cliente, projeto, equipamentos, conexão, obra, garantia e manutenção. Use nomes de arquivo com data e versão. Documentação fácil de encontrar tem mais valor que uma pasta grande sem índice.',
      'Atualize o conjunto quando houver mudança. Novo inversor, bateria, carregador veicular, reforma de telhado ou aumento de carga pode alterar projeto e conexão. A documentação é uma ferramenta de operação, não apenas um pacote para a primeira aprovação.'
    ],
    checklist: ['separar faturas e dados da unidade;', 'reunir informações do imóvel;', 'confirmar documentos da distribuidora;', 'separar projeto, execução e conexão;', 'controlar versões e datas;', 'conferir modelos e números de série;', 'entregar manual, garantias e testes;'],
    questions: [
      ['Preciso de todos os documentos antes do orçamento?', 'Nem todos, mas um briefing básico evita estimativas frágeis e revela pendências que alteram o escopo.'],
      ['Protocolo significa aprovação?', 'Não. Protocolo comprova envio; aprovação depende da análise, exigências, vistoria e etapa final do processo.'],
      ['Posso guardar só a nota fiscal?', 'Não é recomendável. Projeto, testes, garantias, desenhos e registros de conexão são importantes para manutenção e suporte.']
    ],
    summary: 'Documentação organizada reduz retrabalho, melhora a conexão e protege o proprietário durante toda a vida útil do sistema.'
  },
  'como-escolher-instalador-wallbox': {
    heading: 'Como avaliar um instalador de Wallbox antes de contratar',
    sections: [
      'Um instalador de Wallbox deve começar pela vistoria, não pelo envio de um preço padrão. Identifique veículo, potência AC aceita, tensão, fases, distância, rota, quadro, padrão, cargas simultâneas, ambiente e regras do condomínio. Sem esses dados, a proposta pode parecer barata porque omite a infraestrutura necessária.',
      'Peça a justificativa do circuito. Condutores, método de instalação, queda de tensão, disjuntor, proteção diferencial, DPS, aterramento, seccionamento e capacidade do quadro precisam ser definidos conforme equipamento, local e normas aplicáveis. Não aceite a troca de disjuntor como resposta para falta de capacidade.',
      'A responsabilidade técnica deve ser compatível com o serviço e com a competência profissional. Pergunte quais documentos serão entregues, se haverá ART ou documento aplicável, quem assina o projeto e quem acompanha a execução. A presença de um nome no anúncio não prova que a instalação foi analisada.',
      'O orçamento precisa separar Wallbox, cabos, eletrodutos, quadro, proteções, mão de obra, obra civil, acabamento, testes e adequações. Registre distância estimada e método de fixação. Em garagem coletiva, inclua rota, acesso, medição, autorização e responsabilidade por áreas comuns.',
      'A execução deve terminar com testes e orientação. Verifique aperto, identificação, polaridade, aterramento, proteção, comunicação, corrente, aquecimento e funcionamento. Entregue manual, parâmetros, fotos, diagrama, garantia e instruções para interromper a recarga diante de anormalidade.',
      'Pergunte como o instalador trata mudanças. Se o quadro não suportar, o cabo precisar de outra rota ou o condomínio impor restrições, a proposta deve explicar aprovação e orçamento adicional. Isso é mais seguro que deixar toda decisão para o momento da obra.',
      'Experiência precisa ser relevante. Instalar tomadas comuns não equivale a dimensionar recarga contínua de veículo. Procure casos com potência semelhante, ambientes diferentes e documentação. A equipe também deve saber orientar sobre manutenção e futuras expansões.',
      'A escolha final deve equilibrar segurança, diagnóstico, documentação, acabamento, suporte e preço. O menor valor inicial não compensa se a instalação aquecer, desarmar ou ficar sem responsável quando o veículo mudar.'
    ],
    checklist: ['exigir vistoria antes do preço final;', 'confirmar potência e fases do veículo;', 'pedir justificativa de cabos e proteções;', 'verificar responsabilidade técnica;', 'separar equipamento e infraestrutura;', 'exigir testes e documentação;', 'avaliar experiência e pós-venda;'],
    questions: [
      ['Qualquer eletricista pode instalar Wallbox?', 'A recarga contínua exige avaliação de circuito, proteção, equipamento e ambiente. A competência e o escopo devem ser comprovados.'],
      ['O instalador pode usar o quadro existente?', 'Somente depois de verificar capacidade, espaço, conexões, cargas simultâneas e proteções.'],
      ['ART garante instalação correta?', 'É um elemento de responsabilidade documental, mas não substitui projeto, execução, testes e manutenção adequados.']
    ],
    summary: 'Escolha o instalador que consegue provar o dimensionamento e entregar uma instalação verificável, não apenas conectar o carregador.'
  },
  'cuidados-seguranca-carregador-veicular': {
    heading: 'Como manter a recarga de carro elétrico segura no dia a dia',
    sections: [
      'A recarga é uma carga prolongada e pode operar por horas. Por isso, o circuito precisa ser dimensionado para corrente contínua, temperatura, queda de tensão, método de instalação e ambiente. Uma tomada que funciona para uso ocasional pode não ser adequada para recarga diária sem avaliação.',
      'Observe sinais de aquecimento, cheiro, ruído, desarme, escurecimento, folga, umidade, cabo danificado ou conector deformado. Interrompa a recarga e investigue a causa. Aumentar o disjuntor, usar adaptador ou extensão pode esconder sobrecarga e elevar o risco.',
      'O conjunto de proteção depende do carregador, da arquitetura e das normas aplicáveis. Disjuntor, proteção diferencial, DPS, aterramento, seccionamento e coordenação precisam ser selecionados como sistema. Não copie uma especificação de internet sem conferir o manual e a instalação.',
      'O ambiente também interfere. Garagem úmida, área sujeita a lavagem, calor, sol, circulação de veículos e risco de impacto exigem posição e proteção adequadas. Cabos não devem ficar em rota de passagem, prensados por portão ou expostos a quinas e água.',
      'Carregadores portáteis devem ser usados conforme manual e em ponto compatível. Não use extensão doméstica, benjamim ou adaptador para aumentar alcance. Se a vaga é distante do quadro, a solução correta é estudar rota e circuito dedicado, não improvisar uma conexão.',
      'A manutenção inclui limpeza de conectores, inspeção de cabos, fixações, proteção e sinais de aquecimento. Em condomínio ou empresa, defina quem pode operar, quem responde por falha e como será feito o acesso ao circuito. Registre intervenções para identificar recorrência.',
      'O veículo e o Wallbox também conversam por controle e limites. A potência anunciada pode não ser entregue se o carro aceitar menos, se a rede limitar ou se o gerenciamento de carga reduzir corrente. Isso não é necessariamente falha, mas deve ser explicado ao usuário.',
      'A segurança depende de comportamento após a instalação. Treine o usuário para conectar corretamente, não cobrir ventilação, não puxar pelo cabo, não carregar com dano visível e comunicar sintomas. Uma rotina simples evita que o problema cresça sem diagnóstico.'
    ],
    checklist: ['usar circuito dimensionado para a carga;', 'inspecionar aquecimento e danos;', 'seguir manual e proteção especificada;', 'evitar extensões e adaptadores;', 'proteger cabos de água e impacto;', 'registrar manutenção e ocorrências;', 'treinar usuários e regras do local;'],
    questions: [
      ['Posso carregar em tomada comum?', 'Somente se o ponto e o carregador forem compatíveis, o uso estiver previsto e o circuito tiver sido verificado para a duração da carga.'],
      ['Disjuntor maior resolve desarme?', 'Não. Ele pode eliminar a proteção sem corrigir cabo, conexão, carga ou aquecimento. A causa deve ser diagnosticada.'],
      ['Aquecimento leve é normal?', 'Conexões podem aquecer dentro de limites, mas aquecimento anormal, cheiro ou escurecimento exigem interrupção e inspeção.']
    ],
    summary: 'Recarga segura combina circuito dedicado, proteção correta, ambiente adequado, inspeção e comportamento responsável.'
  },
  'quadro-eletrico-wallbox': {
    heading: 'Como verificar se o quadro suporta um Wallbox',
    sections: [
      'O disjuntor geral não responde sozinho se o quadro suporta o carregador. É preciso verificar padrão, alimentador, barramentos, condutores, fases, conexões, espaço físico, cargas simultâneas, queda de tensão e capacidade da instalação. A análise deve considerar o que acontece quando o veículo carrega junto com as demais cargas.',
      'Identifique tensão e número de fases disponíveis e compare com o Wallbox e com o carregador interno do veículo. A potência nominal do equipamento pode não ser utilizada se o veículo limitar a entrada, mas o circuito ainda precisa ser dimensionado para a corrente configurada e para o uso prolongado.',
      'A distância até a vaga altera cabo, queda de tensão, método de instalação, fixação, proteção e custo. Em condomínios, a rota pode passar por áreas comuns, shafts, garagens e paredes com restrições. O projeto deve registrar percurso, acesso, pontos de manutenção e responsabilidade por acabamento.',
      'O estado das conexões é tão importante quanto a seção do cabo. Bornes frouxos, barramentos danificados, aquecimento, oxidação e emendas inadequadas aumentam risco. Faça inspeção com segurança e, quando necessário, medições sob carga por profissional habilitado.',
      'O circuito deve ter proteção e seccionamento compatíveis. A escolha de diferencial, DPS, disjuntor e aterramento depende da arquitetura, do fabricante e do esquema da instalação. Não instale proteções apenas para preencher espaço: cada componente precisa ter função e coordenação.',
      'A demanda pode exigir aumento de carga ou gerenciamento. Em uma casa, chuveiro, ar-condicionado, forno e bomba podem coincidir com a recarga. Em condomínio, vários carros podem carregar ao mesmo tempo. Balanceamento e controle de potência podem ser alternativas, mas precisam ser especificados e testados.',
      'O quadro deve ser identificado e deixar caminho para manutenção. Etiquetas, diagrama, posição do seccionamento e acesso reduzem erro em uma emergência. Ao concluir, registre torque ou teste aplicável, medições, modelo do Wallbox, parâmetros e orientação ao usuário.',
      'Reavalie o quadro quando trocar equipamento, aumentar corrente, instalar segundo ponto ou alterar padrão. Um sistema que suportava um carregador pode não suportar dois. A expansão deve ser estudada antes de comprar o novo aparelho.'
    ],
    checklist: ['identificar tensão e fases;', 'somar cargas simultâneas;', 'avaliar cabos e conexões;', 'medir queda de tensão quando necessário;', 'definir proteções compatíveis;', 'planejar rota e manutenção;', 'documentar testes e expansões;'],
    questions: [
      ['Posso usar um disjuntor vazio?', 'Espaço disponível não significa capacidade. Alimentador, barramento, proteção, carga e rota precisam ser avaliados.'],
      ['A potência do Wallbox é a corrente do circuito?', 'A relação depende de tensão e fases, além da configuração e do veículo. O dimensionamento deve considerar o cenário real.'],
      ['Preciso trocar o padrão?', 'Somente a análise da demanda e da capacidade existente pode indicar. Não é automático nem deve ser descartado sem estudo.']
    ],
    summary: 'Capacidade de quadro é uma conclusão de diagnóstico: ela envolve carga, condutor, proteção, rota, fases e uso simultâneo.'
  },
  'qual-potencia-wallbox-escolher': {
    heading: 'Como escolher potência de Wallbox pelo uso real do veículo',
    sections: [
      'A potência correta começa pelo carregador interno AC do veículo. Um Wallbox de 22 kW não fará o carro carregar nessa potência se o veículo aceitar menos. Consulte manual, versão, conector e limites de corrente antes de comprar. A infraestrutura deve atender o equipamento escolhido sem pagar por capacidade que não será usada.',
      'Calcule a energia que precisa repor por dia e a janela em que o carro fica parado. Se a rotina permite várias horas, uma potência menor pode repor a mesma energia com menor exigência de quadro. Se há uso intenso ou pouco tempo estacionado, a potência maior pode fazer sentido, desde que a rede suporte.',
      'Compare 7,4, 11 e 22 kW com tensão e fases disponíveis. A potência muda a corrente do circuito, a seção de cabos, a proteção, a demanda e o custo da obra. Em alguns imóveis, a alternativa de gerenciar carga ou usar duas sessões pode ser melhor que aumentar o padrão.',
      'A curva de carregamento também importa. O veículo pode reduzir corrente quando a bateria aquece, está quase cheia ou o sistema limita a potência. O tempo de recarga real não é simplesmente capacidade da bateria dividida pela potência nominal. Considere perdas e comportamento do equipamento.',
      'Em condomínios e empresas, potência individual precisa ser combinada com simultaneidade. Vários Wallboxes no mesmo período podem superar padrão, transformador ou alimentação. Balanceamento, prioridade, medição e regras de uso devem ser definidos antes da expansão.',
      'O orçamento deve separar preço do aparelho e infraestrutura. Potência maior pode exigir quadro, cabos, proteção, rota, adequação de padrão e aumento de demanda. Compare o custo marginal da potência extra com o tempo economizado na rotina, não apenas o preço do equipamento.',
      'A configuração deve ser documentada. Registre corrente máxima, fases, limites do veículo, modo de operação, proteção e quem pode alterar parâmetros. Aumentar a corrente depois sem revisar a instalação cria risco e pode invalidar a lógica do projeto.',
      'Reavalie quando mudar o veículo ou a vaga. Um novo carro, outro ponto de estacionamento ou a instalação de geração solar pode mudar a potência útil e o gerenciamento. A escolha atual deve deixar claras as premissas que permitiriam uma futura expansão.'
    ],
    checklist: ['consultar carregador interno do veículo;', 'calcular energia diária e janela de estacionamento;', 'verificar tensão e fases;', 'considerar curva e perdas de recarga;', 'analisar simultaneidade em múltiplos pontos;', 'comparar custo da infraestrutura;', 'documentar corrente e parâmetros;'],
    questions: [
      ['22 kW sempre carrega mais rápido?', 'Somente se o veículo, a rede e o circuito aceitarem essa potência. O limite mais baixo define o resultado.'],
      ['7,4 kW é suficiente?', 'Pode ser para uma rotina noturna, mas depende da energia diária, do veículo e da janela disponível.'],
      ['Potência maior exige padrão maior?', 'Pode exigir. A demanda, fases, alimentador, proteções e regras locais devem ser analisados.']
    ],
    summary: 'Escolha a potência pela energia que a rotina exige e pela capacidade real do veículo e da instalação.'
  },
  'quanto-custa-instalar-wallbox': {
    heading: 'Como montar um orçamento completo de instalação de Wallbox',
    sections: [
      'O custo de um Wallbox é a soma do equipamento e da infraestrutura necessária para entregar recarga segura. Distância, potência, tensão, fases, rota, quadro, proteções, obra civil, acabamento, documentação, testes e acesso podem alterar mais o valor do que o aparelho isolado.',
      'A vistoria deve registrar onde está o quadro, onde ficará o carregador, quantos metros de cabo serão necessários, como a rota será fixada e se haverá travessias, paredes, shafts ou áreas comuns. Uma faixa dada sem esses dados é preliminar e pode mudar quando a execução começar.',
      'Separe materiais e serviços no orçamento. Liste cabo, eletroduto, canaleta, quadro, disjuntor, proteção diferencial, DPS, aterramento, fixação, mão de obra, projeto, ART ou documento aplicável, testes, acabamento e eventual obra civil. Itens condicionais devem ter critério de aprovação.',
      'O preço também depende da potência configurada. Um carregador mais forte pode exigir cabo maior, proteção diferente, adequação de padrão ou gerenciamento. A proposta deve explicar o que acontece se o veículo aceitar menos ou se o cliente quiser aumentar a corrente no futuro.',
      'Em condomínio, inclua autorização, rota, medição, identificação, acesso, rateio e responsabilidade por áreas comuns. O custo pode envolver mais que elétrica: fechamento de forro, perfuração, proteção contra impacto, sinalização e recomposição de acabamento.',
      'Testes e entrega não devem ser invisíveis. O orçamento deve dizer quais verificações serão realizadas, que documentos serão entregues, como a garantia funciona e quem atende desarme, aquecimento ou falha de comunicação. A instalação termina quando o sistema é testado e explicado.',
      'Compare propostas pela mesma base. Se uma inclui o aparelho e outra apenas a mão de obra, o menor valor não é comparável. Monte uma tabela com equipamento, infraestrutura, proteções, distância, prazo, garantia, documentação e exclusões.',
      'Não remova proteção para alcançar um preço menor. Se o investimento ultrapassa o orçamento, ajuste potência, rota, acabamento ou fase de implantação com responsabilidade técnica. Segurança e rastreabilidade não devem ser as primeiras linhas cortadas.'
    ],
    checklist: ['medir distância e rota;', 'confirmar potência, tensão e fases;', 'separar aparelho e infraestrutura;', 'detalhar proteções e acabamento;', 'incluir obra e condomínio;', 'definir testes, garantia e documentos;', 'comparar propostas na mesma base;'],
    questions: [
      ['Existe preço fechado sem vistoria?', 'Pode haver estimativa, mas o preço final responsável depende de quadro, rota, distância, potência e condições do local.'],
      ['O Wallbox é a maior parte do custo?', 'Nem sempre. Infraestrutura, adequações, distância e proteções podem pesar bastante.'],
      ['Posso instalar primeiro e documentar depois?', 'Não é recomendável. Projeto, proteção, teste e documentação devem acompanhar a execução.']
    ],
    summary: 'Orçamento de Wallbox é comparável quando mostra aparelho, infraestrutura, proteção, obra, teste e responsabilidade.'
  },
  'wallbox-com-energia-solar': {
    heading: 'Como combinar Wallbox e energia solar sem superdimensionar',
    sections: [
      'Combinar Wallbox e energia solar pode aumentar o autoconsumo, mas o carro nem sempre carrega quando há sol. A análise deve comparar geração, consumo da casa, horário de estacionamento, potência do carregador e regras de gerenciamento. O objetivo pode ser economia, uso de excedente, conveniência ou redução de compra na rede.',
      'Comece pelo veículo e pela rotina. Quilômetros por dia, consumo médio, dias de uso, horário de chegada e saída indicam quanta energia precisa ser reposta. Um carro que fica estacionado durante o dia pode aproveitar mais geração direta; um carro que chega à noite dependerá de rede ou armazenamento.',
      'O Wallbox adiciona uma carga relevante ao quadro. Verifique padrão, cabos, proteções, fases, demanda e cargas simultâneas. A energia solar não autoriza aumentar corrente sem revisar a instalação. Quando necessário, um controlador pode limitar ou modular a recarga conforme geração e consumo.',
      'Autoconsumo e excedente são conceitos diferentes. Se o carregador usa energia no mesmo momento da geração, pode reduzir compra direta; se a energia passa pela rede ou por bateria, entram perdas, regras e custos. A simulação deve declarar como mede e valoriza cada fluxo.',
      'Bateria pode deslocar energia para recarregar à noite, mas adiciona investimento, perdas, ciclos, segurança e reposição. Compare esse custo com a alternativa de carregar em horários solares, usar potência menor ou aceitar parte da energia da rede. Não trate armazenamento como consequência automática do projeto solar.',
      'O gerenciamento de carga precisa respeitar o carro e o Wallbox. Defina corrente mínima, comportamento quando há pouca geração, prioridade entre cargas, retorno após falha e limites de segurança. Um sistema que reduz corrente sem comunicação adequada pode interromper a sessão ou criar expectativa errada.',
      'A proposta deve separar sistema fotovoltaico, carregador, medição, controle, proteções e integração. O cliente precisa saber qual equipamento faz cada função e quem dá suporte. Isso facilita garantia e evita que um problema de recarga seja atribuído ao painel sem diagnóstico.',
      'Acompanhe energia solar, energia entregue ao veículo, horário de recarga, custo estimado e disponibilidade. Depois de alguns ciclos, ajuste a estratégia conforme a rotina real. A integração é bem-sucedida quando o comportamento medido confirma o objetivo declarado.'
    ],
    checklist: ['mapear rotina e quilômetros diários;', 'comparar horário de geração e estacionamento;', 'verificar quadro e cargas simultâneas;', 'definir autoconsumo e excedente;', 'avaliar bateria pelo custo total;', 'configurar gerenciamento e limites;', 'monitorar energia solar e recarga;'],
    questions: [
      ['Solar carrega o carro à noite?', 'Somente com rede ou armazenamento. A geração direta depende de haver luz e de o veículo estar conectado.'],
      ['Preciso aumentar o sistema solar para um carro?', 'Talvez. O cálculo depende de quilômetros, consumo do veículo, geração existente, horário e regras de conexão.'],
      ['Wallbox usa automaticamente o excedente?', 'Somente se houver medição e controle compatíveis. O aparelho precisa ser configurado para essa estratégia.']
    ],
    summary: 'A integração solar-Wallbox depende mais do horário e do gerenciamento do que da soma nominal das potências.'
  },
  'wallbox-em-condominio': {
    heading: 'Como implantar Wallbox em condomínio com segurança e governança',
    sections: [
      'A instalação de Wallbox em condomínio envolve elétrica, obra, regras de uso e decisão coletiva. Antes de escolher o aparelho, o condomínio precisa definir vagas, medição, rateio, responsabilidade por consumo, acesso à garagem, manutenção e expansão para outros moradores.',
      'Faça um levantamento do quadro, padrão, transformador, rota, distância, número de vagas e cargas existentes. Um ponto isolado pode ser possível onde vários pontos simultâneos exigiriam gerenciamento ou aumento de capacidade. Planeje a infraestrutura pensando no primeiro e no próximo carregador.',
      'A medição pode ser individual, compartilhada ou controlada por sistema específico, conforme o projeto e as regras internas. O importante é que o critério seja verificável. O morador deve saber como o consumo será apurado, quando será cobrado e quem paga perdas, manutenção e eventuais adequações.',
      'A rota em áreas comuns precisa considerar resistência ao impacto, circulação, umidade, incêndio, acabamento, acesso e manutenção. Cabos não devem ficar expostos a veículos ou criar obstáculos. O projeto deve indicar fixação, sinalização, seccionamento e como uma emergência será atendida.',
      'A aprovação deve incluir memorial simples, planta da rota, potência, proteção, testes, cronograma e regras futuras. Uma autorização verbal não substitui o registro do que foi aprovado. Se o condomínio pretende permitir novos pontos, deixe critérios de prioridade, padrão visual e capacidade definidos.',
      'O balanceamento de carga pode permitir expansão, mas depende de medição, comunicação e configuração. Defina o que ocorre quando muitos carros conectam, quando a demanda do prédio sobe ou quando o sistema perde comunicação. O carregador deve reduzir potência de forma previsível, não desligar sem explicação.',
      'A manutenção precisa ter dono. Estabeleça inspeção, limpeza, atendimento, acesso ao quadro, reposição de peças e registro de ocorrências. O síndico deve receber manual e contatos, enquanto o usuário recebe instruções para conectar, liberar a vaga e reportar aquecimento ou dano.',
      'Depois da implantação, acompanhe número de sessões, energia, picos, falhas e reclamações. O modelo pode ser ajustado quando a utilização crescer, mas qualquer expansão deve revisar capacidade, proteção, medição e regras. Governança simples no início evita conflito quando o sistema se tornar coletivo.'
    ],
    checklist: ['definir vagas e beneficiários;', 'avaliar quadro, padrão e rota;', 'estabelecer medição e rateio;', 'aprovar memorial e regras;', 'proteger cabos e áreas comuns;', 'definir gerenciamento e expansão;', 'entregar manual e manutenção;'],
    questions: [
      ['O condomínio precisa aprovar a instalação?', 'A necessidade e o procedimento dependem da convenção, da obra e das áreas envolvidas. Registre a decisão e as responsabilidades.'],
      ['Cada morador pode instalar como quiser?', 'Não é recomendável. Padrão, proteção, rota, medição e capacidade devem ser coordenados para preservar segurança e possibilidade de expansão.'],
      ['Quem paga a infraestrutura?', 'O critério deve ser definido antes da obra, incluindo ponto individual, áreas comuns, manutenção e futuras adequações.']
    ],
    summary: 'Wallbox em condomínio exige projeto elétrico e regra de convivência: medição, rota, capacidade e expansão precisam andar juntos.'
  },
  'wallbox-ou-tomada-comum': {
    heading: 'Como decidir entre Wallbox e tomada comum na prática',
    sections: [
      'A comparação não é apenas entre aparelho caro e tomada barata. Uma tomada comum pode atender recarga ocasional quando o carregador, o circuito, a proteção e o ambiente forem compatíveis. Para uso diário, a previsibilidade de um ponto dedicado costuma ser mais importante que a aparência do equipamento.',
      'Verifique a corrente, o tempo de uso e o estado da tomada. Recarga por muitas horas aquece conexões que parecem normais em usos curtos. Folga, oxidação, emenda, caixa danificada, cabo inadequado ou extensão aumentam risco e devem ser corrigidos antes de pensar em potência.',
      'O carregador portátil não elimina a necessidade de dimensionamento. Ele pode limitar corrente e ter proteções próprias, mas o circuito da instalação ainda precisa suportar a carga. Siga manual, use ponto compatível e não improvise adaptadores para alcançar a vaga.',
      'Wallbox oferece ponto fixo, controle, proteção e, conforme o modelo, comunicação, balanceamento e integração. Isso não significa que qualquer Wallbox seja seguro sem projeto. Ele também precisa de circuito, seccionamento, proteção, aterramento, fixação e manutenção.',
      'A rotina define a escolha. Se o veículo fica parado a noite toda e percorre poucos quilômetros por dia, potência menor pode atender. Se há pouco tempo disponível, mais de um veículo ou necessidade de monitoramento, a solução dedicada tende a trazer previsibilidade, desde que a infraestrutura suporte.',
      'Compare custo total. Tomada pode parecer barata, mas adequações de circuito, risco, manutenção e tempo de recarga entram na decisão. Wallbox pode custar mais no início e entregar controle e acabamento que fazem sentido para uso contínuo.',
      'Em condomínios, empresa ou garagem externa, considere acesso, proteção contra impacto, medição, autorização e responsabilidade. Uma tomada em área comum pode gerar disputa sobre consumo e segurança; um Wallbox sem regra também. O contexto de uso é parte do projeto.',
      'Reavalie quando mudar o veículo, aumentar corrente, instalar outro ponto ou alterar a residência. A escolha não deve impedir uma expansão segura nem incentivar o usuário a aumentar potência por conta própria. Documente a corrente autorizada e os limites do circuito.'
    ],
    checklist: ['definir frequência e duração da recarga;', 'inspecionar tomada e circuito;', 'seguir manual do carregador portátil;', 'evitar extensão e adaptadores;', 'avaliar circuito dedicado;', 'considerar custo total e acabamento;', 'documentar limites e futuras expansões;'],
    questions: [
      ['Tomada comum é sempre insegura?', 'Não. Pode ser adequada em algumas condições, mas precisa de circuito, proteção, estado e uso compatíveis com a recarga.'],
      ['Wallbox carrega sempre mais rápido?', 'Depende do veículo, da potência configurada e da instalação. O carro pode ser o limitador.'],
      ['Posso testar uma tomada e observar?', 'Sinais de aquecimento não devem ser usados como método de dimensionamento. Faça avaliação antes da recarga prolongada.']
    ],
    summary: 'Escolha pelo padrão de uso, pela capacidade da instalação e pelo nível de controle necessário, não apenas pelo preço do aparelho.'
  }
};

const secondRoundTopUp = {
  'clp-vs-reles-paineis': {
    heading: 'Como validar a decisão antes de fechar o painel',
    paragraphs: ['Antes da compra, peça uma simulação de falha: sensor desconectado, emergência acionada, perda de comunicação e retorno de energia. A equipe deve explicar o estado seguro, o alarme esperado e o procedimento de recuperação. Esse exercício revela se a lógica foi realmente pensada para a operação ou apenas desenhada para funcionar em condições normais.', 'Também confirme quem receberá o programa, os desenhos, a lista de I/O, os parâmetros e os arquivos editáveis. O painel só está pronto quando a manutenção consegue identificar uma falha, testar uma alteração e restaurar uma versão conhecida sem depender exclusivamente do fornecedor.'],
    checklist: ['testar falhas e retorno seguro;', 'confirmar arquivos editáveis;', 'registrar versão final da lógica;', 'treinar manutenção e operação;']
  },
  'nr10-laudo-eletrico-empresa': {
    heading: 'Como avaliar se o laudo é realmente utilizável',
    paragraphs: ['Leia uma amostra dos achados e veja se outra pessoa conseguiria localizar o equipamento, entender o risco e executar a recomendação. Se o relatório só repete frases normativas sem fotografia, medição, prioridade ou responsável, ele pode ter volume, mas pouca utilidade para a gestão.', 'O fechamento deve registrar pendências aceitas, ações concluídas, evidências e itens que ficaram fora do escopo. Isso preserva transparência: uma instalação pode ter um plano de melhoria em andamento sem ser apresentada como integralmente adequada antes de a verificação terminar.'],
    checklist: ['conferir evidência de cada achado;', 'identificar responsável pela correção;', 'registrar escopo e exclusões;', 'reavaliar após a execução;']
  },
  'automacao-industrial-nordeste': {
    heading: 'Como preparar a equipe para sustentar a automação',
    paragraphs: ['Inclua produção, manutenção, elétrica, instrumentação e TI nas decisões que afetam suas rotinas. A equipe que opera o processo conhece exceções que não aparecem no fluxograma, enquanto a manutenção conhece componentes críticos e limites de reposição. A implantação ganha qualidade quando esse conhecimento vira requisito documentado.', 'Defina também uma rotina de mudança: quem aprova alteração de lógica, quem testa, como o backup é nomeado, como o operador é informado e como se retorna à versão anterior. Controle simples de mudanças evita que pequenos ajustes feitos durante a produção destruam a rastreabilidade do sistema.'],
    checklist: ['envolver áreas desde o diagnóstico;', 'documentar exceções do processo;', 'controlar mudanças e backups;', 'revisar treinamento após alterações;']
  },
  'quanto-da-para-economizar-com-energia-solar': {
    heading: 'Como comunicar economia sem criar expectativa errada',
    paragraphs: ['Apresente a economia como faixa e explique quais fatores movem o resultado: geração, consumo, tarifa, cobranças residuais, indisponibilidade e mudança de hábito. Uma faixa bem explicada ajuda o cliente a decidir; um percentual alto sem cenário pode gerar frustração mesmo quando a usina funciona corretamente.', 'Na revisão periódica, compare o valor projetado com o valor observado e registre a causa de cada diferença. Essa prática transforma o monitoramento em gestão e permite corrigir premissas sem tratar toda variação como defeito do equipamento.'],
    checklist: ['mostrar faixa e premissas;', 'separar geração de valor financeiro;', 'registrar diferenças e causas;', 'revisar a projeção anualmente;']
  },
  'energia-solar-para-hospitais': {
    heading: 'Como documentar continuidade e segurança na entrega',
    paragraphs: ['A entrega deve incluir mapa de cargas, pontos de seccionamento, interfaces com gerador e nobreak, testes, alarmes e responsáveis. Em uma emergência, a equipe precisa saber o que o sistema faz, o que não faz e quais circuitos devem ser isolados. Documentação operacional é parte da segurança do projeto.', 'Faça uma reunião de transferência com manutenção, engenharia clínica, segurança e operação. Registre dúvidas, pendências e treinamento. A usina só deve ser considerada incorporada quando os usuários críticos conhecem os limites e o atendimento de falhas.'],
    checklist: ['entregar mapa de cargas críticas;', 'documentar interfaces de emergência;', 'treinar equipes envolvidas;', 'registrar pendências de comissionamento;']
  },
  'energia-solar-funciona-sem-luz': {
    heading: 'Como testar o backup sem colocar a instalação em risco',
    paragraphs: ['O teste deve ser planejado, comunicado e executado com as cargas adequadas. Registre tempo de transferência, potência, comportamento dos motores, alarmes, estado da bateria e retorno da rede. Nunca use um apagão real como primeiro teste de um sistema recém-instalado.', 'Depois, atualize a lista de cargas essenciais e o procedimento do usuário. Se a autonomia observada for menor que a esperada, investigue consumo, reserva, perdas e envelhecimento antes de simplesmente aumentar a bateria.'],
    checklist: ['planejar teste controlado;', 'registrar transferência e alarmes;', 'confirmar comportamento de motores;', 'atualizar procedimento de operação;']
  },
  'precisa-de-bateria-para-energia-solar': {
    heading: 'Como medir se a bateria está entregando o serviço esperado',
    paragraphs: ['A avaliação deve olhar disponibilidade, potência entregue, autonomia, temperatura, ciclos e eventos de proteção. Uma bateria pode ter capacidade instalada e ainda não atender a carga se o inversor limitar potência, se a reserva estiver configurada ou se a demanda crescer.', 'Compare o custo do armazenamento com o serviço efetivamente usado. Se o backup quase nunca é acionado, verifique se o benefício continua justificando manutenção e reposição; se a continuidade é essencial, registre testes e falhas para garantir que a capacidade esteja disponível quando necessária.'],
    checklist: ['acompanhar autonomia real;', 'registrar temperatura e ciclos;', 'verificar limites do inversor;', 'revisar benefício e custo total;']
  },
  'quanto-tempo-duram-os-paineis-solares': {
    heading: 'Como criar um histórico de durabilidade',
    paragraphs: ['Registre inspeções, limpeza, alarmes, produção, intervenções e condições ambientais. Esse histórico ajuda a diferenciar degradação gradual de falha súbita e fornece evidência para garantia. Também orienta a próxima inspeção, em vez de usar a mesma frequência para todos os telhados.'],
    checklist: ['registrar produção e ocorrências;', 'guardar fotos e números de série;', 'comparar tendência anual;', 'planejar substituições;']
  },
  'documentos-para-instalar-energia-solar': {
    heading: 'Como conferir o pacote documental antes do aceite',
    paragraphs: ['Antes de aceitar a entrega, compare projeto, equipamentos instalados, números de série, potência, fotos, testes, garantias e documentos de conexão. Se houver divergência, registre a pendência e peça correção ou justificativa formal. O aceite deve confirmar o que foi entregue, não apenas que a obra terminou.', 'Mantenha uma cópia acessível para manutenção e outra para o proprietário ou administrador. Quando a equipe muda, a documentação acompanha o ativo e reduz a dependência de mensagens, arquivos pessoais ou memória de quem participou da instalação.'],
    checklist: ['comparar projeto e campo;', 'conferir números de série;', 'registrar pendências antes do aceite;', 'manter cópia organizada;']
  }
};

function renderDeepening(data) {
  const paragraphs = data.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('\n');
  const checklist = data.checklist.map(item => `<li>${item}</li>`).join('');
  return `\n<section class="blog-editorial-deepening" data-blog-block="editorial-expansion-v2">\n  <h2>${data.heading}</h2>\n  ${paragraphs}\n  <h3>Checklist de aplicação</h3>\n  <ul>${checklist}</ul>\n  <p><strong>Limite importante:</strong> ${data.note}</p>\n</section>`;
}

function renderFinalDeepening(data) {
  return `<section class="blog-editorial-final" data-blog-block="editorial-expansion-v3"><h2>${data.heading}</h2>${data.text.split(/\n\n/).map(paragraph => `<p>${paragraph}</p>`).join('')}</section>`;
}

function renderSecondRound(data) {
  const sections = data.sections.map(paragraph => `<p>${paragraph}</p>`).join('\n');
  const checklist = data.checklist.map(item => `<li>${item}</li>`).join('');
  const questions = data.questions.map(([question, answer]) => `<p><strong>${question}</strong> ${answer}</p>`).join('\n');
  return `\n<section class="blog-editorial-second-round" data-blog-block="editorial-expansion-v4">
  <h2>${data.heading}</h2>
  ${sections}
  <h3>Roteiro de aplicação</h3>
  <ul>${checklist}</ul>
  <h3>Dúvidas práticas</h3>
  ${questions}
  <p><strong>Síntese:</strong> ${data.summary}</p>
</section>`;
}

function renderSecondRoundTopUp(data) {
  const paragraphs = data.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('\n');
  const checklist = data.checklist.map(item => `<li>${item}</li>`).join('');
  return `\n<section class="blog-editorial-second-round-top-up" data-blog-block="editorial-expansion-v5">
  <h3>${data.heading}</h3>
  ${paragraphs}
  <h3>Conferência final</h3>
  <ul>${checklist}</ul>
</section>`;
}

function normalizePost(filePath) {
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const review = reviews[post.slug];
  if (!review) {
    const target = legacyRedirects[post.slug];
    if (target) {
      post.status = 'archived';
      post.robots = 'noindex, follow';
      post.canonicalPath = `/blog/${target}`;
    }
    return post;
  }

  Object.assign(post, {
    author: post.author || AUTHOR.author,
    authorType: (/^Eng\./i.test(String(post.author || '')) ? 'Person' : (post.authorType || AUTHOR.authorType)),
    authorRole: (/^Eng\./i.test(String(post.author || '')) ? (post.authorRole === AUTHOR.authorRole ? 'Engenharia elétrica' : (post.authorRole || 'Engenharia elétrica')) : (post.authorRole || AUTHOR.authorRole)),
    authorBio: post.authorBio || AUTHOR.authorBio,
    primaryKeyword: review.primaryKeyword,
    searchIntent: review.searchIntent,
    metaTitle: review.seoTitle,
    metaDescription: review.seoDescription,
    seoTitle: review.seoTitle,
    seoDescription: review.seoDescription,
    keywords: review.keywords,
    tags: review.tags,
    imageAlt: review.imageAlt,
    heroImageAlt: review.imageAlt,
    canonicalPath: `/blog/${post.slug}`,
    robots: 'index, follow',
    ogTitle: review.seoTitle,
    ogDescription: review.seoDescription,
    ogImage: post.heroImage,
    dateModified: TODAY,
    dateModifiedIso: `${TODAY}T12:00:00-03:00`,
    sources: [...(Array.isArray(post.sources) ? post.sources : []), ...review.sources.map(source)]
      .filter((item, index, items) => items.findIndex(candidate => candidate.url === item.url) === index),
    internalLinks: review.related.map(([slug, anchor]) => ({ anchor, url: `/blog/${slug}` }))
  });

  if (!post.faq) post.faq = [];
  if (post.faq.length < 3) {
    post.faq.push({
      question: review.expansion.heading.replace(/^.*?:\s*/, '') + '?',
      answer: review.expansion.answer
    });
  }

  if (!String(post.contentAppendHtml || '').includes('editorial-expansion-v1')) {
    post.contentAppendHtml = `${post.contentAppendHtml || ''}${renderExpansion(post.slug, { ...review.expansion, related: review.related })}`;
  }
  if (deepening[post.slug] && !String(post.contentAppendHtml || '').includes('editorial-expansion-v2')) {
    post.contentAppendHtml = `${post.contentAppendHtml || ''}${renderDeepening(deepening[post.slug])}`;
  }
  if (finalDeepening[post.slug]) {
    const finalBlock = renderFinalDeepening(finalDeepening[post.slug]);
    post.contentAppendHtml = String(post.contentAppendHtml || '').includes('editorial-expansion-v3')
      ? String(post.contentAppendHtml).replace(/<section class="blog-editorial-final"[\s\S]*?<\/section>/, finalBlock)
      : `${post.contentAppendHtml || ''}\n${finalBlock}`;
  }
  if (secondRound[post.slug]) {
    const secondBlock = renderSecondRound(secondRound[post.slug]);
    post.contentAppendHtml = String(post.contentAppendHtml || '').includes('editorial-expansion-v4')
      ? String(post.contentAppendHtml).replace(/<section class="blog-editorial-second-round"[\s\S]*?<\/section>/, secondBlock)
      : `${post.contentAppendHtml || ''}\n${secondBlock}`;
  }
  if (secondRoundTopUp[post.slug]) {
    const topUpBlock = renderSecondRoundTopUp(secondRoundTopUp[post.slug]);
    post.contentAppendHtml = String(post.contentAppendHtml || '').includes('editorial-expansion-v5')
      ? String(post.contentAppendHtml).replace(/<section class="blog-editorial-second-round-top-up"[\s\S]*?<\/section>/, topUpBlock)
      : `${post.contentAppendHtml || ''}\n${topUpBlock}`;
  }

  // Correções de claims absolutos ou desatualizáveis que não podem continuar no HTML indexável.
  const replacements = [
    [/até 95% da sua fatura mensal/gi, 'uma redução relevante da fatura, cujo percentual varia conforme consumo, tarifa e regras aplicáveis'],
    [/zerar a conta das áreas comuns/gi, 'planejar a redução do custo das áreas comuns'],
    [/payback inferior a 3 anos/gi, 'payback a ser calculado com dados do empreendimento'],
    [/garantindo total compatibilidade/gi, 'com análise de compatibilidade'],
    [/homologação acelerada/gi, 'condução organizada do processo de conexão'],
    [/evita reprovações/gi, 'reduz o risco de pendências quando o escopo é conferido'],
    [/100% do processo/gi, 'as etapas previstas no escopo contratado'],
    [/100% autossuficiente/gi, 'com controle individual por módulo, conforme a arquitetura'],
    [/eficiência do último e mais diminuto pingo de energia/gi, 'operação próxima ao ponto de máxima potência dentro dos limites do equipamento']
  ];
  post.title = post.title.replace(/Como Zerar a Conta das Áreas Comuns/gi, 'Como Planejar a Redução das Áreas Comuns');
  post.summary = post.summary.replace(/até 95%/gi, 'de forma relevante').replace(/inferior a 3 anos/gi, 'calculado com dados reais');
  post.metaDescription = review.seoDescription;
  post.seoDescription = review.seoDescription;
  post.contentHtml = replacements.reduce((html, [pattern, replacement]) => html.replace(pattern, replacement), post.contentHtml || '');
  post.contentAppendHtml = replacements.reduce((html, [pattern, replacement]) => html.replace(pattern, replacement), post.contentAppendHtml || '');
  return post;
}

const files = fs.readdirSync(ROOT).filter(file => file.endsWith('.json')).sort();
for (const file of files) {
  const fullPath = path.join(ROOT, file);
  const updated = normalizePost(fullPath);
  fs.writeFileSync(fullPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
}

console.log(`Revisados ${files.length} posts publicados; ${Object.keys(reviews).length} ativos e ${Object.keys(legacyRedirects).length} aliases arquivados.`);
