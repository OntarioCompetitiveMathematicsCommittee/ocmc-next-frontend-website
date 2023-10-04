"use client"

// import required modules/components
import { useState } from 'react';
import { useGetUsersQuery } from '@components/features/users/usersApiSlice';
import User from '@components/features/users/User';

import TableHead from '@components/portal/TableHead';
import TableWrapper from '@components/portal/TableWrapper';

const UsersList = () => {
   // fetch list of users
   const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(undefined, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   // search query state
   const [searchQuery, setSearchQuery] = useState('');


   let content;

   // page loading
   if (isLoading) content = <p>Loading...</p>;

   // display error
   if (isError) content = <p>{error.error}</p>;

  // render list of users
   if (isSuccess) {
      const { ids } = users;

      // list of users based on their ids
      const tableContent = ids?.map(userId => <User key={userId} userId={userId} searchQuery={searchQuery} />);
  
      content = (
         <div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-auto'>
            <div className='flex flex-col items-center gap-2 text-center'>
               {/** title */}
               <h1 className="portalh2">Users List</h1>
            </div>

            <div className='flex flex-col w-4/5 gap-4'>
               {/** search query input field */}
                  <div>
                     <input
                        className="w-64 px-2 py-2 border-2 rounded-md "
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search Users..."
                     />
                     {console.log(tableContent)}
                  </div>
                     
            
               {/** table ot display list of users */}
               <TableWrapper>
                  <TableHead headings={["Username", "Full Name", "School", "Email", "Roles", "Edit", "Password", "View"]}/>
                  <tbody className='text-md'>{tableContent}</tbody>
               </TableWrapper>
            </div>
         </div>
      )
   }

   return content;
};

export default UsersList;
