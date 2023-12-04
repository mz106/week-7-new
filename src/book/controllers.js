const Book = require("./model");

// ============= basic =============

const addBook = async (req, res) => {
  const newBook = await Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  const successResponse = {
    message: "book added",
    book: newBook,
  };

  res.send(successResponse);
};

const getAllBooks = async (req, res) => {
  const books = await Book.find();

  const successResponse = {
    message: "book found",
    books: books,
  };

  res.send({ message: "book found", books: books });
};

const deleteBook = async (req, res) => {
  const deletion = await Book.deleteOne({ title: req.body.title });

  const successResponse = {
    message: "deletedBook",
    result: deletion,
  };

  res.send(successResponse);
};

const updateBook = async (req, res) => {
  const result = await Book.updateOne(
    { title: req.body.title },
    { author: req.body.newAuthor }
  );

  const successResponse = {
    message: "bookUpdated",
    result: result,
  };

  res.send(successResponse);
};

// =========== stretch ==================

const updateDynamic = async (req, res) => {
  const result = await Book.updateOne(
    { title: req.body.title },
    { [req.body.filter]: req.body.newValue }
  );

  const successResponse = {
    message: "book updated dynamic",
    result: result,
  };

  res.send(successResponse);
};

const deleteAll = async (req, res) => {
  const deletion = await Book.deleteMany();
  const successResponse = {
    message: "books deleted",
    result: deletion,
  };
  res.send(successResponse);
};

const getBookByTitle = async (req, res) => {
  const book = await Book.findOne({ title: req.params.title });
  const successResponse = {
    message: "book found",
    book: book,
  };
  res.send(successResponse);
};

module.exports = {
  addBook,
  getAllBooks,
  deleteBook,
  updateBook,
  updateDynamic,
  deleteAll,
  getBookByTitle,
};
