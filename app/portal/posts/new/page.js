"use client"

// import required modules and components
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { useAddNewPostMutation } from "@components/features/posts/postsApiSlice"
import useAuth from "@components/hooks/useAuth";

const NewPost = () => {
    // get user id
    const { id } = useAuth();
    const author_id = id; // for displaying author of post

    const errRef = useRef(null); // reference for error message element

    const [addNewPost, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPostMutation();

    const router = useRouter();

    // states of title and content inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // update title and content states when input fields change
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    // form can be submitted when title and content fields are filled and data is not loading
    const canSubmit = [title, content].every(Boolean) && !isLoading;

    // redirects user to posts page after post is successfully published
    useEffect(() => {
        if (isSuccess) router.push('/portal/posts')
    }, [isSuccess, router]);

    // creating a new post
    const onCreatePostClicked = async (e) => {
        e.preventDefault();
        alert(canSubmit) // window pops up to confirm

        // submit/publish post
        if (canSubmit) await addNewPost({ author_id, title, content });
    }

    // error messages
    let errmsg;
    if (isError) errmsg = error.error;

    const page_content = (
        <section>
            {/** display error message if there is one */}
            <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

            <h1>New Post</h1>

            <form onSubmit={onCreatePostClicked}>

                {/** title input field */}
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />

                {/** content textbox */}
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />

                {/** submit button is disabled if submission requirements are not met */}
                <button type="submit" disabled={!canSubmit}>Save Post</button>
            </form>
        </section>
    )

    // render
    return (
        <div>
            {page_content}
        </div>
    )
}

export default NewPost
