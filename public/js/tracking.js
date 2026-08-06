/**
 * Klyfe tracking bootstrap:
 * - Cookie consent (LGPD) antes de Pixel / GTM / Google Ads
 * - PageView + ViewContent (solar) + Lead (gated) + Contact (WA solar)
 * - event_id compartilhado com CAPI (POST /api/tracking/event)
 */
(function () {
    'use strict';

    var CFG = window.__KLYFE_TRACKING__ || {};
    var CONSENT_KEY = 'klyfe_cookie_consent';
    var LP_LEAD_KEY = 'klyfe_lp_solar_lead';
    var loaded = false;

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (_) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch (_) { /* ignore */ }
        try {
            document.cookie =
                CONSENT_KEY +
                '=' +
                encodeURIComponent(value) +
                ';path=/;max-age=31536000;SameSite=Lax';
        } catch (_) { /* ignore */ }
    }

    function newEventId(prefix) {
        prefix = prefix || 'ev';
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return prefix + '_' + window.crypto.randomUUID();
        }
        return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }

    function readCookie(name) {
        var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
    }

    function getMetaCookies() {
        return {
            fbp: readCookie('_fbp') || '',
            fbc: readCookie('_fbc') || ''
        };
    }

    function sendCapi(eventName, eventId, customData, userData) {
        if (!CFG.capiEnabled) return;
        var cookies = getMetaCookies();
        var body = {
            event_name: eventName,
            event_id: eventId,
            event_source_url: window.location.href,
            custom_data: customData || {},
            user_data: Object.assign({}, userData || {}, cookies)
        };
        try {
            var payload = JSON.stringify(body);
            if (navigator.sendBeacon) {
                navigator.sendBeacon('/api/tracking/event', new Blob([payload], { type: 'application/json' }));
                return;
            }
            fetch('/api/tracking/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true
            }).catch(function () { /* ignore */ });
        } catch (_) { /* ignore */ }
    }

    function ensureDataLayer() {
        window.dataLayer = window.dataLayer || [];
    }

    function loadGtm() {
        if (!CFG.gtmId) return;
        ensureDataLayer();
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var j = document.createElement('script');
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + CFG.gtmId;
        var f = document.getElementsByTagName('script')[0];
        f.parentNode.insertBefore(j, f);
    }

    function loadGoogleAds(fireConversion) {
        if (!CFG.googleAdsId) return;
        ensureDataLayer();
        window.gtag =
            window.gtag ||
            function () {
                window.dataLayer.push(arguments);
            };
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.googleAdsId;
        document.head.appendChild(s);
        window.gtag('js', new Date());
        window.gtag('config', CFG.googleAdsId);
        if (fireConversion && CFG.googleAdsConversionLabel) {
            window.gtag('event', 'conversion', {
                send_to: CFG.googleAdsId + '/' + CFG.googleAdsConversionLabel
            });
        }
    }

    function loadMetaPixel() {
        if (!CFG.metaPixelId || CFG.pixelViaGtm) return;

        !(function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        window.fbq('init', CFG.metaPixelId);

        var pvId = newEventId('pv');
        window.fbq('track', 'PageView', {}, { eventID: pvId });
        sendCapi('PageView', pvId, {
            content_category: CFG.contentCategory || 'geral',
            content_name: CFG.contentName || ''
        });

        if (CFG.fireViewContent) {
            var vcId = newEventId('vc');
            var vcParams = {
                content_category: CFG.contentCategory || 'solar',
                content_name: CFG.contentName || CFG.contentCategory || 'solar',
                content_type: 'product'
            };
            window.fbq('track', 'ViewContent', vcParams, { eventID: vcId });
            sendCapi('ViewContent', vcId, vcParams);
        }
    }

    function firePendingLpLead() {
        var raw;
        try {
            raw = sessionStorage.getItem(LP_LEAD_KEY);
        } catch (_) {
            return;
        }
        if (!raw) return;

        var pending;
        try {
            pending = JSON.parse(raw);
        } catch (_) {
            return;
        }
        if (!pending || !pending.event_id || pending.browser_fired) return;

        var params = {
            content_name: CFG.leadContentName || 'lp-solar-empresas',
            content_category: CFG.leadContentCategory || 'solar'
        };

        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', params, { eventID: pending.event_id });
        }

        ensureDataLayer();
        window.dataLayer.push({
            event: 'generate_lead',
            lead_source: params.content_name,
            content_category: params.content_category,
            page: 'obrigado',
            event_id: pending.event_id
        });

        loadGoogleAds(true);

        pending.browser_fired = true;
        try {
            sessionStorage.setItem(LP_LEAD_KEY, JSON.stringify(pending));
        } catch (_) { /* ignore */ }
    }

    function loadMarketingTags() {
        if (loaded) return;
        loaded = true;
        loadGtm();
        loadMetaPixel();
        if (CFG.expectLpLead) {
            firePendingLpLead();
        } else if (CFG.googleAdsId) {
            loadGoogleAds(false);
        }
    }

    function hideBanner() {
        var el = document.getElementById('klyfe-cookie-banner');
        if (!el) return;
        el.setAttribute('hidden', '');
        el.classList.add('is-hidden');
    }

    function showBanner() {
        var el = document.getElementById('klyfe-cookie-banner');
        if (!el) return;
        el.removeAttribute('hidden');
        el.classList.remove('is-hidden');
    }

    function acceptConsent() {
        setConsent('granted');
        hideBanner();
        loadMarketingTags();
    }

    function denyConsent() {
        setConsent('denied');
        hideBanner();
    }

    window.KlyfeConsent = {
        accept: acceptConsent,
        deny: denyConsent,
        get: getConsent
    };

    // Bind sem onclick inline (Helmet/CSP bloqueia script-src-attr por padrão)
    document.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest ? e.target.closest('[data-klyfe-consent]') : null;
        if (!btn) return;
        var action = btn.getAttribute('data-klyfe-consent');
        if (action === 'accept') acceptConsent();
        if (action === 'deny') denyConsent();
    });

    window.KlyfeTracking = {
        newEventId: newEventId,
        sendCapi: sendCapi,
        getMetaCookies: getMetaCookies,
        trackLeadSolar: function (params, eventId) {
            if (getConsent() !== 'granted') return eventId || newEventId('lead');
            var id = eventId || newEventId('lead');
            var p = params || {
                content_name: 'contato',
                content_category: 'solar'
            };
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Lead', p, { eventID: id });
            }
            return id;
        },
        markLpLeadPending: function (eventId) {
            try {
                sessionStorage.setItem(
                    LP_LEAD_KEY,
                    JSON.stringify({
                        event_id: eventId,
                        browser_fired: false,
                        ts: Date.now()
                    })
                );
            } catch (_) { /* ignore */ }
        }
    };

    function isWhatsAppHref(href) {
        return /wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i.test(href || '');
    }

    function resolveWaCategory(anchor) {
        return (
            anchor.getAttribute('data-content-category') ||
            CFG.contentCategory ||
            'geral'
        );
    }

    document.addEventListener(
        'click',
        function (e) {
            var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!a || !isWhatsAppHref(a.getAttribute('href'))) return;
            if (resolveWaCategory(a) !== 'solar') return;
            if (getConsent() !== 'granted') return;
            if (typeof window.fbq !== 'function') return;

            var eventId = newEventId('contact');
            var params = {
                content_name: CFG.contentName || 'whatsapp-solar',
                content_category: 'solar',
                content_type: 'product'
            };
            window.fbq('track', 'Contact', params, { eventID: eventId });
            sendCapi('Contact', eventId, params);
            ensureDataLayer();
            window.dataLayer.push({
                event: 'contact_whatsapp',
                content_category: 'solar',
                event_id: eventId
            });
        },
        true
    );

    function boot() {
        var consent = getConsent();
        if (consent === 'granted') {
            hideBanner();
            loadMarketingTags();
        } else if (consent === 'denied') {
            hideBanner();
        } else {
            showBanner();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
