const { eq, gte, sql } = require("drizzle-orm");
const { products } = require("../util/database/schema");
const db = require("../util/database/setup");
const { validationResult } = require("express-validator");

exports.allProducts = async (_req, res, next) => {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .where(sql`products.ex_date > CURRENT_TIMESTAMP`);
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
  
  const product = {
    name: req.body.name,
    image: req.body.image,
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
  const productId = req.body.productId;
  const buyerId = +req.userId;
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
      err.statusCode = 401;
      return next(err);
    }

    if (buyerId == product.seller_id) {
      const err = new Error("You can't bid on you own product");
      err.statusCode = 401;
      return next(err);
    }

    if (newPrice <= +product.price) {
      const err = new Error("You need to bid with a bigger price");
      err.statusCode = 401;
      return next(err);
    }

    await db
      .update(products)
      .set({ price: newPrice, buyer_id: buyerId })
      .where(eq(productId, products.id));

    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};