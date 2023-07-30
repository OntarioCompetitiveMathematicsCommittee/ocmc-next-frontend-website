import Image from 'next/image'
import Link from 'next/link'

import Public from '@components/components/Public';

import Logo from '@public/assets/logo.svg'
import Addition from '@public/assets/addition.svg'
import Subtraction from '@public/assets/subtraction.svg'
import Multiplication from '@public/assets/multiplication.svg'
import Division from '@public/assets/division.svg'
import Bg from '@public/assets/ocmc-bg.svg'

import Sponsor1 from '@public/assets/sponsors/sponsor2.png'
import Sponsor2 from '@public/assets/sponsors/sponsor3.png'
import Sponsor3 from '@public/assets/sponsors/sponsor4.png'

import Mission from '@public/assets/mission.svg'
import Contest from '@public/assets/omc.svg'
import Camp from '@public/assets/camp.svg'

import Wave1 from '@public/assets/wave-transition-1.svg'
import Wave2 from '@public/assets/wave-transition-2.svg'
import Wave3 from '@public/assets/wave-transition-3.svg'

export default function Home() {
    return (
        <div>
            <div className='w-screen h-screen flex flex-col'>
                <section className="bg-[url('/assets/ocmc-bg.svg')] h-screen bg-right bg-no-repeat bg-cover flex flex-col">
                    <nav className='flex justify-between items-center bg-brandNeutral-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 py-2 px-4'>
                        <div className='flex items-center text-2xl font-medium gap-2'>
                            <Image className='h-12 w-12' src={Logo} alt="OCMC Logo" />
                            <h1>OCMC</h1>
                        </div>
                        <div className=''>
                            <ul className='flex gap-4 hidden'>
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
                            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </nav>
                    <main className='flex justify-center items-center flex-1 px-4 mb-24'>
                        <div className='flex justify-center items-center text-center flex-col gap-4'>
                            <h1 className='text-[2.75rem] leading-[3rem] font-medium'>Ontario Competitive Math Committee</h1>
                            <h2 className='text-xl font-[Montserrat]'>Join us for workshops and contests lead by Canada’s leading high school mathematicians</h2>
                            <div className='flex justify-between w-full'>
                                <Image className='w-20' src={Multiplication} alt='multiplication symbol'/>
                                <Image className='w-20 translate-y-12' src={Addition} alt='addition symbol'/>
                                <Image className='w-20 translate-y-12' src={Division} alt='division symbol'/>
                                <Image className='w-20' src={Subtraction} alt='subtraction symbol'/>
                            </div>
                        </div>
                    </main>
                </section>
                <section className=''>
                    <ul className='flex w-full p-4 justify-between py-8 bg-brandNeutral-100'>
                        <li>
                            <Link href="/">
                                <Image className='h-12 w-auto' src={Sponsor1} alt="sponsor"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <Image className='h-12 w-auto' src={Sponsor2} alt="sponsor"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <Image className='h-12 w-auto' src={Sponsor3} alt="sponsor"/>
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>  
            <div className='text-center px-4 py-40'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-[2.75rem] leading-[3rem] font-medium'>Our Mission</h1>
                    <h2 className='text-sm font-[Montserrat]'>Creators can gain independence through a decentralised digital currency system that is
                        dependent on growing and engaging with the community and also their star power. They
                        Percentageness of the total value of the tokens minted.
                    </h2>
                </div>
                <div className='w-full'>
                    <Image className='w-3/4 max-w-md mx-auto' src={Mission} alt="our mission graphic"/>
                </div>
            </div>
            <Image className='w-full h-auto translate-y-2' src={Wave1} alt="wave transition graphic"/>
            <div className='text-center pt-40 pb-2 bg-brandBlue-500 text-white'>
                <div className='flex flex-col gap-2 px-4'>
                    <h1 className='text-[2.75rem] leading-[3rem] font-medium text-white'>Ontario Mathematics Contest</h1>
                    <h2 className='text-sm text-white font-[Montserrat]'>Creators can gain independence through a decentralised digital currency system that is
                        dependent on growing and engaging with the community and also their star power. They
                        Percentageness of the total value of the tokens minted.
                    </h2>
                </div>
                <div className='w-full px-4 mb-24'>
                    <Image className='w-3/4 max-w-md mx-auto' src={Contest} alt="our contests graphic"/>
                </div>
                <Image className='w-full h-auto translate-y-[9px]' src={Wave2} alt="wave transition graphic"/>
            </div>
            <div className='text-center px-4 py-40 bg-brandBlue-400'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-[2.75rem] leading-[3rem] font-medium text-white'>Ontario Mathematics Contest</h1>
                    <h2 className='text-sm text-white font-[Montserrat]'>Creators can gain independence through a decentralised digital currency system that is
                        dependent on growing and engaging with the community and also their star power. They
                        Percentageness of the total value of the tokens minted.
                    </h2>
                </div>
                <div className='w-full'>
                    <Image className='w-3/4 max-w-md mx-auto' src={Camp} alt="our mission graphic"/>
                </div>
            </div>
            <Image className='w-full h-auto -translate-y-2' src={Wave3} alt="wave transition graphic"/>
            <div className='h-48'></div>
        </div>
    )
}
