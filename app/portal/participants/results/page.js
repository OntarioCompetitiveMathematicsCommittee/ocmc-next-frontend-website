"use client";

// importing required modules and components
import { useSelector } from "react-redux";
import { useGetUsersQuery, selectUserById } from "@components/features/users/usersApiSlice";
import useAuth from "@components/hooks/useAuth";
import ContestDisplay from "@components/features/contests/participants/ContestDisplay";

const ViewSelfContestScores = () => {
	// get user id
	const { id } = useAuth();
	const { isSuccess, isLoading } = useGetUsersQuery(); // Fetch all users

	// get current user using id
	const currUser = useSelector((state) => selectUserById(state, id));

	// page loading
	if (isLoading) return <p>Loading...</p>;

	// user has no contest data, display this message
	if (currUser.contest_data.length === 0) return <p>No contests to display</p>;

	if (isSuccess) {
		// display contest data for user
		return currUser.contest_data.map((contest) => (
			<>
				<ContestDisplay id={contest.contest_id} score={contest.score} />
				<br />
				<br />
			</>
		));
	}

	// data fetching was unsuccessful, display error message
	return <p>Something went wrong</p>;
}

export default ViewSelfContestScores;
