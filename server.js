const express = require('express');
const path = require('path');
const app = express();

// Configurações do Express e EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Fallback para rota 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página Não Encontrada | Klyfe Electric',
        description: 'A página que você está procurando não existe.',
        canonical: 'https://www.klyfeelectric.com.br/404',
        page: '404'
    });
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
