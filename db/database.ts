import { readFileSync } from 'fs'
import { Pool } from 'pg'
import { env } from 'process'

import { join } from 'path'

export const pool = new Pool({
  host: env.AWS_TIMESCALE_HOST || 'localhost',
  port: Number(env.AWS_TIMESCALE_PORT) || 5432,
  user: env.AWS_TIMESCALE_USER || 'postgres',
  password: env.AWS_TIMESCALE_PASSWORD || 'postgres',
  database: env.AWS_TIMESCALE_DATABASE || 'postgres',
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
    // cert: readFileSync(join(process.cwd(), 'db/cert.crt')).toString(),
    // key: readFileSync(join(process.cwd(), 'db/key.key')).toString(),
    cert: Buffer.from(env.SSL_CERT || '', 'base64').toString(),
    key: Buffer.from(env.SSL_KEY || '', 'base64').toString(),
  },
})

// When your application is shutting down
process.on('SIGINT', () => {
  pool.end()
})
