import React from 'react'
import bottomBanner from '../assets/bottom_banner.jpg'

const BottomBanner = () => {
  return (
    <div className='relative mt-24 px-6 md:px-16'>
        {/* Desktop */}
        <img src={bottomBanner} alt="bottom banner" className='w-full hidden md:block rounded-xl object-cover'/>
        {/* Mobile */}
        <img src={bottomBanner} alt="bottom banner" className='w-full block md:hidden rounded-xl object-cover' />
    </div>
  )
}

export default BottomBanner