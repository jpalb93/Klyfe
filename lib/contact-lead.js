const MAX_FIELD_LENGTHS = {
    nome: 160,
    email: 254,
    telefone: 32,
    cidade: 160,
    servico: 160,
    mensagem: 4000
};

const WALLBOX_PROFILES = new Set(['Casa', 'Condomínio', 'Empresa']);
const WALLBOX_CHARGER_STATUS = new Set(['Sim', 'Não', 'Ainda não sei']);
const WALLBOX_DISTANCE_OPTIONS = new Set(['Até 5 m', '6–10 m', '11–20 m', 'Acima de 20 m', 'Ainda não sei']);

function cleanText(value, maxLength) {
    return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function normalizeContactLead(body = {}) {
    const lead = {};
    Object.entries(MAX_FIELD_LENGTHS).forEach(([field, maxLength]) => {
        lead[field] = cleanText(body[field], maxLength);
    });
    lead.telefone = lead.telefone.replace(/\D/g, '');
    return lead;
}

function validateContactLead(body = {}, { emailOptional = false } = {}) {
    const lead = normalizeContactLead(body);
    const errors = [];

    if (lead.nome.length < 2) errors.push('Informe seu nome completo.');
    if ((!emailOptional || lead.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push('Informe um e-mail válido.');
    if (!/^\d{10,11}$/.test(lead.telefone)) errors.push('Informe um telefone com DDD válido.');
    if (lead.cidade.length < 2) errors.push('Informe sua cidade ou localidade.');
    if (lead.servico.length < 2) errors.push('Selecione o serviço de interesse.');

    return { valid: errors.length === 0, errors, lead };
}

function normalizeWallboxBriefLead(body = {}) {
    const lead = normalizeContactLead({
        nome: body.nome,
        telefone: body.telefone,
        cidade: body.cidade,
        servico: 'Instalação de Wallbox',
        email: body.email || '',
        mensagem: body.mensagem || ''
    });
    lead.perfil = cleanText(body.perfil, 40);
    lead.veiculo = cleanText(body.veiculo, 160);
    lead.possui_carregador = cleanText(body.possui_carregador, 40);
    lead.distancia_quadro_vaga = cleanText(body.distancia_quadro_vaga, 60);
    lead.form_type = 'wallbox_brief';
    return lead;
}

function validateWallboxBriefLead(body = {}) {
    const lead = normalizeWallboxBriefLead(body);
    const errors = [];

    if (lead.nome.length < 2) errors.push('Informe seu nome.');
    if (!/^\d{10,11}$/.test(lead.telefone)) errors.push('Informe um WhatsApp com DDD válido.');
    if (lead.cidade.length < 2) errors.push('Informe sua cidade ou localidade.');
    if (!WALLBOX_PROFILES.has(lead.perfil)) errors.push('Selecione o tipo de imóvel.');
    if (!WALLBOX_CHARGER_STATUS.has(lead.possui_carregador)) errors.push('Informe se já possui o carregador.');
    if (!WALLBOX_DISTANCE_OPTIONS.has(lead.distancia_quadro_vaga)) errors.push('Informe a distância aproximada até a vaga.');

    const briefing = [
        `Perfil: ${lead.perfil}`,
        `Veículo: ${lead.veiculo || 'Não informado'}`,
        `Já possui carregador: ${lead.possui_carregador}`,
        `Distância entre quadro e vaga: ${lead.distancia_quadro_vaga}`
    ];
    lead.mensagem = [lead.mensagem, briefing.join('. ')].filter(Boolean).join(' ');

    return { valid: errors.length === 0, errors, lead };
}

module.exports = {
    normalizeContactLead,
    validateContactLead,
    normalizeWallboxBriefLead,
    validateWallboxBriefLead,
    WALLBOX_PROFILES,
    WALLBOX_CHARGER_STATUS,
    WALLBOX_DISTANCE_OPTIONS
};
