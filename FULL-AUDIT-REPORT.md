# Auditoria completa de SEO local e endereço — Klyfe Electric | Engenharia & Energia

> **Atualização editorial — 16/09/2026:** a auditoria específica do blog foi concluída em [BLOG-CONTENT-AUDIT-2026-09-16.md](BLOG-CONTENT-AUDIT-2026-09-16.md). Foram revisados 35 registros, com 33 artigos ativos, 2 aliases legados tratados por 301, metadados normalizados, duas rodadas de expansão, diferenciação de clusters e validação local de schema/links. Os 33 artigos ativos agora superam 1.500 palavras na renderização local. O plano de publicação e acompanhamento está em [BLOG-CONTENT-ACTION-PLAN-2026-09-16.md](BLOG-CONTENT-ACTION-PLAN-2026-09-16.md).

**Data:** 24 de agosto de 2026

**Escopo:** site completo, páginas regionais, dados estruturados, arquivos para buscadores/IA e sistema operacional que gera propostas.
**Endereço de referência:** Av. Pref. Severino Bezerra Cabral, 1225 - Mirante, Campina Grande - PB, 58410-640.

## A) Resumo da auditoria

O site publicado ainda está na faixa **Needs Improvement (estimativa 51/100)** para consistência local porque não exibe o endereço físico e apresenta uma área de atendimento de João Pessoa como se fosse localização. A implementação local agora atinge **100/100 no recorte auditado de SEO local, identidade empresarial, schema e GEO**. Esse resultado é condicional ao deploy e não representa uma nota global de SEO: desempenho/Core Web Vitals e imagens continuam sem score por falta de medição de produção.

### Três principais problemas confirmados

1. O site publicado mostra “Atendimento em todo o Estado da Paraíba” no lugar do endereço físico.
2. O `PostalAddress` era montado com textos de área de atendimento e podia sugerir uma sede em João Pessoa.
3. O sistema e os geradores de propostas mantinham endereço vazio, incompleto ou legado.

### Três principais oportunidades

1. Consolidar o NAP em uma fonte canônica compartilhada por todas as páginas.
2. Ligar o `LocalBusiness` ao endereço completo, mapa, telefone, e-mail e horários.
3. Separar explicitamente “sede física” de “área atendida” para Google e mecanismos de IA.

## B) Achados verificados

| Área | Severidade | Confiança | Achado | Evidência | Impacto | Correção |
|---|---|---|---|---|---|---|
| SEO local / NAP | Warning | Confirmed | O site publicado não exibe o endereço físico completo. | Home e contato publicados mostram apenas atendimento estadual; o endereço completo não aparece. | Reduz consistência com o Google Business Profile e sinais de relevância local. | Endereço incluído no rodapé global e na página de contato. |
| Schema | Warning | Confirmed | `streetAddress` recebia descrições de atendimento e o CEP era omitido. | `head.ejs` usava `cityData.address`; os valores incluíam “Atendimento Presencial e Consultoria - João Pessoa - PB”. | Dados estruturados factualmente incorretos e risco de filial inexistente. | `PostalAddress` passou a usar logradouro, cidade, UF, CEP e país canônicos. |
| Arquitetura regional | Warning | Confirmed | João Pessoa era apresentada como localização física. | A página publicada mostra essa descrição em “Onde Estamos”. | NAP divergente e confusão entre sede e área de serviço. | João Pessoa permanece em `areaServed`; a sede exibida é Campina Grande. |
| Sistema / propostas | Warning | Confirmed | A identidade do fornecedor estava vazia ou reduzida a “Campina Grande/PB”. | Tenant, fallback web e geradores continham valor vazio ou legado. | Novas propostas poderiam perpetuar dados incompletos. | Fonte canônica, migração segura de legados e atualização de todos os geradores. |
| GEO / IA | Warning | Confirmed | `llms.txt` usava área atendida como endereço principal. | Texto anterior: “Endereço principal: Atendimento em toda a Paraíba”. | Respostas ambíguas de mecanismos de IA sobre a sede. | `llms.txt` e `llms-full.txt` agora separam sede e área atendida. |
| Validação | Pass | Confirmed | O HTML corrigido apresenta NAP consistente. | Cinco rotas retornaram 200; todos os `PostalAddress` auditados têm logradouro e CEP corretos, sem endereço postal em João Pessoa. | Reduz divergências antes do deploy. | Testes automatizados adicionados e aprovados. |

O verificador determinístico processou **6 achados, manteve 6 e descartou 0** por duplicidade ou contradição.

## Implementação realizada

- Identidade empresarial centralizada em `config/business.js` no site.
- Endereço visível e clicável para o Google Maps em todas as páginas via rodapé.
- Bloco explícito da sede na página de contato.
- `LocalBusiness` com nome comercial idêntico ao Google Business Profile, `@id`, `legalName`, endereço completo, CEP, telefone, e-mail, `geo`, `hasMap`, `sameAs`, horários e `areaServed`.
- `ContactPage` ligado ao mesmo `LocalBusiness` canônico.
- Páginas de Campina Grande, João Pessoa e Paraíba alinhadas à sede real.
- `llms.txt` e `llms-full.txt` atualizados.
- Endereço do fornecedor centralizado no sistema, migrado no tenant e reutilizado em propostas web e geradores.
- CNPJ `44.390.273/0001-65` e razão social associados à identidade canônica do site e do sistema.
- Nome comercial canônico `Klyfe Electric | Engenharia & Energia` propagado ao schema, metadados e identidade do sistema.
- Coordenadas do perfil compartilhado do Google Maps verificadas e incluídas como `GeoCoordinates`: latitude `-7.2342674`, longitude `-35.868982`.
- Alegações fixas de nota e quantidade de avaliações removidas; o site agora direciona ao perfil atualizado no Google.

## Evidência técnica complementar

- `robots.txt`: HTTP 200, sitemap declarado e regras explícitas para crawlers tradicionais e de IA.
- `llms.txt`: HTTP 200 e endereço corrigido.
- `sitemap.xml`: HTTP 200, 221 URLs declaradas.
- Headers locais: CSP, HSTS, `X-Content-Type-Options` e `Referrer-Policy` presentes.
- EJS lint: aprovado.
- TypeScript API (`tsc --noEmit`): aprovado.
- Testes: endereço do site, calculadora solar e default do sistema aprovados.

## Derivação do score

Os scores são direcionais e seguem a rubrica da skill.

| Categoria | Sinais positivos | Déficits observados | Score estimado corrigido |
|---|---:|---:|---:|
| SEO técnico local | robots, sitemap, canonicals, headers e rotas validadas (5) | nenhum déficit confirmado no código (0) | 100 |
| Conteúdo / E-E-A-T local | NAP, CNPJ, razão social, horários e contato claros; alegações fixas de reviews removidas (5) | nenhum déficit confirmado no código (0) | 100 |
| On-page local | endereço, CNPJ, contato e link de mapa globais (4) | nenhum déficit confirmado no código (0) | 100 |
| Schema | identidade, endereço, NAP, coordenadas, mapa e horários completos (6) | nenhum déficit confirmado no escopo (0) | 100 |
| GEO / IA | `llms.txt`, `llms-full.txt`, NAP e separação sede/área (4) | nenhum déficit confirmado no escopo (0) | 100 |
| Performance | dados insuficientes | PageSpeed/CrUX não medidos | Insufficient data |
| Imagens | dados insuficientes | auditoria visual fora do recorte de endereço | Insufficient data |

