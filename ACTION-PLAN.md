# Plano de ação — endereço e SEO local da Klyfe

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
