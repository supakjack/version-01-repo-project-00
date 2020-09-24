const express = require('express')
const router = express.Router()
const jogetController = require('../routers/jogetRoute')

router.post('/', serviceController.add)

module.exports = router