const spda = require('./spda-guides');
const substation = require('./substation-guides');
const canonicalSlugs = new Set([...spda, ...substation].map(guide => guide.slug));

// Artigos sem conteúdo municipal distinto compartilham a URL editorial raiz.
module.exports = { isCanonicalGuide: slug => canonicalSlugs.has(slug) };