Score ponderado normalizado entre as categorias do recorte local com evidência: **100/100**. O score publicado permanece estimado em **51/100** até o deploy. Performance e imagens não entram neste número porque não foram medidas.

## D) Desconhecidos e acompanhamentos

- O print do Google Business Profile informa CEP `58410-640`, mas diretórios externos associam o mesmo número ao CEP `58407-660`. O código preserva o CEP enviado pelo proprietário; confirmar no Google/Correios e corrigir citações divergentes.
- Nome e coordenadas já foram confirmados pelo link compartilhado do perfil; ainda é necessário confirmar se telefone e horários são exatamente os mesmos do site.
- Confirmar a razão social no Cartão CNPJ oficial; consultas públicas associam o número a “44.390.273 JAMERSON RICARDO DE SOUZA RUFINO”.
- Manter nota e quantidade de avaliações sem valores fixos até existir sincronização confiável com o perfil.
- Após o deploy, testar a URL pública no Rich Results Test/Schema Validator e solicitar nova indexação no Search Console.

## Limitações do ambiente

Os scripts Python de fetch/parse da skill não executaram porque o runtime não possui `requests` e `beautifulsoup4`. Isso é uma limitação do ambiente, não uma falha do site. A auditoria continuou com inspeção direta do HTML publicado, render local, parsing de todos os blocos JSON-LD das rotas selecionadas e testes do projeto. PageSpeed/CrUX não foi executado.

## Verificação externa da identidade

- O CNPJ informado pelo proprietário é `44.390.273/0001-65`.
- Consultas públicas associam esse CNPJ à razão social `44.390.273 JAMERSON RICARDO DE SOUZA RUFINO`.
- A implementação usa o endereço comercial do Google Business Profile no `LocalBusiness`; endereço fiscal e endereço comercial podem ser diferentes e não devem ser misturados.

## Auditoria complementar — páginas internas não solares (10 de setembro de 2026)

Esta seção registra a rodada atual do plano. Solar e Home ficaram fora do escopo de edição; os testes solares executados foram somente regressão.

### Achados confirmados

| Área | Severidade | Confiança | Achado | Evidência | Próximo passo |
|---|---|---|---|---|---|
| Crawlabilidade | Pass | Confirmed | O sitemap local está navegável. | 221/221 URLs responderam `200` no crawl local. | Repetir em produção. |
| Identidade de URL | Pass | Confirmed | Categoria arbitrária não publica cópia. | `/solucoes/eletrica/spda` retornou `404`. | Manter teste no CI. |
| Metadados | Pass | Confirmed | Páginas amostradas têm title, H1 localizado e meta description entre 128–159 caracteres. | SPDA/João Pessoa, instalações/Campina, carregador/Paraíba e automação/João Pessoa. | Monitorar no crawl de produção. |
| Schema | Pass | Confirmed | Serviço e trilha são publicados e ligados ao `LocalBusiness`. | Parser encontrou `Service` e `BreadcrumbList` parseáveis nos renders. | Validar também em produção. |
| Conteúdo | Warning | Confirmed | A página SPDA tem leitura densa para público geral. | `readability.py`: 380 palavras, Flesch 16,1. | Dividir frases e explicar siglas. |
| Claims | Warning | Likely | Parte do catálogo ainda depende de validação operacional. | Campos de ART, aprovação, prazos e garantias; manifesto com `needs-validation`. | Validar serviço por serviço antes de novos claims. |
| Conversão | Pass | Confirmed | Falhas do CRM não viram sucesso e tracking não envia PII ao dataLayer. | Suítes `contact-lead` e `tracking-governance` aprovadas. | Testar contrato real do CRM. |
| Arquitetura | Pass | Confirmed | Links relacionados usam o prefixo local. | Suíte `local-links` aprovada. | Revisar relações após qualquer consolidação. |

### Verificações executadas

- EJS lint: 62 templates, 0 erros; `node --check` aprovado nos arquivos JavaScript alterados.
- Suíte completa de testes aprovada: leads, manifesto, sitemap, identidade, links, tracking, endereço e regressões solar.
- CMS remoto indisponível no ambiente local; o site usou o JSON local. Isso não comprova o estado do acervo remoto.
- H1s das páginas de serviço não solares seguem o padrão `SERVIÇO + LOCALIDADE` (ex.: `Projeto e Laudo de SPDA em João Pessoa`), validado em render local.
- CTAs do glossário agora preservam a localidade da página; o link solar existente não foi alterado.

### Desconhecidos

- GSC, Analytics, CRM e Core Web Vitals de produção.
- Escopo operacional, instrumentos, cobertura e autorização para cada claim técnico.
- Fonte editorial definitiva entre CMS remoto e JSON local.

## Atualização — rodada de legibilidade não solar (10 de setembro de 2026)

Foram adicionados blocos “Em linguagem simples”, respostas FAQ mais diretas e listas escaneáveis em SPDA, projeto de subestação, projeto elétrico, laudos e manutenção de subestação. Também foram divididos parágrafos longos e removidas afirmações absolutas não comprovadas nos contextos dessas páginas.

Leitura local após a revisão: SPDA 459 palavras / Flesch 23,5; laudos 433 / 23,5; projeto de subestação 429 / 16,9; projeto elétrico 431 / 14,5; manutenção 499 / 15,2. O indicador continua baixo porque o vocabulário normativo é técnico e a fórmula é apenas um proxy; a estrutura agora responde primeiro às dúvidas do visitante e explica as siglas antes do detalhamento.

Solar e Home continuam fora do escopo de conteúdo e edição.

## Atualização — segunda rodada de legibilidade e confiança não solar (11 de setembro de 2026)

Esta rodada ampliou a revisão para o restante das páginas de serviço que usam o template de detalhe. O escopo permaneceu restrito a engenharia, elétrica e automação; Solar e Home não tiveram conteúdo ou rotas editados.

### Alterações aplicadas

- Inclusão de um bloco “Em linguagem simples” em 11 páginas de detalhe: projetos multifamiliar, unifamiliar, comercial, industrial e de múltiplas unidades; projeto luminotécnico; perícia para ressarcimento; perícia de TOI; viabilidade de carregadores; SPDA; e projeto de subestação.
- Explicação direta de termos como prumada, medição agrupada, seletividade, TOI, demanda e viabilidade.
- Revisão dos contextos de João Pessoa e Campina Grande para preservar sinais locais sem superlativos, garantias de aprovação, promessa de resultado jurídico ou afirmações de capacidade não validadas.
- Remoção de promessa de resultado solar em uma FAQ residencial que estava fora do escopo desta rodada.
- FAQ e listas de escopo mantidas como referência contratual, com dependências e limites explícitos.
- Novo teste automatizado garante que toda página de detalhe tenha resumo explicativo e não introduza promessas absolutas nesse bloco.

### Verificações da rodada

