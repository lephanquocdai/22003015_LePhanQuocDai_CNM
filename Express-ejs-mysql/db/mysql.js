const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopdb'
});


module.exports = pool.promise();