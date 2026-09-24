const assert = require('node:assert/strict');
const { getContentManifest, validateContentManifest } = require('../lib/content-manifest');
const pages = getContentManifest();

assert.equal(validateContentManifest().valid, true);
assert.equal(pages.length, 6);
assert.ok(pages.every(page => page.homeEligible === false));
console.log('content-manifest.test.js: OK');
