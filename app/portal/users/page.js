"use client"

// import required modules/components
import { useState } from 'react';
import Papa from 'papaparse';
import { useGetUsersQuery } from '@components/features/users/usersApiSlice';
import { useUpdateUserMutation } from '@components/features/users/usersApiSlice';
import { SCHOOLS, SCHOOL_NUMBER, SCHOOL_REGION_LETTER } from '@config/schools';
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

   const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateUserMutation();

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
            {  
            /*
               <button onClick={async () => {
               
                  const schoolNumTracker = new Map();
                  SCHOOLS.forEach(schoolName => {
                     schoolNumTracker.set(schoolName, 1);
                  });

                  ids.map(async userId => {
                     // get user
                     const user = users.entities[userId];

                     let code;
                     if (user.roles.includes('Participant')) {
                        let curr_code_num = schoolNumTracker.get(user.school);
                        schoolNumTracker.set(user.school, curr_code_num + 1);
                        let code_num_str = curr_code_num.toString();
                        if(code_num_str.length === 3) code_num_str = code_num_str;
                        else if(code_num_str.length === 2) code_num_str = '0' + code_num_str;
                        else if(code_num_str.length === 1) code_num_str = '00' + code_num_str;

                        // get user's code
                        code = SCHOOL_REGION_LETTER[user.school] + '-' + SCHOOL_NUMBER[user.school] + '-' + code_num_str;
                     } else {
                        code = 'N/A';
                     }

                     // update user's code
                     const result = await updateUser({
                           id: userId,
                           username: user.username,
                           roles: user.roles,
                           first_name: user.first_name,
                           last_name: user.last_name,
                           code: code, 
                           school: user.school,
                           email: user.email,
                           grade: user.grade,
                     });
                     
                     console.log(result);
                  })
            }}>Set All Codes</button>*/}

            <div className='flex flex-col items-center gap-2 text-center'>
               {/** title */}
               <h1 className="portalh2">Users List</h1>
            </div>

            <div className='flex flex-col w-4/5 gap-4'>
               <div className='flex flex-row justify-between'>
                  {
                     // button to download all participant data as a CSV file
                     <button className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600' 
                        
                     onClick={async () => {
                        const userData = [['Username', 'First Name', 'Last Name', 'Code', 'School', 'Email', 'Grade']];
                        userData.push(...ids.map(userId => {
                           const user = users.entities[userId];
                           return [user.username, user.first_name, user.last_name, user.code, user.school, user.email, user.grade];
                        }));
                        
                        const csv = Papa.unparse(userData);
                        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'user_data.csv');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                     }}>Download All Participant Data</button>
                  }
                  </div>
                  
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
