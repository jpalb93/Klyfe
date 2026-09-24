# Plano de ação — endereço e SEO local da Klyfe

> **Atualização editorial — 16/09/2026:** para o escopo de conteúdo do blog, seguir também o [plano editorial e SEO](BLOG-CONTENT-ACTION-PLAN-2026-09-16.md) e o [relatório da auditoria de conteúdo](BLOG-CONTENT-AUDIT-2026-09-16.md). A segunda rodada de conteúdo foi concluída: os 33 artigos ativos superam 1.500 palavras na renderização local. Permanecem como próximos passos o deploy, a validação dos 2 redirects legados, a revisão de temas regulados e o monitoramento dos clusters no Search Console.

## 1. Imediato — publicar as correções

1. Fazer deploy do repositório `Klyfe`.
2. Fazer deploy/restart do sistema `Agentes-Klyfe` para aplicar o novo default e a migração do endereço empresarial.
3. Conferir na produção:
   - home;
   - `/contato`;
   - `/campina-grande`;
   - `/joao-pessoa`;
   - `/energia-solar/`;
   - `/llms.txt`.
4. Confirmar que todas exibem a sede de Campina Grande e que João Pessoa aparece somente como área atendida.

**Impacto:** alto. **Esforço:** baixo. **Dependência:** deploy.

## 2. Quick wins pós-deploy

1. Executar o Google Rich Results Test e o Schema.org Validator na home e no contato.
2. Solicitar reindexação da home e do contato no Google Search Console.
3. Confirmar no Google Business Profile:
   - Klyfe Electric | Engenharia & Energia;
   - Av. Pref. Severino Bezerra Cabral, 1225;
   - Mirante;
   - Campina Grande - PB;
   - CEP 58410-640;
   - telefone e horários idênticos aos do site.
4. Conferir no Cartão CNPJ oficial se a razão social é exatamente `44.390.273 JAMERSON RICARDO DE SOUZA RUFINO`.
5. Confirmar no Google/Correios se o CEP comercial correto é `58410-640`; corrigir diretórios que exibem `58407-660`.
6. Conferir se o botão “Site” do perfil aponta para `https://www.klyfeelectric.com.br/`.

**Impacto:** alto. **Esforço:** baixo. **Dependência:** correções publicadas.

## 3. Estratégico — consistência de citações locais

1. Atualizar o mesmo NAP em Bing Places, Apple Business Connect, Facebook/Instagram, LinkedIn e diretórios relevantes.
2. Manter as coordenadas verificadas (`-7.2342674, -35.868982`) sincronizadas entre o Google Business Profile e o `LocalBusiness`.
3. Revisar trimestralmente nome, endereço, telefone, horários e links externos.
4. Manter João Pessoa e demais cidades apenas como `areaServed`, salvo se existir uma unidade física real e verificável.

**Impacto:** médio/alto. **Esforço:** médio. **Dependência:** acesso aos perfis externos.

## 4. Manutenção técnica

1. Manter os testes de endereço no CI.
2. Não duplicar o endereço em novos templates; importar sempre a fonte canônica.
3. Auditar novas propostas e documentos para garantir que usem `supplier.address`.
4. Monitorar Search Console e métricas do Google Business Profile por 4–8 semanas após a indexação.
5. Não voltar a publicar nota ou total de avaliações hard-coded; usar integração validada ou link neutro para o perfil.

## 5. Complemento do plano — páginas internas não solares

Solar e Home permanecem fora deste ciclo. As melhorias abaixo foram aplicadas apenas a engenharia, elétrica e automação.

1. **Gate de conteúdo:** validar execução direta, parceiros, instrumentos, cobertura, ART e limites de cada serviço; manter `needs-validation` enquanto não houver fonte.
2. **Metadados e UX:** manter títulos, descrições, H1s e breadcrumbs localizados; revisar snippets no crawl de produção.
   - Padrão editorial dos H1s: `SERVIÇO + LOCALIDADE` (ex.: `Projeto e Laudo de SPDA em João Pessoa`).
3. **Arquitetura:** preservar links de serviço para hub, relacionados e contato; decidir consolidações somente com GSC, backlinks e intenção.
4. **Legibilidade:** revisar SPDA, laudos, subestações e projetos para frases menores e explicação de siglas.
   - Primeira rodada concluída: blocos em linguagem simples, FAQs divididas e listas de leitura rápida. Manter revisão editorial com um engenheiro antes do deploy.
