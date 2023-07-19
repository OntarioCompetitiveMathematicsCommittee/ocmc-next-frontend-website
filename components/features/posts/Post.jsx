// import { useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { selectPostById } from "./postsApiSlice"
// import { selectUserById } from "../users/usersApiSlice"
// import { useGetUsersQuery } from "../users/usersApiSlice"

// const Post = ({ postId, searchQuery }) => {
//     const post = useSelector((state) => selectPostById(state, postId));

//     useGetUsersQuery();
//     const user = useSelector((state) => selectUserById(state, post?.author_id));
//     const author = (user) ? `${user.first_name} ${user.last_name}` : "Author Unknown";

//     const navigate = useNavigate();

//     if (post) {
//         if (searchQuery !== "") {
//             if (!post.title.toLowerCase().includes(searchQuery.toLowerCase())
//                 && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
//                 return null;
//             }
//         }

//         const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
//         const updated = new Date(post.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        
//         let truncatedContent;
//         if (post.content.length > 50) truncatedContent = post.content.substring(0, 50) + "...";
//         else truncatedContent = post.content;

//         const handleEdit = () => navigate(`/portal/posts/${postId}`);

//         return (
//             <tr>
//                 <td>{post.title}</td>
//                 <td>{truncatedContent}</td>
//                 <td>{author}</td>
//                 <td>{post.display ? "Yes" : "No"}</td>
//                 <td>{created}</td>
//                 <td>{updated}</td>
//                 <td>
//                     <button onClick={handleEdit}>Edit</button>
//                 </td>
//             </tr>
//         )
//     } else return null;
// }

// export default Post
