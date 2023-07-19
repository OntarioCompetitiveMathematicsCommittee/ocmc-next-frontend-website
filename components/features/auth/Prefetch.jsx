// "use client"

// import { store } from '../../app/store';
// import { postsApiSlice } from '../posts/postsApiSlice';
// import { usersApiSlice } from '../users/usersApiSlice';
// import { contestsApiSlice } from '../contests/contestsApiSlice';
// import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';

// const Prefetch = () => {
//     useEffect(() => {
//         console.log('mounting...');
//         const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
//         const posts = store.dispatch(postsApiSlice.endpoints.getPosts.initiate());
//         const contests = store.dispatch(contestsApiSlice.endpoints.getContests.initiate());

//         return () => {
//             console.log('unmounting...');
//             users.unsubscribe();
//             posts.unsubscribe();
//             contests.unsubscribe();
//         }
//     }, []);

//     return <Outlet />;
// }  

// export default Prefetch;