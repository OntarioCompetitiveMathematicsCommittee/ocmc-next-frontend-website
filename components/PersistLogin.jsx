import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '@components/features/auth/authApiSlice';
import usePersist from '@hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@components/features/auth/authSlice';

const PersistLogin = ({ children }) => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const effectRan = useRef(false);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	useEffect(() => {
		if (
			effectRan.current === true ||
			process.env.NODE_ENV !== 'development'
		) {
			const verifyRefreshToken = async () => {
				console.log('verifying refresh token');
				try {
					await refresh();
					setTrueSuccess(true);
				} catch (err) {
					console.log(err);
				}
			};

			if (persist && !token) verifyRefreshToken();
		}

		return () => (effectRan.current = true);
	}, [persist, token, refresh]);

	let content;
	if (!persist && token) content = children;
	else if (isLoading) content = <p>Loading...</p>;
	// else if (!persist && !token) content = <p className="errmsg"> Unauthorized <Link href="/login">Please Login Again</Link></p>;
	else if (isError)
		content = (
			<p className='errmsg'>
				{error.data?.message}{' '}
				<Link href='/login'>Please Login Again 2</Link>
			</p>
		);
	else if (isSuccess && trueSuccess) content = children;
	else if (token && isUninitialized) content = children;

	return content;
};

export default PersistLogin;
