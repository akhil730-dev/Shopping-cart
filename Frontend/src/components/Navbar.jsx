import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

export const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate,setSearchQuery,searchQuery,getCartCount,axios } = useAppContext()

    const logout = async () => {
        try {
            const {data} =await axios.post('/api/user/logout')
            if(data.success){
                toast.success(data.message)
                setUser(null);
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
          toast.error(error.message) 
        }
        
    }

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate('/products')
        }
    },[searchQuery])

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">

            <NavLink to='/' onClick={() => setOpen(false)} >
                <img src="/logo.png" className="h-12" alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-20">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <button className='block  px-4 py-2 bg-blue-800 text-white rounded  hover:bg-blue-300 text-center'>
                    <NavLink to='/seller'>Seller</NavLink>
                </button>
                


                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />


                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div >


                {(!user ? (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>) : (
                    <div className="flex items-center gap-3">

                        <NavLink to="/my-orders" className="cursor-pointer">
                            My Orders
                        </NavLink>

                        <NavLink to='/profile' className='cursor-pointer' >
                        <img src="/default user.png" className="w-8 h-8 rounded-full mx-4" />
                        </NavLink>

                        <ul className="flex gap-4">
                            <li>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-md cursor-pointer bg-blue-500 hover:text-white transition"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ))}




            </div>


               <button className='block lg:hidden px-4 py-2   rounded  hover:bg-blue-600 text-center'>
                        <NavLink to='/seller'>Seller</NavLink>
                    </button>



            <div className='flex item-center gap-6 sm:hidden'>
                
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div >
            </div>


            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>
                


            {/* Mobile Menu */}



            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to='/products' onClick={() => setOpen(false)}>All Products</NavLink>
                
                {user &&
                    <NavLink to='/products' onClick={() => setOpen(false)}>My Orders</NavLink>
                }
                <NavLink to='/' onClick={() => setOpen(false)}>Contact</NavLink>

                {(!user ? (
                    <button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true)
                    }
                    } className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>
                ))
                }


            </div>

        </nav>
    )
}


