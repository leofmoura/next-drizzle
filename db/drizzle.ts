// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import * as schema from "@/db/schema";

// const sql = neon(process.env.NEON_DATABASE_URL!);

// const db = drizzle(sql, { schema, logger: true });

// export default db;

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString!, { prepare: false });
export const db = drizzle(client, { schema, logger: true });
