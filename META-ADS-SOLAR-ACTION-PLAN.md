# Plano de ação — Meta Ads para Energia Solar

## P0 — antes de escalar

1. Corrigir o consentimento do CAPI:
   - incluir o estado de consentimento no payload do formulário;
   - documentar a base legal aplicável;
   - não enviar dados de marketing ao CAPI quando o tratamento não estiver autorizado.
2. Não criar `_fbc` ou persistência de marketing antes do aceite.
3. Adicionar “Preferências de cookies” no rodapé, com revogação funcional.
4. Abrir Meta Events Manager → Test Events e testar, com um lead explicitamente marcado como teste:
   - `PageView` browser + server;
   - `ViewContent` browser + server;
   - `Lead` browser + server com o mesmo ID;
   - `Contact` browser + server com o mesmo ID.
5. Verificar Diagnostics:
   - eventos duplicados;
   - `event_id` ausente;
   - `event_source_url`;
   - `_fbp`/`_fbc` inválidos;
   - atraso do evento;
   - parâmetros de usuário ausentes.

## P1 — organização das campanhas solares

1. Usar **Lead** como conversão principal.
2. Manter **Contact/WhatsApp** como conversão secundária, sem otimizar exclusivamente por clique.
3. Separar conjuntos e relatórios por `content_name`:
   - `lp-solar-empresas`;
   - `lp-solar-fazendas`;
   - `lp-solar-supermercados-clinicas`;
   - `lp-solar-residencial`;
   - `lp-solar-alta-conversao`.
4. Corrigir `categoryFromPath()` para que serviços não solares não alimentem audiências Solar.
5. Confirmar verificação do domínio e propriedade/compartilhamento correto do Pixel, dataset, página, Instagram e conta de anúncios.
6. Confirmar que o Pixel usado nas campanhas é exatamente `2272429916841371`.

## P2 — qualidade e aprendizado do algoritmo

1. Enviar do CRM eventos de funil com IDs estáveis:
   - `QualifiedLead` ou evento personalizado equivalente;
   - proposta enviada;
   - venda/contrato, com `value` e `currency: BRL`.
2. Medir por LP e campanha:
   - CPL;
   - taxa de lead qualificado;
   - custo por proposta;
   - custo por venda;
   - receita e ROAS.
3. Criar audiências de remarketing de `ViewContent` Solar sem `Lead`.
4. Criar exclusão de clientes/leads recentes, respeitando consentimento e política de dados.
5. Testar criativos e ofertas por segmento, sem misturar residencial, empresas e rural no mesmo aprendizado quando os tickets e ciclos forem diferentes.

## Critério de liberação

O funil está pronto para escala quando:

- Pixel não carrega antes do consentimento;
- nenhum identificador de marketing é persistido indevidamente antes do aceite;
- CAPI respeita a decisão/base legal do titular;
- os quatro eventos aparecem em Test Events sem erro;
- browser e server estão deduplicados;
- Event Match Quality está aceitável para `Lead`;
- CRM recebe `fbclid`, `_fbp`, `_fbc`, UTMs, `event_id` e origem da LP;
- lead qualificado e venda retornam à Meta;
- campanhas otimizam por `Lead` ou etapa comercial, não apenas por clique no WhatsApp.
