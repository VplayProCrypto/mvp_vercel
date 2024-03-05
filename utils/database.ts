import { Database } from './apiTypes.ts'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'mvp',
    host: 'localhost',
    user: 'saturn',
    port: 5432,
    max: 10
  })
});

export const db = new Kysely<Database>({
  dialect
});
