const mysql = require('mysql');
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'svghunter.com',
  user: 'gomot1_upright_student',
  password: process.env.DATABASE_PASSWORD,
  database: 'gomot1_upright_svghunter',
});

module.exports = db;
