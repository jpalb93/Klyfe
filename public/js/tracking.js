/**
 * Klyfe tracking bootstrap (padrão agência):
 * - Google Consent Mode v2 + banner LGPD
 * - Meta Pixel + CAPI (event_id), Advanced Matching no Lead
 * - _fbc a partir de fbclid; atribuição first-party 90 dias
 * - GTM + Google Ads + Enhanced Conversions
 * - PageView / ViewContent (solar) / Lead / Contact (WA solar)
 */
(function () {
    'use strict';

    var CFG = window.__KLYFE_TRACKING__ || {};
    var CONSENT_KEY = 'klyfe_cookie_consent';
    var LP_LEAD_KEY = 'klyfe_lp_solar_lead';
    var CAMPAIGN_KEY = 'klyfe_campaign_params';
    var CAMPAIGN_COOKIE = 'klyfe_camp';
    var CAMPAIGN_TTL_MS = 90 * 24 * 60 * 60 * 1000;
    var OBRIGADO_PATH = '/lp/energia-solar-empresas/obrigado';
    var loaded = false;
    var gtagScriptLoading = false;

    function ensureDataLayer() {
        window.dataLayer = window.dataLayer || [];
    }

    function ensureGtag() {
        ensureDataLayer();
        window.gtag =
            window.gtag ||
            function () {
                window.dataLayer.push(arguments);
            };
        return window.gtag;
    }

    /** Consent Mode v2 defaults — deve rodar antes de GTM/gtag/Ads */
    function initConsentDefaults() {
        var gtag = ensureGtag();
        gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
        });
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);
    }

    function updateConsentMode(granted) {
        var gtag = ensureGtag();
        var state = granted ? 'granted' : 'denied';
        gtag('consent', 'update', {
            ad_storage: state,
            ad_user_data: state,
            ad_personalization: state,
            analytics_storage: state
        });
        if (granted) {
            gtag('set', 'ads_data_redaction', false);
        }
    }

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
        window.dispatchEvent(new Event('klyfe:consent'));
    }

    function newEventId(prefix) {
        prefix = prefix || 'ev';
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return prefix + '_' + window.crypto.randomUUID();
        }
        return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }

    function readCookie(name) {
        var match = document.cookie.match(
            new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
        );
        return match ? decodeURIComponent(match[1]) : '';
    }

    function writeCookie(name, value, maxAgeSec) {
        try {
            document.cookie =
                name +
                '=' +
                encodeURIComponent(value) +
                ';path=/;max-age=' +
                maxAgeSec +
                ';SameSite=Lax';
        } catch (_) { /* ignore */ }
    }

    var inMemoryCampaignData = {};

    /** Meta: fb.1.{creation_time}.{fbclid} — só grava se consentimento concedido */
    function ensureFbcFromFbclid(fbclid) {
        if (!fbclid) return readCookie('_fbc') || '';
        var existing = readCookie('_fbc') || '';
        if (existing && existing.indexOf(fbclid) !== -1) return existing;
        var fbc = 'fb.1.' + Date.now() + '.' + fbclid;
        if (getConsent() === 'granted') {
            writeCookie('_fbc', fbc, 90 * 24 * 60 * 60);
        }
        return fbc;
    }

    function getMetaCookies() {
        var urlParams;
        try {
            urlParams = new URLSearchParams(window.location.search);
        } catch (_) {
            urlParams = null;
        }
        var fbclid = (urlParams && urlParams.get('fbclid')) || (inMemoryCampaignData && inMemoryCampaignData.fbclid) || '';
        var fbc = (fbclid ? ensureFbcFromFbclid(fbclid) : '') || readCookie('_fbc') || '';
        return {
            fbp: readCookie('_fbp') || '',
            fbc: fbc
        };
    }

    function normalizePhoneE164(phone) {
        var digits = String(phone || '').replace(/\D/g, '');
        if (!digits) return '';
        if (digits.indexOf('55') === 0 && digits.length >= 12) return '+' + digits;
        if (digits.length === 10 || digits.length === 11) return '+55' + digits;
        return digits.charAt(0) === '+' ? String(phone) : '+' + digits;
    }

    function persistCampaign(data) {
        if (getConsent() !== 'granted') return;
        try {
            sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(data));
        } catch (_) { /* ignore */ }
        try {
            localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(data));
        } catch (_) { /* ignore */ }
        writeCookie(CAMPAIGN_COOKIE, JSON.stringify(data), Math.floor(CAMPAIGN_TTL_MS / 1000));
    }

    function readStoredCampaign() {
        var sources = [];
        try {
            sources.push(sessionStorage.getItem(CAMPAIGN_KEY));
        } catch (_) { /* ignore */ }
        try {
            sources.push(localStorage.getItem(CAMPAIGN_KEY));
        } catch (_) { /* ignore */ }
        try {
            sources.push(readCookie(CAMPAIGN_COOKIE));
        } catch (_) { /* ignore */ }

        for (var i = 0; i < sources.length; i++) {
            if (!sources[i]) continue;
            try {
                var parsed = JSON.parse(sources[i]);
                if (parsed && parsed.captured_at && Date.now() - parsed.captured_at > CAMPAIGN_TTL_MS) {
                    continue;
                }
                if (parsed && (parsed.gclid || parsed.fbclid || parsed.utm_source || parsed.utm_campaign)) {
                    return parsed;
                }
            } catch (_) { /* ignore */ }
        }
        return {};
    }

    function captureUtmsAndClickIds() {
        try {
            var urlParams = new URLSearchParams(window.location.search);
            var gclid = urlParams.get('gclid') || '';
            var gbraid = urlParams.get('gbraid') || '';
            var wbraid = urlParams.get('wbraid') || '';
            var fbclid = urlParams.get('fbclid') || '';
            var ctwaClid = urlParams.get('ctwa_clid') || '';
            var utmSource = urlParams.get('utm_source') || '';
            var utmMedium = urlParams.get('utm_medium') || '';
            var utmCampaign = urlParams.get('utm_campaign') || '';
            var utmTerm = urlParams.get('utm_term') || '';
            var utmContent = urlParams.get('utm_content') || '';

            if (gclid || gbraid || wbraid || fbclid || ctwaClid || utmSource || utmMedium || utmCampaign) {
                var prev = readStoredCampaign();
                inMemoryCampaignData = {
                    gclid: gclid || prev.gclid || '',
                    gbraid: gbraid || prev.gbraid || '',
                    wbraid: wbraid || prev.wbraid || '',
                    fbclid: fbclid || prev.fbclid || '',
                    ctwa_clid: ctwaClid || prev.ctwa_clid || '',
                    utm_source: utmSource || prev.utm_source || '',
                    utm_medium: utmMedium || prev.utm_medium || '',
                    utm_campaign: utmCampaign || prev.utm_campaign || '',
                    utm_term: utmTerm || prev.utm_term || '',
                    utm_content: utmContent || prev.utm_content || '',
                    landing_page: window.location.pathname || '',
                    captured_at: Date.now()
                };
                if (fbclid) ensureFbcFromFbclid(fbclid);
                persistCampaign(inMemoryCampaignData);
            }
        } catch (_) { /* ignore */ }
    }

    function getCampaignParams() {
        var stored = readStoredCampaign();
        return Object.assign({}, stored, inMemoryCampaignData);
    }

    initConsentDefaults();
    captureUtmsAndClickIds();

    function trackingContext() {
        return {
            content_category: CFG.contentCategory || 'geral',
            content_vertical: CFG.contentVertical || CFG.contentCategory || 'geral',
            service_key: CFG.serviceKey || undefined,
            location: CFG.locationName || undefined
        };
    }

    function sendCapi(eventName, eventId, customData, userData) {
        if (!CFG.capiEnabled || getConsent() !== 'granted') return;
        var cookies = getMetaCookies();
        var body = {
            event_name: eventName,
            marketing_consent: 'granted',
            event_id: eventId,
            event_source_url: window.location.href,
            custom_data: Object.assign(trackingContext(), customData || {}),
            user_data: Object.assign({}, userData || {}, cookies)
        };
        try {
            var payload = JSON.stringify(body);
            if (navigator.sendBeacon && navigator.sendBeacon('/api/tracking/event', new Blob([payload], { type: 'application/json' }))) {
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

    function loadGtagScript(cb) {
        if (!CFG.googleAdsId) {
            if (cb) cb();
            return;
        }
        ensureGtag();
        if (window.__klyfeGtagLoaded) {
            if (cb) cb();
            return;
        }
        if (gtagScriptLoading) {
            var wait = setInterval(function () {
                if (window.__klyfeGtagLoaded) {
                    clearInterval(wait);
                    if (cb) cb();
                }
            }, 50);
            return;
        }
        gtagScriptLoading = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.googleAdsId;
        s.onload = function () {
            window.__klyfeGtagLoaded = true;
            window.gtag('js', new Date());
            window.gtag('config', CFG.googleAdsId, { allow_enhanced_conversions: true });
            if (cb) cb();
        };
        s.onerror = function () {
            gtagScriptLoading = false;
            if (cb) cb();
        };
        document.head.appendChild(s);
    }

    function setEnhancedConversionUserData(user) {
        if (!user) return;
        var gtag = ensureGtag();
        var payload = {};
        if (user.email) payload.email = String(user.email).trim().toLowerCase();
        if (user.phone) payload.phone_number = normalizePhoneE164(user.phone);
        if (user.firstName) payload.address = Object.assign({}, payload.address || {}, { first_name: String(user.firstName).trim().toLowerCase() });
        if (user.lastName) payload.address = Object.assign({}, payload.address || {}, { last_name: String(user.lastName).trim().toLowerCase() });
        if (payload.email || payload.phone_number || payload.address) {
            gtag('set', 'user_data', payload);
        }
    }

    function fireGoogleAdsConversion(userData) {
        if (!CFG.googleAdsId || !CFG.googleAdsConversionLabel) return;
        loadGtagScript(function () {
            setEnhancedConversionUserData(userData);
            window.gtag('event', 'conversion', {
                send_to: CFG.googleAdsId + '/' + CFG.googleAdsConversionLabel
            });
        });
    }

    function loadGoogleAds(fireConversion, userData) {
        if (!CFG.googleAdsId) return;
        loadGtagScript(function () {
            if (fireConversion) fireGoogleAdsConversion(userData);
        });
    }

    /**
     * PageView sem eventID = PageView de outra origem (ex.: tag do Pixel no GTM do time de
     * tráfego). Este arquivo já envia o PageView com eventID, casado com a API de Conversões.
     */
    function isUnmatchedPageView(args) {
        var command = args[0];
        var eventName = command === 'track' ? args[1] : command === 'trackSingle' ? args[2] : null;
        if (eventName !== 'PageView') return false;
        var options = command === 'track' ? args[3] : args[4];
        return !(options && options.eventID);
    }

    /**
     * Quando o Pixel é carregado por este arquivo, descarta PageViews duplicados sem eventID.
     * Filtra na fila (chamadas antes do fbevents.js carregar) e em callMethod (depois dele).
     * Só PageView: Lead, Contact, eventos personalizados e o resto do GTM passam normalmente.
     */
    function guardDuplicatePageView(fbq) {
        if (typeof fbq !== 'function' || fbq.__klyfePageViewGuard) return;
        fbq.__klyfePageViewGuard = true;
        if (Array.isArray(fbq.queue)) {
            for (var i = fbq.queue.length - 1; i >= 0; i--) {
                if (isUnmatchedPageView(fbq.queue[i])) fbq.queue.splice(i, 1);
            }
            var push = fbq.queue.push;
            fbq.queue.push = function () {
                var kept = Array.prototype.filter.call(arguments, function (args) { return !isUnmatchedPageView(args); });
                return kept.length ? push.apply(this, kept) : this.length;
            };
        }
        var callMethod = guardCallMethod(fbq.callMethod);
        try {
            Object.defineProperty(fbq, 'callMethod', {
                configurable: true,
                enumerable: true,
                get: function () { return callMethod; },
                set: function (fn) { callMethod = guardCallMethod(fn); }
            });
        } catch (_) { /* sem a trava, o Pixel segue funcionando normalmente */ }
    }

    function guardCallMethod(fn) {
        if (typeof fn !== 'function') return fn;
        return function () {
            if (isUnmatchedPageView(arguments)) return undefined;
            return fn.apply(this, arguments);
        };
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
        guardDuplicatePageView(window.fbq);

        // Automatic Advanced Matching (Events Manager) + init limpo
        window.fbq('init', CFG.metaPixelId);
        window.fbq('set', 'autoConfig', true, CFG.metaPixelId);

        var pvId = newEventId('pv');
        window.fbq('track', 'PageView', {}, { eventID: pvId });
        sendCapi('PageView', pvId, {
            content_name: CFG.contentName || ''
        });

        if (CFG.fireViewContent) {
            var vcId = newEventId('vc');
            var vcParams = Object.assign(trackingContext(), {
                content_name: CFG.contentName || CFG.contentCategory || 'solar',
                content_category: 'solar',
                content_type: 'product'
            });
            window.fbq('track', 'ViewContent', vcParams, { eventID: vcId });
            sendCapi('ViewContent', vcId, vcParams);
        }
    }

    function applyAdvancedMatching(user) {
        if (!CFG.metaPixelId || typeof window.fbq !== 'function' || !user) return;
        var am = {};
        if (user.email) am.em = String(user.email).trim().toLowerCase();
        if (user.phone) {
            var ph = String(user.phone).replace(/\D/g, '');
            if (ph) am.ph = ph.indexOf('55') === 0 ? ph : '55' + ph;
        }
        if (user.firstName) am.fn = String(user.firstName).trim().toLowerCase();
        if (user.lastName) am.ln = String(user.lastName).trim().toLowerCase();
        if (am.em || am.ph || am.fn || am.ln) {
            window.fbq('init', CFG.metaPixelId, am);
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
        if (!pending.ts || Date.now() - pending.ts > 30 * 60 * 1000) {
            sessionStorage.removeItem(LP_LEAD_KEY);
            return;
        }

        var params = {
            content_name: pending.content_name || CFG.leadContentName || 'lp-solar-empresas',
            content_category: pending.content_category || CFG.leadContentCategory || 'solar'
        };

        var user = {
            email: pending.email || '',
            phone: pending.phone || '',
            firstName: pending.firstName || '',
            lastName: pending.lastName || ''
        };

        applyAdvancedMatching(user);

        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', params, { eventID: pending.event_id });
        }

        ensureDataLayer();
        window.dataLayer.push({
            event: 'generate_lead',
            lead_source: params.content_name,
            content_category: params.content_category,
            content_vertical: CFG.contentVertical || params.content_category,
            service_key: CFG.serviceKey || undefined,
            location: CFG.locationName || undefined,
            page: 'obrigado',
            event_id: pending.event_id,
            gclid: (getCampaignParams().gclid || ''),
            has_user_data: !!(user.email || user.phone || user.firstName || user.lastName)
        });

        loadGoogleAds(true, user);

        pending.browser_fired = true;
        try {
            sessionStorage.setItem(LP_LEAD_KEY, JSON.stringify(pending));
            // Limpa PII após disparo
            pending.email = '';
            pending.phone = '';
            pending.firstName = '';
            pending.lastName = '';
            sessionStorage.setItem(LP_LEAD_KEY, JSON.stringify(pending));
        } catch (_) { /* ignore */ }
    }

    function loadMarketingTags() {
        if (loaded) return;
        loaded = true;

        var camp = getCampaignParams();
        if (camp.gclid || camp.fbclid || camp.utm_source) {
            persistCampaign(camp);
            if (camp.fbclid) ensureFbcFromFbclid(camp.fbclid);
            ensureDataLayer();
            window.dataLayer.push({
                event: 'campaign_attribution',
                gclid: camp.gclid || '',
                gbraid: camp.gbraid || '',
                wbraid: camp.wbraid || '',
                fbclid: camp.fbclid || '',
                utm_source: camp.utm_source || '',
                utm_medium: camp.utm_medium || '',
                utm_campaign: camp.utm_campaign || '',
                utm_term: camp.utm_term || '',
                utm_content: camp.utm_content || '',
                landing_page: camp.landing_page || ''
            });
        }

        loadGtm();
        loadMetaPixel();
        if (CFG.expectLpLead) {
            firePendingLpLead();
        } else if (CFG.googleAdsId) {
            loadGoogleAds(false);
        }
    }

    function clearMarketingCookies() {
        ['_fbp', '_fbc', CAMPAIGN_COOKIE].forEach(function (name) {
            try {
                document.cookie = name + '=;path=/;max-age=0;SameSite=Lax';
            } catch (_) { /* ignore */ }
        });
        try {
            document.cookie.split(';').forEach(function (c) {
                var name = c.trim().split('=')[0];
                if (name && name.indexOf('_gcl_') === 0) {
                    document.cookie = name + '=;path=/;max-age=0;SameSite=Lax';
                }
            });
        } catch (_) { /* ignore */ }
        try { localStorage.removeItem(CAMPAIGN_KEY); } catch (_) { /* ignore */ }
        try { sessionStorage.removeItem(CAMPAIGN_KEY); } catch (_) { /* ignore */ }
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
        if (typeof window.fbq === 'function') window.fbq('consent', 'grant');
        updateConsentMode(true);
        hideBanner();
        loadMarketingTags();
    }

    function denyConsent() {
        setConsent('denied');
        if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
        updateConsentMode(false);
        clearMarketingCookies();
        try { sessionStorage.removeItem(LP_LEAD_KEY); } catch (_) { /* ignore */ }
        hideBanner();
    }

    window.KlyfeConsent = {
        accept: acceptConsent,
        deny: denyConsent,
        get: getConsent,
        reopen: showBanner
    };

    document.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest ? e.target.closest('[data-klyfe-consent]') : null;
        if (!btn) return;
        var action = btn.getAttribute('data-klyfe-consent');
        if (action === 'accept') acceptConsent();
        if (action === 'deny') denyConsent();
        if (action === 'reopen') {
            if (e.preventDefault) e.preventDefault();
            showBanner();
        }
    });

    function splitName(fullName) {
        var parts = String(fullName || '')
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        return {
            firstName: parts[0] || '',
            lastName: parts.slice(1).join(' ')
        };
    }

    function markLpLeadPending(opts) {
        opts = opts || {};
        if (getConsent() !== 'granted') return;
        var eventId = opts.eventId || opts.event_id;
        if (!eventId) return;
        var names = splitName(opts.nome || opts.name || '');
        try {
            sessionStorage.setItem(
                LP_LEAD_KEY,
                JSON.stringify({
                    event_id: eventId,
                    browser_fired: false,
                    content_name: opts.content_name || CFG.leadContentName || 'lp-solar',
                    content_category: opts.content_category || 'solar',
                    email: opts.email || '',
                    phone: opts.phone || opts.telefone || '',
                    firstName: opts.firstName || names.firstName,
                    lastName: opts.lastName || names.lastName,
                    ts: Date.now()
                })
            );
        } catch (_) { /* ignore */ }
    }

    /**
     * Fluxo padrão LP → POST /contato → CAPI server → thank-you (Pixel + Ads).
     * @returns {Promise<{ok:boolean, event_id?:string}>}
     */
    var LEAD_SUBMIT_TIMEOUT_MS = 12000;

    /**
     * Plano B dos formulários: se o registro falhar, o cliente segue para o WhatsApp com os
     * dados que digitou, no formato que a recepção da Central reconhece (cidade rotulada).
     */
    function buildLeadWhatsAppUrl(phone, lead) {
        lead = lead || {};
        var clean = function (value) { return String(value || '').replace(/\s+/g, ' ').trim(); };
        var lines = [lead.mensagem ? String(lead.mensagem).trim() : 'Olá! Quero um orçamento de energia solar.'];
        if (clean(lead.cidade)) lines.push('Cidade da instalação: ' + clean(lead.cidade).replace(/[.!?;]+$/, '') + '.');
        if (!lead.mensagem && clean(lead.faixa_conta)) lines.push('Minha conta de luz: ' + clean(lead.faixa_conta) + '.');
        if (clean(lead.nome)) lines.push('Meu nome é ' + clean(lead.nome) + '.');
        var digits = String(phone || '').replace(/\D/g, '') || '5583991430929';
        return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(lines.join('\n'));
    }

    var pendingSubmissionIds = {};
    function submitLpLead(opts) {
        opts = opts || {};
        var camp = getCampaignParams();
        var cookies = getMetaCookies();
        var contentName = opts.content_name || opts.source || 'lp-solar';
        var eventId = opts.event_id || pendingSubmissionIds[contentName] || newEventId('lead');
        pendingSubmissionIds[contentName] = eventId;
        var payload = Object.assign({}, opts, {
            event_id: eventId,
            event_source_url: window.location.href,
            marketing_consent: getConsent() || 'unknown',
            servico: opts.servico || 'Energia Solar Fotovoltaica',
            gclid: opts.gclid || camp.gclid || '',
            gbraid: opts.gbraid || camp.gbraid || '',
            wbraid: opts.wbraid || camp.wbraid || '',
            fbclid: opts.fbclid || camp.fbclid || '',
            ctwa_clid: opts.ctwa_clid || camp.ctwa_clid || '',
            utm_source: opts.utm_source || camp.utm_source || '',
            utm_medium: opts.utm_medium || camp.utm_medium || '',
            utm_campaign: opts.utm_campaign || camp.utm_campaign || '',
            utm_term: opts.utm_term || camp.utm_term || '',
            utm_content: opts.utm_content || camp.utm_content || '',
            fbp: cookies.fbp,
            fbc: cookies.fbc
        });

        // Nunca deixar o cliente esperando indefinidamente: depois do limite, a página
        // segue para o WhatsApp (o envio pode até concluir no servidor; o event_id evita duplicar).
        var controller = typeof AbortController === 'function' ? new AbortController() : null;
        var timer = controller ? setTimeout(function () { controller.abort(); }, LEAD_SUBMIT_TIMEOUT_MS) : null;
        return fetch('/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller ? controller.signal : undefined
        })
            .finally(function () { if (timer) clearTimeout(timer); })
            .then(function (res) {
                if (!res.ok) throw new Error('Falha no servidor');
                return res.json();
            })
            .then(function (json) {
                if (!json || !json.success) throw new Error('Envio não confirmado');
                document.dispatchEvent(new CustomEvent('klyfe:form-result', { detail: { status: 'success' } }));
                var finalId = (json && json.event_id) || eventId;
                delete pendingSubmissionIds[contentName];
                if (getConsent() === 'granted') {
                    markLpLeadPending({
                        eventId: finalId,
                        content_name: contentName,
                        content_category: 'solar',
                        email: payload.email || '',
                        phone: payload.telefone || '',
                        nome: payload.nome || ''
                    });
                }
                if (opts.redirect !== false) window.location.href = opts.thankYouUrl || OBRIGADO_PATH;
                else if (getConsent() === 'granted') firePendingLpLead();
                return { ok: true, event_id: finalId };
            })
            .catch(function (error) {
                document.dispatchEvent(new CustomEvent('klyfe:form-result', { detail: { status: 'error' } }));
                throw error;
            });
    }

    window.KlyfeTracking = {
        newEventId: newEventId,
        sendCapi: sendCapi,
        getMetaCookies: getMetaCookies,
        getCampaignParams: getCampaignParams,
        submitLpLead: submitLpLead,
        buildLeadWhatsAppUrl: buildLeadWhatsAppUrl,
        fireGoogleAdsConversion: fireGoogleAdsConversion,
        trackCalculatorEvent: function (eventName) {
            var allowed = ['calculator_value_selected', 'calculator_value_entered', 'calculator_result_viewed', 'calculator_whatsapp_click'];
            if (getConsent() !== 'granted' || allowed.indexOf(eventName) === -1) return false;
            ensureDataLayer();
            window.dataLayer.push({ event: eventName, content_category: 'solar', content_name: 'solar-calculator' });
            return true;
        },
        markLpLeadPending: function (eventIdOrOpts, maybeOpts) {
            // Retrocompat: markLpLeadPending(eventId) | markLpLeadPending({eventId, ...})
            if (typeof eventIdOrOpts === 'string') {
                markLpLeadPending(Object.assign({ eventId: eventIdOrOpts }, maybeOpts || {}));
            } else {
                markLpLeadPending(eventIdOrOpts || {});
            }
        },
        trackLeadSolar: function (params, eventId, userData) {
            if (getConsent() !== 'granted') return eventId || newEventId('lead');
            var id = eventId || newEventId('lead');
            var p = params || {
                content_name: 'contato',
                content_category: 'solar'
            };
            if (userData) applyAdvancedMatching(userData);
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Lead', p, { eventID: id });
            }
            ensureDataLayer();
            window.dataLayer.push({
                event: 'generate_lead',
                lead_source: p.content_name || 'contato',
                content_category: p.content_category || 'solar',
                content_vertical: CFG.contentVertical || p.content_category || 'solar',
                service_key: CFG.serviceKey || undefined,
                location: CFG.locationName || undefined,
                event_id: id,
                has_user_data: !!userData
            });
            if (userData) fireGoogleAdsConversion(userData);
            return id;
        },
        trackWallboxStage: function (stage, details) {
            var allowed = ['qualified_lead', 'budget_sent', 'contracted'];
            if (allowed.indexOf(stage) === -1) return false;
            ensureDataLayer();
            window.dataLayer.push(Object.assign({
                event: 'wallbox_' + stage,
                content_category: 'wallbox',
                content_name: 'wallbox-funnel'
            }, details || {}));
            return true;
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
            var category = resolveWaCategory(a);
            if (category === 'wallbox') {
                ensureDataLayer();
                window.dataLayer.push({
                    event: 'contact_whatsapp',
                    content_category: 'wallbox',
                    content_vertical: CFG.contentVertical || 'wallbox',
                    service_key: CFG.serviceKey || 'carregador-veicular',
                    location: CFG.locationName || undefined,
                    content_name: a.getAttribute('data-content-name') || 'whatsapp-wallbox'
                });
                return;
            }
            if (category !== 'solar') return;
            if (getConsent() !== 'granted') return;
            if (typeof window.fbq !== 'function') return;

            var eventId = newEventId('contact');
            var params = {
                content_name: a.getAttribute('data-content-name') || CFG.contentName || 'whatsapp-solar',
                content_category: 'solar',
                content_type: 'product'
            };
            window.fbq('track', 'Contact', params, { eventID: eventId });
            sendCapi('Contact', eventId, params);
            ensureDataLayer();
            window.dataLayer.push({
                event: 'contact_whatsapp',
                content_category: 'solar',
                content_vertical: CFG.contentVertical || 'solar',
                service_key: CFG.serviceKey || undefined,
                location: CFG.locationName || undefined,
                event_id: eventId
            });
            fireGoogleAdsConversion();
        },
        true
    );

    function boot() {
        var consent = getConsent();
        if (consent === 'granted') {
            updateConsentMode(true);
            hideBanner();
            loadMarketingTags();
        } else if (consent === 'denied') {
            updateConsentMode(false);
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
