const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();

app.use("/auth", authRoutes);

const server = app.listen(8080);
