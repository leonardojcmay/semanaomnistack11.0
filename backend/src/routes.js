//Pacote inicial para iniciar o projeto
const express = require('express');

//Importando celebrate: faz a validação dos campos
const { celebrate, Segments, Joi } = require('celebrate');

//Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Listar casos especificos de uma ONG
//Fazendo a validação dos campos
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),//Authorization precisa ser uma string e obrigatoria
    }).unknown(),
}), ProfileController.index);

//Deletar um incidente
//Fazendo a validação dos campos
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),//ID é um numero e obrigatorio
    })
}), IncidentController.delete);

//Listar todos os incidentes do banco de dados
//Fazendo a validação dos campos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),//Page precisa ser numerica
    })
}), IncidentController.index);

//Cadastro de um novo incidente
routes.post('/incidents', IncidentController.create);

//Listar todas as ongs do banco de dados
routes.get('/ongs', OngController.index);

//Cadastro de uma nova ONG
//Fazendo a validação dos campos
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),//Nome ele é uma string e é obrigatorio
        email: Joi.string().required().email(),//Email é uma string, é obrigatório e tem que ser no formato de e-mail
        whatsapp: Joi.string().required().min(12).max(13),//Whatsapp é do tipo numero, no minimo 12 caracteres e no maximo 13
        city: Joi.string().required(),//City é uma string e obrigatorio
        uf: Joi.string().required().length(2),//Uf é uma string obrigatorio e o tamanho no maximo de 2 caracteres
    })
}), OngController.create);

module.exports = routes;