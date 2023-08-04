"use client"

import Link from 'next/link'
import { useGetContestsQuery } from '@components/features/contests/contestsApiSlice'
import Contest from '@components/features/contests/Contest'
import { useState } from 'react'

import TableHead from '@components/TableHead'

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
			<div className='w-full h-full flex flex-col py-24 items-center gap-24 overflow-scroll'>
				<div className='text-center flex flex-col gap-2 items-center'>
					<h1 className={"text-5xl font-bold"}>Contest List</h1>
					<Link className='w-64 py-2 px-2 rounded-md bg-brandBlue-500 text-white flex justify-center' href="/portal/contests/new">
						<button>Create New Contest</button>
					</Link>
				</div>

				<div className='flex flex-col w-4/5 gap-4'>
					<input
						className="w-64 py-2 px-2 rounded-md border-2 "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Contests..."
					/>
				
					<table>
						<TableHead headings={["Name", "Year", "Description", "Max Score", "Signups Active", "# of Signups", "Edit"]}/>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
			</div>
		);
	}

	return content;
}

export default ContestsList
