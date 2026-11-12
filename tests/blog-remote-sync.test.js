const test = require('node:test');
const assert = require('node:assert/strict');

const loader = require('../lib/blog-loader');
const syncModulePath = require.resolve('../lib/blog-remote-sync');
const originalFetch = global.fetch;
const originalCmsUrl = process.env.BLOG_CMS_URL;
const originalFallbackUrl = process.env.AGENTES_CRM_URL;

function loadFreshSyncModule() {
    delete require.cache[syncModulePath];
    return require('../lib/blog-remote-sync');
}

function clearRemoteData() {
    loader.setRemotePublishedPosts([]);
    loader.setRemoteRedirects([]);
}

test.after(() => {
    global.fetch = originalFetch;
    if (originalCmsUrl === undefined) delete process.env.BLOG_CMS_URL;
    else process.env.BLOG_CMS_URL = originalCmsUrl;
    if (originalFallbackUrl === undefined) delete process.env.AGENTES_CRM_URL;
    else process.env.AGENTES_CRM_URL = originalFallbackUrl;
    clearRemoteData();
});

test('CMS rápido atualiza posts e redirects e reutiliza a resposta fresca', async () => {
    process.env.BLOG_CMS_URL = 'https://cms.example.test';
    let requests = 0;
    global.fetch = async url => {
        requests += 1;
        assert.equal(url, 'https://cms.example.test/public/blog/posts');
        return {
            ok: true,
            json: async () => ({
                posts: [{ slug: 'remote-performance-fixture', status: 'published', title: 'CMS rápido' }],
                redirects: [{ fromPath: '/blog/artigo-antigo', toPath: '/blog/artigo-atual' }]
            })
        };
    };

    const { ensureBlogRemoteSynced } = loadFreshSyncModule();
    const first = await ensureBlogRemoteSynced();
    const second = await ensureBlogRemoteSynced();

    assert.equal(first.ok, true);
    assert.equal(second.cached, true);
    assert.equal(requests, 1);
    assert.equal(loader.getPublishedPosts().find(post => post.slug === 'remote-performance-fixture')?.title, 'CMS rápido');
    assert.equal(loader.getBlogRedirectBySlug('artigo-antigo')?.toPath, '/blog/artigo-atual');
    clearRemoteData();
});

test('CMS lento entra no ciclo de waitUntil sem atrasar a resposta chamadora', async () => {
    process.env.BLOG_CMS_URL = 'https://cms.example.test';
    global.fetch = async () => new Promise(resolve => {
        setTimeout(() => resolve({ ok: true, json: async () => ({ posts: [], redirects: [] }) }), 80);
    });

    const { scheduleBlogRemoteRefresh } = loadFreshSyncModule();
    const scheduled = [];
    const startedAt = Date.now();
    const refresh = scheduleBlogRemoteRefresh(promise => scheduled.push(promise));

    assert.ok(Date.now() - startedAt < 50, 'scheduling should return without waiting for the CMS');
    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0], refresh);
    assert.equal((await refresh).ok, true);
    clearRemoteData();
});

test('CMS indisponível registra resultado e limita tentativas repetidas', async () => {
    process.env.BLOG_CMS_URL = 'https://cms.example.test';
    let requests = 0;
    global.fetch = async () => {
        requests += 1;
        throw new Error('CMS offline fixture');
    };
    const originalWarn = console.warn;
    console.warn = () => undefined;

    try {
        const { ensureBlogRemoteSynced } = loadFreshSyncModule();
        const failed = await ensureBlogRemoteSynced();
        const cached = await ensureBlogRemoteSynced();
        assert.equal(failed.ok, false);
        assert.equal(failed.message, 'CMS offline fixture');
        assert.equal(cached.cached, true);
        assert.equal(requests, 1);
    } finally {
        console.warn = originalWarn;
    }
    clearRemoteData();
});

test('CMS sem configuração não tenta conexão e mantém o conteúdo local', async () => {
    delete process.env.BLOG_CMS_URL;
    delete process.env.AGENTES_CRM_URL;
    let requests = 0;
    global.fetch = async () => { requests += 1; throw new Error('não deveria conectar'); };

    const { ensureBlogRemoteSynced } = loadFreshSyncModule();
    const result = await ensureBlogRemoteSynced();

    assert.equal(result.skipped, true);
    assert.equal(requests, 0);
    assert.ok(loader.getPublishedPosts().length > 0);
});
