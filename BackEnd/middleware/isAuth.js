const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  let decodedToken;
  if (!token) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    err.message = "Invalid token";
    err.statusCode = 401;
    throw err;
  }
  if (!decodedToken) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};
