/*

Rotas / Recursos

Métodos HTTP:
GET: Buscar/listar uma informação do back-end
POST: Criar uma informação do back-end
PUT: Alterar uma informação do back-end
DELETE: Deletar uma informação do back-end

Tipos de parametros:
Query Params: Parametros nomeados enviados na rota após "?", 
servem para filtros, paginação.
Exemplo: GET http://localhost:3333/users?page=2&nome=Leonardo&idade=22

Route Params: Parametros utilizados para identificar recursos
Exemplo buscar pelo id: GET http://localhost:3333/users/1

Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
Exemplo: POST http://localhost:3333/users

Banco de dados:
Exemplos:
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
NoSQL: MongoDB, CouchDB, etc

Nesta aplicação será utilizado o SQLite

Configurando SQLite:
Driver: SELECT * FROM users
Query Builder: table('users').select('*').where()

Vamos utilizar o Query Builder: KNEX.JS(http://knexjs.org/)
*/

const express = require('express');

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
    const body = request.body;

    console.log(body);

    return response.json({
        "evento": 'semana omnistack',
        "aluno": 'leonardo may'
    });
});

app.listen(3333);