import React, { useEffect } from 'react'
import { BsLungs } from "react-icons/bs"
import { Link, json, useLocation,useNavigate } from 'react-router-dom'
import lungs from './../assets/lungs.jpg'
import { useState } from 'react'
import { MdOutlineCloudUpload } from "react-icons/md";
import { useRef } from 'react'
import { useParallax } from 'react-scroll-parallax'
import axios from 'axios'
import Spinnner from './../components/spinner.jsx'

function Home() {
    const parallax1 = useParallax({
        scale: [1, 0, 'easeInCubic'],
        opacity: [1, 0, 'easeInCubic']
    })
    const handleUpload = () => {
        Ref.current.click()
    }

    const Ref = useRef(null)
    const [file, setFile] = useState()
    const [result, setResult] = useState()
    const [prob, setProb] = useState('positive')
    const location = useLocation();
    const [userData, setUserData] = useState(location.state?.udata);
    const navigate = useNavigate();

    
    useEffect(()=>{
        if(result){
            if(result.prediction>=0.6){
                setProb('negative')
            }
            const data = {
                patient_name:userData.name,
                patient_age:userData.age,
                patient_results:prob
            }
            axios.post('http://localhost:3000/patients',data).then(res=>{console.log("history saved succesfully")})
        }
    },[result])
    const handleLogout = () =>{
        setUserData(null)
        setResult(null)
    }
    console.log(userData)

    async function handleClick() {
        if(!userData){
            alert('please login')
            navigate('/signup')
        }
        const formData = new FormData()
        console.log(file)
        formData.append('file', file)
        console.log(formData)
        try {
            const response = await fetch("http://localhost:5000/api/data", {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                setResult(await response.json());
            }
            else {
                console.error("Failed to upload");
            }
        }
        catch (error) {
            console.error("Error Uploading file")
        }
    }

    return (
        <div className='h-[400vh]'>
            <div className='fixed w-[1200px] flex justify-between items-center py-2 px-[20px] bg-white border-2 border-gray left-0 right-0 top-6 mx-auto rounded-2xl shadow-2xl'>
                <div className='flex items-center gap-x-2'>
                    <BsLungs className='text-3xl' />
                    <h1 className='text-2xl'>DocWeb</h1>
                </div>
                <div className='flex items-center gap-x-4'>
                    {
                        !userData && (
                            <div>
                                <Link to='/signin' className='border-2  text-white p-2 bg-cyan-800 rounded-2xl transition-all hover:bg-black hover:text-white hover:scale-110 duration-300 font-bold mr-2'>Sign Up</Link>
                                <Link to='/signup' className='border-2  text-white p-2 bg-cyan-800 rounded-2xl transition-all hover:bg-black hover:text-white hover:scale-110 duration-300 font-bold'>Sign In</Link>
                            </div>
                        )
                    }
                    {
                        userData && (
                            <div onClick={()=>handleLogout()} className='border-2  text-white p-2 bg-cyan-800 rounded-2xl transition-all hover:bg-black hover:text-white hover:scale-110 duration-300 font-bold cursor-pointer'>Logout</div>
                        )
                    }
                    <Link to='/history' className='border-2  text-white p-2 bg-cyan-800 rounded-2xl transition-all hover:bg-black hover:text-white hover:scale-110 duration-300 font-bold'>History</Link>

                </div>
            </div>
            <div className='bg-transp-lung'>
                <div className="flex justify-center items-center py-[150px] gap-x-5">
                    <img src={lungs} ref={parallax1.ref} className='w-[350px] h-[350px] rounded-lg shadow-2xl object-cover' />
                    <div className='flex flex-col gap-y-2'>
                        <h1 className='text-[100px] text-white'>  Welcome</h1>
                        <div className='flex items-center gap-x-2'>
                            <h1 className='text-2xl text-white'>upload CT scan here..</h1>
                            <div onClick={() => handleUpload()} >
                                <MdOutlineCloudUpload className='text-3xl w-full text-white cursor-pointer' />
                                <input type='file' onChange={(e) => setFile(e.target.files[0])} ref={Ref} className='hidden' />
                            </div>
                            {
                                file && (
                                    <button className='text-xl transition-all duration-200 hover:scale-95 p-2 rounded-2xl bg-sky-700 text-white' onClick={() => handleClick()}>submit</button>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex justify-center items-center py-[150px] gap-x-6 bg-gray-50 y-100 rounded-xl'>
                <div className='flex items-center gap-x-6 justify-start'>
                    {
                        userData && (
                            <div className='flex flex-col p-4 border-2 border-double border-slate-500 rounded-md justify-start gap-y-2 shadow-2xl transition-all duration-500 hover:scale-110'>
                                <h1 className='text-2xl font-bold mb-2'>User Details</h1>
                                <h1 className='text-xl font-semibold mb-2'>Name</h1>
                                <h1 className='rounded-xl text-xl w-[350px] border-1 border-slate-300 bg-cyan-800 p-4 text-white'>{userData.name}</h1>
                                <h1 className='text-xl font-semibold mb-2'>Age</h1>
                                <h1 className='rounded-xl text-xl w-[350px] border-1 border-slate-300 bg-cyan-800 p-4 text-white'>{userData.age}</h1>
                                <h1 className='text-2xl font-semibold mb-2'>E-Mail</h1>
                                <h1 className='rounded-xl text-xl w-[350px] border-1 border-slate-300 bg-cyan-800 mb-2 p-4 text-white'>{userData.email}</h1>
                            </div>
                        )
                    }
                    <div className='flex flex-col gap-y-2 justify-between items-center'>
                        <h1 className='text-[100px] text-cyan-800'>Your Result</h1>
                        {
                            result &&  (
                                <div >
                                    <h1><span className='text-[25px] text-gray-600'>Probability of Abnormality..  </span><span className='text-[25px] text-red-500'>{result.prediction}</span></h1>
                                    <h1><span className='text-[25px] text-gray-600'>Probability of Normality..          </span><span className='text-[25px] text-green-500'>{(1 - result.prediction).toFixed(3)}    </span></h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
