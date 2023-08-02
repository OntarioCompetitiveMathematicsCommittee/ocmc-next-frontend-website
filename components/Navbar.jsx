"use client"

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@config/nav'

import Logo from '@public/assets/logo.svg'

const Navbar = () => {

    const [navOpen, setNavOpen] = useState(false)

    const handleNavToggle = () => {
        setNavOpen(prev => !prev)
    }

    return (
        <>
            <nav className='flex justify-center w-full bg-brandNeutral-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 py-2 px-4 fixed top-0 left-0 z-50'>
                <div className='max-w-[90rem] w-full flex justify-between items-center'>
                    <div className='flex items-center text-2xl font-medium gap-2'>
                        <Image className='h-12 w-12' src={Logo} alt="OCMC Logo" />
                        <h1>OCMC</h1>
                    </div>
                    <div className='flex items-center'>
                        <ul className='gap-12 items-center hidden md:flex'>
                            {Object.keys(navLinks).map((key, index) => (
                                <li className='relative group w-auto' key={key}>
                                    <Link href={key}>{navLinks[key]}</Link>
                                    <span className='w-0 h-[2px] bg-brandNeutral-600 absolute bottom-[2px] left-0 transition-all group-hover:w-full'></span>
                                </li>
                            ))}
                            <li className='rounded-md cursor-pointer border-2 box-border px-6 py-1 transition-all group 
                                hover:bg-gradient-to-br from-brandBlue-500 to-brandGreen-600' 
                                style={{borderImage: "linear-gradient(45deg, #2182DB, #05A69E) 1"}}>
                                <Link className='font-medium text-transparent bg-clip-text bg-gradient-to-r from-brandBlue-500 
                                    to-brandGreen-600 transition-all group-hover:text-white' href='/signup'>
                                    Register
                                </Link>
                            </li>
                            
                        </ul>
                        <button onClick={handleNavToggle}>
                            <svg className='h-6 w-6 md:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar