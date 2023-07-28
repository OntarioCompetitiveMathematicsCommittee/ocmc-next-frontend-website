import { store } from '@components/app/store';
import { postsApiSlice } from '@components/features/posts/postsApiSlice';
import { usersApiSlice } from '@components/features/users/usersApiSlice';
import { contestsApiSlice } from '@components/features/contests/contestsApiSlice';
import { useEffect } from 'react';
const Prefetch = ( { children } ) => {
    useEffect(() => {
        console.log('mounting...');
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
        const posts = store.dispatch(postsApiSlice.endpoints.getPosts.initiate());
        const contests = store.dispatch(contestsApiSlice.endpoints.getContests.initiate());

        return () => {
            console.log('unmounting...');
            users.unsubscribe();
            posts.unsubscribe();
            contests.unsubscribe();
        }
    }, []);

    return children;
}  

export default Prefetch;