- 11 páginas de detalhe verificadas com bloco explicativo presente.
- 8 rotas representativas locais retornaram HTTP 200, com H1 no formato serviço + localidade e bloco de linguagem simples renderizado.
- Contagem de conteúdo textual nas rotas amostradas: 401–546 palavras antes de navegação e rodapé; a estrutura de escopo, contexto, processo e FAQ permanece disponível para expansão editorial futura.
- Média de frases nas amostras: 13,4–14,8 palavras. O Flesch continua baixo por causa do vocabulário técnico em português; esse indicador foi usado como proxy de edição, não como fator de ranking.
- Suíte completa de testes aprovada, incluindo a nova verificação de linguagem simples, endereço, links, sitemap, identidade de rota, tracking e regressões solares.
- EJS lint aprovado nos templates; verificação sintática aprovada nos 96 arquivos JavaScript.

### Próximo gate editorial

Antes do deploy, um engenheiro deve confirmar escopo, instrumentos, prazos, cobertura geográfica, ART e documentos de cada serviço. A revisão de legibilidade melhora a compreensão e a conversão, mas não substitui a validação operacional dos claims.

## Auditoria semântica de FAQ, conteúdo e CTAs — 11 de setembro de 2026

### Escopo e método

Esta rodada verificou se o conteúdo visível, as perguntas frequentes e as chamadas para ação correspondem ao serviço e à categoria da URL. O recorte principal foi /solucoes/** não solar, com uma verificação de regressão nas páginas solares para identificar vazamento de temas elétricos. Solar e Home continuam fora do escopo de edição; nenhuma página foi alterada nesta auditoria.

Foram revisados o código das rotas e templates, os dados de config/locations, e o HTML renderizado localmente. O crawl percorreu 93 URLs não solares do sitemap, todas com HTTP 200. A busca de termos solares foi feita apenas no conteúdo de main, excluindo navegação, rodapé e elementos institucionais globais. O CMS remoto estava indisponível e o render usou o JSON local.

### Resultado executivo

- 93/93 URLs não solares do sitemap responderam 200.
- Nenhum CTA não solar contém “solar”, “fotovoltaico” ou equivalente.
- Foi confirmado 1 vazamento no dado de FAQ: a pergunta de Projeto Elétrico Unifamiliar em Campina Grande ainda menciona “energia solar”. Hoje ela está no config e não chega ao HTML porque o faqExtra regional não é renderizado; quando essa integração for corrigida, a pergunta seria publicada sem a limpeza.
- Foram confirmados 3 conjuntos de páginas de Carregador Veicular (Paraíba, Campina Grande e João Pessoa) com conteúdo solar dentro do corpo da página: o card “Integração Solar” e o card relacionado “Energia Solar”.
- Foram confirmadas 21 URLs de serviços elétricos específicos (7 slugs × 3 localidades) que renderizam a página-hub “Serviços Elétricos”, sem H1, FAQ ou CTA próprios do serviço.
- Nove hubs regionais (Engenharia, Elétrica e Automação nas 3 localidades) não renderizam FAQ, apesar de existir faqExtra nos registros de serviço. Os templates consultam cityData.faqExtra, enquanto os dados estão em cityData.services.<serviço>.faqExtra.
- Vinte e duas páginas de detalhe localizadas (11 serviços × Campina Grande e João Pessoa) têm faqExtra regional no config, mas o template de detalhe renderiza apenas serviceData.faq; a pergunta local não chega ao HTML.
- Seis páginas de Laudos e Manutenção de Subestação usam CTA de cidade genérico no topo e no rodapé, embora o conteúdo e as FAQs sejam específicos.
- Nove páginas de detalhe de perícia/viabilidade usam o fechamento “Inicie Seu Projeto Técnico”, texto pouco adequado para serviços que não são projetos.

### Achados prioritários

| Severidade | Confiança | Achado | Evidência | Impacto |
|---|---|---|---|---|
| High | Confirmed | FAQ de projeto elétrico residencial mistura Solar em página de Engenharia Elétrica. | config/locations/campina-grande.js:176 pergunta “...carregamento de veículos elétricos e energia solar?”. A resposta já não repete Solar. A pergunta está no config e passará a ser visível quando o faqExtra regional for ligado ao template. | Quebra a separação temática solicitada e pode atrair intenção de energia solar para uma página de projeto elétrico. |
| High | Confirmed | Páginas elétricas filhas não têm identidade própria. | routes/services.js:13-19 envia cada slug ao template configurado; os sete slugs tomadas-interruptores, iluminacao, chuveiro-eletrico, ventiladores, quadro-distribuicao, fiacao-cabeamento e ar-condicionado usam template eletrica em config/locations/default.js:593-668. O render mostra H1 “Serviços Elétricos na/em ...”, FAQ zero e CTA “Solicitar Orçamento”/“Ver Especialidades”. | URL, H1, conteúdo e CTA não respondem à intenção específica do serviço; risco alto de perda de relevância e conversão. |
| High | Confirmed | Conteúdo Solar aparece no corpo de Carregador Veicular. | views/carregador-veicular.ejs:62-64 exibe “Integração Solar” e “telhado solar”; views/carregador-veicular.ejs:145-152 repete o card “Energia Solar”. O mesmo template é usado nas 3 localidades. | Vazamento direto entre a vertical solar e a página elétrica, exatamente o cenário que esta auditoria deveria impedir. |
| Medium | Confirmed | FAQs regionais estão configuradas, mas não são renderizadas nos detalhes. | views/servicos/detalhe-servico.ejs:182-193 itera somente serviceData.faq; não há leitura de serviceData.faqExtra. Exemplos de dados locais: config/locations/campina-grande.js:163-177 e config/locations/joao-pessoa.js:146-160. | Perde diferenciação local, perguntas úteis e cobertura semântica; o visitante vê somente as 3 FAQs base. |
| Medium | Confirmed | FAQ dos hubs também não chega ao HTML. | views/engenharia.ejs:138-151, views/eletrica.ejs:156-169 e views/automacao.ejs:149-162 consultam cityData.faqExtra; routes/services.js:127-154 não passa serviceData nos hubs e config/locations guarda o FAQ no registro do serviço. | Nove hubs ficam sem FAQ, mesmo havendo conteúdo preparado; dados estruturados/UX de FAQ ficam incompletos. |
| Medium | Confirmed | CTA de Laudos e Manutenção perde o nome do serviço. | views/servicos/laudos-eletricos.ejs:30,310 e views/servicos/manutencao-subestacao.ejs:30,371 usam cityData.cta, que é “consultoria/orçamento” genérico; os CTAs específicos estão nos registros dos serviços. | Reduz clareza da ação e pode gerar lead genérico em páginas transacionais específicas. |
| Medium | Likely | Fechamento “Inicie Seu Projeto Técnico” é inadequado para perícia e viabilidade. | views/servicos/detalhe-servico.ejs:211-213 é compartilhado por 11 serviços; perícia de ressarcimento, perícia de TOI e viabilidade de carregador não são projetos de execução. | Mensagem final desalinhada com a intenção e com o escopo contratado, embora o botão de orçamento continue funcional. |

### Alinhamentos confirmados

- FAQs hardcoded de Laudos, Projeto Elétrico, Aprovação Energisa, Subestação Aérea, Manutenção, Correção de Fator de Potência, Instalações Industriais, Carregador Veicular, Projeto de Rede e Automação Residencial tratam do serviço correspondente.
- As 33 páginas que usam o template de detalhe apresentam as 3 FAQs-base pertinentes ao respectivo serviço; o problema regional é a ausência do faqExtra, não a troca da FAQ-base por outra vertical.
- As páginas de SPDA, subestação, projetos residenciais/comerciais/industriais, perícias e viabilidade mantêm conteúdo técnico coerente com a intenção da URL.
- O scan de CTA não encontrou referência solar em páginas não solares.
- Na regressão das páginas solares, termos como NBR 5410, SPDA ou subestação aparecem apenas como interfaces técnicas de proteção/infraestrutura; não foram encontrados CTAs ou FAQs de perícia, furto de energia ou serviços elétricos genéricos dentro das páginas solares.
- Links globais de navegação, rodapé, blog e páginas institucionais que citam as três verticais não foram tratados como vazamento: são elementos de arquitetura do site, não promessa de serviço da página.

### Conteúdo alinhado, mas com claims a validar

Os temas abaixo são pertinentes às páginas, porém precisam de confirmação operacional ou regulatória antes do deploy:

- config/locations/default.js:35-36: “todos os laudos” plenamente aceitos por seguradoras e órgãos.
- config/locations/default.js:50-52: atendimento em todos os municípios da Paraíba.
- config/locations/default.js:272: prazo de análise da Energisa entre 15 e 30 dias.
- config/locations/default.js:478: prazo de 90 dias atribuído à ANEEL para ressarcimento.
- config/locations/default.js:564: promessa de projeto elétrico completo e execução dentro de uma página de viabilidade.
- config/locations/default.js:579-580: garantia técnica para todos os serviços elétricos.
- config/locations/default.js:706-707: “redução drástica” de custos em automação.
- config/locations/campina-grande.js:56-57 e :90: promessa de cuidar de toda aprovação e de garantir menor tempo de inatividade.

Esses itens não são vazamentos de vertical, mas podem transformar uma FAQ correta quanto ao tema em uma afirmação excessiva ou desatualizada. A classificação é Likely/Warning até haver fonte, contrato ou política comercial que os sustente.

### Limitações e gate

O resultado comprova o render local com JSON local e não o acervo remoto nem a produção. Antes de publicar, corrigir os achados High, decidir se cross-sells entre verticais são permitidos, ligar os faqExtra ao template correto e validar com responsável técnico os claims de prazo, aprovação, cobertura, garantia e execução.

## Implementação das inconsistências semânticas — 11 de setembro de 2026

Esta seção registra as correções aplicadas após a auditoria. Solar e Home continuam fora do escopo de edição de conteúdo; apenas referências solares indevidas em páginas não solares foram removidas.

### Correções aplicadas

- Removidos os cards e referências de Solar do conteúdo de Carregador Veicular e Automação Residencial; o card de Carregador Veicular foi substituído por Gestão de Carga.
- Corrigida a FAQ regional de Projeto Elétrico Unifamiliar em Campina Grande, sem referência a Solar.
- Ativada a renderização de faqExtra regional no template de detalhes, nos hubs de Engenharia, Elétrica e Automação e nas páginas especializadas de Laudos e Manutenção.
- As sete páginas filhas de Elétrica passaram a usar conteúdo específico, com H1, introdução, explicação em linguagem simples, escopo, benefícios, processo, FAQ e CTA próprios para tomadas e interruptores, iluminação, chuveiro elétrico, ventiladores, quadro de distribuição, fiação e cabeamento e ar-condicionado.
- Os CTAs de páginas de detalhe, Laudos e Manutenção passaram a usar o nome e a ação do serviço; o fechamento genérico foi substituído por títulos contextuais em perícia, viabilidade e demais serviços.
- Claims de aceitação por seguradoras, cobertura geográfica, prazos de concessionária/ANEEL, execução completa, garantia universal, redução drástica de custos, aprovação integral, menor inatividade e vida útil de materiais foram reescritos para linguagem condicional e dependente de escopo, contrato, instalação e regras vigentes.

### Verificação pós-implementação

- 93/93 rotas não solares do sitemap responderam HTTP 200.
- Zero termo solar robusto foi encontrado no conteúdo principal de rotas não solares e zero CTA não solar contém Solar, fotovoltaico ou equivalente.
- Nenhuma rota não solar ficou sem FAQ no crawl renderizado.
- As 21 URLs regionais das sete páginas filhas de Elétrica agora exibem identidade própria de serviço, FAQ e CTA contextual.
- Os FAQs regionais configurados passaram a ser renderizados nos detalhes e hubs que os possuem.
- Os nove hubs regionais passaram a exibir o FAQ configurado para o respectivo serviço.
- Os 13 arquivos de teste passaram; também passaram a verificação sintática JavaScript, o lint EJS e a verificação de diferenças.

### Limitações e próximo gate

A validação foi feita com o servidor local e o JSON local, pois o CMS remoto estava indisponível. Antes do deploy, repetir o crawl no ambiente de produção e confirmar com o responsável técnico os claims operacionais e regulatórios. Nenhum conteúdo próprio de Solar ou Home foi alterado.

## Auditoria e correção de CTAs WhatsApp não solares — 11 de setembro de 2026

### Escopo e achado

Esta rodada verificou todos os links de WhatsApp publicados em páginas classificadas como não solares. O problema confirmado era a combinação de mensagens genéricas da cidade, que não informavam o serviço de origem, com alguns links sem o parâmetro text. A página de Manutenção de Subestações era um exemplo direto: seus botões abriam somente o número do WhatsApp.

### Correção aplicada

- O contexto de tracking agora identifica serviço e localidade pela URL usando os rótulos do catálogo de serviços.
- A mensagem passa a informar o serviço, por exemplo: “Vim da página de Manutenção de subestações na Paraíba e gostaria de solicitar uma avaliação e orçamento.”
- Hubs, páginas filhas, páginas especializadas, páginas institucionais, blog, menu, rodapé e botão flutuante reutilizam o contexto contextualizado.
- Links que estavam sem mensagem em Manutenção de Subestações, Laudos, Projeto Elétrico, Subestação Aérea e Contato passaram a usar a URL contextualizada.
- CTAs que ainda consultavam apenas cityData.whatsappMessage passaram a priorizar a mensagem específica da URL.
- Solar permanece separado: seus telefones, mensagens e templates não foram alterados.

### Verificação pós-implementação

- 133 URLs não solares do sitemap foram renderizadas localmente.
- 633 links WhatsApp foram auditados.
- 0 links ficaram sem o parâmetro text.
- 0 links mantiveram a mensagem genérica de cidade.
- Todas as páginas de serviço verificadas possuem pelo menos um CTA cuja mensagem contém o nome do serviço.
- A página de Manutenção de Subestações agora gera mensagem com o serviço e a localidade em todos os CTAs.
- O novo teste whatsapp-cta-governance.test.js passou, junto com a suíte existente.

### Limitação e próximo gate

O acesso direto ao domínio publicado estava bloqueado no ambiente desta execução; a evidência foi obtida pelo render local com o mesmo código do deploy. É necessário publicar esta alteração e repetir um clique real em cada tipo de CTA no domínio para confirmar o redirecionamento final ao WhatsApp.

## Auditoria completa de SPDA — 12 de setembro de 2026

### Escopo e método

Esta rodada verificou a coerência da oferta de SPDA com o que a Klyfe declara fazer, cobrindo:

- catálogo de serviços, páginas estaduais e regionais, hub de Engenharia e hub de Laudos;
- artigo publicado de SPDA, acervo legado e pauta editorial;
- conteúdo textual, FAQs, CTAs, links internos, sitemap, robots.txt, `llms.txt` e `llms-full.txt`;
- canonical, robots, títulos, meta descriptions, H1, imagens, JSON-LD, SSR e resposta HTTP;
- render local das 257 URLs do sitemap, com o CMS remoto indisponível.

O domínio publicado não pôde ser acessado neste ambiente por bloqueio de socket. Portanto, os resultados abaixo comprovam o código e o render local atual, mas ainda exigem um crawl pós-deploy no domínio final.

### Conclusão executiva

O núcleo atual das páginas comerciais de SPDA está coerente com a oferta declarada: a Klyfe apresenta levantamento/projeto, instalação, adequação, inspeção, documentação e manutenção, sempre com ressalvas de edificação, responsabilidade e escopo contratado. As três URLs indexáveis — Paraíba, João Pessoa e Campina Grande — respondem 200, têm identidade própria de serviço, H1 localizado, meta description específica, canonical próprio, `index, follow`, CTA contextualizado e schema `Service`/`BreadcrumbList`.

O site inteiro ainda não está 100% coerente por causa de uma camada editorial antiga. O artigo publicado de SPDA contém afirmações securitárias e regulatórias categóricas; o hub de Laudos mantém uma generalização de periodicidade anual; o schema de blog transforma a FAQ comercial em `FAQPage`; e os arquivos de descoberta para IA ainda descrevem uma oferta menor que a atual.

Indicador interno de coerência SPDA: **79/100 — precisa de melhoria**, com confiança média. A nota reflete o bom estado das páginas de serviço e os riscos localizados em conteúdo editorial, schema e descoberta; não é uma previsão de ranking.

| Área | Nota | Evidência resumida |
|---|---:|---|
| Técnica | 85 | 257 URLs no sitemap; 255 em 200 e dois redirects não relacionados a SPDA; render SSR e metadados presentes. |
| Conteúdo | 70 | Página de serviço coerente, mas artigo e hub de Laudos ainda têm claims absolutos ou generalizados. |
| On-page | 90 | H1, title, description, canonical, CTA e termos de escopo alinhados nas três páginas principais. |
| Schema | 78 | `Service` e `BreadcrumbList` adequados no serviço; `FAQPage` indevido no artigo comercial. |
| Performance | 75 | Hero com preload; Core Web Vitals de produção não medidos. |
| Imagens | 75 | Alt presente, mas hero sem dimensões intrínsecas no elemento `img`. |
| AI Search | 70 | robots permite crawlers e `llms.txt` existe, porém o escopo de SPDA está subdescrito. |

### Achados priorizados

#### P1 — corrigir antes de promover o artigo ou publicar nova versão

**Área:** Conteúdo técnico/comercial
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** O artigo publicado afirma que a falta de laudo anual cancela a cobertura do seguro.
**Evidência:** `content/posts/published/2026-03-10-spda-para-raios-obrigatorio.json:15-16`; a FAQ aparece no HTML local de `/blog/spda-para-raios-obrigatorio`.
**Impacto:** É uma afirmação jurídica e securitária absoluta, sem depender da apólice, do evento, da documentação solicitada ou da análise da seguradora. Diverge da linguagem condicional usada na página comercial atual.
**Fix:** Reescrever em linguagem condicional e validar com responsável técnico/jurídico e com a documentação da apólice.

**Área:** Schema
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** A página comercial do artigo de SPDA publica `FAQPage` JSON-LD.
**Evidência:** `routes/blog.js:130-143` gera `FAQPage` para qualquer post que tenha FAQ; o render local do artigo contém `FAQPage`.
**Impacto:** O markup pode ser inelegível para rich result e mantém no grafo uma resposta de alto risco. A política do site não deve tratar serviço comercial como FAQ elegível por padrão.
**Fix:** Remover o `FAQPage` desse artigo ou restringir a emissão do schema à política editorial permitida.

**Área:** Conteúdo técnico
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** O artigo usa uma lista categórica para declarar quando o SPDA é obrigatório e apresenta proteção do sistema em termos amplos.
**Evidência:** `content/posts/published/2026-03-10-spda-para-raios-obrigatorio.json:12`; o texto cita altura de 15 m e tipos de ocupação como regra geral, sem amarrar a avaliação de risco, à edificação e à exigência local.
**Impacto:** Pode transformar cenários dependentes do caso em regra universal. A página de serviço atual já está mais segura ao condicionar a aplicação à edificação e ao escopo técnico.
**Fix:** Reescrever com condicionantes explícitas e fontes normativas/regulatórias revisadas.

**Área:** Conteúdo técnico
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** O hub de Laudos mantém periodicidade anual como regra geral para laudos de SPDA e instalações industriais.
**Evidência:** `views/servicos/laudos-eletricos.ejs:179`.
**Impacto:** Entra em tensão com a FAQ da página SPDA, que condiciona a validade ao tipo de inspeção, à edificação e à exigência aplicável.
**Fix:** Remover a generalização anual e informar que o prazo depende do documento, norma, órgão solicitante, seguradora ou contrato.

#### P2 — corrigir na próxima rodada editorial/técnica

**Área:** E-E-A-T/editorial
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** O artigo identifica autor, mas não registra fontes nem revisão técnica datada.
**Evidência:** `content/posts/published/2026-03-10-spda-para-raios-obrigatorio.json:9` identifica `Eng. Lucas Menezes`, mas não há `sources` nem `technicalReviewedAt`; `routes/blog.js` só gera `citation`/`reviewedBy` quando esses campos existem.
**Impacto:** Reduz a sustentação de claims normativos e dificulta a manutenção do conteúdo quando normas ou exigências mudarem.
**Fix:** Adicionar revisão técnica datada, fontes oficiais e escopo da responsabilidade editorial.

**Área:** GEO/descoberta
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** `llms.txt` e `llms-full.txt` descrevem SPDA apenas como projetos e inspeções/laudos.
**Evidência:** `public/llms.txt:7` e `public/llms-full.txt:16`, comparados com `config/locations/default.js:333-359` e `content/page-manifest.json:17-22`, que declaram também instalação, adequação e manutenção.
**Impacto:** Assistentes e mecanismos de descoberta podem interpretar a Klyfe como fornecedora de projeto/inspeção apenas.
**Fix:** Sincronizar os arquivos com o escopo vigente, preservando “conforme o escopo contratado”.

**Área:** SEO local/conteúdo
**Severidade:** Warning
**Confiança:** Confirmed
**Finding:** As três variantes regionais compartilham quase todo o conteúdo semântico e diferenciam-se principalmente pelo bloco local.
**Evidência:** Similaridade de vocabulário no crawl local: 0,889 entre Paraíba e João Pessoa; 0,887 entre Paraíba e Campina Grande; 0,865 entre João Pessoa e Campina Grande. Todas têm seção regional e status 200.
**Impacto:** A localização é funcional e não contraditória, mas a profundidade regional é baixa para três páginas indexáveis; pode diluir sinais locais e experiência do usuário.
**Fix:** Manter as páginas somente onde houver operação real; ampliar dados locais verificáveis, cenários e logística ou concentrar autoridade na página estadual.

#### P3 — melhoria de qualidade e medição

**Área:** Performance/imagens
**Severidade:** Info
**Confiança:** Confirmed
**Finding:** O hero do template de SPDA não declara `width`/`height` no elemento `img`.
**Evidência:** `views/servicos/detalhe-servico.ejs:49`; há preload em `views/partials/head.ejs:55`.
**Impacto:** O preload ajuda o LCP, mas dimensões ausentes podem permitir mudança de layout antes da decodificação em redes lentas.
**Fix:** Adicionar dimensões reais ou proporção reservada e medir CLS/LCP no domínio publicado.

**Área:** Governança editorial
**Severidade:** Info
**Confiança:** Confirmed
**Finding:** O acervo legado e a pauta automática mantêm caminhos para reintroduzir os claims antigos.
**Evidência:** `config/blog.legacy.js:198-236` repete as afirmações de seguro, obrigatoriedade e manutenção anual; `config/blog.js:1-5` o declara deprecated, mas `scripts/migrate-blog-to-json.js` ainda o lê. `config/blog-topics.js:30` e `:62` sugerem temas de obrigatoriedade e seguro.
**Impacto:** Uma migração ou nova geração editorial pode recuperar copy já identificada como excessiva.
**Fix:** Limpar o legado e criar guardrail de revisão técnica, fontes e linguagem condicional para pautas de SPDA.

### Alinhamentos confirmados

- `config/locations/default.js:327-435` declara os serviços que a Klyfe realmente apresenta: projeto, instalação, adequação, inspeção, documentação/ART e manutenção conforme contratação.
- As páginas `/solucoes/engenharia/spda`, `/joao-pessoa/solucoes/engenharia/spda` e `/campina-grande/solucoes/engenharia/spda` retornaram 200, com title, H1, meta description, canonical próprio, `index, follow`, CTA de SPDA e schema `Service`/`BreadcrumbList`.
- O texto diferencia SPDA, para-raios, captação, descidas, aterramento, equipotencialização e DPS, sem tratar DPS como substituto do SPDA.
- As três páginas mostram os três cenários comerciais — nova edificação, inspeção/manutenção e adequação de sistema existente — e seis etapas de processo.
- O FAQ da página de serviço não promete risco zero, condiciona ART e validade ao escopo e responde que o SPDA não impede a ocorrência de raios.
- O hub de Engenharia, o `page-manifest` e os links internos apontam para o pilar de SPDA; os links relacionados auditados retornaram 200.
- `robots.txt`, `sitemap.xml`, `llms.txt` e `llms-full.txt` retornaram 200 no servidor local. O robots permite crawlers de IA e aponta o sitemap.
- O crawl de 257 URLs encontrou 255 respostas 200 e apenas dois redirects, ambos de artigos não relacionados a SPDA.
- O visual desktop da página de SPDA foi inspecionado sem overflow horizontal; as regras CSS têm colunas responsivas para tablet e mobile. A medição visual direta de viewport mobile/tablet não foi possível neste ambiente.

### Verificações executadas

- Oito testes direcionados de serviço, semântica, H1 localizado, manifest, links, sitemap e CTA WhatsApp passaram.
- `node scripts/build-css.js` passou para os três bundles CSS.
- `node node_modules/ejs-lint/cli.js 'views/**/*.ejs'` passou.
- `git diff --check` passou; os avisos restantes são apenas conversões de final de linha do working tree.
- `finding_verifier.py` processou 10 achados, com 10 mantidos e nenhum suprimido.

