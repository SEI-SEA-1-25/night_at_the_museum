require('dotenv').config();
const NATM_API_KEY = process.env.NATM_API_KEY;
const axios = require('axios');
const { default: axios } = require('axios')
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
// const rowdy = require('rowdy-logger')
//                //                      //                  //
//                   configureing express
//                //                      //                  //
const app = express()
const PORT = 3000

// configure express app
const app = express()
const PORT = 3000
// (╯°□°）╯︵ ┻━┻
const rowdyResults = rowdy.begin(app)

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

//                //                      //                  //

//                          ROUTES

// 
                        home.ejs
//                //                      //                  //
app.get('/', function(req, res) {
  res.render('art.ejs', { art: result})
})




//                //                      //                  //
//                         RESULTS
//                //                      //                  //

app.get('/results', () => {
   console.log(req.body.img_url)
})

//                //                      //                  //
//                      
//                //                      //                  //






//                //                      //                  //
//                        404 alert
//                //                      //                  //
app.use((req, res, next) => {
  res.status(404).render('404.ejs')
})
//                //                      //                  //
//                        run server
//                //                      //                  //
app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`)
  rowdyResults.print()
})