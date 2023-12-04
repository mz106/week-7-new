require("dotenv").config();
const express = require("express");

const connection = require("./db/connection");
const bookRouter = require("./book/routes");

const app = express();

app.use(express.json());

connection();

app.use(bookRouter);

app.listen(5001, () => {
  console.log("Server is listening");
});
