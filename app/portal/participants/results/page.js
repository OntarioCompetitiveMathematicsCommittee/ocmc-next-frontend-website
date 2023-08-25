"use client";

import useAuth from '@hooks/useAuth';
import ViewUserContestScores from '@components/portal/ViewUserContestScores'

const ViewSelfContestScores = () => {
	// get user id
	const { id } = useAuth();
	return <ViewUserContestScores id={id}/>
}

export default ViewSelfContestScores;
