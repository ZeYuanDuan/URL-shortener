const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("express app");
});

app.get("/", (req, res) => {
  res.redirect("/movies");
});

app.get("/movies", (req, res) => {
  res.send("listing movies");
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
