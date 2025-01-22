const { products } = require("../util/database/schema");
const db = require("../util/database/setup");

exports.createProduct = async (req, res, next) => {
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
    })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
