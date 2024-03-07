const express = require("express");
const app = express();
const port = 3000;

app.get("/ping", (req, res) => {
  res.send("This is basic server");
});

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
