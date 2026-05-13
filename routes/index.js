const express = require('express');
const router = express.Router();

const baseUrl = 'https://www.klyfeelectric.com.br';

// Rota Home
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Klyfe Electric | Soluções Elétricas, Automação e Energia Solar em Campina Grande/PB',
        description: 'Klyfe Electric: projetos elétricos, automação e energia solar em Campina Grande e João Pessoa. 5★ no Google · (83) 99133-0972',
        canonical: `${baseUrl}/`,
        page: 'home'
    });
});

// Rota Quem Somos
router.get('/quem-somos', (req, res) => {
    res.render('quem-somos', {
        title: 'Quem Somos | Klyfe Electric — Campina Grande/PB',
        description: 'Conheça a Klyfe Electric: engenharia elétrica, automação e energia solar em Campina Grande. 5★ no Google, 200+ projetos entregues.',
        canonical: `${baseUrl}/quem-somos`,
        page: 'quem-somos'
    });
});

// Rota Portal de Soluções (Hub)
router.get('/solucoes', (req, res) => {
    res.render('solucoes', {
        title: 'Nossas Soluções em Engenharia, Elétrica e Automação | Klyfe Electric',
        description: 'Conheça o ecossistema completo de soluções da Klyfe Electric na Paraíba. Engenharia de precisão, automação inteligente e energia solar.',
        canonical: `${baseUrl}/solucoes`,
        page: 'solucoes'
    });
});

// Rota Engenharia Elétrica
router.get('/solucoes/engenharia', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Engenharia Elétrica",
      "name": "Engenharia Elétrica em Campina Grande",
      "description": "Projetos elétricos, laudos NR-10, subestações e consultoria técnica especializada em Campina Grande e toda a Paraíba. Engenharia de alta performance com ART.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "City", "name": "João Pessoa" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    `;

    res.render('engenharia', {
        title: 'Engenharia Elétrica em Campina Grande | Klyfe Electric',
        description: 'Projetos elétricos de alto nível, subestações, laudos NR-10 e consultoria técnica em Campina Grande e João Pessoa. Engenharia de precisão com ART.',
        canonical: `${baseUrl}/solucoes/engenharia`,
        page: 'engenharia',
        jsonLd: jsonLd
    });
});

