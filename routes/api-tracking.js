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
    const eventId = String(body.event_id || newEventId('capi'));
    const user = body.user_data || {};
    const customData = body.custom_data || {};

    // Lead padrão Meta só no funil Solar
    if (eventName === 'Lead' && customData.content_category && customData.content_category !== 'solar') {
        return res.status(400).json({ success: false, message: 'Lead padrão restrito a solar' });
    }

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
    const category = categoryFromServico(body.servico);
    const isLpSolar = isLpSolarSource(body.source);
    const isSolarLead = category === 'solar' || isLpSolar;
    const eventId = String(body.event_id || newEventId('lead'));
    const contentName = resolveLeadContentName(body.source, isSolarLead);
    const firstName = (body.nome || '').trim().split(/\s+/)[0] || '';
    const lastName = (body.nome || '').trim().split(/\s+/).slice(1).join(' ') || '';

    let capi = null;
    const hasConsent = body.marketing_consent === 'granted' || body.marketing_consent === true;
    if (isSolarLead && hasConsent) {
        const clientIp = req.headers['x-forwarded-for']
            ? String(req.headers['x-forwarded-for']).split(',')[0].trim()
            : (req.ip || '').replace(/^::ffff:/, '');

        const lpPathMap = {
            'lp-solar-empresas': '/lp/energia-solar-empresas',
            'lp-solar-fazendas': '/lp/energia-solar-fazendas',
            'lp-solar-supermercados-clinicas': '/lp/energia-solar-supermercados-clinicas',
            'lp-solar-residencial': '/lp/energia-solar-residencial'
        };
        const defaultSourceUrl = isLpSolar
            ? `${baseUrl}${lpPathMap[body.source] || '/lp/energia-solar-empresas'}`
            : `${baseUrl}/contato`;

        capi = await sendMetaCapiEvent({
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
    }

    // Encaminhamento automático para o CRM central da Klyfe (Agentes-Klyfe)
    // Inclui gclid/fbclid/UTMs para offline conversions / atribuição de agência
    const crmResult = await forwardLeadToAgentesCRM({
        ...body,
        event_id: eventId,
        content_name: contentName,
        category: isSolarLead ? 'solar' : category,
        conversion_time: new Date().toISOString()
    });

    res.json({
        success: true,
        message: 'Recebido!',
        event_id: eventId,
        content_name: contentName,
        content_category: isSolarLead ? 'solar' : category,
        capi_ok: isSolarLead ? !!(capi && capi.ok) : undefined,
        crm_ok: !!(crmResult && crmResult.ok)
    });
});

module.exports = router;
