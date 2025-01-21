const db = require("../src/database/setup");
const {users} = require("../src/database/schema");

exports.createUser = async (req, res, next) => {
  const name = "youssef";
  const email = "testit@gmail.com";

  try {
    await db.insert(users).values({ name: name, email: email });
    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.log("Error while creating user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Unable to add" });
  }
};

