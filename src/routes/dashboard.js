const express = require('express');
const Auth = require('../common/Auth')
const DashBoardController = require('../controller/dashboard')

const router = express.Router();
router.get('/',Auth.validate,DashBoardController.getAllBlogs)

module.exports = router 

