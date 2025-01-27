const { eq, sql } = require("drizzle-orm");
const { products, transactions, users } = require("../util/database/schema");
const db = require("../util/database/setup");
const { validationResult } = require("express-validator");
const io = require("../socket");

exports.allProducts = async (_req, res, next) => {
  try {
    const allProducts = await db
      .select({ ...products, buyerName: users.name })
      .from(products)
      .leftJoin(users, eq(users.id, products.buyer_id))
      .where(
        sql`products.ex_date > CONVERT_TZ(CURRENT_TIMESTAMP, @@session.time_zone, '+00:00')`
      )
      .orderBy(products.ex_date);
    res.status(200).json(allProducts);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    return next(err);
  }

  if (!req.file) {
    const err = new Error("You need to upload image");
    err.statusCode = 422;
    return next(err);
  }

  const product = {
    name: req.body.name,
    image: req.file.filename,
    price: +req.body.price,
    ex_date: new Date(req.body.ex_date),
    seller_id: req.userId,
  };

  try {
    await db.insert(products).values(product);

    res.status(200).json({
      message: "Product created successfully",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.newBidder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    return next(err);
  }

  const productId = +req.body.productId;
  const buyerId = +req.userId;
  const buyerName = req.userName;
  const newPrice = +req.body.newPrice;

  try {
    const [product] = await db
      .select({
        seller_id: products.seller_id,
        price: products.price,
        ex_date: products.ex_date,
      })
      .from(products)
      .where(eq(productId, products.id));

    if (!product || new Date(product.ex_date) - new Date() < 0) {
      const err = new Error("The product doesn't exist anymore");
      err.statusCode = 404;
      return next(err);
    }

    if (buyerId == product.seller_id) {
      const err = new Error("You can't bid on you own product");
      err.statusCode = 403;
      return next(err);
    }

    if (newPrice <= +product.price) {
      const err = new Error("You need to bid with a bigger price");
      err.statusCode = 400;
      return next(err);
    }

    await db
      .update(products)
      .set({ price: newPrice, buyer_id: buyerId })
      .where(eq(productId, products.id));

    io.getIO().emit("products", {
      productId,
      newPrice,
      buyerId,
      buyerName,
    });

    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.sold = async (req, res, next) => {
  try {
    const products = await db
      .select({
        id: transactions.id,
        name: transactions.name,
        image: transactions.image,
        price: transactions.price,
        buyerName: users.name,
        buyerEmail: users.email,
      })
      .from(transactions)
      .leftJoin(users, eq(users.id, transactions.buyer_id))
      .where(eq(transactions.seller_id, req.userId));
    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.bought = async (req, res, next) => {
  try {
    const products = await db
      .select({
        id: transactions.id,
        name: transactions.name,
        image: transactions.image,
        price: transactions.price,
        sellerId: transactions.seller_id,
        sellerName: users.name,
        sellerEmail: users.email,
      })
      .from(transactions)
      .innerJoin(users, eq(users.id, transactions.seller_id))
      .where(eq(transactions.buyer_id, req.userId));
    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
