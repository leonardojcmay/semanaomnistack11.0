//Geração do id
const crypto = require('crypto');
//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {

    //Listar todas as ongs do banco de dados
    async index(request, response) {
        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        const ongs = await connection('ongs').select('*');
    
        //Retornando resposta
        return response.json(ongs);
    },

    //Cadastro de uma nova ONG
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        //Criar o id
        const id = crypto.randomBytes(4).toString('HEX');//Vai gerar 4 bits de catacteres aleatórios, e irá converter estes caracteres em uma String do tipo hexadecimal

        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        //Retornando resposta
        return response.json({ id });
    }
};