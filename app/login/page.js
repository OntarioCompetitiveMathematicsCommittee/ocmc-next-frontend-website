"use client"

// importing required modules and components
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@components/features/auth/authSlice'
import { useLoginMutation } from '@components/features/auth/authApiSlice'

import usePersist from '@components/hooks/usePersist'

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
	
	// loading screen
	if (isLoading) return <p>Loading...</p>

	// ensure user has entered both username and password to continue
	const canLogin = username && password;

	const content = (
		<section>
			<header>
				<h1>OCMC User Login</h1>
			</header>

			<main>
				{/* display error message if there is one */}
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

				<form onSubmit={handleLogin}>

					{/* username input field */}
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						ref={userRef}
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>

					{/* password input field */}
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					{/* login/submit button */}
					<button type="submit" disabled={!canLogin}>Login</button>

					{/* Keep me logged in checkbox */}
					<label htmlFor="persist">
					{/* checkbox toggle */}
					<input
						type="checkbox"
						id="persist"
						name="persist"
						checked={persist}
						onChange={handleToggle}
					/>
					Keep me logged in
					</label>

				</form>
			</main>

			<footer>
				{/* link to signup page */}
				<p>Dont have an account? Signup <Link href="/signup">here</Link>!</p>
			</footer>
		</section>
	)

	// render
	return (
		<div className="Login">
			{content}
		</div>
	)
}

export default Login