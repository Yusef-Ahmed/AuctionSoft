const express = require("express");
const authController = require("../controller/auth");
const prodController = require("../controller/addProduct");
const router = express.Router();


router.post("/signUp", authController.signUp);

// router.get("/product", prodController.addProduct);

module.exports = router;