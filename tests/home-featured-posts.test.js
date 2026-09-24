const assert = require('node:assert/strict');
const { getHomeFeaturedPosts, getPublishedPosts } = require('../lib/blog-loader');
const featured = getHomeFeaturedPosts();

assert.deepEqual(featured.map(post => post.slug), [
    'o-que-e-subestacao-de-energia',
    'wallbox-em-condominio',
    'clp-vs-reles-paineis',
    'inspecao-manutencao-spda',
    'energia-solar-vale-a-pena-no-nordeste'
]);
assert.equal(new Set(featured.map(post => post.homeTopic)).size, 5);
assert.ok(getPublishedPosts().length > featured.length);
console.log('home-featured-posts.test.js: OK');
