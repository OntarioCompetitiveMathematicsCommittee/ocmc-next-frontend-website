"use client"

import useAuth from '@hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@public/assets/logo.svg'

const PortalHeader = () => {

    const { first_name, last_name, highest_status } = useAuth();
    return (
        <>
            {/* placeholder for height */}
            <div className='py-2 opacity-0'>
                <Image className='w-16 h-16' src={Logo} alt="OCMC Logo" />
            </div>
            <nav className='fixed top-0 z-30 w-full px-4 py-2 rounded-md shadow-sm bg-brandNeutral-200 bg-clip-padding backdrop-filter backdrop-blur-md'>
                <div className='max-w-[90rem] w-full flex items-center gap-4 lg:gap-0'>
                    <div className='w-auto lg:w-72'>
                        <Link href="/" className='flex items-center gap-2 text-2xl font-medium'>
                            <Image className='w-16 h-16' src={Logo} alt="OCMC Logo" />
                            <h1 className='hidden text-3xl lg:block'>OCMC</h1>
                        </Link>
                    </div> 
                    <h1 className='text-3xl'>Welcome, {first_name}</h1>
                </div>
            </nav>
        </>
    )
}

export default PortalHeader