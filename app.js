/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");

const app = express();

console.log(process.env.ENV);

if (process.env.ENV === "Test") {
  console.log("test");
  mongoose.connect("mongodb://localhost:27017/bookAPI_test");
} else {
  console.log("not test");
  mongoose.connect("mongodb://localhost:27017/bookAPI");
}

const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
