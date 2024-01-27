const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = async(pass)=>{
let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
let hash = await bcrypt.hash(pass,salt)
return hash
}

const hashCompare = async(pass,hash)=>{
    return await bcrypt.compare(pass,hash)
}

const createToken = async(payload)=>{
    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
    return token
}
module.exports = {hashPassword,hashCompare,createToken}