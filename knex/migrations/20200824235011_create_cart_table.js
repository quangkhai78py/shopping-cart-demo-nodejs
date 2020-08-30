exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('cart', function (table) {
            table.increments().primary();
            table.integer('product_id').unsigned().index().references('id')
                .inTable('product').onDelete('restrict').onUpdate('cascade');
            table.integer('user_id').unsigned().index().references('id')
                .inTable('users').onDelete('restrict').onUpdate('cascade');
            table.integer('quantity').unsigned();
            table.integer('sub_total').unsigned();
            table.integer('order_id').unsigned().index().references('id').inTable('orders').onDelete('restrict').onUpdate('cascade');
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('cart')
    ])
};