// Rota Específica Laudos Elétricos (SEO Power Page)
router.get('/solucoes/engenharia/laudos-eletricos', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" },
        { "@type": "ListItem", "position": 4, "name": "Laudos Elétricos e Inspeções", "item": "${baseUrl}/solucoes/engenharia/laudos-eletricos" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Laudos Elétricos e Inspeções",
      "name": "Laudos Elétricos e Inspeções Técnicas",
      "description": "Laudos elétricos completos (NBR 5410, NR-10, SPDA, aterramento) com inspeção, medições, termografia e ART em toda a Paraíba.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "City", "name": "João Pessoa" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto tempo leva a emissão do laudo?",
          "acceptedAnswer": { "@type": "Answer", "text": "O tempo varia conforme o tamanho da instalação; visitas duram de 2 a 8 horas e o laudo é entregue em 3-7 dias úteis após as medições." }
        },
        {
          "@type": "Question",
          "name": "Vocês emitem ART?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, todos os laudos são assinados por engenheiro eletricista e acompanham ART (Anotação de Responsabilidade Técnica)." }
        },
        {
          "@type": "Question",
          "name": "O laudo serve para fins de financiamento ou seguro?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, nossos relatórios seguem padrões técnicos exigidos por bancos, seguradoras, concessionárias e Corpo de Bombeiros." }
        }
      ]
    }
    </script>
    `;

    res.render('laudos-eletricos', {
        title: 'Laudos Elétricos em Campina Grande e Paraíba | Klyfe Electric',
        description: 'Laudos elétricos completos (NBR 5410, NR-10, SPDA, aterramento, subestação) with inspeção, medições, termografia e ART. Atendemos residências, comércios, indústrias e condomínios.',
        canonical: `${baseUrl}/solucoes/engenharia/laudos-eletricos`,
        robots: 'index, follow',
        page: 'engenharia',
        jsonLd: jsonLd
    });
});

// Rota Específica Projeto Elétrico (SEO Power Page)
router.get('/solucoes/engenharia/projeto-eletrico', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" },
        { "@type": "ListItem", "position": 4, "name": "Projeto Elétrico Residencial, Predial e Industrial", "item": "${baseUrl}/solucoes/engenharia/projeto-eletrico" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Projeto Elétrico",
      "name": "Projeto Elétrico Residencial, Predial e Industrial",
      "description": "Elaboração de projetos elétricos completos para obras novas, ampliações e adequações. Inclui levantamento de carga, dimensionamento, diagramas unifilares e multifiliares, memorial descritivo, ART e aprovação na Energisa.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "State", "name": "Paraíba" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tipos de Projeto Elétrico",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto Elétrico Residencial" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto Elétrico Predial" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projeto Elétrico Industrial" } }
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O projeto elétrico é obrigatório para obras residenciais?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim. A NBR 5410 exige que instalações elétricas residenciais sigam projeto elaborado por profissional habilitado. Além disso, a concessionária (Energisa) exige o projeto para aprovação da ligação elétrica em obras acima de determinada carga instalada." }
        },
        {
          "@type": "Question",
          "name": "O que é ART e por que ela é necessária no projeto elétrico?",
          "acceptedAnswer": { "@type": "Answer", "text": "ART é a Anotação de Responsabilidade Técnica emitida pelo CREA. Ela atesta que um engenheiro eletricista habilitado é responsável técnico pelo projeto, garantindo validade legal, segurança e conformidade com as normas vigentes." }
        },
        {
          "@type": "Question",
          "name": "Qual norma rege os projetos elétricos residenciais no Brasil?",
          "acceptedAnswer": { "@type": "Answer", "text": "A NBR 5410 da ABNT é a norma brasileira que regulamenta as instalações elétricas de baixa tensão, sendo aplicada em projetos residenciais e comerciais. Projetos industriais seguem complementarmente a NR-10 e normas específicas do setor." }
        },
        {
          "@type": "Question",
          "name": "A Klyfe Electric realiza a aprovação do projeto na Energisa?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim. A Klyfe Electric acompanha todo o processo de aprovação junto à Energisa, desde a elaboração da documentação técnica exigida até o protocolo e acompanhamento da aprovação da ligação elétrica." }
        },
        {
          "@type": "Question",
          "name": "Projetos elétricos industriais seguem normas diferentes?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim. Projetos elétricos industriais exigem atenção a aspectos como alta demanda, fator de potência, proteção contra surtos, aterramento e conformidade com a NR-10 (Segurança em Instalações e Serviços em Eletricidade), além das normas ABNT aplicáveis ao setor." }
        }
      ]
    }
    </script>
    `;

    res.render('projeto-eletrico', {
        title: 'Projeto Elétrico em Campina Grande | Residencial, Predial e Industrial – Klyfe Electric',
        description: 'A Klyfe Electric elabora projetos elétricos residenciais, prediais e industriais em Campina Grande e Paraíba. Projetos com ART, memorial de cálculo, diagrama unifilar e aprovação na Energisa. Solicite orçamento.',
        canonical: `${baseUrl}/solucoes/engenharia/projeto-eletrico`,
        robots: 'index, follow',
        page: 'engenharia',
        jsonLd: jsonLd
    });
});

