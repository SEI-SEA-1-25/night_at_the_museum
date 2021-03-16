const router = require('express').Router()
const db = require('../models')


router.get('/', (req, res) => {
    res.send('hello from the get route')
})





router.post('/', (req, res) => {
    res.send('hello from the post route')
})

module.exports = router