import { pool } from "../db/database";
import { drizzle } from "drizzle-orm/node-postgres";
import { collections } from "../db/tables";
console.log("Hello via Bun!");

const client = await pool.connect();
const drizzleClient = drizzle(client);

const result = await drizzleClient.select().from(collections).limit(1);

console.log(result);
client.release();
