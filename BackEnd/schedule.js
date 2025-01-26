const cron = require("node-cron");
const db = require("./util/database/setup");
const { products, transactions } = require("./util/database/schema");
const { sql } = require("drizzle-orm");

const task = cron.schedule("* * * * *", async () => {
  try {
    const selectedProducts = await db
      .select()
      .from(products)
      .where(sql`products.ex_date <= CONVERT_TZ(CURRENT_TIMESTAMP, @@session.time_zone, '+00:00')`);
    if (selectedProducts.length) {
      await db.insert(transactions).values(selectedProducts);
      await db
        .delete(products)
        .where(sql`products.ex_date <= CURRENT_TIMESTAMP`);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = task;
