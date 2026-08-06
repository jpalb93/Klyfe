const fs = require('fs');
const path = require('path');
const { getExistingSlugs } = require('./blog-loader');

function validatePost(post, options = {}) {
    const errors = [];
    const warnings = [];
    const slugs = options.existingSlugs || getExistingSlugs().filter(s => s !== post.slug);

    if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
        errors.push('Slug inválido (use kebab-case sem acentos).');
    }
    if (slugs.includes(post.slug)) {
        errors.push(`Slug duplicado: "${post.slug}".`);
    }
    if (!post.title || post.title.length < 20) {
        errors.push('Título muito curto (mínimo 20 caracteres).');
    }
    if (!post.summary || post.summary.length < 80) {
        warnings.push('Summary curto (recomendado 120–155 caracteres).');
    }
    if (post.summary && post.summary.length > 170) {
        warnings.push('Summary longo (recomendado máximo 155 caracteres).');
    }
    if (!post.contentHtml || post.contentHtml.length < 500) {
        errors.push('Conteúdo HTML muito curto.');
    }
    if (!post.faq || post.faq.length < 2) {
        warnings.push('Menos de 2 FAQs (recomendado para rich results).');
    }
    if (!post.heroImage) {
        errors.push('heroImage é obrigatório.');
    } else {
        const imgPath = path.join(process.cwd(), 'public', post.heroImage.replace(/^\//, ''));
        if (!fs.existsSync(imgPath)) {
            warnings.push(`Imagem não encontrada: ${post.heroImage}`);
        }
    }

    const internalLinks = (post.contentHtml || '').match(/href="[^"]*\/solucoes\//g) || [];
    if (internalLinks.length < 1) {
        warnings.push('Nenhum link interno para /solucoes/ detectado.');
    }

    const validCategories = ['solar', 'eletrica', 'automacao', 'engenharia'];
    if (!validCategories.includes(post.category)) {
        errors.push(`Categoria inválida. Use: ${validCategories.join(', ')}`);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

module.exports = { validatePost };
