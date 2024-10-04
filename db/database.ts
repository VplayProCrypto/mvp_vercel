import { Pool } from 'pg'

export const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
})

// When your application is shutting down
process.on('SIGINT', () => {
  pool.end()
})
