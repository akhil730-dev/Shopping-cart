import React, { useEffect, useState } from 'react'
import box from '../../assets/box.png'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const { axios } = useAppContext()

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='flex-1 h-screen overflow-y-auto bg-gray-50 no-scrollbar'>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-00 mb-8">Orders List</h2>
        
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              
              {/* 1. Product Details */}
              <div className="flex gap-4">
                <img className="w-12 h-12 min-w-[48px] object-contain" src={box} alt="boxIcon" />
                <div className="flex-1 min-w-0">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="font-semibold text-gray-900 leading-snug break-words">
                      {item.product.name} 
                      <span className="text-blue-600 ml-2 whitespace-nowrap">x {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 2. Customer Info */}
              <div className="text-sm text-gray-600 space-y-1 md:border-l md:pl-6 border-gray-100">
                <p className='font-medium text-gray-900'>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="line-clamp-2">{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}</p>
                <p className="mt-2 font-medium text-gray-800">{order.address.phone}</p>
              </div>

              {/* 3. Payment Info */}
              <div className="flex flex-col justify-center">
                <p className="text-xl font-medium text-gray-700">₹{order.amount.toLocaleString()}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Method: {order.paymentType}
                </p>
              </div>

              {/* 4. Status & Timing */}
              <div className="flex flex-col justify-center text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${order.isPaid ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                  <span className="font-medium text-gray-700">{order.isPaid ? "Paid" : "Pending"}</span>
                </div>
                <p className="text-gray-500">
                  Ordered: <span className="font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders