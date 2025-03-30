import React from 'react'

function Stats({title,separation,para}) {
  return (
    <div className=' flex gap-4  h-[20%] w-[60%] items-center justify-start ' >

        <p className='  font-bold flex justify-end items-start  w-[48%] ' >{title}</p>
        <div>
            {
                separation === "dash" ? <div className='  h-[20px] w-[1px] bg-black ' ></div> : <div>  :  </div>
            }
        </div>
        <p className=' w-[48%] ' >{para}</p>

    </div>
  )
}

export default Stats