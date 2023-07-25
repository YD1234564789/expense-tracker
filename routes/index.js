const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const auth = require('./modules/auth')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/records', records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', home)

module.exports = router