import React from 'react'
import { BiEdit } from "react-icons/bi";
import Stats from './Stats';
import logo from "../../assets/Navbar/logo.png"
import HoHo from "../../assets/Profile/HoHoHo.png"

function ProfileMain() {
  return (
    <div className=' bg-[#9C1621] flex items-center justify-center h-screen w-full ' >

        <div className=' bg-[white] relative flex flex-col rounded-[7px] w-[90%] h-[90%] ' >

            <div className=' w-[100%] flex h-[49%]' >
            <img className=' absolute left-[50px] border-2 border-black top-[40px] w-[200px] h-[200px]  rounded-[300px] ' src={logo}  />
                <div className=' text-[30px]   flex flex-col items-start family-cat justify-center w-[90%] h-[100%] ' >

                    <Stats title={"Name"} separation={"dash"} para={"John Doe"} />
                    <Stats title={"Email"}  separation={"dash"} para={"xyz@gmail.com"} />
                    <Stats title={"Username"}  separation={"dash"} para={"John@123"} />
                    <Stats title={"PhoneNumber"}  separation={"dash"} para={"987322432"} />
                    
                </div>
                <div className='  pt-3 pr-6 justify-end items-start flex w-[10%] h-[100%] ' >
                    <button className=' text-[22px] family-cat flex items-center justify-center gap-1 w-[100px] h-[40px] rounded-[6px] bg-[blue] text-[white] ' ><BiEdit />Edit</button>
                </div>
            </div>

            <div className=' h-[2px] bg-black self-center w-[80%] ' ></div>

            <div className=' h-[51%] family-itim text-[28px] pl-[100px] flex flex-col items-start  justify-around rounded-[7px] w-[100%] ' >

                <div >
                    <p>Global Rank : 12567</p>
                    <p>Total Score : 530</p>
                </div>

           
                <button className=' bg-[#7C0709] shadow-black rounded-[7px] text-white family-L w-[120px] h-[50px]  text-[22px] ' >LogOut</button>
              


                <img className='absolute right-[12px] w-[450px] h-[300px] ' src={HoHo} />
                

            </div>

        </div>

    </div>
  )
}

export default ProfileMain