const defaultData = require('./default');
const cgData = require('./campina-grande');
const jpData = require('./joao-pessoa');

/**
 * Mapeamento central de localizações e serviços.
 * Para adicionar uma nova cidade, crie um arquivo na pasta 'locations'
 * e adicione a referência aqui.
 */
module.exports = {
  'default': defaultData,
  'campina-grande': cgData,
  'joao-pessoa': jpData
};
