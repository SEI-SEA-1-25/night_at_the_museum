// Required Packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const { render } = require('ejs')

// Configure environmental variables
require('dotenv').config()

// DIY KEY
const API_KEY = process.env.API_KEY

// Configure express app
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

// App setups
app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('dev'))

// Routes
app.get('/', function (req, res) {
    res.render('index')
})

// SHOW - redirect to results page
app.get('/results', async (req, res) => {
    try {
        const results = (`http://api.harvardartmuseums.org/object?apikey=${API_KEY}&title=${req.query.search}&size=30`)
        res.render('results', { records: results.data.records })
    } catch (error) {
        console.log(error)
    }
})



console.log(`listening on PORT:${PORT}`);
rowdyResults.print();