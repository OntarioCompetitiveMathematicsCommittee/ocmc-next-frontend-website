"use client"

// import required modules and components
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { useAddNewPostMutation } from "@components/features/posts/postsApiSlice"
import useAuth from "@hooks/useAuth";

import BackButton from "@components/elements/BackButton"

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
        alert(canSubmit) // popup

        // submit/publish post
        if (canSubmit) await addNewPost({ author_id, title, content });
    }

    // error messages
    let errmsg;
    if (isError) errmsg = error.error;

    return (
        <section className="relative flex flex-col items-center justify-center w-full h-full gap-8 pb-32">
            <BackButton path={'/portal/posts'}/>
            {/** display error message if there is one */}
            <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

            <h1 className="portalh2">New Post</h1>

            <form onSubmit={onCreatePostClicked} className="flex flex-col gap-4">

                {/** title input field */}
                <label className="text-xl text-brandBlue-900" htmlFor="title">Title:</label>
                <input
                    className="px-2 py-1 border-2 rounded-md w-96"
                    placeholder="Post Title"
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />

                {/** content textbox */}
                <label className="text-xl text-brandBlue-900" htmlFor="content">Content:</label>
                <textarea
                    className="h-64 px-2 py-1 border-2 rounded-md w-96"
                    placeholder="This is what I want to say..."
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />

                {/** submit button is disabled if submission requirements are not met */}
                <button className={"py-2 text-xl transition-colors rounded-md w-96 " + 
                    (canSubmit ? "text-white bg-brandBlue-500 hover:bg-brandBlue-600" : "border-2 bg-brandNeutral-100")}  
                    type="submit" disabled={!canSubmit}>
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default NewPost
