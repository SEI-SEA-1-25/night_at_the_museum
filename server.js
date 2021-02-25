require('dotenv').config
const express = require('express')
const app = express()
const rowdy = require("rowdy-logger")
const rowdyRes = rowdy.begin(app)
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')

app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

const worksController = require('./controllers/worksControllers')
app.use("/works", worksController)
app.listen(3000, () => {
    console.log('server started')
    rowdyRes.print()
})
