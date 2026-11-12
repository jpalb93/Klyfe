# Seletor de WhatsApp — implementação local

Extensão pontual do botão flutuante existente, aprovada para herdar a identidade visual da home: tipografia, cores do tema, ícones e formato do botão. O painel usa as variáveis visuais já disponíveis, com foco visível e adaptação para telas pequenas. `PRODUCT.md` ausente; o escopo é o componente existente.

## Comportamento

Na home principal e nas homes regionais, `details`/`summary` nativo abre quatro links:

| Serviço | WhatsApp |
| --- | --- |
| Energia solar | 5583991430929 |
| Serviços de elétrica | 5583991330972 |
| Wallbox | 5583991330972 |
| Automação | 5583991330972 |

Cada link abre o WhatsApp em outra aba com mensagem que identifica serviço e localização. O painel fecha ao clicar fora, ao sair com o foco ou ao escolher um serviço. Escape fecha e devolve o foco ao botão. Nas páginas internas, permanece o link direto contextual já existente.

## Arquivos

- `views/index.ejs`: inclui os recursos do seletor na home.
- `views/partials/whatsapp.ejs`: define o seletor, os destinos e a alternativa de link direto.
- `public/css/whatsapp-picker.css`: painel, estados de interação, foco e comportamento responsivo.
- `public/js/whatsapp-picker.js`: fechamento por clique externo, Escape, saída de foco e escolha de serviço.

## Verificação

Build/EJS e `whatsapp-cta-governance` passaram. Playwright com Edge validou links, teclado, Escape e retorno de foco, clique fora, páginas regionais e páginas internas nas larguras de 320, 390 e 1440 px. O detector retornou `[]`; a revisão independente foi aprovada sem achados.

Implementação e verificações locais, sem deploy.
