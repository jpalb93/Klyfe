# Auditoria editorial e SEO do blog — Klyfe Electric

**Data:** 16 de setembro de 2026  
**Escopo:** 35 registros em `content/posts/published/`, conteúdo renderizado pelo Express local, metadados, links internos, dados estruturados, fontes e sobreposição temática.

## Resumo executivo

A revisão encontrou um blog com bons temas comerciais, mas com grande parte dos textos originais curtos, metadados incompletos e duas duplicidades legadas de intenção. A base foi revisada diretamente nos JSONs: há agora **33 artigos ativos** e **2 aliases arquivados**, mantidos acessíveis por redirecionamento 301.

Na validação local pós-revisão da segunda rodada:

- os 33 artigos ativos retornam HTTP 200;
- todos têm título SEO entre 30 e 60 caracteres e descrição entre 120 e 160;
- todos têm palavra-chave principal, intenção de busca, canonical, robots, Open Graph, autor, fontes e links relacionados;
- todos têm pelo menos 4 níveis de seção H2, 5 links internos e 3 perguntas frequentes no conteúdo;
- o conteúdo renderizado varia de 1.510 a 1.983 palavras, contra uma base anterior predominantemente entre 200 e 700 palavras;
- todos expõem `BlogPosting` e `BreadcrumbList`; nenhum injeta `FAQPage` artificialmente.

O piso de palavras não é um fator de ranqueamento isolado, mas foi tratado como requisito editorial nesta solicitação. A segunda rodada acrescentou aprofundamento específico, dúvidas práticas, roteiro de aplicação e conferência final aos artigos que ainda estavam abaixo do piso. Resultado: **0 artigos ativos abaixo de 1.500 palavras** na renderização local.

## Achados priorizados

| Achado | Classificação | Evidência | Tratamento aplicado |
|---|---|---|---|
| Conteúdo raso | Confirmado e tratado | Vários artigos tinham 200–700 palavras no corpo principal e pouca orientação prática. | Duas rodadas de expansão por tema, com resposta curta, método de avaliação, checklist, dúvidas práticas, limitações, conferência e próximo passo. |
| Metadados incompletos | Confirmado | Registros sem padrão consistente de palavra-chave, intenção, descrição, canonical, imagem, autor e fontes. | Metadados normalizados nos 33 ativos, com títulos e descrições exclusivos. |
| Duplicidade de preço solar | Confirmado | `quanto-custa-energia-solar-2026` repetia a intenção de `quanto-custa-instalar-energia-solar`. | Alias arquivado, canonical no artigo principal e redirecionamento 301 preservado. |
| Duplicidade de payback | Confirmado | `payback-painel-solar-simulacao` repetia a intenção de `em-quanto-tempo-a-energia-solar-se-paga`. | Alias arquivado, canonical no artigo principal e redirecionamento 301 preservado. |
| Clusters com risco de canibalização | Provável, controlado | Similaridade lexical/TF-IDF alta entre artigos de preço/payback/economia; on-grid/off-grid/apagão/bateria; empresa/erros; e o conjunto de Wallbox. | Intenções separadas em títulos, introduções, headings, links e escopos editoriais distintos. Monitorar com Search Console após publicação. |
| Claims absolutos | Confirmado | Havia formulações como “zerar a conta”, “95%”, “payback inferior a 3 anos”, “homologação acelerada” e “100% do processo”. | Claims condicionais, premissas explícitas e ressalvas técnicas substituíram promessas universais. |
| Links internos fracos | Confirmado | A maioria dos textos tinha poucos caminhos para conteúdos complementares. | Cada artigo ativo agora aponta para pelo menos três conteúdos relacionados; o HTML renderizado apresenta pelo menos cinco links no artigo. |

## Mapa de intenção e canibalização

### Energia solar: separar decisão, cálculo e operação

- **Fundamentos:** o que é energia solar fotovoltaica e como funciona em casas.
- **Arquitetura:** on-grid, off-grid e híbrido.
- **Continuidade:** o que acontece no apagão e quando a bateria faz sentido.
- **Decisão financeira:** vale a pena, quanto custa, quanto economiza e payback.
- **Operação:** dia nublado, limpeza, vida útil e inversor.
- **Compra e implantação:** como escolher empresa, erros, documentos e homologação.

O antigo conflito real entre preço e payback foi resolvido por redirect. Os demais artigos permanecem como cluster porque respondem etapas diferentes da jornada, mas devem compartilhar links e evitar repetir as mesmas tabelas ou promessas.

### Wallbox: cluster comercial com papéis distintos

O grupo foi separado em: escolha do instalador, segurança, quadro elétrico, potência, custo, integração com solar, condomínio e tomada comum. A regra editorial é manter um único foco por página: diagnóstico, risco, infraestrutura, potência, orçamento, integração ou contexto de instalação.

### Indústria e conformidade

SPDA, NR-10, automação e CLP foram tratados como conteúdos técnicos relacionados, mas não equivalentes. O texto evita afirmar conformidade automática e diferencia inspeção, projeto, adequação, documentação e manutenção.

## Qualidade, E-E-A-T e fontes

Os textos agora informam limites da análise, explicam quais dados precisam ser confirmados no imóvel e orientam o leitor a comparar escopo, premissas e documentação. As fontes foram registradas por artigo e incluem ANEEL, Lei nº 14.300/2022, MTE/NR-10, Energisa, INPE, NREL, ABNT e Corpo de Bombeiros quando aplicável.

Referências regulatórias e técnicas devem ser rechecadas antes de cada atualização, especialmente regras de conexão, compensação, veículos elétricos e normas ABNT. A ANEEL descreve o regime de micro e minigeração distribuída e a Lei nº 14.300/2022 institui o marco legal aplicável; a NR-10 orienta o eixo de segurança em instalações e serviços de eletricidade.

## Limitações da auditoria

- O CMS remoto não respondeu no ambiente de execução; a revisão foi feita nos JSONs locais, que são a fonte usada pelo fallback do site.
- Os scripts de crawl do pacote local bloqueiam `localhost`/IP privado; por isso, a verificação renderizada foi feita com requisições locais e inspeção determinística do HTML.
- Não há dados de Search Console, analytics, backlinks ou Core Web Vitals de produção nesta rodada.
- A validação de engenharia das referências e do escopo dos serviços continua necessária antes do deploy público.

## Critério de sucesso pós-publicação

Após o deploy, acompanhar impressões, cliques, consultas e páginas de destino por cluster. Se dois URLs começarem a receber as mesmas consultas principais sem diferenciação de intenção, consolidar conteúdo ou reforçar a distinção de escopo; não criar novos artigos sobre a mesma pergunta apenas para aumentar volume.
