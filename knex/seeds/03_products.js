exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('product').del().then(function () {
        // Inserts seed entries
        return knex('product').insert([
            {
                id: 1,
                category_id : 1,
                user_id : 1,
                size_id : 2,
                image : 'abc.js',
                product_name : 'áo dài tay',
                quantity : 1,
                description : 'áo dài tay cho nam, đẹp thời thượng, phong cách'
            },
            {
                id: 2,
                category_id : 1,
                user_id : 1,
                size_id : 2,
                image : 'asd.js',
                product_name : 'áo ngắn tay',
                quantity : 1,
                description : 'áo ngắn tay cho nữ, đẹp thời thượng, phong cách, thẩm mỹ'
            },
            {
                id: 3,
                category_id : 1,
                user_id : 1,
                size_id : 2,
                image : 'zxc.js',
                product_name : 'quần tây',
                quantity : 1,
                description : 'quần tây cho nam, lịch lãm, phong cách, sang trọng'
            }
        ]);
    });
};