//  this will create the connection when running PostGreSQL
const { Pool } = require('pg');

//const pool = new Pool();
const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'carouselStyles',
  password: 'dhaka2',
  port: 5432,
})
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pgPool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
// async/await - check out a client
;(async () => {
  const client = await pgPool.connect()
  try {
    const res = await client.query('SELECT * FROM junk');
    console.log(res.rows[0]);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch(err => console.log(err.stack))



module.exports = pgPool;