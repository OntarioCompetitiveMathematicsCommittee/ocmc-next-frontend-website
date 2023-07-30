import Image from 'next/image'
import Link from 'next/link'

import Public from '@components/components/Public';

import Logo from '@assets/logo.svg'
import Addition from '@assets/addition.svg'
import Subtraction from '@assets/subtraction.svg'
import Multiplication from '@assets/multiplication.svg'
import Division from '@assets/division.svg'

export default function Home() {
    return (
        <div className='w-screen'>
            <section className=''>
                <nav className='flex justify-between items-center bg-slate-400 py-2 px-16'>
                    <div className='flex items-center text-3xl font-medium'>
                        <Image src={Logo} alt="OCMC Logo" />
                        <h1>OCMC</h1>
                    </div>
                    <div className=''>
                        <ul className='flex gap-4'>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/'>Events</Link>
                            </li>
                            <li>
                                <Link href='/'>Posts</Link>
                            </li>
                            <li>
                                <Link href='/'>Contact Us</Link>
                            </li>
                            <li>
                                <Link href='/register'>Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className='flex justify-center items-center'>
                    <div className='flex justify-center items-center text-center flex-col gap-4'>
                        <h1>Ontario Competitive Math Committee</h1>
                        <h2>Join us for workshops and contests lead by Canada’s leading high school mathematicians</h2>
                    </div>
                </main>
            </section>
        </div>  
    )
}
