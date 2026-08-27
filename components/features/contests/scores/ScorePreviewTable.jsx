'use client';

import { useState } from 'react';

const MAX_VISIBLE_ROWS = 250;

const STATUS_STYLES = {
	ok: { label: 'Ready', className: 'text-brandBlue-900' },
	updated: { label: 'Updated', className: 'text-green-700' },
	skipped: { label: 'Skipped', className: 'text-brandNeutral-600' },
	error: { label: 'Error', className: 'text-red-600' },
	failed: { label: 'Failed', className: 'text-red-600' }
};

const ScorePreviewTable = ({ entries }) => {
	const [problemsOnly, setProblemsOnly] = useState(false);

	const visible = (problemsOnly ? entries.filter((entry) => entry.status !== 'ok' && entry.status !== 'updated') : entries)
		.slice(0, MAX_VISIBLE_ROWS);

	return (
		<div className='flex flex-col gap-2'>
			<label className='flex items-center gap-2 self-end'>
				<input
					type='checkbox'
					className='w-5 h-5'
					checked={problemsOnly}
					onChange={(e) => setProblemsOnly(e.target.checked)}
				/>
				<span className='text-brandBlue-900'>Only show rows needing attention</span>
			</label>

			<div className='overflow-auto border-2 rounded-md max-h-96'>
				<table className='w-full text-left'>
					<thead className='sticky top-0 text-white bg-brandBlue-500'>
						<tr>
							<th className='px-3 py-2'>Row</th>
							<th className='px-3 py-2'>Code</th>
							<th className='px-3 py-2'>Username</th>
							<th className='px-3 py-2'>Score</th>
							<th className='px-3 py-2'>Status</th>
						</tr>
					</thead>
					<tbody>
						{visible.map((entry) => {
							const status = STATUS_STYLES[entry.status] ?? STATUS_STYLES.ok;
							return (
								<tr key={entry.rowNumber} className='bg-white border-b'>
									<td className='px-3 py-2 text-brandNeutral-600'>{entry.rowNumber}</td>
									<td className='px-3 py-2'>{entry.identifier || '—'}</td>
									<td className='px-3 py-2'>{entry.username ?? '—'}</td>
									<td className='px-3 py-2'>{entry.rawScore === '' ? '—' : entry.rawScore}</td>
									<td className={'px-3 py-2 ' + status.className}>
										{status.label}{entry.message ? ` — ${entry.message}` : ''}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{visible.length < entries.length && (
				<p className='text-brandNeutral-600'>
					Showing {visible.length} of {entries.length} rows.
				</p>
			)}
		</div>
	);
};

export default ScorePreviewTable;
