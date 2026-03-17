import { useParams } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Payment = () => {
    const { orderId } = useParams()
    const { axios, navigate, setCartItems } = useAppContext()

    const handlePayment = async () => {
        try {
            const { data } = await axios.post('/api/order/verify', { orderId })
            if (data.success) {
                toast.success(data.message)
                setCartItems({})
                navigate('/my-orders')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="mt-30 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">

                {/* Header */}
                <h2 className="text-2xl font-medium mb-2 text-center">Payment Details</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Enter your card details to complete payment</p>

                {/* Card icons */}
                <div className="flex gap-2 mb-6">
                    
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" className="h-6" />
                </div>

                <div className="space-y-4">
                    {/* Card Number */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Card Number</label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-indigo-500 transition text-sm"
                        />
                    </div>

                    {/* Card Holder */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Card Holder Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-indigo-500 transition text-sm"
                        />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="flex gap-4 w-full overflow-hidden">
                        <div  className="flex flex-col gap-1 flex-1 min-w-0">
                            <label className="text-sm text-gray-600">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength={5}
                                className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-indigo-500 transition text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm text-gray-600">CVV</label>
                            <input
                                type="password"
                                placeholder="***"
                                maxLength={3}
                                className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-indigo-500 transition text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePayment}
                    className="w-full mt-6 py-3 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded cursor-pointer"
                >
                    Pay Now
                </button>

                {/* Security note */}
                <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1">
                    🔒 Your payment is secure and encrypted
                </p>
            </div>
        </div>
    )
}

export default Payment