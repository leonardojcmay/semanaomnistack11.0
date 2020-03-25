
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();//Primary Key
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();//Armazenar qual é a ONG que criou este incidente

        table.foreign('ong_id').references('id').inTable('ongs');//Criar a chave estrangeira: a coluna ong_id referencia a coluna id da tabela ongs
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