// Rota Específica Aprovação de Projeto na Energisa (SEO Power Page)
router.get('/solucoes/engenharia/aprovacao-energisa', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" },
        { "@type": "ListItem", "position": 4, "name": "Aprovação de Projeto na Energisa", "item": "${baseUrl}/solucoes/engenharia/aprovacao-energisa" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Aprovação de Projeto Elétrico na Energisa",
      "name": "Aprovação de Projeto na Energisa",
      "description": "Análise técnica, adequação normativa, elaboração de documentação e acompanhamento completo do processo de aprovação de projetos elétricos junto à Energisa para instalações residenciais, comerciais, industriais e subestações na Paraíba.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City",  "name": "Campina Grande" },
        { "@type": "State", "name": "Paraíba" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tipos de Aprovação",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aprovação de Projeto Elétrico Residencial na Energisa"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aprovação de Projeto Elétrico Comercial na Energisa"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aprovação de Projeto Elétrico Industrial na Energisa"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aprovação de Projeto de Subestação na Energisa"
            }
          }
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quando é obrigatória a aprovação do projeto elétrico na Energisa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A aprovação do projeto elétrico na Energisa é exigida para novas ligações, ampliações de carga, regularizações e instalações que atingem os limites definidos pela concessionária. Projetos comerciais, industriais e de subestações geralmente são enquadrados nessa exigência independentemente do porte."
          }
        },
        {
          "@type": "Question",
          "name": "Quais normas a Energisa exige para aprovação de projetos elétricos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Energisa exige conformidade com as normas técnicas da ABNT, em especial a NBR 5410 para instalações de baixa tensão e a NBR 14039 para instalações de média tensão (subestações). Além disso, exige ART (Anotação de Responsabilidade Técnica) emitida por engenheiro eletricista registrado no CREA."
          }
        },
        {
          "@type": "Question",
          "name": "O que é necessário para aprovar um projeto elétrico na Energisa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em geral, a Energisa exige: projeto elétrico elaborado por engenheiro eletricista habilitado, diagrama unifilar, memorial descritivo e de cálculo, ART recolhida e documentação do imóvel. A Klyfe Electric elabora e protocola toda essa documentação."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o prazo médio para aprovação de um projeto na Energisa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O prazo varia conforme o tipo e a complexidade do projeto, além do fluxo interno da concessionária. A Klyfe Electric acompanha ativamente o processo para identificar pendências e agilizar a aprovação, evitando atrasos desnecessários na obra."
          }
        },
        {
          "@type": "Question",
          "name": "A Klyfe Electric atende projetos de subestação para aprovação na Energisa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. A Klyfe Electric atua na elaboração e aprovação de projetos de subestações junto à Energisa, com conformidade à NBR 14039 e demais requisitos técnicos exigidos para instalações de média tensão na Paraíba."
          }
        }
      ]
    }
    </script>
    `;

    res.render('aprovacao-energisa', {
        title: 'Aprovação de Projeto na Energisa em Campina Grande | Klyfe Electric',
        description: 'A Klyfe Electric cuida de todo o processo de aprovação de projetos elétricos na Energisa em Campina Grande e Paraíba. Projetos residenciais, comerciais, industriais e de subestações. Com ART, NBR 5410, NBR 14039 e suporte técnico completo. Solicite orçamento.',
        canonical: `${baseUrl}/solucoes/engenharia/aprovacao-energisa`,
        robots: 'index, follow',
        page: 'engenharia',
        jsonLd: jsonLd
    });
});


// Rota Específica Projeto de Subestação Aérea (SEO Power Page)
router.get('/solucoes/engenharia/subestacao-aerea', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" },
        { "@type": "ListItem", "position": 4, "name": "Projeto de Subestação Aérea até 500kVA", "item": "${baseUrl}/solucoes/engenharia/subestacao-aerea" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Projeto de Subestação Elétrica",
      "name": "Projeto de Subestação Aérea até 500kVA",
      "description": "Elaboração de projetos completos de subestações aéreas até 500kVA para instalações industriais, comerciais, prediais e rurais na Paraíba. Inclui projeto de média tensão, laudos, ART, memorial descritivo e aprovação junto à Energisa, com conformidade à NBR 14039 e NR-10.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City",  "name": "Campina Grande" },
        { "@type": "State", "name": "Paraíba" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de Subestação Aérea",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Projeto de Subestação Aérea até 500kVA"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aprovação de Projeto de Subestação na Energisa"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Laudos Técnicos e ART para Subestação"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Memorial Descritivo de Subestação"
            }
          }
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é uma subestação aérea e quando ela é necessária?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Uma subestação aérea é uma instalação de média tensão instalada em estrutura elevada (poste ou torre), responsável por receber energia da concessionária em média tensão e transformá-la para baixa tensão. É necessária quando a demanda de energia de uma instalação industrial, comercial, predial ou rural ultrapassa os limites de atendimento em baixa tensão pela concessionária."
          }
        },
        {
          "@type": "Question",
          "name": "Qual norma regulamenta projetos de subestação elétrica no Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Projetos de subestações de média tensão são regulamentados pela NBR 14039 da ABNT, que estabelece os requisitos para instalações elétricas de média tensão entre 1 kV e 36 kV. Além disso, a NR-10 do Ministério do Trabalho regula a segurança em instalações e serviços em eletricidade, sendo obrigatória em ambientes com risco elétrico."
          }
        },
        {
          "@type": "Question",
          "name": "O projeto de subestação precisa de aprovação na Energisa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Todo projeto de subestação que se conecta à rede da concessionária precisa ser aprovado pela Energisa antes da execução. A aprovação exige projeto técnico elaborado por engenheiro eletricista habilitado, ART recolhida junto ao CREA, memorial descritivo e demais documentos definidos nas normas de acesso da concessionária."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre subestação aérea e subestação abrigada?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A subestação aérea é instalada em estrutura elevada a céu aberto, geralmente em poste ou cavalete, sendo mais comum em projetos de até 500kVA pela sua relação de custo-benefício. A subestação abrigada é instalada em edificação fechada (cabine), oferecendo maior proteção aos equipamentos e é mais utilizada em instalações de maior porte ou em ambientes que exigem restrições de acesso mais rígidas."
          }
        },
        {
          "@type": "Question",
          "name": "A Klyfe Electric atende projetos de subestação fora de Campina Grande?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. A Klyfe Electric atende projetos de subestação aérea em Campina Grande, em toda a Paraíba e em regiões vizinhas. Entre em contato para verificar a disponibilidade de atendimento para a sua localidade."
          }
        }
      ]
    }
    </script>
    `;

    res.render('subestacao-aerea', {
        title: 'Projeto de Subestação Aérea até 500kVA em Campina Grande | Klyfe Electric',
        description: 'A Klyfe Electric projeta subestações aéreas até 500kVA para indústrias, comércios, condomínios e propriedades rurais em Campina Grande e Paraíba. Conformidade com NBR 14039, NR-10 e aprovação na Energisa. ART inclusa. Solicite orçamento.',
        canonical: `${baseUrl}/solucoes/engenharia/subestacao-aerea`,
        robots: 'index, follow',
        page: 'engenharia',
        jsonLd: jsonLd
    });
});

