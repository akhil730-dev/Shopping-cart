import React from "react";
import addItem from "../../assets/add-item.png"
import pickList from "../../assets/pick-list.png"
import orders from  "../../assets/received.png"
import { Link,  NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

import toast from "react-hot-toast";

const SellerLayout = () => {
    const {axios,navigate} = useAppContext()

    const addProductIcon = (
      <img src={addItem} alt="add item" className="w-6 h-6" />
    );

    const pickListIcon= (
        <img src={pickList} alt="Pick List" className="w-6 h-6 " />
    );

    const ordersIcon = (
         <img src={orders} alt="Pick List" className="w-6 h-6 " />
    );

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: addProductIcon },
        { name: "Product List", path: "/seller/product-list", icon: pickListIcon },
        { name: "Orders", path: "/seller/orders", icon: ordersIcon },
    ];

    const logout = async ()=>{
            try {
                const {data} = await axios.get('/api/seller/logout')
                if(data.success){
                    toast.success(data.message)
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
                <Link to ="/">
                    <img className="cursor-pointer w-13 and md:w-13" src="/logo.png" alt="logo" />
                </Link>
                <div className="flex items-center gap-5 text-gray-900">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
           <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                {sidebarLinks.map((item) => (
                   <NavLink to={item.path} key={item.name} end={item.path==="/seller"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white" 
                            }`
                        }
                    >
                        {item.icon}
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
                </div>
                <Outlet />
           </div>
        </>
    );
};

export default SellerLayout