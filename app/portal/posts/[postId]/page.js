"use client";

// import required modules and components
import { useParams } from 'next/navigation';
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
    const content = post ? <EditPostForm post={post} id={id} /> : <p>Loading...</p>
    return content;
}

export default EditPost
