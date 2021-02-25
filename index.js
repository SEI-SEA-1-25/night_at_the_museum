const express = require('express')
const rowdy =  require ('rowdy-logger')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const morgan = require('morgan')

require ('dotenv').config()



const app = express()
const PORT = 3000

const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')

app.use(express.static('static'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('dev'))

app.use('/search', require ('./controller/worksController'))

app.get('/', function (req, res){
    res.render('index.ejs')
})

app.get('/test', (req, res) => {
    try{

    }catch(err){
        console.log(err)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})