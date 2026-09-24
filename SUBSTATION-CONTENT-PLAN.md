# Guia Subestação — 22/09/2026

## Escopo e intenções

Implementação editorial e integração às páginas comerciais existentes. Não é auditoria completa do site nem pesquisa de volume de palavras-chave.

| Artigo | Intenção principal | Limite editorial | Destino comercial |
| --- | --- | --- | --- |
| o-que-e-subestacao-de-energia | Entender a subestação do consumidor e a avaliação de necessidade | Apresenta e encaminha as decisões específicas | projeto-subestacao |
| subestacao-aerea-ou-abrigada | Comparar configurações | Sem substituir dimensionamento ou criar outra landing page aérea | subestacao-aerea |
| projeto-subestacao-documentos-etapas | Preparar documentos, etapas e entregáveis | Sem duplicar a página comercial de projeto | projeto-subestacao |
| quanto-custa-uma-subestacao | Compreender a composição do orçamento | Sem inventar preços, economia ou prazos | projeto-subestacao |
| manutencao-subestacao-planejamento | Preparar a parada programada pelo lado da empresa: impacto, responsáveis, comunicação e retomada | Sem reproduzir escopo técnico ou oferta da página de manutenção | manutencao-subestacao |
| aumento-carga-subestacao-transformador | Preparar avaliação de expansão | Sem duplicar o guia de fundamentos ou os conteúdos de Wallbox/solar | projeto-subestacao |

As três páginas de serviço apresentam os seis cards, com atalho no hero. Artigos conectam-se ao guia central, aos complementares relevantes e ao serviço correspondente. URLs editoriais raiz concentram os canonicals; versões municipais permanecem acessíveis, mas não entram no sitemap desses artigos. Canonicals dos serviços locais são preservados.

## Evidência e limites

- Confirmado no acervo local: não havia artigo dedicado a subestação; havia três páginas de serviço e menção no artigo de NR-10.
- Risco provável: fragmentar a mesma dúvida por sinônimos ou cidade. A separação editorial e os canonicals reduzem esse risco; não demonstram ausência de canibalização no Google.
- Desconhecido: volume de buscas, posição, conversões e sobreposição real de consultas; precisam de Search Console e análise de desempenho após publicação.
- Fontes: orientações públicas e catálogo de normas da Energisa, página oficial da NR-10 e referência de fabricante sobre avaliação de condição de transformadores. O catálogo Energisa apareceu na busca, mas a abertura direta retornou 403; não se declarou conferência do PDF vigente nem se reproduziu tabela de limites.
- Os artigos não reproduzem procedimentos de intervenção, critérios normativos exaustivos ou periodicidade universal. Exemplos são ilustrativos. Autoria institucional sem revisão humana fictícia e imagens existentes identificadas como ilustrativas.

## Verificação

Gerar CSS com `node scripts/build-css.js`. Validar templates com ejs-lint. Com servidor na porta 3219, executar `node tests/substation-guides.test.js`; `TEST_SITE_ORIGIN` permite outra origem. Reexecutar `tests/spda-guides.test.js` na mesma origem para verificar a preservação do cluster anterior.

O teste visita 18 rotas de artigos e 9 de serviços, valida destinos, canonicals, JSON-LD, listagem e sitemap. Verificar visualmente a seção em viewport móvel e desktop.

## Publicação e acompanhamento

JSONs publicados no acervo local são carregados pelo blog. O CMS remoto prevalece para slugs coincidentes: confirmar sincronização no ambiente de publicação. Não foi solicitado deploy nesta etapa.

Após publicação, acompanhar quais consultas levam a quais páginas, cliques para o serviço e contatos. Só propor fusão ou redirecionamento quando houver evidência de sobreposição prejudicial. Os conteúdos comerciais de projeto e subestação aérea já têm proximidade temática; eventual reestruturação dessas URLs requer avaliação própria e não foi realizada neste trabalho.
