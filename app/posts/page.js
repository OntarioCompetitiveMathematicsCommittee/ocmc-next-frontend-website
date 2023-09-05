
import PostsFeed from '@components/portal/PostsFeed';
import Navbar from '@components/elements/Navbar';

const PublicPosts = () => {

	return (
		<>
			<Navbar />
			<div className='bg-[url("/assets/portal-bg.svg")] bg-cover h-full w-full fixed'></div>
			<div className='fixed w-full h-full'>
				<PostsFeed/>
			</div>
		</>
	);
};

export default PublicPosts;