5. **Medição:** repetir schema, links quebrados, sitemap, LCP, INP, CLS e testes de CRM em produção.

### Critério de publicação

Nenhuma nova página transacional ou claim de capacidade entra sem escopo operacional, responsável pela revisão e evidência correspondente.

## 6. Segunda rodada concluída — legibilidade e claims não solares

1. Blocos em linguagem simples adicionados às 11 páginas de detalhe do catálogo de engenharia.
2. Contextos de João Pessoa e Campina Grande revisados para manter diferenciação local sem promessas absolutas.
3. FAQs de aprovação, ressarcimento, TOI e carregadores ajustadas para explicar dependências e limites.
4. Teste plain-language-services.test.js criado para impedir páginas de detalhe sem resumo explicativo ou com promessa absoluta no bloco introdutório.
5. Validar com o responsável técnico os claims restantes antes de publicar.

Status: concluído no código. Dependência: revisão operacional e deploy.

## 7. Auditoria semântica de FAQ, conteúdo e CTAs — 11 de setembro de 2026

Esta rodada foi somente de auditoria; não houve alteração de templates ou conteúdo. Solar e Home seguem fora do escopo de edição.

### Prioridade 0 — separar intenção de serviço e verticais

1. Corrigir a pergunta de Campina Grande em config/locations/campina-grande.js:176, removendo a referência a energia solar da FAQ de Projeto Elétrico Unifamiliar.
2. Remover ou substituir o card “Integração Solar” de views/carregador-veicular.ejs:62-64.
3. Decidir se o card relacionado “Energia Solar” de views/carregador-veicular.ejs:145-152 deve sair da página elétrica ou ser movido para uma área explícita de cross-sell. Se a política for isolamento estrito, remover também o link solar da página de Automação Residencial.

**Impacto:** alto. **Esforço:** baixo. **Dependência:** decisão editorial sobre cross-sell.

### Prioridade 1 — corrigir identidade das páginas elétricas filhas

1. Criar templates ou dados específicos para tomadas-interruptores, iluminacao, chuveiro-eletrico, ventiladores, quadro-distribuicao, fiacao-cabeamento e ar-condicionado.
2. Garantir H1, intro, escopo, FAQ e CTA no padrão SERVIÇO + LOCALIDADE em cada uma das 21 URLs regionais.
3. Enquanto o conteúdo específico não existir, considerar redirecionamento ou retirada temporária do sitemap para não publicar páginas com identidade genérica.

**Impacto:** alto. **Esforço:** médio. **Dependência:** conteúdo técnico de cada serviço.

### Prioridade 2 — fazer o FAQ configurado chegar à página

1. No template de detalhe, renderizar serviceData.faqExtra depois das FAQs-base, com deduplicação e validação de estrutura.
2. Nos hubs, passar o registro do serviço ao template ou alterar a consulta para cityData.services[serviceKey].faqExtra.
3. Criar teste que falhe quando um faqExtra regional existir no config e não aparecer no HTML renderizado.

**Impacto:** médio/alto. **Esforço:** baixo/médio. **Dependência:** contrato de dados entre rota e template.

### Prioridade 3 — CTAs específicos por serviço

1. Fazer Laudos e Manutenção de Subestação consumirem o CTA do serviço, não somente cityData.cta.
2. Tornar o fechamento do template de detalhe variável: “Solicitar perícia”, “Avaliar viabilidade”, “Solicitar projeto” etc.
3. Preservar a localidade e o WhatsApp contextual em cada CTA.

**Impacto:** médio. **Esforço:** baixo. **Dependência:** tabela editorial de CTAs.

### Prioridade 4 — validação de claims

Revisar antes do deploy: aceitação por seguradoras, cobertura de todos os municípios, prazos de Energisa/ANEEL, garantia técnica, redução de custos, execução completa e promessa de menor inatividade. Manter linguagem condicional quando o resultado depender da concessionária, do contrato ou dos dados da instalação.

**Impacto:** médio/alto. **Esforço:** médio. **Dependência:** responsável técnico, contrato e fontes regulatórias.

