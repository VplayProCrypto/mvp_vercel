import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "mvp",
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 3000, // Maximum time a client can remain idle before being closed
  connectionTimeoutMillis: 2000, // Maximum time to wait for a new connection
});

export const db = async (): Promise<NodePgDatabase> => {
  const client = await pool.connect();
  return drizzle(client);
};

// When your application is shutting down
process.on("SIGINT", () => {
  pool.end();
});
