"use client";

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectPostById } from '@components/features/posts/postsApiSlice';
import EditPostForm from '@components/features/posts/EditPostForm';

const EditPost = () => {
    const params = useParams();
    const id = params.postId;

    const post = useSelector(state => selectPostById(state, id));

    const content = post ? <EditPostForm post={post} id={id} /> : <p>Loading...</p>
    return content;
}

export default EditPost
