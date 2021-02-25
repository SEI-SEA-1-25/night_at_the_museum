
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
app.use(express.static('public'))
// Enables EJS Layouts middleware
app.use(ejsLayouts)
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Adds some logging to each request
app.use(require('morgan')('dev'))


// Routes

app.get('/', async (req, res) => {
    try{
    res.render('index')
    console.log("index SHOULD be rednered")
    //console.log(body)
    }
    catch(err){
        console.log(err)
    }
})
app.get('/results', async (req, res) => {
    try{
    const api_string = `http://api.harvardartmuseums.org/object?apikey=${API_KEY}&title=${req.query.search}&size=30`
    console.log(api_string)
    const api_results = await axios.get(api_string)

    //console.log(api_results)
    console.log(api_results.data)
    //res.render('test')
    const records = api_results.data.records
    const filteredRecords = []

    for(let i=0;i<records.length;i++){
        record = records[i]
        if(record.primaryimageurl){
            filteredRecords.push(record)
        }
        else{
            console.log("filtered out" + record.title)
        }
    }
    res.render('results', {arts: filteredRecords})
    }
    catch(err){
        res.status(500).render('error')
        console.log(err)
    }
})

app.get('/test', (req,res) => {
    console.log("test is activated")

    res.render('results')
})



// Start the server
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server is listening on port ${PORT}`)
})