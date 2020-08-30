exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('orders', function (table) {
            table.increments().primary();
            table.integer('user_id').unsigned().index().references('id')
                .inTable('users').onDelete('restrict').onUpdate('cascade');
            table.integer('product_id').unsigned().index().references('id')
                .inTable('product').onDelete('restrict').onUpdate('cascade');
            table.integer('quantity').unsigned();
            table.integer('sub_total').unsigned();
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('orders')
    ])
};