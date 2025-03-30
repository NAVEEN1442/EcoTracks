
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    
    name:{
        type:String,
       
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:Number,
    },
    created_At:{
        type:Date,
        
    },
    deleted_At:{
        type:Date,
       
    },
    Avatar:{
        type:String,
        
    },
    otp:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },


})

module.exports = mongoose.model("User",UserSchema);