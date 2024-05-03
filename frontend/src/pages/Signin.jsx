import React, { useState } from 'react'
import axios from 'axios'
import BackButton from './../components/BackButton'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [name, setName] = useState('')
  const [age, setAge] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:name,
      age:age,
      email:email,
      password:password
    }
    axios.post('http://localhost:3000/logins',data).then(res=>{

      console.log(res)
      if(res.data.message==='success'){
        navigate('/signup')
        alert("you have registered successfully")
      }
    })
  }

  return (
    <div className='relative flex justify-center items-center p-4 bg-lungs'>
      <div className='absolute top-3 left-3'>
        <BackButton />
      </div>
      <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col justify-start gap-y-2 bg-white p-4 rounded-md w-[400px]'>
        <h1 className='text-3xl mb-5 font-bold'>Register</h1>
        <label className='font-bold'>Name</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='text' placeholder='Ex: Jagadeesh' onChange={(e) => setName(e.target.value)} />
        <label className='font-bold'>Age</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='number' placeholder='Ex: 21' onChange={(e) => setAge(e.target.value)} />
        <label className='font-bold'>Email</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='email' placeholder='Ex: example@email.com' onChange={(e) => setEmail(e.target.value)} />
        <label className='font-bold'>Create Password</label>
        <input className='border-2 border-slate-400 w-[350px] p-2' type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='p-2 text-center text-white font-bold bg-green-400 mt-2 mb-6 transition-all duration-500 hover:scale-95'>Register</button>
      </form>
    </div>
  )
}

export default Signin
