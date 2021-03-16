// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')


// environmental variables
require('dotenv').config()
const HARVARD_API_KEY = process.env.HARVARD_API_KEY

// express app setup
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

// makes ejs the view engine
app.set('view engine', 'ejs')
    // specifies location of static express folder
app.use(express.static('public'))
    // parsing form data
app.use(express.urlencoded({ extended: false }))
    // add logging to requests
app.use(morgan('tiny');


        // routes
        app.get('/', function(req, res) {
            res.render('index.ejs')
        })

        app.get('/index', async(req, res) => {
            try {
                // ?
                const index = await axios.get('https://github.com/harvardartmuseums/api-docs')
            } catch (error) {
                console.log(error)
            }
        })



        // returns server handle
        app.listen(PORT, () => {
            console.log('listening on PORT:${PORT}')
            rowdyResults.print()
            console.log(process.env.)
        })