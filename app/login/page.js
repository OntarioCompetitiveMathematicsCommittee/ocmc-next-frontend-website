'use client';

// importing required modules and components
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@components/features/auth/authSlice';
import {
	useLoginMutation,
	useForgotPasswordMutation,
} from '@components/features/auth/authApiSlice';

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

	// forgot password view + the email typed into it
	const [forgot, setForgot] = useState(false);
	const [email, setEmail] = useState('');
	const [sent, setSent] = useState(false);

	const router = useRouter();
	// for dispatching actions
	const dispatch = useDispatch();

	// toggle for 'keep me logged' in checkbox
	const handleToggle = () => setPersist((prev) => !prev);

	// handles login
	const [login, { isLoading, isSuccess, isError, error }] =
		useLoginMutation();

	// asks the server to email a reset link
	const [forgotPassword, { isLoading: isSending }] =
		useForgotPasswordMutation();

	// focuses on username input field when component loads
	useEffect(() => {
		userRef.current.focus();
	}, []);

	// error message disappears when user reenters username/password/email
	useEffect(() => {
		setErrMsg('');
	}, [username, password, email]);

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

	const handleForgot = async (e) => {
		e.preventDefault();
		try {
			// ask for a reset email
			await forgotPassword({ email }).unwrap();
			setSent(true);
			setEmail('');
		} catch (err) {
			// handle different errors
			if (!err.status) setErrMsg('No server response');
			else if (err.status === 400)
				setErrMsg('Please enter a valid email address');
			else if (err.status === 500)
				setErrMsg('Could not send the reset email, please try again later');
			else setErrMsg(err.data?.message);
			// focus on error message
			errRef.current.focus();
		}
	};

	// switches between the login and forgot password views
	const toggleForgot = () => {
		setForgot((prev) => !prev);
		setErrMsg('');
		setSent(false);
	};

	// ensure user has entered both username and password to continue
	const canLogin = username && password;

	const content = (
		<section
			className="md:bg-[url('/assets/auth-graphic.svg')] h-screen w-screen bg-left-top bg-no-repeat bg-cover 
			flex flex-col md:flex-row items-center justify-center lg:justify-between py-8 flex-1">
			<header className='flex items-center justify-center w-1/2'>
				<div className='flex flex-col items-center'>
					<h1 className='text-[max(5vw,3rem)] font-bold'>
						{forgot ? 'Reset Password.' : 'Log in.'}
					</h1>
					<Image
						className='w-[max(20rem,25vw)] hidden md:block'
						src={loginLogo}
						alt='login'
					/>
				</div>
			</header>

			<main className='flex flex-col items-center justify-center w-1/2'>
				<div className='flex flex-col'>
					{forgot ? (
						<>
							<form
								onSubmit={handleForgot}
								className='flex flex-col gap-5'>
								{/* email input field */}
								<div className='flex flex-col'>
									<label
										htmlFor='email'
										className='text-brandNeutral-800'>
										Email
									</label>
									<input
										className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm'
										type='email'
										id='email'
										name='email'
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder='Enter Email'
									/>
								</div>

								{/* display error message if there is one */}
								<p
									ref={errRef}
									className={
										'text-red-900 transition-all opacity-0 h-0 -translate-y-3 ' +
										(errMsg &&
											'opacity-100 h-full translate-y-0')
									}
									aria-live='assertive'>
									* {errMsg}
								</p>

								{/* same message either way so the form does not reveal which emails have an account */}
								{sent && (
									<p className='text-brandGreen-700'>
										If an account is linked to this email, a
										reset link will be sent!
									</p>
								)}

								{/* send reset link button */}
								<button
									className='w-[90vw] md:w-[min(30rem,45vw)] h-14 text-white font-medium font-[Montserrat] rounded-sm
									bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
									type='submit'
									disabled={!email || isSending}>
									Send Reset Link
								</button>
							</form>
							{/* back to the login form */}
							<button
								type='button'
								onClick={toggleForgot}
								className='mt-2 text-blue-500 underline w-fit'>
								Back to login
							</button>
						</>
					) : (
						<>
							<form
								onSubmit={handleLogin}
								className='flex flex-col gap-5'>
								{/* username input field */}
								<div className='flex flex-col'>
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
										onChange={(e) =>
											setUsername(e.target.value)
										}
										placeholder='Enter Username'
									/>
								</div>

								{/* password input field */}
								<div className='flex flex-col'>
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
										onChange={(e) =>
											setPassword(e.target.value)
										}
										placeholder='Enter Password'
									/>
								</div>

								{/* display error message if there is one */}
								<p
									ref={errRef}
									className={
										'text-red-900 transition-all opacity-0 h-0 -translate-y-3 ' +
										(errMsg &&
											'opacity-100 h-full translate-y-0')
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
									className='w-[90vw] md:w-[min(30rem,45vw)] h-14 text-white font-medium font-[Montserrat] rounded-sm
									bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
									type='submit'
									disabled={!canLogin}>
									Login
								</button>
							</form>
							{/* forgot password link */}
							<button
								type='button'
								onClick={toggleForgot}
								className='mt-2 text-blue-500 underline w-fit'>
								Forgot Password?
							</button>
							{/* link to signup page */}
							<p className='mt-2'>
								Don&apos;t have an account?{' '}
								<Link
									href='/signup'
									className='text-blue-500 underline'>
									Register
								</Link>
								!
							</p>
						</>
					)}
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
