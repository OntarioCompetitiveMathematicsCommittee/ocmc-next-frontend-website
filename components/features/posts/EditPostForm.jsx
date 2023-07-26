"use client"

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdatePostMutation, useDeletePostMutation } from './postsApiSlice';

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

	const page_content = (
		<section>
			<p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

			<h1>Edit Post</h1>

			<form onSubmit={onUpdatePostClicked}>
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

				<label htmlFor="display">Display:</label>
				<input
					type="checkbox"
					id="display"
					name="display"
					checked={display}
					onChange={handleDisplayChange}
				/>

				<button type="submit" disabled={!canSubmit}>Update Post</button>
			</form>

			<button onClick={onDeletePostClicked} disabled={isDeleting} className="delete-button">Delete Post</button>
		</section>
	);

	return (
		<div>
			{page_content}
		</div>
	)
}

export default EditPostForm
