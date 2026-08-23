# Plano de ação — Google Ads

## P0 — antes de anunciar

1. Criar ou confirmar a ação de conversão de lead no Google Ads.
2. Definir em produção `GTM_ID`, `GOOGLE_ADS_ID` e `GOOGLE_ADS_CONVERSION_LABEL` (ou centralizar toda a implementação no GTM, sem duplicidade).
3. Publicar novamente e confirmar que os IDs não estão vazios no HTML renderizado.
4. Testar com Tag Assistant:
   - primeira visita com consentimento negado;
   - aceite de cookies e update do Consent Mode v2;
   - envio válido da LP;
   - redirecionamento para a página de obrigado;
   - um único evento de lead/conversão;
   - e-mail/telefone apenas com consentimento e formato aceito pelas conversões avançadas.
5. Confirmar que o mesmo lead chegou ao CRM com `gclid`/`gbraid`/`wbraid`, UTMs, URL de entrada, horário e `event_id`.

## P1 — primeira semana

1. Marcar **Lead enviado** como conversão primária e **Clique no WhatsApp** como secundária/observação, evitando otimização por clique de baixa qualidade.
2. Configurar GA4 pelo GTM e manter nomenclatura consistente: `generate_lead`, `contact_whatsapp`, `form_start` e `form_error`.
3. Definir padrão de UTMs para campanha, grupo, criativo e termo.
4. Criar painel mínimo com custo, leads, CPL, leads qualificados, propostas e vendas.
5. Rodar Lighthouse/PageSpeed mobile nas LPs e corrigir LCP/CLS antes de aumentar orçamento.

## P2 — qualidade e escala

1. Importar conversões offline de lead qualificado, proposta e venda usando click IDs armazenados no CRM.
2. Criar LPs por intenção/segmento somente quando houver oferta e prova específicas; evitar variações superficiais.
3. A/B testar headline, prova social, CTA, quantidade de campos e oferta.
4. Revisar termos de pesquisa, negativas e correspondência geográfica semanalmente.
5. Remover markup `FAQPage` das páginas comerciais e preservar apenas o conteúdo visível.

## Critério de liberação

O site está liberado para campanhas quando todos os itens abaixo estiverem comprovados:

- Google tag/GTM carregando após consentimento;
- Consent Mode v2 mudando corretamente de `denied` para `granted`;
- conversão aparecendo no Tag Assistant e no diagnóstico do Google Ads;
- lead chegando ao CRM com atribuição completa;
- nenhuma duplicidade entre GTM e gtag direto;
- LP mobile sem erro funcional e com desempenho aceitável;
- política de privacidade e banner acessíveis.
