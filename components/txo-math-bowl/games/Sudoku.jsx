'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SudokuGrid from '@/components/txo-math-bowl/Grid';
import { puzzles } from '@/config/txo-math-bowl/puzzles';

const Sudoku = () => {
	const [puzzleIndex, setPuzzleIndex] = useState(0);
	const [puzzle, setPuzzle] = useState(puzzles[0]);
	const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 min timer
	const [completionTimes, setCompletionTimes] = useState([]); // @manny this is the array of all completion times for tiebreaks and db business
	const [startTime, setStartTime] = useState(Date.now());
	const router = useRouter();

	useEffect(() => {
		//set puzzleIndex to puzzleIndex stored in db
	}, []);

	useEffect(() => {
		if (timeLeft <= 0) {
			router.push('/finished');
			return;
		} // auto kickout
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [timeLeft, router]);

	const handleSolve = () => {
		const endTime = Date.now();
		const timeTaken = Math.floor((endTime - startTime) / 1000);
		setCompletionTimes([...completionTimes, timeTaken]);
		setStartTime(Date.now()); // reset start time for the next puzzle
	};

	const handleNextPuzzle = () => {
		const nextIndex = puzzleIndex + 1;
		if (nextIndex < puzzles.length) {
			setPuzzleIndex(nextIndex);
			setPuzzle(puzzles[nextIndex]);
		} else {
			// no more puzzles
			router.push('/finished');
		}
	};

	useEffect(() => {
		setPuzzle(puzzles[puzzleIndex]);
		setStartTime(Date.now());
	}, [puzzleIndex]);

	return (
		<div className='flex-1 w-full h-full'>
			<SudokuGrid
				initialPuzzle={puzzle}
				onSolve={handleSolve}
				onNextPuzzle={handleNextPuzzle}
				completionTimes={completionTimes}
			/>
		</div>
	);
};

export default Sudoku;
