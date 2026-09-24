const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const partial = fs.readFileSync(path.join(__dirname, '..', 'views', 'lp', '_tracking.ejs'), 'utf8');
const tracking = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'tracking.js'), 'utf8');

assert.match(partial, /contentVertical/);
assert.match(partial, /serviceKey/);
assert.match(partial, /locationName/);
assert.match(tracking, /function trackingContext\(\)/);
assert.match(tracking, /content_vertical/);
assert.doesNotMatch(tracking, /enhanced_conversion_data\s*:/);

console.log('tracking-governance.test.js: OK');
