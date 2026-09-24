const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const seoSource = fs.readFileSync(path.join(__dirname, '..', 'routes', 'seo.js'), 'utf8');

assert.match(seoSource, /getBlogRedirectBySlug\(post\.slug\)/);
assert.match(seoSource, /const formattedUrl = url === '' \? '\/' : url/);
console.log('sitemap-policy.test.js: OK');
