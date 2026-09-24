# Auditoria de intenção: artigos × páginas de serviço — 22/09/2026

## Escopo e critério

Inventário dos **46 JSONs** em `content/posts/published` (**44 artigos servidos** e dois aliases legados com redirecionamento 301), comparando título, palavra-chave principal, intenção declarada e assunto do artigo com a página comercial mais próxima em `config/locations`, `config/solar-capture/segments.js` e `config/solar-services.js`. O risco indicado é editorial: **alto** quando artigo e serviço miram a mesma consulta de contratação; **médio** quando há termos e seções próximos, mas um recorte informativo possível; **baixo** quando a dúvida específica e a oferta estão separadas. Uma ligação editorial para o serviço não elimina disputa se título e intenção forem iguais.

Esta análise não dispõe de consultas, impressões, posições nem conversões do Search Console. Portanto, **não confirma canibalização efetiva no Google**. Antes de fundir, redirecionar ou aplicar `noindex` a páginas indexáveis, conferir se as duas URLs recebem as mesmas consultas e qual delas atende melhor à busca.

## Resultado prioritário e correção de 22/09/2026

| Risco inicial | Artigo | Página principal | Sobreposição identificada e recorte aplicado |
| --- | --- | --- | --- |
| Alto | `/blog/energia-solar-para-supermercados` | `/energia-solar/supermercados/` | Mesmo público e expressão central; artigo antes marcado `comercial`. Agora aborda consumo, horários e dados para estudo. |
| Alto | `/blog/energia-solar-para-hospitais` | `/energia-solar/hospitais-e-clinicas/` | Mesmo público e intenção antes `comercial`. Agora aborda cargas, continuidade e dados para viabilidade. |
| Alto | `/blog/energia-solar-para-condominios` | `/energia-solar/condominios/` | Mesmo termo central e intenção antes `comercial`. Agora aborda assembleia, áreas comuns, participação e documentos. |
| Alto | `/blog/energia-solar-para-fazendas` | `/energia-solar/fazendas-e-irrigacao/` | Público e solução antes coincidentes. Agora aborda bombas, sazonalidade e perfil de consumo. |
| Médio | `/blog/como-funciona-a-energia-solar-em-casas` | `/energia-solar/residencial/` | Palavra-chave anterior `energia solar residencial`. Agora explica o funcionamento do sistema em casa. |
| Médio | `/blog/wallbox-em-condominio` | `/solucoes/eletrica/wallbox-condominio/` | Termo anterior `wallbox em condomínio`. Agora aborda pedido ao síndico, medição e responsabilidades. |
| Médio | `/blog/wallbox-com-energia-solar` | `/solucoes/eletrica/wallbox-energia-solar/` | Mesmo par de conceitos da solução. Agora explica fluxo e pré-requisitos de integração. |
| Médio | `/blog/nr10-laudo-eletrico-empresa` | `/solucoes/engenharia/laudos-eletricos` | Palavra-chave anterior `laudo NR-10 para empresas`. Agora aborda documentação e acompanhamento de pendências. |
| Médio | `/blog/automacao-industrial-nordeste` | `/solucoes/automacao` | Palavra-chave anterior `automação industrial`. Agora orienta escolha e medição do primeiro processo. |

**Correção executada nos nove pares da tabela:** os artigos mantêm URL e canonical, mas agora miram dúvidas informacionais específicas. Foram reescritos título, descrição, palavra-chave principal, conteúdo, FAQ e CTA; a página de serviço correspondente permanece como destino comercial. Os quatro artigos solares por segmento passaram a preparar o levantamento para um estudo, sem se apresentar como landing pages do segmento. Risco editorial residual **baixo**, sujeito à validação com dados reais após publicação.

Também foram revisados seis artigos de risco baixo a médio que ainda continham preços genéricos, promessas financeiras ou comparações promocionais: `energia-solar-vale-a-pena-no-nordeste`, `quanto-custa-instalar-energia-solar`, `como-escolher-uma-empresa-de-energia-solar`, `como-funciona-a-homologacao-da-energia-solar`, `como-escolher-instalador-wallbox` e `quanto-custa-instalar-wallbox`. Os textos agora explicam critérios de decisão e dados necessários, preservando o encaminhamento para o serviço. O artigo `/blog/manutencao-subestacao-planejamento` já havia sido corrigido para **“parada programada de subestação”**. Os pares SPDA e projeto/custo de subestação marcados como “baixo a médio” foram conferidos: seus títulos, palavras-chave e corpos já tratam de documentos, interpretação ou comparação, mantendo escopo distinto da oferta; não exigiram reescrita.

