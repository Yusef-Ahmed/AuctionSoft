const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/isAuth");
const productsControllers = require("../controller/productsControllers");

const router = express.Router();

router.get("/all", isAuth, productsControllers.allProducts);

router.post("/createProduct", isAuth, productsControllers.createProduct);

router.put("/newBidder", isAuth, productsControllers.newBidder);

module.exports = router;
