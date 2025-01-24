const { eq } = require("drizzle-orm");
const { reviews, users } = require("../util/database/schema");
const db = require("../util/database/setup");

exports.addReview = async (req, res, next) => {
  const review = {
    review: req.body.review,
    rating: req.body.rating,
    owner: req.params.id,
    reviewer: req.userId,
  };

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
      .where(eq(reviews.owner, userId));
    res.status(200).json(reviewsData);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
