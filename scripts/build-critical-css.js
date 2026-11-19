'use strict';

/*
 * CSS crítico da home (primeira tela).
 *
 * Lê as classes e ids que existem no HTML da primeira tela (menu, hero, faixa
 * de confiança, scroll-spy, botão do WhatsApp) direto dos partials e separa do
 * bundle home.css só as regras cujos seletores usam essas classes. O resultado
 * vai inline no <head> (views/partials/generated/home-critical-css.ejs) e o
 * home.css completo passa a carregar sem bloquear a renderização.
 *
 * Roda dentro de `npm run build:css`; não precisa de navegador nem dependência.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const viewsDir = path.join(rootDir, 'views');

// Partials que desenham a primeira tela da home.
const ABOVE_FOLD_SOURCES = [
    'index.ejs',
    'partials/navbar.ejs',
    'partials/home/hero.ejs',
    'partials/home/trust-counter.ejs',
    'partials/whatsapp.ejs'
];

// Classes de estado aplicadas por JS (main.js, whatsapp-picker.js, tracking.js).
const STATE_CLASSES = [
    'active', 'open', 'visible', 'scrolled', 'menu-open', 'no-scroll', 'is-open',
    'is-hidden', 'is-suppressed', 'is-active', 'navbar-pill', 'fade-in'
];

const THEME = 'solar-warm';

function collectTokens() {
    const classes = new Set(STATE_CLASSES);
    const ids = new Set();
    for (const rel of ABOVE_FOLD_SOURCES) {
        const src = fs.readFileSync(path.join(viewsDir, rel), 'utf8');
        for (const m of src.matchAll(/\bclass="([^"]*)"/g)) {
            for (const word of m[1].match(/[A-Za-z_][\w-]*/g) || []) classes.add(word);
        }
        for (const m of src.matchAll(/\bid="([A-Za-z_][\w-]*)"/g)) ids.add(m[1]);
    }
    return { classes, ids };
}

/* ── Parser mínimo de CSS: regras, at-rules com bloco e statements ───────── */
function parse(css) {
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    let i = 0;

    function readBlock() {
        // posição logo após '{'; devolve o conteúdo até o '}' correspondente
        let depth = 1;
        const start = i;
        let quote = null;
        while (i < css.length) {
            const ch = css[i];
            if (quote) {
                if (ch === '\\') { i += 2; continue; }
                if (ch === quote) quote = null;
            } else if (ch === '"' || ch === "'") {
                quote = ch;
            } else if (ch === '{') {
                depth++;
            } else if (ch === '}') {
                depth--;
                if (depth === 0) { const body = css.slice(start, i); i++; return body; }
            }
            i++;
        }
        throw new Error('CSS com bloco não fechado');
    }

    function parseList() {
        const nodes = [];
        while (i < css.length) {
            // ler prelúdio até '{', ';' ou '}'
            let start = i;
            let quote = null;
            let paren = 0;
            while (i < css.length) {
                const ch = css[i];
                if (quote) {
                    if (ch === '\\') { i += 2; continue; }
                    if (ch === quote) quote = null;
                } else if (ch === '"' || ch === "'") quote = ch;
                else if (ch === '(') paren++;
                else if (ch === ')') paren--;
                else if (paren === 0 && (ch === '{' || ch === ';' || ch === '}')) break;
                i++;
            }
            const prelude = css.slice(start, i).trim();
            const ch = css[i];
            if (ch === undefined) break;
            if (ch === ';') { i++; if (prelude) nodes.push({ type: 'statement', text: prelude }); continue; }
            if (ch === '}') { i++; break; } // fim do bloco pai (não usado no topo)
            i++; // '{'
            if (/^@(media|supports|layer|container)\b/i.test(prelude)) {
                const body = readBlock();
                const inner = parse(body); // parse recursivo do corpo
                nodes.push({ type: 'group', prelude, children: inner });
            } else {
                const body = readBlock();
                if (prelude.startsWith('@')) nodes.push({ type: 'at', prelude, body });
                else nodes.push({ type: 'rule', prelude, body });
            }
        }
        return nodes;
    }

    return parseList();
}

/* ── Seletores ───────────────────────────────────────────────────────────── */
function splitTopLevel(str, sep) {
    const out = [];
    let depth = 0, quote = null, last = 0;
    for (let k = 0; k < str.length; k++) {
        const ch = str[k];
        if (quote) { if (ch === quote) quote = null; continue; }
        if (ch === '"' || ch === "'") quote = ch;
        else if (ch === '(' || ch === '[') depth++;
        else if (ch === ')' || ch === ']') depth--;
        else if (ch === sep && depth === 0) { out.push(str.slice(last, k)); last = k + 1; }
    }
    out.push(str.slice(last));
    return out.map(s => s.trim()).filter(Boolean);
}

