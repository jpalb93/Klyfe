'use strict';

const router = require('express').Router();
const { PHONE_SOLAR, buildWaUrl } = require('../lib/site-tracking');

router.get('/energia-solar/cartao', (_req, res) => {
    const description = 'Sua conta de luz pode ter um novo futuro. Descubra as possibilidades da energia solar para seu imóvel com a Klyfe.';
    res.set('X-Robots-Tag', 'noindex, follow');
    res.render('solar-card', {
        title: 'Mais sol. Menos conta. | Klyfe Energia Solar',
        description,
        canonical: 'https://www.klyfeelectric.com.br/energia-solar/cartao',
        robots: 'noindex, follow',
        page: 'solar-card',
        contentCategory: 'solar',
        fireViewContent: true,
        solarPhone: PHONE_SOLAR,
        solarContactUrl: buildWaUrl(PHONE_SOLAR, 'Olá! Conheci o cartão solar da Klyfe e gostaria de avaliar energia solar para meu imóvel.')
    });
});

module.exports = router;
