"use client"

import Link from 'next/link'
import { useGetContestsQuery } from '@components/features/contests/contestsApiSlice'
import Contest from '@components/features/contests/Contest'
import { useState } from 'react'

const ContestsList = () => {
	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const [searchQuery, setSearchQuery] = useState("");


	let content;

	if (isLoading) content = <p>Loading...</p>;

	if (isError) content = <p>{error.error}</p>;

	if (isSuccess) {
		const { ids } = contests;

		const tableContent = ids?.length
			? ids.map((contestId) => <Contest key={contestId} contestId={contestId} searchQuery={searchQuery} />) : null;

		content = (
			<>
				<br />
				<h1>Contests List</h1>

				<Link href="/portal/contests/new"><button>Create New Contest</button></Link>
				<br/><br/>

				<input
					type="text"
					placeholder="Search Contests..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<br/><br/>
				
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Year</th>
							<th>Description</th>
							<th>Max Score</th>
							<th>Signups Active</th>
							<th>Number of Signups</th>
							<th>Contest Created</th>
							<th>Last Updated</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</>
		);
	}

	return content;
}

export default ContestsList
