# Auditoria de prontidão para Meta Ads — Energia Solar

**Site:** https://www.klyfeelectric.com.br/  
**Data:** 11/08/2026  
**Escopo:** funil de energia solar, Meta Pixel, Conversions API (CAPI), consentimento/LGPD, deduplicação, atribuição, WhatsApp, formulários, CRM e landing pages.

## Resumo executivo

**Veredito: a base do Meta Ads está bem implementada e ativa, mas ainda não está pronta para escala máxima.**

O Pixel `2272429916841371` está publicado e carrega somente depois do aceite do banner. Todas as principais páginas solares usam o mesmo Pixel, recebem `contentCategory: "solar"` e disparam `ViewContent`. O fluxo de formulário usa `Lead`, o clique no WhatsApp usa `Contact` e Pixel+CAPI compartilham o mesmo `event_id`, que é o desenho correto para deduplicação.

Os maiores riscos encontrados são de consentimento: `_fbc` e dados de atribuição podem ser gravados antes do aceite; além disso, o endpoint `/contato` envia `Lead` pelo CAPI para qualquer lead solar sem receber ou validar o consentimento de marketing. Também não foi possível comprovar o retorno real do CAPI no Gerenciador de Eventos sem acesso à conta Meta.

**Prontidão operacional estimada: 78/100 (confiança alta para site/código e média para a conta Meta).**

## Validação em produção

Teste realizado na LP `/lp/energia-solar-empresas` com parâmetros de campanha:

- antes do aceite, o banner estava visível e nenhum script da Meta estava carregado;
- após clicar em **Aceitar**, o banner foi ocultado;
- `https://connect.facebook.net/en_US/fbevents.js` foi carregado;
- a configuração do Pixel `2272429916841371` foi carregada pela Meta;
- não foram observados erros de console durante o carregamento;
- nenhuma submissão de formulário ou evento sintético de conversão foi enviado para evitar contaminar os dados reais.

## Inventário do funil Solar

| URL | HTTP | Pixel | Categoria | Evento de conteúdo | Função |
| --- | ---: | --- | --- | --- | --- |
| `/energia-solar/` | 200 | Ativo | solar | `ViewContent` | Hub solar |
| `/lp/energia-solar-empresas` | 200 | Ativo | solar | `ViewContent` | Captação B2B |
| `/lp/energia-solar-fazendas` | 200 | Ativo | solar | `ViewContent` | Captação rural |
| `/lp/energia-solar-supermercados-clinicas` | 200 | Ativo | solar | `ViewContent` | Captação por segmento |
| `/lp/energia-solar-residencial` | 200 | Ativo | solar | `ViewContent` | Captação residencial |
| `/lp/energia-solar-alta-conversao` | 200 | Ativo | solar | `ViewContent` | Simulador/LP principal |
| `/lp/energia-solar-empresas/obrigado` | 200 | Ativo | solar | `Lead` pendente | Confirmação |

## Eventos implementados

| Evento | Browser Pixel | CAPI | Deduplicação | Uso recomendado |
| --- | --- | --- | --- | --- |
| `PageView` | Sim | Sim | Mesmo `event_id` | Audiência/diagnóstico |
| `ViewContent` | Sim, em páginas solares | Sim | Mesmo `event_id` | Remarketing/intencionalidade |
| `Lead` | Sim, na página de obrigado | Sim, no POST do formulário | Mesmo `event_id` | Conversão principal |
| `Contact` | Sim, clique no WhatsApp Solar | Sim | Mesmo `event_id` | Conversão secundária |

## Pontos fortes

| Área | Status | Evidência |
| --- | --- | --- |
| Pixel publicado | Aprovado | O script e a configuração do Pixel foram observados após consentimento. |
| Isolamento do funil Solar | Aprovado com ressalva | Rotas solares usam telefone, mensagem, categoria e `ViewContent` específicos. |
| CAPI configurado | Aprovado no código | Produção expõe `capiEnabled: true`; token e Pixel existem no ambiente local auditado. |
| Deduplicação | Aprovado | Browser usa `eventID`; servidor usa `event_id` idêntico para cada evento. |
| Qualidade de correspondência | Boa | CAPI envia telefone/e-mail/nome quando disponíveis, IP, user-agent, `_fbp`, `_fbc`, país e `external_id`, com hash SHA-256 onde exigido. |
| Atribuição | Boa | Captura `fbclid`, `ctwa_clid`, `_fbp`, `_fbc` e UTMs; persiste campanha por até 90 dias. |
| CRM | Bom no código | Lead é enviado com origem, campanha, click IDs, faixa da conta e `event_id`. |
| Privacidade | Boa como base | Consent Mode, banner e Política de Privacidade citam Meta Pixel, anúncios e cookies de marketing. |
| Anti-spam | Básico | Honeypot e rate limit estão presentes. |

