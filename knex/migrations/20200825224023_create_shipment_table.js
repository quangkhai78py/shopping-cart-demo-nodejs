exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('shipment', function (table) {
            table.increments().primary();
            table.integer('user_id').unsigned().index().references('id').inTable('users')
                .onDelete('restrict').onUpdate('cascade');
            table.integer('order_id').unsigned().index().references('id').inTable('orders')
                .onDelete('restrict').onUpdate('cascade');
            table.string('carrier_company');
            table.integer('carrier_id');
            table.integer('tracking_id');
            table.enum('status', ['preparing','shipped', 'delivered']);
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('shipment')
    ])
};