### Limitações e próximo gate

O acesso HTTPS ao domínio publicado falhou por restrição de socket (`WinError 10013`) e os scripts de crawl que protegem contra SSRF recusaram `localhost` como alvo interno. O CMS remoto também estava indisponível; o render usou os JSONs locais. Não houve dados de PageSpeed/CrUX nem validação visual real em mobile/tablet.

Antes de considerar o tema encerrado, corrigir os quatro achados P1, sincronizar a descoberta para IA, decidir se as páginas regionais têm diferenciação operacional suficiente e repetir o crawl, os testes de schema e a medição de Core Web Vitals no domínio publicado.

## Implementação dos ajustes de SPDA — 12 de setembro de 2026

Esta rodada aplicou os ajustes de maior impacto identificados na auditoria anterior:

- o artigo publicado de SPDA foi reescrito para tratar necessidade, obrigatoriedade, seguro, manutenção e risco de forma condicional;
- foram adicionadas fontes oficiais de referência e data de atualização ao artigo;
- o `FAQPage` deixou de ser emitido pelo schema dos artigos do blog comercial, sem remover as FAQs visíveis ao leitor;
- o acervo legado foi sincronizado para não reintroduzir as afirmações antigas em uma migração;
- o migrador de blog passou a preservar `imageAlt`, datas de atualização, fontes, tags e palavras-chave;
- `llms.txt` e `llms-full.txt` passaram a refletir o escopo completo de SPDA;
- o link do termo SPDA no glossário passou a apontar para a página pilar estadual;
- o contexto de Campina Grande foi ampliado com cenários locais verificáveis, sem afirmar obrigação automática ou reprovação de vistoria.
- o hero de SPDA passou a declarar as dimensões reais da imagem para reservar espaço no layout.
- a página pilar passou a exibir referências técnicas oficiais com aviso de que elas não substituem a análise do responsável técnico.

