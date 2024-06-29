'use client';

import React, { useState } from 'react';

import Chess from '@/components/txo-math-bowl/games/Chess';
import Sudoku from '@/components/txo-math-bowl/games/Sudoku';
import Math from '@/components/txo-math-bowl/games/Math';
import Trivia from '@/components/txo-math-bowl/games/Trivia';

import GamesWrapper from '@/components/txo-math-bowl/GamesWrapper';

const TxOMathBowl = () => {
	const [game, setGame] = useState(0);

	const games = [
		{
			component: <Chess key='chess' maxTimePerQuestion={30000} />,
			startDate: '2024-06-26T17:00', //change the start time to the contest start time
			endDate: '2024-06-29T23:40', //change endtime
		},
		{
			component: <Sudoku key='sudoku' maxTimePerQuestion={30000} />,
			startDate: '2024-06-26T17:00', //change the start time to the contest start time
			endDate: '2024-06-29T17:40', //change endtime
		},
		{
			component: <Math key='math' maxTimePerQuestion={30000} />,
			startDate: '2024-06-26T17:00', //change the start time to the contest start time
			endDate: '2024-06-29T17:40', //change endtime
		},
		{
			component: <Trivia key='trivia' maxTimePerQuestion={30000} />,
			startDate: '2024-06-26T17:00', //change the start time to the contest start time
			endDate: '2024-06-29T17:40', //change endtime
		},
	];

	const changeGame = () => {
		setGame((prevGame) => (prevGame + 1) % games.length);
	};

	return (
		<section className='w-full flex-1 h-full flex flex-col justify-center items-center'>
			{/* remove this button on final prouct */}
			<button
				className='px-4 py-2 bg-green-500 text-white'
				onClick={changeGame}>
				Change Game
			</button>
			{/* just duplicate GamesWrapper 4 times with hardcoded indices because the times for each game will not overlap anyways */}
			<GamesWrapper
				game={games[game].component}
				startDate={games[game].startDate}
				endDate={games[game].endDate}
				maxTimePerQuestion={games[game].maxTimePerQuestion}
			/>
		</section>
	);
};

export default TxOMathBowl;
