const User = require("../models/User");
const bcrypt = require("bcrypt")
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP")
const crypto = require("crypto");


const jwt = require("jsonwebtoken");


exports.signup = async (req,res)=>{

    try {
        
        //data lelo

    const {
        username,
        email,
        password,
        confirmPassword,
        otp,
    } = req.body;

    //data verify

    if(
        !username||
        !email||
        !password||
        !confirmPassword ||!otp){
            res.status(401).json({
                success:false,
                message:"All the fields are required",
            })
        }

        //check if already exists

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return  res.status(400).json({
                success:false,
                message:"User already exists please login",
            })
        }

    //password and confirm password ko match krenge

    if( password !== confirmPassword){
        return res.status(401).json({
            success:false,
            message:"Passwords does not match",
        })
    }

    //check for the otp and verify

    const savedOTP = await OTP.findOne({email}).sort( {created_At : -1} ).limit(1);
    const confirmOTP = savedOTP.otp;
    console.log("savedotp",confirmOTP)
    console.log("otp in body",otp)

    if(savedOTP.length ===0){
        return res.status(401).json({
            success:false,
            message:"OTP invalid",
        })
    }

    else if(confirmOTP !== otp){
        return res.status(401).json({
            success:false,
            message:"OTP dosen't match",
        })
    }

    //Username should be unique

    const existingUsername = await User.findOne({username});

    if(existingUsername){
       return res.status(400).json({
            success:false,
            message:"Username already exists please choose a different username",
        })
    }

     //Username should be unique

    //  const existingPhoneNumber = await User.findOne({phonenumber});

    //  if(existingPhoneNumber){
    //     return res.status(400).json({
    //          success:false,
    //          message:"This phone no. is already being registered with us",
    //      })
    //  }

     //Hashing the password  before saving in the DB

     
     const hashedPassword = await bcrypt.hash(password,10);


    // database main update kr denge

     const user = User.create(
        {
            username,
            email,
            password:hashedPassword,
            created_At:Date.now(),
            otp,
        }
     )
    


    //res send krde

    res.status(200).json({
        success:true,
        message:"SignUp successfull",
    })


    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"SignUp failed",
        })
    }

}

exports.sendOtp = async (req,res)=>{

    try {
        
        //Data from the body
    const {email} = req.body;

    
    //check if email is already there
    const existingEmail = await User.findOne({email});

   
    
    if(existingEmail){
       return res.status(401).json({
            success:false,
            message:"Email is already registered can't send OTP"
        })
    }
    //otp generator
  
    const Otp =  otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
   
    //unique OTP creation
    
    const uniqueOTP = crypto
                        .createHash("sha256")
                        .update(Otp + email + Date.now())
                        .digest("hex")
                        .substring(0,6)
                       
    const finalOTP = uniqueOTP.toUpperCase();
   
    
    //DB main update

    const newOTP = new OTP({
        email,
        otp:finalOTP,
        created_At:Date.now(),
    })

    await OTP.create(newOTP);

    return res.status(200).json({
        success:true,
        message:"OTP sent Successfully",
        data:finalOTP,
    })


    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:"OTP Failed"
        })

    }

}

exports.login = async (req,res)=>{
    try {
        
        const {email,phonenumber,username,password} = req.body;

        if((!email && !phonenumber && !username ) || !password){
            return res.status(401).json({
                success:false,
                message:"All the fields are required"
            })
        }

        // console.log("email:",email)
        // console.log("phone:",phonenumber)
        // console.log("username:",username)

        const user = await User.findOne({email}) || await User.findOne({phonenumber}) || await User.findOne({username});

      

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            }) 
        }

        // check for the password

        const storedPass =  await bcrypt.compare(password,user.password);

        if(!storedPass){
            return res.status(401).json({
                success:false,
                message:"Passwords INCORRECT"
            }) 
        }

        

        //token creation
        
        const token = jwt.sign(
            {   
                email:user.email,
                id:user._id
            }
             , process.env.JWT_SECRET 
             , {expiresIn:"24h"}
                                            
        )

        user.token = token;
        user.password = undefined;

        //cookie creation

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            user,
            token,
            message: "User logged in successfully",
        });

        


    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"Log in  failed"
        }) 
    }
}


