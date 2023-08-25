"use client"

// import required modules and components
import Link from 'next/link'
import { useGetContestsQuery } from '@components/features/contests/contestsApiSlice'
import Contest from '@components/features/contests/Contest'
import { useState } from 'react'

import TableHead from '@components/portal/TableHead'

const ContestsList = () => {
	// fetch list of contests
	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	// state of search query input
	const [searchQuery, setSearchQuery] = useState("");


	let content;

	// page loading
	if (isLoading) content = <p>Loading...</p>;

	// display error message
	if (isError) content = <p>{error.error}</p>;

	// render list of contests
	if (isSuccess) {
		const { ids } = contests;

		// list of contests based on their ids
		const tableContent = ids?.length
			? ids.map((contestId) => <Contest key={contestId} contestId={contestId} searchQuery={searchQuery} />) : null;

		content = (
			<div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				<div className='flex flex-col items-center gap-2 text-center'>
					{/** title */}
					<h1 className="portalh2">Contest List</h1>
					{/** button is linked to new contest page */}
					<Link className='flex justify-center w-64 px-2 py-2 text-white rounded-md bg-brandBlue-500' href="/portal/contests/new">
						<button>Create New Contest</button>
					</Link>
				</div>

				<div className='flex flex-col w-4/5 gap-4'>
					{/** search input to filter contests */}
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Contests..."
					/>
				
					{/** table to display list of contests */}
					<table>
						<TableHead headings={["Name", "Year", "Description", "Max Score", "Active", "# of Signups", "Edit"]}/>
						<tbody className='text-md'>{tableContent}</tbody>
					</table>
				</div>
			</div>
		);
	}

	return content;
}

export default ContestsList
