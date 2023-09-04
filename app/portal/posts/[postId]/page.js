"use client";

// import required modules and components
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectPostById } from '@components/features/posts/postsApiSlice';
import EditPostForm from '@components/features/posts/EditPostForm';

const EditPost = () => {
    // get post id
    const params = useParams();
    const id = params.postId;

    // select post data using post id
    const post = useSelector(state => selectPostById(state, id));

    // render EditPostForm component if data is available, otherwise display loading message
    const content = post ? (
		<EditPostForm post={post} id={id} />
	) : (
		<>
			<p className='portalh2'>Post Not Found</p>
			<Link href="/portal/posts" className='text-xl text-blue-600 underline'>Return to Posts &rarr;</Link>
		</>
	);
	return (
		<div className='flex flex-col items-center justify-center w-full h-full gap-2 px-4 text-center'>
			{content}
		</div>
	);
}

export default EditPost
