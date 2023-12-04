require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

// ============= basic =============

app.post("/book", async (req, res) => {
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
});

app.get("/book", async (req, res) => {
  const book = await Book.find();

  const successResponse = {
    message: "book found",
    book: book,
  };

  res.send({ message: "book found", book: book });
});

app.get("/book/allBooks", async (req, res) => {
  const books = await Book.find();
  res.send({ message: "all books", books: books });
});

app.delete("/book", async (req, res) => {
  const deletion = await Book.deleteOne({ title: req.body.title });

  const successResponse = {
    message: "deletedBook",
    result: deletion,
  };

  res.send(successResponse);
});

app.put("/book", async (req, res) => {
  const result = await Book.updateOne(
    { title: req.body.title },
    { author: req.body.newAuthor }
  );

  const successResponse = {
    message: "bookUpdated",
    result: result,
  };

  res.send(successResponse);
});

// =========== stretch ==================

app.put("/book/dynamic", async (req, res) => {
  const result = await Book.updateOne(
    { title: req.body.title },
    { [req.body.filter]: req.body.newValue }
  );

  const successResponse = {
    message: "book updated dynamic",
    result: result,
  };

  res.send(successResponse);
});

app.delete("/book/deleteAll", async (req, res) => {
  const deletion = await Book.deleteMany();
  const successResponse = {
    message: "books deleted",
    result: deletion,
  };
  res.send(successResponse);
});

app.get("/book/:title", async (req, res) => {
  const book = await Book.findOne({ title: req.params.title });
  const successResponse = {
    message: "book found",
    book: book,
  };
  res.send(successResponse);
});

app.listen(5001, () => {
  console.log("Server is listening");
});
