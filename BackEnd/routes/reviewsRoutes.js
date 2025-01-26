const express = require("express");
const isAuth = require("../middleware/isAuth");
const reviewsControllers = require("../controller/reviewsControllers");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/:id",
  [
    body("review")
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage("Review must be at least 3 chars and at most 200"),
    body("rating").isInt({min: 1, max : 5}).withMessage("Rate should be integer between 1 and 5"),
  ],
  isAuth,
  reviewsControllers.addReview
);

router.get("/:id", isAuth, reviewsControllers.allReviews);

module.exports = router;
