// CRUD 帳務的相關路由
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

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

// 到新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '所有欄位都是必填' })
    return res.render('new', {
      errors,
      name,
      date,
      category,
      amount
    })
  }
  Category.findOne({ name: category})
  .then(data => {
    const categoryId = data._id
    return Record.create({ name, date, category, categoryIcon: data.icon, amount, userId, categoryId })
  })
  .then(() => res.redirect('/'))
  .catch(console.error)
})

// 進入編輯頁
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
   return Record.findOne({ _id: recordId, userId })
    .lean()
    .then(record => {
      Category.findOne({ _id: record.categoryId })
        .lean()
        .then(category => {
          const date = record.date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
          res.render('edit', { record, date, recordId })
        })
      // record.date = record.date.toISOString().slice(0, 10)
      // res.render('edit', { record })
    })
    .catch(console.error)
})

// 送出編輯
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const recordId = req.params.id
  const errors = []
  if (!name || !date || !category || !amount) {
    const record = req.body
    errors.push({ message: '所有欄位都是必填。' })
    return res.render('edit', {
      errors,
      date,
      recordId,
      record
    })
  }
  Record.findOne({ _id: recordId, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return Category.findOne({ name: category })
        .then(category => {
          record.categoryIcon = category.icon
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(console.error)
    })
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  return Record.findOneAndRemove({ _id: recordId, userId })
    .then(() => res.redirect('/'))
    .catch(console.error)
})


module.exports = router