//Conexão com banco de dados
const connection = require('../database/connection');

module.exports = {

    //Deletar um incidente
    async delete(request, response) {
        //Pegar o id que vem do request.params
        const { id } = request.params;
        //Pegar o id da ONG logada, para verificar se realmente o incidente que esta sendo deletado foi criado pela ONG logada
        const ong_id = request.headers.authorization;

        //Verificar se realmente o incidente que esta sendo deletado foi criado pela ONG logada
        const incident = await connection('incidents')
            .where('id', id)//Busca o incidente pelo id
            .select('ong_id')//Seleciona apenas a coluna ong_id
            .first();//Método first retorna apenas um resultado

        //Verificando se o ong_id for diferente do ong_id que esta logado, irá lhe retornar um erro
        if (incident.ong_id != ong_id) {
            return response.status(401).json( 'Operation not permitted.');//401: usuario não autorizado
        }

        //Se deu certo, irá deletar do banco de dados
        await connection('incidents').where('id', id).delete();
      
        //Retornando resposta
        return response.status(204).send();//204: Quando retorna alguma responsa que não tem nenhum conteúdo para o usuario
    },

    //Listar todos os incidentes do banco de dados
    async index(request, response) {

        //Fazer com que não retorne todos os incidentes de uma só vez
        //Buscar de dentro do request.query
        const { page = 1 } = request.query;//parametro chamado page, caso não existir irá usar por padrão o valor de 1
        
        //Retornar o total de incidentes que contem na base de dados
        const [count] = await connection('incidents')
            .count();

        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//Listar os dados das ongs nos json incidents também
            .limit(5)//Limitando a busca no bando de dados para 5 registros
            .offset((page - 1) * 5)//Pular 5 registros por página, sempre pegando os próximos 5 registros
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);//Mostrar no JSON todos os dados dos incidentes, porém da tabela ongs listar somente name, email, whatsapp, city, uf

        //Retornando o total de inicidentes no cabeçalho da responta
        response.header('X-Total-Count', count['count(*)']);//Total de incidentes que contem na lista
    
        //Retornando resposta
        return response.json(incidents);
    },

    //Cadastro de um incidente
    async create(request, response) {
        const { title, description, value } = request.body;

        //O Id ele cria/incrementa automaticamente

        //Precisa do id da ong para salvar na ong_id
        //Vai ser utilizado as informações do cabeçalho/header, ou seja, a ong que esta logada no sistema
        const ong_id = request.headers.authorization;

        //Conexão com o banco de dados
        //async / await: somente irá retornar alguma resposta após efetuar a conexão no banco de dados ou qualquer outra operação que esteja no await
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        //Retornando resposta
        return response.json({ id });
    }
};