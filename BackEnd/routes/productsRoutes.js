const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/isAuth");
const productsControllers = require("../controller/productsControllers");

const router = express.Router();

router.get("/all", isAuth, productsControllers.allProducts);

router.post(
  "/createProduct",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Product name must be at least 3 chars and at most 30"),
    body("price").isDecimal().withMessage("Enter a valid price"),
    body("ex_date").isISO8601().withMessage("Enter a valid date"),
  ],
  isAuth,
  productsControllers.createProduct
);

router.put(
  "/newBidder",
  [body("newPrice").isDecimal().withMessage("Enter a valid price")],
  isAuth,
  productsControllers.newBidder
);

module.exports = router;
