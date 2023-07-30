import Image from 'next/image'
import Link from 'next/link'

import Public from '@components/components/Public';

import Logo from '@public/assets/logo.svg'
import Addition from '@public/assets/addition.svg'
import Subtraction from '@public/assets/subtraction.svg'
import Multiplication from '@public/assets/multiplication.svg'
import Division from '@public/assets/division.svg'
import Bg from '@public/assets/123.svg'

import Sponsor1 from '@public/assets/sponsors/sponsor2.png'
import Sponsor2 from '@public/assets/sponsors/sponsor3.png'
import Sponsor3 from '@public/assets/sponsors/sponsor4.png'
import Sponsor4 from '@public/assets/sponsors/sponsor5.png'
import Sponsor5 from '@public/assets/sponsors/sponsor1.png'

import Mission from '@public/assets/mission.svg'
import Contest from '@public/assets/omc.svg'
import Camp from '@public/assets/camp.svg'

import Wave1 from '@public/assets/wave-transition-1.svg'
import Wave2 from '@public/assets/wave-transition-2.svg'
import Wave3 from '@public/assets/wave-transition-3.svg'

export default function Home() {

    const h1Styles = "text-[2.75rem] leading-[3rem] font-medium md:text-6xl lg:text-8xl max-w-[60rem]"
    const h2Styles = "text-xl font-[Montserrat] max-w-[40rem]"
    const h3Styles = "text-sm font-[Montserrat] max-w-[60rem] lg:text-xl lg:leading-[2.2rem]"

    const navLinks = {
        '/': 'Home',
        '/events': 'Events',
        '/posts': 'Posts',
        '/contact': 'Contact Us',
    }

    const sponsorList = {
        sponsor1: Sponsor1,
        sponsor2: Sponsor2,
        sponsor3: Sponsor3,
    }

    const arithmeticList = {
        multiplication: Multiplication,
        addition: Addition,
        division: Division,
        subtraction: Subtraction,
    }

    return (
        <div>
            <div className='w-screen h-screen flex flex-col '>
                <nav className='flex w-full justify-center bg-brandNeutral-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 py-2 px-4'>
                    <div className='max-w-[90rem] w-full flex justify-between items-center'>
                        <div className='flex items-center text-2xl font-medium gap-2'>
                            <Image className='h-12 w-12' src={Logo} alt="OCMC Logo" />
                            <h1>OCMC</h1>
                        </div>
                        <div className=''>
                            <ul className='gap-12 items-center hidden md:flex'>
                                {Object.keys(navLinks).map((key, index) => (
                                    <li className='relative group w-auto' key={key}>
                                        <Link href={key}>{navLinks[key]}</Link>
                                        <span className='w-0 h-[2px] bg-brandNeutral-600 absolute bottom-[2px] left-0 transition-all group-hover:w-full'></span>
                                    </li>
                                ))}
                                <li className='rounded-md bg-gradient-to-br from-brandBlue-500 to-brandGreen-600 p-[2px]'>
                                    <div className='w-full h-full px-6 py-1 bg-brandNeutral-100 rounded-[5px]'>
                                        <Link className='font-medium text-transparent bg-clip-text bg-gradient-to-r from-brandBlue-500 to-brandGreen-600' href='/register'>Register</Link>
                                    </div>
                                </li>
                            </ul>
                            <svg className='h-6 w-6 md:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </div>
                    
                </nav>
                <section className="bg-[url('/assets/123.svg')] h-screen bg-right-top bg-no-repeat bg-cover flex flex-col">
                    <main className='flex justify-center items-center flex-1 px-4 mb-24'>
                        <div className='flex justify-center items-center text-center flex-col gap-4'>
                            <h1 className={h1Styles}>Ontario Competitive Math Committee</h1>
                            <h2 className={h2Styles}>Join us for workshops and contests lead by Canada’s leading high school mathematicians</h2>
                            <div className='flex justify-between w-full'>
                                {Object.keys(arithmeticList).map((key, index) => (
                                    <Image className={'w-[15vw] max-w-[10rem] ' + ([1,2].includes(index) && " translate-y-12")} key={key} src={arithmeticList[key]} alt={key}/>
                                ))}
                            </div>
                        </div>
                    </main>
                </section>
                <section className='w-full flex justify-center bg-brandNeutral-100'>
                    <ul className='flex w-full p-4 justify-between py-8 max-w-[90rem]'>
                        {Object.keys(sponsorList).map((key, index) => (
                            <li key={key}>
                                <Link href="/">
                                    <Image className='h-12 w-auto' src={sponsorList[key]} alt="sponsor"/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>  
            <div className='flex justify-center w-full'>
                <div className='flex flex-col items-center pt-40 pb-2 lg:flex-row lg:justify-center w-full max-w-[100rem]'>
                    <div className='flex flex-col gap-2 px-4 items-center w-full max-w-2xl text-center lg:text-left lg:items-start'>
                        <h1 className={h1Styles}>Our Mission</h1>
                        <h3 className={h3Styles}>Creators can gain independence through a decentralised digital currency system that is
                            dependent on growing and engaging with the community and also their star power. They
                            Percentageness of the total value of the tokens minted.
                        </h3>
                    </div>
                    <div className='w-full lg:w-1/3'>
                        <Image className='w-3/4 lg:w-full max-w-md mx-auto' src={Mission} alt="our mission graphic"/>
                    </div>
                </div>
            </div>
            <div className='mt-48'>
                <Image className='w-full' src={Wave1} alt="divider"/>
            </div>
            <div className='flex justify-center w-full bg-brandBlue-500 pb-48'>
                <div className='flex flex-col items-center pt-40 pb-2 lg:flex-row lg:justify-center w-full max-w-[100rem]'>
                    <div className='flex flex-col gap-2 px-4 items-center w-full max-w-2xl text-center lg:text-left lg:items-start'>
                        <h1 className={h1Styles + " text-white"}>Ontario Math Contest</h1>
                        <h3 className={h3Styles + " text-white"}>Creators can gain independence through a decentralised digital currency system that is
                            dependent on growing and engaging with the community and also their star power. They
                            Percentageness of the total value of the tokens minted.
                        </h3>
                    </div>
                    <div className='w-full lg:w-1/3'>
                        <Image className='w-3/4 lg:w-full max-w-md mx-auto' src={Contest} alt="our contest graphic"/>
                    </div>
                </div>
            </div>
            <div className='bg-brandBlue-500'>
                <Image className='w-full' src={Wave2} alt="divider"/>
            </div>
            <div className='flex justify-center w-full bg-brandBlue-400 pb-48'>
                <div className='flex flex-col items-center pt-40 pb-2 lg:flex-row lg:justify-center w-full max-w-[100rem]'>
                    <div className='flex flex-col gap-2 px-4 items-center w-full max-w-2xl text-center lg:text-left lg:items-start'>
                        <h1 className={h1Styles + " text-white"}>Online Summer Camps</h1>
                        <h3 className={h3Styles + " text-white"}>Creators can gain independence through a decentralised digital currency system that is
                            dependent on growing and engaging with the community and also their star power. They
                            Percentageness of the total value of the tokens minted.
                        </h3>
                    </div>
                    <div className='w-full lg:w-1/3'>
                        <Image className='w-3/4 lg:w-full max-w-md mx-auto' src={Camp} alt="our summer camp graphic"/>
                    </div>
                </div>
            </div>
            <div>
                <Image className='w-full' src={Wave3} alt="divider"/>
            </div>
            
            {/* <Image className='w-full h-auto' src={Wave1} alt="wave transition graphic"/>
            <div className='text-center pt-40 pb-2 bg-brandBlue-500 text-white relative lg:flex lg:text-left justify-center'>
                <div className='flex flex-col gap-2 px-4 items-center w-full max-w-2xl'>
                    <h1 className={h1Styles + " text-white"}>Ontario Mathematics Contest</h1>
                    <h3 className={h3Styles + " text-white"}>Creators can gain independence through a decentralised digital currency system that is
                        dependent on growing and engaging with the community and also their star power. They
                        Percentageness of the total value of the tokens minted.
                    </h3>
                </div>
                <div className='w-full px-4 mb-24'>
                    <Image className='w-3/4 max-w-md mx-auto' src={Contest} alt="our contests graphic"/>
                </div>
                <Image className='w-full h-auto absolute bottom-0' src={Wave2} alt="wave transition graphic"/>
            </div>
            <div className='text-center px-4 py-40 bg-brandBlue-400 flex flex-col items-center w-full lg:flex lg:text-left justify-center'>
                <div className='flex flex-col gap-2 max-w-2xl'>
                    <h1 className={h1Styles + " text-white"}>Online Summer Camps</h1>
                    <h3 className={h3Styles + " text-white"}>Creators can gain independence through a decentralised digital currency system that is
                        dependent on growing and engaging with the community and also their star power. They
                        Percentageness of the total value of the tokens minted.
                    </h3>
                </div>
                <div className='w-full'>
                    <Image className='w-3/4 max-w-md mx-auto' src={Camp} alt="our mission graphic"/>
                </div>
            </div>
            <Image className='w-full h-auto' src={Wave3} alt="wave transition graphic"/> */}
            <div className='h-48'></div>
        </div>
    )
}
