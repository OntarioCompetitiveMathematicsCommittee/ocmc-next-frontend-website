'use client';
import { useEffect, useRef, useState } from 'react';

const GamesWrapper = ({ game, startDate, endDate, maxTimePerQuestion }) => {
	const startDateObject = useRef(new Date(startDate));
	const endDateObject = useRef(new Date(endDate));
	const [currentDate, setCurrentDate] = useState(new Date());

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

	const isWithinTimeFrame = currentDate >= startDateObject.current && currentDate <= endDateObject.current;

	return (
		<div className='flex flex-col items-center justify-start w-full gap-8'>
			{isWithinTimeFrame ? (
				<>
					<h1 className='text-3xl text-center'>
						{getTimeDifference(currentDate, endDateObject.current)}
					</h1>
					{game}
				</>
			) : null}
		</div>
	);
};

export default GamesWrapper;
