import { useState, useEffect } from 'react';
import { questionsArray } from '@/config/txo-math-bowl/trivia';

import {
	useUpdateTxoMutation
} from '@components/features/txo/txoApiSlice';

const Trivia = ({ userId }) => {
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [feedback, setFeedback] = useState('');
	const [showFeedback, setShowFeedback] = useState(false);
	const [timer, setTimer] = useState(null);
	const [score, setScore] = useState(0);
	
	const [updateTxo, { isLoading, isSuccess, isError, error }] =
		useUpdateTxoMutation();
	
	useEffect(() => {
		setCurrentQuestion(
			questionsArray[Math.floor(Math.random() * questionsArray.length)]
		);
		setTimer(
			setTimeout(() => {
				nextQuestion();
			}, 10000)
		);
	}, []);

	const handleAnswer = () => {
		if (selectedAnswer === currentQuestion.answer) {
			setFeedback('Correct!');
			updateTxo({
				user_id: userId,
				trivia_score: score + 1,
			});
			setScore((prevScore) => prevScore + 1);
		} else {
			setFeedback('Incorrect!');
		}
		setShowFeedback(true);
	};

	const nextQuestion = () => {
		setCurrentQuestion(
			questionsArray[Math.floor(Math.random() * questionsArray.length)]
		);
		setSelectedAnswer('');
		setShowFeedback(false);
		if (timer) clearTimeout(timer);
		setTimer(
			setTimeout(() => {
				nextQuestion();
			}, 10000)
		);
	};

	if (!currentQuestion) return <div>Loading...</div>;

	const renderOptions = () => {
		if (currentQuestion.type === 'multiple') {
			return ['A', 'B', 'C', 'D'].map((option) => (
				<div key={option}>
					<input
						type='radio'
						id={option}
						name='answer'
						value={option}
						checked={selectedAnswer === option}
						onChange={(e) => setSelectedAnswer(e.target.value)}
					/>
					<label htmlFor={option}>
						{
							currentQuestion.question.match(
								new RegExp(`\\[${option}\\] (.+?)\\n`)
							)[1]
						}
					</label>
				</div>
			));
		} else if (currentQuestion.type === 'boolean') {
			return ['T', 'F'].map((option) => (
				<div key={option}>
					<input
						type='radio'
						id={option}
						name='answer'
						value={option}
						checked={selectedAnswer === option}
						onChange={(e) => setSelectedAnswer(e.target.value)}
					/>
					<label htmlFor={option}>
						{
							currentQuestion.question.match(
								new RegExp(`\\[${option}\\] (.+?)\\n`)
							)[1]
						}
					</label>
				</div>
			));
		}
	};

	return (
		<div className='w-full h-full flex flex-col flex-1 justify-center items-center'>
			<div className='h-full gap-4 flex flex-col flex-1 max-w-[min(42rem,80vw)] w-full'>
				<h2>{currentQuestion.question.split('\n\n')[0]}</h2>
				<div>{renderOptions()}</div>
				{}
				{showFeedback ? (
					<div>
						<p
							className={
								'text-xl font-bold ' +
								(feedback === 'Incorrect!'
									? 'text-red-500'
									: 'text-green-500')
							}>
							{feedback}
						</p>
						<button
							className='px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded'
							onClick={nextQuestion}>
							Next Question
						</button>
					</div>
				) : (
					<div>
						<button
							onClick={handleAnswer}
							disabled={!selectedAnswer}
							className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'>
							Submit
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Trivia;
