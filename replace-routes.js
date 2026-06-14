const fs = require('fs');

let content = fs.readFileSync('./routes/index.js', 'utf8');

// 1. Engenharia
const engenhariaTarget = `// Rota Engenharia Elétrica
router.get('/solucoes/engenharia', (req, res) => {
    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "\${baseUrl}/solucoes/engenharia" }
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
    \`;

    res.render('engenharia', {
        title: 'Engenharia Elétrica em Campina Grande | Klyfe Electric',
        description: 'Projetos elétricos de alto nível, subestações, laudos NR-10 e consultoria técnica em Campina Grande e João Pessoa. Engenharia de precisão com ART.',
        canonical: \`\${baseUrl}/solucoes/engenharia\`,
        page: 'engenharia',
        jsonLd: jsonLd
    });
});`;

const engenhariaReplacement = `// Rota Engenharia Elétrica (SEO Power Page Hub)
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/engenharia', (req, res) => {
    const cityKey    = req.params.city || 'default';
    const cityBase   = locations[cityKey] || locations['default'];
    const cityData   = { ...cityBase, ...(cityBase.services?.['engenharia'] || {}) };

    const canonical = cityKey === 'default'
      ? \`\${baseUrl}/solucoes/engenharia\`
      : \`\${baseUrl}/\${cityKey}/solucoes/engenharia\`;

    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = \`\${baseUrl}/\${alternateCityKey}/solucoes/engenharia\`;

    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Engenharia Elétrica", "item": "\${canonical}" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Engenharia Elétrica",
      "name": "Engenharia Elétrica em \${cityData.name}",
      "description": "Projetos elétricos, laudos NR-10, subestações e consultoria técnica especializada em \${cityData.name} e \${cityData.region}. Engenharia de alta performance com ART.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "\${cityData.name}" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    \${cityData.faqExtra ? \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "\${cityData.faqExtra.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "\${cityData.faqExtra.answer}"
          }
        }
      ]
    }
    </script>\` : ''}
    \`;

    res.render('engenharia', {
        title: \`Engenharia Elétrica em \${cityData.name} | Projetos e Subestações - Klyfe Electric\`,
        description: \`Projetos elétricos de alto nível, subestações e consultoria técnica em \${cityData.name} e \${cityData.region}. Engenharia de precisão com ART.\`,
        canonical: canonical,
        page: 'engenharia',
        cityData, cityKey, alternateCityName, alternateUrl,
        jsonLd: jsonLd
    });
});`;


// 2. Eletrica
const eletricaTarget = `// Rota Hub Serviços Elétricos (SEO Power Page)

router.get('/solucoes/eletrica', (req, res) => {
    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Serviços Elétricos", "item": "\${baseUrl}/solucoes/eletrica" }
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
    \`;

    res.render('eletrica', {
        title: 'Serviços Elétricos e Eletricista em Campina Grande | Klyfe Electric',
        description: 'Serviços de eletricista em Campina Grande: manutenção, reparos, instalações residenciais e comerciais. Tomadas, luminárias, ventiladores e chuveiros.',
        canonical: \`\${baseUrl}/solucoes/eletrica\`,
        robots: 'index, follow',
        page: 'eletrica',
        jsonLd: jsonLd
    });
});`;

const eletricaReplacement = `// Rota Hub Serviços Elétricos (SEO Power Page Hub)
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/eletrica', (req, res) => {
    const cityKey    = req.params.city || 'default';
    const cityBase   = locations[cityKey] || locations['default'];
    const cityData   = { ...cityBase, ...(cityBase.services?.['eletrica'] || {}) };

    const canonical = cityKey === 'default'
      ? \`\${baseUrl}/solucoes/eletrica\`
      : \`\${baseUrl}/\${cityKey}/solucoes/eletrica\`;

    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = \`\${baseUrl}/\${alternateCityKey}/solucoes/eletrica\`;

    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Serviços Elétricos", "item": "\${canonical}" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Serviços Elétricos",
      "name": "Eletricista Profissional em \${cityData.name}",
      "description": "Serviços completos de eletricista em \${cityData.name}: manutenção, reparos, instalações residenciais e comerciais com garantia técnica.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "\${cityData.name}" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    \${cityData.faqExtra ? \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "\${cityData.faqExtra.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "\${cityData.faqExtra.answer}"
          }
        }
      ]
    }
    </script>\` : ''}
    \`;

    res.render('eletrica', {
        title: \`Serviços Elétricos e Eletricista em \${cityData.name} | Klyfe Electric\`,
        description: \`Serviços de eletricista em \${cityData.name} e \${cityData.region}: manutenção, reparos, instalações residenciais e empresariais de alto padrão.\`,
        canonical: canonical,
        robots: 'index, follow',
        page: 'eletrica',
        cityData, cityKey, alternateCityName, alternateUrl,
        jsonLd: jsonLd
    });
});`;

