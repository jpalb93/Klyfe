// Editorial source for the SPDA launch. Run from the repository root.
const fs = require('node:fs');
const path = require('node:path');
const guides = require('../config/spda-guides');
const dir = path.join(__dirname, '../content/posts/published');
const date = '2026-09-21';
const abnt = { title: 'ABNT Catálogo — NBR 5419, edição 2026', url: 'https://www.abntcatalogo.com.br/default.aspx?P=C0N63GK2P5N1', publisher: 'ABNT', lastVerifiedAt: date };
const revision = { title: 'NBR 5419:2026 em foco', url: 'https://crtsp.gov.br/crt-sp-e-abnt-se-unem-para-detalhar-a-nova-nbr-5419-em-sao-jose-dos-campos/', publisher: 'CRT-SP', lastVerifiedAt: date };
const pv = { title: 'Proteção contra descargas e surtos em sistemas fotovoltaicos sobre edificações', url: 'https://www.dehn-international.com/en/solutions/photovoltaics/buildings', publisher: 'DEHN — referência complementar internacional', lastVerifiedAt: date };
const link = (i, text) => `<a href="/blog/${guides[i].slug}">${text || guides[i].title}</a>`;
const related = indices => `<h2>Continue pelo Guia SPDA</h2><ul>${indices.map(i => `<li>${link(i)}</li>`).join('')}</ul>`;
const cta = '<h2>Converse com a Klyfe sobre a sua edificação</h2><p>Informe o endereço, o uso do imóvel, a situação do sistema e o objetivo do atendimento. A partir desses dados, a equipe pode definir levantamento, projeto, instalação, adequação ou inspeção, conforme a necessidade. <a href="<%- getHomePrefix() %>/solucoes/engenharia/spda">Conheça os serviços de SPDA da Klyfe e solicite uma avaliação do escopo</a>.</p>';
const articles = [
{
 i: 1, keyword: 'o que deve conter um laudo de SPDA', title: 'Laudo de SPDA: o que deve conter e como interpretar',
 summary: 'Aprenda a conferir escopo, evidências, medições, conclusões e pendências de um laudo de SPDA antes de usar o documento.',
 body: `<p class="lead">O <strong>laudo de SPDA</strong> registra uma avaliação técnica do sistema de proteção contra descargas atmosféricas. Para ser útil ao gestor, precisa deixar claro o que foi examinado, em quais condições, com quais referências e quais conclusões as evidências permitem. Receber um PDF assinado é apenas uma parte do processo: é preciso entender o que ele demonstra.</p>
<p>Este roteiro ajuda a ler e discutir o documento. Não é um modelo de laudo nem uma lista normativa exaustiva. O responsável técnico define a metodologia e os itens aplicáveis à edificação, consultando as referências vigentes e as exigências vinculadas ao objetivo da avaliação.</p>
<h2>Comece pela finalidade e pelo escopo</h2>
<p>Uma vistoria para conhecer um sistema antigo pode ter condições diferentes de uma inspeção após execução de um projeto. Antes de olhar a conclusão, confira o endereço, a identificação da edificação, as áreas abrangidas, as datas e a finalidade declarada. Se existem vários blocos, anexos ou coberturas, o documento precisa permitir reconhecer quais foram avaliados.</p>
<p>Leia também as exclusões. Uma cobertura sem acesso, uma conexão enterrada sem registro e um projeto não fornecido criam limitações diferentes. A ausência de evidência não deve desaparecer sob uma conclusão genérica. Peça que o profissional explique o efeito de cada limitação sobre o resultado e os próximos passos.</p>
<h2>Informações que ajudam a tornar o laudo verificável</h2>
<ul><li><strong>Identificação:</strong> imóvel, contratante, datas e profissional responsável.</li><li><strong>Referências:</strong> normas e documentos utilizados, com identificação de edição quando pertinente.</li><li><strong>Base documental:</strong> projeto disponível, registros anteriores e informações fornecidas pelo responsável pelo imóvel.</li><li><strong>Metodologia:</strong> inspeções e ensaios executados, pontos avaliados e condições relevantes.</li><li><strong>Evidências:</strong> fotografias identificáveis, registros e resultados associados aos locais examinados.</li><li><strong>Análise:</strong> interpretação dos resultados, não apenas uma sequência de números.</li><li><strong>Conclusão e encaminhamentos:</strong> condição observada, restrições, correções e verificações complementares.</li></ul>
<p>Use essa relação para conversar sobre a qualidade da entrega, sem presumir que todos os trabalhos têm o mesmo escopo. A responsabilidade técnica correspondente deve ser compatível com a atividade contratada; confirme o registro aplicável e os dados do profissional.</p>
<h2>Por que uma medição isolada não responde tudo?</h2>
<p>Um número sem indicação de ponto, método, instrumento, condição e critério de interpretação oferece pouca informação ao leitor. Mesmo quando uma medição faz parte do trabalho, ela precisa ser compreendida dentro da avaliação. Não transforme um valor isolado de resistência de aterramento em certificado de conformidade de todo o SPDA.</p>
<p>Confira se a conclusão se relaciona com as evidências apresentadas. Por exemplo, uma fotografia de um trecho de descida não comprova, por si só, a condição de todos os trechos do prédio. Se o relatório usa amostragem ou tem áreas não verificadas, essa circunstância precisa estar compreensível para quem decide sobre manutenção e contratação.</p>
<h2>Como interpretar pendências e recomendações</h2>
<p>Uma pendência útil identifica o local e o problema, explica o encaminhamento e permite acompanhar a solução. “Revisar o sistema” é menos acionável do que um registro que identifica o componente, descreve a condição observada e indica a necessidade de avaliação ou intervenção específica.</p>
<p>Peça uma separação clara entre o que exige correção, o que exige investigação e o que é recomendação de melhoria. A prioridade deve ser definida tecnicamente. Ao gestor cabe organizar responsáveis, recursos e acompanhamento, sem alterar por conta própria a classificação de risco.</p>
<h2>Exemplo de leitura: cobertura que não pôde ser acessada</h2>
<p>Imagine um condomínio cujo relatório informa que parte da cobertura estava inacessível. O gestor deve localizar essa restrição no escopo, verificar quais conclusões foram limitadas e solicitar orientação para completar o trabalho. Não basta arquivar o documento como se todas as áreas tivessem sido inspecionadas.</p>
<p>Esse é um exemplo ilustrativo, não um caso executado pela Klyfe. Ele mostra por que conclusão, evidências e limites devem ser lidos em conjunto. O mesmo raciocínio vale para documentação ausente ou modificações posteriores à data da visita.</p>
<h2>Laudo, projeto e manutenção são entregas diferentes</h2>
<p>O projeto define a solução; a inspeção avalia condições; o laudo documenta a análise realizada; a manutenção executa intervenções previstas no escopo. Um documento pode recomendar adequação sem incluir sua execução. Uma proposta de reparo pode não incluir nova avaliação após o serviço. Compare as entregas antes de comparar os preços.</p>
<p>A discussão de datas de acompanhamento e de mudanças no imóvel está no ${link(2, 'guia de inspeção e manutenção de SPDA')}. Aqui, o foco é saber o que o documento comprova e como usar suas informações.</p>
<h2>Checklist para receber e arquivar o documento</h2>
<ol><li>Confira imóvel, áreas avaliadas, datas e identificação do responsável.</li><li>Leia o escopo e as limitações antes da conclusão.</li><li>Verifique se as evidências permitem localizar as pendências.</li><li>Confirme o que está incluído na proposta de correção e no retorno técnico.</li><li>Guarde o arquivo original com anexos, registros de responsabilidade e histórico de intervenções.</li><li>Compartilhe as pendências com os responsáveis pela manutenção e registre o acompanhamento.</li></ol>
<p>A aceitação por seguradora, órgão público ou contratante depende das exigências específicas. Informe essa finalidade antes do serviço e confirme os requisitos com quem receberá o documento. O laudo não representa garantia de aprovação automática por terceiros.</p>`, siblings: [0, 4], sources: [abnt, revision]
},
{
 i: 2, keyword: 'inspeção e manutenção de SPDA', title: 'Inspeção e manutenção de SPDA: quando avaliar e o que verificar',
 summary: 'Organize inspeções e manutenção do SPDA: veja situações que pedem avaliação, registros necessários e como acompanhar correções.',
 body: `<p class="lead"><strong>Inspeção e manutenção de SPDA</strong> fazem parte do acompanhamento da edificação. A inspeção procura identificar condições e alterações relevantes; a manutenção trata as intervenções definidas para conservar ou recuperar o sistema. Uma atividade não substitui automaticamente a outra.</p>
<p>Para síndicos e gestores, a decisão prática é manter um plano documentado: o que acompanhar, quem avalia, quais eventos exigem contato com o responsável técnico e como registrar o fechamento das pendências. Esperar uma falha aparente dificulta conhecer o histórico real do sistema.</p>
<h2>De quanto em quanto tempo inspecionar?</h2>
<p>A periodicidade deve ser definida conforme os requisitos da edição vigente da ABNT NBR 5419, as características do sistema e da edificação e as condições aplicáveis ao empreendimento. O catálogo da ABNT e a divulgação do CRT-SP registram a atualização de 2026. Portanto, tabelas antigas encontradas na internet precisam ser conferidas antes de orientar o calendário do imóvel.</p>
<p>Este guia não reproduz intervalos normativos sem acesso integral à norma aplicável. Peça ao responsável técnico que registre a periodicidade de cada tipo de inspeção, a referência utilizada e os eventos que exigem avaliação extraordinária. Isso é mais útil do que tratar todo documento como se tivesse uma “validade anual” universal.</p>
<h2>Eventos que merecem contato com o responsável técnico</h2>
<ul><li>Reforma de cobertura, fachada ou estrutura que possa interferir no sistema.</li><li>Instalação de painéis solares, antenas, equipamentos ou novas estruturas metálicas.</li><li>Notícia ou indício de descarga atmosférica na edificação.</li><li>Condutor aparentemente rompido, componente solto ou conexão com alteração visível.</li><li>Corrosão, remoção de peças ou intervenção de terceiros nas proximidades do SPDA.</li><li>Mudança de uso, ampliação ou falta de histórico confiável do sistema.</li></ul>
<p>Esses sinais orientam a comunicação, não um diagnóstico pelo morador. Observações devem ser feitas de local seguro; não acesse telhados, abra instalações ou toque em componentes para tentar confirmar um problema. A avaliação e o acesso precisam de planejamento próprio.</p>
<h2>O que organizar antes da visita?</h2>
<p>Separe projeto e desenhos disponíveis, laudos anteriores, registros de manutenção e informações sobre reformas. Identifique a pessoa que poderá liberar áreas técnicas e explicar mudanças recentes. Informe antecipadamente restrições de acesso, horários, atividades do prédio e interferências com outros serviços.</p>
<p>Se não houver projeto, diga isso já no pedido. A equipe poderá avaliar a necessidade de levantamento e documentação complementar. Fotografias antigas podem ajudar a compreender mudanças, mas não substituem um registro técnico adequado da condição atual.</p>
<h2>O que a equipe pode avaliar?</h2>
<p>Conforme o escopo e os critérios técnicos, o trabalho pode examinar componentes de captação, descidas, conexões, fixações, interfaces de aterramento e equipotencialização, além da documentação e de alterações da edificação. A inspeção deve registrar os pontos efetivamente acessados e os limites encontrados.</p>
<p>Ensaios e verificações são selecionados pelo responsável técnico. Ao receber resultados, peça sua interpretação e relação com os critérios utilizados. Uma verificação visual e um ensaio não oferecem a mesma informação; o plano deve explicar quando e por que cada atividade é necessária.</p>
<h2>Como transformar a inspeção em manutenção acompanhável</h2>
<p>Organize as pendências em uma lista com identificação do local, descrição do achado, orientação técnica, responsável pela providência e evidência de conclusão. Combine com o profissional como será confirmada a adequação após a intervenção. Uma nota fiscal de material, sozinha, não demonstra que a correção foi executada e verificada.</p>
<p>Evite soluções improvisadas, como trocar componentes apenas por semelhança visual ou modificar trajetos para facilitar outra obra. A compatibilidade dos materiais, as conexões e a configuração precisam respeitar a solução técnica. Se houver mudança de projeto, a documentação deve acompanhar a condição executada.</p>
<h2>Exemplo de organização para um condomínio</h2>
<p>Considere, como situação ilustrativa, um prédio que reformará a impermeabilização da cobertura. Antes da obra, a administração identifica as interfaces com o SPDA e alinha o serviço com os responsáveis. Durante a execução, registra intervenções autorizadas. Ao final, providencia a verificação prevista e arquiva os documentos atualizados.</p>
<p>O benefício desse fluxo é evitar que uma obra aparentemente independente deixe alterações sem registro. Não significa que toda reforma exija a mesma solução: o responsável técnico define o que se aplica naquele caso.</p>
<h2>Ambientes costeiros e áreas industriais</h2>
<p>Em imóveis sujeitos a atmosfera salina ou ambientes agressivos, informe ao profissional o histórico de deterioração observado. Essa informação ajuda a avaliar materiais, conexões e condições de conservação. Não deduza um prazo apenas pela cidade: exposição, localização dos componentes e condições da instalação variam entre edificações.</p>
<h2>O que guardar após cada atendimento?</h2>
<ul><li>Relatório ou laudo com datas, áreas e limitações.</li><li>Registro das intervenções realizadas e dos componentes envolvidos.</li><li>Desenhos atualizados quando houver alterações.</li><li>Responsabilidade técnica e documentos pertinentes ao serviço.</li><li>Pendências ainda abertas, próximos passos e calendário definido.</li></ul>
<p>Se a dúvida é como avaliar a qualidade do documento recebido, consulte ${link(1, 'o que deve conter um laudo de SPDA')}. Manter esse arquivo acessível facilita a continuidade do cuidado quando muda o síndico, o gestor ou a empresa de manutenção.</p>`, siblings: [0, 5], sources: [abnt, revision]
},
{
 i: 3, keyword: 'diferença entre SPDA aterramento e DPS', title: 'SPDA, aterramento e DPS: diferenças e funções na proteção',
 summary: 'Entenda as diferenças entre SPDA, aterramento, equipotencialização e DPS, e por que nenhum componente resolve sozinho toda a proteção.',
 body: `<p class="lead"><strong>SPDA, aterramento e DPS têm funções relacionadas, mas diferentes.</strong> A existência de um dispositivo no quadro ou de uma haste no terreno não permite concluir que toda a edificação está protegida. A pergunta útil é como as medidas foram projetadas, instaladas e coordenadas para aquele imóvel.</p>
<p>Este comparativo ajuda a entender propostas e conversar com o responsável técnico. Não é uma orientação de montagem: escolha de componentes, conexões e dimensionamento dependem de avaliação da instalação.</p>
<h2>O que significa cada termo?</h2>
<h3>SPDA: proteção da estrutura contra efeitos das descargas</h3>
<p>O sistema de proteção contra descargas atmosféricas envolve uma solução para a edificação, com componentes e medidas definidos em projeto. A imagem popular do “para-raios” no telhado representa apenas uma parte possível dessa solução. Para compreender captação, descidas e contexto da avaliação, veja ${link(0, 'o guia sobre o que é SPDA')}.</p>
<h3>Aterramento: parte de uma instalação coordenada</h3>
<p>O aterramento participa das medidas de proteção elétrica e contra descargas, conforme o projeto. Não se resume a comprar uma haste nem pode ser avaliado apenas pela presença de um fio. Sua relação com condutores de proteção, conexões e equipotencialização precisa ser compreendida no conjunto da instalação.</p>
<h3>DPS: dispositivo de proteção contra surtos</h3>
<p>O DPS atua na limitação de sobretensões transitórias nos circuitos aos quais está associado. Sua especificação depende da aplicação e das características do sistema. Ter um DPS não substitui a avaliação de necessidade de SPDA nem demonstra que todos os equipamentos e entradas da edificação receberam proteção adequada.</p>
<h3>Equipotencialização: relação entre partes condutoras</h3>
<p>A equipotencialização integra o conceito de proteção ao tratar diferenças de potencial entre partes condutoras. As ligações necessárias são determinadas tecnicamente; conectar qualquer metal a qualquer ponto de terra por iniciativa própria pode contrariar a solução prevista. O planejamento precisa considerar as interfaces entre os sistemas.</p>
<h2>Comparação para ler uma proposta</h2>
<ul><li><strong>Se a proposta menciona SPDA:</strong> identifique se trata de projeto, execução, adequação ou inspeção e quais áreas estão abrangidas.</li><li><strong>Se menciona aterramento:</strong> confira a finalidade e a relação com a instalação existente, além dos registros e verificações previstos.</li><li><strong>Se menciona DPS:</strong> peça a identificação dos circuitos e equipamentos contemplados e a justificativa técnica da solução.</li><li><strong>Se menciona equipotencialização:</strong> confirme que as interfaces foram consideradas no projeto e na documentação.</li></ul>
<p>Esse roteiro evita comparar propostas que usam palavras parecidas, mas entregam trabalhos distintos. A menor lista de materiais não é necessariamente o mesmo serviço por um preço menor; pode simplesmente corresponder a um escopo diferente.</p>
<h2>“Tenho para-raios: meus equipamentos estão protegidos?”</h2>
<p>A presença de proteção externa não comprova, sozinha, a proteção dos sistemas internos. A avaliação precisa considerar as medidas aplicáveis às instalações e aos equipamentos. Da mesma forma, a instalação de DPS no quadro não permite dispensar a análise da estrutura.</p>
<p>Ao relatar uma queima de equipamento, reúna data, circunstâncias, circuitos afetados e intervenções recentes. Não atribua automaticamente todo defeito a uma descarga atmosférica ou à ausência de um único componente. O diagnóstico deve investigar as causas e os limites da proteção existente.</p>
<h2>Por que o preço de um componente não define o custo da solução?</h2>
<p>Uma proposta pode envolver levantamento, compatibilização, acesso, materiais, execução e verificação. Comparar apenas o preço de um DPS com o orçamento de adequação de SPDA mistura trabalhos diferentes. Peça uma descrição das entregas e identifique qual problema cada item busca resolver.</p>
<p>Também vale perguntar quem atualizará os desenhos e registros após a intervenção. Uma solução instalada sem documentação dificulta futuras reformas, manutenção e diagnóstico, mesmo quando os componentes são conhecidos no mercado.</p>
<h2>Exemplo: instalação de energia solar sobre uma cobertura</h2>
<p>A chegada de um sistema fotovoltaico cria novas interfaces com o que já existe no prédio. O instalador e o responsável pelo SPDA precisam alinhar os projetos antes da execução. Não basta dizer que o inversor tem proteção ou que a estrutura já conta com para-raios.</p>
<p>O roteiro específico dessa compatibilização está no ${link(5, 'guia de energia solar em edifício com SPDA')}. Separar a decisão em etapas ajuda a tratar cada função sem transformar este comparativo em um projeto genérico para qualquer cobertura.</p>
<h2>Perguntas úteis para o responsável técnico</h2>
<ol><li>Quais problemas e cenários foram considerados na avaliação?</li><li>Quais partes da edificação e da instalação estão no escopo?</li><li>Como a proposta considera os componentes que já existem?</li><li>Que documentos e verificações serão entregues?</li><li>O que precisa ser acompanhado após a instalação?</li></ol>
<p>As respostas devem permitir compreender a solução sem exigir que o contratante faça seu próprio dimensionamento. Não use especificações encontradas para outro imóvel como receita de compra. A referência brasileira para proteção contra descargas deve ser consultada em sua edição vigente, junto às demais normas aplicáveis ao projeto.</p>`, siblings: [0, 4], sources: [abnt, revision]
},
{
 i: 4, keyword: 'etapas de um projeto de SPDA', title: 'Projeto de SPDA: etapas, informações e documentos para começar',
 summary: 'Saiba o que reunir para um projeto de SPDA e como organizar levantamento, análise, compatibilização, execução e documentação final.',
 body: `<p class="lead">Um <strong>projeto de SPDA</strong> começa pelo conhecimento da edificação e da necessidade de proteção. Antes de escolher materiais ou posicionar componentes, o responsável técnico precisa de informações sobre o imóvel, seu uso, sua configuração e os sistemas que interagem com a solução.</p>
<p>Para quem contrata, preparar os dados certos reduz dúvidas na proposta e alterações durante a execução. Este guia explica o fluxo de trabalho e os documentos a discutir com a equipe, sem apresentar cálculos ou um projeto pronto para aplicação em qualquer prédio.</p>
<h2>1. Definir o objetivo e a situação do imóvel</h2>
<p>Informe se o serviço atende a uma construção nova, ampliação, mudança de uso ou adequação de sistema existente. Explique também o motivo do pedido: planejamento da obra, pendência de inspeção, necessidade de documentação ou alteração da cobertura. Essas informações ajudam a delimitar o levantamento.</p>
<p>Em uma edificação existente, diferencie o que é conhecido do que é presumido. Uma fotografia de um captor não substitui os desenhos do sistema, e um laudo antigo pode descrever uma condição anterior à última reforma. A equipe deve saber desde o início quais registros estão disponíveis.</p>
<h2>2. Reunir informações para o levantamento</h2>
<ul><li>Endereço, uso e identificação das áreas ou blocos envolvidos.</li><li>Plantas, cortes, fachadas e informações de cobertura disponíveis.</li><li>Características construtivas e informações sobre estruturas metálicas.</li><li>Projetos elétricos e dados dos sistemas existentes relacionados ao escopo.</li><li>Desenhos e registros anteriores do SPDA, quando houver.</li><li>Previsão de painéis solares, antenas, climatização e outros equipamentos na cobertura.</li><li>Condições de acesso e cronograma das obras que possam interferir no trabalho.</li></ul>
<p>Não é necessário inventar dados para preencher uma lista. Quando um documento não existir ou estiver desatualizado, informe a situação. O orçamento deve esclarecer se a obtenção dessas informações exige levantamento complementar e quem será responsável por ele.</p>
<h2>3. Avaliar risco e requisitos aplicáveis</h2>
<p>A necessidade e a solução de proteção não devem ser deduzidas apenas pela altura do prédio ou por comparação com o vizinho. A análise considera as características do caso e as referências aplicáveis. Cabe ao responsável técnico documentar as premissas, os critérios e a solução proposta.</p>
<p>O catálogo da ABNT já apresenta edição de 2026 da NBR 5419. Solicite a identificação das referências adotadas no projeto e esclarecimento sobre os requisitos pertinentes ao empreendimento. Uma menção genérica à norma em uma proposta não substitui a análise técnica.</p>
<h2>4. Compatibilizar o SPDA com os demais projetos</h2>
<p>A solução precisa conversar com arquitetura, estrutura, instalações e uso da cobertura. Caminhos previstos podem encontrar interferências com impermeabilização, fachadas, equipamentos ou áreas de circulação. Resolver essas interfaces no papel ajuda a evitar adaptações improvisadas durante a obra.</p>
<p>Defina quem centraliza as revisões e como alterações serão aprovadas. Se o projeto solar mudar a distribuição dos módulos após a análise do SPDA, por exemplo, a interface precisa ser reavaliada. O arquivo que chega à execução deve refletir as decisões vigentes, não uma versão anterior.</p>
<h2>5. Confirmar os entregáveis antes da contratação</h2>
<p>Discuta a necessidade de desenhos, memoriais, especificações, registros da análise e documentação de responsabilidade técnica. A relação final depende do objeto contratado. Esclareça se estão incluídos levantamento, projeto, acompanhamento da execução, inspeção posterior e documentação conforme executado.</p>
<p>Uma proposta exclusivamente de projeto pode não incluir materiais e mão de obra. Uma proposta de instalação pode partir de projeto fornecido por terceiro. Identificar essas fronteiras evita que a obra comece com a expectativa de que “SPDA completo” significa a mesma coisa para todas as partes.</p>
<h2>6. Executar com controle de alterações</h2>
<p>Durante a obra, qualquer necessidade de mudança deve ser encaminhada à equipe responsável. Registre decisões sobre trajetos, componentes e interfaces. Não deixe que uma adaptação em campo desapareça dos desenhos usados depois pela manutenção.</p>
<p>Combine antecipadamente quais etapas precisam de registro antes que elementos fiquem inacessíveis. Essa organização ajuda a construir um histórico utilizável da instalação e a esclarecer o que foi efetivamente executado.</p>
<h2>7. Entregar a documentação e planejar o acompanhamento</h2>
<p>No encerramento, confira se os documentos correspondem ao serviço realizado e quais pendências permanecem. A entrega pode envolver arquivos de projeto, registros de execução e verificações, de acordo com o contrato. O gestor deve conseguir identificar o sistema e localizar os responsáveis pelas próximas ações.</p>
<p>O cuidado continua após a obra. Veja ${link(2, 'como organizar inspeção e manutenção')} e ${link(1, 'como interpretar o laudo de SPDA')}. Esses materiais aprofundam atividades posteriores sem confundi-las com a elaboração do projeto.</p>
<h2>Um briefing simples para enviar à equipe</h2>
<p>“O imóvel fica em [endereço], tem uso [ocupação] e estamos planejando [obra ou adequação]. Temos [documentos disponíveis] e faltam [informações]. Existe um sistema instalado, mas [condição conhecida]. A cobertura receberá [alterações previstas]. Precisamos definir o escopo e os entregáveis.”</p>
<p>Esse exemplo organiza o contato inicial. Prazo e custo serão definidos conforme complexidade, acesso, dados disponíveis e atividades contratadas. Evite contratar com base somente na metragem ou em um orçamento de outra edificação.</p>`, siblings: [0, 5], sources: [abnt, revision]
},
{
 i: 5, keyword: 'energia solar em edifício com SPDA', title: 'Energia solar em prédio com SPDA: o que avaliar antes de instalar',
 summary: 'Vai instalar painéis solares em uma cobertura com SPDA? Veja como organizar a compatibilização, os documentos e as responsabilidades.',
 body: `<p class="lead">Instalar <strong>energia solar em um prédio com SPDA</strong> exige compatibilizar o novo sistema com a proteção da edificação. A existência de para-raios não significa que qualquer distribuição de módulos, estruturas e cabos possa ser adotada sem avaliação.</p>
<p>O momento de tratar essa interface é antes de fechar a configuração da cobertura. Este guia ajuda o proprietário a organizar o trabalho entre as equipes. Dimensionamento de proteção, ligações e seleção de dispositivos pertencem ao projeto técnico do caso.</p>
<h2>Por que a cobertura precisa ser reavaliada?</h2>
<p>O arranjo fotovoltaico acrescenta componentes e percursos ao espaço ocupado pelo sistema existente. A equipe precisa conhecer a posição dos módulos, suas estruturas de suporte, os equipamentos e a passagem dos cabos. O projeto anterior pode ter sido elaborado para outra configuração.</p>
<p>Como referência complementar, a DEHN destaca a importância da distância de separação entre proteção externa e sistema fotovoltaico, além do aterramento, da equipotencialização e da proteção contra surtos. Esses princípios precisam ser aplicados por profissional responsável conforme as normas brasileiras vigentes, sem copiar especificações de um exemplo internacional.</p>
<h2>O que entregar às equipes antes da análise?</h2>
<ul><li>Projeto e registros disponíveis do SPDA existente.</li><li>Último relatório de inspeção e lista de pendências conhecidas.</li><li>Planta da cobertura com o arranjo fotovoltaico proposto.</li><li>Informações sobre estruturas de suporte e equipamentos previstos.</li><li>Diagrama e trajetos propostos de cabos do sistema solar.</li><li>Previsão de obras de impermeabilização, estrutura, antenas ou climatização.</li></ul>
<p>Se não houver documentação confiável, preveja o levantamento necessário. Não trate o silêncio de um documento como prova de que não existe interferência. Uma planta atualizada costuma esclarecer melhor a situação do que várias fotografias sem localização.</p>
<h2>Quais perguntas a compatibilização deve responder?</h2>
<p>Peça às equipes que confirmem se a configuração proposta foi considerada na análise da proteção, como serão tratadas as interfaces e se há necessidade de adequação. A avaliação deve chegar a decisões que possam ser executadas e verificadas, não apenas à observação genérica “compatibilizar em obra”.</p>
<p>Conforme explica a referência da DEHN, manter ou não a distância de separação influencia a solução de proteção. Não existe uma distância universal que possa ser copiada deste artigo. Seu cálculo e as decisões decorrentes precisam considerar o sistema real.</p>
<h2>Quem cuida de cada parte?</h2>
<p>Antes de contratar, identifique quem responde pelo projeto fotovoltaico, quem avalia o SPDA e quem coordena as interfaces. Essas atividades podem estar no mesmo contrato ou distribuídas entre empresas; o importante é que a troca de informações e a aprovação das alterações estejam previstas.</p>
<p>Esclareça também quem executará eventuais adequações e quem fará as verificações correspondentes. Sem essa divisão, o fornecedor solar pode considerar que o prédio já resolveu a proteção, enquanto a manutenção predial supõe que tudo foi incluído na instalação solar.</p>
<h2>O que comparar nos orçamentos?</h2>
<p>Além dos componentes de geração, verifique se a proposta considera o levantamento das condições existentes, a compatibilização e os documentos de entrega. Quando houver necessidade de adequação do SPDA, identifique se esse serviço está incluído, será cotado separadamente ou depende de avaliação posterior.</p>
<p>Uma reserva genérica de “proteções” não descreve automaticamente todas essas atividades. Peça clareza sobre escopo, premissas e exclusões. O objetivo não é comprar mais itens sem necessidade, mas evitar que uma interface importante fique sem responsável.</p>
<h2>Cuidados durante a execução e na entrega</h2>
<p>A equipe deve trabalhar com a versão aprovada dos projetos. Alterações no arranjo dos módulos, suportes ou percursos de cabos precisam voltar à coordenação técnica quando afetarem a solução. Não desloque componentes existentes apenas para ganhar espaço na cobertura.</p>
<p>Na entrega, organize desenhos e registros coerentes com o que foi instalado, documentos das intervenções e orientações de acompanhamento. Solicite a relação de pendências e a identificação de verificações realizadas. O início da geração de energia não demonstra, por si só, que todas as interfaces de proteção foram verificadas.</p>
<h2>Exemplo: condomínio que decide ampliar o sistema solar</h2>
<p>Imagine uma ampliação que ocupa uma área antes livre do telhado. Mesmo que o sistema original esteja em operação, a nova configuração precisa ser comunicada aos responsáveis. O gestor reúne os documentos existentes, encaminha a proposta de expansão e confirma quais avaliações e atualizações serão necessárias.</p>
<p>O exemplo é ilustrativo. Ele mostra por que a avaliação acompanha as mudanças da edificação, em vez de ser tratada como um documento que resolve qualquer alteração futura.</p>
<h2>Perguntas frequentes sobre essa interface</h2>
<h3>Ter SPDA impede instalar energia solar?</h3><p>A presença do sistema não decide sozinha a viabilidade. É necessário avaliar a configuração proposta e as medidas de compatibilização aplicáveis ao imóvel.</p>
<h3>O DPS do inversor encerra a análise?</h3><p>Não. Um componente não comprova a adequação de todo o conjunto. Confira ${link(3, 'as diferenças entre SPDA, aterramento e DPS')} para entender por que as funções devem ser avaliadas de forma coordenada.</p>
<h3>Este estudo calcula economia e retorno financeiro?</h3><p>Aqui o foco é a interface de proteção. Para organizar as demais informações de contratação, consulte o ${'<a href="/blog/documentos-para-instalar-energia-solar">guia de documentos para instalar energia solar</a>'}. O estudo de geração e economia tem objetivo diferente e precisa de seus próprios dados.</p>`, siblings: [0, 4, 2], sources: [abnt, pv]
}
];
for (const article of articles) {
 const slug = guides[article.i].slug;
 const contentHtml = article.body + related(article.siblings) + cta;
 const words = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
 const post = { slug, status: 'published', publishAt: date, dateModified: date, dateModifiedIso: `${date}T12:00:00-03:00`, title: article.title, category: 'eletrica', categoryLabel: 'Elétrica', summary: article.summary, readTime: `${Math.ceil(words / 200)} min`, author: 'Klyfe Electric', authorType: 'Organization', authorBio: 'Conteúdo editorial da Klyfe Electric para apoiar a compreensão e a contratação de serviços. As referências públicas não substituem o projeto, a consulta integral às normas nem a avaliação do responsável técnico da edificação.', heroImage: '/img/infraestrutura-predial-vdi-bim.webp', imageAlt: 'Imagem ilustrativa de infraestrutura predial', keywords: [article.keyword], primaryKeyword: article.keyword, tags: ['SPDA', 'Proteção contra descargas atmosféricas', 'Engenharia elétrica'], searchIntent: 'informacional', metaTitle: article.title, metaDescription: article.summary, canonicalPath: `/blog/${slug}`, robots: 'index, follow', contentHtml, sources: article.sources, faq: [], affiliateProducts: [], affiliateDisclosure: false, whatsappMessage: 'Olá! Li o Guia SPDA da Klyfe e gostaria de avaliar o escopo para a minha edificação.' };
 fs.writeFileSync(path.join(dir, `${date}-${slug}.json`), JSON.stringify(post, null, 2) + '\n');
 console.log(`${slug}: ${words} palavras`);
}
const pillarPath = path.join(dir, '2026-03-10-spda-para-raios-obrigatorio.json');
const pillar = JSON.parse(fs.readFileSync(pillarPath, 'utf8'));
// Curated replacement of the old repetitive appendices; preserve the original article.
pillar.contentAppendHtml = `<h2>Qual é a sua dúvida sobre SPDA?</h2><p>Use este artigo como ponto de partida. Os guias abaixo aprofundam decisões diferentes, desde a preparação do projeto até o acompanhamento da manutenção.</p><ul>${guides.slice(1).map((guide, i) => `<li>${link(i + 1)} — ${guide.description}</li>`).join('')}</ul><h2>Como organizar uma primeira avaliação</h2><p>Reúna os desenhos disponíveis, relatórios anteriores e informações sobre reformas. Identifique o uso da edificação, as áreas envolvidas e o motivo da consulta. Não ter o projeto antigo é uma informação relevante: o responsável técnico pode precisar de levantamento complementar antes de concluir sua análise.</p><p>Separe também o que você pretende contratar. Projeto define uma solução; execução instala componentes; adequação trata mudanças necessárias; inspeção avalia condições e documentação. A proposta deve esclarecer as entregas e o que dependerá de uma etapa posterior.</p><h2>Referências atualizadas e limites da proteção</h2><p>A ABNT apresenta a edição de 2026 da NBR 5419 em seu catálogo. Consulte a edição vigente e peça ao responsável técnico a identificação das referências utilizadas. Não use um resumo antigo da internet para definir obrigatoriedade, intervalos de inspeção ou especificações de materiais.</p><p>O sistema busca reduzir riscos e efeitos das descargas dentro da solução adotada. Não representa uma promessa de ausência de danos em qualquer situação. A avaliação da estrutura e das instalações precisa considerar suas interfaces e ser atualizada quando mudanças relevantes ocorrerem.</p>${cta}`;
delete pillar.contentAppendBlocks;
pillar.dateModified = date;
pillar.dateModifiedIso = `${date}T12:00:00-03:00`;
pillar.author = 'Klyfe Electric';
pillar.authorType = 'Organization';
delete pillar.authorRole;
pillar.sources = [abnt, revision];
pillar.internalLinks = guides.slice(1).map(guide => ({ anchor: guide.title, url: `/blog/${guide.slug}` }));
pillar.keywords = ['o que é SPDA', 'como funciona o SPDA', 'quando avaliar a necessidade de SPDA'];
const full = pillar.contentHtml + pillar.contentAppendHtml;
pillar.readTime = `${Math.ceil(full.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200)} min`;
fs.writeFileSync(pillarPath, JSON.stringify(pillar, null, 2) + '\n');
