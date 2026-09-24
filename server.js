const express = require('express');
const path = require('path');
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const locations = require('./config/locations'); // Carregado uma única vez (Eficiência)
const business = require('./config/business');
const { resolveTrackingContext } = require('./lib/site-tracking');
const { createAnalyticsRouter, createPageContext } = require('./lib/site-analytics');
const { startBlogRemoteSync, ensureBlogRemoteSynced } = require('./lib/blog-remote-sync');

function safeOrigin(value) {
    try { return new URL(value).origin; } catch { return null; }
}
const centralOrigin = safeOrigin(process.env.CENTRAL_APP_ORIGIN || 'http://localhost:5173');
const blogCmsOrigin = safeOrigin(process.env.BLOG_CMS_URL || '');

const app = express();
startBlogRemoteSync();

// ═══ SEGURANÇA (Helmet) ═══
// Configuração básica para proteger headers e mitigar ataques comuns
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "https://cdnjs.cloudflare.com",
                "https://www.googletagmanager.com",
                "https://www.google-analytics.com",
                "https://www.googleadservices.com",
                "https://googleads.g.doubleclick.net",
                "https://connect.facebook.net",
                "https://*.facebook.net",
            ],
            // Helmet default é 'none' e bloqueia onclick= inline do banner de cookies
            scriptSrcAttr: ["'unsafe-inline'", "'unsafe-hashes'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: [
                "'self'",
                "data:",
                "https://www.klyfeelectric.com.br",
                "https://wa.me",
                "https://www.facebook.com",
                "https://*.facebook.com",
                "https://*.facebook.net",
                "https://*.fbcdn.net",
                "https://www.google-analytics.com",
                "https://www.googletagmanager.com",
                "https://googleads.g.doubleclick.net",
                "https://www.google.com",
                "https://*.public.blob.vercel-storage.com",
                ...(blogCmsOrigin ? [blogCmsOrigin] : []),
            ],
            connectSrc: [
                "'self'",
                "https://www.google-analytics.com",
                "https://analytics.google.com",
                "https://www.googletagmanager.com",
                "https://www.facebook.com",
                "https://*.facebook.com",
                "https://connect.facebook.net",
                "https://*.facebook.net",
                "https://*.fbcdn.net",
                "https://googleads.g.doubleclick.net",
            ],
            frameSrc: [
                "'self'",
                "https://www.googletagmanager.com",
                "https://www.facebook.com",
                "https://*.facebook.com",
                "https://maps.google.com",
                "https://www.google.com",
            ],
            frameAncestors: ["'self'", ...(centralOrigin ? [centralOrigin] : [])],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false,
    // CSP frame-ancestors restringe a incorporação à Central; X-Frame-Options
    // SAMEORIGIN impediria o preview autenticado entre os dois subdomínios.
    xFrameOptions: false
}));

// Header Permissions-Policy para controlar acesso a recursos do navegador
app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
});

// Em uma instância serverless recém-iniciada, garante que blog/home/sitemap
// aguardem a primeira leitura da Central antes de renderizar o acervo.
app.use(async (req, _res, next) => {
    if (req.path === '/' || req.path === '/sitemap.xml' || (req.path.includes('/blog') && req.path !== '/api/blog-events')) {
        await ensureBlogRemoteSynced().catch(() => undefined);
    }
    next();
});

// ═══ PERFORMANCE (Gzip Compression) ═══
// Comprime as respostas para acelerar o carregamento (LCP)
app.use(compression());

// ═══ PROTEÇÃO CONTRA SPAM (Rate Limit) ═══
// Limita requisições para evitar abusos (DoS/Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
    message: 'Muitas requisições vindas deste IP, tente novamente mais tarde.'
});
app.use('/contato', limiter); // Aplica apenas na rota de contato para não afetar navegação
app.use('/api/tracking', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Muitas requisições de tracking deste IP.'
}));

