// Fonte editorial do lançamento. Execute a partir da raiz do projeto.
const fs = require('node:fs');
const path = require('node:path');
const guides = require('../config/substation-guides');
const date = '2026-09-22';
const energisa = { title: 'Tipos de ligação nova e critérios de fornecimento', url: 'https://www.energisa.com.br/ajuda/pergunta/quais-os-tipos-de-ligacao-nova', publisher: 'Energisa' };
const ndu = { title: 'Normas técnicas de distribuição — consultar a NDU 002 vigente', url: 'https://www.energisa.com.br/normas-tecnicas', publisher: 'Energisa' };
const nr10 = { title: 'NR-10 — página oficial e textos normativos', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10', publisher: 'Ministério do Trabalho e Emprego' };
const monitoring = { title: 'Avaliação da condição de transformadores', url: 'https://blog.se.com/br/servicos/2023/01/25/porque-e-que-a-avaliacao-do-estado-do-transformador-e-critica/', publisher: 'Schneider Electric' };
const link = (i, text) => `<a href="/blog/${guides[i].slug}">${text || guides[i].title}</a>`;
const articles = [
{
    title: 'O que é uma subestação de energia e quando avaliar a necessidade',
    keyword: 'o que é uma subestação de energia',
    summary: 'Entenda a função da subestação de um consumidor, seus componentes e os dados necessários para avaliar o atendimento em média tensão.',
    siblings: [1, 2, 5], sources: [energisa, nr10],
    body: `<p class="lead">Uma <strong>subestação de energia</strong> reúne equipamentos para transformar, proteger, medir ou distribuir energia elétrica, conforme sua função. No contexto de uma empresa, condomínio ou propriedade rural, a subestação de entrada pode receber energia em média tensão e adequá-la à instalação consumidora.</p>
<p>Ela não é apenas um transformador. Para entender uma proposta, é preciso considerar o conjunto: conexão com a rede, transformação, proteção, medição, aterramento, infraestrutura e documentação. Este guia trata da subestação do consumidor, não das grandes instalações de transmissão do sistema elétrico.</p>
<h2>Como a energia chega aos equipamentos da empresa?</h2>
<p>Em uma configuração com transformação, a energia recebida da rede passa pelos elementos previstos na entrada, proteção e medição, é transformada para o nível de tensão definido no projeto e segue para os quadros da instalação. A disposição e as responsabilidades sobre cada parte variam conforme a solução de atendimento.</p>
<p>Esse caminho ajuda a entender por que uma expansão não pode ser decidida olhando somente a placa do transformador. Os outros equipamentos, condutores e sistemas envolvidos também precisam ser compatíveis. A subestação faz parte de uma instalação maior, que continua até as cargas atendidas.</p>
<h2>Quais componentes podem fazer parte do conjunto?</h2>
<ul><li><strong>Transformador:</strong> adapta o nível de tensão conforme a solução adotada.</li><li><strong>Proteção e seccionamento:</strong> equipamentos definidos para detectar condições previstas e permitir as funções de proteção e isolamento do projeto.</li><li><strong>Medição:</strong> estrutura e equipamentos conforme os requisitos de fornecimento.</li><li><strong>Condutores e conexões:</strong> interligam as partes do sistema com características compatíveis com a aplicação.</li><li><strong>Aterramento e equipotencialização:</strong> integram as medidas de proteção da instalação.</li><li><strong>Infraestrutura:</strong> estruturas, espaços, acessos e demais elementos necessários à implantação e ao uso.</li></ul>
<p>A lista é explicativa, não um memorial de compra. Alguns componentes e suas posições dependem da configuração escolhida. O projeto deve identificar os elementos, suas funções e os limites entre a rede da distribuidora e a instalação do consumidor.</p>
<h2>Quando vale iniciar uma avaliação?</h2>
<p>Novas instalações com cargas relevantes, expansão de processos, mudanças de uso e limitações no atendimento atual justificam uma conversa técnica. O enquadramento do fornecimento segue critérios da distribuidora e da regulação aplicável. A Energisa publica orientações sobre os tipos de ligação, mas a análise do empreendimento precisa confirmar as condições do pedido concreto.</p>
<p>Uma conta de energia alta não demonstra, sozinha, a necessidade de uma subestação. Consumo de energia, carga instalada e demanda são informações diferentes. Também não basta copiar a solução adotada por uma empresa com área construída semelhante: atividades e horários podem produzir necessidades bastante distintas.</p>
<h2>Consumo, demanda e potência do transformador</h2>
<p>O consumo em kWh descreve energia utilizada ao longo de um período. A demanda representa potência solicitada em determinado intervalo e contexto de medição. Já a potência nominal em kVA de um transformador se refere à sua capacidade aparente nas condições especificadas. Esses números não são intercambiáveis.</p>
<p>Para o contratante, a consequência prática é reunir tanto contas e medições quanto uma relação de equipamentos e horários. Uma carga que opera poucos minutos pode influenciar decisões diferentes de outra que funciona continuamente. O projetista interpreta os dados em conjunto, considerando também simultaneidade, características das cargas e expansão prevista.</p>
<h2>Subestação aérea, abrigada e cabine primária</h2>
<p>Você encontrará expressões diferentes nos orçamentos. A solução aérea utiliza uma configuração externa elevada; a abrigada reúne equipamentos em um espaço construído para essa finalidade. “Cabine primária” costuma aparecer na descrição de entradas de média tensão, mas o termo comercial não detalha todos os equipamentos incluídos.</p>
<p>Peça um escopo claro antes de comparar propostas. O ${link(1, 'comparativo entre subestação aérea e abrigada')} aprofunda os critérios de escolha, sem presumir que uma alternativa é sempre melhor ou mais barata.</p>
<h2>O que muda para quem passa a ter uma subestação?</h2>
<p>O empreendimento precisa planejar sua relação com a infraestrutura: documentação, controle de acesso, responsáveis, manutenção e continuidade da operação. A compra dos equipamentos não encerra o trabalho. Entregas e responsabilidades devem ser combinadas desde o projeto.</p>
<p>Em uma empresa com refrigeração, por exemplo, o gestor pode precisar conciliar intervenções com a preservação de produtos. Em outro estabelecimento, o impacto principal pode ser a paralisação da produção. São exemplos ilustrativos de planejamento; os critérios técnicos de cada instalação dependem de sua avaliação.</p>
<h2>Como organizar o primeiro contato</h2>
<ol><li>Informe endereço, atividade e situação do fornecimento atual.</li><li>Separe contas de energia e documentos existentes.</li><li>Liste equipamentos e mudanças previstas na operação.</li><li>Identifique plantas, áreas disponíveis e restrições de acesso conhecidas.</li><li>Explique se a necessidade é construir, adequar, ampliar ou manter.</li></ol>
<p>Não entre em áreas elétricas para coletar dados por conta própria. Se uma informação só puder ser obtida no local, combine um levantamento com equipe habilitada e autorizada. As referências de segurança para trabalhos em eletricidade devem ser observadas pela equipe responsável.</p>
<h2>Qual é o próximo passo?</h2>
<p>O resultado da primeira conversa deve ser um escopo de avaliação e uma lista do que falta conhecer. A solução técnica vem depois desse levantamento. Se você já possui o conjunto instalado e quer adicionar equipamentos, siga pelo ${link(5, 'guia de aumento de carga')}; se a instalação será nova, veja ${link(2, 'como preparar os documentos do projeto')}.</p>`
},
{
    title: 'Subestação aérea ou abrigada: como comparar as alternativas',
    keyword: 'subestação aérea ou abrigada',
    summary: 'Compare subestação aérea e abrigada pelo espaço, acesso, operação, obras e requisitos de fornecimento antes de escolher a solução.',
    siblings: [0, 2, 3], sources: [ndu, nr10],
    body: `<p class="lead">A escolha entre <strong>subestação aérea ou abrigada</strong> deve considerar a instalação inteira: condições do terreno, configuração de atendimento, equipamentos, acesso, segurança e operação futura. O nome da alternativa ou o preço de um transformador não é suficiente para decidir.</p>
<p>Este artigo organiza os critérios para uma comparação inicial. A possibilidade de usar cada configuração e seus limites dependem do projeto e das exigências aplicáveis ao fornecimento. Uma solução encontrada em outro imóvel não comprova que ela será aceita no seu.</p>
<h2>Qual é a diferença entre as configurações?</h2>
<p>Na solução aérea, os equipamentos previstos ficam dispostos em estrutura externa elevada, conforme o arranjo adotado. Na abrigada, a instalação ocupa uma cabine ou espaço construído para receber os equipamentos. Essa diferença afeta o uso do terreno, as obras e o modo de planejar acesso e manutenção.</p>
<p>Transformador, medição, proteção e demais partes precisam estar claramente identificados na proposta. Termos como “cabine pronta”, “subestação completa” ou “padrão de média tensão” não garantem escopos equivalentes. Solicite o desenho preliminar e a relação de entregáveis antes de comparar valores.</p>
<h2>Compare as opções em seis dimensões</h2>
<ul><li><strong>Implantação:</strong> área necessária, posição em relação ao empreendimento e interferências conhecidas.</li><li><strong>Obras:</strong> estruturas, bases, espaços técnicos e interfaces com arquitetura e construção.</li><li><strong>Acesso:</strong> entrada das equipes e movimentação dos equipamentos durante implantação e futuras intervenções.</li><li><strong>Operação:</strong> restrições de uso das áreas e necessidades de acompanhamento.</li><li><strong>Ambiente:</strong> exposição e condições que precisam ser consideradas na especificação.</li><li><strong>Expansão:</strong> possibilidades e limitações para as alterações previstas no negócio.</li></ul>
<p>Esses critérios não atribuem uma vitória automática a nenhuma opção. O resultado útil é identificar quais alternativas são tecnicamente possíveis no local e como cada uma atende aos objetivos do contratante.</p>
<h2>Espaço disponível é mais do que metragem livre</h2>
<p>Uma área aparentemente desocupada pode ter circulação de veículos, passagem de instalações, limitações de acesso ou planos de construção futura. Informe essas condições ao projetista. Reservar um espaço na planta sem verificar o uso real pode transferir o problema para a fase de obra.</p>
<p>Na alternativa abrigada, discuta as necessidades do espaço técnico com arquitetura e engenharia. Na alternativa aérea, avalie as interfaces da estrutura com o entorno. Distâncias, arranjos e requisitos construtivos precisam vir do projeto aplicável; este comparativo não oferece medidas universais.</p>
<h2>Como os requisitos da distribuidora entram na escolha?</h2>
<p>O catálogo de normas da Energisa identifica a NDU 002 como referência para fornecimento em tensão primária. O responsável pelo projeto deve conferir a versão vigente e os documentos pertinentes à localidade e ao pedido. A aprovação de uma instalação anterior não substitui essa consulta.</p>
<p>Antes de comprar equipamentos, esclareça o que precisa estar definido sobre ponto de conexão, medição, proteção e condições de atendimento. A proposta comercial deve dizer quem conduzirá a interface com a distribuidora e como serão tratadas eventuais revisões.</p>
<h2>Manutenção e substituição precisam caber no planejamento</h2>
<p>Pense além da montagem inicial: por onde um equipamento entrará ou sairá? Que áreas podem ser afetadas por uma intervenção? Quem controla os acessos? Como uma parada será combinada com a operação? As respostas influenciam a conveniência da solução ao longo do tempo.</p>
<p>Uma alternativa aparentemente simples pode exigir logística que não foi considerada no orçamento inicial. Da mesma forma, uma obra civil maior pode fazer sentido para um cenário e ser desnecessária em outro. A comparação deve expor essas condições, sem tratá-las como vantagens universais.</p>
<h2>Como comparar dois orçamentos com justiça</h2>
<p>Peça que ambos partam das mesmas informações de carga e do mesmo objetivo. Identifique o que está incluído em projeto, obras, equipamentos, instalação, testes, documentação e interface com a distribuidora. Se houver diferenças, registre-as antes de comparar o preço final.</p>
<p>Confirme também o que depende de levantamento, a validade das premissas e quem assume cada etapa. Uma proposta mais baixa pode excluir a infraestrutura que a outra já contempla. O ${link(3, 'guia de custos de subestação')} explica como organizar essa comparação por blocos de entrega.</p>
<h2>Exemplo de decisão para um imóvel em expansão</h2>
<p>Considere uma empresa que pretende ampliar um galpão dentro de dois anos. Se a área escolhida para a subestação conflitar com essa expansão, o custo futuro de remanejamento precisa entrar na conversa. A equipe pode comparar alternativas de implantação com base no plano de ocupação do terreno.</p>
<p>Esse exemplo é ilustrativo, não um projeto executado pela Klyfe. Ele mostra por que escolher apenas pela condição atual pode deixar de fora uma necessidade já conhecida. Também não recomenda comprar capacidade sem justificativa: expansão prevista deve ser descrita e avaliada.</p>
<h2>Checklist para a reunião de escolha</h2>
<ol><li>Apresente planta e restrições de uso do terreno.</li><li>Confirme as alternativas tecnicamente viáveis com o projetista.</li><li>Solicite as premissas sobre cargas e atendimento.</li><li>Compare obras, acesso e responsabilidades incluídas.</li><li>Discuta manutenção e mudanças futuras.</li><li>Registre a decisão e as condições que poderão exigir revisão.</li></ol>
<p>A escolha deve terminar com uma justificativa compreensível e um próximo passo definido. Se faltam dados essenciais, o levantamento pode ser a entrega a contratar antes do projeto completo.</p>`
},
{
    title: 'Projeto de subestação: documentos, etapas e entregáveis',
    keyword: 'documentos para projeto de subestação',
    summary: 'Organize os documentos de entrada, as etapas e os entregáveis de um projeto de subestação, incluindo a interface com a distribuidora.',
    siblings: [0, 1, 3], sources: [ndu, nr10],
    body: `<p class="lead">Para começar um <strong>projeto de subestação</strong>, reúna informações da instalação, das cargas, do imóvel e do atendimento pretendido. A lista final de documentos depende do empreendimento, mas um bom briefing permite identificar cedo o que precisa ser levantado e quem fará cada parte.</p>
<p>O objetivo deste guia é ajudar o contratante a organizar o trabalho. Ele não substitui o projeto nem apresenta uma lista universal de documentos exigidos pela distribuidora. As exigências devem ser confirmadas pelo responsável técnico para o caso concreto.</p>
<h2>1. Descrever a necessidade com clareza</h2>
<p>Informe se será uma ligação nova, ampliação de instalação existente, mudança de uso ou adequação. Explique a atividade do empreendimento e o que motivou a solicitação. Uma nova linha de produção e a regularização de uma instalação antiga podem exigir levantamentos bastante diferentes.</p>
<p>Apresente também o cronograma desejado e as restrições conhecidas. A equipe precisa distinguir uma data comercial pretendida das etapas técnicas e externas necessárias. Ter projeto elaborado não significa que equipamento, obra, vistoria e ligação estarão concluídos no mesmo momento.</p>
<h2>2. Separar os dados disponíveis</h2>
<ul><li>Identificação do imóvel, endereço e dados do atendimento existente, quando houver.</li><li>Contas de energia e registros de demanda disponíveis.</li><li>Relação de equipamentos com características, quantidades e horários de operação.</li><li>Plantas, layout e informações sobre áreas disponíveis para a instalação.</li><li>Diagramas e documentos da infraestrutura elétrica existente.</li><li>Projetos de outras disciplinas que possam interferir na implantação.</li><li>Histórico de alterações, pendências e planos de expansão.</li></ul>
<p>Marque o que está confirmado, desatualizado ou ausente. É melhor declarar a falta de uma informação do que tratá-la como uma premissa certa. A proposta pode prever levantamento complementar antes de fechar o dimensionamento.</p>
<h2>3. Levantar as condições reais do local</h2>
<p>O levantamento verifica as informações necessárias ao escopo e identifica interfaces que não aparecem nos arquivos disponíveis. A equipe pode precisar conhecer áreas, trajetos, acessos e condições da instalação existente. Combine previamente quem permitirá os acessos e quais documentos estarão disponíveis.</p>
<p>Não peça a funcionários sem autorização que abram compartimentos ou acessem áreas elétricas para adiantar o serviço. A coleta de dados de campo precisa fazer parte do planejamento de segurança da equipe responsável. O contratante pode começar pelo acervo administrativo e pelos arquivos já disponíveis.</p>
<h2>4. Desenvolver e compatibilizar a solução</h2>
<p>O projeto transforma os dados do empreendimento em uma solução documentada. Conforme o escopo, entram configuração, equipamentos, proteção, medição, aterramento, implantação e estudos associados. A equipe define os cálculos e critérios aplicáveis, com base nas normas e condições de atendimento pertinentes.</p>
<p>Compatibilizar significa resolver interfaces entre a solução elétrica e as demais disciplinas. Se a posição proposta interfere com uma circulação ou com uma obra prevista, a questão deve voltar ao projeto. Guardar versões e registrar decisões ajuda a evitar que a execução use informações superadas.</p>
<h2>5. Definir a interface com a distribuidora</h2>
<p>Quando a interface estiver incluída na contratação, esclareça quem reúne documentos, protocola o pedido, acompanha respostas e comunica pendências. Consulte os canais e as normas vigentes da distribuidora, incluindo a NDU 002 da Energisa quando aplicável ao fornecimento.</p>
<p>Protocolo, análise, aprovação, vistoria e ligação representam situações diferentes. Peça que o acompanhamento informe a etapa real, o que falta e quem depende de qual providência. Não trate um comprovante de envio como autorização para executar qualquer solução ou como garantia de data de energização.</p>
<h2>6. Conferir os entregáveis do contrato</h2>
<p>Discuta desenhos, diagramas, memoriais, especificações, estudos e registros de responsabilidade técnica correspondentes às atividades contratadas. Confirme formatos, revisões e limites de uso dos arquivos. O importante é que o contratante consiga identificar o conjunto de documentos que orientará as próximas etapas.</p>
<p>Verifique separadamente se estão incluídos acompanhamento de obra, compra de materiais, montagem, ensaios, comissionamento e documentação conforme executado. Esses serviços não devem ser presumidos apenas porque a proposta contém a expressão “projeto completo”.</p>
<h2>7. Controlar mudanças até a entrega</h2>
<p>Uma mudança de equipamento, de carga ou de implantação pode alterar premissas. Combine como essas alterações serão comunicadas, avaliadas e incorporadas. A última versão emitida precisa estar identificada, e os responsáveis pela execução devem saber qual arquivo utilizar.</p>
<p>Após a obra, a documentação deve refletir as entregas contratadas e as mudanças aprovadas. Guarde os arquivos com registros de intervenções e pendências. Esse acervo será importante para manutenção e futuras expansões, mesmo que o responsável pela gestão do imóvel mude.</p>
<h2>Exemplo de briefing para enviar à Klyfe</h2>
<p>“Precisamos avaliar uma subestação para [atividade] em [endereço]. A situação atual é [ligação existente ou obra nova]. Pretendemos incluir [equipamentos ou expansão]. Temos [plantas, contas e documentos] e precisamos levantar [dados ausentes]. O prazo desejado é [data], com estas restrições operacionais: [condições].”</p>
<p>Esse roteiro facilita definir a primeira etapa sem antecipar uma potência ou configuração por palpite. Para comparar as propostas que vierem depois, utilize o ${link(3, 'guia de composição do custo de uma subestação')}.</p>`
},
{
    title: 'Quanto custa uma subestação? Entenda o orçamento completo',
    keyword: 'quanto custa uma subestação',
    summary: 'Veja o que compõe o custo de uma subestação e como comparar projeto, obras, equipamentos, instalação e operação sem misturar escopos.',
    siblings: [0, 1, 2], sources: [ndu],
    body: `<p class="lead">O <strong>custo de uma subestação</strong> depende da solução de atendimento, das condições do imóvel e das entregas contratadas. O preço do transformador é apenas uma parcela. Para obter um orçamento utilizável, é preciso separar projeto, infraestrutura, equipamentos, execução e despesas associadas às etapas de implantação.</p>
<p>Não apresentamos uma faixa em reais sem levantamento e cotações equivalentes. Um valor genérico pode omitir obras e serviços decisivos no seu caso. Este guia mostra como pedir uma estimativa, comparar propostas e identificar o que ainda depende de confirmação.</p>
<h2>Os blocos que devem aparecer na conversa de orçamento</h2>
<ul><li><strong>Engenharia:</strong> levantamento, projeto, estudos e documentação previstos.</li><li><strong>Infraestrutura:</strong> obras e adequações necessárias à implantação da solução.</li><li><strong>Equipamentos:</strong> transformador e demais itens definidos pelo projeto.</li><li><strong>Instalação:</strong> montagem, conexões, mão de obra e logística correspondentes.</li><li><strong>Verificações e entrega:</strong> ensaios, comissionamento e registros quando incluídos.</li><li><strong>Interface externa:</strong> acompanhamento do atendimento e eventuais itens dependentes da distribuidora, conforme o caso.</li></ul>
<p>Essa divisão é um roteiro comercial, não uma lista normativa. Cada proposta precisa explicar suas próprias premissas, exclusões e condições. Um item pode estar agrupado com outro, desde que o escopo permaneça compreensível.</p>
<h2>Por que dois imóveis com a mesma potência podem ter custos diferentes?</h2>
<p>Acesso, posição da instalação, extensão dos percursos, obras existentes, necessidade de adequação e logística podem mudar entre os imóveis. Equipamentos com a mesma potência nominal também precisam ser comparados pelas características especificadas para a aplicação.</p>
<p>Além disso, uma instalação nova pode ter informações que outra não possui. Quando faltam desenhos ou dados confiáveis, o levantamento necessário deve entrar no planejamento. Uma estimativa que pressupõe tudo resolvido não equivale a um orçamento que inclui a obtenção dessas informações.</p>
<h2>Aérea ou abrigada: como isso afeta a comparação?</h2>
<p>A configuração escolhida muda a infraestrutura e as interfaces da obra. Em vez de assumir que uma alternativa será sempre mais econômica, peça estimativas baseadas nas opções tecnicamente viáveis para o local. A equipe deve indicar o que muda em obras, equipamentos e acesso.</p>
<p>O ${link(1, 'comparativo entre subestação aérea e abrigada')} ajuda a organizar esses critérios. Aqui, a pergunta é financeira e contratual: os orçamentos incluem a mesma solução e o mesmo conjunto de entregas?</p>
<h2>Como montar um quadro de comparação</h2>
<p>Para cada proposta, registre: escopo, premissas de carga, configuração, serviços de engenharia, obras incluídas, equipamentos, execução, verificações, documentos, prazo e exclusões. Acrescente uma coluna com os pontos ainda dependentes de levantamento ou definição externa.</p>
<p>Marque cada item como incluído, excluído ou a confirmar. Não transforme “a confirmar” em custo zero. Peça que o fornecedor explique como aquele ponto será resolvido e qual etapa permitirá precificá-lo. Quando faltar informação essencial, contratar primeiro um levantamento pode tornar as propostas posteriores comparáveis.</p>
<h2>Exemplo ilustrativo: proposta A e proposta B</h2>
<p>Imagine que a proposta A inclua equipamento e montagem, enquanto a proposta B inclua também projeto e infraestrutura. O preço final de A pode parecer menor, mas ainda faltam entregas. Para comparar, será necessário completar o escopo de A ou separar os componentes de B.</p>
<p>O mesmo cuidado vale para propostas que usam equipamentos ou condições de implantação diferentes. Esse exemplo não representa preços praticados pela Klyfe: serve para mostrar que comparar o total sem ler o objeto pode levar a uma conclusão incorreta.</p>
<h2>Prazo, logística e condições comerciais</h2>
<p>Peça que o cronograma identifique dependências: conclusão do projeto, disponibilidade de equipamentos, liberação da área, obra, verificações e etapas externas. Uma data de entrega de material não é necessariamente a data em que a instalação estará disponível para uso.</p>
<p>Confira validade da proposta, condições de pagamento, transporte, movimentação de equipamentos e tratamento de alterações. Quando houver atividades fora do horário usual ou parada da operação, identifique como serão combinadas e precificadas. Esses pontos devem estar documentados no contrato.</p>
<h2>Investimento inicial e operação são contas diferentes</h2>
<p>Além da implantação, planeje o acompanhamento da instalação ao longo do tempo: manutenção, documentação, intervenções e impacto de indisponibilidade. Isso não significa somar um percentual arbitrário ao investimento, mas identificar responsabilidades e necessidades previsíveis.</p>
<p>Uma eventual análise de tarifa ou economia deve ser feita separadamente, com dados do consumo e das condições de fornecimento. Ter uma subestação não autoriza prometer redução automática da conta. A escolha técnica e a comparação econômica precisam de premissas explícitas.</p>
<h2>O que enviar para receber uma estimativa melhor</h2>
<ol><li>Endereço e atividade do empreendimento.</li><li>Situação da ligação atual e objetivo da implantação.</li><li>Relação de cargas e documentos disponíveis.</li><li>Planta, área prevista e restrições conhecidas.</li><li>Escopo desejado: projeto, execução, adequação ou etapas combinadas.</li><li>Prazo pretendido e condições que afetam a operação.</li></ol>
<p>Comece pelo ${link(2, 'roteiro de documentos do projeto')} se ainda não houver dados suficientes. A melhor proposta é aquela que permite entender o que será entregue, o que falta definir e como cada decisão altera o orçamento.</p>`
},
{
    title: 'Manutenção de subestação: como planejar a parada e os registros',
    keyword: 'planejamento de manutenção de subestação',
    summary: 'Organize a manutenção da subestação com histórico, escopo, planejamento da parada, documentação e acompanhamento das pendências.',
    siblings: [0, 5, 2], sources: [nr10, monitoring],
    body: `<p class="lead">Planejar a <strong>manutenção de uma subestação</strong> envolve conhecer o histórico da instalação, definir o escopo técnico e coordenar o trabalho com a operação do empreendimento. Uma data no calendário e uma proposta genérica de “revisão completa” não esclarecem quais atividades serão feitas nem o que ficará pendente.</p>
<p>Este guia é voltado ao gestor que precisa contratar e acompanhar o serviço. Não apresenta procedimentos de manobra, ensaio ou intervenção. A execução depende de profissionais habilitados e autorizados, com planejamento de segurança adequado aos trabalhos.</p>
<h2>Preventiva, preditiva e corretiva: como entender os termos</h2>
<p>A preventiva organiza intervenções planejadas; a preditiva usa informações sobre a condição dos equipamentos para orientar decisões; a corretiva trata problemas identificados. Na prática, um plano pode combinar abordagens, conforme os ativos, o histórico e as necessidades da instalação.</p>
<p>A avaliação de condição de transformadores é destacada pela Schneider Electric como apoio à decisão de manutenção. Isso não transforma uma medição isolada em diagnóstico completo: resultados precisam ser interpretados no contexto do equipamento e de seu funcionamento.</p>
<h2>Qual deve ser a periodicidade?</h2>
<p>Não adote um intervalo universal copiado de outra empresa. O plano deve considerar recomendações dos fabricantes, requisitos aplicáveis, ambiente, histórico, uso e criticidade dos equipamentos. O responsável técnico deve explicar quais atividades serão periódicas e quais eventos podem antecipar uma avaliação.</p>
<p>Um cronograma precisa identificar equipamento ou conjunto, atividade prevista, responsável e registro esperado. Também deve ser revisto quando a instalação ou sua operação mudar. Ter cumprido uma visita anterior não resolve automaticamente uma condição nova.</p>
<h2>Quais informações reunir antes de pedir o serviço?</h2>
<ul><li>Diagramas e documentos disponíveis da instalação.</li><li>Identificação dos equipamentos e manuais existentes.</li><li>Relatórios, ensaios e intervenções anteriores.</li><li>Histórico de falhas, alarmes e desligamentos conhecidos.</li><li>Alterações recentes e planos de expansão.</li><li>Restrições de acesso e impactos de uma parada na operação.</li></ul>
<p>Dados de equipamento devem vir do acervo ou ser levantados pela equipe autorizada. O gestor não precisa abrir instalações para preencher o pedido. Se os registros são incompletos, declare essa condição para que o levantamento seja considerado no escopo.</p>
<h2>Como definir o que será feito</h2>
<p>Solicite uma proposta que identifique os ativos abrangidos, as atividades, as condições necessárias e os documentos de entrega. Termografia, ensaios e análise de óleo são exemplos de ferramentas que podem aparecer em planos específicos, mas não se aplicam indistintamente a qualquer equipamento.</p>
<p>A análise de óleo, por exemplo, pressupõe equipamento e fluido pertinentes ao serviço. A termografia registra uma condição observada e deve ser interpretada com suas limitações. O contratante deve entender a finalidade da atividade, sem escolher ensaios apenas pela quantidade de itens da proposta.</p>
<h2>Planejar a parada com a operação</h2>
<p>Identifique processos que dependem da energia: produção, refrigeração, sistemas de informação, bombas, segurança e demais cargas relevantes. Combine com os responsáveis o impacto aceitável, as necessidades de continuidade e a comunicação interna. A equipe técnica deve definir as condições elétricas do trabalho.</p>
<p>Esclareça antecipadamente se será necessária interface com a distribuidora e quem conduzirá o agendamento correspondente. Não prometa uma janela definitiva antes de confirmar as dependências. Tenha um canal de comunicação para mudanças e um responsável por informar a operação sobre o andamento.</p>
<h2>Exemplo de preparação de um estabelecimento</h2>
<p>Considere um comércio com refrigeração e processamento de pedidos. A administração informa esses processos à equipe, combina como proteger sua operação durante a indisponibilidade e organiza as pessoas que precisarão acompanhar a retomada. O planejamento técnico define o escopo e as condições do serviço.</p>
<p>O exemplo é ilustrativo. Ele não estabelece tempo máximo de parada nem dimensiona alimentação alternativa. Essas decisões dependem dos equipamentos, dos processos e da avaliação dos profissionais envolvidos.</p>
<h2>O que receber ao término do atendimento?</h2>
<p>Confira se o relatório identifica local, datas, equipamentos, atividades realizadas, condições encontradas e limitações. Resultados de ensaios devem vir acompanhados de informações que permitam compreender sua interpretação. Peça a relação das pendências e das providências recomendadas.</p>
<p>Um orçamento de manutenção pode prever avaliação e não incluir toda correção encontrada. Se houver serviço adicional, ele deve ter escopo definido. Documente o que foi resolvido, o que aguarda decisão e como será confirmada a conclusão das intervenções.</p>
<h2>Como acompanhar sem perder o histórico</h2>
<ol><li>Guarde os arquivos originais e vincule-os ao equipamento ou conjunto.</li><li>Registre pendência, localização, orientação técnica e responsável pela providência.</li><li>Controle a contratação e a execução das correções.</li><li>Arquive a evidência e a verificação de conclusão previstas.</li><li>Atualize desenhos e registros quando houver alterações.</li><li>Reavalie o plano quando mudar a operação ou surgirem novos achados.</li></ol>
<p>Fumaça, sinais de arco ou outras ocorrências perigosas devem ser tratados pelos procedimentos de emergência do empreendimento e pela equipe responsável; não se aproxime para investigar. Este roteiro administrativo não substitui o planejamento de segurança.</p>
<p>Se a demanda surgiu porque a empresa vai ampliar equipamentos, consulte também ${link(5, 'o que avaliar antes de aumentar a carga da subestação')}. Manutenção e estudo de capacidade respondem a perguntas diferentes.</p>`
},
{
    title: 'Aumento de carga: a subestação e o transformador suportam?',
    keyword: 'aumento de carga na subestação',
    summary: 'Saiba quais dados reunir para avaliar aumento de carga na subestação antes de instalar máquinas, climatização ou carregadores veiculares.',
    siblings: [0, 2, 4], sources: [energisa, ndu],
    body: `<p class="lead">Antes de instalar novas máquinas, ampliar a climatização ou adicionar carregadores veiculares, avalie o <strong>aumento de carga na subestação</strong>. A potência escrita na placa do transformador não responde, sozinha, se a instalação pode atender à mudança.</p>
<p>A análise precisa relacionar as novas cargas, o funcionamento atual, os equipamentos existentes e as condições de fornecimento. Este guia ajuda a preparar os dados para o estudo. Ele não fornece autorização de ligação nem dimensionamento a partir de uma conta rápida.</p>
<h2>Por que não basta subtrair a carga atual da potência nominal?</h2>
<p>Capacidade nominal, demanda medida e potência dos equipamentos representam grandezas e condições diferentes. Horários de uso, simultaneidade, características de partida e comportamento das cargas influenciam a análise. A capacidade dos demais elementos da instalação também precisa ser considerada.</p>
<p>Uma folga aparente no transformador não comprova que cabos, quadros ou proteções atendem à nova situação. Do mesmo modo, a soma das placas de todos os equipamentos não representa necessariamente o que opera ao mesmo tempo. O estudo precisa explicitar as premissas usadas.</p>
<h2>Quais dados da operação atual ajudam?</h2>
<ul><li>Contas de energia e registros de demanda disponíveis.</li><li>Horários, turnos e períodos de maior utilização.</li><li>Relação de cargas relevantes e seus modos de operação.</li><li>Diagramas e documentos da subestação e da distribuição interna.</li><li>Informações de equipamentos já registradas no acervo técnico.</li><li>Histórico de intervenções, falhas e limitações conhecidas.</li></ul>
<p>O profissional pode indicar medições ou levantamentos adicionais quando os dados disponíveis não forem suficientes. Não preencha lacunas com valores estimados sem identificá-los. A qualidade do resultado depende de saber o que foi medido, informado ou assumido.</p>
<h2>Como descrever as cargas que serão adicionadas</h2>
<p>Para cada equipamento novo, reúna ficha técnica, quantidade, regime de uso e previsão de horário. Explique se substituirá uma carga existente ou se será acrescentado à operação. Informe se a expansão ocorrerá de uma vez ou em etapas.</p>
<p>Inclua condições especiais conhecidas, como concentração de uso em determinado turno ou necessidade de continuidade. Em recarga veicular, por exemplo, a quantidade de pontos não descreve sozinha como serão utilizados. Rotina e estratégia de operação devem fazer parte do briefing.</p>
<h2>Quais partes da instalação entram na avaliação?</h2>
<p>O escopo pode envolver transformação, proteção, condutores, quadros, medição, aterramento e interfaces com a distribuição interna, conforme a mudança pretendida. A equipe define os estudos necessários e verifica se a documentação corresponde à instalação encontrada.</p>
<p>O resultado deve apontar as condições para a expansão, as adequações necessárias e os limites da análise. Não peça apenas uma resposta verbal de “pode instalar”: decisões que afetam projeto e operação precisam ser registradas de forma utilizável pelas equipes seguintes.</p>
<h2>Quando conversar com a distribuidora?</h2>
<p>Alterações de carga e atendimento podem envolver requisitos de fornecimento e etapas junto à distribuidora. A equipe deve verificar a situação do empreendimento e orientar o pedido aplicável. Na área da Energisa, as orientações de ligação e as normas técnicas são referências para essa consulta.</p>
<p>Trocar equipamento interno não substitui automaticamente a revisão das condições de atendimento. Também não se deve supor que uma solicitação de aumento será aceita sem outras providências. Defina quem acompanhará a interface e inclua suas dependências no cronograma da expansão.</p>
<h2>Quais resultados o estudo pode indicar?</h2>
<p>A avaliação pode concluir que a expansão é viável nas condições analisadas, que depende de adequações ou que exige rever o plano. Pode também identificar a necessidade de dados adicionais. O contratante deve compreender quais premissas sustentam a conclusão e o que faria essa conclusão deixar de valer.</p>
<p>Quando houver alternativas de implantação por etapas ou de organização da operação, elas precisam ser avaliadas tecnicamente. Uma mudança de horário pode alterar o perfil de uso, mas não elimina requisitos de segurança nem autoriza exceder limites dos equipamentos.</p>
<h2>Exemplo: nova linha de produção em outro turno</h2>
<p>Imagine uma fábrica que pretende instalar máquinas para funcionar em horário diferente do processo atual. O levantamento deve verificar se essa separação realmente ocorrerá, quais cargas continuarão ligadas e quais situações podem gerar coincidência de uso. A decisão não deve depender apenas do planejamento informal da equipe.</p>
<p>Esse exemplo é ilustrativo. Não afirma que operar em turnos diferentes elimina a necessidade de adequação. Mostra por que o estudo deve considerar o comportamento esperado e as condições que precisam ser mantidas.</p>
<h2>Energia solar ou manutenção resolvem a capacidade?</h2>
<p>Geração própria não deve ser tratada como garantia permanente de capacidade disponível para novas cargas: seu comportamento e sua interface com a instalação precisam de análise específica. A expansão deve considerar os cenários relevantes de operação, inclusive aqueles em que a geração não contribui como esperado.</p>
<p>A manutenção, por sua vez, avalia e trata condições dentro de seu escopo. Um relatório sem pendências não equivale a um estudo de aumento de carga. Se são necessárias as duas atividades, descreva-as separadamente na contratação.</p>
<h2>Checklist antes da compra dos equipamentos</h2>
<ol><li>Reúna documentos e dados da operação existente.</li><li>Descreva as cargas novas e seus horários.</li><li>Contrate a avaliação das condições de expansão.</li><li>Confirme as interfaces com a distribuidora e demais projetos.</li><li>Inclua adequações e verificações necessárias no orçamento.</li><li>Planeje execução, documentação e entrada em operação.</li></ol>
<p>Esse fluxo ajuda a evitar que equipamentos cheguem antes de a infraestrutura estar definida. Para organizar a contratação da engenharia, siga pelo ${link(2, 'guia de documentos e etapas do projeto de subestação')}.</p>`
}
];

// O guia da parada responde à preparação do cliente. O serviço concentra
// escopo técnico, modalidades de manutenção e contratação.
articles[4] = {
    title: 'Parada programada de subestação: checklist para a empresa',
    keyword: 'parada programada de subestação',
    summary: 'Prepare a operação para uma parada de subestação: responsáveis, processos afetados, documentos, comunicação e retomada.',
    siblings: [0, 5, 2], sources: [nr10],
    body: `<p class="lead">Uma <strong>parada programada de subestação</strong> afeta mais do que o quadro elétrico: pode interromper produção, refrigeração, sistemas de informação e atendimento ao público. Preparar a empresa antes da intervenção permite que cada área conheça seu papel e que as pendências sejam acompanhadas depois.</p>
<p>Este checklist é dirigido ao gestor do imóvel e à operação. A equipe técnica define as condições elétricas e os procedimentos de segurança. O objetivo aqui é organizar pessoas, informações, janelas de trabalho e decisões de negócio para que o serviço contratado possa acontecer com clareza.</p>
<h2>Comece pelo impacto da indisponibilidade</h2>
<p>Liste os processos que dependem da energia fornecida pela instalação. Considere produção, refrigeração, bombas, comunicação, segurança patrimonial, tecnologia, elevadores e outras cargas relevantes para o seu negócio. Identifique quais atividades podem parar e quais exigem providências específicas de continuidade.</p>
<p>Não presuma que todos os setores têm a mesma tolerância à interrupção. Um equipamento que fica desligado durante o expediente pode afetar entregas; outro pode perder dados ou exigir um procedimento próprio para retorno. Peça aos responsáveis de cada área que registrem essas consequências antes de confirmar a janela.</p>
<h2>Quem precisa participar do planejamento?</h2>
<ul><li><strong>Gestor do imóvel:</strong> centraliza o contato e confirma o acesso às áreas.</li><li><strong>Operação:</strong> informa o que pode ser interrompido e quando.</li><li><strong>Segurança do trabalho:</strong> alinha controles e comunicação conforme a organização.</li><li><strong>Equipe contratada:</strong> define o escopo técnico, as condições de trabalho e as informações necessárias.</li><li><strong>Responsáveis por processos críticos:</strong> preparam contingências, parada e retomada.</li></ul>
<p>Uma pessoa pode desempenhar mais de uma função, mas as responsabilidades devem estar explícitas. Confirme também quem pode autorizar mudanças no escopo e quem comunicará atrasos aos setores afetados.</p>
<h2>Documentos e informações para reunir</h2>
<p>Separe diagramas, identificação dos equipamentos, registros de intervenções anteriores e a lista de pendências conhecidas. Acrescente contatos dos responsáveis, regras de acesso e informações sobre reformas ou novas cargas. Se algum documento está ausente ou desatualizado, sinalize isso à equipe antes da visita.</p>
<p>O gestor não precisa entrar em área elétrica para coletar dados. Informações que exigem acesso técnico podem ser objeto de levantamento contratado. O plano da parada deve registrar o que já se sabe e o que ainda dependerá dessa verificação.</p>
<h2>Como escolher e confirmar a janela</h2>
<p>Combine a data considerando o impacto na operação e as dependências do serviço. Reserve tempo para preparação, intervenção, verificações e retomada, conforme orientação da equipe técnica. Uma agenda informada pela empresa não substitui a confirmação das condições necessárias para o trabalho.</p>
<p>Quando houver interface com a distribuidora ou terceiros, identifique quem solicita e acompanha cada etapa. Não anuncie uma hora definitiva de retorno antes de confirmar essas dependências. Registre um canal para comunicar mudanças durante a janela.</p>
<h2>Comunique a parada de forma útil</h2>
<p>Envie aos setores afetados um aviso com data, período estimado, áreas ou processos impactados, responsável pelo contato e providências anteriores ao desligamento. Quando aplicável, inclua orientações internas para salvar trabalhos, proteger produtos e interromper processos de modo ordenado.</p>
<p>Evite avisos vagos como “a energia poderá oscilar”. Quem opera precisa saber qual decisão tomar. Confirme o recebimento pelos líderes das áreas críticas e mantenha um registro de mudanças comunicadas depois.</p>
<h2>Exemplo: operação com refrigeração e pedidos online</h2>
<p>Imagine um estabelecimento cuja subestação alimenta câmaras frias e servidores de pedidos. A administração identifica quem cuida dos produtos, quem protege os sistemas digitais e qual pessoa acompanhará a retomada. Essas equipes comunicam seus limites à contratada antes de marcar a intervenção.</p>
<p>O exemplo é ilustrativo e não define duração segura de interrupção nem especifica alimentação de reserva. Essas decisões dependem dos equipamentos e da avaliação dos responsáveis pela operação.</p>
<h2>O que combinar para a retomada?</h2>
<p>Antes do início, defina quem receberá a comunicação de que a intervenção foi encerrada e quem verificará o retorno dos processos do negócio. Separe a confirmação técnica do serviço da conferência operacional da empresa: são responsabilidades relacionadas, mas têm objetivos diferentes.</p>
<p>Registre problemas percebidos na retomada e informe-os pelo canal combinado. Não peça a funcionários que investiguem diretamente equipamentos elétricos. Qualquer condição que exija nova intervenção deve retornar à equipe responsável.</p>
<h2>Depois da parada: registre decisões e pendências</h2>
<p>Guarde o relatório recebido com a data, o escopo realizado e as limitações declaradas. Transforme recomendações em uma lista de ações com responsável e situação. Se surgirem serviços adicionais, peça definição de escopo antes de tratá-los como concluídos.</p>
<p>Arquive também o aviso enviado aos setores, mudanças de programação e observações sobre a retomada. Esse histórico ajuda a preparar a próxima janela e evita que decisões operacionais se percam quando gestores ou fornecedores mudarem.</p>
<h2>Checklist do gestor</h2>
<ol><li>Mapear processos afetados e seus responsáveis.</li><li>Reunir documentos e declarar lacunas.</li><li>Confirmar escopo, acessos e dependências com a equipe contratada.</li><li>Combinar a janela e as providências internas.</li><li>Comunicar data, impacto e contato aos setores.</li><li>Planejar quem acompanha a retomada operacional.</li><li>Arquivar registros e acompanhar as pendências.</li></ol>
<p>Para conhecer modalidades de atendimento, atividades técnicas e contratação, consulte a página de serviço indicada ao final. Se a parada está ligada a uma ampliação da operação, veja ${link(5, 'o que avaliar antes do aumento de carga')}: essa decisão pode exigir um estudo próprio.</p>`
};

articles.forEach((article, i) => {
    const guide = guides[i];
    const contentHtml = `${article.body}<h2>Continue pelo Guia Subestação</h2><ul>${article.siblings.map(j => `<li>${link(j)}</li>`).join('')}</ul><h2>Planeje o próximo passo com a Klyfe</h2><p>Informe a localidade, a situação atual e o objetivo do atendimento. <a href="<%- getHomePrefix() %>/solucoes/engenharia/${guide.service}">Conheça o serviço de ${guide.service === 'manutencao-subestacao' ? 'manutenção de subestação' : guide.service === 'subestacao-aerea' ? 'subestações e cabines primárias' : 'projeto de subestação'} da Klyfe</a> e solicite uma definição de escopo para o seu empreendimento.</p>`;
    const words = contentHtml.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const heroImage = `/img/engenharia/${guide.service === 'manutencao-subestacao' ? 'manutencao-subestacao' : guide.service === 'subestacao-aerea' ? 'subestacao-aerea' : 'projeto-subestacao'}.webp`;
    const post = {
        slug: guide.slug, status: 'published', publishAt: date, dateModified: date, dateModifiedIso: `${date}T09:00:00-03:00`,
        title: article.title, metaTitle: article.title, summary: article.summary, metaDescription: article.summary,
        primaryKeyword: article.keyword, keywords: [article.keyword], searchIntent: 'informacional',
        category: 'eletrica', categoryLabel: 'Elétrica', tags: ['Subestação', 'Média tensão', 'Engenharia elétrica'],
        author: 'Klyfe Electric', authorType: 'Organization', authorBio: 'Conteúdo editorial da Klyfe Electric para apoiar a compreensão e a contratação de serviços. Os roteiros de organização não substituem projeto, consulta às normas aplicáveis nem avaliação do responsável técnico.',
        readTime: `${Math.ceil(words / 200)} min`, heroImage, imageAlt: 'Imagem ilustrativa de infraestrutura de subestação',
        canonicalPath: `/blog/${guide.slug}`, robots: 'index, follow', contentHtml,
        sources: article.sources, faq: [], affiliateDisclosure: false, affiliateProducts: [],
        internalLinks: article.siblings.map(j => ({ anchor: guides[j].title, url: `/blog/${guides[j].slug}` })),
        whatsappMessage: 'Olá! Li o Guia Subestação da Klyfe e gostaria de avaliar o escopo para meu empreendimento.'
    };
    fs.writeFileSync(path.join(__dirname, '../content/posts/published', `${date}-${guide.slug}.json`), JSON.stringify(post, null, 2) + '\n');
    console.log(`${guide.slug}: ${words} palavras`);
});
