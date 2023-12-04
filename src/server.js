const express = require("express");

const app = express();

app.use(express.json());

const books = [];

app.post("/book", (req, res) => {
  books.push(req.body);

  const successResponse = {
    message: "book added",
    books: books,
  };

  res.send(successResponse);
});

app.get("/book", (req, res) => {
  const index = books.findIndex(() => req.body.title);

  const successResponse = {
    message: "book found",
    book: books[index],
  };

  res.send({ message: "book found", book: books[index] });
});

app.get("/book/allBooks", (req, res) => {
  res.send({ message: "all books", books: books });
});

app.delete("/book", (req, res) => {
  const index = books.findIndex((x) => x.title === req.body.title);

  books.splice(index, 1);

  const successResponse = {
    message: "deletedBook",
    books: books,
  };

  res.send(successResponse);
});

app.put("/book", (req, res) => {
  const index = books.findIndex((x) => x.title === req.body.title);
  console.log("index: ", index);
  if (req.body.newAuthor) {
    books[index].author = req.body.newAuthor;
  } else if (req.body.newGenre) {
    books[index].genre = req.body.newGenre;
  }

  const successResponse = {
    message: "bookUpdated",
    books: books,
  };

  res.send({ message: "book updated", books: books });
});

app.listen(5001, () => {
  console.log("Server is listening");
});
