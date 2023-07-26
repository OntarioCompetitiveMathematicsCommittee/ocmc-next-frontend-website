"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { useAddNewPostMutation } from "@components/features/posts/postsApiSlice"
import useAuth from "@components/hooks/useAuth";

const NewPost = () => {
    const { id } = useAuth();
    const author_id = id;

    const errRef = useRef(null);

    const [addNewPost, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPostMutation();

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    const canSubmit = [title, content].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccess) router.push('/portal/posts')
    }, [isSuccess, router]);

    const onCreatePostClicked = async (e) => {
        e.preventDefault();
        alert(canSubmit)
        if (canSubmit) await addNewPost({ author_id, title, content });
    }

    let errmsg;
    if (isError) errmsg = error.error;

    const page_content = (
        <section>
            <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

            <h1>New Post</h1>

            <form onSubmit={onCreatePostClicked}>

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />

                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />

                <button type="submit" disabled={!canSubmit}>Save Post</button>
            </form>
        </section>
    )

    return (
        <div>
            {page_content}
        </div>
    )
}

export default NewPost
