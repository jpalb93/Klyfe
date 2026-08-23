const { setRemotePublishedPosts } = require('./blog-loader');
let initialSyncPromise = Promise.resolve();

function resolveCmsUrl() {
    return String(
        process.env.BLOG_CMS_URL ||
        process.env.AGENTES_CRM_URL ||
        process.env.AGENTS_API_URL ||
        ''
    ).replace(/\/$/, '');
}

async function syncBlogFromCentral() {
    const baseUrl = resolveCmsUrl();
    if (!baseUrl) return { ok: false, skipped: true, message: 'BLOG_CMS_URL não configurada' };
    try {
        const response = await fetch(`${baseUrl}/public/blog/posts`, {
            headers: { 'User-Agent': 'Klyfe-Site-Blog/2.0', Accept: 'application/json' },
            signal: AbortSignal.timeout(3500)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        setRemotePublishedPosts(posts);
        console.log(`[blog-cms] ${posts.length} artigo(s) sincronizado(s) da Central`);
        return { ok: true, count: posts.length };
    } catch (error) {
        console.warn(`[blog-cms] Central indisponível; usando JSON local: ${error.message}`);
        return { ok: false, message: error.message };
    }
}

function startBlogRemoteSync() {
    if (!resolveCmsUrl()) return;
    initialSyncPromise = syncBlogFromCentral();
    const intervalMs = Math.max(30_000, Number(process.env.BLOG_CMS_SYNC_MS || 60_000));
    const timer = setInterval(() => void syncBlogFromCentral(), intervalMs);
    timer.unref?.();
}

function ensureBlogRemoteSynced() {
    return initialSyncPromise;
}

module.exports = { startBlogRemoteSync, syncBlogFromCentral, ensureBlogRemoteSynced };
