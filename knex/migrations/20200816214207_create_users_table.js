exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments().primary();
            table.string('name',254).collate('utf8mb4_unicode_ci');
            table.string('email',254).unique();
            table.string('password');
            table.string('phone',32);
            table.string('street',255).collate('utf8mb4_unicode_ci');
            table.string('city',200).collate('utf8mb4_unicode_ci');
            table.string('country',200).collate('utf8mb4_unicode_ci');
            table.timestamps();
        })
    ])
};
//Rollback migration
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
};