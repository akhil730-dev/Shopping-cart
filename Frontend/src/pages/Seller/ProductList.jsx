import React from 'react'
import { useAppContext } from "../../context/AppContext"
import toast from 'react-hot-toast'

const ProductList = () => {
    const { products, axios, fetchProducts } = useAppContext()

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock })
            if(data.success){
                fetchProducts()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // ✅ new function
    const toggleBestSeller = async (id, bestSeller) => {
        try {
            const { data } = await axios.post('/api/product/bestseller', { id, bestSeller })
            if(data.success){
                fetchProducts()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="w-full">
                    <table className="w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Product</th>
                                <th className="px-4 py-3 font-semibold">Category</th>
                                <th className="px-4 py-3 font-semibold hidden md:table-cell">Price</th>
                                <th className="px-4 py-3 font-semibold">In Stock</th>
                                <th className="px-4 py-3 font-semibold">Best Seller</th> {/* ← add! */}
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image[0]} alt="Product" className="w-16 h-16 object-contain" />
                                            <span className="hidden md:block">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 hidden md:table-cell">₹{product.offerPrice}</td>

                                    {/* inStock toggle */}
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer gap-3">
                                            <input 
                                                onClick={() => toggleStock(product._id, !product.inStock)} 
                                                checked={product.inStock}
                                                readOnly
                                                type="checkbox" 
                                                className="sr-only peer" 
                                            />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>

                                    {/* bestSeller toggle ← add! */}
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer gap-3">
                                            <input 
                                                onClick={() => toggleBestSeller(product._id, !product.bestSeller)} 
                                                checked={product.bestSeller || false}
                                                readOnly
                                                type="checkbox" 
                                                className="sr-only peer" 
                                            />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-indigo-500 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList
