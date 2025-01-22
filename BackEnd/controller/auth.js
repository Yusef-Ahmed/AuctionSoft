const db = require("../util/database/setup");
const { users } = require("../util/database/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    await db.insert(users).values(user);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
