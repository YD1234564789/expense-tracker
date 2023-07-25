
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')


router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
        records[i].date = records[i].date.toDateString()
      }
      return records
    })
    .then(records => {
      Category.find()
        .lean()
        .then(category => {
          res.render('index', {category, records, totalAmount })
        })
    })
    .catch(console.error)
})

module.exports = router