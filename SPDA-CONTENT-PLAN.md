# Guia SPDA — implementação de 21/09/2026

## Intenções e páginas

O serviço `/solucoes/engenharia/spda` e suas versões locais concentram contratação. A seção Guia SPDA apresenta seis cards, com atalho no início da página. `config/spda-guides.js` define a seleção e a ordem.

| URL do blog | Intenção reservada |
| --- | --- |
| spda-para-raios-obrigatorio | Fundamentos e avaliação de necessidade; URL existente preservada |
| laudo-spda-o-que-deve-conter | Leitura do documento, escopo, evidências e conclusão |
| inspecao-manutencao-spda | Acompanhamento do sistema e das intervenções |
| diferenca-spda-aterramento-dps | Comparação de funções |
| projeto-spda-etapas-documentos | Preparação do projeto e entregáveis |
| energia-solar-edificio-com-spda | Compatibilização de sistemas na cobertura |

Os artigos apontam ao guia central, a complementares pertinentes e ao serviço. Links editoriais levam à URL raiz. Versões municipais dos seis artigos permanecem acessíveis com canonical para a raiz e ficam fora do sitemap. Os serviços locais mantêm seus próprios canonicals.

Não criar variações de artigos apenas para sinônimos ou cidades. Glossário continua destinado a definições breves. Custo, retorno e geração solar não são o foco do artigo de compatibilização.

## Fontes e autoria

Catálogo ABNT e divulgação do CRT-SP confirmam a atualização de 2026. Não houve acesso ao texto integral da norma: não foram reproduzidos intervalos, dimensionamentos ou listas apresentadas como requisitos normativos exaustivos. A DEHN é referência internacional complementar para a interface fotovoltaica, sem substituir normas brasileiras.

Autoria editorial institucional, sem atribuir revisão técnica a uma pessoa que não revisou o conteúdo. Exemplos são explicitamente ilustrativos. A imagem existente é ilustrativa, não uma fotografia apresentada como instalação executada de SPDA.

## Verificação e acompanhamento

Executar `node tests/spda-guides.test.js` com o servidor na porta 3218 ou `TEST_SITE_ORIGIN` definido. O teste percorre os artigos nas três localidades, valida links, JSON-LD, canonicals, sitemap e presença dos cards somente no serviço SPDA.

Após publicação, avaliar consultas e páginas no Search Console. Compartilhar termos não confirma canibalização: investigar alternância indesejada da página de destino e desempenho para a mesma intenção antes de fundir conteúdos.

Os JSONs locais são fallback do CMS central. Uma versão remota com o mesmo slug prevalece; conferir sincronização editorial no ambiente de publicação, especialmente para o guia existente.
