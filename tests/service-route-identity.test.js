const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'routes', 'services.js'), 'utf8');

assert.match(source, /req\.params\.category !== defaultSvc\.category/);
assert.match(source, /'@type': 'Service'/);
assert.match(source, /'@type': 'BreadcrumbList'/);
assert.match(source, /provider: \{ '@id': `\$\{baseUrl\}\/\#localbusiness` \}/);
console.log('service-route-identity.test.js: OK');
