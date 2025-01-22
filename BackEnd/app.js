const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ message: error.message });
});

app.listen(8080);
