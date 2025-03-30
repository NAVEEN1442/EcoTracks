const User = require("../models/User");

exports.updateProfile = async (req,res)=>{

    try {
        
        const {firstName,lastName,DOB} = req.body;
        const userId = req.user.id;

        console.log("userID",userId);

        const updateFields = {};

        if(firstName) updateFields.firstName = firstName;
        if(lastName) updateFields.lastName = lastName;
        if(DOB) updateFields.DOB = DOB;

        console.log("updateFields",updateFields);

        const update = await User.findByIdAndUpdate(
            userId,

            {
                $set:updateFields
                
            },

            {new:true},
        )

        console.log("updatesss",update);
        

        return res.status(200).json({
            success:true,
            message:"Profile updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Profile updated failed"
        })

    }

}

exports.deleteProfile = async (req,res)=>{
    
    try {
        
        const userId = req.user.id;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id not found"
            })
    
        }

        const deleteUser = await User.findByIdAndDelete(
            userId,
            
        )

        return res.status(200).json({
            success:true,
            message:"Profile Deleted"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Profile delete failed"
        })

    }

}

exports.getUserProfile = async (req,res)=>{

    try {
        
        const userId = req.user.id;

        console.log(userId)

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id not found"
            })
    
        }

        const userProfile = await User.findById(userId);

        return res.status(200).json({
            success:true,
            message:"Profile Fetched",
            userProfile
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Profile fetch failed"
        })

    }

}

//display pic update

//get products purchased

//seller dashboard