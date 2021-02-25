// required packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')

//configure environmental variables
require('dotenv').config()

const OMDB_API_KEY = process.env.OMDB_API_KEY

// configure express app
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Enables EJS Layouts middleware
app.use(ejsLayouts)
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Adds some logging to each request
app.use(require('morgan')('dev'))
//morgan
app.use(morgan('tiny'))


// Routes
app.get('/', function(req, res) {
  res.render('index')
})

app.get('/results', async (req, res) => {
    try {
        const result = await axios.get(`http://api.harvardartmuseums.org/object?apikey=${OMDB_API_KEY}&title=${req.query.search}&size=30`)
        const records = result.data.records
        
        let filteredRecords = []
        
        for (record of records) {
            if(record.primaryimageurl) {
                filteredRecords.push(record)
            }
        } 
    res.render('results', { results: filteredRecords })
    } catch(err) {
        console.log(err)
    }
})


// The app.listen function returns a server handle
app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`)
    rowdyResults.print()
  })