### Verificação pós-implementação

- O artigo `/blog/spda-para-raios-obrigatorio` retornou 200, contém fontes, mantém FAQs visíveis e não contém `FAQPage` JSON-LD.
- As três páginas principais de SPDA continuam em 200, com title, H1, description, canonical, robots, `Service` e `BreadcrumbList`.
- O crawl completo permaneceu em 257 URLs: 255 respostas 200 e dois redirects não relacionados a SPDA.
- Em 78 páginas do crawl que mencionam SPDA por conteúdo, navegação ou rodapé, nenhum dos claims antigos de seguro, regra de 15 metros, manutenção obrigatoriamente anual ou cancelamento por negligência foi encontrado.
- O artigo e o fallback legado passaram na validação de JSON/configuração.

### Score atualizado e gate restante

O indicador interno de coerência SPDA sobe para **91/100 — bom**, com confiança média. O ganho vem da remoção dos claims antigos, do schema comercial inadequado e da divergência em `llms.txt`.

O score não é 100/100 ainda porque fontes e revisão técnica precisam ser validadas por um profissional responsável da Klyfe, a operação real de cada página regional precisa ser confirmada e faltam medições de produção de LCP, CLS e INP. Esses pontos não podem ser inventados pelo conteúdo do site nem comprovados em localhost.

