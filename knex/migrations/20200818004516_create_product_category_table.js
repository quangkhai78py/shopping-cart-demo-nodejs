exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('product_category', function (table) {
            table.increments().primary();
            table.string('category',255);
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('product_category')
    ])
};