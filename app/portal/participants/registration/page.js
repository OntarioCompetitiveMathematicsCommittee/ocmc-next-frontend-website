"use client";

import { useGetContestsQuery } from "@components/features/contests/contestsApiSlice";
import ContestRegistrationForm from "@components/features/contests/participants/ContestRegistrationForm";
import useAuth from "@components/hooks/useAuth";

const ContestRegistrationList = () => {
	const { id } = useAuth();

	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, { refetchOnMountOrArgChange: true });

	let content;

	if (isLoading) content = <p>Loading...</p>;

	if (isError) content = <p>{error.error}</p>;

	if (isSuccess) {
		const { ids } = contests;
		if (ids?.length === 0) return <p>No contests available for registration</p>;

		content = (
			<>
				<h1>Contests Registration</h1>
				<div className="flex flex-col items-center w-full gap-8">
					{ids.map((contestId) => (
						<ContestRegistrationForm key={contestId} userId={id} contestId={contestId} />
					))}
				</div>
			</>
		);
	}

	return content;
}

export default ContestRegistrationList
