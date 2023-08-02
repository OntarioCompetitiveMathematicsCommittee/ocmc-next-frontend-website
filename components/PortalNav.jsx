"use client"

import useAuth from '@components/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@public/assets/logo.svg'

const PortalNav = () => {

    const { first_name, last_name, highest_status } = useAuth();
    return (
        <>
            <nav className=' w-full bg-brandNeutral-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 py-2 px-4'>
                <div className='max-w-[90rem] w-full flex items-center'>
                    <div className='w-80'>
                        <div className='flex items-center text-2xl font-medium gap-2'>
                            <Image className='h-20 w-20' src={Logo} alt="OCMC Logo" />
                            <h1 className='text-3xl'>OCMC</h1>
                        </div>
                    </div> 
                    <h1 className='text-3xl'>Welcome, {first_name}</h1>
                </div>
            </nav>
        </>
    )
}

export default PortalNav