'use client';

import React, { useState } from 'react';

import Chess from '@/components/txo-math-bowl/games/Chess';
import Sudoku from '@/components/txo-math-bowl/games/Sudoku';
import Math from '@/components/txo-math-bowl/games/Math';
import Trivia from '@/components/txo-math-bowl/games/Trivia';

import GamesWrapper from '@/components/txo-math-bowl/GamesWrapper';

import useAuth from '@hooks/useAuth';
import { useSelector } from 'react-redux';
import {
	useGetUsersQuery,
	selectUserById,
} from '@components/features/users/usersApiSlice';

const TxOMathBowl = () => {
	const { id } = useAuth();
	const { isSuccess, isLoading } = useGetUsersQuery(); // Fetch all users
	const currUser = useSelector((state) => selectUserById(state, id));


	
	const games = [
		{
			component: <Chess key='chess' userId={id} />,
			startDate: '2024-07-02T20:35',
			endDate: '2024-07-02T20:40',
		},
		{
			component: <Sudoku key='sudoku' userId={id} />,
			startDate: '2024-07-02T20:20',
			endDate: '2024-07-02T20:25',
		},
		{
			component: <Math key='math' userId={id} />,
			startDate: '2024-07-02T20:45',
			endDate: '2024-07-02T20:50',
		},
		{
			component: <Trivia key='trivia' userId={id} />,
			startDate: '2024-07-02T20:55',
			endDate: '2024-07-02T21:00',
		},
	];

	const registered = currUser?.contest_data.find(
		(contest) => contest.contest_id === '667fc6df604552c5babfb7fb'
	);

	if (isLoading) return <p>Loading...</p>;

	if (isSuccess && registered) {
		return (
			<section className='flex flex-col items-center justify-start flex-1 w-full h-full'>
				{games.map((game, index) => (
					<GamesWrapper
						key={index}
						game={game.component}
						startDate={game.startDate}
						endDate={game.endDate}
						maxTimePerQuestion={game.maxTimePerQuestion}
					/>
				))}
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
