//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {

    //Listar casos especificos de uma ONG
    async index(request, response) {
        //Acessando os dados da ong que esta logada
        const ong_id = request.headers.authorization;

        //Buscar todos os incidentes que foi a ong que esta logada que criou
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');//Buscando todos os incidentes
        
        return response.json(incidents);

    }
}