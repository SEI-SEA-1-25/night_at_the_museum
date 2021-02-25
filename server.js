const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const morgan = require('morgan')
const axios = require('axios')

require('dotenv').config()
const HARVARD_API_KEY = process.env.HARVARD_API_KEY

// configure express app
// (╯°□°）╯︵ ┻━┻
const rowdyResults = rowdy.begin(app)


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/search', async (req, res) => {
  try {
    // const results = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${req.params.movie_id}`)
    const results = await axios.get(`http://api.harvardartmuseums.org/object?apikey=${HARVARD_API_KEY}&title=${req.query.search}&size=30`)
    // console.log(results)
    res.render('search', { paintings: results.data.records })
    console.log(results.data.records)
    // res.json(results.data.records)
    // res.render('results', { movies: results.data.????? })
  } catch (error) {
    console.log(error);
  }
})

// Works routes
// Find All
app.get('/works', async (req, res) => {
  try {
    const works = await db.work.findAll()
    res.render('works', { works })
  } catch (error) {
    console.log(error);
  }
})

// CREATE
app.post('/works', async (req, res) => {
  try {
        const newWork = await db.work.create({
              title: req.body.title,
              primaryimageurl: req.body.primaryimageurl
        })
        res.redirect(`/works`)
  } catch (error) {
        console.log(error);
  }
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyResults.print()
})