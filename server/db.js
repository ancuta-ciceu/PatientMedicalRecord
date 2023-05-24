
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