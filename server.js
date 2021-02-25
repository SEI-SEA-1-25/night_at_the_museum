// required packages
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const rowdy = require("rowdy-logger");
const axios = require("axios");
// configure environmental variables
require("dotenv").config();

const MUSEUM_API_KEY = process.env.MUSEUM_API_KEY;

// confifgure express app
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app);

// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
// app.use(express.static("static"));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
// Sets up bodybody-parser for the parsing form data
app.use(express.urlencoded({ extended: false }));
// Adds some logging to each request
app.use(require("morgan")("dev"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results", async (req, res) => {
  try {
    const results = await axios.get(
      `http://api.harvardartmuseums.org/object?apikey=${MUSEUM_API_KEY}&title=${req.query.search}&size=30`
    );
    res.render("results", { records: results.data.records });
  } catch (err) {
    console.log(err);
  }
});

// the app.listen function returns a server handle
app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
  rowdyResults.print();
});