## Achados prioritários

| Área | Severidade | Confiança | Achado | Evidência | Correção |
| --- | --- | --- | --- | --- | --- |
| Consentimento/CAPI | **Crítico** | Confirmado | O `Lead` server-side pode ser enviado mesmo quando o visitante recusou marketing. | `/contato` chama `sendMetaCapiEvent()` para todo lead solar; o payload não possui consentimento. | Enviar `marketing_consent` no formulário e bloquear/limitar CAPI quando negado, conforme a base legal definida. |
| Cookies antes do aceite | **Crítico** | Confirmado | `_fbc` e armazenamento de atribuição podem ser criados antes do consentimento. | `captureUtmsAndClickIds()` roda antes de `boot()`; `ensureFbcFromFbclid()` grava `_fbc`. | Guardar apenas em memória/session quando permitido ou adiar cookies/armazenamento de marketing até o aceite. |
| CAPI real | Aviso | Confirmado | A presença do token não comprova que eventos são aceitos pela Meta. | O site mostra `capiEnabled: true`, mas não houve acesso ao Gerenciador de Eventos/Test Events. | Validar `PageView`, `ViewContent`, `Lead` e `Contact` em Test Events, Diagnostics e Event Match Quality. |
| Revogação | Aviso | Confirmado | Depois de aceitar ou recusar, não existe controle visível para reabrir preferências. | Banner é ocultado e não foi encontrado link/botão permanente de configuração. | Adicionar “Preferências de cookies” no rodapé e remover cookies de marketing quando houver revogação. |
| Contaminação de audiência | Aviso | Confirmado | Toda URL iniciada por `/servicos/` é classificada como Solar. | `categoryFromPath()` usa `p.startsWith('/servicos/')`; existem serviços não solares, como manutenção de subestação e laudos. | Mapear somente slugs solares como `solar`; classificar os demais por engenharia/elétrica. |
| Conversão WhatsApp | Aviso | Confirmado | `Contact` mede o clique, não uma conversa iniciada ou lead qualificado. | O listener dispara ao clicar em `wa.me`. | Manter `Contact` secundário; otimizar campanha por `Lead` e, depois, por lead qualificado/venda via CRM. |
| Versão da Graph API | Manutenção | Confirmado | O fallback do CAPI está fixo em `v21.0`, sem override local. | `META_GRAPH_VERSION || 'v21.0'`; variável ausente no `.env` auditado. | Definir versão suportada em produção e criar rotina de atualização antes da expiração. |
| Advanced Matching | Aviso | Provável | O Pixel é inicializado novamente na página de obrigado para acrescentar dados do usuário. | `applyAdvancedMatching()` chama novamente `fbq('init', pixelId, am)`. | Verificar alerta de Pixel duplicado; preferir uma inicialização consistente ou validar o padrão na versão atual do Pixel. |
| Qualidade do lead | Oportunidade | Confirmado | Algumas LPs capturam somente nome e telefone; e-mail e cidade nem sempre existem. | LP Empresas não possui campo de e-mail. | Não adicionar campos apenas para o Pixel; testar impacto na taxa e coletar cidade/faixa de consumo quando comercialmente útil. |

## Avaliação para a agência

A agência pode iniciar testes controlados porque Pixel, eventos, LPs e CAPI já possuem uma arquitetura coerente. Não deve escalar orçamento até:

1. corrigir o comportamento de consentimento;
2. comprovar eventos no Test Events e Diagnostics da Meta;
3. confirmar deduplicação e Event Match Quality;
4. garantir que `Lead` seja a conversão principal;
5. enviar do CRM os estágios de lead qualificado, proposta e venda.

## Limitações

- Não houve acesso ao Business Manager, Gerenciador de Eventos, conta de anúncios ou Test Events.
- Nenhum formulário real foi submetido para não criar lead e conversão falsos.
- A auditoria confirma o site publicado e o código, mas não confirma Event Match Quality, Diagnostics, domínio verificado, AEM/priorização de eventos ou permissões dos ativos dentro da Meta.
