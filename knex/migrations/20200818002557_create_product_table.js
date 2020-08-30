exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('product', function (table) {
            table.increments().primary();
            table.integer('category_id',11);
            table.integer('user_id',11);
            table.integer('size_id', 11);
            table.string('image', 255);
            table.string('product_name',255);
            table.integer('quantity',11);
            table.integer('price').unsigned();
            table.text('description');
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('product')
    ])
};