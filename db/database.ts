import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const db = async (): Promise<NodePgDatabase> => {
  const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "db_name",
  });

  await client.connect();
  return drizzle(client);
};