// Rota Específica Correção de Fator de Potência (SEO Power Page)
router.get('/solucoes/engenharia/correcao-fator-potencia', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "${baseUrl}/solucoes/engenharia" },
        { "@type": "ListItem", "position": 4, "name": "Correção de Fator de Potência", "item": "${baseUrl}/solucoes/engenharia/correcao-fator-potencia" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Correção de Fator de Potência",
      "name": "Correção de Fator de Potência",
      "description": "Estudo de carga reativa, dimensionamento e instalação de banco de capacitores para correção de fator de potência em instalações industriais e comerciais em Campina Grande e Paraíba. Elimina multas da concessionária, reduz encargos e aumenta a eficiência energética do sistema elétrico.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City",  "name": "Campina Grande" },
        { "@type": "State", "name": "Paraíba" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de Correção de Fator de Potência",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Estudo e Análise de Fator de Potência"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dimensionamento de Banco de Capacitores"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Instalação de Banco de Capacitores Fixo ou Automático"
            }
          }
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é fator de potência e por que ele importa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fator de potência é a relação entre a potência ativa (kW), que realiza trabalho útil, e a potência aparente (kVA), que é efetivamente demandada do sistema elétrico. Um fator de potência baixo indica que a instalação consome mais corrente do que o necessário para realizar o mesmo trabalho, sobrecarregando condutores, transformadores e a rede da concessionária."
          }
        },
        {
          "@type": "Question",
          "name": "Quando a concessionária aplica multa por fator de potência?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Resolução ANEEL nº 414/2010 e o PRODIST estabelecem que o fator de potência das instalações deve ser mantido entre 0,92 indutivo e 1,00. Quando o fator de potência medido fica abaixo de 0,92, a concessionária aplica encargos adicionais na fatura de energia elétrica. A correção elimina essa cobrança."
          }
        },
        {
          "@type": "Question",
          "name": "Como é feita a correção de fator de potência?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A correção é realizada por meio da instalação de banco de capacitores, que fornece energia reativa capacitiva para compensar a energia reativa indutiva consumida por cargas como motores, transformadores e reatores. O dimensionamento correto do banco exige um estudo prévio das cargas da instalação para definir a potência reativa a compensar."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre banco de capacitores fixo e automático?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O banco fixo possui potência reativa constante, sendo indicado para instalações com carga relativamente estável ao longo do dia. O banco automático possui controlador que conecta e desconecta bancos de capacitores conforme a variação da demanda reativa, sendo indicado para instalações com cargas variáveis. A escolha entre os dois depende do perfil de carga da instalação, definido no estudo técnico."
          }
        },
        {
          "@type": "Question",
          "name": "Além de eliminar multas, quais outros benefícios a correção de fator de potência traz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Além da eliminação de encargos na fatura, a correção de fator de potência reduz a corrente elétrica circulante nos condutores e equipamentos, o que diminui perdas por efeito Joule, reduz o aquecimento dos cabos e da rede, aumenta a vida útil dos equipamentos elétricos e pode liberar capacidade instalada no sistema elétrico da planta."
          }
        }
      ]
    }
    </script>
    `;

    res.render('correcao-fator-potencia', {
        title: 'Correção de Fator de Potência em Campina Grande | Klyfe Electric',
        description: 'A Klyfe Electric realiza estudo e correção de fator de potência para indústrias e comércios em Campina Grande e Paraíba. Evite multas na conta de energia, reduza encargos e aumente a eficiência do seu sistema elétrico. Solicite orçamento.',
        canonical: `${baseUrl}/solucoes/engenharia/correcao-fator-potencia`,
        robots: 'index, follow',
        page: 'engenharia',
        jsonLd: jsonLd
    });
});

// Rota Hub Serviços Elétricos (SEO Power Page)

router.get('/solucoes/eletrica', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Serviços Elétricos", "item": "${baseUrl}/solucoes/eletrica" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Serviços Elétricos",
      "name": "Eletricista Profissional em Campina Grande",
      "description": "Serviços completos de eletricista em Campina Grande: manutenção, reparos, instalações residenciais e comerciais com garantia técnica.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "City", "name": "João Pessoa" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    `;

    res.render('eletrica', {
        title: 'Serviços Elétricos e Eletricista em Campina Grande | Klyfe Electric',
        description: 'Serviços de eletricista em Campina Grande: manutenção, reparos, instalações residenciais e comerciais. Tomadas, luminárias, ventiladores e chuveiros.',
        canonical: `${baseUrl}/solucoes/eletrica`,
        robots: 'index, follow',
        page: 'eletrica',
        jsonLd: jsonLd
    });
});

