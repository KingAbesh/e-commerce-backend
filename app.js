const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  next(); //Ensures the request continues to the next middleware
});

app.use((req, res, next) => {
  console.log("In another middleware");
  res.send("<h2>Hello Sure Boy</h2>")
});

app.listen(3000);
