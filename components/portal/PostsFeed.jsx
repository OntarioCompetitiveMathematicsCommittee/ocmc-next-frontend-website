'use client';

// import required modules and components
import { useState } from 'react';
import { useGetPostsQuery } from '@components/features/posts/postsApiSlice';
import Link from 'next/link';
import PublicPost from '@components/features/posts/PublicPost';

const PostsFeed = () => {
	// fetch list of posts
	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	// state of search query input
	const [searchQuery, setSearchQuery] = useState('');

	let content;

	// display error message
	if (isError) content = <p>{error.error}</p>;

	// render list of posts
	if (isSuccess) {
		const { ids } = posts;


		content = (
			<div className='flex flex-col items-center h-full gap-24 px-4 py-24 pt-32 overflow-scroll'>
				<div className='flex flex-col items-center w-full max-w-5xl gap-12 text-center'>
					{/** title */}
					<h1 className="portalh2">
						OCMC Announcements
					</h1>
				

					{/** search query input field */}
					<div className='flex flex-col w-full gap-4'>
						{
							ids?.length
							? ids.map((postId) => (
									<PublicPost
										key={postId}
										postId={postId}
										searchQuery={searchQuery}
									/>
							  ))
							: null
						}
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='w-full h-full'>
				{content}
			</div>
		</>
	);
};

export default PostsFeed;
