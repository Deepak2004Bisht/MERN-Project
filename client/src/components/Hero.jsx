import React from 'react'
import {assets} from '../assets/assets'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative'>
        {/* Background Image for Hero Section only show on larger screens not show in mobile screen*/}
        <img src={assets.main_banner_bg} alt="" className='hidden md:block w-full' />

        {/* Background Image for Hero Section only show in mobile screen and not show in larger screens*/}
        <img src={assets.main_banner_bg_sm} alt="" className='md:hidden w-full' />
        
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24'>
            <h1 className='text-3xl md:text-4xl font-bold text-center md:text-left max-w-72 md:max-w-80 leading-tight ld:leading-15'>Freshness You Can Trust, Savings You will Love!</h1>

            <div className='flex items-center mt-6 font-medium gap-6'>
                <Link to='/products' className='flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer hover:bg-[#613881]'>Shop Now
                  <img src={assets.white_arrow_icon} alt="" className='transition group-focus:translate-x-1'/>
                </Link>

                <Link to='/products' className='hidden md:flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer hover:bg-[#613881]'>Explore Deals
                  <img src={assets.white_arrow_icon} alt="" className='transition group-focus:translate-x-1'/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero