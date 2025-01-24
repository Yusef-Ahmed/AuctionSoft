const express = require("express");
const isAuth = require("../middleware/isAuth");
const reviewsControllers = require("../controller/reviewsControllers");

const router = express.Router();

router.post("/:id", isAuth, reviewsControllers.addReview);

module.exports = router;
