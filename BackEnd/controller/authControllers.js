const db = require("../util/database/setup");
const { users } = require("../util/database/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { eq } = require("drizzle-orm");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    return next(err);
  }
  
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

exports.logIn = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    return next(err);
  }
  
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [user] = await db.select().from(users).where(eq(email, users.email));

    if (!user) {
      const err = new Error("No email such exist");
      err.statusCode = 401;
      return next(err);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const err = new Error("Wrong password");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    res.status(200).json({ token: token });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
