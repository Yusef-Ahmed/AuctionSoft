const {
  bigint,
  mysqlTable,
  varchar,
  decimal,
  serial,
  tinyint,
  timestamp,
} = require("drizzle-orm/mysql-core");

exports.users = mysqlTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull().unique(),
  email: varchar({ length: 256 }).notNull().unique(),
  password: varchar({ length: 256 }).notNull(),
});

exports.products = mysqlTable("products", {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull().unique(),
  image: varchar({ length: 256 }).notNull(),
  price: decimal({ precision: 9, scale: 2 }).notNull(),
  ex_date: timestamp().notNull(),
  seller_id: bigint({ mode: 'number', unsigned: true }).references(() => this.users.id).notNull(),
  buyer_id: bigint({ mode: 'number', unsigned: true }).references(() => this.users.id).notNull(),
});

exports.reviews = mysqlTable("reviews", {
  id: serial().primaryKey(),
  review: varchar({ length: 256 }).notNull().unique(),
  rating: tinyint().notNull(),
  seller_id: bigint({ mode: 'number', unsigned: true }).references(() => this.users.id).notNull(),
});
