import React, { useEffect, useState } from 'react'

import { useAppContext } from '../context/AppContext'

const MyOrders = () => {

  const [myorders,SetMyOrders] = useState([])
  const {axios,user} = useAppContext()

  const fetchMyOrders = async ()=>{ 
     try {
      const {data}= await axios.get('/api/order/user')
      if(data.success){
        SetMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(user){
       fetchMyOrders()
    }
   
  },[user])

  return (
    <div className='mt-30 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {myorders.map((order,index)=>(
          <div key={index} className='border border-gray-700 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
            <p className='flex justify-between md:items-center text-gray-900 md:font-medium max-md:flex-col gap-4 pb-4 border-b border-gray-300'>
              <span>OrderId : {order._id}</span>
              <span>Payment : {order.paymentType}</span>
              <span>Total Amount : ₹{order.amount}</span>
            </p>
            {order.items.map((item,index)=>(
              <div key={index}className={`relative ${
              order.items.length !== index + 1 && "border-b"
            } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4
             py-5 md:gap-16 w-full max-w-4xl`}>
                  <div className='flex items-center mb-4 md:mb-0'>
                       <div className='min-w-24 w-24 h-24 md:min-w-32 md:w-32 md:h-32'>
                          <img src={item.product.image[0]} alt=""  className='w-full h-full object-contain rounded'/>
                       </div>

                       <div className='ml-4'>
                            <h2 className='text-xl'>{item.product.name}</h2>
                            <p>Category:{item.product.category}</p>
                       </div>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-gray-600" >
                    <p>Quantity: {item.quantity || "1"}</p>
                    <p>Status:<span className="text-green-600">{order.status}</span></p>
                    <p>Date: {new Date (order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <p className= "text-primary text-lg font-semibold min-w-[120px] text-right">
                    Amount ₹ {item.product.offerPrice * item.quantity}
                    </p>

              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default MyOrders