const express = require('express');
const router = express.Router();
const { categoryFromServico } = require('../lib/site-tracking');
const {
    sendMetaCapiEvent,
    newEventId,
    resolveLeadContentName,
    isLpSolarSource
} = require('../lib/meta-capi');
const { forwardLeadToAgentesCRM } = require('../lib/agentes-crm');
const { validateContactLead, validateWallboxBriefLead } = require('../lib/contact-lead');

const baseUrl = 'https://www.klyfeelectric.com.br';
const ALLOWED_CAPI_EVENTS = new Set(['PageView', 'ViewContent', 'Lead', 'Contact']);

/**
 * Meta CAPI (browser dedup via event_id).
 * Aceita PageView | ViewContent | Lead | Contact.
 * IMPORTANTE: await no Vercel — fire-and-forget após res.json é cortado.
 */
router.post('/api/tracking/event', async (req, res) => {
    const body = req.body || {};
    const eventName = String(body.event_name || '');
    if (!ALLOWED_CAPI_EVENTS.has(eventName)) {
        return res.status(400).json({ success: false, message: 'event_name inválido' });
    }
    if (body.marketing_consent !== 'granted' && body.marketing_consent !== true) {
        return res.json({ success: true, capi_skipped: true, reason: 'consent_required' });
    }
    // Leads are emitted only after /contato confirms persistence in the CRM.
    if (eventName === 'Lead') {
        return res.status(400).json({ success: false, message: 'Lead deve ser registrado pelo formulário.' });
    }
    const eventId = String(body.event_id || '');
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(eventId)) {
        return res.status(400).json({ success: false, message: 'event_id inválido' });
    }
    const user = body.user_data || {};
    const customData = body.custom_data || {};

    const sourceUrl =
        body.event_source_url ||
        req.get('referer') ||
        baseUrl;

    const clientIp = req.headers['x-forwarded-for']
        ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
        : (req.ip || '').replace(/^::ffff:/, '');

    const capi = await sendMetaCapiEvent({
        eventName,
        eventId,
        eventSourceUrl: sourceUrl,
        customData,
        userData: {
            email: user.email || user.em,
            phone: user.phone || user.ph,
            firstName: user.firstName || user.fn,
            lastName: user.lastName || user.ln,
            country: user.country || 'br',
            externalId: user.externalId || user.external_id || eventId,
            fbp: user.fbp,
            fbc: user.fbc
        },
        clientIp,
        userAgent: req.get('user-agent') || ''
    });

    res.json({
        success: true,
        event_id: eventId,
        capi_ok: !!(capi && capi.ok),
        capi_skipped: !!(capi && capi.skipped)
    });
});

// POST Contato (+ CAPI Lead solar com event_id para dedup com Pixel)
router.post('/contato', async (req, res) => {
    const body = req.body || {};
    if (body.website_url) return res.status(204).end();
    if (body.event_id && !/^[a-zA-Z0-9_-]{1,120}$/.test(String(body.event_id))) {
        return res.status(400).json({ success: false, message: 'event_id inválido' });
    }

    const isWallboxBrief = String(body.form_type || '') === 'wallbox_brief';
    const isLpSolar = isLpSolarSource(body.source);
    const validation = isWallboxBrief ? validateWallboxBriefLead(body) : validateContactLead(body, { emailOptional: isLpSolar });
    if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.errors[0], errors: validation.errors });
    }
    Object.assign(body, validation.lead);

    const category = categoryFromServico(body.servico);
    const isSolarLead = category === 'solar' || isLpSolar;
    const eventId = String(body.event_id || newEventId('lead'));
    const contentName = isWallboxBrief ? 'wallbox-brief-form' : resolveLeadContentName(body.source, isSolarLead);
    const firstName = (body.nome || '').trim().split(/\s+/)[0] || '';
    const lastName = (body.nome || '').trim().split(/\s+/).slice(1).join(' ') || '';

    let capi = null;
    const hasConsent = body.marketing_consent === 'granted' || body.marketing_consent === true;
    const sendCapiLead = async () => {
        if (!isSolarLead || !hasConsent) return null;
        const clientIp = req.headers['x-forwarded-for']
            ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
            : (req.ip || '').replace(/^::ffff:/, '');

        const lpPathMap = {
            'lp-solar-empresas': '/lp/energia-solar-empresas',
            'lp-solar-fazendas': '/lp/energia-solar-fazendas',
            'lp-solar-supermercados-clinicas': '/lp/energia-solar-supermercados-clinicas',
            'lp-solar-residencial': '/lp/energia-solar-residencial',
            'lp-solar-alta-conversao': '/lp/energia-solar'
        };
        const defaultSourceUrl = isLpSolar
            ? `${baseUrl}${lpPathMap[body.source] || '/lp/energia-solar-empresas'}`
            : `${baseUrl}/contato`;

        return sendMetaCapiEvent({
            eventName: 'Lead',
            eventId,
            eventSourceUrl: body.event_source_url || defaultSourceUrl,
            customData: {
                content_name: contentName,
                content_category: 'solar',
                content_category_label: body.servico || 'Energia Solar Fotovoltaica',
                lead_source: body.source || 'contato',
                ctwa_clid: body.ctwa_clid || undefined,
                currency: 'BRL'
            },
            userData: {
                email: body.email,
                phone: body.telefone,
                firstName,
                lastName,
                country: 'br',
                externalId: eventId,
                fbp: body.fbp,
                fbc: body.fbc
            },
            clientIp,
            userAgent: req.get('user-agent') || ''
        });
    };

    // Encaminhamento automático para o CRM central da Klyfe (Agentes-Klyfe)
    // Inclui gclid/fbclid/UTMs para offline conversions / atribuição de agência
    const crmResult = await forwardLeadToAgentesCRM({
        ...body,
        event_id: eventId,
        content_name: contentName,
        category: isSolarLead ? 'solar' : category,
        conversion_time: new Date().toISOString()
    });

    if (!crmResult || !crmResult.ok) {
        const isConfigurationError = crmResult && crmResult.skipped;
        return res.status(isConfigurationError ? 503 : 502).json({
            success: false,
            message: 'Não foi possível registrar sua solicitação agora. Tente novamente ou fale conosco pelo WhatsApp.',
            code: isConfigurationError ? 'CRM_UNAVAILABLE' : (crmResult && crmResult.timedOut ? 'CRM_TIMEOUT' : 'CRM_DELIVERY_FAILED')
        });
    }

    // Eventos de conversão são emitidos somente após a persistência confirmada no CRM.
    capi = await sendCapiLead();

    res.json({
        success: true,
        message: 'Recebido!',
        event_id: eventId,
        content_name: contentName,
        content_category: isSolarLead ? 'solar' : category,
        capi_ok: isSolarLead ? !!(capi && capi.ok) : undefined,
        crm_ok: true
    });
});

module.exports = router;
