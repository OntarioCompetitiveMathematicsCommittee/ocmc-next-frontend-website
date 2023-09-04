'use client';

// importing required modules and components
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
		<>
			<p className='portalh2'>Contest Not Found</p>
			<Link href="/portal/contests" className='text-xl text-blue-600 underline'>Return to Contests &rarr;</Link>
		</>
	);
	return (
		<div className='flex flex-col items-center justify-center w-full h-full gap-2 px-4 text-center'>
			{content}
		</div>
	);
};

export default EditContest;
