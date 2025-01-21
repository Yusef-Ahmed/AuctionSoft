const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2");
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error("DB credentials error");
}
const connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = db = drizzle(connection);
