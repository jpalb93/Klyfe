const baseUrl = 'https://www.klyfeelectric.com.br';

function buildBlogPostJsonLd({ canonical, evaluatedPost, dateIso }) {
    const graph = [
        {
            '@type': 'BlogPosting',
            '@id': `${canonical}#blogposting`,
            isPartOf: { '@type': 'WebPage', '@id': canonical },
            headline: evaluatedPost.title,
            description: evaluatedPost.summary,
            image: `${baseUrl}${evaluatedPost.heroImage}`,
            datePublished: `${dateIso}T08:00:00Z`,
            dateModified: `${dateIso}T08:00:00Z`,
            author: { '@type': 'Person', name: evaluatedPost.author },
            publisher: {
                '@type': 'Organization',
                name: 'Klyfe Electric',
                logo: {
                    '@type': 'ImageObject',
                    url: `${baseUrl}/img/Assinatura%20Completa%20-%20AmareloB%20-%20Klyfe.webp`
                }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
        }
    ];

    if (evaluatedPost.keywords?.length) {
        graph[0].keywords = evaluatedPost.keywords.join(', ');
    }

    if (evaluatedPost.faq?.length) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${canonical}#faq`,
            mainEntity: evaluatedPost.faq.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer }
            }))
        });
    }

    if (evaluatedPost.affiliateProducts?.length) {
        evaluatedPost.affiliateProducts.forEach((product, i) => {
            graph.push({
                '@type': 'Product',
                '@id': `${canonical}#product-${i + 1}`,
                name: product.name,
                description: product.description || '',
                image: product.image?.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
                offers: {
                    '@type': 'Offer',
                    url: product.affiliateUrl,
                    priceCurrency: 'BRL',
                    availability: 'https://schema.org/InStock'
                }
            });
        });
    }

    return graph;
}

function buildJsonLdScript(graph) {
    return `
    <script type="application/ld+json">
    ${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
    </script>
    `;
}

module.exports = {
    buildBlogPostJsonLd,
    buildJsonLdScript
};
