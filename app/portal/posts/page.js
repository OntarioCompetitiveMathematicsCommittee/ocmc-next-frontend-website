"use client"

import { useState } from 'react'
import { useGetPostsQuery } from '@components/features/posts/postsApiSlice'
import Link from 'next/link'
import Post from '@components/features/posts/Post'

import TableHead from '@components/TableHead'

const PostsList = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const [searchQuery, setSearchQuery] = useState("");


  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error.error}</p>;

  if (isSuccess) {
    const { ids } = posts;

    const tableContent = ids?.length
      ? ids.map((postId) => <Post key={postId} postId={postId} searchQuery={searchQuery}/>) : null;

    content = (
      <div className='w-full h-full flex flex-col py-24 items-center gap-24 overflow-scroll'>
				<div className='text-center flex flex-col gap-2 items-center'>
          <h1 className={"text-5xl font-bold"}>Posts List</h1>
          <Link className='w-64 py-2 px-2 rounded-md bg-brandBlue-500 text-white flex justify-center' href="/portal/posts/new">
            <button>Create New Post</button>
          </Link>
        </div>

        <div className='flex flex-col w-4/5 gap-4'>
					<input
						className="w-64 py-2 px-2 rounded-md border-2 "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Posts..."
					/>
        
          <table>
            <TableHead headings={["Title", "Content", "Description", "Visible", "Date Posted", "Edit"]}/>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    )
  }

  return content;
}

export default PostsList
