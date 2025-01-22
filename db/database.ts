import { readFileSync } from 'fs'
import { Pool } from 'pg'
import { env } from 'process'

import { join } from 'path'

console.log(
  'env.AWS_TIMESCALE_HOST: ' + process.env.AWS_TIMESCALE_HOST,
  'env.AWS_TIMESCALE_PORT: ' + process.env.AWS_TIMESCALE_PORT,
  'env.AWS_TIMESCALE_USER: ' + process.env.AWS_TIMESCALE_USER,
  'env.AWS_TIMESCALE_DATABASE: ' + process.env.AWS_TIMESCALE_DATABASE
)

export const pool = new Pool({
  host: process.env.AWS_TIMESCALE_HOST || 'localhost',
  port: Number(process.env.AWS_TIMESCALE_PORT) || 5432,
  user: process.env.AWS_TIMESCALE_USER || 'postgres',
  password: process.env.AWS_TIMESCALE_PASSWORD || 'postgres',
  database: process.env.AWS_TIMESCALE_DATABASE || 'postgres',
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
    cert: Buffer.from(process.env.SSL_CERT || '', 'base64').toString(),
    key: Buffer.from(process.env.SSL_KEY || '', 'base64').toString(),
  },
})

// When your application is shutting down
process.on('SIGINT', () => {
  pool.end()
})
