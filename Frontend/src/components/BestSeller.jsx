import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext()

  const bestSellerProducts = products.filter(
    (product) => product.inStock && product.bestSeller
  ).slice(0, 5)

  return (
    <div className='mt-16 px-2 md:px-10'>
        <p className="text-3xl font-extrabold mb-6 border-l-4 border-primary pl-3">Best Sellers</p>
        
        {bestSellerProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 lg:grid-cols-4 mt-6">
                {bestSellerProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        ) : (
            <p className="text-gray-500">No best sellers yet!</p>
        )}
    </div>
  )
}

export default BestSeller