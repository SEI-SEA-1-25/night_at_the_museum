const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const db = require('./models')
const { query } = require('express')
const methodOverride = require('method-override')




//Configure Environmental Variables
require('dotenv').config()
const HARVARD_ART_API_KEY = process.env.HARVARD_ART_API_KEY

//configure express app
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

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

app.use(methodOverride('_method'))

// app.use(express.bodyParser());



//Homepage Route
app.get('/', function(req, res) {
    res.render('index')
  })
  

app.get('/objects', async (req, res) => {
    try{
        const searchQuery =  await axios.get(`https://api.harvardartmuseums.org/object?apikey=${HARVARD_ART_API_KEY}&keyword=${req.query.search}`)
        res.render('records', {searchQuery: searchQuery.data.records})
    }catch(error){
        console.log(error)
    }
})

app.post('/popular-works', async (req, res, next) =>{
    try{
       const newPopWork = await db.work.create({
           objectId: req.body.objectid,
           title: req.body.title,
           primaryimageurl: req.body.primaryimageurl,
           division: req.body.division,
           culture: req.body.culture
       })
       console.log(newPopWork)
       res.redirect('/popular-works')
    }catch(error){
        console.log(error)
    }
})

app.get('/popular-works', async (req, res) => {
    try{
        const popularWorks = await db.work.findAll()
        res.render('works', { popularWorks} )
    }catch(error){
        console.log(error)
    }
})

app.delete('/popular-works', async (req, res) => {
    try{
        const selectedWork = await db.work.findByPk(req.body.id)
        console.log(selectedWork)
        const deletedWork = await selectedWork.destroy();
        console.log(deletedWork)
        res.redirect('/popular-works')
    }catch(error){
        console.log(error)
    }

})


app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`)
    rowdyResults.print()
  })
  