## Verificação final do pacote SPDA — 12 de setembro de 2026

Após a implementação, a verificação local foi repetida sobre o sitemap atual e sobre as rotas prioritárias:

- o sitemap manteve 257 URLs, com 255 respostas 200, dois redirects não relacionados a SPDA e nenhum erro de rede;
- as seis URLs relacionadas a SPDA no sitemap não exibem `FAQPage` JSON-LD, e as três páginas de serviço mantêm `Service` e `BreadcrumbList` válidos no render local;
- não houve ocorrência, nas páginas de SPDA, dos claims antigos sobre cancelamento de seguro, regra automática de 15 metros, manutenção anual obrigatória ou negligência técnica;
- o artigo exibe fontes consultadas e data de atualização; a página pilar exibe referências técnicas oficiais, dimensões reais do hero e o aviso de que referências não substituem análise do responsável técnico;
- a suíte completa passou com 16 arquivos de teste, além do build CSS, lint EJS e teste específico de governança de SPDA.

O indicador interno de coerência sobe para **94/100 — bom**, com confiança média, no recorte que pode ser comprovado localmente. A nota não deve ser convertida em 100/100 antes de: (1) revisão e aceite formal do responsável técnico da Klyfe; (2) confirmação da operação real nas páginas regionais; (3) crawl, validação de schema e medição de LCP, CLS e INP no domínio publicado. Um filtro amplo também encontrou a expressão “superior a 15 metros” em três páginas de wallbox; trata-se de conteúdo fora do escopo SPDA e não foi classificado como claim de SPDA.

