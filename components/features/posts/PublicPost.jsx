import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { useState } from 'react'
import { selectPostById } from "./postsApiSlice"
import { selectUserById } from "../users/usersApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"

const Post = ({ postId, searchQuery }) => {
    const [expanded, setExpanded] = useState(false);

    const post = useSelector((state) => selectPostById(state, postId));

    useGetUsersQuery();
    const user = useSelector((state) => selectUserById(state, post?.author_id));
    const author = (user) ? `${user.first_name} ${user.last_name}` : "Author Unknown";

    const router = useRouter();

    if (post) {
        if (searchQuery !== "") {
            if (!post.title.toLowerCase().includes(searchQuery.toLowerCase())
                && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const updated = new Date(post.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        
        let truncatedContent;
        if (post.content.length > 150) truncatedContent = post.content.substring(0, 150) + "...";
        else truncatedContent = post.content;

        const handleEdit = () => router.push("/portal/posts/" + postId);

        return (
            <div className='flex flex-col justify-start w-full gap-2 p-4 pb-6 bg-white border-2'>
                <div className='flex gap-2'>
                    <h3 className='text-md'>{author}</h3>
                    <p className='text-gray-500 text-md'>Last Edited: {updated}</p>
                </div>
                <button className='flex flex-col gap-2' onClick={() => {setExpanded(prev => !prev)}}>
                    <h1 className='text-2xl font-bold text-left font-[Montserrat] max-w-2xl'>{post.title}</h1>
                    <p className='text-left text-gray-500 text-md font-[Montserrat] max-w-2xl'>{expanded ? post.content : truncatedContent}</p>
                </button>
            </div>
        )
    } else return null;
}

export default Post
