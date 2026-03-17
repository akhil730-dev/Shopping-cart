import { useState } from "react"
import { useAppContext } from "../context/AppContext"

const ChatBot = () => {
    const { axios, products, user, navigate } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { 
            role: "ai", 
            text: "Hi! 👋 I'm your shopping assistant. How can I help you today?",
        }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMessage = { role: "user", text: input }
        setMessages(prev => [...prev, userMessage])
        
        const lowerMessage = input.toLowerCase()
        setInput("")
        setLoading(true)

        // cart
        if(lowerMessage.includes("cart") || 
           lowerMessage.includes("my items") ||
           lowerMessage.includes("added items")){
            setMessages(prev => [...prev, { 
                role: "ai", 
                text: "Check out your cart here! 🛒",
                button: { label: "View Cart", path: "/cart" }
            }])
            setLoading(false)
            return
        }

        // orders
        if(lowerMessage.includes("order") || 
           lowerMessage.includes("my orders") ||
           lowerMessage.includes("my purchase")){
            setMessages(prev => [...prev, { 
                role: "ai", 
                text: "Check out your orders here! 📦",
                button: { label: "View Orders", path: "/my-orders" }
            }])
            setLoading(false)
            return
        }

        // checkout
        if(lowerMessage.includes("checkout") || 
           lowerMessage.includes("buy now") ||
           lowerMessage.includes("place order")){
            setMessages(prev => [...prev, { 
                role: "ai", 
                text: "Ready to checkout? 🛍️",
                button: { label: "Go to Cart", path: "/cart" }
            }])
            setLoading(false)
            return
        }

        // all products
        if(lowerMessage.includes("all products") || 
           lowerMessage.includes("show products") ||
           lowerMessage.includes("browse")){
            setMessages(prev => [...prev, { 
                role: "ai", 
                text: "Browse all our products here! 🛍️",
                button: { label: "View Products", path: "/products" }
            }])
            setLoading(false)
            return
        }

        // AI response for other questions
        try {
            const { data } = await axios.post('/api/chat/message', {
                message: input,
                products: products.map(p => ({
                    name: p.name,
                    category: p.category,
                    price: p.offerPrice,
                    inStock: p.inStock
                })),
                userId: user ? user._id : null
            })

            if (data.success) {
                setMessages(prev => [...prev, { 
                    role: "ai", 
                    text: data.reply 
                }])
            } else {
                setMessages(prev => [...prev, { 
                    role: "ai", 
                    text: "Sorry, I couldn't process that! Try again 😊" 
                }])
            }
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: "ai", 
                text: "Something went wrong! Try again 😊" 
            }])
        }
        setLoading(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-indigo-500 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg">
                                🤖
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">Shopping Assistant</p>
                                <p className="text-indigo-200 text-xs">Always here to help!</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-white hover:text-indigo-200 cursor-pointer text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className="flex flex-col gap-2 max-w-[85%]">
                                    
                                    {/* Text bubble */}
                                    <div className={`px-3 py-2 rounded-lg text-sm ${
                                        msg.role === "user" 
                                        ? "bg-indigo-500 text-white rounded-br-none" 
                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                    }`}>
                                        {msg.text}
                                    </div>

                                    {/* Button if exists */}
                                    {msg.button && (
                                        <button 
                                            onClick={() => { 
                                                navigate(msg.button.path)
                                                setIsOpen(false) 
                                            }}
                                            className="text-indigo-500 border border-indigo-500 rounded-full px-4 py-1.5 text-sm hover:bg-indigo-50 transition text-left w-fit"
                                        >
                                            {msg.button.label}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-500">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-3 flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                            type="text"
                            placeholder="Ask me anything..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-indigo-500"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-indigo-500 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer text-sm"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Bubble Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-indigo-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer text-2xl ml-auto"
            >
                {isOpen ? "✕" : "💬"}
            </button>
        </div>
    )
}

export default ChatBot