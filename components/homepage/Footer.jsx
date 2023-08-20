'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@components/features/auth/authSlice';
import { useLoginMutation } from '@components/features/auth/authApiSlice';

import usePersist from '@components/hooks/usePersist';

import Image from 'next/image'
import { h1Styles, h2Styles, h3Styles } from '@config/textStyles'

import linkedin from '@public/assets/socials/linkedin.svg'
import facebook from '@public/assets/socials/facebook.svg'
import instagram from '@public/assets/socials/instagram.svg'

const Footer = () => {
    // sets focus on components at appropriate times
	const userRef = useRef();
	const errRef = useRef();

	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [errMsg, setErrMsg] = useState('');

	const router = useRouter();
	// for dispatching actions
	const dispatch = useDispatch();

    const onContactUsSubmit = async (e) => {
        e.preventDefault();
        // if (canSubmit) await addNewContest({ name, year, description, max_score });
    };
    
    const canSubmit = email && message;
	// // handles login
	// const [login, { isLoading, isSuccess, isError, error }] =
	// 	useLoginMutation();

	// const handleLogin = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		// send login request + get access token
	// 		const { accessToken } = await login({
	// 			username,
	// 			password,
	// 		}).unwrap();
	// 		dispatch(setCredentials({ accessToken }));
	// 		// set local use state in login back to empty string
	// 		setUsername('');
	// 		setPassword('');
	// 	} catch (err) {
	// 		// handle different errors
	// 		if (!err.status) setErrMsg('No server response');
	// 		else if (err.status === 400)
	// 			setErrMsg('Missing username or password');
	// 		else if (err.status === 401)
	// 			setErrMsg('Invalid username or password');
	// 		else setErrMsg(err.data?.message);
	// 		// focus on error message
	// 		errRef.current.focus();
	// 	}
	// };
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
            <div className='bg-brandBlue-800 h-[535px] md:h-[435px] flex flex-col'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='ml-auto mr-auto mt-5 md:ml-5 lg:mt-[43px] lg:ml-[55px]'>
                        <h1 className='text-2xl font-medium lg:text-4xl max-w-[60rem] text-brandNeutral-100'>Keep in Touch</h1>
                        <form onSubmit={onContactUsSubmit} className='flex flex-col md:flex-row lg:mt-3 gap-x-1 md:gap-x-8'>
                            {/** message field */}
                            <div className='flex flex-col'>
                                <h1 className='text-md md:text-[15px] leading-[3rem] font-[Montserrat] lg:text-[20px] max-w-[60rem] text-brandNeutral-100'>Message</h1> {/** change sizing for different screens */}
                                <textarea
                                    className=" w-[431px] h-[100px] md:h-[126px] bg-brandNeutral-100 px-1 rounded-lg border-2 font-[Montserrat]"
                                    id="message"
                                    name="message"
                                    value={message}
                                    placeholder="Enter Message Here"
                                    onChange={(e) => setMessage(e.target.value)}
			    				/>
                            </div>

                            {/** email field + ocmc contact info */}
                            <div className='flex flex-col gap-y-1 md:gap-y-5'>
                                <h1 className='text-md leading-[3rem] font-[Montserrat] md:text-[15px] lg:text-[20px] max-w-[60rem] text-brandNeutral-100'>Your Email</h1>
                                <input
                                    className="mt-[-12px] w-[431px] h-[37px] bg-brandNeutral-100 px-2 py-1 border-2 rounded-2xl font-[Montserrat]"
                                    id="email"
                                    type="text"
                                    value={email}
                                    placeholder="examplemail@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
	    						/>
                                <div className='flex justify-center mt-3'>
                                    <button className="text-xl text-white rounded-md disabled:bg-brandBlue-800 hover:bg-brandBlue-700 w-72 bg-brandBlue-600" type="submit" disabled={!canSubmit}>Send Message</button>
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-col md:flex-row md:gap-x-8 md:mt-8 ">
                            <div className='flex justify-center text-lg md:text-[20px] leading-[3rem] font-[Montserrat] lg:text-[25px] w-[431px]'>
                                <div className='flex flex-row'>
                                    <h1 className='text-brandYellow-500'>General&nbsp;Inquiries</h1>
                                    <h1 className='text-brandNeutral-100'>:&nbsp;ontariocmc@gmail.com</h1>
                                </div>
                            </div>
                            <div className='flex justify-center text-lg md:text-[20px] leading-[3rem] font-[Montserrat] lg:text-[25px] w-[431px]'>
                                <div className='flex flex-row'>
                                    <h1 className='text-brandYellow-500'>Test Day Inquiries</h1>
                                    <h1 className='text-brandNeutral-100'>: (647)-936-1124</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ml-auto mr-auto mt-5 lg:mt-[27px] lg:mr-[70px] lg:ml-auto w-fit flex flex-row gap-x-10 lg:flex-col lg:gap-y-6'>
                        <Image src={linkedin} alt="linkedin"/>
                        <Image src={facebook} alt="facebook"/>
                        <Image src={instagram} alt="instagram"/>
                    </div>
                </div>
                <div class="ml-auto mr-auto mt-3 md:mt-5 lg:ml-14 lg:mt-[30px]">
                    <h1 className="text-sm text-brandNeutral-100">© 2023 Ontario Competitive Mathematics Committee.</h1>
                </div>
            </div>
            
        </section>
    )
}

export default Footer