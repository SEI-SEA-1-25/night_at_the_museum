require('dotenv').config()

const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')

require('dotenv').config()
const API_KEY = process.env.API_KEY

console.log(API_KEY)

// Variables
const app = express();
const PORT = 3001;
const rowdyResults = rowdy.begin(app)

app.use(morgan('combined'))



// Middlewares
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


async function hit_api(){
    const api_string = `http://api.harvardartmuseums.org/object?apikey=${API_KEY}&title=art&size=30`
    //console.log(api_string)
    const api_results = await axios.get(api_string)
    //console.log(api_results.data)
    //console.log(Object.keys(api_results.data.records))
    const object = api_results.data.records
    console.log(object[2].description)
    //console.log(Object.keys(object[0]))

    //console.log(api_results.data[0])
}

//hit_api()

const h=  null;
console.log(h.length>0)