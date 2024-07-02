import { useState, useEffect } from 'react';
import { questionsArray } from '@/config/txo-math-bowl/trivia';
import { useUpdateTxoMutation } from '@components/features/txo/txoApiSlice';

const Trivia = ({ userId }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [feedback, setFeedback] = useState('');
	const [showFeedback, setShowFeedback] = useState(false);
	const [timer, setTimer] = useState(null);
	const [score, setScore] = useState(0);
	
	const [updateTxo, { isLoading, isSuccess, isError, error }] =
		useUpdateTxoMutation();
	
	useEffect(() => {
		if (currentQuestionIndex < questionsArray.length) {
			const newTimer = setTimeout(() => {
				nextQuestion();
			}, 10000);
			setTimer(newTimer);

			// Cleanup function to clear the timer
			return () => clearTimeout(newTimer);
		}
	}, [currentQuestionIndex]);

	const handleAnswer = () => {
		if (selectedAnswer === questionsArray[currentQuestionIndex].answer) {
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
		if (currentQuestionIndex < questionsArray.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			setSelectedAnswer('');
			setShowFeedback(false);
		} else {
			setCurrentQuestionIndex(questionsArray.length);
		}
	};

	if (currentQuestionIndex >= questionsArray.length) {
		return <div>No questions left.</div>;
	}

	const currentQuestion = questionsArray[currentQuestionIndex];

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
		<div className='flex flex-col items-center justify-center flex-1 w-full h-full'>
			<div className='h-full gap-4 flex flex-col flex-1 max-w-[min(42rem,80vw)] w-full'>
				<h2>{currentQuestion.question.split('\n\n')[0]}</h2>
				<div>{renderOptions()}</div>
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
							className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700'
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
