"use client"

import { useState } from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

import TableHead from '@components/portal/TableHead';

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
      <>
        <br />
        <h1>Users List</h1> <br />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Users..."
        />
        <br /><br />
        <table>
          <TableHead headings={["Username", "Full Name", "School", "Email", "Roles", "Edit", "Password", "View"]}/>
          <tbody className='text-md'>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
};

export default UsersList;
