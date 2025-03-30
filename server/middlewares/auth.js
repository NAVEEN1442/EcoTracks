const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

exports.auth = async (req,res,next)=>{

    console.log("hi am in auth")

    try {
        console.log("tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        //extraction of token 
       

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        console.log("tok",token)

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is not present",
            })
        }

        try {
            console.log("hi am in auth")
            //verify the token , check who's logged in

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("decode",decode);

        //get the data

        req.user = decode;

        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Token is not valid",
            })
        }

        next();




    } catch (error) {
        console.log("hi am in auth but in the error last")
        return res.status(400).json({
            success:false,
            message:"Something went wrong while validating your token",
        })
    }

}
