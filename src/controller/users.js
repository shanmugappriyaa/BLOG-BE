
const userModel = require('../models/user')
const Auth = require('../common/Auth.js')

const create = async(req,res)=>{
    try {
        let user =  await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message:"User created Successfully"
            })
        }
        else{
            res.status(400).send({
                message:"user already exists"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        }) 
    }

}
const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(user){
            let hashCompare = await Auth.hashCompare(req.body.password,user.password)
            if(hashCompare){
                let token = await Auth.createToken({
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                })
                let userData = await userModel.findOne({email:req.body.email},{password:0,createdAt:0,email:0})
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    userData
                })

            }
        }
        else{
            res.status(400).send({message:" user id,password is incorrect"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}



module.exports = {login,create}