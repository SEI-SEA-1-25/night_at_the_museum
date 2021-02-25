//configure enviormental variables
require('dotenv').config()
// required packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')

const EXHIBITION_API_KEY = process.env.EXHIBITION_API_KEY // EXHIBITION_API_KEY = 30967c76-68e7-428e-90d8-713eb7414823

// https://api.harvardartmuseums.org/exhibition?apikey=30967c76-68e7-428e-90d8-713eb7414823

// configure express app
const app = express()
const PORT = 4000
// (╯°□°）╯︵ ┻━┻
const rowdyResults = rowdy.begin(app)

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Enables EJS Layouts middleware
app.use(ejsLayouts)
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Adds some logging to each request
app.use(require('morgan')('dev'))



app.get('/', async (req, res) => {
    res.render('index.ejs')
})


app.get('/exhibition', async (req, res) => {
    try {
        const allExhibition = await axios.get(`https://api.harvardartmuseums.org/exhibition?apikey=${EXHIBITION_API_KEY}&q=${req.query.search}`)
        res.render('show.ejs', { allExhibition: allExhibition.data.records })
    } catch (err) {
        console.log(err);
    }
})



app.get('*', (req, res) => {
    res.render('404')
  })

// The app.listen function returns a server handle
app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`)
    rowdyResults.print()
  })
  
  