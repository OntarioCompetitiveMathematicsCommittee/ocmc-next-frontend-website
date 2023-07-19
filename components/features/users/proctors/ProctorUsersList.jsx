"use client"

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery, selectUserById } from '../usersApiSlice'
import ProctorUserDisplay from './ProctorUserDisplay'
import useAuth from '../../../hooks/useAuth'


const ProctorUsersList = () => {
	const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const proctor_id = useAuth().id;
	const proctor = useSelector((state) => selectUserById(state, proctor_id));

	const [searchQuery, setSearchQuery] = useState('')

	let content;

	if (isLoading) content = <p>Loading...</p>

	if (isError) content = <p>{error.error}</p>

	if (isSuccess) {
		const { ids } = users;

		const tableContent = ids?.map(userId => <ProctorUserDisplay key={userId} userId={userId} school={proctor.school} searchQuery={searchQuery} />);
	
		content = (
			<>
				<br />
				<h1>Registered Participants for {proctor.school}</h1> <br />
				<input
					type="text"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder="Search Students..."
				/>
				<br /><br />
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Reset Password</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</>
		);
	}

	return content;
}

export default ProctorUsersList
