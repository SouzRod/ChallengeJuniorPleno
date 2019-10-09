const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')

router.get('/:id', controller.getUser)

router.get('/', controller.getUser)

router.post('/', controller.saveUser)

router.put('/:id', controller.updateUser)

router.delete('/:id', controller.deleteUser)



module.exports =  router