/**
 * Agentes Klyfe CRM Integration
 * Encaminha leads de forma segura para o sistema central Agentes-Klyfe
 */

const CRM_URL = process.env.AGENTES_CRM_URL || 'https://api.klyfeelectric.com.br';
const CRM_SECRET = process.env.AGENTES_CRM_SECRET || '';
const configuredTimeout = Number(process.env.AGENTES_CRM_TIMEOUT_MS);
const CRM_TIMEOUT_MS = Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : 8000;

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
        const formattedPhone = /^\d{10,11}$/.test(rawPhone) ? `55${rawPhone}` : (rawPhone || leadData.telefone || '');

        const messageParts = [
            `Lead recebido via ${rawSource}.`,
            `Serviço: ${leadData.servico || 'Não informado'}.`,
            `Cidade: ${leadData.cidade || 'Não informada'}.`,
            `Média da conta: ${faixaConta}.`
        ];
        if (leadData.form_type === 'wallbox_brief') {
            messageParts.push(`Perfil do imóvel: ${leadData.perfil || 'Não informado'}.`);
            messageParts.push(`Veículo: ${leadData.veiculo || 'Não informado'}.`);
            messageParts.push(`Carregador já adquirido: ${leadData.possui_carregador || 'Não informado'}.`);
            messageParts.push(`Distância entre quadro e vaga: ${leadData.distancia_quadro_vaga || 'Não informada'}.`);
        }
        if (leadData.mensagem) messageParts.push(`Mensagem: ${String(leadData.mensagem).trim()}`);

        const payload = {
            name: leadData.nome || 'Lead sem nome',
            phone: formattedPhone,
            email: leadData.email || '',
            city: String(leadData.cidade || leadData.empresa || 'Não informada').slice(0, 120),
            interest: leadData.servico || 'Energia Solar Fotovoltaica',
            vertical: leadData.category || 'solar',
            source: validSource,
            utmSource: String(leadData.utm_source || '').slice(0, 120),
            utmMedium: String(leadData.utm_medium || '').slice(0, 120),
            utmCampaign: String(leadData.utm_campaign || '').slice(0, 120),
            utmTerm: String(leadData.utm_term || '').slice(0, 120),
            utmContent: String(leadData.utm_content || '').slice(0, 120),
            externalId: leadData.event_id || `lead_${Date.now()}`,
            message: messageParts.join(' ').slice(0, 4000),
            metadata: {
                marketing_consent: leadData.marketing_consent || 'unknown',
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
                conversion_stage: leadData.conversion_stage || (leadData.form_type === 'wallbox_brief' ? 'qualified_lead' : 'lead'),
                raw_source: rawSource,
                form_type: leadData.form_type || '',
                service_key: leadData.service_key || '',
                perfil: leadData.perfil || '',
                veiculo: leadData.veiculo || '',
                possui_carregador: leadData.possui_carregador || '',
                distancia_quadro_vaga: leadData.distancia_quadro_vaga || '',
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
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);
        let res;
        try {
            res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-secret': CRM_SECRET,
                    'Idempotency-Key': String(leadData.event_id || payload.externalId)
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeout);
        }

        if (res.ok) {
            const data = await res.json().catch(() => null);
            return { ok: true, data };
        } else {
            const text = await res.text();
            console.warn('[AgentesCRM] Resposta não-OK do CRM:', res.status, text);
            return { ok: false, status: res.status };
        }
    } catch (err) {
        const timedOut = err && err.name === 'AbortError';
        console.error('[AgentesCRM] Erro ao integrar lead:', timedOut ? 'timeout' : err.message);
        return { ok: false, error: timedOut ? 'timeout' : err.message, timedOut };
    }
}

module.exports = {
    forwardLeadToAgentesCRM
};
