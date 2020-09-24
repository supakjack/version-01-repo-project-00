const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

router.post('/', accountController.addAccount)
router.get('/', accountController.getAccount)
router.put('/:id', accountController.updateAccount)
router.delete('/:id', accountController.deleteAccount)


module.exports = router