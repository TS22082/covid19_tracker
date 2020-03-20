const mysql = require('mysql2/promise');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'covid19'
});

module.exports = db;
