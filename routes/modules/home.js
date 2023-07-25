
const express = require('express')
const router = express.Router()
// const Category = require('../../models/category')
// const Record = require('../../models/record')

router.get('/', (req, res) => {
  // const userId = req.user._id
  res.render('index')
})

module.exports = router