'use client';
import { useEffect, useRef, useState } from 'react';

const GamesWrapper = ({ game, startDate, endDate }) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const getTimeDifference = (startDate, endDate) => {
		const diff = endDate - startDate;
		const totalSeconds = Math.floor(diff / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const startDateObject = new Date(startDate);
	const endDateObject = new Date(endDate);

	const isWithinTimeFrame = startDateObject <= currentDate && currentDate <= endDateObject;

	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<h1 className='text-3xl text-center'>
				{getTimeDifference(currentDate, endDateObject)}
			</h1>
			{isWithinTimeFrame && game}
		</div>
	);
};

export default GamesWrapper;
