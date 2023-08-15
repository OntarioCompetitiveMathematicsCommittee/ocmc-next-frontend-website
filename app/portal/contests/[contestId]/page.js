'use client';

// importing required modules and components
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectContestById } from '@components/features/contests/contestsApiSlice';
import EditContestForm from '@components/features/contests/EditContestForm';

const EditContest = () => {
	// get contestid from url
	const params = useParams();
	const id = params.contestId;

	// select contest from state using id
	const contest = useSelector((state) => selectContestById(state, id));

	// render if contest data is available
	const content = contest ? (
		<EditContestForm contest={contest} id={id} />
	) : (
		<p>Loading...</p>
	);
	return content;
};

export default EditContest;
