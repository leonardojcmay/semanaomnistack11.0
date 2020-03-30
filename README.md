# **Be The Hero**

## WEB:
![1-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/1-web.png?raw=true "1-web")
![2-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/2-web.png?raw=true "2-web")
![3-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/3-web.png?raw=true "3-web")
![4-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/4-web.png?raw=true "4-web")
![5-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/5-web.png?raw=true "5-web")
![6-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/6-web.png?raw=true "6-web")
![7-web](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/web/7-web.png?raw=true "7-web")

---

## MOBILE:
<!--![1-mobile](https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/mobile/1-mobile.jpeg?raw=true "1-mobile")
-->
<img src="https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/mobile/1-mobile.jpeg?raw=true" width=45% display: flex justify-content: space-evenly/>

<img src="https://github.com/leonardojcmay/semanaomnistack11.0/blob/master/imagens/mobile/2-mobile.jpeg?raw=true" width=45% display: flex justify-content: space-evenly/>

---

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

**Comando para startar aplicação:**
***Back-end: npm start***
***Front-end: npm start***
***Mobile: yarn start***

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

---

# Aula 03 - 25/03/2020

## **Desenvolvimento do Front-end**

<br>Limpando estrutura inicial: contém imagem de como ficou a estrutura

**Iniciando aplicação:**
```
npm start
```

**Conceitos do React:**
<br>React primeiro lê todas informações que estão no index.html e depois a partir index.js começa a ler os outros arquivos .js

Componente no React, é uma função que retorna HTML e também pode ter outras funcionalidades utilizando js, css... 

JSX: é quando o arquivo HTML esta escrito dentro de um arquivo JavaScript

Propriedade e Estado

---

**Exemplo:** contador de números. Primeiro commit da Aula 03 - front-end.

Criando a primeira página:

Página de login:
criado index.js, styles.css

Fonte letra utilizada: Roboto
<br>Icons utilizados: https://feathericons.com/

Integrando pacote de icons com o frontend:
```
npm install react-icons
```
---

**Configurando rotas da aplicação:**

Instalar parte de rotas da aplicação:
```
npm install react-router-dom
```
---

**Ordem de criação das páginas:**
<br>*Login*
<br>*Register: cadastro de ONGs*
<br>*Listagem de casos*
<br>*Cadastro de novos casos*

---

**Conectar o front-end com o back-end:**
<br>Ir na pasta do backend e iniciar o servidor
```
npm start
```

Conectando React com o Node.js:
<br>Instalar client http:
```
npm install axios
```

**Arquivo services/api.js**
<br>Importando pacote de conexão com banco de dados.
```
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;
```

---

# Aula 04 - 26/03/2020

## **Desenvolvimento do Mobile**

React Native & Expo

**Instalando Expo:**
<br>Irá instalar ele globalmente na máquina, assim poderá utilizá-lo em qualquer outro projeto.
```
npm install -g expo-cli
```
Verificando se foi instalado:
```
expo -h
```

**Criando projeto mobile:**
```
expo init mobile
```
Template: blank

**Executando software no celular:**
<br>Iniciando aplicação:
```
yarn start
```

**Acessando expo no celular**

**Site interessante:** é possivel ver o resultado direto na web
<br>https://snack.expo.io/

**Configurando icone e Splash Screen:**
<br>Colocado imagens icons e splash dentro da pasta assets.
<br>Criado pasta pages.
<br>Definindo as rotas da aplicação.

**Instalando routes/rotas no expo:**
<br>https://reactnavigation.org/docs/getting-started
```
npm install @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

**Configurando as rotas:**
<br>Esta opção que vamos utilizar nesta aplicação, é utilizada quando se contém mais a navegação por botões.
<br>https://reactnavigation.org/docs/hello-react-navigation

**Instalando o stack navigation:**
```
npm install @react-navigation/stack
```

**Instalando pacote para que os dados da aplicação não fiquem em cima da status bar:**
```
expo install expo-constants
```

---

Fazendo funções do E-mail e do Whatsapp:

**E-mail:** 
<br>Instalar pacote:
```
expo install expo-mail-composer
```
Documentação do mailComposer:
<br>https://docs.expo.io/versions/latest/sdk/mail-composer/

**Whatsapp:** feito configurações utilizando o função ***Linking***.

---

**Conectando mobile com a API**

**Instalar axios:**
```
npm install axios
```

Criado arquivo services/api.js

**Instalando pacote para formatação em R$:**
```
npm install intl
```
---

Código esta totalmente comentado, explicando todos os passos e informações que identifiquei importantes.

---

# Aula 05 - 27/03/2020

## **Funcionalidades Avançadas:**

**Validação de dados:**
<br>Instalar biblioteca: celebrate
<br>Documentação: https://github.com/arb/celebrate
<br>Celebrate integra o Joi(https://github.com/hapijs/joi) com o Express
```
npm install celebrate
```

---

**Adicionando testes:**

***TDD(Test-driven Development):***
<br>Segundo esta técnica fazemos os testes antes mesmo de terminar o desenvolvimento das funcionalidades.

Configurando Jest:
<br>https://jestjs.io/
```
npm install jest -D

npx jest --init

Y
node
N
y
```

**Testes de integração:** tests/integration
<br>São testes que irão testar o fluxo de uma rota inteira da aplicação.

**Teste unitário:** tests/unit
<br>Testa um pedaço da aplicação de uma forma muito isolada.

Para executar teste:
```
npm test
```

**Configurando banco de dados para testes:**
<br>Arquivo knexfile.js: adicionado configurações abaixo:
```
test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
```

Instalar pacote:
```
npm install cross-env
```

Arquivo package.json:
```
"scripts": {
    "start": "nodemon src/index.js",
    "test": "cross-env NODE_ENV=test jest"
  },
```

Verificar dados de conexão tambem no arquivo connection.js

**Fazendo teste de integração**
<br>Instalar pacote supertest: auxilia nos logs. Instalando como depencia de desesenvolvimento
```
npm install supertest -D
```

Alterado no do src/index.js para src app.js. Criado arquivo server.js

Arquivo package.json:
```
"scripts": {
    "start": "nodemon src/server.js",
    "test": "cross-env NODE_ENV=test jest"
  },
```

Após isto, fazer a criação dos arquivo de integração e executar o comando:
```
npm test
```

Exemplo para quando precisar do authorization, por exemplo na rota /profile:

```
//Testando se é possivel a listagem da Profile de uma ONG
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .get('/profile')
    .set('Authorization', 'idValidoOng')
    .send({
        name: "APAD2",
        email: "teste@apad.com",
        whatsapp: "554700000000",
        city: "Gravatal",
        uf: "SC"
  });
```

---

**<h1>Deploy:</h1>**
Indicação de onde hospedar a aplicação:

**Node.js: back-end**
<br>Aplicações pequenas: Heroku
<br>https://www.youtube.com/watch?v=-j7vLmBMsEU

Aplicações maiores/comercial: DigitalOcean
<br>https://www.youtube.com/watch?v=ICIz5dE3Xfg

Aplicações muito maiores:
<br>*AWS*
<br>*Google Cloud Platform*
<br>*Microsoft Razor*

**React: front-end**
<br>Aplicações pequenas: netlify
<br>https://www.netlify.com/

**React Native: mobile**
<br>https://www.youtube.com/watch?v=wYMvzbfBdYI

---

**Recomendações de estudo:**
<br>Padrões de código: ESLint, Prettier
<br>Autenticação JWT
<br>Styled Components
