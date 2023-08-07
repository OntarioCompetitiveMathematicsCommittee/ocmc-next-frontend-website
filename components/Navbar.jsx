"use client"

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@config/nav'
import HamburgerMenu from '@components/HamburgerMenu'

import Logo from '@public/assets/logo.svg'

const Navbar = () => {

    const [navOpen, setNavOpen] = useState(false)

    const handleNavToggle = () => {
        setNavOpen(prev => !prev)
    }

    return (
        <>
            <nav className='flex justify-center w-full bg-brandNeutral-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 
                py-2 px-4 fixed top-0 left-0 z-50 shadow-sm'>
                <div className='max-w-[90rem] w-full flex justify-between items-center'>
                    <Link className='flex items-center text-2xl font-medium gap-2' href='/'>
                        <Image className='h-12 w-12' src={Logo} alt="OCMC Logo" />
                        <h1>OCMC</h1>
                    </Link>
                    <div className='flex items-center'>
                        <ul className={"whitespace-nowrap gap-12 items-start p-16 flex flex-col fixed bg-brandNeutral-200 top-0 right-0 w-3/4 h-screen text-2xl border-4 transition-transform duration-500 " +
                            " md:duration-0 md:transition-none md:flex-row md:border-0 md:translate-x-0 md:h-0 md:p-0 md:text-base md:bg-transparent md:static md:items-center md:justify-start " 
                            + (navOpen ? "translate-x-0" : "translate-x-[100%]")}>
                            {Object.keys(navLinks).map((key, index) => (
                                <li className='relative group w-auto' key={key}>
                                    <Link href={key}>{navLinks[key]}</Link>
                                    <span className='w-0 h-[2px] bg-brandNeutral-600 absolute bottom-[2px] left-0 transition-all group-hover:w-full'></span>
                                </li>
                            ))}

                            <Link className='rounded-md cursor-pointer border-2 box-border px-6 py-1 transition-all group 
                                hover:bg-gradient-to-br from-brandBlue-500 to-brandGreen-600' 
                                style={{borderImage: "linear-gradient(45deg, #2182DB, #05A69E) 1"}} href='/signup'>
                                <div className='font-medium text-transparent bg-clip-text bg-gradient-to-r from-brandBlue-500 
                                    to-brandGreen-600 transition-all group-hover:text-white'>
                                    Register
                                </div>
                            </Link>
                            
                        </ul>
                        <HamburgerMenu navOpen={navOpen} handleNavToggle={handleNavToggle}/>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar