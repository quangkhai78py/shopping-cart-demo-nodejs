exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('size', function (table) {
            table.increments().primary();
            table.string('size',255);
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('size')
    ])
};