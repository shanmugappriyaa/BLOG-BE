const express = require('express')
const userController = require('../controller/users')

const router = express.Router()

 router.post('/signup',userController.create)
 router.post('/login',userController.login)

 module.exports =router