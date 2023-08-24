"use client";

import useAuth from '@components/hooks/useAuth';
import ViewUserContestScores from '@components/ViewUserContestScores'

const ViewSelfContestScores = () => {
	// get user id
	const { id } = useAuth();
	return <ViewUserContestScores id={id}/>
}

export default ViewSelfContestScores;
