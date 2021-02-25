const router = require('express').Router()
const axios = require('axios')


  
router.get('/search', async (req, res) => {
  const requestString = `http://api.harvardartmuseums.org/object?apikey=${process.env.API_KEY}&TITLE=${REQ.QUERY.TERM}&SEIZE=30`

const apiRes = await axios.get(requestString)

const records = apiRes.data.records

let filteredRecords = []

for (record of records)
  if (record.primaryimageurl) {
    fildteredRecords.push(record)
}

res.render('works/searchResults', { works: filteredRecords })
})

module.exports = router