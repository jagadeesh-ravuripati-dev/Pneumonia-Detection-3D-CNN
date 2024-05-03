import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/spinner.jsx'
import BackButton from '../components/BackButton.jsx'

function History() {
  const [loading, setLoading] = useState(false)
  const [array, setArray] = useState([])
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3000/patients').then(res => {
      console.log(res.data)
      setArray(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <div className='w-full p-4 bg-lungs'>
      <BackButton/>
      <h1 className='text-3xl my-8 text-red-100'>Patient History</h1>
      {loading ? (<Spinner />) :
        (
          <div className='p-4'>
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-orange-200 rounded-md text-yellow-200 text-center'>Patient ID</th>
                  <th className='border border-orange-200 rounded-md text-yellow-200 text-center'>Patient Name</th>
                  <th className='border border-orange-200 rounded-md text-yellow-200 text-center max-md:hidden'>Patient Age</th>
                  <th className='border border-orange-200  rounded-md text-yellow-200 text-center'>Patient Result</th>
                </tr>
              </thead>
              <tbody>
                {array.map((patient)=>(
                  <tr key={patient.patient_id} className='h-8'>
                    <td className='border border-white text-lime-100 rounded-md text-center'>
                      {patient.patient_id}
                    </td>
                    <td className='border border-white text-lime-100 rounded-md text-center'>
                      {patient.patient_name}
                    </td>
                    <td className='border border-white text-lime-100 rounded-md text-center max-md:hidden'>
                      {patient.patient_age}
                    </td>
                    <td className='border border-white text-lime-100 rounded-md text-center'>
                      {patient.patient_results}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export default History
