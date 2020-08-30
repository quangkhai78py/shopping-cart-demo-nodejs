exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del().then(function () {
        // Inserts seed entries
        return knex('users').insert([
            {
                id: 1,
                name : "khaitq",
                email: 'nigel@email.com',
                password: 'dorwssap',
                phone : '0967577849',
                street : '03pastuer-haichau',
                city : 'Da Nang',
                country : 'Viet Nam'
            },
            {
                id: 2,
                name : 'quangkhai',
                email: 'nakaz@email.com',
                password: 'password1',
                phone : '0967577849',
                street : '03pastuer-haichau',
                city : 'Da Nang',
                country : 'Viet Nam'
            },
            {
                id: 3,
                name : "nguyenvana",
                email: 'jaywon@email.com',
                password: 'password123',
                phone : '0967577849',
                street : '03pastuer-haichau',
                city : 'Da Nang',
                country : 'Viet Nam'
            }
        ]);
    });
};