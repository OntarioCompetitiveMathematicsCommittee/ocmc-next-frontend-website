// "use client"

// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useSendLogoutMutation } from '../features/auth/authApiSlice';
// import { useEffect } from 'react';
// import useAuth from '../hooks/useAuth';

// const PortalHeader = () => {
//   const { isAdmin, isExecutive, isProctor, isParticipant } = useAuth();

//   const navigate = useNavigate();

//   const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

//   useEffect(() => {
//     if (isSuccess) navigate('/');
//   }, [isSuccess, navigate]);

//   const handleLogout = () => {
//     sendLogout();
//     navigate('/');
//   }

//   if (isLoading) return <p>Logging Out...</p>

//   if (isError) return <p>Unable to Logout: {error.data?.message}</p>

//   const logoutButton = (
//     <button
//       className="logout"
//       onClick={handleLogout}
//     > Logout </button>
//   )

//   const header = (
//     <header>
//       <div>
//         <nav>
//           <ul>
//             <li> <Link to="/portal">Home</Link> </li>

//             {isAdmin && <li> <Link to="/portal/users">Users List</Link> </li>}

//             {(isAdmin || isExecutive) && <li> <Link to="/portal/posts">Posts List</Link> </li>}
//             {(isAdmin || isExecutive) && <li> <Link to="/portal/contests">Contests List</Link> </li>}

//             {isParticipant && <li> <Link to="/portal/participants/results">View Scores</Link> </li>}
//             {isParticipant && <li> <Link to="/portal/participants/registration">Contest Registration</Link> </li>}

//             {isProctor && <li> <Link to="/portal/proctors/todos">Proctor Todos</Link> </li>}
//             {isProctor && <li> <Link to="/portal/proctors/schoolUsers">Your Schools Participant List</Link> </li>}

//             <li> <Link to="/portal/edit-self">Edit Account</Link> </li>

//             <li> {logoutButton} </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   )

//   return header;
// }

// export default PortalHeader
