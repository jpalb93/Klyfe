const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const locations = require('../config/locations');
const business = require('../config/business');
const { getPublishedPosts, getPostBySlug, getBlogRedirectBySlug } = require('../lib/blog-loader');
const { evaluatePosts, evaluatePost, buildLocals } = require('../lib/blog-evaluator');
const { PHONE_DEFAULT, PHONE_SOLAR, resolveTrackingContext } = require('../lib/site-tracking');

const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ BLOG LISTING ═══
router.get('/:city(campina-grande|joao-pessoa)?/blog', (req, res) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const search = String(req.query.q || '').trim().slice(0, 100);
    const category = String(req.query.categoria || '').trim().toLowerCase();
    const page = Math.max(1, Number.parseInt(String(req.query.pagina || '1'), 10) || 1);
    const pageSize = 12;
    const normalized = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const allPosts = evaluatePosts(getPublishedPosts(), cityKey, cityBase);
    const filtered = allPosts.filter(post => !category || post.category === category).filter(post => !search || normalized(`${post.title} ${post.summary} ${(post.tags || []).join(' ')}`).includes(normalized(search)));
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const evaluatedPosts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const categories = [...new Map(allPosts.map(post => [post.category, { slug: post.category, label: post.categoryLabel }])).values()];

    res.render('blog', {
        title: `Blog Técnico | Klyfe Electric — ${cityBase.name}`,
        description: `Artigos técnicos e guias sobre engenharia elétrica, segurança e energia solar ${cityBase.preposition} ${cityBase.name}. Mantenha-se informado with nossos especialistas.`,
        canonical: cityKey === 'default' ? `${baseUrl}/blog` : `${baseUrl}/${cityKey}/blog`,
        cityKey,
        cityData: cityBase,
        page: 'blog',
        posts: evaluatedPosts,
        categories,
        filters: { search, category, page: currentPage, totalPages, total: filtered.length },
        robots: search || category || currentPage > 1 ? 'noindex, follow' : 'index, follow'
    });
});

// ═══ RSS FEED ═══
router.get('/blog/rss.xml', (req, res) => {
    const escapeXml = value => String(value || '').replace(/[<>&"']/g, char => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;' }[char]));
    const items = getPublishedPosts().slice(0, 50).map(post => {
        const url = `${baseUrl}/blog/${post.slug}`;
        const date = new Date(post.dateIso || post.publishAt || Date.now()).toUTCString();
        return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${date}</pubDate><description>${escapeXml(post.summary)}</description></item>`;
    }).join('');
    res.type('application/rss+xml').set('Cache-Control','public, max-age=300, stale-while-revalidate=3600').send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Técnico Klyfe Electric</title><link>${baseUrl}/blog</link><description>Engenharia elétrica, automação e energia solar.</description><language>pt-BR</language>${items}</channel></rss>`);
});

// ═══ BLOG EVENT TRACKING API ═══
router.post('/api/blog-events', async (req, res) => {
    const postId = String(req.body?.postId || '');
    const event = String(req.body?.event || '');
    if (!/^[a-f0-9-]{36}$/i.test(postId) || !['view','cta','share'].includes(event)) return res.status(400).json({ error: 'Evento inválido' });
    const cmsUrl = String(process.env.BLOG_CMS_URL || '').replace(/\/$/, '');
    if (!cmsUrl) return res.status(202).json({ accepted: false });
    try {
        const response = await fetch(`${cmsUrl}/public/blog/events`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ postId, event }), signal:AbortSignal.timeout(2500) });
        return res.status(response.ok ? 202 : 502).json({ accepted: response.ok });
    } catch { return res.status(202).json({ accepted: false }); }
});

