'use client';

import { useState } from 'react'
import { useSendMutation } from '@components/features/email/emailApiSlice';

import Link from 'next/link'
import Image from 'next/image'

import linkedin from '@public/assets/socials/linkedin.svg';
import facebook from '@public/assets/socials/facebook.svg';
import instagram from '@public/assets/socials/instagram.svg';

const Footer = () => {
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
    const [ disabled, setDisabled] = useState(false);
    const [ label, setLabel ] = useState('Send Message');

    const [send, { isLoading, isSuccess, isError, error }] =
        useSendMutation();

    const onContactUsSubmit = async (e) => {
        e.preventDefault();
        try {
            // send email
            await send({
                email,
                message
            });
            
            setMessage('');
            setEmail('');
    
            setDisabled(true);
            setLabel('Sent!');
            setTimeout(() => {
                setDisabled(false);
                setLabel('Send Message');
            }, 15*1000); // 15 sec
        } catch (err) {
            // handle different errors
			if (!err.status) setErrMsg('No server response');
			else console.log(err);
        }
    };
    
    const cannotSubmit = !email || !message || disabled;
	
    return (
        <section className=''>
            {/** marquee is buggy */}
            {/* <div className='relative flex py-6 overflow-hidden bg-brandBlue-700 whitespace-nowrap'>
                <h1 className="inline-block w-auto mx-1 font-bold animate-scroll bg-brandBlue-700 text-brandNeutral-100">
                    Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~  
                </h1>
                <h1 className="inline-block w-auto mx-1 font-bold animate-scroll bg-brandBlue-700 text-brandNeutral-100">
                    Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ Contact Us ~ 
                </h1>
            </div> */}
            <div className="bg-brandBlue-800 h-[20rem] w-screen md:h-[22rem] lg:h-[18rem] flex flex-col">
                <div className="flex flex-col">
                    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                        <div className="mt-5 w-96 md:w-[50rem] lg:mt-11 lg:ml-14 lg:w-[70rem]">
                            <h1 className="text-2xl font-medium lg:text-4xl max-w-[60rem] text-brandNeutral-100">Contact Us</h1>
                            <div className="flex flex-col lg:flex-row lg:justify-between md:gap-y-4 md:mt-8 lg:mr-8">
                                <div className="flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat]">
                                    <div className="flex flex-row">
                                        <h1 className="text-brandYellow-500">General&nbsp;Inquiries</h1>
                                        <h1 className="text-brandNeutral-100">:&nbsp;general@ontariocmc.ca</h1>
                                    </div>
                                </div>
                                <div className="flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat]">
                                    <div className="flex flex-row">
                                        <h1 className="text-brandYellow-500">Urgent Inquiries</h1>
                                        <h1 className="text-brandNeutral-100">: (647)-936-1124</h1>
                                    </div>
                                </div>
                                <div className="flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat]">
                                    <div className="flex flex-row">
                                        <h1 className="text-brandYellow-500">Admin Support</h1>
                                        <h1 className="text-brandNeutral-100">: (289)-772-7809</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** needs to link to the accounts */}
                    <div className='flex mx-auto'>
                        <div className='flex flex-row mt-5 lg:mr-16 lg:ml-8 w-fit gap-x-10'>
                            <Link target='_blank' href='https://www.linkedin.com/company/ontario-competitive-mathematics-committee/'>
                                <Image src={linkedin} alt="linkedin"/>
                            </Link>
                            <Link target='_blank' href='https://www.facebook.com/profile.php?id=100092223956604'>
                                <Image src={facebook} alt="facebook"/>
                            </Link>
                            <Link target='_blank' href='https://www.instagram.com/ontariocmc'>
                                <Image src={instagram} alt="instagram"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-auto mb-2 ml-auto mr-auto lg:ml-14">
                    <h1 className="text-sm text-brandNeutral-100">© 2024 Ontario Competitive Mathematics Committee.</h1>
                </div>
            </div>

            
        </section>
    )
}

export default Footer