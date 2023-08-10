"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AuthGraphic from '@public/assets/auth-graphic.svg'

import Navbar from '@components/Navbar'
import LoginForm from '@components/LoginForm'
import SignupForm from '@components/SignupForm'

const LoginRegister = ({children}) => {
    const [formState, setFormState] = useState('Sign In')

    const loginSideTitle = 'Hello, Friend!'
    const loginSideText = 'Enter your personal details and start your journey with us'
    const loginSideButton = 'SIGN UP'

    const registerSideTitle = 'Welcome Back!'
    const registerSideText = 'To keep connected with use please login with your personal info'
    const registerSideButton = 'SIGN IN'

    const changeForm = ()  => {
        if (formState === 'Sign In') {
            setFormState('Register')
        } else {
            setFormState('Sign In')
        }
    }

    return (
        <>
            <Navbar/>
            <section className='h-screen w-screen flex justify-center items-center md:bg-[url("/assets/auth-graphic.svg")] bg-left-top bg-no-repeat bg-cover '>
                <div className="w-full max-w-4xl h-[32rem] bg-white rounded-lg shadow-xl flex">
                    <div className='w-1/2 rounded-l-lg flex flex-col justify-center items-center relative'>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <LoginForm/>
                        </div>
                        <div className='w-full absolute translate-x-full flex flex-col justify-center items-center'>
                            <SignupForm/>
                        </div>
                    </div>
                    <div className={'w-1/2 bg-gradient-to-br from-brandGreen-600 to-brandBlue-500 rounded-lg flex flex-col justify-center items-center text-white transition-all '
                        + 'overflow-hidden duration-1000 relative ' + (formState === 'Register' && '-translate-x-full')}>
                        {/* login side text */}
                        <div className={"w-full flex items-center flex-col absolute transition-all duration-1000 "
                            + (formState === 'Register' && 'translate-x-full')}>
                            <h1 className="text-3xl font-bold mb-3 text-white">
                                {loginSideTitle}
                            </h1>
                            <p className={'max-w-xs text-center text-gray-100 font-[Montserrat]'}>
                                {loginSideText}
                            </p>
                            <Link href="/signup" onClick={changeForm} className='border border-white text-white font-medium px-8 py-2 m-4 rounded-full'>
                                {loginSideButton}
                            </Link>
                        </div>
                                
                        {/* register side text */}
                        <div className={"w-full flex items-center flex-col absolute transition-all duration-1000 -translate-x-full "
                            + (formState === 'Register' && 'translate-x-0')}>
                            <h1 className="text-3xl font-bold mb-3 text-white">
                                {registerSideTitle}
                            </h1>
                            <p className={'max-w-xs text-center text-gray-100 font-[Montserrat]'}>
                                {registerSideText}
                            </p>
                            <Link href="/login" onClick={changeForm} className='border border-white text-white font-medium px-8 py-2 m-4 rounded-full'>
                                {registerSideButton}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {children}
        </>
    )
}

export default LoginRegister