// 3. Automacao
const automacaoTarget = `// Rota Hub Automação (SEO Power Page)
router.get('/solucoes/automacao', (req, res) => {
    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Automação", "item": "\${baseUrl}/solucoes/automacao" }
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
    \`;

    res.render('automacao', {
        title: 'Automação Residencial e Industrial em Campina Grande | Klyfe Electric',
        description: 'Especialista em Automação Residencial (Smart Home) e Industrial em Campina Grande e João Pessoa. Controle iluminação, segurança e processos fabris.',
        canonical: \`\${baseUrl}/solucoes/automacao\`,
        robots: 'index, follow',
        page: 'automacao',
        jsonLd: jsonLd
    });
});`;

const automacaoReplacement = `// Rota Hub Automação (SEO Power Page Hub)
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/automacao', (req, res) => {
    const cityKey    = req.params.city || 'default';
    const cityBase   = locations[cityKey] || locations['default'];
    const cityData   = { ...cityBase, ...(cityBase.services?.['automacao'] || {}) };

    const canonical = cityKey === 'default'
      ? \`\${baseUrl}/solucoes/automacao\`
      : \`\${baseUrl}/\${cityKey}/solucoes/automacao\`;

    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = \`\${baseUrl}/\${alternateCityKey}/solucoes/automacao\`;

    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Automação", "item": "\${canonical}" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Automação Residencial e Industrial",
      "name": "Automação em \${cityData.name}",
      "description": "Soluções completas de automação smart home e industrial na \${cityData.region}. Tecnologia para conforto, segurança e eficiência.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "\${cityData.name}" },
        { "@type": "State", "name": "Paraíba" }
      ]
    }
    </script>
    \${cityData.faqExtra ? \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "\${cityData.faqExtra.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "\${cityData.faqExtra.answer}"
          }
        }
      ]
    }
    </script>\` : ''}
    \`;

    res.render('automacao', {
        title: \`Automação Residencial e Industrial em \${cityData.name} | Klyfe Electric\`,
        description: \`Especialista em Automação Residencial (Smart Home) e Industrial em \${cityData.name}. Controle iluminação, segurança e processos fabris.\`,
        canonical: canonical,
        robots: 'index, follow',
        page: 'automacao',
        cityData, cityKey, alternateCityName, alternateUrl,
        jsonLd: jsonLd
    });
});`;

// 4. Solar
const solarTarget = `// Rota Energia Solar (SEO Power Page)
router.get('/solucoes/solar', (req, res) => {
    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Energia Solar", "item": "\${baseUrl}/solucoes/solar" }
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
    \`;

    res.render('solar', {
        title: 'Energia Solar em Campina Grande e João Pessoa | Klyfe Electric',
        description: 'Instalação de painéis solares fotovoltaicos em Campina Grande e João Pessoa. On-grid, off-grid e híbrido. Economize até 95%. (83) 99133-0972',
        canonical: \`\${baseUrl}/solucoes/solar\`,
        robots: 'index, follow',
        page: 'solar',
        jsonLd: jsonLd
    });
});`;

const solarReplacement = `// Rota Energia Solar (SEO Power Page Hub)
router.get('/:city(campina-grande|joao-pessoa)?/solucoes/solar', (req, res) => {
    const cityKey    = req.params.city || 'default';
    const cityBase   = locations[cityKey] || locations['default'];
    const cityData   = { ...cityBase, ...(cityBase.services?.['solar'] || {}) };

    const canonical = cityKey === 'default'
      ? \`\${baseUrl}/solucoes/solar\`
      : \`\${baseUrl}/\${cityKey}/solucoes/solar\`;

    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = \`\${baseUrl}/\${alternateCityKey}/solucoes/solar\`;

    const jsonLd = \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "\${baseUrl}/" },
        { "@type": "ListItem", "position": 2, "name": "Soluções", "item": "\${baseUrl}/solucoes" },
        { "@type": "ListItem", "position": 3, "name": "Energia Solar", "item": "\${canonical}" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Energia Solar Fotovoltaica",
      "name": "Instalação de Energia Solar em \${cityData.name}",
      "description": "Sistemas solares fotovoltaicos on-grid, off-grid e híbridos para residências, comércios e indústrias em \${cityData.name}. Economia de até 95% na conta de luz.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Klyfe Electric"
      },
      "areaServed": [
        { "@type": "City", "name": "\${cityData.name}" },
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
        }\${cityData.faqExtra ? \`,
        {
          "@type": "Question",
          "name": "\${cityData.faqExtra.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "\${cityData.faqExtra.answer}"
          }
        }\` : ''}
      ]
    }
    </script>
    \`;

    res.render('solar', {
        title: \`Energia Solar em \${cityData.name} e Região | Klyfe Electric\`,
        description: \`Instalação de painéis solares fotovoltaicos em \${cityData.name} e \${cityData.region}. Economize até 95% na conta de energia. Solicite orçamento!\`,
        canonical: canonical,
        robots: 'index, follow',
        page: 'solar',
        cityData, cityKey, alternateCityName, alternateUrl,
        jsonLd: jsonLd
    });
});`;

