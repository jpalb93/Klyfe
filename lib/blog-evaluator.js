const ejs = require('ejs');

function buildLocals(cityKey, cityBase) {
    const homePrefix = cityKey !== 'default' ? '/' + cityKey : '';
    return {
        cityKey,
        cityData: cityBase,
        getHomePrefix: () => homePrefix
    };
}

function evaluatePost(post, locals) {
    const render = post.source === 'central-cms'
        ? (value) => String(value || '')
            .replaceAll('{{city_name}}', locals.cityData.name)
            .replaceAll('{{city_region}}', locals.cityData.region || 'PB')
            .replaceAll('{{home_prefix}}', locals.getHomePrefix())
        : (value) => ejs.render(String(value || ''), locals);
    let combinedContentHtml = `${post.contentHtml || ''}${post.contentAppendHtml || ''}${(post.contentAppendBlocks || []).join('')}`;
    (post.contentReplacements || []).forEach(replacement => {
        combinedContentHtml = combinedContentHtml.replace(String(replacement.from || ''), String(replacement.to || ''));
    });

    const evaluated = {
        ...post,
        title: render(post.title),
        summary: render(post.summary),
        contentHtml: render(combinedContentHtml)
    };

    if (post.faq) {
        evaluated.faq = post.faq.map(item => ({
            question: render(item.question),
            answer: render(item.answer)
        }));
    }

    if (post.metaTitle) {
        evaluated.metaTitle = render(post.metaTitle);
    }

    if (post.metaDescription) {
        evaluated.metaDescription = render(post.metaDescription);
    }

    return evaluated;
}

function evaluatePosts(posts, cityKey, cityBase) {
    const locals = buildLocals(cityKey, cityBase);
    return posts.map(post => {
        const partial = evaluatePost(post, locals);
        return {
            ...post,
            title: partial.title,
            summary: partial.summary
        };
    });
}

module.exports = {
    buildLocals,
    evaluatePost,
    evaluatePosts
};
