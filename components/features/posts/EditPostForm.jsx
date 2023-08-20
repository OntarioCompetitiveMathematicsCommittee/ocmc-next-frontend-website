"use client"

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdatePostMutation, useDeletePostMutation } from './postsApiSlice';

import BackButton from '@components/elements/BackButton';

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
		<section className="relative flex flex-col items-center justify-center w-full h-full gap-8 pb-32">
			<BackButton path="/portal/posts"/>
			<p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

			<h1 className="portalh2">Edit Post</h1>

			<form onSubmit={onUpdatePostClicked} className="flex flex-col items-center gap-4">
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="title">Title:</label>
					<input
						className="border-2 w-96"
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="content">Content:</label>
					<textarea
						className="h-64 border-2 w-96"
						id="content"
						name="content"
						value={content}
						onChange={handleContentChange}
					/>
				</div>

				<div className='flex items-center justify-start w-full gap-1'>
					<label className="text-xl text-brandBlue-900" htmlFor="display">Display:</label>
					<input
						className="w-4 h-4 border-2 accent-brandBlue-600"
						type="checkbox"
						id="display"
						name="display"
						checked={display}
						onChange={handleDisplayChange}
					/>
				</div>

				<button type="submit" disabled={!canSubmit} className='flex justify-center w-64 px-2 py-2 text-white rounded-md bg-brandBlue-500'>Update Post</button>
			</form>

			<button onClick={onDeletePostClicked} disabled={isDeleting} className='flex justify-center w-64 px-2 py-2 text-white bg-red-500 rounded-md'>Delete Post</button>
		</section>
	);

	return (
		<div>
			{page_content}
		</div>
	)
}

export default EditPostForm
