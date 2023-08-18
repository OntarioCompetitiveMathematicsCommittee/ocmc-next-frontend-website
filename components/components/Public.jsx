import Link from 'next/link';

const Public = () => {
	return (
		<div>
			<h1>Homepage</h1>

			<Link href='/login'>Login</Link>
		</div>
	);
};

export default Public;
