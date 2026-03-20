import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Cart = () => {
    const { products, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios, user, setCartItems } = useAppContext()

    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddressDropdown, setShowAddressDropdown] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState("COD")
    const [isLoading, setIsLoading] = useState(false)

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key)
            if (product) {
                product.quantity = cartItems[key]
                tempArray.push(product)
            }
        }
        setCartArray(tempArray)
    }

    // Get User Address
    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get')
            if (data.success) {
                setAddresses(data.addresses)
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0])
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getUserAddress()
        }
    }, [user])

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])

    // Calculate totals
    const subtotal = getCartAmount()
    const tax = Math.round(subtotal * 2 / 100)
    const shippingFee = 0
    const total = subtotal + tax + shippingFee

    // Place Order
    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an address")
            }

            if (cartArray.length === 0) {
                return toast.error("Please add items to cart")
            }

            setIsLoading(true)

            // Place order with COD
            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                    address: selectedAddress._id
                })

                if (data.success) {
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/my-orders')
                } else {
                    toast.error(data.message)
                }
            } else {
                // Place order with Online Payment
                const { data } = await axios.post('/api/order/online', {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                })

                if (data.success) {
                    navigate(`/payment/${data.order._id}`)
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // EMPTY CART STATE
    if (cartArray.length === 0 && products.length > 0) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-16">
                <div className="text-center py-20 px-4">
                    {/* Empty Cart Icon */}
                    <div className="flex justify-center mb-6">
                        <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Your Cart is Empty
                    </h2>

                    <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                        Looks like you haven't added any items yet. Start shopping to find amazing products!
                    </p>

                    <button
                        onClick={() => {
                            navigate("/products")
                            scrollTo(0, 0)
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <svg width="20" height="20" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13M6.143 1 1 5.5 6.143 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    return products.length > 0 && cartItems ? (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* PAGE HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Shopping Cart
                        <span className="ml-3 inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xl font-semibold">
                            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-2">Review your items before checkout</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SECTION - CART ITEMS */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* COLUMN HEADERS */}
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 text-gray-600 text-sm font-bold pb-4 border-b-2 border-gray-200 px-4">
                            <p className="text-left">Product</p>
                            <p className="text-center">Subtotal</p>
                            <p className="text-center">Qty</p>
                            <p className="text-right">Action</p>
                        </div>

                        {/* CART ITEMS LIST */}
                        {cartArray.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 items-center">

                                    {/* PRODUCT INFO */}
                                    <div
                                        onClick={() => {
                                            navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                                            scrollTo(0, 0)
                                        }}
                                        className="flex gap-4 cursor-pointer group"
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2 border border-gray-200 group-hover:border-indigo-300 transition-colors">
                                            <img
                                                className="w-full h-full object-contain"
                                                src={product.image[0]}
                                                alt={product.name}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                {product.name}
                                            </h3>

                                            <p className="text-xs md:text-sm text-gray-500 mb-2">
                                                Category: <span className="font-semibold text-gray-700">{product.category}</span>
                                            </p>

                                            {product.weight && (
                                                <p className="text-xs md:text-sm text-gray-500">
                                                    Weight: <span className="font-semibold text-gray-700">{product.weight}</span>
                                                </p>
                                            )}

                                            {/* Price for mobile */}
                                            <div className="md:hidden mt-2 flex items-baseline gap-2">
                                                <p className="font-bold text-indigo-600">₹{product.offerPrice}</p>
                                                <p className="text-xs text-gray-400 line-through">₹{product.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SUBTOTAL */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 md:hidden mb-1">Subtotal</p>
                                        <p className="font-bold text-gray-800 text-base md:text-lg">
                                            ₹{product.offerPrice * product.quantity}
                                        </p>
                                    </div>

                                    {/* QUANTITY SELECTOR */}
                                    <div className="flex justify-center md:justify-center">
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                            <button
                                                onClick={() => {
                                                    if (product.quantity > 1) {
                                                        updateCartItem(product._id, product.quantity - 1)
                                                    }
                                                }}
                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors font-bold"
                                            >
                                                −
                                            </button>

                                            <select
                                                onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                                                value={cartItems[product._id]}
                                                className="w-10 text-center font-semibold text-gray-800 bg-gray-100 border-0 outline-none cursor-pointer"
                                            >
                                                {Array(
                                                    cartItems[product._id] > 9
                                                        ? cartItems[product._id]
                                                        : 9
                                                ).fill('').map((_, idx) => (
                                                    <option key={idx} value={idx + 1}>
                                                        {idx + 1}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={() => updateCartItem(product._id, product.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="flex justify-center md:justify-end text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        title="Remove from cart"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* CONTINUE SHOPPING BUTTON */}
                        <button
                            onClick={() => {
                                navigate("/products")
                                scrollTo(0, 0)
                            }}
                            className="group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mt-8 transition-colors"
                        >
                            <svg width="16" height="12" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Continue Shopping
                        </button>
                    </div>

                    {/* RIGHT SECTION - ORDER SUMMARY (STICKY) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 sticky top-24 h-fit">

                            {/* HEADER */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            {/* DELIVERY ADDRESS SECTION */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <label className="text-xs font-bold uppercase text-gray-600 block mb-3">
                                    📍 Delivery Address
                                </label>

                                <button
                                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                                    className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
                                >
                                    {selectedAddress ? (
                                        <>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {selectedAddress.city}, {selectedAddress.state}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {selectedAddress.street}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">No address selected</p>
                                    )}
                                </button>

                                {/* ADDRESS DROPDOWN */}
                                {showAddressDropdown && (
                                    <div className="absolute right-0 left-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 w-80">
                                        {addresses.length > 0 ? (
                                            addresses.map((address, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setSelectedAddress(address)
                                                        setShowAddressDropdown(false)
                                                    }}
                                                    className="w-full text-left p-3 hover:bg-indigo-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                >
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {address.city}, {address.state}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {address.street}, {address.country}
                                                    </p>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="p-3 text-sm text-gray-500">No saved addresses</p>
                                        )}

                                        {/* ADD NEW ADDRESS OPTION */}
                                        <button
                                            onClick={() => {
                                                navigate("/add-address")
                                                setShowAddressDropdown(false)
                                            }}
                                            className="w-full p-3 text-center text-indigo-600 font-semibold hover:bg-indigo-50 border-t-2 border-gray-200 transition-colors"
                                        >
                                            + Add New Address
                                        </button>
                                    </div>
                                )}

                                {/* Change Address Link */}
                                <button
                                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                                    className="text-indigo-600 text-sm font-semibold hover:underline mt-2 block"
                                >
                                    Change Address
                                </button>
                            </div>

                            {/* PAYMENT METHOD SECTION */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <label className="text-xs font-bold uppercase text-gray-600 block mb-3">
                                    💳 Payment Method
                                </label>

                                <div className="space-y-2">
                                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all duration-200" style={{ borderColor: paymentOption === "COD" ? '#615fff' : undefined, backgroundColor: paymentOption === "COD" ? '#f0f4ff' : undefined }}>
                                        <input
                                            type="radio"
                                            value="COD"
                                            checked={paymentOption === "COD"}
                                            onChange={(e) => setPaymentOption(e.target.value)}
                                            className="w-4 h-4 accent-indigo-600 cursor-pointer"
                                        />
                                        <span className="ml-3 text-sm font-semibold text-gray-800">
                                            Cash On Delivery
                                        </span>
                                    </label>

                                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all duration-200" style={{ borderColor: paymentOption === "Online" ? '#615fff' : undefined, backgroundColor: paymentOption === "Online" ? '#f0f4ff' : undefined }}>
                                        <input
                                            type="radio"
                                            value="Online"
                                            checked={paymentOption === "Online"}
                                            onChange={(e) => setPaymentOption(e.target.value)}
                                            className="w-4 h-4 accent-indigo-600 cursor-pointer"
                                        />
                                        <span className="ml-3 text-sm font-semibold text-gray-800">
                                            Online Payment
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* PRICE BREAKDOWN */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-gray-800">₹{subtotal}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping Fee</span>
                                    <span className="font-semibold text-green-600">
                                        {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (2%)</span>
                                    <span className="font-semibold text-gray-800">₹{tax}</span>
                                </div>

                                {/* TOTAL AMOUNT HIGHLIGHTED */}
                                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-800 font-bold">Total Amount</span>
                                        <span className="text-2xl font-bold text-indigo-600">₹{total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* PLACE ORDER BUTTON */}
                            <button
                                onClick={placeOrder}
                                disabled={isLoading || !selectedAddress}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* INFO MESSAGE */}
                            <p className="text-xs text-gray-500 mt-4 text-center">
                                {paymentOption === "COD" 
                                    ? "✓ Free returns within 30 days" 
                                    : "✓ Secure payment processed"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Cart