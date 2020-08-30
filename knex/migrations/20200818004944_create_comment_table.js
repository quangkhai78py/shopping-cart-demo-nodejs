exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('comment', function (table) {
            table.increments().primary();
            table.integer('user_id',11);
            table.integer('blog_id',11);
            table.integer('product_id',11);
            table.text('comment');
            table.string('avatar', 255);
            table.integer('comment_id', 11);
            table.integer('active', 11).defaultTo(0);
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('comment')
    ])
};