// 5. Sitemap
const sitemapTarget = `    const urls = [
        '/', '/quem-somos', '/solucoes',
        '/solucoes/engenharia', '/solucoes/engenharia/laudos-eletricos',
        '/campina-grande/solucoes/engenharia/laudos-eletricos',
        '/joao-pessoa/solucoes/engenharia/laudos-eletricos',
        '/solucoes/engenharia/projeto-eletrico', '/solucoes/engenharia/aprovacao-energisa', '/solucoes/engenharia/subestacao-aerea', '/solucoes/engenharia/correcao-fator-potencia',
        '/solucoes/eletrica', '/solucoes/servicos-eletricos/montagem-carregador-veicular', '/solucoes/eletrica/projeto-rede-telefonia-antena', '/solucoes/eletrica/instalacoes-industriais',
        '/solucoes/automacao', '/solucoes/automacao/automacao-residencial', 
        '/solucoes/solar', '/projetos', '/blog', '/contato',
        '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu'
    ];`;

const sitemapReplacement = `    const urls = [
        '/', '/quem-somos', '/solucoes',
        '/solucoes/engenharia', '/campina-grande/solucoes/engenharia', '/joao-pessoa/solucoes/engenharia',
        '/solucoes/engenharia/laudos-eletricos', '/campina-grande/solucoes/engenharia/laudos-eletricos', '/joao-pessoa/solucoes/engenharia/laudos-eletricos',
        '/solucoes/engenharia/projeto-eletrico', '/solucoes/engenharia/aprovacao-energisa', '/solucoes/engenharia/subestacao-aerea', '/solucoes/engenharia/correcao-fator-potencia',
        '/solucoes/eletrica', '/campina-grande/solucoes/eletrica', '/joao-pessoa/solucoes/eletrica',
        '/solucoes/servicos-eletricos/montagem-carregador-veicular', '/solucoes/eletrica/projeto-rede-telefonia-antena', '/solucoes/eletrica/instalacoes-industriais',
        '/solucoes/automacao', '/campina-grande/solucoes/automacao', '/joao-pessoa/solucoes/automacao',
        '/solucoes/automacao/automacao-residencial', 
        '/solucoes/solar', '/campina-grande/solucoes/solar', '/joao-pessoa/solucoes/solar',
        '/projetos', '/blog', '/contato',
        '/projetos/avaliacao-qualidade-instalacoes-eletricas-hu'
    ];`;


if (content.includes(engenhariaTarget)) {
    content = content.replace(engenhariaTarget, engenhariaReplacement);
    console.log('Engenharia replaced!');
} else {
    console.log('Engenharia Target NOT FOUND');
}

if (content.includes(eletricaTarget)) {
    content = content.replace(eletricaTarget, eletricaReplacement);
    console.log('Eletrica replaced!');
} else {
    console.log('Eletrica Target NOT FOUND');
}

if (content.includes(automacaoTarget)) {
    content = content.replace(automacaoTarget, automacaoReplacement);
    console.log('Automacao replaced!');
} else {
    console.log('Automacao Target NOT FOUND');
}

if (content.includes(solarTarget)) {
    content = content.replace(solarTarget, solarReplacement);
    console.log('Solar replaced!');
} else {
    console.log('Solar Target NOT FOUND');
}

if (content.includes(sitemapTarget)) {
    content = content.replace(sitemapTarget, sitemapReplacement);
    console.log('Sitemap replaced!');
} else {
    console.log('Sitemap Target NOT FOUND');
}

fs.writeFileSync('./routes/index.js', content, 'utf8');
console.log('File written.');