### Critérios de aceite da próxima rodada

- Zero termo solar em conteúdo, FAQ ou CTA de páginas elétricas, salvo cross-sell explicitamente aprovado.
- Cada slug elétrico específico apresenta H1, conteúdo, FAQ e CTA do próprio serviço.
- 22 páginas regionais de detalhe exibem o faqExtra correspondente.
- Nove hubs exibem FAQ ou têm o bloco removido intencionalmente do config e do markup.
- CTAs de Laudos, Manutenção, Perícia e Viabilidade nomeiam a ação real.
- Crawl das 93 URLs não solares continua em 200 e todos os testes de regressão permanecem aprovados.

## 8. Correções aplicadas e critérios verificados — 11 de setembro de 2026

As inconsistências encontradas na auditoria semântica foram corrigidas no código, mantendo Solar e Home fora do escopo de edição de conteúdo.

### Status das prioridades

1. **Separação entre verticais — concluída:** referências solares indevidas foram removidas de Carregador Veicular, Automação Residencial e da FAQ regional de Projeto Elétrico Unifamiliar.
2. **Identidade das páginas elétricas filhas — concluída:** sete slugs passaram ao template de detalhe específico, com conteúdo, H1, FAQ e CTA contextual nas 21 URLs regionais.
3. **FAQs configuradas — concluída:** faqExtra regional agora chega aos detalhes, hubs e páginas especializadas compatíveis, sem duplicação.
4. **CTAs — concluída:** Laudos, Manutenção, Perícia, Viabilidade e demais detalhes usam a ação real e o nome do serviço; títulos finais deixaram de tratar todos os serviços como projetos.
5. **Claims — concluída no texto:** promessas dependentes de concessionária, contrato, cobertura, garantia, execução ou desempenho foram tornadas condicionais. A confirmação operacional continua sendo gate de publicação.

### Evidências de aceite

- Crawl renderizado: 93/93 rotas não solares em HTTP 200.
- Vazamento semântico: zero termo solar robusto no conteúdo principal não solar e zero CTA não solar com Solar/fotovoltaico.
- FAQ: zero rota não solar sem FAQ no crawl.
- Regressão: os 13 arquivos de teste passaram; JavaScript, EJS lint e verificação de diferenças também passaram.

### Gate restante

Repetir o crawl no ambiente de produção após a publicação e obter a validação do responsável técnico para cobertura, prazos, ART, instrumentos, execução e demais claims condicionais. O conteúdo e as rotas de Solar/Home permanecem inalterados.

## 9. Auditoria de CTAs WhatsApp não solares — 11 de setembro de 2026

### Correção concluída

1. Criar mensagem contextual por serviço e localidade a partir da URL.
2. Fazer templates não solares priorizarem essa mensagem em vez do texto genérico da cidade.
3. Substituir links WhatsApp sem text por URLs contextualizadas.
4. Cobrir também menu, rodapé, botão flutuante, páginas institucionais e blog.
5. Manter telefones e mensagens de Solar fora desta alteração.

### Critérios de aceite verificados

- 133 URLs não solares renderizadas sem erro.
- 633 links WhatsApp auditados.
- Zero CTA sem mensagem.
- Zero CTA com a mensagem genérica anterior.
- CTAs de serviços identificam o serviço na mensagem.
- Novo teste whatsapp-cta-governance.test.js aprovado e suíte existente preservada.

### Gate de publicação

Publicar a alteração e validar no domínio final os CTAs de topo, rodapé, flutuante e fechamento da página de Manutenção de Subestações, além de uma amostra das demais categorias.

## 10. Plano de ação específico para SPDA — 12 de setembro de 2026

### P1 — conteúdo e schema antes do próximo destaque

1. Corrigir o artigo `content/posts/published/2026-03-10-spda-para-raios-obrigatorio.json`: retirar a afirmação de que a falta de laudo anual cancela seguro e reescrever a lista de obrigatoriedade com condicionantes, fontes e revisão técnica.
2. Remover o `FAQPage` do artigo comercial de SPDA ou restringir a geração em `routes/blog.js` à política editorial permitida.
3. Corrigir `views/servicos/laudos-eletricos.ejs:179`, removendo a regra geral de renovação anual de laudos de SPDA.

