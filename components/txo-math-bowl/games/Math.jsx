'use client';
import React, { useState, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { problems } from '@/config/txo-math-bowl/math';

import {
	useUpdateTxoMutation,
	useGetTxoByUserIdQuery,
} from '@components/features/txo/txoApiSlice';


const Home = ({ userId }) => {
	const [puzzleIndex, setPuzzleIndex] = useState(0);
	const [score, setScore] = useState(0);

	const {data: txoData} = useGetTxoByUserIdQuery(userId);
	
	const [updateTxo, { isLoading, isSuccess, isError, error }] =
		useUpdateTxoMutation();

	useEffect(() => {
		if (txoData?.entities){
			setPuzzleIndex(Object.values(txoData?.entities)[0].math_index);
			setScore(Object.values(txoData?.entities)[0].math_score);
		}
	}, [txoData]);

	const handleNext = () => {
		updateTxo({
			user_id: userId,
			math_score: score + 1,
			math_index: puzzleIndex + 1,
		});
		setPuzzleIndex((prevIndex) => prevIndex + 1);
		setScore((prevScore) => prevScore + 1);
	};

	const currentProblem = problems[puzzleIndex];

	return (
		<div className='flex items-center justify-center flex-1 w-full h-full'>
			{currentProblem ? (
				<Math problem={currentProblem} onNext={handleNext} />
			) : (
				<p>Congratulations! You have completed all the problems.</p>
			)}
		</div>
	);
};

export default Home;

const Math = ({ problem, onNext }) => {
	const [input, setInput] = useState('');
	const [correct, setCorrect] = useState(false);
	const [answerSubmitted, setAnswerSubmitted] = useState(false);

	useEffect(() => {
		setInput('');
		setCorrect(false);
		setAnswerSubmitted(false);
	}, [problem]);

	const formatFactors = (factors) => {
		return factors.replace(/\s+/g, '').split('*').sort().join('*');
	};

	const sortTerms = (expression) => {
		const terms = expression.replace(/\s+/g, '').match(/\([^)]*\)/g);
		return terms ? terms.sort().join('') : expression;
	};

	const checkAnswer = () => {
		const userFactors = sortTerms(input);
		const correctFactors = sortTerms(problem.factors);
		const isCorrect = userFactors === correctFactors;
		setCorrect(isCorrect);
		setAnswerSubmitted(true);
	};

	const inputBorderStyle = answerSubmitted
		? correct
			? 'border-green-500'
			: 'border-red-500'
		: 'border-gray-300';

	return (
		<div className='flex flex-col items-center justify-center text-center'>
			<h1 className='mb-5 text-4xl'>
				Factorization of{' '}
				<span className='font-normal'>
					<BlockMath math={`{${problem.expression}}`} />
				</span>
			</h1>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Enter factors in the format (x^2+3)(x^2-5)'
				className={`text-black text-lg p-2 w-full max-w-md mb-4 border rounded font-sans ${inputBorderStyle}`}
			/>
			<div className='flex space-x-4'>
				<button
					onClick={checkAnswer}
					className='px-6 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-700'>
					Check Answer
				</button>
				<button
					onClick={onNext}
					disabled={!correct}
					className={`text-lg px-6 py-2 rounded ${
						correct
							? 'bg-green-500 hover:bg-green-700 text-white'
							: 'bg-gray-400 text-gray-700 cursor-not-allowed'
					}`}>
					Next Puzzle
				</button>
			</div>
		</div>
	);
};
