const { default: axios } = require('axios')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const NATM_API_KEY = process.env.NATM_API_KEY

require('dotenv').config();



app.use((req, res, next) => {
  res.status(404).render('404.ejs')
})

app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`)
  rowdyResults.print()
})