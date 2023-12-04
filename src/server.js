const express = require("express");

const app = express();

app.use("/", express.static("example"));

app.listen(5001, () => {
  console.log("server is listening");
});
