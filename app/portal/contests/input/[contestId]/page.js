'use client';

// importing required modules and components
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import BackButton from '@components/elements/BackButton';

const EditContest = () => {
	const [csv, setCsv] = useState('');
	const [updates, setUpdates] = useState({});

	const handleCsvChange = (e) => {
		setCsv(e.target.value);
	};

	// get contestid from url
	const params = useParams();
	const id = params.contestId;

	useEffect(() => {
		if (csv === "") {
			return;
		}
		const csvArray = csv.split(',');
		let updateObj = {};
		for (let i = 0; i < Math.floor(csvArray.length / 2); i++) {
			updateObj = {};
			updateObj[csvArray[2 * i]] = csvArray[2 * i + 1];
			setUpdates({...updates, ...updateObj});
		}
		
	}, [csv]);
	
	useEffect(() => {
		console.log(updates);
	}, [updates]);
	

	// render if contest data is available
	const content = (
		<div className='flex flex-col items-center justify-center w-full h-full gap-8 pb-32'>
			<BackButton path="/portal/contests"/>
			<h1 className="portalh2">Edit Contest</h1>
			<form className='max-w-[90%] w-[60rem]'>
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="description">Description:</label>
					<textarea
						className="w-full h-64 border-2"
						id="description"
						name="description"
						value={csv}
						onChange={handleCsvChange}
					/>
				</div>
			</form>
		</div>
	)
	return content;
};

export default EditContest;
