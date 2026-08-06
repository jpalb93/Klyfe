const express = require('express');
const router = express.Router();
const blogLoader = require('../lib/blog-loader');
const { generatePost, generateWeeklyBatch } = require('../lib/blog-generator');
const { validatePost } = require('../lib/blog-seo-validator');

function requireAdmin(req, res, next) {
    const token = req.headers['x-admin-token']
        || req.body?.adminToken
        || req.query?.token;

    const expected = process.env.ADMIN_TOKEN;
    if (!expected) {
        return res.status(503).json({
            error: 'ADMIN_TOKEN não configurado no servidor. Defina no .env'
        });
    }
    if (token !== expected) {
        return res.status(401).json({ error: 'Token de administrador inválido' });
    }
    next();
}

router.get('/blog', (req, res) => {
    res.render('admin/blog', {
        title: 'Admin Blog | Klyfe Electric',
        robots: 'noindex, nofollow'
    });
});

router.get('/blog/api/posts', requireAdmin, (req, res) => {
    const posts = blogLoader.getAllPosts().map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        status: p.status,
        publishAt: p.publishAt,
        filename: p._filename,
        folder: p._folder
    }));
    res.json({ posts });
});

router.post('/blog/api/generate', requireAdmin, async (req, res) => {
    try {
        const { mode = 'single', category, topic, publishAt } = req.body;

        if (mode === 'weekly') {
            const results = await generateWeeklyBatch({ startDate: publishAt });
            return res.json({
                success: true,
                message: `${results.length} posts agendados gerados`,
                posts: results.map(r => ({ slug: r.post.slug, filename: r.filename, folder: 'scheduled' }))
            });
        }

        const status = req.body.status || 'draft';
        const result = await generatePost({ topic, category, publishAt, status });
        res.json({
            success: true,
            message: 'Post gerado com sucesso',
            post: {
                slug: result.post.slug,
                title: result.post.title,
                filename: result.filename,
                folder: status === 'published' ? 'published' : status === 'scheduled' ? 'scheduled' : 'drafts',
                warnings: result.validation.warnings
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/blog/api/publish', requireAdmin, (req, res) => {
    try {
        const { filename, folder = 'drafts' } = req.body;
        if (!filename) return res.status(400).json({ error: 'filename obrigatório' });

        const filePath = blogLoader.movePost(filename, folder, 'published');
        const post = JSON.parse(require('fs').readFileSync(filePath, 'utf8'));
        post.status = 'published';
        if (!post.publishAt) post.publishAt = new Date().toISOString().slice(0, 10);
        require('fs').writeFileSync(filePath, JSON.stringify(post, null, 2));

        res.json({ success: true, message: `Publicado: ${post.slug}` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/blog/api/schedule', requireAdmin, (req, res) => {
    try {
        const { filename, folder = 'drafts', publishAt } = req.body;
        if (!filename || !publishAt) {
            return res.status(400).json({ error: 'filename e publishAt obrigatórios' });
        }

        const targetFolder = folder === 'scheduled' ? 'scheduled' : 'scheduled';
        const fromFolder = folder;
        const filePath = blogLoader.movePost(filename, fromFolder, targetFolder);
        const post = JSON.parse(require('fs').readFileSync(filePath, 'utf8'));
        post.status = 'scheduled';
        post.publishAt = publishAt;
        require('fs').writeFileSync(filePath, JSON.stringify(post, null, 2));

        res.json({ success: true, message: `Agendado: ${post.slug} para ${publishAt}` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/blog/api/validate', requireAdmin, (req, res) => {
    const result = validatePost(req.body);
    res.json(result);
});

module.exports = router;
