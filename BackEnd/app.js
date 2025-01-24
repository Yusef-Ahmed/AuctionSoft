const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const bodyParser = require("body-parser");
const task = require("./schedule");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/products", productsRoutes);

app.use("/reviews", reviewsRoutes);

app.use((error, _req, res, _next) => {
  res.status(error.statusCode || 500).json({ message: error.message });
});

app.listen(8080, () => {
  task.start();
});
