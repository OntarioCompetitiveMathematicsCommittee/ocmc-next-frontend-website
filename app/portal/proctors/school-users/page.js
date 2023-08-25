"use client"

// import required modules and components
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery, selectUserById } from '@components/features/users/usersApiSlice'
import ProctorUserDisplay from '@components/features/users/proctors/ProctorUserDisplay'
import useAuth from '@components/hooks/useAuth'

import TableHead from '@components/portal/TableHead'

const ProctorUsersList = () => {
	// fetch list of users/participants
	const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	// get proctor id and user data
	const proctor_id = useAuth().id;
	const proctor = useSelector((state) => selectUserById(state, proctor_id));

	// state of search query input
	const [searchQuery, setSearchQuery] = useState('')

	let content;

	// page loading
	if (isLoading) content = <p>Loading...</p>

	// display error
	if (isError) content = <p>{error.error}</p>

	// render list of participants
	if (isSuccess) {
		const { ids } = users;

		// list of participants based on their ids
		const tableContent = ids?.map(userId => <ProctorUserDisplay key={userId} userId={userId} school={proctor.school} searchQuery={searchQuery} />);
	
		content = (
			<div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				{/** title with proctor school name */}
				<div className='text-center'>
					<h1 className={"portalh2 font-normal"}>Registered Participants for</h1>
					<h2 className={"portalh2 text-brandBlue-900"}>{proctor.school}</h2>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					{/** search query input field */}
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Students..."
					/>
					{/** table to display list of registered participants under the proctor */}
					<table className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "Full Name", "Grade", "Email", "Password", "View"]}/>
						<tbody className='text-md'>{tableContent}</tbody>
					</table>
				</div>
			</div>
		);
	}

	return content;
}

export default ProctorUsersList