**Critério de aceite:** nenhum claim de seguro, obrigatoriedade ou periodicidade deve aparecer como universal sem fonte e sem depender do caso concreto.

### P2 — alinhar a representação da oferta

1. Atualizar `public/llms.txt` e `public/llms-full.txt` para mencionar projeto, instalação, adequação, inspeção, documentação e manutenção, sempre conforme o escopo contratado.
2. Revisar o acervo `config/blog.legacy.js` e as pautas `config/blog-topics.js` para impedir a reintrodução dos claims antigos em migrações ou geração automática.
3. Incluir no registro de artigos de SPDA a revisão técnica datada e fontes oficiais; fazer o template emitir `citation`/`reviewedBy` somente quando os dados forem reais.

**Critério de aceite:** blog, página de serviço, manifest e arquivos de descoberta descrevem a mesma oferta e os mesmos limites.

### P3 — decisão sobre páginas regionais

1. Confirmar operacionalmente se a Klyfe atende SPDA em Paraíba, João Pessoa e Campina Grande com logística e capacidade próprias.
2. Se as três páginas permanecerem indexáveis, acrescentar diferenciação local verificável: cenário construtivo, exposição ambiental, logística de vistoria e contexto de atendimento, sem inventar cases ou exigências.
3. Se não houver diferenciação ou operação local suficiente, concentrar a autoridade na página estadual e revisar a política de indexação regional.

**Critério de aceite:** cada URL regional tem razão operacional para existir, além da troca de cidade no texto.

### P4 — performance e validação de produção

1. Adicionar dimensões reais ou proporção reservada ao hero de `views/servicos/detalhe-servico.ejs:49`.
2. Após o deploy, medir LCP, CLS e INP em mobile e desktop no domínio publicado.
3. Repetir crawl das 257 URLs do sitemap e validar status, canonical, robots, JSON-LD, links e CTAs no ambiente final.

**Critério de aceite:** as três páginas de SPDA continuam em 200, com canonical próprio, `index, follow`, title/H1/meta coerentes, schema válido e zero claim antigo no HTML indexável.

### Gate final de SPDA

O código atual das páginas principais está pronto do ponto de vista de coerência de serviço. O encerramento do tema depende da revisão dos quatro itens P1, da sincronização de `llms.txt`, da decisão sobre as variantes regionais e da validação pós-deploy. Esta rodada foi de auditoria; não houve alteração de código de produção.

## 11. Execução dos ajustes — 12 de setembro de 2026

### Concluído no código

- Artigo de SPDA reescrito com avaliação por contexto, sem regra universal de altura, seguro, periodicidade ou risco zero.
- FAQs do artigo revisadas para refletir apólice, edificação, exigências e escopo; fontes ABNT/CBMPB e atualização editorial adicionadas.
- `FAQPage` removido do schema dos artigos comerciais do blog; FAQs continuam disponíveis na experiência da página.
- Fallback `config/blog.legacy.js` sincronizado e migrador ajustado para preservar fontes, tags, palavras-chave, imagem e data de atualização.
- `public/llms.txt` e `public/llms-full.txt` atualizados com o escopo completo de SPDA.
- Glossário passou a apontar para `/solucoes/engenharia/spda`.
- Contextos de João Pessoa e Campina Grande ampliados com cenários regionais condicionais e coerentes.
- Hero de SPDA passou a declarar 1400×787 no elemento de imagem para reduzir risco de layout shift.
- Página pilar passou a exibir referências ABNT/CBMPB e o limite de uso dessas referências.

### Verificado

- Artigo de SPDA em 200, com fontes e sem `FAQPage` JSON-LD.
- Três páginas de serviço de SPDA em 200, com H1, title, meta description, canonical, robots e schemas corretos.
- Crawl completo: 257 URLs, 255 respostas 200, dois redirects não relacionados a SPDA.
- Zero ocorrência dos claims antigos de cancelamento de seguro, regra automática de 15 metros, manutenção anual obrigatória ou negligência técnica no conteúdo indexável do crawl.
- JSON do artigo, configuração legada, testes direcionados, build CSS, lint EJS e `git diff --check` aprovados.

### Para alcançar 100/100

