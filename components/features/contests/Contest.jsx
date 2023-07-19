// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectContestById } from "./contestsApiSlice";

// const Contest = ({ contestId, searchQuery }) => {
//     const contest = useSelector((state) => selectContestById(state, contestId));

//     const navigate = useNavigate();

//     if (contest) {
//         if (searchQuery !== "") {
//             if (!contest.name.toLowerCase().includes(searchQuery.toLowerCase())
//                 && !contest.description.toLowerCase().includes(searchQuery.toLowerCase())) {
//                 return null;
//             }
//         }

//         const created = new Date(contest.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
//         const updated = new Date(contest.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

//         const handleEdit = () => navigate(`/portal/contests/${contestId}`);

//         return (
//             <tr>
//                 <td>{contest.name}</td>
//                 <td>{contest.year}</td>
//                 <td>{contest.description}</td>
//                 <td>{contest.max_score}</td>
//                 <td>{contest.signups_active ? "Yes" : "No"}</td>
//                 <td>{contest.signup_ids.length}</td>
//                 <td>{created}</td>
//                 <td>{updated}</td>
//                 <td>
//                     <button onClick={handleEdit}>Edit</button>
//                 </td>
//             </tr>
//         )
//     } else return null;
// }

// export default Contest
