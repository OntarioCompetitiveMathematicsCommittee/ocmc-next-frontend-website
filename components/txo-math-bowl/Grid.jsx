import React, { useState, useEffect } from 'react';

const SudokuGrid = ({
	initialPuzzle,
	onSolve,
	onNextPuzzle,
	completionTimes,
}) => {
	const [grid, setGrid] = useState([]);
	const [initialCells, setInitialCells] = useState([]);
	const [isSolved, setIsSolved] = useState(false);

	useEffect(() => {
		setGrid(initialPuzzle);
		const cells = initialPuzzle.map((row) =>
			row.map((cell) => cell !== '')
		);
		setInitialCells(cells);
		setIsSolved(false); // reset solved status when puzzle changes
	}, [initialPuzzle]);

	const handleChange = (row, col, value) => {
		if (value === '' || (value >= '1' && value <= '9')) {
			const newGrid = grid.map((rowArr, rowIndex) =>
				rowArr.map((cell, colIndex) =>
					rowIndex === row && colIndex === col ? value : cell
				)
			);
			setGrid(newGrid);
		}
	};

	const checkSolution = () => {
		const isValidSudoku = (board) => {
			const rows = Array.from({ length: 9 }, () => new Set());
			const cols = Array.from({ length: 9 }, () => new Set());
			const boxes = Array.from({ length: 9 }, () => new Set());

			for (let i = 0; i < 9; i++) {
				for (let j = 0; j < 9; j++) {
					const num = board[i][j];
					if (num === '') return false;

					const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

					if (
						rows[i].has(num) ||
						cols[j].has(num) ||
						boxes[boxIndex].has(num)
					) {
						return false;
					}

					rows[i].add(num);
					cols[j].add(num);
					boxes[boxIndex].add(num);
				}
			}
			return true;
		};

		const isCorrect = isValidSudoku(grid);
		setIsSolved(isCorrect);
		if (isCorrect) {
			onSolve();
		}
	};

	if (initialCells.length === 0) {
		return null; // no breaking
	}

	return (
		<div className='flex flex-col w-full h-full flex-1 items-center'>
			<table className='mx-auto mt-5 border-collapse table-fixed'>
				<tbody>
					{grid.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, colIndex) => {
								// bold subgrids
								const isTop = rowIndex % 3 === 0;
								const isLeft = colIndex % 3 === 0;
								const isBottom = rowIndex % 3 === 2;
								const isRight = colIndex % 3 === 2;

								return (
									<td
										key={colIndex}
										className={`border border-black w-10 h-10 p-0 ${
											isTop ? 'border-t-2' : ''
										} ${isLeft ? 'border-l-2' : ''} ${
											isBottom ? 'border-b-2' : ''
										} ${isRight ? 'border-r-2' : ''}`}>
										<input
											type='text'
											value={cell}
											onChange={(e) =>
												handleChange(
													rowIndex,
													colIndex,
													e.target.value
												)
											}
											className={`w-full h-full text-center text-black text-lg outline-none ${
												initialCells[rowIndex][colIndex]
													? 'bg-gray-200'
													: ''
											}`}
											maxLength='1'
											disabled={
												initialCells[rowIndex][colIndex]
											}
										/>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex mt-4 space-x-4'>
				<button
					onClick={checkSolution}
					className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'>
					Check Solution
				</button>
				<button
					onClick={onNextPuzzle}
					className={`px-4 py-2 ${
						isSolved
							? 'bg-green-500 hover:bg-green-700'
							: 'bg-gray-400 cursor-not-allowed'
					} text-white rounded`}
					disabled={!isSolved}>
					Next Puzzle
				</button>
			</div>
			<div className='w-full mt-4'>
				<h2 className='text-xl font-bold text-center'>
					Completion Times
				</h2>
				<ul className='mt-2 list-disc list-inside'>
					{completionTimes.map((time, index) => (
						<li key={index} className='text-center'>
							Puzzle {index + 1}: {Math.floor(time / 60)}:
							{String(time % 60).padStart(2, '0')}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SudokuGrid;
