"use client"

import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useGetUsersByContestQuery, selectUserById } from '@components/features/users/usersApiSlice'
import { useGetContestsQuery } from "@components/features/contests/contestsApiSlice";
import useAuth from '@hooks/useAuth'

import TableHead from '@components/portal/TableHead'
import TableWrapper from '@components/portal/TableWrapper'
import BackButton from '@components/elements/BackButton'

import ViewContestUserScores from '@components/portal/ViewContestUserScores'

const Contests = () => {
	const [searchQuery, setSearchQuery] = useState('');

    const params = useParams();
    const contest_id = params.contestId;
    const proctor_id = useAuth().id;
	const proctor = useSelector((state) => selectUserById(state, proctor_id));

    // get list of users registered under the proctor taking this contest
    const {data:users, isLoading, isSuccess, isError, error} = useGetUsersByContestQuery({contest_id, school: proctor?.school}, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    // get contest all info
    const { data: contests, isLoading: isContestLoading, isSuccess: isContestSuccess, isError: isContestError } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	}) 

    let content;

	// display error
	if (isError || isContestError) content = <p>{error.error}</p>

	// render list of contest participants
	if (isSuccess && isContestSuccess) {
		content = (
			<div className='relative flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
                <BackButton path={"/portal/proctors/contests"}/>
				<div className='text-center'>
					<h1 className={"portalh2 font-normal"}>{contests.entities[contest_id].name} Score</h1>
                    <h2 className={"portalh2 text-brandBlue-900"}>{proctor?.school}</h2>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					{/** table to display list of registered participants under the proctor */}
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Contests..."
					/>
					<TableWrapper className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "Full Name", "Grade", "Email", "Score"]}/>
						<tbody className='text-xl'>
                            {
                            users?.map((user, index) =>(
                                <ViewContestUserScores key={index} user={user} index={index} contest_id={contest_id} maxScore={contests.entities[contest_id].max_score} searchQuery={searchQuery}/>
                            ))}
                        </tbody>
					</TableWrapper>
				</div>
			</div>
		);
    }
    return content;
}

export default Contests