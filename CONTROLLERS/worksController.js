const router = require('express').Router()

router.get('/search,', (req, res) => {
    console.log(req)

})

const axios = require('axios')

router.get('/seach' ,(req, res) => {
    const requestString = `http://api.harvardartmuseums.org/object?apikey=${process.env.API_KEY}&title=${req.query.term}&size=30`

    axios.get(requestString).then


    const apiRES = await axios.get(requestString)

    let filteredRecords = []

     for (record of records) {
        if(record.primaryimageurl) {
        filteredRecords.push
     }
    }
})

module.exports = router