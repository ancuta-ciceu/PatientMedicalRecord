const Pool = require('pg').Pool;
//require('dotenv').config();

const pool = new Pool({
  user: 'ancuta',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'pacientmedicalrecord',
});

module.exports = pool;
