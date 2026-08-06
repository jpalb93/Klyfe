#!/usr/bin/env node
/**
 * Gera post(s) de blog via Claude API.
 *
 * Uso:
 *   node scripts/generate-blog-post.js
 *   node scripts/generate-blog-post.js --category solar
 *   node scripts/generate-blog-post.js --topic "tarifa Fio B 2026"
 *   node scripts/generate-blog-post.js --weekly
 *   node scripts/generate-blog-post.js --publish
 */
require('dotenv').config();

const { generatePost, generateWeeklyBatch } = require('../lib/blog-generator');

function parseArgs(argv) {
    const args = { weekly: false, publish: false, schedule: false };
    for (let i = 2; i < argv.length; i++) {
        if (argv[i] === '--weekly') args.weekly = true;
        else if (argv[i] === '--publish') args.publish = true;
        else if (argv[i] === '--schedule') args.schedule = true;
        else if (argv[i] === '--category' && argv[i + 1]) { args.category = argv[++i]; }
        else if (argv[i] === '--topic' && argv[i + 1]) { args.topic = argv[++i]; }
        else if (argv[i] === '--date' && argv[i + 1]) { args.publishAt = argv[++i]; }
    }
    return args;
}

async function main() {
    const args = parseArgs(process.argv);

    if (!process.env.ANTHROPIC_API_KEY) {
        console.error('Erro: defina ANTHROPIC_API_KEY no arquivo .env');
        console.error('Copie .env.example para .env e preencha a chave.');
        process.exit(1);
    }

    try {
        if (args.weekly) {
            const results = await generateWeeklyBatch({ startDate: args.publishAt });
            console.log(`\n✓ Lote semanal gerado: ${results.length} posts em content/posts/scheduled/`);
            results.forEach(r => console.log(`  - ${r.post.slug}`));
            return;
        }

        const status = args.publish ? 'published' : args.schedule ? 'scheduled' : 'draft';
        const result = await generatePost({
            topic: args.topic,
            category: args.category,
            publishAt: args.publishAt,
            status
        });

        console.log(`\n✓ Post gerado: ${result.post.slug}`);
        console.log(`  Título: ${result.post.title}`);
        console.log(`  Arquivo: ${result.filename}`);
        if (result.validation.warnings.length) {
            console.log(`  Avisos: ${result.validation.warnings.join('; ')}`);
        }
    } catch (err) {
        console.error('\n✗ Erro:', err.message);
        process.exit(1);
    }
}

main();
