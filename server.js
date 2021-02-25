const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')


const axios = require('axios')
require('dotenv').config()

const MUSEUM_API_KEY = process.env.MUSEUM_API_KEY


const app = express()
const PORT = 3000

const rowdyResults = rowdy.begin(app)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(ejsLayouts)

app.use(express.urlencoded({ extended: false }))

app.use(require('morgan')('dev'))









app.get('/', function(req, res) {
    res.render('index.ejs')
  })

app.get('/results', async (req, res) => {
    try{
        const results = await axios.get(`http://api.harvardartmuseums.org/object?apikey=${MUSEUM_API_KEY}&title=${req.query.title}&size=1`)
    // res.render('results',  { results: results.data })

    // console.log(results)



    } catch(err) {
        console.log(error)
    }
})






  

app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`)
    rowdyResults.print()
  })
  
  