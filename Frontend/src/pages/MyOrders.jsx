import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const { axios, user, navigate } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyOrders(data.orders)
      } else {
        toast.error(data.message || "Failed to fetch orders")
      }
    } catch (error) {
      toast.error(error.message || "Error fetching orders")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  // Status badge with color coding
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '⏳' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '⚙️' },
      shipped: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: '📦' },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: '✅' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: '❌' }
    }

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending
    return config
  }

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // EMPTY STATE
  if (myOrders.length === 0) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <svg className="w-32 h-32 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md">You haven't placed any orders. Start shopping to see your orders here!</p>

          <button
            onClick={() => {
              navigate('/products')
              scrollTo(0, 0)
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  // ORDERS LIST
  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders</p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full mt-4"></div>
        </div>

        {/* ORDERS GRID */}
        <div className="space-y-6">
          {myOrders.map((order, orderIndex) => {
            const statusConfig = getStatusBadge(order.status)
            const isExpanded = expandedOrder === orderIndex
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

            return (
              <div
                key={orderIndex}
                className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* ORDER HEADER */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : orderIndex)}
                  className="w-full px-6 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase mb-1">Order ID</p>
                    <p className="text-sm md:text-base font-mono text-gray-800 break-all">{order._id}</p>
                  </div>

                  <div className="text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase mb-1">Order Date</p>
                    <p className="text-sm md:text-base text-gray-800">{orderDate}</p>
                  </div>

                  <div className={`${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-lg font-semibold flex items-center gap-2 min-w-fit`}>
                    <span>{statusConfig.icon}</span>
                    <span className="text-sm md:text-base">{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
                  </div>

                  <div className="text-right">
                    <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase mb-1">Total Amount</p>
                    <p className="text-lg md:text-xl font-bold text-indigo-600">₹{order.amount}</p>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`hidden md:block text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {/* ORDER ITEMS - EXPANDABLE */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {/* ORDER DETAILS */}
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-600 uppercase mb-2">Payment Method</p>
                          <p className="text-gray-800 font-semibold">
                            {order.paymentType === 'COD' ? '💳 Cash on Delivery' : '🏦 Online Payment'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-gray-600 uppercase mb-2">Delivery Address</p>
                          <p className="text-gray-800 text-sm">
                            {order.address?.street}, {order.address?.city}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-gray-600 uppercase mb-2">Items Count</p>
                          <p className="text-gray-800 font-semibold">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                        </div>
                      </div>
                    </div>

                    {/* ITEMS LIST */}
                    <div className="px-6 py-4 space-y-4">
                      <h3 className="font-bold text-gray-800 mb-4">Order Items</h3>

                      {order.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-white rounded-lg p-4 border border-gray-100 hover:border-indigo-200 transition-colors"
                        >
                          <div className="flex gap-4">
                            {/* Product Image */}
                            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2 border border-gray-200">
                              <img
                                src={item.product.image[0]}
                                alt={item.product.name}
                                className="w-full h-full object-contain rounded"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm md:text-base">
                                  {item.product.name}
                                </h4>
                                <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-600">
                                  <p>Category: <span className="font-semibold text-gray-800">{item.product.category}</span></p>
                                  <p>Quantity: <span className="font-semibold text-gray-800">{item.quantity}</span></p>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Price per item</p>
                                <p className="text-lg font-bold text-indigo-600">₹{item.product.offerPrice}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Subtotal: <span className="font-semibold text-gray-800">₹{item.product.offerPrice * item.quantity}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ORDER ACTIONS */}
                    <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row gap-3">
                      <button className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold transition-colors text-sm">
                        📋 View Invoice
                      </button>

                      {order.status?.toLowerCase() === 'shipped' && (
                        <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors text-sm">
                          📍 Track Order
                        </button>
                      )}

                      {order.status?.toLowerCase() === 'delivered' && (
                        <button className="flex-1 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-semibold transition-colors text-sm">
                          ⭐ Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* HELP SECTION */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Need Help?</h3>
          <p className="text-gray-700 mb-4">
            If you have any questions about your orders or need assistance, please reach out to our customer support team.
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            📞 Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyOrders