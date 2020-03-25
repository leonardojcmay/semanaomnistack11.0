//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {
    //Login
    async create(request, response) {
        //Verificar se realmente a ong existe
        const { id } = request.body;//Buscando o id atraves do corpo da requisição
        
        //Buscar ong do banco de dados
        const ong = await connection('ongs')
            .where('id', id)//Verificando se o id tem cadastrado
            .select('name')//Retorna somente o nome da ong para o front-end
            .first();//Método first retornando apenas uma unica ong, pois esta buscando pelo id
        
        //Caso a ong não existir
        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        //Se tudo der certo, irá retornar os dados da ong
        return response.json(ong);
    }
}
