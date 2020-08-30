
require('dotenv').config();
// Update with your config settings
const development = {
  client : 'mysql',
  connection : {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    charset: 'utf8',
  },
  pool : {
    max : (process.env.DB_MAX_POOL) ? parseInt(process.env.DB_MAX_POOL) : 50,
    min : 1
  },
  migrations: {
    directory: __dirname + '/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/knex/seeds'
  }
}

console.log("knex file config", development);

module.exports = development;
