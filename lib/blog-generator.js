const topics = require('../config/blog-topics');
const { getExistingSlugs, savePost } = require('./blog-loader');
const { validatePost } = require('./blog-seo-validator');

const SYSTEM_PROMPT = `Você é redator técnico sênior da Klyfe Electric, empresa de engenharia elétrica, energia solar e automação industrial na Paraíba (Campina Grande e João Pessoa).

Escreva artigos técnicos robustos, precisos e otimizados para SEO em português brasileiro.

REGRAS OBRIGATÓRIAS:
- Mínimo 1.200 palavras no contentHtml
- Use placeholders EJS para geolocalização: <%- cityData.name %>, <%- cityData.region %>, <%- cityData.preposition %>, <%- cityData.concessionaria %>, <%- getHomePrefix() %>
- Inclua 2-4 links internos com href absolutos do site, ex: href="/energia-solar/"
- Cite normas quando relevante: NBR 5410, NBR 5419, NR-10, NR-12, Lei 14.300, ABNT
- Estruture com h2 e h3, parágrafos, listas ul/ol, blockquote e pelo menos 1 tabela quando fizer sentido
- Tom profissional de engenharia, sem promessas exageradas
- 3 a 5 FAQs objetivas para featured snippets
- slug em kebab-case sem acentos
- summary entre 120 e 155 caracteres
- readTime estimado (ex: "6 min")
- NÃO inclua markdown — apenas HTML no contentHtml
- affiliateProducts deve ser array vazio []
- affiliateDisclosure: false

Responda APENAS com JSON válido, sem markdown, sem texto antes ou depois.`;

function buildUserPrompt({ topic, category, existingSlugs }) {
    const cat = topics.categories[category];
    return `Crie um artigo de blog sobre: "${topic}"

Categoria: ${category} (${cat.label})
URL de serviço principal: ${cat.serviceUrl}

Slugs já existentes (NÃO repetir): ${existingSlugs.join(', ') || 'nenhum'}

Imagens hero disponíveis (escolha uma): ${topics.heroImages.join(', ')}

Retorne JSON com este schema exato:
{
  "slug": "string",
  "title": "string com <%- cityData.name %> se fizer sentido local",
  "category": "${category}",
  "categoryLabel": "${cat.label}",
  "summary": "string 120-155 chars",
  "metaTitle": "string opcional até 60 chars",
  "keywords": ["array", "de", "palavras-chave"],
  "readTime": "X min",
  "author": "Klyfe Electric",
  "heroImage": "/img/....webp",
  "contentHtml": "<p>HTML completo...</p>",
  "faq": [{ "question": "...", "answer": "..." }],
  "affiliateProducts": [],
  "affiliateDisclosure": false
}`;
}

async function callClaude({ topic, category }) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY não configurada. Defina no arquivo .env');
    }

    const existingSlugs = getExistingSlugs();
    const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model,
            max_tokens: 8192,
            system: SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: buildUserPrompt({ topic, category, existingSlugs })
            }]
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Erro na API Anthropic (${response.status}): ${err}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) throw new Error('Resposta vazia da API Anthropic');

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Não foi possível extrair JSON da resposta da IA');

    return JSON.parse(jsonMatch[0]);
}

function pickTopic(category) {
    const cat = topics.categories[category];
    if (!cat) throw new Error(`Categoria inválida: ${category}`);
    const index = Math.floor(Math.random() * cat.topics.length);
    return cat.topics[index];
}

function pickCategory(explicit) {
    if (explicit && topics.categories[explicit]) return explicit;
    const keys = Object.keys(topics.categories);
    return keys[Math.floor(Math.random() * keys.length)];
}

async function generatePost({ topic, category, publishAt, status = 'draft' } = {}) {
    const cat = pickCategory(category);
    const chosenTopic = topic || pickTopic(cat);

    console.log(`\n[Gerando] Categoria: ${cat} | Tema: ${chosenTopic}`);

    const raw = await callClaude({ topic: chosenTopic, category: cat });

    const post = {
        ...raw,
        status,
        publishAt: publishAt || new Date().toISOString().slice(0, 10),
        affiliateProducts: raw.affiliateProducts || [],
        affiliateDisclosure: raw.affiliateDisclosure || false,
        keywords: raw.keywords || []
    };

    const validation = validatePost(post);
    if (!validation.valid) {
        throw new Error(`Validação SEO falhou:\n${validation.errors.join('\n')}`);
    }

    if (validation.warnings.length) {
        console.warn('[Avisos SEO]', validation.warnings.join('; '));
    }

    const saved = savePost(post, status === 'published' ? 'published' : status === 'scheduled' ? 'scheduled' : 'drafts');
    console.log(`[Salvo] ${saved.filePath}`);

    return { post, ...saved, validation };
}

async function generateWeeklyBatch({ startDate } = {}) {
    const categories = ['solar', 'eletrica', 'automacao'];
    const results = [];
    const base = startDate ? new Date(startDate) : new Date();

    for (let i = 0; i < categories.length; i++) {
        const publishDate = new Date(base);
        publishDate.setDate(publishDate.getDate() + (i * 2));
        const publishAt = publishDate.toISOString().slice(0, 10);

        const result = await generatePost({
            category: categories[i],
            publishAt,
            status: 'scheduled'
        });
        results.push(result);
    }

    return results;
}

module.exports = {
    generatePost,
    generateWeeklyBatch,
    pickTopic,
    pickCategory
};
