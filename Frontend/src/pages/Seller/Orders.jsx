import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { axios } = useAppContext()

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 min-h-[calc(100vh-73px)] py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // EMPTY STATE
  if (orders.length === 0) {
    return (
      <div className="w-full bg-gray-50 min-h-[calc(100vh-73px)] flex items-center justify-center py-8 px-4">
        <div className="text-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-300 mx-auto mb-4"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-600">
            You haven't received any orders. When customers place orders, they will appear here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-50 min-h-[calc(100vh-73px)] overflow-y-auto no-scrollbar'>
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 Orders Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mt-4"></div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-3xl font-bold text-indigo-600 mb-1">{orders.length}</p>
            <p className="text-sm font-semibold text-gray-600">Total Orders</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-3xl font-bold text-green-600 mb-1">
              {orders.filter(o => o.isPaid).length}
            </p>
            <p className="text-sm font-semibold text-gray-600">Paid Orders</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-3xl font-bold text-orange-600 mb-1">
              {orders.filter(o => !o.isPaid).length}
            </p>
            <p className="text-sm font-semibold text-gray-600">Pending Payment</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-3xl font-bold text-blue-600 mb-1">
              ₹{orders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* ORDER HEADER */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-5 md:p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">

                {/* ORDER ID & ITEMS */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Order ID</p>
                  <p className="font-mono font-bold text-gray-800 text-sm md:text-base truncate">
                    {order._id}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    📦 <span className="font-semibold">{order.items.length} item(s)</span>
                  </p>
                </div>

                {/* CUSTOMER INFO */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Customer</p>
                  <p className="font-semibold text-gray-800 text-sm md:text-base">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    📍 {order.address?.city}, {order.address?.state}
                  </p>
                </div>

                {/* AMOUNT & PAYMENT */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Amount</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ₹{order.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 font-semibold">
                    {order.paymentType === 'COD' ? '💳 COD' : '🏦 Online'}
                  </p>
                </div>

                {/* PAYMENT STATUS */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Payment</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${order.isPaid ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    <span className={`font-bold text-sm ${order.isPaid ? 'text-green-700' : 'text-orange-700'}`}>
                      {order.isPaid ? '✅ Paid' : '⏳ Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">
                    📅 {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* ITEMS SECTION */}
              <div className="px-5 md:px-6 py-4 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800 mb-3">📦 Order Items</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain rounded bg-white p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-indigo-600">
                          ₹{item.product.offerPrice}
                        </p>
                        <p className="text-xs text-gray-600">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="px-5 md:px-6 py-4 bg-gray-50">
                <p className="text-sm font-bold text-gray-800 mb-3">👤 Delivery Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Address */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Address</p>
                    <p className="text-sm text-gray-800 leading-snug">
                      {order.address?.street}
                    </p>
                    <p className="text-sm text-gray-800">
                      {order.address?.city}, {order.address?.state}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Contact</p>
                    <p className="text-sm text-gray-800 font-mono">
                      {order.address?.phone}
                    </p>
                    <p className="text-sm text-gray-800 truncate">
                      {order.address?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders