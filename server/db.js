//const Pool = require('pg').Pool;
//require('dotenv').config();
// import pkg from 'pg';
// const  Pool  = pkg;

// const pool = new Pool({
//   user: 'ancuta',
//   password: '1234',
//   host: 'localhost',
//   port: 5432,
//   database: 'pacientmedicalrecord',
// });

// //module.exports = pool;

// export default pool;

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'ancuta',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'pacientmedicalrecord',
});

export default pool;