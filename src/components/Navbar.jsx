import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row gap-4 ml-75 mt-10 justify-center bg-lime-600 rounded-2xl h-10 items-center text-white w-[55%]'>
            <div className='flex gap-10'>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/pastes">
                    Notes
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar