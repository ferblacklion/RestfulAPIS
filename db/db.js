const mongoose = require("mongoose");

const db = () => {
  const url =
    process.env.ENV === "Test"
      ? "mongodb://localhost:27017/bookAPI_test"
      : "mongodb://localhost:27017/bookAPI";
  console.log(url);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = db;
