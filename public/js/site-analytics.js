/* Klyfe Site Telemetry: anonymous, cookieless, in-memory page metrics; no personal data, no visitor profiling. */
(function () {
    'use strict';
    try {
        var params = new URLSearchParams(location.search);
        if (params.get('klyfe_internal') === '1') {
            localStorage.setItem('klyfe_internal_ignore', '1');
            console.info('[Klyfe Telemetria] Modo interno ativado: este dispositivo não enviará métricas.');
        } else if (params.get('klyfe_internal') === '0') {
            localStorage.removeItem('klyfe_internal_ignore');
            console.info('[Klyfe Telemetria] Modo interno desativado: medições reativadas.');
        }
    } catch (_) {}

    try {
        if (localStorage.getItem('klyfe_internal_ignore') === '1') return;
    } catch (_) {}

    if (navigator.webdriver) return;

    var script = document.querySelector('script[data-site-analytics-context]');
    if (!script || !script.dataset.siteAnalyticsContext || !window.crypto || !crypto.randomUUID) return;
    var context = script.dataset.siteAnalyticsContext;
    var snapshot = null, active = false, lastActivity = Date.now(), lastTick = Date.now(), dirty = false, inFlight = false, pending = false;
    var elements = new Map(), observer = null, counters = {}, lastClicks = new Map(), lcp = 0;

    function trackableForm(el) {
        return el && el.closest && el.closest('#contact-form, #lp-solar-form, #lp-solar-fazendas-form, #lp-solar-biz-form, #lp-solar-residencial-form, #lead-form, #wallbox-brief-form, [data-site-form]');
    }

    function start() {
        if (active) return;
        active = true;
        lastActivity = lastTick = Date.now();
        snapshot = {
            id: crypto.randomUUID(),
            startedAt: Date.now(),
            sequence: 0,
            device: innerWidth < 768 ? 'mobile' : innerWidth < 1024 ? 'tablet' : 'desktop',
            seconds: 0,
            scroll: 0,
            formStarted: false,
            formSuccess: false,
            formError: false,
            repeatedClick: false,
            deadClicks: 0,
            lcpMs: lcp,
            ctas: []
        };
        elements.clear();
        counters = {};
        lastClicks.clear();

        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var c = elements.get(entry.target);
                    if (entry.isIntersecting && entry.intersectionRatio >= .5 && c && document.visibilityState === 'visible') {
                        c.seen = true;
                        dirty = true;
                    }
                });
            }, { threshold: .5 });
        }

        document.querySelectorAll('a[href],button[type="submit"],[data-site-cta]').forEach(function (el) {
            var kind = '', href = el.getAttribute('href') || '';
            try {
                var url = new URL(href, location.href);
                if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) kind = 'whatsapp';
                else if (url.protocol === 'tel:') kind = 'phone';
                else if (url.origin === location.origin && /\/contato(?:\/|$)/.test(url.pathname)) kind = 'contact';
                else if (url.origin === location.origin && /calculadora/.test(url.pathname)) kind = 'calculator';
            } catch (_) { /* Ignore invalid links. */ }
            if (el.matches('button[type="submit"]') && trackableForm(el)) kind = 'form';
            if (!kind && el.hasAttribute('data-site-cta')) kind = 'custom';
            if (!kind || snapshot.ctas.length >= 60) return;
            var position = el.closest('header,nav') ? 'header' : el.closest('footer') ? 'footer' : (getComputedStyle(el).position === 'fixed' || el.closest('.whatsapp-float,.whatsapp-float-wrapper')) ? 'floating' : 'content';
            var prefix = kind + '-' + position;
            counters[prefix] = (counters[prefix] || 0) + 1;
            var c = { key: prefix + '-' + counters[prefix], seen: false, clicked: false };
            snapshot.ctas.push(c);
            elements.set(el, c);
            if (observer) observer.observe(el);
        });

        dirty = true;
        flush(false);
    }

    function stop() {
        active = false;
        snapshot = null;
        elements.clear();
        lastClicks.clear();
        dirty = false;
        if (observer) observer.disconnect();
        observer = null;
    }

    function usable() {
        return active && snapshot && Date.now() - snapshot.startedAt < 1790000;
    }

    function tick() {
        var now = Date.now();
        if (usable() && document.visibilityState === 'visible' && now - lastActivity < 60000) {
            snapshot.seconds = Math.min(1800, snapshot.seconds + Math.min(15, Math.max(0, Math.round((now - lastTick) / 1000))));
            dirty = true;
        }
        lastTick = now;
    }

    function flush(beacon) {
        if (!usable() || !dirty) return;
        if (inFlight && !beacon) {
            pending = true;
            return;
        }
        snapshot.sequence++;
        var payload = { context: context, snapshot: snapshot };
        var body = JSON.stringify(payload);
        dirty = false;

        var endpoint = '/api/telemetry/collect';
        if (beacon && navigator.sendBeacon) {
            try {
                if (navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))) return;
            } catch (_) {}
        }

        inFlight = true;
        var controller = new AbortController();
        var timeout = setTimeout(function () { controller.abort(); }, 5000);
        fetch(endpoint, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            keepalive: true,
            signal: controller.signal
        }).then(function (r) {
            if (!r.ok) {
                dirty = true;
                saveBuffer(payload);
            } else {
                clearBuffer();
            }
        }).catch(function () {
            dirty = true;
            saveBuffer(payload);
        }).finally(function () {
            clearTimeout(timeout);
            inFlight = false;
            if (pending) {
                pending = false;
            }
        });
    }

    function saveBuffer(payload) {
        try {
            sessionStorage.setItem('klyfe_telemetry_buf', JSON.stringify(payload));
        } catch (_) {}
    }

    function clearBuffer() {
        try {
            sessionStorage.removeItem('klyfe_telemetry_buf');
        } catch (_) {}
    }

    function flushBuffer() {
        try {
            var raw = sessionStorage.getItem('klyfe_telemetry_buf');
            if (raw) {
                clearBuffer();
                fetch('/api/telemetry/collect', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/json' },
                    body: raw,
                    keepalive: true
                }).catch(function () {});
            }
        } catch (_) {}
    }

    document.addEventListener('click', function (e) {
        lastActivity = Date.now();
        if (!usable()) return;
        var el = e.target.closest && e.target.closest('a,button,[data-site-cta]');
        if (el) {
            var c = elements.get(el);
            if (!c) return;
            c.seen = c.clicked = true;
            var previous = lastClicks.get(el) || [];
            previous = previous.filter(function (t) { return Date.now() - t < 1500; });
            previous.push(Date.now());
            lastClicks.set(el, previous);
            if (previous.length >= 3) snapshot.repeatedClick = true;
            dirty = true;
            flush(true);
        } else {
            var target = e.target;
            var isInteractive = target && target.closest && target.closest('input,textarea,select,label,[role="button"],[tabindex]');
            if (!isInteractive && target && target.closest && (target.closest('.card, .cta, .box, h1, h2, h3, img, svg, strong, p') || target.tagName === 'IMG')) {
                snapshot.deadClicks = Math.min(100, (snapshot.deadClicks || 0) + 1);
                dirty = true;
            }
        }
    }, true);

    document.addEventListener('input', function (e) {
        lastActivity = Date.now();
        if (usable() && trackableForm(e.target)) {
            snapshot.formStarted = true;
            dirty = true;
        }
    }, true);

    document.addEventListener('submit', function (e) {
        if (usable() && trackableForm(e.target)) {
            snapshot.formStarted = true;
            dirty = true;
            flush(false);
        }
    }, true);

    document.addEventListener('invalid', function (e) {
        if (usable() && trackableForm(e.target)) {
            snapshot.formStarted = snapshot.formError = true;
            dirty = true;
        }
    }, true);

    document.addEventListener('klyfe:form-result', function (e) {
        if (!usable() || !e.detail || !['success', 'error'].includes(e.detail.status)) return;
        snapshot.formStarted = true;
        snapshot[e.detail.status === 'success' ? 'formSuccess' : 'formError'] = true;
        dirty = true;
        flush(true);
    });

    document.addEventListener('scroll', function () {
        lastActivity = Date.now();
        if (!usable()) return;
        var height = document.documentElement.scrollHeight;
        var percent = Math.min(100, Math.round((scrollY + innerHeight) / height * 100));
        snapshot.scroll = Math.max(snapshot.scroll, percent >= 98 ? 100 : percent >= 75 ? 75 : percent >= 50 ? 50 : percent >= 25 ? 25 : 0);
        dirty = true;
    }, { passive: true });

    document.addEventListener('pointerdown', function () { lastActivity = Date.now(); }, { passive: true });
    document.addEventListener('keydown', function () { lastActivity = Date.now(); }, { passive: true });

    document.addEventListener('visibilitychange', function () {
        tick();
        if (document.visibilityState === 'hidden') flush(true);
        else {
            lastActivity = lastTick = Date.now();
            if (observer) {
                observer.disconnect();
                elements.forEach(function (_value, el) { observer.observe(el); });
            }
        }
    });

    window.addEventListener('pagehide', function () { tick(); flush(true); });
    document.addEventListener('freeze', function () { tick(); flush(true); });
    window.addEventListener('online', flushBuffer);

    try {
        new PerformanceObserver(function (list) {
            var entries = list.getEntries(), entry = entries[entries.length - 1];
            if (entry) lcp = Math.min(60000, Math.round(entry.startTime));
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (_) { /* Browser does not support LCP. */ }

    function settleLcp() {
        if (usable() && !snapshot.lcpMs && lcp) {
            snapshot.lcpMs = lcp;
            dirty = true;
        }
    }

    document.addEventListener('pointerdown', settleLcp, { once: true, passive: true });
    document.addEventListener('keydown', settleLcp, { once: true });
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            settleLcp();
            flush(true);
        }
    });

    setInterval(function () {
        tick();
        if (document.visibilityState === 'visible') flush(false);
    }, 15000);

    flushBuffer();
    start();
})();
