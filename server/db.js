const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'ancuta',
  password: '1234',
  host: 'localhost',
  port: 5000,
  database: 'pacientmedicalrecord',
});

module.exports = pool;
