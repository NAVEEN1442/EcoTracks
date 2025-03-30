import React from 'react'
import Navbar from "../Components/GLOBAL/Navbar";
import Main from '../Components/Home/Main';

function Home() {
  return (
    <div className=' no-scrollbar text-white overflow-auto bg-[#9C1621] h-screen w-full  ' >

        <Navbar/>
        <Main/>

        
    </div>
  )
}

export default Home