import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img className="w-10 h-10 md:w-12 md:h-12" src="/logo.png" alt="logo" />
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-900">Seller Dashboard</p>
              <p className="text-xs text-gray-500">Manage your products & orders</p>
            </div>
          </Link>

          {/* User & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">Hi Admin 👋</p>
                <p className="text-xs text-gray-500">Seller Account</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                </svg>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              <span className="hidden md:inline">Logout</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex">
        {/* SIDEBAR */}
        <div
          className={`fixed md:static w-64 h-[calc(100vh-73px)] bg-white border-r border-gray-200 pt-4 flex flex-col z-30 transition-all duration-300 ${
            sidebarOpen ? "left-0" : "-left-64 md:left-0"
          }`}
        >
          {/* Sidebar Links */}
          <nav className="flex-1 space-y-2 px-3">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer Stats */}
          <div className="px-3 py-4 border-t border-gray-200 space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Pending Orders</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
          </div>
        </div>

        {/* OVERLAY (Mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/20 z-20"
          />
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 min-h-[calc(100vh-73px)] overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;