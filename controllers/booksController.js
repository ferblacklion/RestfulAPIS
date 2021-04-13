const Book = require("../models/bookModel");
const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  read: Joi.boolean().required(),
  genre: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
});

function bookController() {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save((err, addedBook) => {
      if (err) {
        return res.send(err);
      }
      res.status(201);
      return res.json(addedBook);
    });
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  function put(req, res) {
    const { book } = req;
    const { error } = bookSchema.validate(req.body);

    if (error) {
      res.status(400);
      console.log("bad request");
      return res.send("bad request");
    }
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    book.save((err) => {
      if (err) {
        console.log("log save error");
        return res.send(err);
      }
      console.log("log save success");
      res.status(200);
      return res.json(book);
    });
    console.log("end put");
  }
  return { post, get, put };
}

module.exports = bookController();
