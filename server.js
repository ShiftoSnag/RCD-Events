const path = require("path");
const express = require("express");
const apiRoutes = require("./controllers/api");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Now listening"));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });