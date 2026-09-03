const express = require('express');
const router = express.Router();
const solarCalculatorConfig = require('../config/solar-calculator');
const { forwardLeadToAgentesCRM } = require('../lib/agentes-crm');

const baseUrl = 'https://www.klyfeelectric.com.br';

// ═══ MIDDLEWARE DE PROTEÇÃO INTERNA PARA A CALCULADORA SOLAR ═══
function requireSolarAuth(req, res, next) {
    const token = req.query?.token || req.headers['x-admin-token'] || req.headers['x-solar-token'];
    const expectedToken = process.env.ADMIN_TOKEN || process.env.SOLAR_CALC_KEY || 'klyfe';

    // Se o token fornecido for válido, concede o acesso
    if (token === expectedToken) {
        return next();
    }

    // No localhost em desenvolvimento, permite acesso direto se ADMIN_TOKEN não estiver strict no .env
    const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
    if (isLocalhost && !process.env.ADMIN_TOKEN) {
        return next();
    }

    // Se for acesso público de clientes/visitantes não autorizados, exibe 404 silencioso
    return res.status(404).render('404', {
        title: 'Página Não Encontrada | Klyfe Electric',
        description: 'A página que você está procurando não existe.',
        canonical: `${baseUrl}/404`,
        page: '404'
    });
}

// ═══ CALCULADORA SOLAR INTERNA ═══
router.get('/calculadora-solar', requireSolarAuth, (req, res) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.render('calculadora-solar', {
        title: 'Calculadora Solar | Klyfe Electric — Dimensionamento Comercial',
        description: 'Ferramenta interna de pré-venda, dimensionamento técnico-comercial, projeção de consumo e simulação financeira.',
        canonical: `${baseUrl}/calculadora-solar`,
        page: 'calculadora-solar',
        robots: 'noindex, nofollow',
        config: solarCalculatorConfig
    });
});

router.post('/api/calculadora-solar/salvar', async (req, res) => {
    try {
        const leadData = req.body || {};
        const result = await forwardLeadToAgentesCRM({
            ...leadData,
            source: 'calculadora_solar_interna',
            category: 'solar'
        });
        res.json({ success: true, crmResult: result });
    } catch (err) {
        console.error('[CalculadoraSolar] Erro ao salvar no CRM:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
