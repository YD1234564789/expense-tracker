// CRUD 帳務的相關路由
const express = require('express')
const router = express.Router()


router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router