## Auditoria e reformulação do Glossário — 12 de setembro de 2026

### Escopo

Auditoria de página única da URL publicada `/glossario`, com comparação contra as três versões locais — estadual, João Pessoa e Campina Grande — e revisão de conteúdo, arquitetura, SEO on-page, links internos, schema e descoberta por IA.

### Diagnóstico da página publicada

- O H1 era `Glossário de Engenharia e Elétrica`, com uma proposta estreita em relação à oferta atual da Klyfe.
- O HTML observado apresentava 16 termos em 10 letras, navegação apenas por A–Z e definições curtas, sem busca ou filtro por assunto.
- Energia solar aparecia praticamente restrita a uma entrada genérica de “Energia Fotovoltaica”; não havia cobertura suficiente de módulos, inversor, strings, kWp/kWh, geração distribuída, homologação ou armazenamento.
- Também faltavam blocos estruturados para SPDA, carregamento veicular, automação industrial, instalações, laudos e fundamentos elétricos.
- Os CTAs editoriais estavam amarrados a Campina Grande, inclusive quando a página era estadual ou de João Pessoa.
- A rota local não emitia `DefinedTermSet`/`DefinedTerm` para representar semanticamente a base de conhecimento.

### Implementação aplicada

- A base editorial passou a ter **75 termos em 7 áreas**: fundamentos elétricos; instalações e distribuição; engenharia, laudos e normas; SPDA, aterramento e proteção; energia solar fotovoltaica; automação e sistemas inteligentes; e carregamento veicular.
- Cada entrada agora separa definição, aplicação prática, ponto de atenção, termos relacionados e, quando pertinente, serviço correspondente da Klyfe.
- A página ganhou busca textual tolerante a acentos, filtro por área, índice A–Z, navegação por categorias, termos em destaque, âncoras estáveis e estado de “nenhum resultado”.
- O visual foi refeito com hero editorial, breadcrumbs, cartões de categoria, cards técnicos, bloco de responsabilidade técnica, fontes oficiais e CTA contextual.
- O schema passou a publicar `CollectionPage`, `DefinedTermSet` com 75 `DefinedTerm` e `BreadcrumbList` em JSON-LD. `FAQPage` não foi usado.
- Os links de serviço agora respeitam a região: páginas estaduais usam URLs estaduais; João Pessoa e Campina Grande usam suas próprias URLs, inclusive para energia solar.
- O manifesto editorial, o sitemap, `llms.txt` e `llms-full.txt` passaram a reconhecer e descrever o Glossário como ativo estratégico de conhecimento.

### Verificação

- As três rotas locais retornaram 200, cada uma com 1 H1, 75 termos, 7 categorias, 75 `DefinedTerm`, `DefinedTermSet`, `BreadcrumbList` e nenhum `FAQPage`.
- Foram testados os links internos de serviço renderizados: nenhum retornou status 4xx.
- O verificador de achados processou 5 achados, mantendo 5 e suprimindo 0.
- A suíte completa passou com 18 arquivos de teste, além do build dos três bundles CSS e do lint EJS.

### Gate de publicação

O código local agora representa a Klyfe atual e dá ao Glossário uma função real de descoberta, educação e encaminhamento comercial. O fechamento no domínio publicado ainda depende de deploy, crawl final, validação de schema e medição de LCP, CLS e INP no ambiente real.

## Auditoria da interligação Glossário ↔ páginas de serviço — 12 de setembro de 2026

### Escopo e método

Esta rodada auditou a arquitetura interna que conecta o Glossário às páginas comerciais atuais da Klyfe: cadastro de serviços, templates estáticos e dinâmicos, versões de cidade, slugs de âncora, cobertura das URLs declaradas no sitemap e renderização HTML local.

Foram confrontados os 36 serviços de `config/locations/default.js` com a base de 75 termos de `config/glossario.js`. Em seguida, o servidor local foi crawlado para as 122 URLs do sitemap que pertencem aos clusters `/solucoes/` e `/energia-solar/`.

### Diagnóstico antes da implementação

1. Não existia uma taxonomia central serviço → termo. A associação dependia de blocos escritos diretamente em templates.
2. Somente quatro templates tinham blocos `glossario-links` hardcoded; o template compartilhado de detalhe de serviço não oferecia a mesma camada editorial às demais ofertas.
3. Os links legados usavam âncoras manuais com acentos ou nomes divergentes, como `glossario#automação-residencial`, `glossario#prumada-elétrica` e `glossario#spda-(para-raios)`. Esses valores não correspondem ao sistema atual de slugs normalizados.
4. O problema não era apenas quantitativo: um serviço de SPDA, uma subestação, um laudo, um sistema solar e uma instalação de Wallbox exigem vocabulários diferentes. Repetir os 75 termos em cada página também reduziria a utilidade da navegação.

### Achados verificados

| Área | Severidade | Confiança | Achado | Evidência | Impacto | Correção |
|---|---|---|---|---|---|---|
| Internal Linking | Warning | Confirmed | As páginas de serviço não tinham uma taxonomia compartilhada para relacionar cada oferta aos conceitos do Glossário. | 36 serviços eram renderizados por templates diferentes; somente quatro templates tinham blocos manuais e o detalhe dinâmico não possuía ponte editorial. | Descoberta semântica e distribuição de autoridade interna inconsistentes entre ofertas equivalentes. | Mapa editorial central em `config/service-glossary.js` e componente compartilhado no rodapé das páginas de serviço. |
| Internal Linking | Warning | Confirmed | Os blocos legados usavam âncoras digitadas à mão e divergentes dos slugs estáveis da nova base. | Os templates antigos apontavam para âncoras acentuadas ou para nomes que não existem como IDs atuais. | Cliques poderiam abrir o Glossário sem posicionar no termo correto. | Links agora são gerados a partir do termo resolvido e de seu slug canônico; blocos legados foram removidos. |
| Internal Linking | Pass | Confirmed | Todos os serviços cadastrados receberam contexto editorial proporcional. | 36 de 36 serviços têm mapa explícito com 4–6 termos; nenhum serviço renderiza os 75 verbetes completos. | Aumenta compreensão, relevância temática e exploração do cluster sem keyword stuffing. | Manter `service-glossary.test.js` como gate de governança. |
| Regional SEO | Pass | Confirmed | A interligação preserva a localidade da página de origem. | O helper gera `/glossario`, `/campina-grande/glossario` ou `/joao-pessoa/glossario` conforme a URL. | Evita tirar o usuário de uma página regional para uma rota estadual genérica. | Reaplicar a regra ao adicionar novas cidades. |
| Validation | Pass | Confirmed | A integração funciona no HTML renderizado e não apenas no código-fonte. | 122 URLs retornaram 200; todas exibiram a ponte; 675 links foram verificados; 0 slugs inválidos; 75 âncoras existem em cada uma das três versões do Glossário. | Confirma cobertura real dos templates, rotas especiais e páginas regionais. | Repetir o mesmo crawl após o deploy. |

