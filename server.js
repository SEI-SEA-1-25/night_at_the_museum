// required packages
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const rowdy = require("rowdy-logger");
const axios = require("axios");

// configure env variables
require("dotenv").config();
const MUSE_API_KEY = process.env.MUSE_API_KEY;

// configure express app
const app = express();
const PORT = 3000;
// (╯°□°）╯︵ 🍇 🍇 🍇
const rowdyResults = rowdy.begin(app);

// Middle-wares
// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
app.use(express.static("static"));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Adds some logging to each request
app.use(require("morgan")("dev"));

// GET / - render search form
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//  GET /results - render results of museum search
app.get("/results", async (req, res) => {
  try {
    const results = await axios.get(
      `www.https://harvardartmuseums.org/collections//?apikey=${MUSE_API_KEY}&s=${req.query.search}`
    );
    res.render("results", { art: results.data.Search });
  } catch (error) {
    console.log("🍎 🍎 🍎 ", error);
  }
});

//  GET /detail/:artwork_id - render detail of art piece
app.get("/detail/:artwork_id", async (req, res) => {
  try {
    const results = await axios.get(
      `www.https://harvardartmuseums.org/collections//?apikey=${MUSE_API_KEY}&i=${req.params.artwork_id}`
    );
    res.render("detail", { art: results.data });
  } catch (error) {
    console.log("🍎 🍎  🍎 ", error);
  }
});

// 404 middleware
app.use((req, res, next) => {
  console.log("🍎 🍎  🍎 ", error);
});

app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
  rowdyResults.print();
});
