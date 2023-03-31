const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'pacientmedicalrecord',
});

module.exports = pool;
