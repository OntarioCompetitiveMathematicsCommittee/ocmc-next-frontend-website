'use client';

import { useState } from 'react';
import { useSendMutation } from '@components/features/email/emailApiSlice';

import Link from 'next/link'
import Image from 'next/image'

import linkedin from '@public/assets/socials/linkedin.svg'
import facebook from '@public/assets/socials/facebook.svg'
import instagram from '@public/assets/socials/instagram.svg'

const Footer = () => {

	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
    // const [ disabled, setDisabled] = useState(false);
    // const [ label, setLabel ] = useState('Send Message');
    
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
    
            // setDisabled(true);
            // setLabel('Sent!');
            // setTimeout(() => {
            //     setDisabled(false);
            //     setLabel('Send Message');
            // }, 15*1000); // 15 sec
        } catch (err) {
            // handle different errors
			if (!err.status) setErrMsg('No server response');
			else console.log(err);
        }
    };
    
    const cannotSubmit = !email || !message;
    // const cannotSubmit = !email || !message || disabled;
	
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
            <div className='bg-brandBlue-800 h-[40rem] md:h-[28rem] lg:h-[25rem] flex flex-col'>
                <div className='flex flex-col items-center lg:flex-row'>
                    <div className='mt-5 w-96 md:w-[50rem] lg:mt-11 lg:ml-14'>
                        <h1 className='text-2xl font-medium lg:text-4xl max-w-[60rem] text-brandNeutral-100'>Keep in Touch</h1>
                        <form onSubmit={onContactUsSubmit} className='flex flex-col gap-5 md:flex-row lg:mt-3'>
                            {/** message field */}
                            <div className='flex flex-col'>
                                <h1 className='text-md md:text-md leading-[3rem] font-[Montserrat] lg:text-xl max-w-[60rem] text-brandNeutral-100'>
                                    Message
                                </h1> {/** change sizing for different screens */}
                                <textarea
                                    className=" w-96 h-32 bg-brandNeutral-100 px-2 rounded-lg border-2 font-[Montserrat] py-1"
                                    id="message"
                                    name="message"
                                    value={message}
                                    placeholder="Enter Message Here"
                                    onChange={(e) => setMessage(e.target.value)}
			    				/>
                            </div>

                            {/** email field */}
                            <div className='flex flex-col items-start h-36'>
                                <h1 className='text-md leading-[3rem] font-[Montserrat] md:text-md lg:text-xl max-w-[60rem] text-brandNeutral-100'>
                                    Your Email
                                </h1>
                                <input
                                    className="w-96 h-10 bg-brandNeutral-100 px-2 py-1 border-2 rounded-lg font-[Montserrat]"
                                    id="email"
                                    type="text"
                                    value={email}
                                    placeholder="examplemail@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
	    						/>
                                <div className='flex justify-center mt-auto mb-auto'>
                                    <button className="py-2 text-xl text-white rounded-lg w-96 disabled:bg-brandBlue-700 hover:bg-brandBlue-700 bg-brandBlue-600" type="submit" disabled={cannotSubmit}>
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-col md:flex-row md:gap-x-8 md:mt-8 ">
                            <div className='flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat] w-96'>
                                <div className='flex flex-row'>
                                    <h1 className='text-brandYellow-500'>General&nbsp;Inquiries</h1>
                                    <h1 className='text-brandNeutral-100'>:&nbsp;ontariocmc@gmail.com</h1>
                                </div>
                            </div>
                            <div className='flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat] w-96'>
                                <div className='flex flex-row'>
                                    <h1 className='text-brandYellow-500'>Test Day Inquiries</h1>
                                    <h1 className='text-brandNeutral-100'>: (647)-936-1124</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** needs to link to the accounts */}
                    <div className='flex flex-row mt-5 lg:mr-16 lg:ml-auto w-fit gap-x-10 lg:flex-col lg:gap-y-6'>
                        <Link href='https://www.linkedin.com/company/ontario-competitive-mathematics-committee/'>
                            <Image src={linkedin} alt="linkedin"/>
                        </Link>
                        <Link href='https://www.facebook.com/profile.php?id=100092223956604'>
                            <Image src={facebook} alt="facebook"/>
                        </Link>
                        <Link href='https://www.instagram.com/ontariocmc'>
                            <Image src={instagram} alt="instagram"/>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 ml-auto mr-auto lg:ml-14 lg:mt-8">
                    <h1 className="text-sm text-brandNeutral-100">© 2023 Ontario Competitive Mathematics Committee.</h1>
                </div>
            </div>
            
        </section>
    )
}

export default Footer