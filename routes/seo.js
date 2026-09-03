const express = require('express');
const router = express.Router();
const locations = require('../config/locations');
const solarCapture = require('../config/solar-capture');
const solarServices = require('../config/solar-services');
const { getPublishedPosts } = require('../lib/blog-loader');

const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ SITEMAP XML DINÂMICO ═══
router.get('/sitemap.xml', (req, res) => {
    const urls = [];
    const lastModifiedByPath = new Map();
    ['/energia-solar', '/energia-solar/campina-grande-pb', '/energia-solar/joao-pessoa-pb']
        .forEach(path => lastModifiedByPath.set(path, '2026-08-27'));
    const cities = Object.keys(locations);
    const statics = ['', '/solucoes', '/quem-somos', '/projetos', '/blog', '/contato', '/glossario'];
    const hubs = ['engenharia', 'eletrica', 'automacao']; // solar migrou para /energia-solar/
    const serviceKeys = Object.keys(locations.default.services);

    // 1. URLs Estáticas e Hubs para cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        statics.forEach(s => urls.push(`${prefix}${s}`));
        hubs.forEach(h => urls.push(`${prefix}/solucoes/${h}`));
    });

    // Página legal (sem prefixo de cidade)
    urls.push('/politica-de-privacidade');

    // 2. Projeto estático (sem prefixo de cidade)
    urls.push('/projetos/avaliacao-qualidade-instalacoes-eletricas-hu');

    // 2b. Hub Solar + segmentos + cidades + serviços comerciais
    urls.push('/energia-solar/');
    Object.values(solarCapture.segments).forEach(s => urls.push(s.urlPath));
    Object.values(solarCapture.cities).forEach(c => urls.push(c.urlPath));
    Object.values(solarServices).forEach(s => urls.push(s.urlPath));

    // Helper para verificar se serviço é habilitado para dada cidade
    function isServiceEnabled(cityKey, serviceKey) {
        const currentData = locations[cityKey];
        if (cityKey === 'default' || (currentData && currentData.allServices === true)) return true;
        return !!(currentData && currentData.services && currentData.services[serviceKey]);
    }

    // 3. URLs dinâmicas de serviços ativos em cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        serviceKeys.forEach(sKey => {
            const defaultSvc = locations.default.services[sKey];
            if (sKey === defaultSvc.category) return; // ignora hubs já adicionados
            if (defaultSvc.category === 'solar') return; // solar agora está em /energia-solar e /servicos

            if (isServiceEnabled(city, sKey)) {
                urls.push(`${prefix}/solucoes/${defaultSvc.category}/${sKey}`);
            }
        });
    });

    // 4. URLs dinâmicas dos posts do blog em cada cidade
    cities.forEach(city => {
        const prefix = city === 'default' ? '' : `/${city}`;
        getPublishedPosts().forEach(post => {
            const postPath = `${prefix}/blog/${post.slug}`;
            urls.push(postPath);
            const lastModified = post.dateModifiedIso || post.dateModified || post.datePublished || post.publishAt || post.dateIso;
            if (lastModified) lastModifiedByPath.set(postPath.replace(/\/$/, ''), String(lastModified).slice(0, 10));
        });
    });

    const uniqueUrls = [...new Set(urls)];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    uniqueUrls.forEach(url => {
        const formattedUrl = url === '' ? '/' : url.replace(/\/$/, '');
        const priority = formattedUrl === '/' || formattedUrl === '/energia-solar' ? '1.0' : (formattedUrl.startsWith('/energia-solar') || formattedUrl.startsWith('/servicos') ? '0.9' : '0.8');
        const lastmod = lastModifiedByPath.get(formattedUrl);
        sitemap += `  <url><loc>${baseUrl}${formattedUrl}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>${priority}</priority></url>\n`;
    });
    sitemap += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// ═══ ROBOTS.TXT DINÂMICO ═══
router.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /calculadora-solar
Disallow: /api/calculadora-solar/

# Explicit rules for AI Crawlers (Allow for AI Search Presence)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`);
});

module.exports = router;
