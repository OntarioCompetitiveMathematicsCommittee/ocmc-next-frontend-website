"use client"

// import required modules and components
import { useGetContestsQuery } from '@components/features/contests/contestsApiSlice'
import ViewContest from '@components/features/contests/ViewContest'
import { useState } from 'react'

import TableHead from '@components/TableHead'

const ContestsList = () => {

	// fetch list of contests
	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

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
			? ids.map((contestId) => <ViewContest key={contestId} contestId={contestId} />) : null;

		content = (
			<div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				<div className='flex flex-col items-center gap-2 text-center'>
					{/** title */}
					<h1 className="portalh2">Contest List</h1>
				</div>

				<div className='flex flex-col w-4/5 gap-4'>
					{/** table to display list of contests */}
					<table>
						<TableHead headings={["Name", "Year", "Description", "Max Score", "Signups Active", "# of Signups", "View"]}/>
						<tbody className='text-md'>{tableContent}</tbody>
					</table>
				</div>
			</div>
		);
	}

	return content;
}

export default ContestsList
