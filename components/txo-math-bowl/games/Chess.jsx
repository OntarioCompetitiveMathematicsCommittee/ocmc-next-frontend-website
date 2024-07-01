'use client';

import { ChessPuzzle } from '@react-chess-tools/react-chess-puzzle';
import { useEffect, useState } from 'react';

import {
	useUpdateTxoMutation,
	useGetTxoByUserIdQuery,
} from '@components/features/txo/txoApiSlice';

import { boards } from '@/config/txo-math-bowl/boards';

export default function Chess({ userId }) {
	const [puzzleIndex, setPuzzleIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [reload, setReload] = useState(false);

	const {data: txoData} = useGetTxoByUserIdQuery(userId);
	
	const [updateTxo, { isLoading, isSuccess, isError, error }] =
		useUpdateTxoMutation();

	useEffect(() => {
		if (txoData?.entities){
			setPuzzleIndex(Object.values(txoData?.entities)[0].chess_index);
			setScore(Object.values(txoData?.entities)[0].chess_score);
		}
	}, [txoData]);

	useEffect(() => {
		setReload(true);
		setTimeout(() => {
			setReload(false);
		}, 100);
	}, [puzzleIndex]);

	const onFail = () => {
		setReload(true);
		setTimeout(() => {
			setReload(false);
		}, 100);
	};
	const onSolveSubmit = () => {
		setTimeout(() => {
			updateTxo({
				user_id: userId,
				chess_score: score + 1,
				chess_index: puzzleIndex + 1,
			});
			setPuzzleIndex((prevIndex) => prevIndex + 1);
			setScore((prevScore) => prevScore + 1);
			setReload(true);
			setTimeout(() => {
				setReload(false);
			}, 100);
		}, 200);
	};
	if (puzzleIndex === boards.length - 1) {
		return (
			<section className='w-full h-full flex justify-center items-center overflow-hidden flex-col'>
				<h1 className='text-4xl'>No more puzzles</h1>
			</section>
		);
	}

	return (
		<section className='w-full h-full flex justify-center items-center overflow-hidden flex-col'>
			<div className='lg:h-3/4 lg:w-auto w-3/4 h-auto aspect-square'>
				{!reload && (
					<ChessPuzzle.Root
						puzzle={boards[puzzleIndex]}
						onSolve={onSolveSubmit}>
						<ChessPuzzle.Board />
						<ChessPuzzle.Reset
							showOn={['failed']}
							asChild={true}
							onReset={onFail}>
							<button className='bg-red-600 rounded-md text-white px-4 py-2'>
								RESET
							</button>
						</ChessPuzzle.Reset>
					</ChessPuzzle.Root>
				)}
			</div>
		</section>
	);
}
