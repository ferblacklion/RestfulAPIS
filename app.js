/* eslint-disable no-console */
const express = require("express");
const db = require("./db/db");
const app = express();

const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

db()
  .then(() => {
    console.log("connected to DB!");
    app.server = app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
