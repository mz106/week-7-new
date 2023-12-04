const { Router } = require("express");
const bookRouter = Router();

const {
  addBook,
  getAllBooks,
  deleteBook,
  updateBook,
  updateDynamic,
  deleteAll,
  getBookByTitle,
} = require("./controllers");

// ============= basic =============

bookRouter.post("/book", addBook);

bookRouter.get("/book", getAllBooks);

bookRouter.delete("/book", deleteBook);

bookRouter.put("/book", updateBook);

// =========== stretch ==================

bookRouter.put("/book/dynamic", updateDynamic);

bookRouter.delete("/book/deleteAll", deleteAll);

bookRouter.get("/book/:title", getBookByTitle);

module.exports = bookRouter;
