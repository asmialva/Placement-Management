import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function AdminLogin() {
  const history=useNavigate ()
  const [formData, setFormData] = useState({});
  const submitForm=(event)=>{
    event.preventDefault();
    console.log(formData)
    axios.post('http://localhost:8000/admin_login/',formData).then((response)=>{
      console.log(response.data.message);
      if(response.data.message){history('/admin')
      }else{
        alert(response.data.detail)
      }
    }).catch((error)=>{alert('invalid credentials')})
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
  return (
    <> <div className="md:w-1/4 w-11/12 mt-3 mx-auto">
    <h2 className='text-3xl my-3 font-bold'>Admin Login</h2>
      <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitForm}>
        <div className="mb-4">
          <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input name='usn' onChange={handleChange} value={formData.usn} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input name='password' onChange={handleChange} value={formData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
          
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
         
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 asmi Corp. All rights reserved.
      </p>
    </div></>
  )
}
