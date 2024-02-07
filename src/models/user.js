const mongoose =require('./index') 

const userSchema = new mongoose.Schema({
    firstName :{type:String,required:[true,"first name is required"],unique:true},
    lastName :{type:String,required:[true,"Last name is required"]},
    email:{type:String,required:[true,"email is required"]},
    password:{type:String,required:[true,"password is required"]},
    role:{type:String}
},{
versionKey:false
})

const  userModel = mongoose.model('users',userSchema)
module.exports= userModel
