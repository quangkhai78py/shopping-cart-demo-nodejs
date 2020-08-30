
const { Model } = require("objection");
require('dotenv').config();

const options = {
    client : 'mysql',
    connection : {
        host : process.env.DB_HOST,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        charset: 'utf8',
    },
}

const Knex = require('knex')(options);

Model.knex(Knex);

module.exports = Model;

