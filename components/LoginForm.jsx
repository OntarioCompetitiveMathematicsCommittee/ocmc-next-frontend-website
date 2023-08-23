"use client"

// importing required modules and components
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@components/features/auth/authSlice'
import { useLoginMutation } from '@components/features/auth/authApiSlice'

import usePersist from '@components/hooks/usePersist'

const LoginForm = () => {
    // sets focus on components at appropriate times
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const router = useRouter();
    // for dispatching actions
    const dispatch = useDispatch();

    // toggle for 'keep me logged' in checkbox
    const handleToggle = () => setPersist(prev => !prev);
    
    // handles login 
    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

    // focuses on username input field when component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // error message disappears when user reenters username/password
    useEffect(() => {
        setErrMsg('');
    }, [username, password]);
    
    // redirects user to /portal page (home) after successful login
    useEffect(() => {
        if (isSuccess) router.replace('/portal');
    }, [isSuccess, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // send login request + get access token
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            // set local use state in login back to empty string
            setUsername('');
            setPassword('');
        } catch (err) {
            // handle different errors
            if (!err.status) setErrMsg('No server response');
            else if (err.status === 400) setErrMsg('Missing username or password');
            else if (err.status === 401) setErrMsg('Invalid username or password');
            else setErrMsg(err.data?.message);
            // focus on error message
            errRef.current.focus();
        }
    }

    // ensure user has entered both username and password to continue
    const canLogin = username && password;


    return (
        <>
            <h1 className="mb-3 text-3xl font-bold">
                Login
            </h1>
            <div className="flex flex-col items-center w-full gap-2">
                <form onSubmit={handleLogin} className='flex flex-col items-center w-full gap-3'>
                    {/* username field */}
                    <div className='flex flex-col w-3/4'>
                        <label htmlFor="username">Username</label>
                        <input
                            className='w-full px-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-md'
                            type="text"
                            id="username"
                            name="username"
                            ref={userRef}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Enter Username'
                        />
                    </div>
                    
                    {/* password field */}
                    <div className='flex flex-col w-3/4'>
                        <label htmlFor="password text-brandNeutral-800">Password</label>
                        <input
                            className='w-full px-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-md'
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter Password'
                        />
                    </div>

                    {/* display error message if there is one */}
                    <p ref={errRef} className={"text-red-900 transition-all opacity-0 h-0 -translate-y-3 " 
                        + (errMsg && "opacity-100 h-full translate-y-0")} aria-live="assertive">* {errMsg}</p>

                    {/* remember me */}
                    <div className='w-3/4'>
                        <label htmlFor="persist" className='align-baseline'>
                            <input
                                type="checkbox"
                                id="persist"
                                name="persist"
                                checked={persist}
                                onChange={handleToggle}
                            />
                            <p className='inline ml-1'>Remember Me</p>
                        </label>
                    </div>
                    <button type='submit' className='px-8 py-2 font-medium text-white rounded-full bg-gradient-to-br from-brandGreen-500 to-brandBlue-500'>SIGN IN</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm