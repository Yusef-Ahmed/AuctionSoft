const { eq } = require("drizzle-orm");
const { reviews, users } = require("../util/database/schema");
const db = require("../util/database/setup");
const { validationResult } = require("express-validator");
const { desc } = require("drizzle-orm");

exports.addReview = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    return next(err);
  }

  const review = {
    review: req.body.review,
    rating: req.body.rating,
    owner: req.params.id,
    reviewer: req.userId,
  };

  if (review.reviewer == review.owner) {
    const err = new Error("You can't give yourself a review");
    err.statusCode = 422;
    return next(err);
  }

  try {
    await db.insert(reviews).values(review);
    res.status(200).json({ message: "Review added successfully" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.allReviews = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const reviewsData = await db
      .select({
        review: reviews.review,
        rating: reviews.rating,
        reviewerName: users.name,
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.reviewer, users.id))
      .where(eq(reviews.owner, userId))
      .orderBy(desc(reviews.id));
    res.status(200).json(reviewsData);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
