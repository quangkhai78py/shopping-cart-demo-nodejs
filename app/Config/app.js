require('dotenv').config();

const app = {
    DOMAIN: process.env.DOMAIN,
    EXPIRES_IN: process.env.EXPIRES_IN,
};

module.exports = app