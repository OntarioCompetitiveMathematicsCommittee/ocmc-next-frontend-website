"use client"

import { useState } from 'react'
import { useGetPostsQuery } from '@components/features/posts/postsApiSlice'
import Link from 'next/link'
import Post from '@components/features/posts/Post'

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
      <>
        <br />
        <h1>Posts List</h1>

        <Link href="/portal/posts/new"><button>Create New Post</button></Link>
        <br/><br/>

        <input
          type="text"
          placeholder="Search Posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <br/><br/>
        
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Visible</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    )
  }

  return content;
}

export default PostsList
