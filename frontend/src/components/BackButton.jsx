import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate('/')} className='p-2 w-[80px] bg-blue-300 rounded-md transition-all duration-500 hover:scale-110 cursor-pointer'>
      <IoArrowBackSharp className='w-full text-white' />
    </div>
  )
}

export default BackButton
