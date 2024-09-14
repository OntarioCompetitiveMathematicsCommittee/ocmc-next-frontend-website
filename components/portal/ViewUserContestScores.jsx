"use client";

// importing required modules and components
import { useSelector } from "react-redux";
import { useGetUsersQuery, useUpdateUserContestScoresMutation, selectUserById } from "@components/features/users/usersApiSlice";
import { useGetContestsQuery } from "@components/features/contests/contestsApiSlice";
import useAuth from "@hooks/useAuth";
import ContestDisplay from "@components/features/contests/participants/ContestDisplay";

import TableHead from "@components/portal/TableHead";
import TableWrapper from "./TableWrapper";
import BackButton from "@components/elements/BackButton";

const ViewUserContestScores = ({ id }) => {
	const { isSuccess: isUserSuccess, isLoading: isUserLoading } = useGetUsersQuery(); // Fetch all users
	const { data: contests, isLoading: isContestLoading, isSuccess: isContestSuccess } = useGetContestsQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	}) 
	const [updateUserContests, { isSuccess: isUpdateSuccess} ] = useUpdateUserContestScoresMutation()
	const { isAdmin, isProctor } = useAuth();

	// get current user using id
	const currUser = useSelector((state) => selectUserById(state, id));

	const updateScore = (currScore, currContestId) => {
        updateUserContests({username: currUser.username, contest_id: currContestId, score: currScore, type: "update"})
    }

	// page loading
	if (isUserLoading || isContestLoading ) return <p>Loading...</p>;

	let contestId;

	if (isUserSuccess && isContestSuccess) {
		// display contest data for user
		return (
			<div className='relative flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				{isAdmin &&
					<BackButton path="/portal/users"/>}
				{isProctor &&
					<BackButton path="/portal/proctors/school-users"/>}
				<div className='text-center'>
					<h1 className={"portalh2 font-normal"}>Contest Scores</h1>
					<h2 className={"portalh2 text-brandBlue-900"}>{currUser.first_name} {currUser.last_name}</h2>
				</div>
				<div className='flex flex-col w-[90%] max-w-3xl gap-4'>
					{/** table to display list of registered participants under the proctor */}
					<table className='table-auto border-spacing-10'>
						<TableHead headings={["Contest", "Year", "Score"]}/>
						<tbody className='text-md'>
							{currUser.contest_data.length !== 0 &&
							currUser.contest_data.map((contest, index) => {
								contestId = contest.contest_id;
								return (
									<tr className="bg-white border-2" key={index}>
										<ContestDisplay id={contestId} score={contest.score} index maxScore={contests.entities[contestId].max_score} updateScore={updateScore} isAdmin={isAdmin}/>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	// data fetching was unsuccessful, display error message
	return <p>Something went wrong</p>;
}

export default ViewUserContestScores;
