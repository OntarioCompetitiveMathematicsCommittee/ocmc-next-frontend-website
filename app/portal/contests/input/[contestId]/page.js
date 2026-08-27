'use client';

// importing required modules and components
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Papa from 'papaparse';

import { useGetUsersQuery, useUpdateUserContestScoresMutation } from '@components/features/users/usersApiSlice';
import { useGetContestsQuery } from '@components/features/contests/contestsApiSlice';

import { buildEntries, guessLayout, parseDelimitedText, readScoreFile } from '@components/features/contests/scores/parseScoreSheet';
import ScoreFileInput from '@components/features/contests/scores/ScoreFileInput';
import ScoreColumnMapper from '@components/features/contests/scores/ScoreColumnMapper';
import ScorePreviewTable from '@components/features/contests/scores/ScorePreviewTable';

import BackButton from '@components/elements/BackButton';

// the API takes one student per request, so a few run at a time to keep large uploads quick
const CONCURRENT_UPDATES = 3;

const EMPTY_ROWS = [];

const InputScores = () => {
	const [mode, setMode] = useState('file');

	const [sheets, setSheets] = useState([]);
	const [sheetIndex, setSheetIndex] = useState(0);
	const [fileName, setFileName] = useState('');
	const [isParsing, setIsParsing] = useState(false);
	const [fileError, setFileError] = useState('');

	const [csv, setCsv] = useState('');

	const [layout, setLayout] = useState({ identifierColumn: 0, scoreColumn: 1, hasHeader: false });
	const [submitResults, setSubmitResults] = useState(() => new Map());
	const [progress, setProgress] = useState(null);

	const params = useParams();
	const id = params.contestId;

	const { data: users, isSuccess: isUsersSuccess, isLoading: isUsersLoading } = useGetUsersQuery({});
	const { data: contests } = useGetContestsQuery(undefined, { refetchOnMountOrArgChange: true });
	const [updateUserContests] = useUpdateUserContestScoresMutation();

	const contest = contests?.entities?.[id];
	const maxScore = Number(contest?.max_score) || 0;

	// students can be listed by their contest code or their username
	const identifierLookup = useMemo(() => {
		const lookup = new Map();
		if (!isUsersSuccess) return lookup;

		for (const user of Object.values(users.entities)) {
			if (user.code) lookup.set(String(user.code).trim().toLowerCase(), user.username);
			if (user.username) lookup.set(String(user.username).trim().toLowerCase(), user.username);
		}
		return lookup;
	}, [users, isUsersSuccess]);

	const resolveIdentifier = useCallback(
		(identifier) => identifierLookup.get(String(identifier).trim().toLowerCase()) ?? null,
		[identifierLookup]
	);

	const pastedRows = useMemo(() => (csv.trim() === '' ? EMPTY_ROWS : parseDelimitedText(csv)), [csv]);
	const rows = mode === 'file' ? (sheets[sheetIndex]?.rows ?? EMPTY_ROWS) : pastedRows;

	// re-guess the column mapping when the source changes shape, but keep manual overrides
	const layoutSignature = `${mode}|${fileName}|${sheetIndex}|${rows.length}|${rows[0]?.length ?? 0}`;
	const lastLayoutSignature = useRef(null);

	useEffect(() => {
		if (lastLayoutSignature.current === layoutSignature) return;
		lastLayoutSignature.current = layoutSignature;
		setLayout(guessLayout(rows));
	}, [layoutSignature, rows]);

	// a fresh preview means the previous run's results no longer apply
	useEffect(() => {
		setSubmitResults(new Map());
		setProgress(null);
	}, [rows, layout]);

	const entries = useMemo(() => {
		if (!rows.length || !isUsersSuccess) return [];

		return buildEntries(rows, { ...layout, resolveIdentifier, maxScore }).map((entry) => {
			const result = submitResults.get(entry.rowNumber);
			return result ? { ...entry, ...result } : entry;
		});
	}, [rows, layout, resolveIdentifier, maxScore, isUsersSuccess, submitResults]);

	const counts = useMemo(() => entries.reduce((totals, entry) => {
		totals[entry.status] = (totals[entry.status] ?? 0) + 1;
		return totals;
	}, {}), [entries]);

	const readyCount = counts.ok ?? 0;
	const problemEntries = entries.filter((entry) => entry.status === 'error' || entry.status === 'failed');
	const isSubmitting = progress !== null && progress.done < progress.total;

	const handleFile = async (file) => {
		setIsParsing(true);
		setFileError('');
		try {
			const parsed = await readScoreFile(file);
			setSheets(parsed);
			setSheetIndex(0);
			setFileName(file.name);
		} catch (err) {
			setSheets([]);
			setFileName('');
			setFileError(err.message ?? 'Could not read that file.');
		} finally {
			setIsParsing(false);
		}
	};

	const handleClearFile = () => {
		setSheets([]);
		setSheetIndex(0);
		setFileName('');
		setFileError('');
	};

	const handleErrorDownload = (e) => {
		e.preventDefault();
		const fileData = Papa.unparse(problemEntries.map((entry) => ({
			row: entry.rowNumber,
			code: entry.identifier,
			username: entry.username ?? '',
			score: entry.rawScore,
			problem: entry.message
		})));

		const blob = new Blob([fileData], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = `score_errors_${new Date().toISOString().slice(0, 10)}.csv`;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const queue = entries.filter((entry) => entry.status === 'ok');
		if (!queue.length || isSubmitting) return;

		setProgress({ done: 0, total: queue.length });

		let cursor = 0;
		const worker = async () => {
			while (cursor < queue.length) {
				const entry = queue[cursor++];

				const res = await updateUserContests({
					username: entry.username,
					contest_id: id,
					score: entry.score,
					type: 'update'
				});

				const result = res.error
					? { status: 'failed', message: res.error?.data?.message ?? 'Update failed' }
					: { status: 'updated', message: '' };

				setSubmitResults((prev) => new Map(prev).set(entry.rowNumber, result));
				setProgress((prev) => ({ ...prev, done: prev.done + 1 }));
			}
		};

		await Promise.all(Array.from({ length: Math.min(CONCURRENT_UPDATES, queue.length) }, worker));
	};

	const tabClass = (value) => 'px-6 py-2 text-xl transition-colors rounded-md '
		+ (mode === value ? 'text-white bg-brandBlue-500' : 'border-2 bg-brandNeutral-100 hover:border-brandBlue-500');

	const content = (
		<div className='relative flex flex-col items-center justify-center w-full h-full gap-8 py-24'>
			<BackButton path='/portal/contests' />

			<div className='text-center'>
				<h1 className='portalh2'>Input Scores</h1>
				{contest && <p className='text-xl text-brandNeutral-600'>{contest.name} — max score {contest.max_score}</p>}
			</div>

			<form className='max-w-[90%] w-[60rem] flex flex-col gap-4' onSubmit={handleSubmit}>
				<div className='flex gap-2'>
					<button type='button' className={tabClass('file')} onClick={() => setMode('file')}>Upload file</button>
					<button type='button' className={tabClass('paste')} onClick={() => setMode('paste')}>Paste CSV</button>
				</div>

				{mode === 'file' ? (
					<>
						<ScoreFileInput
							fileName={fileName}
							isParsing={isParsing}
							onFile={handleFile}
							onClear={handleClearFile}
						/>
						{fileError && <p className='text-lg text-red-600'>{fileError}</p>}
						{sheets.length > 1 && (
							<label className='flex flex-col gap-1'>
								<span className='text-brandBlue-900'>Worksheet</span>
								<select
									className='w-64 px-2 py-2 text-lg bg-white border-2 rounded-md'
									value={sheetIndex}
									onChange={(e) => setSheetIndex(Number(e.target.value))}
								>
									{sheets.map((sheet, index) => (
										<option key={sheet.name} value={index}>{sheet.name}</option>
									))}
								</select>
							</label>
						)}
					</>
				) : (
					<div className='flex flex-col gap-2'>
						<label className='text-xl text-brandBlue-900' htmlFor='csv'>CSV Scores:</label>
						<textarea
							className='w-full h-64 px-2 py-1 text-lg border-2'
							placeholder={'code1,score1\ncode2,score2'}
							id='csv'
							name='csv'
							value={csv}
							onChange={(e) => setCsv(e.target.value)}
						/>
					</div>
				)}

				{isUsersLoading && <p className='text-lg text-brandNeutral-600'>Loading participants…</p>}

				{rows.length > 0 && isUsersSuccess && (
					<>
						<ScoreColumnMapper rows={rows} layout={layout} onChange={setLayout} />

						<p className='text-lg text-brandBlue-900'>
							{readyCount} ready to upload
							{counts.updated ? `, ${counts.updated} updated` : ''}
							{counts.skipped ? `, ${counts.skipped} skipped` : ''}
							{problemEntries.length ? `, ${problemEntries.length} need attention` : ''}
						</p>

						<ScorePreviewTable entries={entries} />
					</>
				)}

				{progress && (
					<div className='flex flex-col gap-1'>
						<div className='w-full h-2 rounded-full bg-brandNeutral-200'>
							<div
								className='h-2 transition-all rounded-full bg-brandBlue-500'
								style={{ width: `${Math.round((progress.done / progress.total) * 100)}%` }}
							/>
						</div>
						<p className='text-brandNeutral-600'>
							{isSubmitting ? `Uploading ${progress.done} of ${progress.total}…` : `Finished ${progress.total} updates.`}
						</p>
					</div>
				)}

				<div className='flex gap-2'>
					<button disabled={readyCount === 0 || isSubmitting} type='submit'
						className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-64 '
							+ (readyCount === 0 || isSubmitting ? 'border-2 bg-brandNeutral-100' : 'text-white bg-brandBlue-500 hover:bg-brandBlue-600')}>
						{isSubmitting ? 'Uploading…' : (readyCount ? `Update ${readyCount} Scores` : 'Update Scores')}
					</button>
					<button onClick={handleErrorDownload} disabled={problemEntries.length === 0} type='button'
						className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-64 '
							+ (problemEntries.length === 0 ? 'border-2 bg-brandNeutral-100' : 'text-white bg-red-500 hover:bg-red-600')}>
						Download Error Log
					</button>
				</div>
			</form>
		</div>
	);

	return content;
};

export default InputScores;
