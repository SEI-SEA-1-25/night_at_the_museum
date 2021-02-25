const router = require('express').Router()
const axios = require('axios')
const { request } = require('express')
router.get('/search', async (req, res) => {
    const requestString = 'http://api.harvardartmuseums.org/object?apikey=' + process.env.API_KEY + '&title=' + req.query.term + '&size=30'
    const apiRes = await axios.get(requestString)

    const records= apiRes.data.records
    let filteredRecords =[]

    for(record of records){
        if(record.primaryimageurl) {
            filteredRecords.push(record)
        }
    }

    res.render('works/searchResults', { works: filteredRecords})
})

module.exports = router