'use client';

import { useState } from 'react'
import { useSendMutation } from '@components/features/email/emailApiSlice';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from '@components/elements/NavbarPlaceholder';

const Contact = () => {
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
        <div className='flex flex-col w-screen h-screen bg-[url("/assets/ocmc-bg.svg")] bg-right-top bg-cover bg-no-repeat '>
            <Navbar/>
            <NavbarPlaceholder/>
            <section className='flex items-center justify-center w-full h-full'>
                <div className=' h-[40rem] md:h-[28rem] lg:h-[25rem] flex flex-col bg-brandNeutral-200 border-4 border-4 rounded-lg border-brandNeutral-300 px-4'>
                    <div className='flex flex-col items-center lg:flex-row'>
                        <div className='mt-5 w-96 md:w-[50rem] lg:mt-11 lg:ml-14'>
                            <h1 className='text-2xl font-medium lg:text-4xl max-w-[60rem] text-black'>Contact Us</h1>
                            <form onSubmit={onContactUsSubmit} className='flex flex-col gap-5 md:flex-row lg:mt-3'>
                                {/** message field */}
                                <div className='flex flex-col'>
                                    <h1 className='text-md md:text-md leading-[3rem] font-[Montserrat] lg:text-xl max-w-[60rem] text-black'>
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
                                    <h1 className='text-md leading-[3rem] font-[Montserrat] md:text-md lg:text-xl max-w-[60rem] text-black'>
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
                                            {label}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col md:flex-row md:gap-x-8 md:mt-8 ">
                                <div className='flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat] w-96'>
                                    <div className='flex flex-row'>
                                        <h1 className='text-brandYellow-500'>General&nbsp;Inquiries</h1>
                                        <h1 className='text-black'>:&nbsp;general@ontariocmc.ca</h1>
                                    </div>
                                </div>
                                <div className='flex justify-center text-lg md:text-xl leading-[3rem] font-[Montserrat] w-96'>
                                    <div className='flex flex-row'>
                                        <h1 className='text-brandYellow-500'>Test Day Inquiries</h1>
                                        <h1 className='text-black'>: (647)-936-1124</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 ml-auto mr-auto lg:ml-14 lg:mt-8">
                        <h1 className="text-sm text-black">© 2024 Ontario Competitive Mathematics Committee.</h1>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default Contact