O verificador determinístico processou **5 achados, manteve 5 e descartou 0**.

### Implementação aplicada

- Criado `config/service-glossary.js` com uma taxonomia explícita para engenharia, elétrica, automação, energia solar, SPDA, laudos, subestações, instalações, Wallbox e demais serviços.
- Criado `views/partials/related-glossary.ejs`, com bloco editorial acessível, compacto e visualmente alinhado ao padrão Klyfe.
- Adicionado middleware global em `routes/index.js` para inferir o serviço pela URL e localizar a variante regional correta.
- Integrada a ponte ao `views/partials/footer.ejs`, alcançando templates estáticos, páginas especiais e o template dinâmico `servicos/detalhe-servico.ejs`.
- Removidos os blocos manuais antigos de automação, elétrica, laudos e manutenção de subestações, eliminando os destinos divergentes.
- Adicionadas regras responsivas em `public/css/modules/70-service-pages.css` e regenerados os três bundles CSS.
- Criado `tests/service-glossary.test.js` para impedir serviço sem mapa, termo inexistente, slug inválido, perda de localização ou retorno ao padrão hardcoded.

### Gates ainda necessários

O pacote está implementado e validado localmente. O fechamento no ambiente publicado depende de deploy, crawl das URLs finais, validação dos links e inspeção visual em mobile. O componente foi desenhado para exibir apenas 4–6 links por página; não há medição de impacto em LCP, CLS ou INP enquanto o domínio final não for medido.

## Modal contextual do Glossário — 12 de setembro de 2026

### Diagnóstico

A auditoria de jornada confirmou que um link direto para outra página, mesmo com âncora, interrompia a leitura da oferta e obrigava o visitante a abandonar o contexto do serviço para consultar uma definição. A solução precisava preservar SEO e acessibilidade, sem transformar a página em uma listagem dos 75 termos.

### Implementação aplicada

- Cada termo agora abre uma explicação rápida em modal, com definição, aplicação prática, importância e termos relacionados.
- O modal oferece um segundo nível opcional: “Ver este termo no Glossário completo”.
- Os gatilhos continuam sendo elementos `<a href>` com a âncora canônica. Sem JavaScript, a navegação para o Glossário continua funcionando.
- O diálogo usa `role="dialog"`, `aria-modal`, `aria-labelledby`, botão nomeado, backdrop, Escape, restauração de foco e contenção de Tab.
- O script é carregado de forma `defer`, e o CSS inclui estados responsivos para telas estreitas.
- A página principal `/glossario` não recebe o modal, mantendo sua experiência de busca, filtros e exploração completa.

### Verificação pós-implementação

- 122/122 URLs comerciais auditadas renderizam o modal.
- 675/675 gatilhos possuem painel correspondente.
- 1.350 links de fallback foram preservados no HTML, incluindo o gatilho e o aprofundamento de cada termo.
- O Glossário principal não contém `data-glossary-modal`.
- O verificador determinístico processou **4 achados, manteve 4 e descartou 0**.
- Suíte completa, teste específico, build dos três bundles CSS, `node --check` do JavaScript e lint EJS passaram.

### Gate de publicação

Ainda é necessário validar a interação com leitor de tela, teclado e viewport móvel no domínio publicado. O comportamento de abertura/fechamento foi coberto no código e no HTML renderizado localmente, mas métricas de interação e Core Web Vitals dependem do ambiente real.

## Destaque de SPDA na Home — 12 de setembro de 2026

### Diagnóstico

A Home agrupava “Laudos de NR-10 e SPDA” sob o link de `/solucoes/engenharia/laudos-eletricos`. Isso misturava duas intenções diferentes e fazia o visitante interessado em proteção contra descargas atmosféricas chegar à página de laudos gerais, em vez da página pilar de SPDA.

### Implementação aplicada

- O texto de laudos foi separado de SPDA para não sugerir que as ofertas são a mesma coisa.
- Criado um destaque visual próprio dentro do card de Engenharia: “Projeto e laudo de SPDA”.
- O destaque explica, em uma frase, avaliação, adequação, inspeção e documentação do sistema.
- O destino é `/solucoes/engenharia/spda`, usando `homePrefix` para preservar as Homes estadual, Campina Grande e João Pessoa.
- O destaque usa atributos de acompanhamento de conteúdo para diferenciar a descoberta de SPDA dos demais CTAs.

### Verificação pós-implementação

- As três Homes retornaram HTTP 200.
- As três exibiram `home-spda-featured`.
- Cada Home apresentou exatamente um link dedicado para sua rota de SPDA correspondente.
- Os links de laudos continuam apontando para laudos, agora sem o texto combinado com SPDA.
- `home-spda.test.js`, build CSS, lint EJS e suíte completa passaram.
- O verificador determinístico processou **4 achados, manteve 4 e descartou 0**.

### Gate de publicação

O ajuste está pronto localmente. Após o deploy, conferir o destaque em desktop e mobile, validar o clique nas três variantes regionais e acompanhar se a entrada direta na página pilar melhora a descoberta e a conversão de SPDA.

## Vitrine prioritária de Engenharia na Home — 12 de setembro de 2026

### Diagnóstico

A seção de Engenharia dividia o mesmo nível visual com o card de Automação Residencial & Smart. Além disso, dois tópicos genéricos — “Projetos elétricos executivos” e “Projetos de subestações” — ocupavam espaço de descoberta que poderia apresentar páginas prioritárias e com escopo mais claro.

### Implementação aplicada

- O card de Engenharia passou a ocupar a largura completa da seção e permanece antes do card de Automação.
- O card de Automação foi movido para baixo, preservando seu conteúdo e CTA próprios.
- Removidos da vitrine os tópicos “Projetos elétricos executivos” e “Projetos de subestações”.
- Mantidos os acessos contextuais a Modelagem BIM 3D, laudos, aprovação na concessionária e viabilidade de recarga EV.
- Criada uma hierarquia de três destaques dentro de Engenharia: SPDA como card principal em largura total; Subestações/Cabines Primárias e Projetos Elétricos Industriais como cards complementares.
- Os três destinos usam `homePrefix`, preservando as rotas estadual, Campina Grande e João Pessoa.

### Verificação pós-implementação

- As três Homes retornaram HTTP 200.
- Cada Home renderizou um card de Engenharia antes de um card de Automação.
- Cada Home apresentou exatamente um link para SPDA, Subestação Aérea e Projeto Elétrico Industrial, com prefixo regional correto quando aplicável.
- Os dois rótulos removidos não apareceram no HTML renderizado.
- O teste específico, a suíte completa de 19 arquivos, build dos três bundles CSS, lint EJS, checagem sintática do JavaScript e `git diff --check` passaram.
- O verificador determinístico processou **5 achados, manteve 5 e descartou 0**.

### Gate de publicação

A nova composição está pronta localmente. Após o deploy, conferir a hierarquia visual em desktop e mobile, testar os três destinos nas versões regionais e acompanhar cliques e conversões por card.
