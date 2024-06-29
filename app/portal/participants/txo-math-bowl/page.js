'use client';

import React, { useState } from 'react';

import Chess from '@/components/txo-math-bowl/games/Chess';
import Sudoku from '@/components/txo-math-bowl/games/Sudoku';
import Math from '@/components/txo-math-bowl/games/Math';
import Trivia from '@/components/txo-math-bowl/games/Trivia';

import GamesWrapper from '@/components/txo-math-bowl/GamesWrapper';

import useAuth from '@hooks/useAuth';
import { useSelector } from "react-redux"
import { useGetUsersQuery, selectUserById } from "@components/features/users/usersApiSlice"

const TxOMathBowl = () => {
	const { id } = useAuth();
	const { isSuccess, isLoading } = useGetUsersQuery(); // Fetch all users
	const currUser = useSelector((state) => selectUserById(state, id));

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

	const registered = currUser.contest_data.find((contest) => contest.contest_id === '667fc6df604552c5babfb7fb');

	if (isLoading) return <p>Loading...</p>;

	if (isSuccess && registered) {
		return (
			<section className='flex flex-col items-center justify-center flex-1 w-full h-full'>
				{/* remove this button on final prouct */}
				<button
					className='px-4 py-2 text-white bg-green-500'
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
	}

	return (
		<section className='flex flex-col items-center justify-center flex-1 w-full h-full'>
			<p>You are not registered for this contest</p>
		</section>
	);
};

export default TxOMathBowl;
