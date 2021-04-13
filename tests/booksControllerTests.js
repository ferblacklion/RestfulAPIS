const sinon = require("sinon");
const should = require("should");
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
      const bookModel = new Book(book);

      const req = {
        book: {
          ...bookModel,
          save: function (cb) {
            cb(null);
            done();
          },
        },
        body: book,
      };

      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };

      bookController.put(req, res);

      res.status.calledWith(200).should.equal(true, `Bad Status `);
      res.json.calledWith(bookModel).should.equal(true);
    });

    it("should not update the book", () => {
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

      res.status.calledWith(400).should.equal(true, `Bad Status `);
      res.send.calledWith("bad request").should.equal(true);
    });
  });
});
