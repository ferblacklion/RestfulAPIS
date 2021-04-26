const sinon = require("sinon");
const bookController = require("../controllers/booksController");
const Book = require("../models/bookModel");

describe("Book Controller Tests:", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", () => {
      const Book = function (book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: "Jon",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      bookController.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });

  describe("Put", () => {
    it("should update the book properly", (done) => {
      const book = {
        read: false,
        title: "War and Peace",
        genre: "Historical Fiction",
        author: "Lev Nikolayevich Tolstoy",
      };
      const expected = {
        read: false,
        title: "War and Peace",
        genre: "Historical Fiction",
        author: "Lev Nikolayevich Tolstoy",
      };
      const bookModel = new Book(book);

      const req = {
        book: {
          ...bookModel,
          save: function (cb) {
            cb(null);
          },
        },
        body: book,
      };

      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };

      bookController.put(req, res);

      res.status.calledWith(200).should.equal(true, "bad status code");
      res.json.calledWithMatch(expected).should.equal(true, "bad response");

      done();
    });

    it("should not update the book", (done) => {
      const book = {
        read: false,
        title: "War and Peace",
      };
      const bookModel = new Book(book);

      const req = {
        book: bookModel,
        body: book,
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      bookController.put(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status code`);
      res.send.calledWith("bad request").should.equal(true, "bad response");
      done();
    });
  });
});
