// 登入、註冊相關路由
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})



module.exports = router