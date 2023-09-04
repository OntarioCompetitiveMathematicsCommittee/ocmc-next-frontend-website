"use client"

// import required modules and components
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { useAddNewPostMutation } from "@components/features/posts/postsApiSlice"
import useAuth from "@hooks/useAuth";

import CreateEditLayout from "@components/features/CreateEditLayout";

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

    const fields = [
        {
            label: "Title:",
            placeholder: "Post Title",
            type: "text",
            id: "title",
            value: title,
            onChange: handleTitleChange,
        },
        {
            label: "Content:",
            placeholder: "This is what I want to say...",
            type: "textarea",
            id: "content",
            value: content,
            onChange: handleContentChange,
        },
    ];

    const buttons = [
        {
            text: "Save Post",
            type: "submit",
            disabled: !canSubmit,
            color : "bg-brandBlue-500 hover:bg-brandBlue-600",
        },
    ];

    return <CreateEditLayout title="New Post" fields={fields} buttons={buttons} backPath="/portal/posts" onSubmit={onCreatePostClicked} isError={isError} error={errmsg} errRef={errRef}/>
}

export default NewPost
