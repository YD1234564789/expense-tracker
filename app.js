const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const port = 3000

// 開發環境才用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log('App is running on port 3000')
})