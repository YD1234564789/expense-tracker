// CRUD 帳務的相關路由
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 篩選條件
router.get('/category/:category', (req, res) => {
  const keyCategory = req.params.category
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ category: keyCategory, userId })
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
        .then(category => res.render('index', {
          keyCategory, category, records, totalAmount
        }))
        .catch(console.error)
    })
})



router.get('/new', (req, res) => {
  res.render('new')
})



module.exports = router