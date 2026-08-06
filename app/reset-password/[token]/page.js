'use client';

// importing required modules and components
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useResetPasswordMutation } from '@components/features/auth/authApiSlice';
import { PWD_REGEX } from '@config/regex';

import Link from 'next/link';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from '@components/elements/NavbarPlaceholder';

const ResetPasswordPage = () => {
	// get token from url
	const params = useParams();
	const token = params.token;

	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [validMatchPassword, setValidMatchPassword] = useState(false);

	// handles the password reset
	const [resetPassword, { isLoading, isSuccess, isError, error }] =
		useResetPasswordMutation();

	// check the password as the user types
	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
		setValidMatchPassword(password === matchPassword);
	}, [password, matchPassword]);

	const handleReset = async (e) => {
		e.preventDefault();

		await resetPassword({ token, password });
	};

	let errMsg = '';
	if (isError) {
		// handle different errors
		if (!error.status) errMsg = 'No server response';
		else if (error.status === 400)
			errMsg = 'Password does not meet the requirements';
		else if (error.status === 401)
			errMsg =
				'Token Invalid: Token may have already been used or does not exist';
		else if (error.status === 403) errMsg = 'Token Expired';
		else errMsg = error.data?.message;
	}

	// both fields must be filled in correctly to continue
	const canReset = validPassword && validMatchPassword && !isLoading;

	let content;

	if (isSuccess) {
		content = (
			<section className="flex flex-col items-center flex-1 w-screen gap-6 text-center pt-36 md:bg-[url('/assets/auth-graphic.svg')] bg-left-top bg-no-repeat bg-cover ">
				<h1 className='portalh2'>Password changed!</h1>
				<p className='text-xl'>
					<br />
					Click{' '}
					<Link href='/login' className='text-blue-600 underline'>
						here
					</Link>{' '}
					to redirect to log in.
				</p>
			</section>
		);
	} else {
		content = (
			<div className='flex flex-col items-center bg-brandNeutral-100 bg-[url("/assets/portal-bg.svg")] bg-cover min-h-[100vh] static'>
				<h1 className='mt-10 portalh2'>Choose a new password</h1>
				<form
					onSubmit={handleReset}
					className='flex flex-col gap-5 mt-10'>
					{/* new password input field */}
					<div className='flex flex-col'>
						<label
							htmlFor='password'
							className='text-brandNeutral-800'>
							New Password:
						</label>
						<input
							className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
							placeholder='Example123!'
							type='password'
							id='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							aria-invalid={validPassword ? 'false' : 'true'}
							aria-describedby='pwdnote'
						/>
						<p
							id='pwdnote'
							className={
								'text-red-600 text-sm ' +
								((!password || validPassword) && 'hidden')
							}>
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a
							number and a special character.
							<br />
							Allowed special characters:{' '}
							<span aria-label='exclamation mark'>!</span>{' '}
							<span aria-label='at symbol'>@</span>{' '}
							<span aria-label='hashtag'>#</span>{' '}
							<span aria-label='dollar sign'>$</span>{' '}
							<span aria-label='percent'>%</span>
						</p>
					</div>

					{/* confirm password input field */}
					<div className='flex flex-col'>
						<label
							htmlFor='confirm_pwd'
							className='text-brandNeutral-800'>
							Confirm Password:
						</label>
						<input
							className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
							placeholder='Example123!'
							type='password'
							id='confirm_pwd'
							onChange={(e) => setMatchPassword(e.target.value)}
							value={matchPassword}
							required
							aria-invalid={validMatchPassword ? 'false' : 'true'}
							aria-describedby='confirmnote'
						/>
						<p
							id='confirmnote'
							className={
								'text-red-600 text-sm ' +
								((!matchPassword || validMatchPassword) &&
									'hidden')
							}>
							Must match the first password input field.
						</p>
					</div>

					{/* reset/submit button */}
					<button
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 text-white font-medium font-[Montserrat] rounded-md
						bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
						type='submit'
						disabled={!canReset}>
						Reset Password
					</button>
				</form>
				<h1 className={'text-red-500 text-xl mt-6'}>{errMsg}</h1>
			</div>
		);
	}

	// render
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<NavbarPlaceholder />
			{content}
		</div>
	);
};

export default ResetPasswordPage;
