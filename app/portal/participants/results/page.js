"use client";

import { useSelector } from "react-redux";
import { useGetUsersQuery, selectUserById } from "@components/features/users/usersApiSlice";
import useAuth from "@components/hooks/useAuth";
import ContestDisplay from "@components/features/contests/participants/ContestDisplay";

const ViewSelfContestScores = () => {
	const { id } = useAuth();
	const { isSuccess, isLoading } = useGetUsersQuery(); // Fetch all users

	const currUser = useSelector((state) => selectUserById(state, id));

	if (isLoading) return <p>Loading...</p>;

	if (currUser.contest_data.length === 0) return <p>No contests to display</p>;

	if (isSuccess) {
		return currUser.contest_data.map((contest) => (
			<>
				<ContestDisplay id={contest.contest_id} score={contest.score} />
				<br />
				<br />
			</>
		));
	}

	return <p>Something went wrong</p>;
}

export default ViewSelfContestScores;
