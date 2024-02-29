"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation'

import { useGetUsersByContestQuery, useUpdateUserContestScoresMutation } from '@components/features/users/usersApiSlice'
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

    const [updateUserContests ] = useUpdateUserContestScoresMutation()
	const { isAdmin, isExecutive } = useAuth();

	const [searchQuery, setSearchQuery] = useState("");

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
					
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Participants..."
					/>

					{(isAdmin || isExecutive) ? 
					<button
						className="w-64 px-2 py-2 border-2 rounded-md bg-blue-500 text-white"
						onClick={() => {
							const csv = users.map(user => {
								return {
									username: user.username,
									full_name: user.first_name + " " + user.last_name,
									school: user.school,
									grade: user.grade,
									email: user.email,
									score: user.contest_data.find(item => item.contest_id === contest_id).score
								}
							})
							const header = Object.keys(csv[0]).join(",");
							const body = csv.map(row => Object.values(row).join(",")).join("\n");
							const csvString = `${header}\n${body}`;
							const blob = new Blob([csvString], { type: "text/csv" });
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.href = url;
							a.download = `${contests.entities[contest_id].name} Participants.csv`;
							a.click();
						}}
					>
						Download Participant Data
					</button> : null}

					<TableWrapper className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "Full Name", "School", "Grade", "Email", "Score"]}/>
						<tbody className='text-xl'>
                            {
                            users?.map((user, index) => {
                                return <ViewContestUserScores 
									key={index} 
									user={user} 
									index={index} 
									contest_id={contest_id} 
									maxScore={contests.entities[contest_id].max_score} 
									updateScore={updateScore} 
									isAdmin={isAdmin} isExecutive={isExecutive}
									searchQuery={searchQuery}/>;
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