As cinco páginas comerciais solares por segmento e as duas páginas de wallbox correspondentes agora apontam de volta para os guias, com uma explicação do papel de cada página. A página de wallbox com energia solar e as chamadas relacionadas deixaram de prometer “custo zero”, retorno fixo e economia garantida. Seu simulador passou a mostrar consumo e distância ilustrativos, sem resultado financeiro automático. A viabilidade econômica continua dependente de dados do imóvel, veículo e tarifa.

**Verificação local:** 15 pares artigo/serviço acessíveis com títulos, canonical, CTA e links de volta corretos (`tests/blog-service-intent.test.js`). Também passaram os testes de conteúdo, links locais, integridade de serviços e os clusters SPDA/subestação. O servidor local da porta 3219 foi reiniciado após as mudanças para carregar a configuração atual.

## Inventário completo

Em cada linha, a classificação considera a página de destino indicada; uma mesma página principal pode servir a vários artigos de dúvidas distintas. `Baixo` não significa que não existam consultas compartilhadas.

### SPDA, laudos e automação (9)

| Artigo (`/blog/…`) | Página principal | Risco / recorte |
| --- | --- | --- |
| `spda-para-raios-obrigatorio` | `/solucoes/engenharia/spda` | Baixo; fundamento e avaliação de necessidade. |
| `nr10-laudo-eletrico-empresa` | `/solucoes/engenharia/laudos-eletricos` | Médio; ver prioridade acima. |
| `automacao-industrial-nordeste` | `/solucoes/automacao` | Médio; ver prioridade acima. |
| `clp-vs-reles-paineis` | `/solucoes/automacao` | Baixo; comparação técnica específica. |
| `diferenca-spda-aterramento-dps` | `/solucoes/engenharia/spda` | Baixo; distinção conceitual. |
| `energia-solar-edificio-com-spda` | `/solucoes/engenharia/spda` e `/energia-solar/` | Baixo; interface entre sistemas. |
| `inspecao-manutencao-spda` | `/solucoes/engenharia/spda` | Baixo a médio; manter periodicidade/observações no guia e escopo contratado no serviço. |
| `laudo-spda-o-que-deve-conter` | `/solucoes/engenharia/spda` | Baixo; interpretação de documento. |
| `projeto-spda-etapas-documentos` | `/solucoes/engenharia/spda` | Baixo a médio; etapas preparatórias podem tocar a oferta. |

### Energia solar (23, incluindo dois legados)

| Artigo (`/blog/…`) | Página principal | Risco / recorte |
| --- | --- | --- |
| `quanto-custa-energia-solar-2026` | `/energia-solar/` | Alias legado: redirecionamento 301 para `quanto-custa-instalar-energia-solar`; JSON arquivado e não servido. |
| `payback-painel-solar-simulacao` | `/energia-solar/` | Alias legado: redirecionamento 301 para `em-quanto-tempo-a-energia-solar-se-paga`; JSON arquivado e não servido. |
| `o-que-e-energia-solar-fotovoltaica` | `/energia-solar/` | Baixo; conceito básico. |
| `como-funciona-a-energia-solar-em-casas` | `/energia-solar/residencial/` | Médio; ver prioridade acima. |
| `diferenca-entre-energia-solar-conectada-e-isolada` | `/energia-solar/` | Baixo; comparação on-grid/off-grid. |
| `o-que-e-inversor-solar` | `/energia-solar/` | Baixo; componente. |
| `energia-solar-vale-a-pena-no-nordeste` | `/energia-solar/` | Baixo a médio; decisão econômica, sem substituir oferta local. |
| `quanto-custa-instalar-energia-solar` | `/servicos/instalacao-energia-solar/` | Baixo a médio; fatores de preço versus contratação da instalação. |
| `em-quanto-tempo-a-energia-solar-se-paga` | `/energia-solar/` | Baixo; payback. |
| `quanto-da-para-economizar-com-energia-solar` | `/energia-solar/` | Baixo; cálculo e limites de economia. |
| `energia-solar-funciona-em-dia-nublado` | `/energia-solar/` | Baixo; produção sob nuvens. |
| `painel-solar-precisa-de-limpeza` | `/servicos/limpeza-de-paineis-solares/` | Baixo; quando avaliar limpeza versus oferta do serviço. |
| `quanto-tempo-duram-os-paineis-solares` | `/energia-solar/` | Baixo; vida útil. |
| `energia-solar-funciona-sem-luz` | `/energia-solar/` | Baixo; falta de rede e anti-ilhamento. |
| `precisa-de-bateria-para-energia-solar` | `/energia-solar/` | Baixo; escolha de armazenamento. |
| `energia-solar-para-supermercados` | `/energia-solar/supermercados/` | Alto; ver prioridade acima. |
| `energia-solar-para-hospitais` | `/energia-solar/hospitais-e-clinicas/` | Alto; ver prioridade acima. |
| `energia-solar-para-condominios` | `/energia-solar/condominios/` | Alto; ver prioridade acima. |
| `energia-solar-para-fazendas` | `/energia-solar/fazendas-e-irrigacao/` | Alto; ver prioridade acima. |
| `como-escolher-uma-empresa-de-energia-solar` | `/energia-solar/` | Baixo a médio; critérios de escolha podem virar página de venda se perderem neutralidade. |
| `como-funciona-a-homologacao-da-energia-solar` | `/servicos/homologacao-energia-solar/` | Baixo a médio; etapas e prazos versus execução contratada. |
| `erros-ao-contratar-energia-solar` | `/energia-solar/` | Baixo; prevenção de erros. |
| `documentos-para-instalar-energia-solar` | `/servicos/instalacao-energia-solar/` | Baixo; checklist documental. |

