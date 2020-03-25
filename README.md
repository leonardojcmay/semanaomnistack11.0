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
