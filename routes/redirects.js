const express = require('express');
const router = express.Router();

/**
 * ═══ REDIRECIONAMENTOS 301 (SEO Legacy Redirects) ═══
 * Normaliza caminhos, remove barras finais duplicadas e garante preservação de backlinks legados.
 */
router.use((req, res, next) => {
    const rawPath = req.path || '/';
    // Normaliza o path: remove barra no final e coloca em lowercase
    let path = rawPath.toLowerCase().replace(/\/$/, '');
    if (path === '') path = '/';

    if (path === '/usinas-solares' && rawPath !== '/usinas-solares/') {
        const query = req.url.slice(rawPath.length);
        return res.redirect(301, `/usinas-solares/${query}`);
    }

    // Wallbox é uma página comercial prioritária: concentra aliases, cidades
    // e a versão canônica com barra final em um único destino indexável.
    const wallboxAliasMatch = path.match(/^\/(?:(campina-grande|joao-pessoa)\/)?(?:(?:solucoes\/)?(?:eletrica\/)?)?(?:wallbox|carregador-veicular|carregador-ev|carregador-de-carro-eletrico)$/);
    if (wallboxAliasMatch) {
        const cityPrefix = wallboxAliasMatch[1] ? `/${wallboxAliasMatch[1]}` : '';
        const wallboxPath = `${cityPrefix}/solucoes/eletrica/carregador-veicular`;
        if (path !== wallboxPath || !rawPath.endsWith('/')) {
            return res.redirect(301, `${wallboxPath}/`);
        }
    }

    const specificWallboxMatch = path.match(/^\/(?:(campina-grande|joao-pessoa)\/)?(?:(?:solucoes\/)?(?:eletrica\/)?)?(wallbox-(?:residencial|condominio|empresa|energia-solar|solar))$/);
    if (specificWallboxMatch) {
        const cityPrefix = specificWallboxMatch[1] ? `/${specificWallboxMatch[1]}` : '';
        let targetService = specificWallboxMatch[2];
        if (targetService === 'wallbox-solar') targetService = 'wallbox-energia-solar';
        const targetPath = `${cityPrefix}/solucoes/eletrica/${targetService}`;
        if (path !== targetPath || !rawPath.endsWith('/')) {
            return res.redirect(301, `${targetPath}/`);
        }
    }

    const regionalWallboxLegacy = path.match(/^\/(campina-grande|joao-pessoa)\/nossos-servicos\/(?:klyfe-)?(?:wallbox|carregador-veicular|carregador-ev)$/);
    if (regionalWallboxLegacy) {
        return res.redirect(301, `/${regionalWallboxLegacy[1]}/solucoes/eletrica/carregador-veicular/`);
    }

    const redirects = {
        '/nossos-servicos/klyfe-energia-solar': '/energia-solar/',
        '/nossos-servicos/klyfe-automacao-residencial': '/solucoes/automacao/automacao-residencial',
        '/nossos-servicos/klyfe-solucoes-eletricas': '/solucoes/eletrica',
        '/nossos-servicos/klyfe-instalacao-eletrica': '/solucoes/eletrica',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia': '/solucoes/engenharia',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia/laudo-de-spda': '/solucoes/engenharia/spda',
        '/nossos-servicos/klyfe-laudos-eletricos-e-engenharia/laudo-de-aterramento': '/solucoes/engenharia/laudos-eletricos',
        '/nossos-servicos/klyfe-spda-para-raios': '/solucoes/engenharia/spda',
        '/nossos-servicos/klyfe-subestacao-de-energia': '/solucoes/engenharia/projeto-subestacao',
        '/nossos-servicos/klyfe-carregador-veicular': '/solucoes/eletrica/carregador-veicular/',
        '/nossos-servicos/klyfe-wallbox': '/solucoes/eletrica/carregador-veicular/',
        '/carregador-veicular': '/solucoes/eletrica/carregador-veicular/',
        '/carregador-ev': '/solucoes/eletrica/carregador-veicular/',
        '/wallbox': '/solucoes/eletrica/carregador-veicular/',
        '/solucoes/wallbox': '/solucoes/eletrica/carregador-veicular/',
        '/solucoes/carregador-veicular': '/solucoes/eletrica/carregador-veicular/',
        '/nossos-servicos': '/solucoes',
        '/contatos': '/contato',
        '/sobre': '/quem-somos',
        '/empresa': '/quem-somos',
        '/solucoes/solar': '/energia-solar/',
        '/energia-solar-para-empresas': '/energia-solar/comercial/',
        '/energia-solar-para-fazendas': '/energia-solar/fazendas-e-irrigacao/',
        '/energia-solar-para-clinicas': '/energia-solar/hospitais-e-clinicas/',
        '/energia-solar-para-hoteis': '/energia-solar/hoteis-e-pousadas/',
        '/energia-solar-para-condominios': '/energia-solar/condominios/',
        '/energia-solar-para-supermercados': '/energia-solar/supermercados/',
        '/energia-solar-para-postos': '/energia-solar/postos-de-combustivel/',
        '/energia-solar-em-recife-pe': '/energia-solar/recife-pe/',
        '/energia-solar-em-caruaru-pe': '/energia-solar/caruaru-pe/',
        '/energia-solar-em-natal-rn': '/energia-solar/natal-rn/',
        '/energia-solar-em-joao-pessoa-pb': '/energia-solar/joao-pessoa-pb/',
        '/energia-solar-em-cajazeiras-pb': '/energia-solar/',
        '/energia-solar-em-sousa-pb': '/energia-solar/',
        '/energia-solar-em-patos-pb': '/energia-solar/',
        '/energia-solar-em-gravata-pe': '/energia-solar/',
        '/blog/quanto-custa-energia-solar-2026': '/blog/quanto-custa-instalar-energia-solar/',
        '/blog/payback-painel-solar-simulacao': '/blog/em-quanto-tempo-a-energia-solar-se-paga/',
        // 301 para URLs com slugs duplicados detectadas no Google Search Console
        '/solucoes/automacao/automacao': '/solucoes/automacao',
        '/joao-pessoa/solucoes/automacao/automacao': '/joao-pessoa/solucoes/automacao',
        '/joao-pessoa/solucoes/engenharia/engenharia': '/joao-pessoa/solucoes/engenharia',
        '/campina-grande/solucoes/automacao/automacao': '/campina-grande/solucoes/automacao'
    };

    // Redirecionamento genérico de segurança para qualquer slug duplicado no final (ex: /.../automacao/automacao -> /.../automacao)
    const duplicateSlugMatch = path.match(/^(.+)\/([a-z0-9-]+)\/\2$/);
    if (duplicateSlugMatch) {
        return res.redirect(301, `${duplicateSlugMatch[1]}/${duplicateSlugMatch[2]}`);
    }

    // Caso o path exato esteja no mapeamento, redireciona com status 301
    if (redirects[path]) {
        return res.redirect(301, redirects[path]);
    }

    // Suporte para URLs com prefixo de cidade caso existam
    // Ex: /campina-grande/nossos-servicos/klyfe-energia-solar -> /campina-grande/solucoes/... OR /energia-solar/
    const cityPattern = /^\/(campina-grande|joao-pessoa)(\/nossos-servicos\/[a-z0-9-]+)/;
    const match = path.match(cityPattern);
    if (match) {
        const cityPrefix = '/' + match[1];
        const oldServicePath = match[2];
        if (redirects[oldServicePath]) {
            // Energia solar agora é hub global (sem prefixo de cidade)
            if (redirects[oldServicePath].startsWith('/energia-solar')) {
                return res.redirect(301, redirects[oldServicePath]);
            }
            return res.redirect(301, cityPrefix + redirects[oldServicePath]);
        }
    }

    // /campina-grande/solucoes/solar -> /energia-solar/
    if (/^\/(campina-grande|joao-pessoa)\/solucoes\/solar$/.test(path)) {
        return res.redirect(301, '/energia-solar/');
    }

    // Fallback para qualquer outra rota sob "nossos-servicos" não mapeada exaustivamente
    if (path.startsWith('/nossos-servicos')) {
        return res.redirect(301, '/solucoes');
    }

    const cityFallbackPattern = /^\/(campina-grande|joao-pessoa)\/nossos-servicos/;
    const fallbackMatch = path.match(cityFallbackPattern);
    if (fallbackMatch) {
        const cityPrefix = '/' + fallbackMatch[1];
        return res.redirect(301, cityPrefix + '/solucoes');
    }

    next();
});

module.exports = router;