### Wallbox e recarga (8)

| Artigo (`/blog/…`) | Página principal | Risco / recorte |
| --- | --- | --- |
| `como-escolher-instalador-wallbox` | `/solucoes/eletrica/carregador-veicular/` | Baixo a médio; critérios de contratação. |
| `cuidados-seguranca-carregador-veicular` | `/solucoes/eletrica/carregador-veicular/` | Baixo; cuidados e riscos. |
| `quadro-eletrico-wallbox` | `/solucoes/eletrica/carregador-veicular/` | Baixo; capacidade do quadro. |
| `qual-potencia-wallbox-escolher` | `/solucoes/eletrica/carregador-veicular/` | Baixo; escolha de potência. |
| `quanto-custa-instalar-wallbox` | `/solucoes/eletrica/carregador-veicular/` | Baixo a médio; fatores de orçamento. |
| `wallbox-com-energia-solar` | `/solucoes/eletrica/wallbox-energia-solar/` | Médio; ver prioridade acima. |
| `wallbox-em-condominio` | `/solucoes/eletrica/wallbox-condominio/` | Médio; ver prioridade acima. |
| `wallbox-ou-tomada-comum` | `/solucoes/eletrica/carregador-veicular/` | Baixo; comparação de modos de recarga. |

### Subestação (6)

| Artigo (`/blog/…`) | Página principal | Risco / recorte |
| --- | --- | --- |
| `o-que-e-subestacao-de-energia` | `/solucoes/engenharia/projeto-subestacao` | Baixo; fundamento e gatilho de avaliação. |
| `subestacao-aerea-ou-abrigada` | `/solucoes/engenharia/subestacao-aerea` | Baixo; comparação de configurações. |
| `projeto-subestacao-documentos-etapas` | `/solucoes/engenharia/projeto-subestacao` | Baixo a médio; documentos e entregáveis versus serviço. |
| `quanto-custa-uma-subestacao` | `/solucoes/engenharia/projeto-subestacao` | Baixo a médio; composição do custo versus proposta. |
| `manutencao-subestacao-planejamento` | `/solucoes/engenharia/manutencao-subestacao` | Baixo após correção; checklist de parada. |
| `aumento-carga-subestacao-transformador` | `/solucoes/engenharia/projeto-subestacao` | Baixo; avaliação de expansão. |

## Próximas ações editoriais

1. Após publicação, comparar consultas e páginas para cada par por período e localidade no Search Console. Sobreposição de consultas com cliques divididos e perda de posição justifica intervenção mais forte; mera proximidade de palavras não basta.
2. Confirmar no ambiente publicado que os 15 JSONs revisados prevalecem sobre eventuais registros de mesmo slug no CMS remoto. A validação local cobriu as rotas e os links de todos os pares.
3. Manter a separação editorial em revisões futuras: artigo responde à dúvida específica; página de serviço concentra escopo, prova comercial e pedido de proposta. Os dois aliases legados já redirecionam para os artigos sucessores; não precisam de nova página indexável.
