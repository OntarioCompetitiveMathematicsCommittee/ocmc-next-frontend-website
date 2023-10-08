'use client';

import { useRef, useState, useEffect } from 'react';
import { useRegisterMutation } from '@components/features/auth/authApiSlice';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOLS, SCHOOL_NUMBER, SCHOOL_REGION_LETTER } from '@config/schools';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"

import loginLogo from '@public/assets/login-logo.svg';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignupPage = () => {
	const userRef = useRef();

	const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);

	const [firstname, setFirstname] = useState('');
	const [validFirstname, setValidFirstname] = useState(false);

	const [lastname, setLastname] = useState('');
	const [validLastname, setValidLastname] = useState(false);

	const [school, setSchool] = useState('');
	const [validSchool, setValidSchool] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [grade, setGrade] = useState('');
	const [validGrade, setValidGrade] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);

	const [stage, setStage] = useState(0);

	const roles = ['Participant'];

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
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		const isNumber = /^\d+$/.test(grade);
		if (isNumber) setValidGrade(grade >= 1 && grade <= 12);
		else setValidGrade(false);
	}, [grade]);

	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);
	const onMatchPasswordChanged = (e) => setMatchPassword(e.target.value);
	const onFirstnameChanged = (e) => setFirstname(e.target.value);
	const onLastnameChanged = (e) => setLastname(e.target.value);
	const onSchoolChanged = (e) => setSchool(e.target.value);
	const onEmailChanged = (e) => setEmail(e.target.value);
	const onGradeChanged = (e) => setGrade(e.target.value);

	const canMoveOn =
		[
			roles.length,
			validUsername,
			validPassword,
			validMatchPassword,
			validEmail,
		].every(Boolean) && !isLoading;

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
			validGrade,
		].every(Boolean) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (stage === 1) {
			if (canSave) {
				await register({
					username: username,
					password: password,
					roles: roles,
					first_name: firstname,
					last_name: lastname,
					code: SCHOOL_REGION_LETTER[school]+'-'+SCHOOL_NUMBER[school]+'-',
					school: school,
					email: email,
					grade: grade,
					active: false
				});
			}
		} else {
			if (canMoveOn) {
				setStage(stage + 1);
			}
		}
	};

	let errmsg;
	if (isError) {
		window.scrollTo(0, 0);
		if (error.status === 409) {
			errmsg = <>Username is already taken. Please choose another.</>;
		} else {
			errmsg = <>An error occurred. Please try again later.</>;
		}
	}

	const formPages = [];

	formPages[0] = (
		<div className='flex flex-col'>
			<form onSubmit={onSaveUserClicked} className='flex flex-col gap-5'>
				{/* username input field */}
				<div className='flex flex-col '>
					<label htmlFor='username' className='text-brandNeutral-800'>
						Username:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
						placeholder='example123'
						type='text'
						id='username'
						ref={userRef}
						autoComplete='off'
						onChange={onUsernameChanged}
						value={username}
						required
						aria-invalid={validUsername ? 'false' : 'true'}
						aria-describedby='uidnote'
					/>
					<p
						id='uidnote'
						className={
							"text-red-600 text-sm " +
							((!username || validUsername) && 'hidden')
						}>
						4 to 24 characters
						<br />
						Must begin with a letter
						<br />
						Only certain symbols allowed
					</p>
				</div>

				<div className='flex flex-col '>
					<label htmlFor='email' className='text-brandNeutral-800'>
						Email:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
						placeholder='example@email.com'
						type='text'
						id='email'
						onChange={onEmailChanged}
						value={email}
						required
						aria-invalid={validEmail ? 'false' : 'true'}
						aria-describedby='emailnote'
					/>
					<p
						id='emailnote'
						className={
							"text-red-600 text-sm " +
							((!email || validEmail) && 'hidden')
						}>
						Must be a valid email address.
					</p>
				</div>
				{/* password input field */}
				<div className='flex flex-col '>
					<label htmlFor='password' className='text-brandNeutral-800'>
						Password:
					</label>
					<input
						className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
						placeholder='Example123!'
						type='password'
						id='password'
						onChange={onPasswordChanged}
						value={password}
						required
						aria-invalid={validPassword ? 'false' : 'true'}
						aria-describedby='pwdnote'
					/>
					<p
						id='pwdnote'
						className={
							"text-red-600 text-sm " +
							((!password || validPassword) && 'hidden')
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
				<div className='flex flex-col '>
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
						onChange={onMatchPasswordChanged}
						value={matchPassword}
						required
						aria-invalid={validMatchPassword ? 'false' : 'true'}
						aria-describedby='confirmnote'
					/>
					<p
						id='confirmnote'
						className={
							"text-red-600 text-sm " +
							((!matchPassword || validMatchPassword) && 'hidden')
						}>
						Must match the first password input field.
					</p>
				</div>

				{/* continue/submit button */}
				<button
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 border-2 rounded-sm font-medium font-[Montserrat] hover:bg-brandNeutral-200 transition-colors'
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
			<div className='flex flex-col '>
				<label htmlFor='firstname' className='text-brandNeutral-800'>
					First Name:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
					placeholder='John'
					type='text'
					id='firstname'
					onChange={onFirstnameChanged}
					value={firstname}
					required
					aria-invalid={validFirstname ? 'false' : 'true'}
					aria-describedby='firstnote'
				/>
				<p
					id='firstnote'
					className={
						"text-red-600 text-sm " +
						((!firstname || validFirstname) && 'hidden')
					}>
					You must enter a first name.
				</p>
			</div>

			<div className='flex flex-col '>
				<label htmlFor='lastname' className='text-brandNeutral-800'>
					Last Name:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 shadow-sm px-4 text-lg'
					placeholder='Doe'
					type='text'
					id='lastname'
					onChange={onLastnameChanged}
					value={lastname}
					required
					aria-invalid={validLastname ? 'false' : 'true'}
					aria-describedby='lastnote'
				/>
				<p
					id='lastnote'
					className={
						"text-red-600 text-sm " +
						((!lastname || validLastname) && 'hidden')
					}>
					You must enter a last name.
				</p>
			</div>
			{/* password input field */}
			<div className='flex flex-col '>
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
					>
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
						"text-red-600 text-sm " +
						((!school || validSchool) && 'hidden')
					}>
					You must select a school.
				</p>
			</div>
			<div className='flex flex-col '>
				<label htmlFor='grade' className='text-brandNeutral-800'>
					Grade:
				</label>
				<input
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 bg-brandNeutral-200 px-4 shadow-sm text-lg'
					placeholder='ex: 5,9,11,12'
					type='text'
					id='grade'
					onChange={onGradeChanged}
					value={grade}
					required
					aria-invalid={validGrade ? 'false' : 'true'}
					aria-describedby='gradenote'
				/>
				<p
					id='gradenote'
					className={
						"text-red-600 text-sm " +
						((!grade || validGrade) && 'hidden')
					}>
					Must be valid grade between 1 and 12, with no spaces.
				</p>
			</div>

			{/* error message if applicable */}
			{errmsg && <p className='w-[90vw] md:w-[min(30rem,45vw)] text-red-600 text-regular'>{errmsg}</p>}

			{/* continue/submit button */}
			<div className='flex gap-2 w-[90vw] md:w-[min(30rem,45vw)]'>
				<button
					className='flex-1 h-14 border-2 rounded-sm font-medium font-[Montserrat]'
					type='button'
					onClick={() => {setStage(0)}}>
					Back
				</button>
				<button
					className='flex-1 h-14 text-white rounded-sm font-medium font-[Montserrat]
					bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
					type='submit'>
					Sign Up
				</button>
			</div>
			
		</form>
	);

	let content;

	if (isSuccess) {
		content = (
			<section className="flex flex-col items-center flex-1 w-screen gap-6 text-center pt-36 md:bg-[url('/assets/auth-graphic.svg')] bg-left-top bg-no-repeat bg-cover ">
				<h1 className='portalh2'>User {username} successfully created!</h1>
				<p className='text-xl'>
					Please check your email for a verification link
					<br />
					Click <Link href='/login' className='text-blue-600 underline'>here</Link> to redirect to log in.
				</p>
			</section>
		);
	} else {
		content = (
			<section
				className="md:bg-[url('/assets/auth-graphic.svg')] h-full w-screen bg-left-top bg-no-repeat bg-cover 
				flex flex-col md:flex-row items-center justify-center lg:justify-between py-8 flex-1">
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
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<NavbarPlaceholder/>
			{content}
		</div>
	);
};

export default SignupPage;
