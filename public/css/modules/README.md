# Arquitetura dos estilos

Os arquivos desta pasta são a fonte editável do CSS principal. Os bundles em
`public/css/` são gerados por `scripts/build-css.js` e não devem receber edições
manuais.

## Bundles servidos

- `home.css`: Home no tema `solar-warm`.
- `solar.css`: hub e páginas do tema `azure-sky`.
- `style.css`: páginas institucionais e de serviços sem tema.
- `site-v2.css`: camada visual complementar das páginas que não são a Home.

O partial `views/partials/head.ejs` escolhe um único bundle principal conforme
o tema da rota. Execute `npm run build:css` depois de alterar qualquer módulo.
O comando `npm run build` também atualiza os bundles antes de validar os EJS.

`50-retired-theme-previews.css` preserva os antigos temas de demonstração para
consulta, mas não faz parte de nenhum bundle de produção.
