
const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')


router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router