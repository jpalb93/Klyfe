const fs = require('fs');
const path = require('path');

const POSTS_ROOT = path.join(process.cwd(), 'content', 'posts');
const DIRS = {
    published: path.join(POSTS_ROOT, 'published'),
    scheduled: path.join(POSTS_ROOT, 'scheduled'),
    drafts: path.join(POSTS_ROOT, 'drafts')
};

const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

let remotePublishedPosts = [];
let remoteRedirects = [];

function setRemotePublishedPosts(posts) {
    remotePublishedPosts = Array.isArray(posts)
        ? posts.map(post => normalizePost({ ...post, _folder: 'remote', source: post.source || 'central-cms' }))
        : [];
}

function setRemoteRedirects(redirects) {
    remoteRedirects = Array.isArray(redirects)
        ? redirects.filter(item => item && /^\/blog\/[a-z0-9-]+\/?$/i.test(item.fromPath || '') && /^\/blog\/[a-z0-9-]+\/?$/i.test(item.toPath || ''))
        : [];
}

function getBlogRedirectBySlug(slug) {
    const fromPath = `/blog/${String(slug || '').replace(/^\/+|\/+$/g, '')}`;
    return remoteRedirects.find(item => item.fromPath.replace(/\/$/, '') === fromPath) || null;
}

function ensureDirs() {
    Object.values(DIRS).forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
}

function formatDatePtBR(isoDate) {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-').map(Number);
    return `${String(day).padStart(2, '0')} de ${MONTHS_PT[month - 1]} de ${year}`;
}

function readPostsFromDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .map(filename => {
            const filePath = path.join(dir, filename);
            const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return {
                ...raw,
                _filename: filename,
                _filePath: filePath,
                _folder: path.basename(dir)
            };
        });
}

function isVisible(post, now = new Date()) {
    const today = now.toISOString().slice(0, 10);
    if (post.status === 'published' || (!post.status && post._folder === 'published')) return true;
    if (post.status === 'scheduled' && post.publishAt && post.publishAt <= today) return true;
    return false;
}

function normalizePost(post) {
    const publishAt = post.publishAt || post.dateIso || '2026-01-01';
    const status = post.status || (post._folder === 'published' ? 'published' : 'draft');
    return {
        affiliateDisclosure: false,
        affiliateProducts: [],
        keywords: [],
        ...post,
        status,
        publishAt,
        date: post.date || formatDatePtBR(publishAt),
        dateIso: publishAt
    };
}

function sortPosts(posts) {
    return posts.sort((a, b) => (b.publishAt || '').localeCompare(a.publishAt || ''));
}

function getPublishedPosts(now = new Date()) {
    ensureDirs();
    const all = [
        ...readPostsFromDir(DIRS.published),
        ...readPostsFromDir(DIRS.scheduled)
    ].map(normalizePost).filter(p => isVisible(p, now));
    // A Central é a fonte editorial principal. JSONs locais continuam como fallback
    // e acervo legado; quando o slug coincide, a versão remota prevalece.
    const merged = new Map(all.map(post => [post.slug, post]));
    remotePublishedPosts.filter(post => isVisible(post, now)).forEach(post => merged.set(post.slug, post));
    return sortPosts([...merged.values()]);
}

function getAllPosts() {
    ensureDirs();
    const all = [
        ...readPostsFromDir(DIRS.published),
        ...readPostsFromDir(DIRS.scheduled),
        ...readPostsFromDir(DIRS.drafts)
    ].map(normalizePost);
    return sortPosts(all);
}

function getPostBySlug(slug) {
    return getPublishedPosts().find(p => p.slug === slug) || null;
}

function getExistingSlugs() {
    return getAllPosts().map(p => p.slug);
}

function savePost(post, folder = 'drafts') {
    ensureDirs();
    const dir = DIRS[folder];
    if (!dir) throw new Error(`Pasta inválida: ${folder}`);

    const filename = `${post.publishAt || new Date().toISOString().slice(0, 10)}-${post.slug}.json`;
    const filePath = path.join(dir, filename);
    const { _filename, _filePath, _folder, ...clean } = post;
    fs.writeFileSync(filePath, JSON.stringify(clean, null, 2), 'utf8');
    return { filePath, filename };
}

function movePost(filename, fromFolder, toFolder) {
    const from = path.join(DIRS[fromFolder], filename);
    const to = path.join(DIRS[toFolder], filename);
    if (!fs.existsSync(from)) throw new Error(`Arquivo não encontrado: ${from}`);
    fs.renameSync(from, to);
    return to;
}

function deletePost(filename, folder) {
    const filePath = path.join(DIRS[folder], filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

module.exports = {
    DIRS,
    ensureDirs,
    formatDatePtBR,
    getPublishedPosts,
    getAllPosts,
    getPostBySlug,
    getExistingSlugs,
    savePost,
    movePost,
    deletePost,
    readPostsFromDir,
    setRemotePublishedPosts,
    setRemoteRedirects,
    getBlogRedirectBySlug
};