// Rota Específica Carregador Veicular (SEO Power Page)
router.get('/solucoes/servicos-eletricos/montagem-carregador-veicular', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Serviços Elétricos", "item": "${baseUrl}/solucoes/eletrica" },
        { "@type": "ListItem", "position": 4, "name": "Montagem de Carregador Veicular", "item": "${baseUrl}/solucoes/servicos-eletricos/montagem-carregador-veicular" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Instalação de Carregador Veicular",
      "name": "Montagem de Carregador Veicular em Campina Grande",
      "description": "Instalação técnica de carregadores de carros elétricos (Wallbox) em Campina Grande e João Pessoa. Segurança e conformidade técnica.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      }
    }
    </script>
    `;

    res.render('carregador-veicular', {
        title: 'Montagem de Carregador Veicular em Campina Grande | Klyfe Electric',
        description: 'Montagem segura de carregadores veiculares (EV) em residências, empresas e estacionamentos em Campina Grande. Integração com rede e sistemas solares.',
        canonical: `${baseUrl}/solucoes/servicos-eletricos/montagem-carregador-veicular`,
        robots: 'index, follow',
        page: 'eletrica',
        jsonLd: jsonLd
    });
});

// Rota Específica Projeto de Rede (SEO Power Page)
router.get('/solucoes/eletrica/projeto-rede-telefonia-antena', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Serviços Elétricos", "item": "${baseUrl}/solucoes/eletrica" },
        { "@type": "ListItem", "position": 4, "name": "Projeto de Rede, Telefonia e Antena", "item": "${baseUrl}/solucoes/eletrica/projeto-rede-telefonia-antena" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Projeto de Rede Estruturada",
      "name": "Projeto de Rede e Telefonia em Campina Grande",
      "description": "Infraestrutura de rede, cabeamento estruturado, telefonia e antena em Campina Grande. Projetos técnicos com ART.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      }
    }
    </script>
    `;

    res.render('projeto-rede', {
        title: 'Projeto de Rede, Telefonia e Antena em Campina Grande | Klyfe Electric',
        description: 'Projetos de rede estruturada, telefonia e antena com ART, memorial descritivo e aprovação técnica em Campina Grande e Paraíba.',
        canonical: `${baseUrl}/solucoes/eletrica/projeto-rede-telefonia-antena`,
        robots: 'index, follow',
        page: 'eletrica',
        jsonLd: jsonLd
    });
});

