const express = require('express');
const locations = require('../config/locations');
const { getPublishedPosts } = require('../lib/blog-loader');
const { evaluatePost, evaluatePosts, buildLocals } = require('../lib/blog-evaluator');

const router = express.Router();
const baseUrl = 'https://www.klyfeelectric.com.br';

router.get('/preview/blog/:postId', async (req, res, next) => {
    const postId = String(req.params.postId || '');
    const exp = String(req.query.exp || '');
    const sig = String(req.query.sig || '');
    if (!/^[a-f0-9-]{36}$/i.test(postId) || !/^\d{10}$/.test(exp) || !/^[a-f0-9]{64}$/i.test(sig)) {
        return res.status(401).send('Preview inválido. Gere um novo link pela Central da Klyfe.');
    }
    const cmsUrl = String(process.env.BLOG_CMS_URL || '').replace(/\/$/, '');
    if (!cmsUrl) return res.status(503).send('Preview indisponível: BLOG_CMS_URL não configurada.');

    try {
        const response = await fetch(`${cmsUrl}/public/blog/preview/${encodeURIComponent(postId)}?exp=${exp}&sig=${sig}`, {
            headers: { accept: 'application/json' },
            signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) return res.status(response.status === 401 ? 401 : 502).send('Preview expirado ou indisponível. Gere um novo link pela Central.');
        const body = await response.json();
        const rawPost = body && body.post;
        if (!rawPost) return res.status(404).send('Artigo não encontrado.');

        const cityKey = 'default';
        const cityBase = locations.default;
        const post = evaluatePost(rawPost, buildLocals(cityKey, cityBase));
        const recommendedPosts = evaluatePosts(getPublishedPosts().filter(item => item.slug !== post.slug).slice(0, 3), cityKey, cityBase);
        const canonical = `${baseUrl}/blog/${post.slug}`;
        const image = post.ogImage || post.heroImage || '/img/hero-klyfe.webp';
        const imageUrl = String(image).startsWith('http') ? image : `${baseUrl}${image}`;
        const dateIso = post.dateIso || new Date().toISOString().slice(0, 10);
        const schemaJson = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.summary,
            image: imageUrl,
            datePublished: `${dateIso}T08:00:00Z`,
            dateModified: `${post.dateModified || dateIso}T08:00:00Z`,
            author: { '@type': 'Person', name: post.author || 'Klyfe Electric' },
            publisher: { '@type': 'Organization', name: 'Klyfe Electric' },
            mainEntityOfPage: canonical,
            ...(post.sources && post.sources.length ? { citation: post.sources.filter(source => /^https:\/\//i.test(source.url || '')).map(source => source.url) } : {}),
            ...(post.technicalReviewedAt ? { reviewedBy: { '@type': 'Organization', name: 'Klyfe Electric, Engenharia' } } : {})
        };

        res.setHeader('Cache-Control', 'private, no-store, max-age=0');
        res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
        res.render('blog-post', {
            title: `[PREVIEW] ${post.metaTitle || post.title}`,
            description: post.metaDescription || post.summary,
            canonical,
            cityKey,
            cityData: cityBase,
            post,
            recommendedPosts,
            alternateCityName: 'João Pessoa',
            alternateUrl: canonical,
            page: 'blog',
            jsonLd: `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>`,
            keywords: post.keywords || [],
            ogTitle: post.ogTitle || post.title,
            ogDescription: post.ogDescription || post.summary,
            image,
            robots: 'noindex, nofollow, noarchive',
            previewMode: true
        });
    } catch (error) {
        if (error && (error.name === 'AbortError' || error.name === 'TimeoutError')) return res.status(504).send('A Central demorou para responder. Tente novamente.');
        next(error);
    }
});

module.exports = router;
