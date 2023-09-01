'use client';

// importing required modules and components
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@components/features/auth/authSlice';
import { useLoginMutation } from '@components/features/auth/authApiSlice';

import usePersist from '@hooks/usePersist';

import loginLogo from '@public/assets/login-logo.svg';

import Image from 'next/image';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from '@components/elements/NavbarPlaceholder';

const Login = () => {
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
	const handleToggle = () => setPersist((prev) => !prev);

	// handles login
	const [login, { isLoading, isSuccess, isError, error }] =
		useLoginMutation();

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
			const { accessToken } = await login({
				username,
				password,
			}).unwrap();
			dispatch(setCredentials({ accessToken }));
			// set local use state in login back to empty string
			setUsername('');
			setPassword('');
		} catch (err) {
			// handle different errors
			if (!err.status) setErrMsg('No server response');
			else if (err.status === 400)
				setErrMsg('Missing username or password');
			else if (err.status === 401)
				setErrMsg('Invalid username or password');
			else if (err.status === 403) setErrMsg('Please verify your email first!');
			else setErrMsg(err.data?.message);
			// focus on error message
			errRef.current.focus();
		}
	};

	// if (isLoading) return <p>Loading...</p>

	// ensure user has entered both username and password to continue
	const canLogin = username && password;

	const content = (
		<section
			className="md:bg-[url('/assets/auth-graphic.svg')] h-screen w-screen bg-left-top bg-no-repeat bg-cover 
			flex flex-col md:flex-row items-center justify-center lg:justify-between py-8 flex-1">
			<header className='flex items-center justify-center w-1/2'>
				<div className='flex flex-col items-center'>
					<h1 className='text-[max(5vw,3rem)] font-bold'>Log in.</h1>
					<Image
						className='w-[max(20rem,25vw)] hidden md:block'
						src={loginLogo}
						alt='login'
					/>
				</div>
			</header>

			<main className='flex flex-col items-center justify-center w-1/2'>
				<div className='flex flex-col'>
					<form
						onSubmit={handleLogin}
						className='flex flex-col gap-5'>
						{/* username input field */}
						<div className='flex flex-col rounded-sm'>
							<label
								htmlFor='username'
								className='text-brandNeutral-800'>
								Username
							</label>
							<input
								className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm'
								type='text'
								id='username'
								name='username'
								ref={userRef}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder='Enter Username'
							/>
						</div>

						{/* password input field */}
						<div className='flex flex-col rounded-sm'>
							<label
								htmlFor='password'
								className='text-brandNeutral-800'>
								Password
							</label>
							<input
								className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm'
								type='password'
								id='password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter Password'
							/>
						</div>

						{/* display error message if there is one */}
						<p
							ref={errRef}
							className={
								'text-red-900 transition-all opacity-0 h-0 -translate-y-3 ' +
								(errMsg && 'opacity-100 h-full translate-y-0')
							}
							aria-live='assertive'>
							* {errMsg}
						</p>

						{/* Keep me logged in checkbox */}
						<label htmlFor='persist'>
							<input
								type='checkbox'
								id='persist'
								name='persist'
								checked={persist}
								onChange={handleToggle}
							/>
							<p className='inline ml-1'>Remember Me</p>
						</label>

						{/* login/submit button */}
						<button
							className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-gradient-to-br from-brandBlue-600 to-brandGreen-600 text-white font-medium font-[Montserrat] rounded-sm'
							type='submit'
							disabled={!canLogin}>
							Login
						</button>
					</form>
					{/* link to signup page */}
					<p className='mt-2'>
						Dont have an account?{' '}
						<Link
							href='/signup'
							className='text-blue-500 underline'>
							Register
						</Link>
						!
					</p>
				</div>
			</main>
		</section>
	);

	// render
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<NavbarPlaceholder/>
			{content}
		</div>
	);
};

export default Login;
