
import PostsFeed from '@components/portal/PostsFeed';
import Navbar from '@components/elements/Navbar';
import Footer from '@components/homepage/Footer';

const PublicPosts = () => {

	return (
		<>
			<Navbar />
			<div className='bg-[url("/assets/portal-bg.svg")] bg-cover h-full w-full fixed'></div>
			<div className='absolute w-full h-full'>
				<PostsFeed/>
				<Footer/>
			</div>
		</>
	);
};

export default PublicPosts;
