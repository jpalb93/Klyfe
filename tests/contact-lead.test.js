const assert = require('node:assert/strict');
const { validateContactLead, validateWallboxBriefLead } = require('../lib/contact-lead');

const valid = validateContactLead({
    nome: 'Ana Silva', email: 'ana@example.com', telefone: '(83) 99999-1234',
    cidade: 'Campina Grande', servico: 'Engenharia e Projetos', mensagem: 'Preciso de um projeto elétrico.'
});
assert.equal(valid.valid, true);
assert.equal(valid.lead.telefone, '83999991234');
assert.equal(valid.lead.mensagem, 'Preciso de um projeto elétrico.');

const invalid = validateContactLead({ nome: 'A', email: 'invalido', telefone: '123', cidade: '', servico: '' });
assert.equal(invalid.valid, false);
assert.ok(invalid.errors.length >= 4);

// Mensagens longas são limitadas antes de chegar ao CRM.
const bounded = validateContactLead({
    nome: 'Ana Silva', email: 'ana@example.com', telefone: '83999991234',
    cidade: 'Campina Grande', servico: 'Engenharia', mensagem: 'x'.repeat(5000)
});
assert.equal(bounded.lead.mensagem.length, 4000);

const wallbox = validateWallboxBriefLead({
    nome: 'João Silva', telefone: '(83) 99999-1234', cidade: 'Campina Grande',
    perfil: 'Casa', veiculo: 'BYD Song', possui_carregador: 'Não', distancia_quadro_vaga: '6–10 m'
});
assert.equal(wallbox.valid, true);
assert.equal(wallbox.lead.servico, 'Instalação de Wallbox');
assert.match(wallbox.lead.mensagem, /Distância entre quadro e vaga/);

const invalidWallbox = validateWallboxBriefLead({
    nome: 'João', telefone: '123', cidade: 'CG', perfil: 'Outro', possui_carregador: 'Não sei', distancia_quadro_vaga: ''
});
assert.equal(invalidWallbox.valid, false);
assert.ok(invalidWallbox.errors.length >= 4);

console.log('contact-lead.test.js: OK');
