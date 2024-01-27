const express = require('express')
const userRoutes = require('./userRoute')
const blogRoutes =require('./blogRoute')

const router = express.Router();
router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Backend of Blog App</h1>`)
})

router.use('/user',userRoutes);
router.use('/blog',blogRoutes)


module.exports =  router