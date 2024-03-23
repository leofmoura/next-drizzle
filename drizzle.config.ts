import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  breakpoints: false,
  verbose: true,
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
