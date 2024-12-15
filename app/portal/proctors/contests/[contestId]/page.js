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

	// function to download participants data
	const handleDownloadParticipantsData = async (contest_id) => {
		// generate csv file
		let csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "Username,FirstName,LastName,Grade,Email,Score\n";
		users.forEach((user) => {
			const userScore = user.contest_data.find(item => item.contest_id === contest_id).score;
			csvContent += `${user.username},${user.first_name},${user.last_name},${user.grade},${user.email},${userScore}\n`;
		});
		// create download link
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `Participant Data ${contests.entities[contest_id].name}.csv`);
		document.body.appendChild(link);
		link.click();
	}

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
					<button
						className="w-64 px-2 py-2 text-white bg-brandBlue-500 rounded-md"
						onClick={() => handleDownloadParticipantsData(contest_id)}
					>
						Download Participant Data
					</button>
					{/** table to display list of registered participants under the proctor */}
					<input
						className="w-64 px-2 py-2 border-2 rounded-md "
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search Participants"
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