const express = require("express");
const authController = require("../controller/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/signUp",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail()
      .trim(),
    body("name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be at least 3 characters and at most 30"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  authController.signUp
);

router.post(
  "/logIn",
  [
    body("email")
      .isEmail()
      .withMessage("Enter valid email")
      .normalizeEmail()
      .trim(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  authController.logIn
);

module.exports = router;
