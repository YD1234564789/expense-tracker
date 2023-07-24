// 開發環境才用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const userList = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '123456'
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '123456'
  }
]

const recordList = [
  {
    name: '午餐',
    date: '2019.04.23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019.04.23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019.04.23',
    category: '交通出行',
    amount: 120
  },
  {
    name: '租金',
    date: '2015.04.01',
    category: '家居物業',
    amount: 25000
  },
  {
    name: '電影：驚奇隊長',
    date: '2019.04.23',
    category: '休閒娛樂',
    amount: 220
  }
]

db.once('open', () => {
  Promise.all(Array.from({ length: recordList.length }, (_, i) => Category.findOne({ name: recordList[i].category })))
    // 把categoryID 與 Icon 放入recordList中
    .then((data) => {
      for (let i = 0; i < recordList.length; i++) {
        recordList[i].categoryId = data[i]._id
        recordList[i].categoryIcon = data[i].icon
      }
      return Promise.all(Array.from({ length: userList.length }, (_, i) => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(userList[i].password, salt))
          .then(hash => User.create({
            name: userList[i].name,
            email: userList[i].email,
            password: hash
          }))
      }))
    })
    .then(users => {
      console.log('usersSeed are created!')
      for(let i = 0; i < 4; i++) {
        recordList[i].userId = users[0]._id
      }
      recordList[4].userId = users[1]._id
      return recordList
    })
    .then(recordList => {
      return Promise.all(Array.from({ length: recordList.length }, (_, i) => Record.create({
        name: recordList[i].name,
        date: recordList[i].date,
        category: recordList[i].category,
        categoryIcon: recordList[i].categoryIcon,
        amount: recordList[i].amount,
        userId: recordList[i].userId,
        categoryId: recordList[i].categoryId
      })))
    })
    .then(() => {
      console.log('RecordsSeed are created!')
      process.exit()
    })
})

