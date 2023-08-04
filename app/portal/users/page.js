"use client"

import { useState } from 'react';
import { useGetUsersQuery } from '@components/features/users/usersApiSlice';
import User from '@components/features/users/User';

import Link from 'next/link';

import TableHead from '@components/TableHead';

const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [searchQuery, setSearchQuery] = useState('');

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error.error}</p>;

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.map(userId => <User key={userId} userId={userId} searchQuery={searchQuery} />);
  
    content = (
      <div className='w-full h-full flex flex-col py-24 items-center gap-24 overflow-scroll'>
				<div className='text-center flex flex-col gap-2 items-center'>
          <h1 className={"text-5xl font-bold"}>Users List</h1>
        </div>

        <div className='flex flex-col w-4/5 gap-4'>
					<input
						className="w-64 py-2 px-2 rounded-md border-2 "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Users..."
					/>
        
          <table>
            <TableHead headings={["Username", "First Name", "Last Name", "School", "Email", "Roles", "Edit", "Reset Password"]}/>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    )
  }

  return content;
};

export default UsersList;
