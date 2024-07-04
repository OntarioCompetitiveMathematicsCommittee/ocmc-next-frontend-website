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
		// {
		// 	component: <Chess key='chess' userId={id} />,
		// 	startDate: '2024-07-03T20:50:00Z',
		// 	endDate: '2024-07-03T21:00:00Z',
		// },
		// {
		// 	component: <Sudoku key='sudoku' userId={id} />,
		// 	startDate: '2024-07-04T00:05:00Z',
		// 	endDate: '2024-07-04T00:30:00Z',
		// },
		// {
		// 	component: <Math key='math' userId={id} />,
		// 	startDate: '2024-07-04T18:15:00Z',
		// 	endDate: '2024-07-04T18:20:00Z',
		// },
		{
			component: <Trivia key='trivia' userId={id} />,
			startDate: '2024-07-04T21:05:00Z',
			endDate: '2024-07-04T21:10:00Z',
		},
	];

	if (isLoading) return <p>Loading...</p>;

	const registered = currUser?.contest_data.find(
		(contest) => contest.contest_id === '667fc6df604552c5babfb7fb'
	);

	if (isSuccess && registered) {
		return (
			<section className='flex flex-col items-center justify-center flex-1 w-full h-full'>
				{games.map((gameObj, index) => (
					<GamesWrapper
						key={index}
						game={gameObj.component}
						startDate={gameObj.startDate}
						endDate={gameObj.endDate}
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
