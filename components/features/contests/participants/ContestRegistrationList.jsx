import { useGetContestsQuery } from "../contestsApiSlice"
import ContestRegistrationForm from "./ContestRegistrationForm"
import useAuth from "../../../hooks/useAuth"

const ContestRegistrationList = () => {
	const { id } = useAuth()

	const { data: contests, isLoading, isSuccess, isError, error } = useGetContestsQuery(undefined, { refetchOnMountOrArgChange: true });

	let content;

	if (isLoading) content = <p>Loading...</p>;

	if (isError) content = <p>{error.error}</p>;

	if (isSuccess) {
		const { ids } = contests;
		if (ids?.length === 0) return <p>No contests available for registration</p>;

		const signupContent = ids.map((contestId) => (
			<ContestRegistrationForm key={contestId} userId={id} contestId={contestId} />
		));

		content = (
			<>
				<h1>Contests Registration</h1>
				<br />
				{ signupContent }
			</>
		);
	}

	return content;
}

export default ContestRegistrationList
