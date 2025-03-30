const express = require("express");
const router = express.Router();

const {signup,sendOtp,login} = require("../controllers/Auth")
const {auth } = require("../middlewares/auth");



router.post("/signup",signup); //done
router.post("/sendOtp",sendOtp); //done
router.post("/login",login); //done




module.exports = router;