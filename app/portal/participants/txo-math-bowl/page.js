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
			startDate: '2024-07-03T20:40:00Z', // UTC time for 12:30 PM EST
			endDate: '2024-07-03T20:50:00Z', // UTC time for 12:35 PM EST
		},
		{
			component: <Sudoku key='sudoku' userId={id} />,
			startDate: '2024-07-02T20:30:00Z', // UTC time for 12:36 PM EST
			endDate: '2024-07-02T20:40:00Z', // UTC time for 12:41 PM EST
		},
		{
			component: <Math key='math' userId={id} />,
			startDate: '2024-07-02T16:42:00Z', // UTC time for 12:42 PM EST
			endDate: '2024-07-02T16:47:00Z', // UTC time for 12:47 PM EST
		},
		{
			component: <Trivia key='trivia' userId={id} />,
			startDate: '2024-07-02T16:48:00Z', // UTC time for 12:48 PM EST
			endDate: '2024-07-02T16:53:00Z', // UTC time for 12:53 PM EST
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
