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
    const evaluated = {
        ...post,
        title: ejs.render(post.title, locals),
        summary: ejs.render(post.summary, locals),
        contentHtml: ejs.render(post.contentHtml, locals)
    };

    if (post.faq) {
        evaluated.faq = post.faq.map(item => ({
            question: ejs.render(item.question, locals),
            answer: ejs.render(item.answer, locals)
        }));
    }

    if (post.metaTitle) {
        evaluated.metaTitle = ejs.render(post.metaTitle, locals);
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