// Rota Específica Instalações Elétricas Industriais (SEO Power Page)
router.get('/solucoes/eletrica/instalacoes-industriais', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "${baseUrl}/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Soluções",
          "item": "${baseUrl}/solucoes"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Serviços Elétricos",
          "item": "${baseUrl}/solucoes/eletrica"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Instalações Elétricas Industriais",
          "item": "${baseUrl}/solucoes/eletrica/instalacoes-industriais"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Instalação Elétrica Industrial",
      "name": "Instalações Elétricas Industriais",
      "description": "Execução de instalações elétricas industriais, manutenção preventiva e corretiva e montagem de quadros elétricos em Campina Grande e região, com conformidade à NR-10, NBR 5410 e NR-12.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City",  "name": "Campina Grande" },
        { "@type": "State", "name": "Paraíba" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços Elétricos Industriais",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Instalações Elétricas Industriais"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Manutenção Elétrica Preventiva Industrial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Manutenção Elétrica Corretiva Industrial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Montagem de Quadros Elétricos Industriais"
            }
          }
        ]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quais normas regulamentam instalações elétricas industriais no Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As principais normas são: NR-10, que regulamenta segurança em instalações e serviços em eletricidade; NBR 5410, que estabelece requisitos para instalações elétricas de baixa tensão; e NR-12, que regula segurança em máquinas e equipamentos, sendo aplicável em ambientes industriais onde as instalações elétricas alimentam equipamentos de produção."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre manutenção elétrica preventiva e corretiva?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A manutenção preventiva é realizada em intervalos programados para evitar falhas, inspecionando e substituindo componentes antes que apresentem defeito. A manutenção corretiva é executada após a identificação de uma falha ou defeito, com o objetivo de restabelecer o funcionamento normal da instalação. Ambas são essenciais para garantir a continuidade operacional e a segurança do ambiente industrial."
          }
        },
        {
          "@type": "Question",
          "name": "Por que a montagem de quadros elétricos exige profissional habilitado?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Quadros elétricos industriais operam com cargas elevadas e exigem dimensionamento preciso de disjuntores, fusíveis, barramentos e cabos. Um dimensionamento incorreto pode resultar em sobrecargas, curtos-circuitos, incêndios e risco de vida. A NR-10 exige que serviços em instalações elétricas sejam realizados por profissionais habilitados e capacitados."
          }
        },
        {
          "@type": "Question",
          "name": "Com que frequência deve ser realizada a manutenção elétrica preventiva em indústrias?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A frequência ideal varia conforme o porte da instalação, o regime de operação e as exigências das normas internas da empresa. Em geral, recomenda-se inspeções periódicas a cada seis meses a um ano para instalações industriais. A Klyfe Electric avalia cada caso e indica o plano de manutenção mais adequado para a sua operação."
          }
        },
        {
          "@type": "Question",
          "name": "A Klyfe Electric atende indústrias fora de Campina Grande?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. A Klyfe Electric atende instalações industriais em Campina Grande e na região. Entre em contato para verificar a disponibilidade de atendimento para a sua localidade."
          }
        }
      ]
    }
    </script>
    `;

    res.render('instalacoes-industriais', {
        title: 'Instalações Elétricas Industriais em Campina Grande | Klyfe Electric',
        description: 'A Klyfe Electric realiza instalações elétricas industriais, manutenção preventiva e corretiva e montagem de quadros elétricos em Campina Grande e região. Conformidade com NR-10, NBR 5410 e NR-12. Solicite orçamento.',
        canonical: `${baseUrl}/solucoes/eletrica/instalacoes-industriais`,
        robots: 'index, follow',
        page: 'eletrica',
        jsonLd: jsonLd
    });
});

// Rota Hub Automação (SEO Power Page)
router.get('/solucoes/automacao', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Automação", "item": "${baseUrl}/solucoes/automacao" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Automação Residencial e Industrial",
      "name": "Automação em Campina Grande",
      "description": "Soluções completas de automação smart home e industrial (CLPs, SCADA) na Paraíba. Tecnologia para conforto, segurança e eficiência.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "City", "name": "João Pessoa" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    `;

    res.render('automacao', {
        title: 'Automação Residencial e Industrial em Campina Grande | Klyfe Electric',
        description: 'Especialista em Automação Residencial (Smart Home) e Industrial em Campina Grande e João Pessoa. Controle iluminação, segurança e processos fabris.',
        canonical: `${baseUrl}/solucoes/automacao`,
        robots: 'index, follow',
        page: 'automacao',
        jsonLd: jsonLd
    });
});

