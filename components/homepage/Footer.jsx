"use client"

import Image from 'next/image'
import { h1Styles, h2Styles, h3Styles } from '@config/textStyles'

import linkedin from '@public/assets/socials/linkedin.svg'
import facebook from '@public/assets/socials/facebook.svg'
import instagram from '@public/assets/socials/instagram.svg'

import { useRef, useState } from 'react'

const Footer = () => {

    return (
        <section className=''>
            {/** marquee is buggy */}
            <div className='relative flex py-6 overflow-hidden bg-brandBlue-700 whitespace-nowrap'>
                <h1 className="inline-block w-auto mx-1 font-bold animate-scroll bg-brandBlue-700 text-brandNeutral-100">
                    Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~  
                </h1>
                <h1 className="inline-block w-auto mx-1 font-bold animate-scroll bg-brandBlue-700 text-brandNeutral-100">
                    Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ 
                </h1>
            </div>
            <div className='bg-brandBlue-800 h-[503px] md:h-[403px] flex flex-col'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='ml-auto mr-auto mt-5 md:ml-5 lg:mt-[43px] lg:ml-[55px]'>
                        <h1 className='text-2xl font-medium lg:text-4xl max-w-[60rem] text-brandNeutral-100'>Keep in Touch</h1>
                        <div className='flex flex-col md:flex-row lg:mt-3 gap-x-1 md:gap-x-8'>
                            {/** message field */}
                            <div className='flex flex-col'>
                                <h1 className='text-md md:text-[15px] leading-[3rem] font-[Montserrat] lg:text-[20px] max-w-[60rem] text-brandNeutral-100'>Message</h1> {/** change sizing for different screens */}
                                <textarea
                                    className=" w-[431px] h-[100px] md:h-[126px] bg-brandNeutral-100 px-1 rounded-lg border-2 font-[Montserrat]"
                                    id="message"
                                    name="message"
                                    value="Enter Message Here"
                                    // onChange={handleMessageChange}
			    				/>
                            </div>

                            {/** email field + ocmc contact info */}
                            <div className='flex flex-col gap-y-1 md:gap-y-5'>
                                <h1 className='text-md leading-[3rem] font-[Montserrat] md:text-[15px] lg:text-[20px] max-w-[60rem] text-brandNeutral-100'>Your Email</h1>
                                <textarea
                                    className="mt-[-12px] w-[431px] h-[37px] bg-brandNeutral-100 px-2 py-1 border-2 rounded-2xl font-[Montserrat]"
                                    id="email"
                                    name="email"
                                    value="examplemail@example.com"
                                    // onChange={handleEmailChange}
	    						/>
                                <div className='mt-1 text-lg leading-[3rem] font-[Montserrat] md:text-xl lg:text-[27px] max-w-[60rem]'>
                                    <div className='flex flex-row'>
                                        <h1 className='text-brandYellow-500'>General&nbsp;Inquiries</h1>
                                        <h1 className='text-brandNeutral-100'>:&nbsp;ontariocmc@gmail.com</h1>
                                        {/* <h1 className='text-brandNeutral-100'>ontariocmc@gmail.com</h1> */}
                                    </div>
                                </div>
                                <div className='mt-[-20px] md:mt-3 text-lg leading-[3rem] font-[Montserrat] md:text-xl lg:text-[27px] max-w-[60rem]'>
                                <div className='flex flex-row'>
                                        <h1 className='text-brandYellow-500'>Test Day Inquiries</h1>
                                        <h1 className='text-brandNeutral-100'>: (647)-936-1124</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ml-auto mr-auto mt-5 lg:mt-[27px] lg:mr-[70px] lg:ml-auto w-fit flex flex-row gap-x-10 lg:flex-col lg:gap-y-6'>
                        <Image src={linkedin} alt="linkedin"/>
                        <Image src={facebook} alt="facebook"/>
                        <Image src={instagram} alt="instagram"/> {/** cannot find a pretty insta logo */}
                    </div>
                </div>
                <div class="ml-auto mr-auto mt-5 md:mt-8 lg:ml-14 lg:mt-[60px]">
                    <h1 className="text-sm text-brandNeutral-100">© 2023 Ontario Competitive Mathematics Committee.</h1>
                </div>
            </div>
        </section>
    )
}

export default Footer