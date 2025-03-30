import React from 'react'
import snowman from "../assets/Auth/snowman.png"
import { useNavigate } from 'react-router-dom'
import logo from "../assets/Navbar/logo.png"

function Login() {

    const navigate = useNavigate();

  return (
    <div className=' w-full flex justify-center items-center h-screen bg-[#47CBF5] back-img  ' >

        <img onClick={()=>{navigate("/")}} className=' cursor-pointer bg-[#36484e] rounded-lg w-[160px] top-[20px] left-[20px] h-[60px] absolute ' src={logo} />

        <div className=' h-[80%] rounded-[21px] w-[75%] bg-[white] ' >

        

            <div className=' w-[100%] h-[20%] family-FP underline underline-offset-4 flex items-center justify-center text-[#173F29] text-[64px] ' >Enter The Workshop</div>

            <div className=' w-[100%] flex  p-5 h-[80%] ' >

                <div className=' flex flex-col pl-[25px] items-center justify-evenly w-[50%] ' >
                    <div className=' family-jura items-center flex gap-3 ' >
                        <p className=' text-[30px] ' >USERNAME</p>
                        <input className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' family-jura items-center flex gap-3 ' >
                        <p className=' text-[30px] ' >PASSWORD</p>
                        <input className=' bg-[#F5F0F0] rounded-[13px] outline-none pl-3 h-[50px] w-[400px] ' />
                    </div>

                    <div className=' flex flex-col items-center gap-3 ' >
                        <button className=' family-FP w-[150px] rounded-[7px] h-[50px] tracking-[3px] text-[20px] text-white bg-black  ' >LOGIN</button>
                        <p onClick={()=>{navigate("/signup")}} className=' cursor-pointer underline text-blue-600 family-irish ' >Not a member Yet... Sign up!</p>
                    </div>
                    
                </div>

                <div className=' family-irish flex text-end items-start justify-end text-[40px] w-[50%] ' >

                    <p><span className=' text-[#606B18] ' >EXISTING USER ? </span><br/>Login And get <br/> back to the <br/> adventure</p>
                    <img className=' absolute h-[400px] top-[280px] right-[280px] w-[450px] ' src={snowman} />
                </div>

            </div>

            

        </div>


    </div>
  )
}

export default Login