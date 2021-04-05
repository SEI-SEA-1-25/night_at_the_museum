require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const MUESUEM_API_KEY = process.env.MUESUEM_API_KEY

const app = express()
const PORT = 3000
const rowdyRes = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))

app.get('/', function(req, res) {
    res.render('works/index')
  })


app.get('/works/results', async(req, res) => {
    try {
      const results = 
      await axios.get(`https://api.harvardartmuseums.org/object?apikey=${MUESUEM_API_KEY}&title=${req.query.search}&size=30`)
    //   console.log(results.data)
      res.render('works/results', { works: results.data.records })
  } catch (error) {
      console.log(error)
  }
})
app.post('/works', async(req, res) => {
    try {
        const popular_works = await db.work.create({
            title: req.body.title,
            primaryimageurl: req.body.primaryimageurl
        })
        res.redirect('popular_works')
    } catch(error){
        console.log(error)
    }
})

http://api.harvardartmuseums.org/object?apikey=<your api key>&title=<the user's search term>&size=30

app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
  })