"use client"

// import required modules and components
import { useState } from 'react'
import { useGetPostsQuery } from '@components/features/posts/postsApiSlice'
import Link from 'next/link'
import Post from '@components/features/posts/Post'

import TableHead from '@components/portal/TableHead'
import TableWrapper from '@components/portal/TableWrapper'

const PostsList = () => {
  // fetch list of posts
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  // state of search query input
  const [searchQuery, setSearchQuery] = useState("");


  let content;

  // page loading
  if (isLoading) content = <p>Loading...</p>;

  // display error message
  if (isError) content = <p>{error.error}</p>;

  // render list of posts
  if (isSuccess) {
    const { ids } = posts;

    // list of posts based on ids
    const tableContent = ids?.length
      ? ids.map((postId) => <Post key={postId} postId={postId} searchQuery={searchQuery}/>) : null;

    content = (
      <div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				<div className='flex flex-col items-center gap-2 text-center'>
          {/** title */}
          <h1 className="portalh2">Posts List</h1>
          {/** button linked to create new post page */}
          <Link className='flex justify-center w-64 px-2 py-2 text-white rounded-md bg-brandBlue-500' href="/portal/posts/new">
            <button>Create New Post</button>
          </Link>
        </div>

        {/** search query input field */}
        <div className='flex flex-col w-4/5 gap-4'>
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Posts..."
					/>

          {/** table to display list of posts */}
          <TableWrapper>
            <TableHead headings={["Title", "Content", "Description", "Visible", "Date Posted", "Edit"]}/>
            <tbody className='text-md'>{tableContent}</tbody>
          </TableWrapper>
        </div>
      </div>
    )
  }

  return content;
}

export default PostsList
