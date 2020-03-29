//Conexão com o banco de dados
const knex = require('knex');
const configuration = require('../../knexfile');

//Conectando com os dados do arquivo knexfile, os dados da conexão do banco de dados development
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;//Pegando variavel ambiente para conexão no banco de dados de testes

const connection = knex(config);//Banco de dados

module.exports = connection;