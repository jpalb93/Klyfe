const assert = require('node:assert/strict');
const { buildServiceContentRecord, validateContentRecord } = require('../lib/content-governance');
const record = buildServiceContentRecord({
    serviceKey: 'spda',
    service: { category: 'engenharia', label: 'SPDA', whatsIncluded: ['Projeto'] },
    cityKey: 'campina-grande',
    cityData: { name: 'Campina Grande' },
    canonical: 'https://www.klyfeelectric.com.br/solucoes/engenharia/spda'
});
assert.equal(validateContentRecord(record).valid, true);
assert.equal(record.homeEligible, false);
assert.deepEqual(record.operationalScope.includes, ['Projeto']);
const invalid = { ...record, claims: ['claim sem revisão'] };
assert.equal(validateContentRecord(invalid).valid, false);
assert.match(validateContentRecord(invalid).errors.join(' '), /claims require validation/);
console.log('content-governance.test.js: OK');
