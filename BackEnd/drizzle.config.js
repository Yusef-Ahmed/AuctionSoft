import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DB URL is missing");
}
export default defineConfig({
  schema: "./src/database/schema.js",
  out: "./src/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  dialect: "mysql",
});
