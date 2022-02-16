const express = require('express')
const router = express.Router()
const Citizen = require('../models/citizen')

router.get('/', async (req, res) => {
  let citizens
  try {
    citizens = await Citizen.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    citizens = []
  }
  console.log("Home");
  res.render('index', { citizens: citizens})
})

module.exports = router