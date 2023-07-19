"use client"

import { useState } from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

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
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>School</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Edit</th>
              <th>Reset Password</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
};

export default UsersList;
