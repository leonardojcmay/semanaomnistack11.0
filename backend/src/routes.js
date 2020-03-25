//Pacote inicial para iniciar o projeto
const express = require('express');

//Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Listar casos especificos de uma ONG
routes.get('/profile', ProfileController.index);

//Deletar um incidente
routes.delete('/incidents/:id', IncidentController.delete);

//Listar todos os incidentes do banco de dados
routes.get('/incidents', IncidentController.index);

//Cadastro de um novo incidente
routes.post('/incidents', IncidentController.create);

//Listar todas as ongs do banco de dados
routes.get('/ongs', OngController.index);

//Cadastro de uma nova ONG
routes.post('/ongs', OngController.create);

module.exports = routes;