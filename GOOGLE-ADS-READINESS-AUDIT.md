# Auditoria de prontidão para Google Ads

**Site:** https://www.klyfeelectric.com.br/  
**Data:** 11/08/2026  
**Escopo:** estrutura técnica, landing pages, mensuração, consentimento/LGPD, captação e entrega de leads para uma agência de gestão de tráfego.

## Resumo executivo

**Veredito: parcialmente pronto; não deve escalar campanhas de Google Ads antes de corrigir a mensuração.**

O site tem uma base boa e acima da média: landing pages segmentadas, formulário, página de obrigado, captura de UTMs e identificadores de clique, Consent Mode v2, banner LGPD, política de privacidade, Meta Pixel/CAPI e integração prevista com CRM. Entretanto, o HTML publicado em 11/08/2026 expõe `gtmId`, `googleAdsId` e `googleAdsConversionLabel` vazios. Assim, GTM e Google Ads não são carregados e a conversão de lead do Google não é enviada.

**Prontidão operacional estimada: 60/100 (confiança alta).** A nota reflete uma implementação quase completa no código, penalizada pelo bloqueio crítico de configuração em produção e pela falta de validação ponta a ponta.

## O que está pronto

| Área | Status | Evidência |
| --- | --- | --- |
| Landing page de campanha | Pronto | `/lp/energia-solar-empresas` responde 200, possui oferta, CTA e formulário. |
| Página de obrigado | Pronto | `/lp/energia-solar-empresas/obrigado` responde 200 e está marcada `noindex, nofollow`. |
| Atribuição | Pronto no código | `tracking.js` persiste `gclid`, `gbraid`, `wbraid`, UTMs e landing page por até 90 dias. |
| Consentimento | Pronto | Consent Mode v2 inicia marketing e analytics como `denied`; banner oferece Aceitar e Recusar. |
| LGPD | Pronto como base | Política de Privacidade publicada e vinculada no site/banner. |
| Conversões avançadas | Pronto no código | O fluxo normaliza e envia e-mail/telefone quando configurado e consentido. |
| Meta Ads | Ativo | O HTML publicado possui Meta Pixel e CAPI habilitados. |
| SEO/on-page | Bom | Home 200, HTTPS, canonical, `index, follow`, 842 palavras, sitemap e robots.txt válidos. |
| Segurança e entrega | Bom | Helmet/CSP, compressão, rate limit e honeypot nos formulários. |

## Achados

| Área | Severidade | Confiança | Achado | Evidência | Correção |
| --- | --- | --- | --- | --- | --- |
| Google Ads/GTM | **Crítico** | Confirmado | O Google Ads não está ativo em produção. | Home, LP e obrigado renderizam `gtmId: ""`, `googleAdsId: ""` e `googleAdsConversionLabel: ""`. | Configurar as variáveis no ambiente de produção e publicar novamente. |
| Conversão principal | **Crítico** | Confirmado | A agência não consegue otimizar por lead real do Google. | `fireGoogleAdsConversion()` retorna sem enviar evento quando ID ou label está vazio. | Criar/importar a ação de conversão e validar o disparo somente após sucesso do formulário. |
| Validação ponta a ponta | Aviso | Confirmado | Não há prova de diagnóstico real com Tag Assistant/Google Ads. | Tags Google ausentes impedem o teste publicado. | Testar consentimento negado/aceito, submissão, página de obrigado e deduplicação. |
| CRM/offline conversion | Aviso | Provável | O código encaminha click IDs e UTMs, mas a configuração local auditada não demonstra CRM ativo. | `.env` local não possui `CRM_API_URL`/`CRM_API_KEY`; produção não foi inspecionada por segredo. | Confirmar recebimento no CRM e preparar importação de conversões qualificadas/vendas. |
| Conversão WhatsApp | Aviso | Confirmado | O clique de WhatsApp gera evento Meta apenas no contexto solar; não há conversão Google ativa. | Listener envia `contact_whatsapp` ao `dataLayer`, mas GTM está vazio. | Criar conversão secundária de clique no WhatsApp; manter lead enviado como conversão principal. |
| Spam/qualidade | Aviso | Confirmado | Existe honeypot e rate limit, mas não há CAPTCHA/Turnstile na LP. | Formulário contém `website_url`; nenhum CAPTCHA foi encontrado. | Monitorar spam; adicionar Turnstile/reCAPTCHA somente se houver abuso, para não reduzir conversão sem necessidade. |
| Performance | Desconhecido | Hipótese | Core Web Vitals de campo não puderam ser confirmados. | PageSpeed API respondeu com rate limit. Imagens hero PNG da LP chegam a aproximadamente 1 MB no repositório, embora existam variantes WebP. | Rodar PageSpeed/Lighthouse mobile e confirmar que a LP usa WebP/AVIF, dimensões e preload adequados. |
| Dados estruturados | Aviso | Confirmado | O site comercial publica `FAQPage` em várias páginas. | Foram encontradas ocorrências em rotas, blog e templates de serviço. | Remover `FAQPage` de site comercial; manter a FAQ visível sem esse markup. Não bloqueia Ads, mas reduz ruído técnico. |

## Prontidão para handoff à agência

A agência já pode receber:

- URLs das landing pages e página de obrigado;
- matriz de UTMs;
- definição dos eventos `generate_lead` e `contact_whatsapp`;
- acesso ao Google Ads, GTM, GA4, Search Console e CRM;
- identificação de quais conversões são primárias e secundárias.

Ela ainda não deve iniciar escala até existir um teste real de conversão no Google Ads e confirmação do lead no CRM.

## Limitações

- A API do PageSpeed limitou a consulta; LCP, INP e CLS não foram medidos nesta execução.
- Não houve acesso às contas Google Ads/GTM/GA4 nem aos segredos de produção.
- O diagnóstico confirma o HTML e o código publicados, mas não confirma configurações internas de containers/contas que não estão carregando no site.