function makeMatcher({ classes, ids }) {
    function tokensOk(sel) {
        const classTokens = sel.match(/\.(-?[A-Za-z_][\w-]*)/g) || [];
        const idTokens = sel.match(/#(-?[A-Za-z_][\w-]*)/g) || [];
        return classTokens.every(t => classes.has(t.slice(1))) && idTokens.every(t => ids.has(t.slice(1)));
    }

    function selectorOk(sel) {
        // tema de outra paleta: fora
        const themes = [...sel.matchAll(/\[data-theme=["']?([\w-]+)["']?\]/g)].map(m => m[1]);
        if (themes.some(t => t !== THEME)) return false;

        let s = sel.replace(/\[[^\]]*\]/g, '');        // atributos (não são classes)
        s = s.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ''); // :not(.x) não exige .x

        // :is()/:where()/:has(): basta uma alternativa válida
        let ok = true;
        s = s.replace(/:(is|where|has|matches)\(((?:[^()]|\([^()]*\))*)\)/g, (_, _fn, args) => {
            if (!splitTopLevel(args, ',').some(tokensOk)) ok = false;
            return '';
        });
        if (!ok) return false;
        return tokensOk(s);
    }

    return function filterSelectorList(prelude) {
        const kept = splitTopLevel(prelude, ',').filter(selectorOk);
        return kept.length ? kept.join(',') : null;
    };
}

function minifyDecls(body) {
    return body.replace(/\s+/g, ' ').replace(/\s*([:;,{}>])\s*/g, '$1').replace(/;$/, '').trim();
}

function extract(nodes, filterSelectorList, usedNames) {
    const out = [];
    for (const node of nodes) {
        if (node.type === 'rule') {
            const sel = filterSelectorList(node.prelude);
            if (!sel) continue;
            const decls = minifyDecls(node.body);
            if (!decls) continue;
            for (const m of decls.matchAll(/animation(?:-name)?:([^;]+)/g)) {
                for (const w of m[1].split(/[\s,]+/)) usedNames.add(w);
            }
            out.push(`${sel.replace(/\s+/g, ' ')}{${decls}}`);
        } else if (node.type === 'group') {
            const inner = extract(node.children, filterSelectorList, usedNames);
            if (inner.length) out.push(`${node.prelude.replace(/\s+/g, ' ')}{${inner.join('')}}`);
        } else if (node.type === 'at') {
            if (/^@font-face/i.test(node.prelude)) out.push(`@font-face{${minifyDecls(node.body)}}`);
            else if (/^@(-webkit-)?keyframes/i.test(node.prelude)) out.push({ keyframes: node });
        }
    }
    return out;
}

function buildCritical(fullCss) {
    const tokens = collectTokens();
    const usedNames = new Set();
    const parts = extract(parse(fullCss), makeMatcher(tokens), usedNames);
    return parts
        .map(p => {
            if (typeof p === 'string') return p;
            const name = p.keyframes.prelude.split(/\s+/)[1];
            if (!usedNames.has(name)) return '';
            return `${p.keyframes.prelude}{${p.keyframes.body.replace(/\s+/g, ' ').trim()}}`;
        })
        .join('');
}

function writeCritical(cssDir) {
    const full = fs.readFileSync(path.join(cssDir, 'home.css'), 'utf8');
    // Enquanto o home.css não chega, o que fica abaixo da dobra não é desenhado
    // nem medido: sem estilo, as imagens alargariam a página no celular.
    // head.ejs marca <html class="home-css-pending"> via script e tira a marca
    // quando a folha carrega (sem JS, nada fica escondido).
    const gate = 'html.home-css-pending main>section:not(#hero):not(.trust-counter-bar),'
        + 'html.home-css-pending body>section,html.home-css-pending .main-footer'
        + '{display:none}';
    const critical = buildCritical(full) + gate;
    if (/<\/style/i.test(critical) || /<%|%>/.test(critical)) {
        throw new Error('CSS crítico contém sequência proibida no <style> inline');
    }
    const outDir = path.join(viewsDir, 'partials', 'generated');
    fs.mkdirSync(outDir, { recursive: true });
    const header = '<%# Gerado por scripts/build-critical-css.js (npm run build:css). Não editar. %>\n';
    fs.writeFileSync(path.join(outDir, 'home-critical-css.ejs'), `${header}<style id="home-critical-css">${critical}</style>\n`, 'utf8');
    return Buffer.byteLength(critical);
}

module.exports = { buildCritical, writeCritical, parse };
