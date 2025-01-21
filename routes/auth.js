const express = require("express");
const authController = require("../controller/createUser");
const prodController = require("../controller/addProduct");
const router = express.Router();

router.get("/auth", authController.createUser);
router.get("/product", prodController.addProduct);

module.exports = router;