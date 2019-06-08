const express = require('express')
const router = express.Router()
const Model = require('../models/user')

router.get('/', async (req, res) => {
    console.log(Model.find())
})

module.exports = router