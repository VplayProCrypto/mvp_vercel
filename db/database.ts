import { Pool } from 'pg'
import { env } from 'process'

console.log('Database connection variables:', {
  host: env.NEW_TIMESCALE_HOST,
  port: env.NEW_TIMESCALE_PORT,
  user: env.NEW_TIMESCALE_USER,
  database: env.NEW_TIMESCALE_DATABASE,
})

export const pool = new Pool({
  host: env.NEW_TIMESCALE_HOST || 'localhost',
  port: Number(env.NEW_TIMESCALE_PORT) || 5432,
  user: env.NEW_TIMESCALE_USER || 'postgres',
  password: env.NEW_TIMESCALE_PASSWORD || 'postgres',
  database: env.NEW_TIMESCALE_DATABASE || 'postgres',
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
})

// When your application is shutting down
process.on('SIGINT', () => {
  pool.end()
})