// Configurações do Express e EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Servir arquivos estáticos com cache explícito. CSS/JS revalidam diariamente;
// fontes e imagens, que mudam com menos frequência, ficam em cache por 30 dias.
const staticFiles = express.static(path.join(process.cwd(), 'public'), {
    etag: true,
    setHeaders: (res, filePath) => {
        if (/\.(?:woff2?|webp|avif|png|jpe?g|svg|ico)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=604800');
        } else if (/\.(?:css|js)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
    }
});
// /robots.txt é gerado pela rota SEO abaixo; impedir que o arquivo legado
// estático intercepte a requisição mantém uma única política publicada.
app.use((req, res, next) => req.path === '/robots.txt' ? next() : staticFiles(req, res, next));

// Middleware para processar dados de formulário
app.use(['/api/telemetry', '/api/site-analytics'], createAnalyticsRouter());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para globais de visualização
app.use((req, res, next) => {
    res.locals.cityKey = 'default';
    res.locals.siteAnalyticsContext = (canonical, robots) => res.statusCode < 400 ? createPageContext(req, canonical, robots) : '';
    res.locals.cityData = locations['default'];
    res.locals.business = business;
    res.locals.page = '';
    res.locals.theme = null;
    const pixelViaGtm =
        process.env.META_PIXEL_VIA_GTM === '1' ||
        process.env.META_PIXEL_VIA_GTM === 'true';
    const gtmId = process.env.GTM_ID || '';
    // Evita Pixel hard-coded + Pixel no GTM ao mesmo tempo.
    // META_PIXEL_VIA_GTM=true → só GTM injeta o Pixel.
    res.locals.tracking = {
        gtmId,
        metaPixelId: process.env.META_PIXEL_ID || '',
        googleAdsId: process.env.GOOGLE_ADS_ID || '',
        googleAdsConversionLabel: process.env.GOOGLE_ADS_CONVERSION_LABEL || '',
        pixelViaGtm: pixelViaGtm && !!gtmId,
        capiEnabled: !!(process.env.META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN)
    };

    // Pixel/WA context by route (solar vs engenharia vs geral…)
    const ctx = resolveTrackingContext(req.path);
    res.locals.contentCategory = ctx.contentCategory;
    res.locals.fireViewContent = ctx.fireViewContent;
    res.locals.contentName = req.path || '/';
    res.locals.waPhone = ctx.waPhone;
    res.locals.waMsg = ctx.waMsg;
    res.locals.waUrl = ctx.waUrl;
    next();
});

// Importar rotas
const indexRouter = require('./routes/index');
const adminBlogRouter = require('./routes/admin-blog');
const blogPreviewRouter = require('./routes/blog-preview');
app.use('/', indexRouter);
// Depois do router principal para herdar os helpers/locais de cidade usados
// pelo mesmo template blog-post.ejs, mas antes do fallback 404 global.
app.use('/', blogPreviewRouter);
app.use('/admin', adminBlogRouter);

// ═══ TRATAMENTO DE ERROS (Fallback 404) ═══
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página Não Encontrada | Klyfe Electric',
        description: 'A página que você está procurando não existe.',
        canonical: 'https://www.klyfeelectric.com.br/404',
        page: '404'
    });
});

// ═══ TRATAMENTO GLOBAL DE ERROS (500) ═══
// Evita que erros técnicos vazem para o usuário final
app.use((err, req, res, next) => {
    console.error(' [ERRO CRÍTICO]:', err.stack);
    res.status(500).render('404', { // Reusando o template 404 para simplicidade ou pode criar um 500.ejs
        title: 'Erro Interno | Klyfe Electric',
        description: 'Ocorreu um erro técnico inesperado. Nossa equipe já foi notificada.',
        canonical: 'https://www.klyfeelectric.com.br/',
        page: '500'
    });
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n [SISTEMA]: Servidor Klyfe Electric Protegido e Otimizado`);
    console.log(` [PORTA]: ${PORT}`);
    console.log(` [URL]: http://localhost:${PORT}\n`);
});

module.exports = app;
