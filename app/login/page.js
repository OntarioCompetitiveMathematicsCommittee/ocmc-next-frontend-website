"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../components/features/auth/authSlice'
import { useLoginMutation } from '../../components/features/auth/authApiSlice'

import usePersist from '../../components/hooks/usePersist'

const Login = () => {
    const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();

	const router = useRouter();
	const dispatch = useDispatch();

	const handleToggle = () => setPersist(prev => !prev);

	const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);
	
	useEffect(() => {
		if (isSuccess) router.replace('/portal');
	}, [isSuccess, router]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername('');
			setPassword('');
		} catch (err) {
			if (!err.status) setErrMsg('No server response');
			else if (err.status === 400) setErrMsg('Missing username or password');
			else if (err.status === 401) setErrMsg('Invalid username or password');
			else setErrMsg(err.data?.message);
			errRef.current.focus();
		}
	}

	if (isLoading) return <p>Loading...</p>

	const canLogin = username && password;

	const content = (
		<section>
			<header>
				<h1>OCMC User Login</h1>
			</header>

			<main>
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

				<form onSubmit={handleLogin}>

					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						ref={userRef}
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<button type="submit" disabled={!canLogin}>Login</button>

					<label htmlFor="persist">
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
				<p>Dont have an account? Signup <Link href="/signup">here</Link>!</p>
			</footer>
		</section>
	)

	return (
		<div className="Login">
			{content}
		</div>
	)
}

export default Login