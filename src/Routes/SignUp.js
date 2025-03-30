import React, { useEffect, useState } from 'react'
import snowman from "../assets/Auth/snowman.png"
import { useNavigate } from 'react-router-dom'
import logo from "../assets/Navbar/logo.png"
import { useDispatch } from 'react-redux';
import { sendotp, signUp } from '../services/operations/authAPI';


function SignUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signData,setSignData] = useState(
        {
            "username":"",
            "email":"",
            "password":"",
            "confirmPassword":"",
        }
    )


    const updateSignData = (e) =>{

        setSignData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))

    }

    const sendSignUpData = async () =>{

        console.log("email in sign up data",signData.email )

        dispatch(sendotp(signData.email,navigate))

    }

    

  return (
    <div className=' w-full flex justify-center items-center h-screen bg-[#47CBF5] back-img  ' >

        <img onClick={()=>{navigate("/")}} className=' cursor-pointer bg-[#36484e] rounded-lg w-[160px] top-[20px] left-[20px] h-[60px] absolute ' src={logo} />

        <div className=' h-[80%] rounded-[21px] w-[75%] p-3 bg-[white] ' >

            <div className=' w-[100%] h-[20%] family-FP underline underline-offset-4 flex items-center justify-center text-[#173F29] text-[64px] ' >Join the Festivities</div>

            

            <div className=' w-[100%] flex  p-5 h-[80%] ' >

            
            <div className=' family-irish flex text-start items-start justify-start text-[40px] w-[30%] ' >

                <p><span className=' text-[#606B18] ' >NEW HERE? </span>Sign <br/> up and begin  <br/> your magical <br/> journey</p>
                <img className=' absolute h-[330px] top-[343px] left-[220px] w-[450px] ' src={snowman} />
            </div>

                <div className=' flex flex-col items-center justify-evenly w-[70%] ' >
                    <div className=' family-jura items-center justify-end flex gap-3 w-[100%]  ' >
                        <p className=' text-[30px] ' >USERNAME</p>
                        <input onChange={updateSignData} name='username' className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' family-jura  items-center w-[100%]   justify-end  flex gap-3 ' >
                        <p className=' text-[30px] ' >EMAIL</p>
                        <input onChange={updateSignData} name='email' className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' family-jura items-center justify-end  flex gap-3  w-[100%]  ' >
                        <p className=' text-[30px] ' >PASSWORD</p>
                        <input onChange={updateSignData} name='password' className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' family-jura items-center justify-end flex gap-3  w-[100%]  ' >
                        <p className=' text-[30px] ' >CONFIRM  PASSWORD</p>
                        <input onChange={updateSignData} name='confirmPassword' className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' flex flex-col items-center gap-3  w-[100%]  ' >
                        <button onClick={sendSignUpData} className=' family-FP w-[200px] rounded-[7px] h-[50px] tracking-[3px] text-[20px] text-white bg-black  ' >SIGN UP</button>
                        <p onClick={()=>{navigate("/login")}}  className=' cursor-pointer underline text-blue-600 family-irish ' >Already a member... Login !</p>
                    </div>
                    
                </div>


            </div>

            

        </div>


    </div>
  )
}

export default SignUp