const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const locations = require('./config/locations'); // Carregado uma única vez (Eficiência)

const app = express();

// ═══ SEGURANÇA (Helmet) ═══
// Configuração básica para proteger headers e mitigar ataques comuns
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://www.klyfeelectric.com.br", "https://wa.me"],
            connectSrc: ["'self'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false
}));

// Header Permissions-Policy para controlar acesso a recursos do navegador
app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
});

// ═══ PERFORMANCE (Gzip Compression) ═══
// Comprime as respostas para acelerar o carregamento (LCP)
app.use(compression());

// ═══ PROTEÇÃO CONTRA SPAM (Rate Limit) ═══
// Limita requisições para evitar abusos (DoS/Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
    message: 'Muitas requisições vindas deste IP, tente novamente mais tarde.'
});
app.use('/contato', limiter); // Aplica apenas na rota de contato para não afetar navegação

// Configurações do Express e EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(process.cwd(), 'public')));

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para globais de visualização
app.use((req, res, next) => {
    res.locals.cityKey = 'default';
    res.locals.cityData = locations['default'];
    res.locals.page = '';
    next();
});

// Importar rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// ═══ TRATAMENTO DE ERROS (Fallback 404) ═══
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página Não Encontrada | Klyfe Electric',
        description: 'A página que você está procurando não existe.',
        canonical: 'https://www.klyfeelectric.com.br/404',
        page: '404'
    });
});

// ═══ TRATAMENTO GLOBAL DE ERROS (500) ═══
// Evita que erros técnicos vazem para o usuário final
app.use((err, req, res, next) => {
    console.error(' [ERRO CRÍTICO]:', err.stack);
    res.status(500).render('404', { // Reusando o template 404 para simplicidade ou pode criar um 500.ejs
        title: 'Erro Interno | Klyfe Electric',
        description: 'Ocorreu um erro técnico inesperado. Nossa equipe já foi notificada.',
        canonical: 'https://www.klyfeelectric.com.br/',
        page: '500'
    });
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n [SISTEMA]: Servidor Klyfe Electric Protegido e Otimizado`);
    console.log(` [PORTA]: ${PORT}`);
    console.log(` [URL]: http://localhost:${PORT}\n`);
});

module.exports = app;

