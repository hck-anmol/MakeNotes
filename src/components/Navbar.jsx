import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='z-50 w-full flex items-center 
            justify-center px-6 md:px-16 lg:px-36 py-5'>
            <div className='bg-lime-300 w-[60%] flex gap-2 justify-center rounded-2xl h-10 items-center text-black'>
                <div className='flex gap-10'>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/pastes">
                        Notes
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar