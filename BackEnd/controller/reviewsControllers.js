const { reviews } = require("../util/database/schema");
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
