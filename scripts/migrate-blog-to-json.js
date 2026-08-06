/**
 * Migra posts de config/blog.js para content/posts/published/*.json
 * Uso: node scripts/migrate-blog-to-json.js
 */
require('dotenv').config();
const path = require('path');
const legacyPosts = require('../config/blog.legacy');
const { savePost, ensureDirs, getExistingSlugs } = require('../lib/blog-loader');

const DATE_MAP = {
    '15 de Maio de 2026': '2026-05-15',
    '28 de Abril de 2026': '2026-04-28',
    '02 de Junho de 2026': '2026-06-02',
    '20 de Maio de 2026': '2026-05-20',
    '10 de Março de 2026': '2026-03-10',
    '05 de Junho de 2026': '2026-06-05'
};

const SLUG_DATE_MAP = {
    'quanto-custa-energia-solar-2026': '2026-05-15',
    'nr10-laudo-eletrico-empresa': '2026-04-28',
    'automacao-industrial-nordeste': '2026-06-02',
    'payback-painel-solar-simulacao': '2026-05-20',
    'spda-para-raios-obrigatorio': '2026-03-10',
    'clp-vs-reles-paineis': '2026-06-05'
};

function migrate() {
    ensureDirs();
    const existing = getExistingSlugs();
    let count = 0;

    legacyPosts.forEach(post => {
        if (existing.includes(post.slug)) {
            console.log(`[Pular] ${post.slug} já existe`);
            return;
        }

        const publishAt = DATE_MAP[post.date] || SLUG_DATE_MAP[post.slug] || '2026-06-01';
        const jsonPost = {
            slug: post.slug,
            status: 'published',
            publishAt,
            title: post.title.trim(),
            category: post.category,
            categoryLabel: post.categoryLabel,
            summary: post.summary,
            readTime: post.readTime,
            author: post.author,
            heroImage: post.heroImage,
            contentHtml: post.contentHtml.trim(),
            faq: post.faq,
            keywords: [],
            affiliateProducts: [],
            affiliateDisclosure: false
        };

        const { filePath } = savePost(jsonPost, 'published');
        console.log(`[Migrado] ${post.slug} → ${path.basename(filePath)}`);
        count++;
    });

    console.log(`\nMigração concluída: ${count} post(s) criado(s).`);
}

migrate();
