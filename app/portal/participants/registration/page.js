"use client";

// import required modules and components
import { useGetContestsQuery } from "@components/features/contests/contestsApiSlice";
import ContestRegistrationForm from "@components/features/contests/participants/ContestRegistrationForm";
import useAuth from "@hooks/useAuth";

// display a list of contests available for registration
const ContestRegistrationList = () => {
	// get user id
	const { id, username } = useAuth();

	// get contests available for registration
	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, { refetchOnMountOrArgChange: true });

	let content;

	// page loading
	if (isLoading) content = <p>Loading...</p>;

	// display error if one occurs
	if (isError) content = <p>{error.error}</p>;

	if (isSuccess) {
		const { ids } = contests;
		// display a message if there are no contests available for registraction
		if (ids?.length === 0) return <p>No contests available for registration</p>;

		// otherwise render list of contest registration forms
		content = (
			<div className="flex flex-col items-center w-full gap-8 py-12">
				{ids.map((contestId) => (
					<ContestRegistrationForm key={contestId} userId={id} contestId={contestId} username={username}/>
				))}
			</div>
		);
	}

	return content;
}

export default ContestRegistrationList
