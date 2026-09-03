# Auditoria completa de SEO local e endereço — Klyfe Electric | Engenharia & Energia

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
