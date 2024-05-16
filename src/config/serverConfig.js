const dotenv = require('dotenv');
const { Router } = require('express');

dotenv.config();

module.exports = {
    PORT: process.env.PORT
}