"use client"

import { useParams } from 'next/navigation'

import { useGetUsersByContestQuery, useUpdateUserContestsMutation } from '@components/features/users/usersApiSlice'
import { useGetContestsQuery } from "@components/features/contests/contestsApiSlice";


import useAuth from '@hooks/useAuth'

import TableHead from '@components/portal/TableHead'
import TableWrapper from '@components/portal/TableWrapper'
import BackButton from '@components/elements/BackButton'

import ViewContestUserScores from '@components/portal/ViewContestUserScores';

const Contests = () => {
    const params = useParams();
    const contest_id = params.contestId;
    
    const {data:users, isLoading, isSuccess, isError, error} = useGetUsersByContestQuery({contest_id, school: "all"}, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const { data: contests, isLoading: isContestLoading, isSuccess: isContestSuccess } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	}) 
    console.log(contests)

    const [updateUserContests ] = useUpdateUserContestsMutation()
	const { isAdmin } = useAuth();

    const updateScore = (currScore, currContestId, username) => {
        updateUserContests({username, contest_id: currContestId, score: currScore, type: "update"})
    }

    let content;

	// display error
	if (isError) content = <p>{error.error}</p>

	// render list of contest participants
	if (isSuccess && isContestSuccess) {
		content = (
			<div className='relative flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
                <BackButton path={"/portal/contests"}/>
				<div className='text-center'>
					<h1 className={"portalh2 font-normal"}>{contests.entities[contest_id].name} Scores</h1>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					{/** table to display list of registered participants under the proctor */}
					<TableWrapper className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "Full Name", "School", "Grade", "Email", "Score"]}/>
						<tbody className='text-xl'>
                            {
                            users?.map((user, index) => {
                                return <ViewContestUserScores key={index} user={user} index={index} contest_id={contest_id} maxScore={contests.entities[contest_id].max_score} updateScore={updateScore} isAdmin={isAdmin}/>;
                            })}
                        </tbody>
					</TableWrapper>
				</div>
			</div>
		);
    }
    return content;
}

export default Contests