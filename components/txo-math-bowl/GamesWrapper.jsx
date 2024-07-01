'use client';
import { useEffect, useRef, useState } from 'react';

const GamesWrapper = ({ game, startDate, endDate, maxTimePerQuestion }) => {
	const startDateObject = useRef(new Date(startDate));
	const endDateObject = useRef(new Date(endDate));
	let [currentDate, setCurrentDate] = useState(null);

	const getTimeDifference = (startDate, endDate) => {
		// Calculate the difference in milliseconds
		let diff = endDate - startDate;

		// Convert milliseconds to total seconds
		let totalSeconds = Math.floor(diff / 1000);

		// Calculate minutes and remaining seconds
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;

		// Format the time as "MM:SS"
		let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		if (formattedTime < '0:00') {
			return 'Times up';
		}
		return formattedTime;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='w-full h-full flex flex-col gap-8 flex-1'>
			<h1 className='text-center text-3xl'>
				{getTimeDifference(currentDate, endDateObject.current)}
			</h1>
			{startDateObject.current < currentDate &&
				currentDate < endDateObject.current &&
				game}
		</div>
	);
};

export default GamesWrapper;
