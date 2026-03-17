import React, { useEffect } from 'react'
import { useState } from 'react'
import {useAppContext} from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'


const SellerLogin = () => {
    const {isSeller,setIsSeller,navigate,axios} = useAppContext()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


  const onSubmitHandler = async (event)=>{
    try {
      event.preventDefault();
      const {data} = await axios.post('/api/seller/login',{email,password})
      if(data.success){
        setIsSeller(true)
        navigate('/seller')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  }


    useEffect(()=>{
      if(isSeller){
        navigate("/seller")
      }
    },[isSeller])

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex iems-center text-sm 
    text-gray-900' >

      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
      rounded-lg shadow-xl border bg-blue-300 border-gray-900'>
        <p className='text-2xl font-medium m-auto'><span >Seller</span> Login</p>

          <div className='w-full'>
            <p >Email</p>
            <input className='border border-gray-600 rounded w-full p-2 mt-1 outline-primary' 
            required
            type="email" placeholder='enter your email'
            onChange={(e)=> setEmail(e.target.value)} 
            value={email}/>

            <p>Password</p>
            <input  className='border border-gray-600 rounded w-full p-2 mt-1 outline-primary'
            required
            type="password" placeholder='enter your password'
            onChange={(e)=> setPassword(e.target.value)}
            value={password} />
            
          </div>

          <button className='bg-primary text-white w-full py-2 rounded-md
          cursor-pointer hover:bg-blue-500'>
            Login
          </button>


      </div>


    </form>
  )
}

export default SellerLogin