const { setRemotePublishedPosts, setRemoteRedirects } = require('./blog-loader');
const DEFAULT_SYNC_INTERVAL_MS = 60_000;
let lastSyncAttemptAt = 0;
let syncInFlight = null;

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
        setRemoteRedirects(data.redirects);
        console.log(`[blog-cms] ${posts.length} artigo(s) sincronizado(s) da Central`);
        return { ok: true, count: posts.length };
    } catch (error) {
        console.warn(`[blog-cms] Central indisponível; usando JSON local: ${error.message}`);
        return { ok: false, message: error.message };
    }
}

function getSyncIntervalMs() {
    const configured = Number(process.env.BLOG_CMS_SYNC_MS || DEFAULT_SYNC_INTERVAL_MS);
    return Number.isFinite(configured) ? Math.max(30_000, configured) : DEFAULT_SYNC_INTERVAL_MS;
}

function refreshBlogFromCentral() {
    if (syncInFlight) return syncInFlight;
    syncInFlight = syncBlogFromCentral()
        .finally(() => {
            lastSyncAttemptAt = Date.now();
            syncInFlight = null;
        });
    return syncInFlight;
}

function ensureBlogRemoteSynced() {
    if (!resolveCmsUrl()) {
        return Promise.resolve({ ok: false, skipped: true, message: 'BLOG_CMS_URL não configurada' });
    }
    if (syncInFlight) return syncInFlight;
    if (lastSyncAttemptAt && Date.now() - lastSyncAttemptAt < getSyncIntervalMs()) {
        return Promise.resolve({ ok: true, cached: true });
    }
    return refreshBlogFromCentral();
}

function scheduleBlogRemoteRefresh(waitUntil) {
    const refresh = ensureBlogRemoteSynced().catch(error => {
        console.warn(`[blog-cms] Falha inesperada ao atualizar o acervo: ${error.message}`);
        return { ok: false, message: error.message };
    });

    if (typeof waitUntil === 'function') {
        try {
            waitUntil(refresh);
        } catch (error) {
            // Local dev and runtimes outside Vercel have no request lifecycle helper.
            // The caller still starts the work and may continue serving the local cache.
            console.warn(`[blog-cms] waitUntil indisponível nesta requisição: ${error.message}`);
        }
    }
    return refresh;
}

function startBlogRemoteSync() {
    // Kept as a compatibility entry point for local callers. Serverless requests
    // should schedule refreshes through scheduleBlogRemoteRefresh() instead of a timer.
    return ensureBlogRemoteSynced();
}

module.exports = {
    startBlogRemoteSync,
    syncBlogFromCentral,
    ensureBlogRemoteSynced,
    scheduleBlogRemoteRefresh
};
