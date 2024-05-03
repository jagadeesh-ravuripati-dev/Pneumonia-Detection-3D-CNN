import React, { useState } from 'react'
import axios from 'axios'
import BackButton from './../components/BackButton'
import { useNavigate } from 'react-router-dom'
import UserCard from '../components/UserCard'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state,setState] = useState('')
  const navigate = useNavigate()
  
  
  const handleValidate = (e) => {
    e.preventDefault()
    const data = {
      email:email,
      password:password
    }
    
    axios.post("http://localhost:3000/validate-login",data).then(res=>{
      if(res.data.length>0){
        navigate('/',{state:{udata:res.data[0]}})
        alert("you have successfully logged in")
        setState("success")
      }
      else{
        setState("unsuccess")
      }
    })
  }

  return (
    <div className='relative flex justify-center items-center p-4 bg-lungs'>
      <div className='absolute top-3 left-3'>
        <BackButton />
      </div>
      <form onSubmit={(e)=>handleValidate(e)} className='flex flex-col justify-start gap-y-2 bg-white p-4 rounded-md w-[400px] mb-6'>
        <h1 className='text-3xl mb-5 font-bold'>Sign In</h1>
        <label className='font-bold'>Email</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='email' placeholder='Ex: example@email.com' onChange={(e) => setEmail(e.target.value)} />
        <label className='font-bold'>Enter Password</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='p-2 text-center text-white font-bold bg-green-400 mt-2 transition-all duration-500 hover:scale-95'>Submit</button>
        {
          state==="unsuccess" && (
            <h2  className='text-red-500'>you have entered Email or password wrong</h2>
          )
        }
      </form>
    </div>
  )
}

export default Signup