1. O responsável técnico da Klyfe deve confirmar formalmente as fontes e revisar o artigo; a data de revisão só deve ser exibida após essa confirmação.
2. Confirmar operação, logística e capacidade reais em João Pessoa e Campina Grande; manter páginas regionais indexáveis apenas com justificativa operacional.
3. Publicar e repetir o crawl no domínio final, além de medir LCP, CLS e INP em mobile e desktop.
4. Validar os schemas no Rich Results Test e no Schema Markup Validator após o deploy.

**Status:** melhoria de conteúdo e implementação concluídas localmente; 100/100 depende de validação técnica da Klyfe e evidência do ambiente publicado.

## 12. Verificação final — 12 de setembro de 2026

O pacote local foi validado novamente: sitemap com 257 URLs, 255 respostas 200, dois redirects não relacionados a SPDA, zero erro de rede no crawl, nenhuma ocorrência de `FAQPage` nas seis URLs de SPDA e suíte completa com 16 arquivos de teste aprovada. O indicador interno fica em **94/100** até os gates externos.

Para fechar 100/100, falta somente executar no ambiente real:

1. aceite formal do responsável técnico sobre fontes, escopo e texto do artigo;
2. confirmação de operação e logística em João Pessoa e Campina Grande;
3. deploy, crawl final, validação de schema e medição de LCP, CLS e INP;
4. inspeção final dos CTAs e dos links no domínio publicado.

Não há base técnica para marcar revisão profissional ou métricas de produção como concluídas sem essas evidências.

## 13. Reformulação do Glossário — 12 de setembro de 2026

### Entrega concluída localmente

1. Substituída a estrutura curta de 16 termos por uma base de 75 termos distribuída em sete áreas técnicas.
2. Incluídos conceitos atuais de energia solar, SPDA, proteção, laudos, automação e carregamento veicular, além dos fundamentos elétricos.
3. Criada arquitetura de dados com definição, aplicação prática, ponto de atenção, relações entre termos, fontes e links de serviço.
4. Refeito o design da página no padrão editorial Klyfe, com hero, breadcrumbs, busca, filtro, índice A–Z, cards e CTA.
5. Implementado `CollectionPage` + `DefinedTermSet` + `DefinedTerm` + `BreadcrumbList` em JSON-LD.
6. Corrigida a localização dos CTAs e dos links solares nas variantes estadual, João Pessoa e Campina Grande.
7. Glossário incluído no manifesto editorial, no sitemap com `lastmod` e nos arquivos de descoberta para IA.

### Critérios de aceite atendidos

- 75 termos renderizados nas três rotas locais;
- sete áreas técnicas visíveis e filtráveis;
- busca e índice A–Z funcionais no HTML/JS;
- zero link interno renderizado com status 4xx;
- schema sem `FAQPage` e com 75 `DefinedTerm`;
- 18 testes, build CSS e lint EJS aprovados.

### Próximo passo

Publicar a versão e repetir no domínio final o crawl da página estadual e das duas variantes regionais. Em seguida, validar o JSON-LD no Schema Markup Validator, observar indexação e medir LCP, CLS e INP em mobile e desktop. O conteúdo permanece educativo e deve passar por revisão técnica conforme novas normas ou mudanças no escopo comercial.

## 14. Interligação Glossário ↔ páginas de serviço — concluído localmente

### Auditoria realizada

1. Conferido o catálogo atual de 36 serviços em todas as categorias e templates.
2. Identificada a ausência de um mapa editorial central e a presença de quatro blocos manuais com âncoras antigas.
3. Validada a nova base de 75 termos contra cada serviço, com seleção contextual de 4–6 conceitos por página.
4. Crawladas 122 URLs de `/solucoes/` e `/energia-solar/` no servidor local, incluindo variantes de Campina Grande e João Pessoa.

### Implementação concluída

- `config/service-glossary.js` concentra a taxonomia serviço → Glossário.
- `views/partials/related-glossary.ejs` fornece um componente editorial único.
- `routes/index.js` localiza serviço e cidade para construir o href correto.
- `views/partials/footer.ejs` integra a ponte a todos os templates que compartilham o rodapé.
- Blocos hardcoded antigos foram removidos de automação, elétrica, laudos e manutenção de subestações.
- CSS responsivo e teste de governança foram adicionados.

