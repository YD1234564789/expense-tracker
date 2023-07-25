const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const routes = require('./routes')

// 開發環境才用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

// template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 導入路由器
app.use(routes)



app.listen(port, () => {
  console.log('App is running on port 3000')
})