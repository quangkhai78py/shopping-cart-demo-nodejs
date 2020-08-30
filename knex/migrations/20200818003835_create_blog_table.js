exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('blog', function (table) {
            table.increments().primary();
            table.integer('category_id',11);
            table.text('title');
            table.string('image', 255);
            table.text('content');
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('blog')
    ])
};