'use client';

import { columnLetter } from './parseScoreSheet';

const ScoreColumnMapper = ({ rows, layout, onChange }) => {
	const { identifierColumn, scoreColumn, hasHeader } = layout;
	const width = rows[0]?.length ?? 0;

	const labelFor = (index) => {
		const headerName = hasHeader ? rows[0]?.[index] : '';
		return headerName ? `${columnLetter(index)} — ${headerName}` : `Column ${columnLetter(index)}`;
	};

	const options = Array.from({ length: width }, (_, index) => (
		<option key={index} value={index}>{labelFor(index)}</option>
	));

	const select = (name, value) => (
		<select
			className='px-2 py-2 text-lg bg-white border-2 rounded-md'
			value={value}
			onChange={(e) => onChange({ ...layout, [name]: Number(e.target.value) })}
		>
			{options}
		</select>
	);

	return (
		<div className='flex flex-wrap items-end gap-6 p-4 border-2 rounded-md bg-brandNeutral-100'>
			<label className='flex flex-col gap-1'>
				<span className='text-brandBlue-900'>Student code / username column</span>
				{select('identifierColumn', identifierColumn)}
			</label>

			<label className='flex flex-col gap-1'>
				<span className='text-brandBlue-900'>Score column</span>
				{select('scoreColumn', scoreColumn)}
			</label>

			<label className='flex items-center gap-2 py-3'>
				<input
					type='checkbox'
					className='w-5 h-5'
					checked={hasHeader}
					onChange={(e) => onChange({ ...layout, hasHeader: e.target.checked })}
				/>
				<span className='text-brandBlue-900'>First row is a header</span>
			</label>
		</div>
	);
};

export default ScoreColumnMapper;
