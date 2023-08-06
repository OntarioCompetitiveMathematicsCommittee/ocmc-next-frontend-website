"use client"

import useAuth from '@components/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@public/assets/logo.svg'

const PortalHeader = () => {

    const { first_name, last_name, highest_status } = useAuth();
    return (
        <>
            <div className='opacity-0 py-2'>
                <Image className='h-16 w-16' src={Logo} alt="OCMC Logo" />
            </div>
            <nav className=' w-full bg-brandNeutral-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md shadow-sm z-10 py-2 px-4 fixed top-0'>
                <div className='max-w-[90rem] w-full flex items-center'>
                    <div className='w-80'>
                        <Link href="/" className='flex items-center text-2xl font-medium gap-2'>
                            <Image className='h-16 w-16' src={Logo} alt="OCMC Logo" />
                            <h1 className='text-3xl hidden lg:block'>OCMC</h1>
                        </Link>
                    </div> 
                    <h1 className='text-3xl'>Welcome, {first_name}</h1>
                </div>
            </nav>
        </>
    )
}

export default PortalHeader