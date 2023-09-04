"use client"

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdatePostMutation, useDeletePostMutation } from './postsApiSlice';

import CreateEditLayout from '@components/features/CreateEditLayout';

const EditPostForm = ({ post, id }) => {
	const errRef = useRef(null);

	const [updatePost, { isLoading, isSuccess, isError, error }] = useUpdatePostMutation();
	const [deletePost, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeletePostMutation();

    const router = useRouter();

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [display, setDisplay] = useState(post.display);

	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleContentChange = (e) => setContent(e.target.value);
	const handleDisplayChange = (e) => setDisplay(e.target.checked);

	const canSubmit = [title, content].every(Boolean) && !isLoading;

	const onUpdatePostClicked = async (e) => {
		e.preventDefault();
		if (canSubmit) await updatePost({ id, title, content, display });
        router.push("/portal/posts");
	}

	const onDeletePostClicked = async (e) => {
		e.preventDefault();
		
		const confirmDelete = window.confirm("Are you sure you want to delete? This action cannot be undone.");

		if (confirmDelete) {
			await deletePost({ id });
            router.push("/portal/posts");
		}
	}

	let errmsg;
	if (isError) errmsg = error.error;
	else if (isDeleteError) errmsg = deleteError.error;

	const fields = [
		{
			label: "Title",
			placeholder: "Post Title",
			type: "text",
			id: "title",
			value: title,
			onChange: handleTitleChange
		},
		{
			label: "Content",
			placeholder: "Post Content",
			type: "textarea",
			id: "content",
			value: content,
			onChange: handleContentChange
		},
		{
			label: "Display",
			placeholder: "Display",
			type: "checkbox",
			id: "display",
			checked: display,
			onChange: handleDisplayChange
		}
	];

	const buttons = [
		{
			type: "submit",
			disabled: !canSubmit,
			color: "bg-brandBlue-500 hover:bg-brandBlue-600",
			text: "Update Post"
		},
		{
			type: "button",
			disabled: isDeleting,
			color: "bg-red-500 hover:bg-red-600",
			text: "Delete Post",
			onClick: onDeletePostClicked
		}
	];

	return <CreateEditLayout title="Edit Post" fields={fields} buttons={buttons} backPath="/portal/posts" onSubmit={onUpdatePostClicked} isError={isError || isDeleteError} errmsg={errmsg} errRef={errRef} />;
}

export default EditPostForm
