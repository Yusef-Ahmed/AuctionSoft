const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const bodyParser = require("body-parser");
const task = require("./schedule");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const name = uuidv4() + "." + file.mimetype.substring(6);
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.static(path.join(__dirname, "images")));

app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("image")
);

app.use("/auth", authRoutes);

app.use("/products", productsRoutes);

app.use("/reviews", reviewsRoutes);

app.use((error, _req, res, _next) => {
  res.status(error.statusCode || 500).json({ message: error.message });
});

const server = app.listen(8080, () => {
  try {
    task.start();
    const io = require("./socket").init(server);
    io.on("connection", () => {
      console.log("Client connected");
    });
  } catch (err) {
    console.log(err);
  }
});
