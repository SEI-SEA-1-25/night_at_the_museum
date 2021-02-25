const express = require('express')
const app = express()
const rowdt = require('rowdy-logger')
const rowdrRes = rowdy.begin(app)
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')


///middleware zone
app.use(morgan('tiny'))
app.set('view engine ,ejs')
app.use(ejsLayouts)
app.use(express.static('public'))

///routes zone
app.get('/', (req, res) => {
    res.render('index')
})

const worksController = require('./CONTROLLERS/worksController')
app.use('/works', worksController)

app.listen(3000, () => {
    console.log('server started')
    rowdrRes.print()
    console.log(process.env.BING)
})