### Critérios de aceite atendidos

- 36/36 serviços com mapa editorial explícito;
- 4–6 termos por serviço, todos existentes na base canônica;
- 122/122 URLs renderizadas com a ponte e HTTP 200;
- 675 links de Glossário verificados, com 0 slug inválido;
- 75/75 âncoras disponíveis em `/glossario`, `/campina-grande/glossario` e `/joao-pessoa/glossario`;
- nenhuma ocorrência restante de `glossario#` hardcoded nos quatro templates legados;
- `finding_verifier.py`: 5 achados mantidos, 0 descartados.

### Próximo gate

Publicar o pacote e repetir o crawl no domínio final. Confirmar que os links regionais continuam corretos, validar o visual em mobile e acompanhar Search Console, cliques no Glossário e navegação entre termos/serviços. Ao cadastrar um novo serviço, o teste `tests/service-glossary.test.js` deve passar antes do deploy.

## 15. Modal contextual do Glossário — concluído localmente

### Entrega

1. Transformar o clique nos termos relacionados em abertura de modal contextual.
2. Mostrar definição, “na prática”, “por que importa” e termos relacionados sem sair da página do serviço.
3. Manter o link para o Glossário completo como aprofundamento opcional.
4. Preservar `<a href>` e âncoras canônicas para SEO e para o cenário sem JavaScript.
5. Implementar acessibilidade de diálogo: nome, foco, Escape, backdrop e navegação por Tab.

### Critérios de aceite atendidos

- 122 páginas comerciais renderizadas com modal;
- 675 gatilhos e 675 painéis correspondentes;
- 0 perda dos destinos canônicos de Glossário;
- Glossário principal sem modal;
- 4 achados verificados, 4 mantidos e 0 descartados;
- suíte completa, build CSS, lint EJS e checagem sintática do JavaScript aprovados.

### Próximo gate

Publicar e fazer teste manual com teclado, leitor de tela e viewport móvel. Acompanhar abertura dos modais, cliques em “Glossário completo” e eventual impacto em INP no Search Console/analytics.

## 16. Destaque de SPDA na Home — concluído localmente

### Correção aplicada

- Separada a intenção de laudos gerais da intenção de SPDA na seção de Engenharia.
- Criado o destaque “Projeto e laudo de SPDA” na Home.
- Corrigido o destino para `/solucoes/engenharia/spda`.
- Mantido o `homePrefix` para as versões estadual, Campina Grande e João Pessoa.

### Critérios de aceite atendidos

- 3/3 Homes com destaque dedicado;
- 3/3 Homes com link correto para a rota regional de SPDA;
- 0 ocorrência restante do texto combinado “Laudos de NR-10 e SPDA” no card;
- teste específico, suíte completa, CSS e lint aprovados;
- 4 achados verificados, 4 mantidos e 0 descartados.

### Próximo gate

Publicar e confirmar visual, clique e conversão nas três Homes no ambiente real.

## 17. Vitrine prioritária de Engenharia na Home — concluído localmente

### Correção aplicada

- O card de Engenharia passou a ocupar uma linha completa e permanece acima do card de Automação Residencial & Smart.
- O card de Automação foi movido para baixo, sem perda de conteúdo ou CTA.
- Removidos os tópicos genéricos “Projetos elétricos executivos” e “Projetos de subestações”.
- Criada uma vitrine com SPDA como destaque principal, seguida por Subestações/Cabines Primárias e Projetos Elétricos Industriais.
- Mantido `homePrefix` nos três destinos para preservar a navegação estadual e regional.

### Critérios de aceite atendidos

- 3/3 Homes retornaram HTTP 200;
- 3/3 Homes renderizaram Engenharia antes de Automação;
- 3/3 Homes exibiram exatamente um link para cada serviço prioritário;
- 0 ocorrência dos dois rótulos removidos no HTML renderizado;
- teste específico, suíte completa de 19 arquivos, build CSS, lint EJS e `git diff --check` aprovados;
- `finding_verifier.py`: 5 achados mantidos, 0 descartados.

### Próximo gate

Publicar e fazer a conferência visual em desktop/mobile, validando a hierarquia dos cards e os cliques nas três variantes regionais.
