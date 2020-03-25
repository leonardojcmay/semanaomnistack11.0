# Aula 01 - 23/03/2020

## **Back-end:** Node.js

**Criação do projeto:**
```
mkdir backend
```

**Criando projeto node:**
```
npm init -y

npm install express
```

Criar manualmente o arquivo ***index.js***

**Comando para executar back-end:**
```
node index.js
```

Imagem 01: back-end - Hello World
<br>Imagem 02: back-end - JSON

---

## **Front-end:** React

**Criando projeto React:**
```
npx create-react-app frontend
```

**Comando para executar front-end:**
```
npm start
```

Imagem 03: front-end - Hello World

---

## **Mobile:** React Native & Expo

---

# Aula 02 - 24/03/2020

## **Desenvolvimento do Back-end**

**Utilizar o Insomnia para fazer requisições:**
<br>**GET:** Buscar/listar uma informação do back-end.
<br>**POST:** Criar uma informação do back-end.
<br>**PUT:** Alterar uma informação do back-end.
<br>**DELETE:** Deletar uma informação do back-end.

---

**Tipos de parametros:**
<br>**Query Params:** Parametros nomeados enviados na rota após "?", servem para filtros, paginação.
<br>Exemplo: GET http://localhost:3333/users?page=2&nome=Leonardo&idade=22

Imagem 01 - Query Params Exemplo 1
<br>Imagem 02 - Query Params Exemplo 2

**Route Params:** Parametros utilizados para identificar recursos.
<br>Exemplo buscar pelo id: GET http://localhost:3333/users/1

Imagem 03 - Route Params Exemplo 1
<br>Imagem 04 - Route Params Exemplo 2

**Request Body:** Corpo da requisição, utilizado para criar ou alterar recursos.
<br>Exemplo: POST http://localhost:3333/users

Imagem 05 - Request Body 1
<br>Imagem 06 - Request Body 2

---

**Nodemon:** instalar ferramenta Nodemon, auxilia para que não seja necessário toda vez que fizer uma modificação ter que restartar o back-end. Ele faz este serviço automaticamente.

```
npm install nodemon -D
```

Alterar no ***package.json***:
```
"scripts": {
   "start": "nodemon index.js"
}
```

Após isto rodar o comando abaixo para iniciar o back-end: 
```
npm start
```

---

**Banco de dados:**
<br>Exemplos:
<br>**SQL:** MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
<br>**NoSQL:** MongoDB, CouchDB, etc

Nesta aplicação será utilizado o ***SQLite***

Configurando SQLite:
<br>**Driver:** SELECT * FROM users
<br>**Query Builder:** table('users').select('*').where()

Vamos utilizar o ***Query Builder*** : **KNEX.JS (http://knexjs.org/)**

**Intalando Knex:**
```
npm install knex

npm install sqlite3
```

**Conexão com o Bando de dados:**
```
npx knex init
```

Estruturando backend, criando pasta src, arquivo routes.

<br>**Arquivo knexfile.js:**
```
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    }
  },
```

**Entidades:**
<br>- Ong
<br>- Caso(incident)

**Funcionalidades:**
<br>- Login de ONG
<br>- Logout de ONG
<br>- Cadastro de ONG
<br>- Cadastrar novos casos
<br>- Deletar casos
<br>- Listar casos Eespecificos de uma ONG
<br>- Listar todos os casos
<br>- Entra em contato com a ONG

**Criação das tabelas do banco:**
<br>http://knexjs.org/#Migrations

**Arquivo knexfile.js:**
```
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
```

**Exemplo:**
criando migration create_ongs
```
npx knex migrate:make create_ongs 
```

Após inserir todas as informações da tabela, exemplo create_ongs:
```
//Método up: o que você quer que seja feito
exports.up = function(knex) {
    //Criação da tabela ONGs
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();//Limitando campo com 2 caracteres
  })
};

//Método down: caso de algum erro, precisa desfazer o que fez, deletar a tabel
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  
}; 
```

**Executar comando abaixo para criar a tabela no banco de dados:**
```
npx knex migrate:latest
```

**Comando para desfazer a ultima migration, caso tenha feito errado:**
```
npx knex migrate:rollback
```

**Comando para ver as migrations que foram já criadas:**
```
npx knex migrate:status
```

---

**Criação das rotas, controllers...**
<br> Código esta todo comentado explicando cada passo

---

**Adicionando o CORS:**
<br>O cors determina quem poderá acessar a aplicação
```
npm install cors
```

Arquivo index.js:
```
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
```