// Rota Específica Automação Residencial (SEO Power Page)
router.get('/solucoes/automacao/automacao-residencial', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Automação", "item": "${baseUrl}/solucoes/automacao" },
        { "@type": "ListItem", "position": 4, "name": "Automação Residencial", "item": "${baseUrl}/solucoes/automacao/automacao-residencial" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Automação Residencial",
      "name": "Automação Residencial em Campina Grande",
      "description": "Transforme sua casa em uma Smart Home em Campina Grande ou João Pessoa. Controle de iluminação, climatização, segurança e som ambiente.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "É possível automatizar uma casa já construída?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim. Em muitos casos é possível implementar automação em casas e apartamentos já prontos, utilizando soluções sem fio (wireless) e aproveitando a infraestrutura elétrica existente." }
        },
        {
          "@type": "Question",
          "name": "A automação residencial consome muita energia?",
          "acceptedAnswer": { "@type": "Answer", "text": "Não. Quando bem planejada, a automação ajuda a reduzir o consumo, evitando que luzes, ar-condicionado e equipamentos fiquem ligados sem necessidade." }
        }
      ]
    }
    </script>
    `;

    res.render('automacao-residencial', {
        title: 'Automação Residencial em Campina Grande e João Pessoa | Klyfe Electric',
        description: 'Transforme sua casa em uma verdadeira casa inteligente com a automação residencial da Klyfe Electric. Controle iluminação, climatização, segurança e som ambiente pelo celular ou voz.',
        canonical: `${baseUrl}/solucoes/automacao/automacao-residencial`,
        robots: 'index, follow',
        page: 'automacao',
        jsonLd: jsonLd
    });
});

// Rota Energia Solar (SEO Power Page)
router.get('/solucoes/solar', (req, res) => {
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Energia Solar", "item": "${baseUrl}/solucoes/solar" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Energia Solar Fotovoltaica",
      "name": "Instalação de Energia Solar em Campina Grande",
      "description": "Sistemas solares fotovoltaicos on-grid, off-grid e híbridos para residências, comércios e indústrias na Paraíba. Economia de até 95% na conta de luz.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campina Grande",
          "addressRegion": "PB",
          "addressCountry": "BR"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Campina Grande" },
        { "@type": "City", "name": "João Pessoa" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qual o retorno financeiro do sistema solar?",
          "acceptedAnswer": { "@type": "Answer", "text": "O retorno médio ocorre em 4-5 anos. A partir daí, a economia é pura. Os painéis possuem vida útil de 25+ anos com garantia de eficiência." }
        },
        {
          "@type": "Question",
          "name": "Posso financiar o sistema solar?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim! Oferecemos auxílio para obtenção de financiamento via BNDES, Banco do Brasil e outras linhas de crédito sustentáveis." }
        },
        {
          "@type": "Question",
          "name": "Como funciona nos dias nublados?",
          "acceptedAnswer": { "@type": "Answer", "text": "Os painéis continuam gerando energia mesmo em dias nublados, com eficiência reduzida. No sistema on-grid, os créditos acumulados em dias de sol compensam a diferença." }
        }
      ]
    }
    </script>
    `;

    res.render('solar', {
        title: 'Energia Solar em Campina Grande e João Pessoa | Klyfe Electric',
        description: 'Instalação de painéis solares fotovoltaicos em Campina Grande e João Pessoa. On-grid, off-grid e híbrido. Economize até 95%. (83) 99133-0972',
        canonical: `${baseUrl}/solucoes/solar`,
        robots: 'index, follow',
        page: 'solar',
        jsonLd: jsonLd
    });
});

