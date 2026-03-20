import React from 'react'
import {useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast';
const Login = () => {

    const {setShowUserLogin,setUser,axios,navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const onSubmitHandler = async(event)=>{
        try {
            event.preventDefault();

            const {data} = await axios.post(`/api/user/${state}`,{
                name,email,password
            })
                if(data.success){
                    navigate('/')
                    setUser(data.user)
                    setShowUserLogin(false)
                }else{
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error(error.message)
        }
        
        
        
    }



  return (
    // Login.jsx
<div onClick={() => setShowUserLogin(false)} 
     className='fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'>
    
    <form onSubmit={onSubmitHandler} 
          onClick={(e) => e.stopPropagation()} 
          className="w-full max-w-[400px] p-8 rounded-2xl shadow-2xl border border-gray-100 bg-white">
        
        {/* Header */}
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
                <span className="text-indigo-600">{state === "login" ? "Welcome Back" : "Join Us"}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
                {state === "login" ? "Sign in to your account" : "Create your account"}
            </p>
        </div>

        {/* Name field (only for signup) */}
        {state === "register" && (
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input onChange={(e) => setName(e.target.value)} 
                       value={name} 
                       placeholder="John Doe" 
                       className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                       type="text" 
                       required />
            </div>
        )}

        {/* Email field */}
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input onChange={(e) => setEmail(e.target.value)} 
                   value={email} 
                   placeholder="you@example.com" 
                   className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                   type="email" 
                   required />
        </div>

        {/* Password field */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} 
                   value={password} 
                   placeholder="••••••••" 
                   className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                   type="password" 
                   required />
        </div>

        {/* Submit button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-200 mb-4">
            {state === "register" ? "Create Account" : "Sign In"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600">
            {state === "register" ? "Already have an account? " : "Don't have an account? "}
            <button type="button"
                    onClick={() => setState(state === "login" ? "register" : "login")} 
                    className="text-indigo-600 font-semibold hover:underline">
                {state === "login" ? "Sign Up" : "Sign In"}
            </button>
        </p>
    </form>
</div>
  )
}

export default Login