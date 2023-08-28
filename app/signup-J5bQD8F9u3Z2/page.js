'use client';
//signup-J5bQD8F9u3Z2

import { useRef, useState, useEffect } from 'react';
import { useRegisterMutation } from '@components/features/auth/authApiSlice';
import Link from 'next/link';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SCHOOLS } from '@config/schools';

import Navbar from '@components/elements/Navbar';
import loginLogo from '@public/assets/auth-graphic.svg';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ProctorSignup = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [register, { isLoading, isSuccess, isError, error }] =
		useRegisterMutation();

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [usernameFocus, setUsernameFocus] = useState(false);

	const [firstname, setFirstname] = useState('');
	const [validFirstname, setValidFirstname] = useState(false);
	const [firstnameFocus, setFirstnameFocus] = useState(false);

	const [lastname, setLastname] = useState('');
	const [validLastname, setValidLastname] = useState(false);
	const [lastnameFocus, setLastnameFocus] = useState(false);

	const [school, setSchool] = useState('');
	const [validSchool, setValidSchool] = useState(false);
	const [schoolFocus, setSchoolFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);
	const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

	const [registrationPasscode, setRegistrationPasscode] = useState('');

	const [stage, setStage] = useState(0);

	const [errMsg, setErrMsg] = useState('');

	const roles = ['Proctor'];

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
		setValidMatchPassword(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setValidFirstname(firstname.length > 0);
	}, [firstname]);

	useEffect(() => {
		setValidLastname(lastname.length > 0);
	}, [lastname]);

	useEffect(() => {
		setValidSchool(school.length > 0 && SCHOOLS.includes(school));
	}, [school]);

	useEffect(() => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		setValidEmail(emailRegex.test(email));
	}, [email]);

	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);
	const onMatchPasswordChanged = (e) => setMatchPassword(e.target.value);
	const onFirstnameChanged = (e) => setFirstname(e.target.value);
	const onLastnameChanged = (e) => setLastname(e.target.value);
	const onSchoolChanged = (e) => setSchool(e.target.value);
	const onEmailChanged = (e) => setEmail(e.target.value);
	const onRegistrationPasscodeChanged = (e) =>
		setRegistrationPasscode(e.target.value);

	const canSave =
		[
			roles.length,
			validUsername,
			validPassword,
			validMatchPassword,
			validFirstname,
			validLastname,
			validSchool,
			validEmail,
		].every(Boolean) && !isLoading;

	const canMoveOn =
		[
			roles.length,
			validUsername,
			validPassword,
			validMatchPassword,
			validEmail,
		].every(Boolean) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();

		if (stage === 1) {
			console.log(registrationPasscode, process.env.NEXT_PUBLIC_REACT_APP_PROCTOR_PASSKEY)
			if (registrationPasscode !== process.env.NEXT_PUBLIC_REACT_APP_PROCTOR_PASSKEY) {
				// errRef.current.focus();
				setErrMsg(
					'Invalid registration passcode. Please contact the OCMC Executive Team at placeholder@gmail.com to recieve a passkey.'
				);
				return;
			}
			console.log("working2")
			if (canSave) {
				await register({
					username: username,
					password: password,
					roles: roles,
					first_name: firstname,
					last_name: lastname,
					school: school,
					email: email,
					grade: -1,
					active: false
				});
			}
		} else {
			if (canMoveOn) {
				setStage(stage + 1);
			}
		}
	};

	if (isError) {
		window.scrollTo(0, 0);
		if (error.status === 409) {
			setErrMsg('Username already exists. Please choose another.');
		} else {
			setErrMsg('An error occurred. Please try again.');
		}
	}

	const formPages = [];

	formPages[0] = (
		<div className='flex flex-col'>
			<form onSubmit={onSaveUserClicked} className='flex flex-col gap-5'>
				{/* username input field */}
				<div className='flex flex-col rounded-sm'>
					<label htmlFor='username' className='text-brandNeutral-800'>
						Username:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
						type='text'
						id='username'
						ref={userRef}
						autoComplete='off'
						onChange={onUsernameChanged}
						value={username}
						required
						aria-invalid={validUsername ? 'false' : 'true'}
						aria-describedby='uidnote'
						onFocus={() => setUsernameFocus(true)}
						onBlur={() => setUsernameFocus(false)}
					/>
					<p
						id='uidnote'
						className={
							usernameFocus && username && !validUsername
								? 'instructions'
								: 'hidden'
						}>
						4 to 24 characters.
						<br />
						Must begin with a letter.
						<br />
						Letters, numbers, underscores, hyphens allowed.
					</p>
				</div>

				<div className='flex flex-col rounded-sm'>
					<label htmlFor='email' className='text-brandNeutral-800'>
						Email:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
						type='text'
						id='email'
						onChange={onEmailChanged}
						value={email}
						required
						aria-invalid={validEmail ? 'false' : 'true'}
						aria-describedby='emailnote'
						onFocus={() => setEmailFocus(true)}
						onBlur={() => setEmailFocus(false)}
					/>
					<p
						id='emailnote'
						className={
							emailFocus && !validEmail
								? 'instructions'
								: 'hidden'
						}>
						Must be a valid email address.
					</p>
				</div>
				{/* password input field */}
				<div className='flex flex-col rounded-sm'>
					<label htmlFor='password' className='text-brandNeutral-800'>
						Password:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
						type='password'
						id='password'
						onChange={onPasswordChanged}
						value={password}
						required
						aria-invalid={validPassword ? 'false' : 'true'}
						aria-describedby='pwdnote'
						onFocus={() => setPasswordFocus(true)}
						onBlur={() => setPasswordFocus(false)}
					/>
					<p
						id='pwdnote'
						className={
							passwordFocus && !validPassword
								? 'instructions'
								: 'hidden'
						}>
						8 to 24 characters.
						<br />
						Must include uppercase and lowercase letters, a number
						and a special character.
						<br />
						Allowed special characters:{' '}
						<span aria-label='exclamation mark'>!</span>{' '}
						<span aria-label='at symbol'>@</span>{' '}
						<span aria-label='hashtag'>#</span>{' '}
						<span aria-label='dollar sign'>$</span>{' '}
						<span aria-label='percent'>%</span>
					</p>
				</div>
				<div className='flex flex-col rounded-sm'>
					<label
						htmlFor='confirm_pwd'
						className='text-brandNeutral-800'>
						Confirm Password:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
						type='password'
						id='confirm_pwd'
						onChange={onMatchPasswordChanged}
						value={matchPassword}
						required
						aria-invalid={validMatchPassword ? 'false' : 'true'}
						aria-describedby='confirmnote'
						onFocus={() => setMatchPasswordFocus(true)}
						onBlur={() => setMatchPasswordFocus(false)}
					/>
					<p
						id='confirmnote'
						className={
							matchPasswordFocus && !validMatchPassword
								? 'instructions'
								: 'hidden'
						}>
						Must match the first password input field.
					</p>
				</div>

				{/* continue/submit button */}
				<button
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 border-2 rounded-lg font-medium font-[Montserrat]'
					type='submit'>
					Continue
				</button>
			</form>
			{/* link to signup page */}
			<p className='mt-2'>
				Already have an account?{' '}
				<Link href='/login' className='text-blue-500 underline'>
					Sign In!
				</Link>
			</p>
		</div>
	);

	formPages[1] = (
		<form onSubmit={onSaveUserClicked} className='flex flex-col gap-5'>
			{/* username input field */}
			<div className='flex flex-col rounded-sm'>
				<label htmlFor='firstname' className='text-brandNeutral-800'>
					First Name:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
					type='text'
					id='firstname'
					onChange={onFirstnameChanged}
					value={firstname}
					required
					aria-invalid={validFirstname ? 'false' : 'true'}
					aria-describedby='firstnote'
					onFocus={() => setFirstnameFocus(true)}
					onBlur={() => setFirstnameFocus(false)}
				/>
				<p
					id='firstnote'
					className={
						firstnameFocus && !validFirstname
							? 'instructions'
							: 'hidden'
					}>
					You must enter a first name.
				</p>
			</div>

			<div className='flex flex-col rounded-sm'>
				<label htmlFor='lastname' className='text-brandNeutral-800'>
					Last Name:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
					type='text'
					id='lastname'
					onChange={onLastnameChanged}
					value={lastname}
					required
					aria-invalid={validLastname ? 'false' : 'true'}
					aria-describedby='lastnote'
					onFocus={() => setLastnameFocus(true)}
					onBlur={() => setLastnameFocus(false)}
				/>
				<p
					id='lastnote'
					className={
						lastnameFocus && !validLastname
							? 'instructions'
							: 'hidden'
					}>
					You must enter a last name.
				</p>
			</div>
			{/* password input field */}
			<div className='flex flex-col rounded-sm'>
				<label htmlFor='school' className='text-brandNeutral-800'>
					School:
				</label>
				<select
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
					id='school'
					onChange={onSchoolChanged}
					value={school}
					required
					aria-invalid={validSchool ? 'false' : 'true'}
					aria-describedby='schoolnote'
					onFocus={() => setSchoolFocus(true)}
					onBlur={() => setSchoolFocus(false)}>
					<option value='' disabled hidden>
						Select a school
					</option>
					{SCHOOLS.map((school, index) => (
						<option key={index} value={school}>
							{school}
						</option>
					))}
				</select>
				<p
					id='schoolnote'
					className={
						schoolFocus && !validSchool ? 'instructions' : 'hidden'
					}>
					<FontAwesomeIcon icon={faInfoCircle} />
					You must select a school.
				</p>
			</div>
			<div className='flex flex-col rounded-sm'>
				<label
					className='text-brandNeutral-800'
					htmlFor='registration_passcode'>
					Proctor Registration Passcode:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
					type='password'
					id='registration_passcode'
					onChange={onRegistrationPasscodeChanged}
					value={registrationPasscode}
					required
					aria-describedby='passcodenote'
				/>

			</div>

			{/* continue/submit button */}
			<button
				className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-gradient-to-br from-brandBlue-600 to-brandGreen-600 text-white rounded-lg font-medium font-[Montserrat]'
				type='submit'>
				Sign Up
			</button>
		</form>
	);

	let content;

	if (isSuccess) {
		content = (
			<section>
				<h1>User {username} successfully created!</h1>
				<br />
				<p>
					Click <Link href='/login'>here</Link> to log in.
				</p>
			</section>
		);
	} else {
		content = (
			<section
				className="md:bg-[url('/assets/auth-graphic.svg')] h-screen w-screen bg-left-top bg-no-repeat bg-cover 
				flex flex-col md:flex-row items-center justify-center lg:justify-between">
				<header className='flex items-center justify-center w-1/2'>
					<div className='flex flex-col items-center'>
						<h1 className='text-[max(5vw,3rem)] font-bold'>
							Register.
						</h1>
						<Image
							className='w-[max(20rem,25vw)] hidden md:block'
							src={loginLogo}
							alt='login'
						/>
					</div>
				</header>

				<main className='flex flex-col items-center justify-center w-1/2'>
					{formPages[stage]}
				</main>
			</section>
		);
	}

	return (
		<div className='Signup'>
			<Navbar />
			{content}
		</div>
	);
};

export default ProctorSignup;
