import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
     const {navigate} = useAppContext()

  return (
    <div className="px-6 md:px-16 py-10">

      <p className="text-3xl font-extrabold mb-6 border-l-4 border-primary pl-3">
  Categories
</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
            onClick={()=>{
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0,0)
            }}>


            <img
              src={category.image}
              alt={category.text}
              className="w-full h-36 object-cover rounded-lg"
            />


            <p className="font-semibold">{category.text}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Categories