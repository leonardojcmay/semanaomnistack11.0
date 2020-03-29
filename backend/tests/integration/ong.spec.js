//Teste de funcionalidades da ONG
//Importando pacote que auxilia nos logs
const request = require('supertest');
//Importando app.js para fazer os testes
const app = require('../../src/app');
//Importando conexão com o banco de dados
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //Executando as migrations para criação do banco de dados de test
    beforeEach(async () => {
        //Zerando todo banco de dados antes de começar os testes
        await connection.migrate.rollback();
        //Criando todas as migrations
        await connection.migrate.latest();
    });

    //Desfazendo a conexão do test com o banco de dados
    afterAll(async () => {
        await connection.destroy();
    });

    //Testando se é possivel a criação de uma nova ONG
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "teste@apad.com",
                whatsapp: "554700000000",
                city: "Gravatal",
                uf: "SC"
        });
    
    console.log(response.body);
    
    expect(response.body).toHaveProperty('id');//Espera que dentro da resposta do body contenha id
    expect(response.body.id).toHaveLength(8);//Espera que o id contenha 8 carazteres
    
    });
});