// Rota Projetos
router.get('/projetos', (req, res) => {
    res.render('projetos', {
        title: 'Projetos e Portfólio | Klyfe Electric',
        description: 'Conheça nosso portfólio de obras elétricas, automação e energia solar entregues na Paraíba.',
        canonical: `${baseUrl}/projetos`,
        page: 'projetos'
    });
});

// PROJETO: Avaliação Qualidade Instalações Elétricas HU
router.get('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu', (req, res) => {
    res.render('projeto-hu-cg', {
        title: 'Avaliação das Instalações Elétricas do HU em Campina Grande | Klyfe Electric',
        description: 'Projeto realizado pela Klyfe Electric no Hospital Universitário, em Campina Grande, com avaliação técnica das instalações elétricas, análise termográfica, aterramento e conformidade.',
        canonical: `${baseUrl}/projetos/avaliacao-qualidade-instalacoes-eletricas-hu`,
        page: 'projetos'
    });
});

// Rota Blog
router.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog e Artigos Técnicos | Klyfe Electric',
        description: 'Artigos sobre engenharia elétrica, automação residencial e industrial, energia solar e tecnologias.',
        canonical: `${baseUrl}/blog`,
        page: 'blog'
    });
});

// Rota Contato (GET)
router.get('/contato', (req, res) => {
    res.render('contato', {
        title: 'Contato e Orçamento | Klyfe Electric — (83) 99133-0972',
        description: 'Solicite seu orçamento. R. da Cerâmica, 34, Santa Rosa, Campina Grande/PB. (83) 99133-0972. Atende CG, JP e região.',
        canonical: `${baseUrl}/contato`,
        page: 'contato'
    });
});

// Rota Contato (POST) - Mock para logs
router.post('/contato', (req, res) => {
    console.log('=== Novo Contato Recebido ===');
    console.log(req.body);
    console.log('=============================');
    
    // Simula uma resposta de sucesso enviando para uma página de sucesso ou recarregando com mensagem
    // Por enquanto, enviamos um JSON de sucesso, assumindo que o frontend enviará via Fetch/AJAX.
    res.json({ success: true, message: 'Mensagem recebida com sucesso! Em breve entraremos em contato.' });
});

// Rota Sitemap XML
router.get('/sitemap.xml', (req, res) => {
    const urls = [
        '/', '/quem-somos', '/solucoes',
        '/solucoes/engenharia', '/solucoes/engenharia/laudos-eletricos', '/solucoes/engenharia/projeto-eletrico', '/solucoes/engenharia/aprovacao-energisa', '/solucoes/engenharia/subestacao-aerea', '/solucoes/engenharia/correcao-fator-potencia',
        '/solucoes/eletrica', '/solucoes/servicos-eletricos/montagem-carregador-veicular', '/solucoes/eletrica/projeto-rede-telefonia-antena', '/solucoes/eletrica/instalacoes-industriais',
        '/solucoes/automacao', '/solucoes/automacao/automacao-residencial', 
        '/solucoes/solar', '/projetos', '/blog', '/contato',
        '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu'
    ];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urls.forEach(url => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${url}</loc>\n`;
        sitemap += `    <changefreq>weekly</changefreq>\n`;
        let priority = '0.8';
        if (url === '/') priority = '1.0';
        if (url === '/solucoes') priority = '0.9';
        sitemap += `    <priority>${priority}</priority>\n`;
        sitemap += `  </url>\n`;
    });
    
    sitemap += `</urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Rota Robots.txt
router.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
});


module.exports = router;
