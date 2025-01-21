const db = require("../src/database/setup");
const {products} = require("../src/database/schema");

exports.addProduct = async (req, res, next) => {
  const name = "iphone";
  const price = 235;

  try {
    await db.insert(products).values({ name: name, price: price });
    return res.status(201).json({
      message: "product added successfully",
    });
  } catch (error) {
    console.log("Error while creating product", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Unable to add" });
  }
};