// ═══ BLOG POST DETAIL ═══
router.get('/:city(campina-grande|joao-pessoa)?/blog/:postSlug', (req, res, next) => {
    const cityKey = req.params.city || 'default';
    const cityBase = locations[cityKey] || locations['default'];
    const postSlug = req.params.postSlug;
    
    const post = getPostBySlug(postSlug);
    if (!post) {
        const redirect = getBlogRedirectBySlug(postSlug);
        if (redirect) {
            const cityPrefix = cityKey !== 'default' ? `/${cityKey}` : '';
            return res.redirect(301, `${cityPrefix}${redirect.toPath}`);
        }
        return next();
    }

    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    const isCanonicalGuide = require('../config/editorial-guides').isCanonicalGuide(postSlug);
    const canonical = `${baseUrl}${isCanonicalGuide ? '' : homePrefix}/blog/${postSlug}`;
    
    const alternateCityKey  = cityKey === 'joao-pessoa' ? 'campina-grande' : 'joao-pessoa';
    const alternateCityName = cityKey === 'joao-pessoa' ? 'Campina Grande' : 'João Pessoa';
    const alternateUrl      = `${baseUrl}${alternateCityKey !== 'default' ? '/' + alternateCityKey : ''}/blog/${postSlug}`;

    const locals = buildLocals(cityKey, cityBase);
    const evaluatedPost = evaluatePost(post, locals);
    const allPosts = getPublishedPosts();

    const recommended = allPosts
        .filter(p => p.slug !== postSlug)
        .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
        .slice(0, 3)
        .map(p => ({
            ...p,
            title: ejs.render(p.title, locals),
            summary: ejs.render(p.summary, locals)
        }));

    const dateIso = post.dateIso || post.publishAt || '2026-06-06';
    const structuredImage = evaluatedPost.heroImage || '/img/hero-klyfe.webp';
    const structuredImageUrl = /^https?:\/\//i.test(structuredImage) ? structuredImage : `${baseUrl}${structuredImage}`;
    const authorImage = evaluatedPost.authorAvatar
        ? (/^https?:\/\//i.test(evaluatedPost.authorAvatar) ? evaluatedPost.authorAvatar : `${baseUrl}${evaluatedPost.authorAvatar}`)
        : null;
    const structuredAuthor = {
        "@type": evaluatedPost.authorType === 'Organization' ? 'Organization' : 'Person',
        ...(evaluatedPost.authorType === 'Organization' ? { "@id": `${baseUrl}/#localbusiness`, "url": baseUrl } : {}),
        "name": evaluatedPost.author || 'Equipe Técnica Klyfe Electric',
        ...(evaluatedPost.authorRole ? { "jobTitle": evaluatedPost.authorRole } : {}),
        ...(evaluatedPost.authorBio ? { "description": evaluatedPost.authorBio } : {}),
        ...(authorImage ? { "image": authorImage } : {}),
        ...(evaluatedPost.authorType === 'Organization' ? {} : { "worksFor": { "@type": "Organization", "name": business.name, "url": baseUrl } })
    };

    // FAQs permanecem visíveis no artigo, mas não são marcadas como FAQPage:
    // o site é comercial e esse rich result não deve ser emitido por padrão.
    let schemaJson = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "@id": `${canonical}#blogposting`,
                "isPartOf": {
                    "@type": "WebPage",
                    "@id": canonical
                },
                "headline": evaluatedPost.title,
                "description": evaluatedPost.summary,
                "keywords": (evaluatedPost.keywords || []).join(', '),
                "image": structuredImageUrl,
                "datePublished": evaluatedPost.datePublished || `${dateIso}T08:00:00Z`,
                "dateModified": evaluatedPost.dateModifiedIso || `${evaluatedPost.dateModified || dateIso}T08:00:00Z`,
                "author": structuredAuthor,
                "publisher": {
                    "@type": "Organization",
                    "name": business.name,
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.klyfeelectric.com.br/img/Assinatura%20Completa%20-%20AmareloB%20-%20Klyfe.webp"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonical
                },
                ...(evaluatedPost.sources && evaluatedPost.sources.length ? {
                    "citation": evaluatedPost.sources.filter(source => /^https:\/\//i.test(source.url || '')).map(source => source.url)
                } : {}),
                ...(evaluatedPost.technicalReviewedAt ? {
                    "reviewedBy": { "@type": "Organization", "name": business.name }
                } : {})
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${canonical}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Início", "item": `${baseUrl}/` },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}${homePrefix}/blog` },
                    { "@type": "ListItem", "position": 3, "name": evaluatedPost.title, "item": canonical }
                ]
            }
        ]
    };

    const jsonLd = `
    <script type="application/ld+json">
    ${JSON.stringify(schemaJson)}
    </script>
    `;

    const isWallbox = /wallbox|carregador-veicular/i.test(postSlug);
    let trackingExtras = {};

    if (evaluatedPost.whatsappMessage) {
        const postCategory = isWallbox ? 'wallbox' : (post.category || 'geral');
        const postPhone = postCategory === 'solar' ? PHONE_SOLAR : PHONE_DEFAULT;
        trackingExtras = resolveTrackingContext(req.path, {
            contentCategory: postCategory,
            waPhone: postPhone,
            waMsg: evaluatedPost.whatsappMessage
        });
    } else {
        const solarish = /solar|fotovolta|painel|inversor|homologacao/i.test(postSlug + ' ' + (post.category || '') + ' ' + (post.title || ''));
        if (solarish) {
            trackingExtras = resolveTrackingContext('/energia-solar/', { contentCategory: 'solar' });
        }
    }

    const blogImgBase = evaluatedPost.heroImage ? evaluatedPost.heroImage.replace(/\.webp$/, '') : '';
    const preloadImagesrcset = evaluatedPost.heroImage
        ? `${blogImgBase}-480.webp 480w, ${blogImgBase}-720.webp 720w, ${evaluatedPost.heroImage} 1024w`
        : undefined;

    res.render('blog-post', {
        title: evaluatedPost.metaTitle || `${evaluatedPost.title} | Klyfe Electric`,
        description: evaluatedPost.metaDescription || evaluatedPost.summary,
        canonical,
        cityKey,
        cityData: cityBase,
        post: evaluatedPost,
        preloadImage: evaluatedPost.heroImage,
        preloadImagesrcset,
        preloadImagesizes: '(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1200px) 50vw, 560px',
        recommendedPosts: recommended,
        alternateCityName,
        alternateUrl,
        page: 'blog',
        jsonLd,
        keywords: evaluatedPost.keywords || [],
        ogTitle: evaluatedPost.ogTitle || evaluatedPost.metaTitle || evaluatedPost.title,
        ogDescription: evaluatedPost.ogDescription || evaluatedPost.metaDescription || evaluatedPost.summary,
        image: evaluatedPost.ogImage || evaluatedPost.heroImage,
        robots: evaluatedPost.robots || 'index, follow',
        ogType: 'article',
        articlePublishedTime: evaluatedPost.datePublished || `${dateIso}T08:00:00Z`,
        articleModifiedTime: evaluatedPost.dateModifiedIso || `${evaluatedPost.dateModified || dateIso}T08:00:00Z`,
        articleAuthor: evaluatedPost.author || 'Equipe Técnica Klyfe Electric',
        articleSection: evaluatedPost.categoryLabel,
        articleTags: evaluatedPost.tags || [],
        ...trackingExtras
    });
});

module.exports = router;
