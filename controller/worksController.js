const router = require('express').Router()
const axios = require('axios')

const OMDB_API_KEY = process.env.OMDB_API_KEY

router.get('/search', async (req, res) => {
    const requestSearch = await axios.get(`http://api.harvardartmuseums.org/object?apikey=${OMDB_API_KEY}&title=${req.query.term}&size=30`)
    const result = requestSearch.data.records
    res.send(requestSearch)
    
})
module.exports = router