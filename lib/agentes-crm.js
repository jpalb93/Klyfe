/**
 * Agentes Klyfe CRM Integration
 * Encaminha leads de forma segura para o sistema central Agentes-Klyfe
 */

const CRM_URL = process.env.AGENTES_CRM_URL || 'https://api.klyfeelectric.com.br';
const CRM_SECRET = process.env.AGENTES_CRM_SECRET || '';

/**
 * Envia lead para a API do Agentes-Klyfe
 */
async function forwardLeadToAgentesCRM(leadData) {
    if (!CRM_URL || !CRM_SECRET) return { skipped: true, reason: 'CRM not configured' };

    try {
        const rawSource = leadData.source || 'website';
        let validSource = 'website';
        if (leadData.utm_source || leadData.gclid || leadData.fbclid || leadData.gbraid || rawSource.startsWith('lp-')) {
            validSource = 'ads';
        } else if (['website', 'whatsapp', 'google', 'ads', 'social', 'direto', 'indicacao', 'outro'].includes(rawSource)) {
            validSource = rawSource;
        }

        const faixaConta = leadData.faixa_conta || leadData.conta_media || 'Não especificada';
        const rawPhone = String(leadData.telefone || '').replace(/\D/g, '');
        const formattedPhone = (/^\d{10,11}$/.test(rawPhone) && !rawPhone.startsWith('55')) ? `55${rawPhone}` : (rawPhone || leadData.telefone || '');

        const payload = {
            name: leadData.nome || 'Lead sem nome',
            phone: formattedPhone,
            email: leadData.email || '',
            city: leadData.cidade || leadData.empresa || 'Não informada',
            interest: leadData.servico || 'Energia Solar Fotovoltaica',
            vertical: leadData.category || 'solar',
            source: validSource,
            utmSource: leadData.utm_source || '',
            utmMedium: leadData.utm_medium || '',
            utmCampaign: leadData.utm_campaign || '',
            utmTerm: leadData.utm_term || '',
            utmContent: leadData.utm_content || '',
            externalId: leadData.event_id || `lead_${Date.now()}`,
            message: `Lead recebido via ${rawSource}. Média da conta: ${faixaConta}`,
            metadata: {
                faixa_conta: faixaConta,
                content_name: leadData.content_name || '',
                gclid: leadData.gclid || '',
                gbraid: leadData.gbraid || '',
                wbraid: leadData.wbraid || '',
                fbclid: leadData.fbclid || '',
                ctwa_clid: leadData.ctwa_clid || '',
                fbp: leadData.fbp || '',
                fbc: leadData.fbc || '',
                conversion_time: leadData.conversion_time || new Date().toISOString(),
                raw_source: rawSource,
                // Campos prontos para Google Ads Offline Conversions upload
                offline_conversion: {
                    gclid: leadData.gclid || '',
                    gbraid: leadData.gbraid || '',
                    wbraid: leadData.wbraid || '',
                    conversion_action: 'lead',
                    conversion_date_time: leadData.conversion_time || new Date().toISOString(),
                    email: leadData.email || '',
                    phone: formattedPhone
                }
            }
        };

        const endpoint = `${CRM_URL.replace(/\/$/, '')}/leads`;
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-secret': CRM_SECRET
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const data = await res.json();
            return { ok: true, data };
        } else {
            const text = await res.text();
            console.warn('[AgentesCRM] Resposta não-OK do CRM:', res.status, text);
            return { ok: false, status: res.status };
        }
    } catch (err) {
        console.error('[AgentesCRM] Erro ao integrar lead:', err.message);
        return { ok: false, error: err.message };
    }
}

module.exports = {
    forwardLeadToAgentesCRM
};
