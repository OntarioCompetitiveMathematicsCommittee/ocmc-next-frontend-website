'use client';

import { useRef, useState } from 'react';
import { ACCEPTED_FILE_TYPES } from './parseScoreSheet';

const ScoreFileInput = ({ fileName, isParsing, onFile, onClear }) => {
	const inputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) onFile(file);
	};

	const handleSelect = (e) => {
		const file = e.target.files?.[0];
		if (file) onFile(file);
		// reset so picking the same file twice still fires a change event
		e.target.value = '';
	};

	return (
		<div className='flex flex-col gap-2'>
			<div
				onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
				className={'flex flex-col items-center justify-center w-full gap-2 p-10 text-center transition-colors border-2 border-dashed rounded-md cursor-pointer '
					+ (isDragging ? 'border-brandBlue-500 bg-brandBlue-100' : 'border-brandNeutral-400 bg-brandNeutral-100 hover:border-brandBlue-500')}
			>
				<p className='text-xl text-brandBlue-900'>
					{isParsing ? 'Reading file…' : 'Drop a spreadsheet here, or click to choose one'}
				</p>
				<p className='text-brandNeutral-600'>Accepts .xlsx and .csv — one row per student, up to 5MB</p>
				<input
					ref={inputRef}
					type='file'
					accept={ACCEPTED_FILE_TYPES}
					onChange={handleSelect}
					className='hidden'
				/>
			</div>

			{fileName && (
				<div className='flex items-center justify-between px-2 text-lg'>
					<span className='text-brandBlue-900'>{fileName}</span>
					<button type='button' onClick={onClear} className='underline text-brandNeutral-600 hover:text-red-600'>
						Remove
					</button>
				</div>
			)}
		</div>
	);
};

export default ScoreFileInput;
