"use client"

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery, selectUserById } from '@components/features/users/usersApiSlice'
import ProctorUserDisplay from '@components/features/users/proctors/ProctorUserDisplay'
import useAuth from '@components/hooks/useAuth'

import TableHead from '@components/TableHead'

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
			<div className='w-full h-full flex flex-col py-24 items-center gap-24 overflow-scroll'>
				<div className='text-center'>
					<h1 className={"text-5xl"}>Registered Participants for</h1>
					<h2 className={"text-5xl font-bold text-brandBlue-900"}>{proctor.school}</h2>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					<input
						className="w-64 py-2 px-2 rounded-md border-2 "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Students..."
					/>
					<table className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "First Name", "Last Name", "Email", "Reset Password"]}/>
						<tbody className='text-xl'>{tableContent}</tbody>
					</table>
				</div>
			</div>
		);
	}

	return content;
}

export default ProctorUsersList
