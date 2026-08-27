// Helpers for turning a pasted CSV or an uploaded spreadsheet into score updates.
// Everything here is pure so the page can re-run it whenever the column mapping changes.

import Papa from 'papaparse';

export const ACCEPTED_FILE_TYPES = '.xlsx,.xlsm,.csv';
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

const XLSX_EXTENSIONS = ['xlsx', 'xlsm'];

// used to guess which column is which when the sheet has a header row
const IDENTIFIER_HEADER_PATTERN = /(code|username|user\s*name|student|participant)/i;
const SCORE_HEADER_PATTERN = /(score|points?|total|marks?|result)/i;

const NUMERIC_PATTERN = /^-?\d+(\.\d+)?$/;

export const getExtension = (name = '') => name.split('.').pop().toLowerCase();

export const isNumeric = (value) => NUMERIC_PATTERN.test(String(value ?? '').trim());

// spreadsheet column index (0 based) -> A, B, ... Z, AA
export const columnLetter = (index) => {
	let letter = '';
	let n = index;
	while (n >= 0) {
		letter = String.fromCharCode((n % 26) + 65) + letter;
		n = Math.floor(n / 26) - 1;
	}
	return letter;
};

// exceljs cells can hold plain values, dates, formulas, rich text or hyperlinks
const cellToString = (value) => {
	if (value === null || value === undefined) return '';
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	if (typeof value === 'object') {
		if (Array.isArray(value.richText)) return value.richText.map((part) => part.text).join('');
		if (value.text !== undefined) return String(value.text);
		if (value.result !== undefined) return String(value.result);
		if (value.error !== undefined) return String(value.error);
		return '';
	}
	return String(value);
};

// drop rows and trailing columns that are entirely blank
const normalizeRows = (rows) => {
	const trimmed = rows
		.map((row) => row.map((cell) => String(cell ?? '').trim()))
		.filter((row) => row.some((cell) => cell !== ''));

	const width = trimmed.reduce((widest, row) => {
		let last = -1;
		row.forEach((cell, index) => {
			if (cell !== '') last = index;
		});
		return Math.max(widest, last + 1);
	}, 0);

	return trimmed.map((row) => {
		const padded = row.slice(0, width);
		while (padded.length < width) padded.push('');
		return padded;
	});
};

export const parseDelimitedText = (text) => {
	const { data } = Papa.parse(String(text ?? '').trim(), { skipEmptyLines: 'greedy' });
	return normalizeRows(data);
};

// exceljs is ~800KB, so it is only pulled in once someone actually picks a file
const readXlsxFile = async (file) => {
	const exceljs = await import('exceljs');
	const ExcelJS = exceljs.default ?? exceljs;

	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(await file.arrayBuffer());

	return workbook.worksheets
		.map((sheet) => {
			const rows = [];
			for (let r = 1; r <= sheet.rowCount; r++) {
				const row = sheet.getRow(r);
				const cells = [];
				for (let c = 1; c <= sheet.columnCount; c++) {
					cells.push(cellToString(row.getCell(c).value));
				}
				rows.push(cells);
			}
			return { name: sheet.name, rows: normalizeRows(rows) };
		})
		.filter((sheet) => sheet.rows.length > 0);
};

const readCsvFile = async (file) => {
	const rows = parseDelimitedText(await file.text());
	return rows.length ? [{ name: file.name, rows }] : [];
};

// returns [{ name, rows }] — one entry per non-empty worksheet
export const readScoreFile = async (file) => {
	const extension = getExtension(file.name);

	if (file.size > MAX_FILE_BYTES) {
		throw new Error('That file is larger than 5MB. Export just the scores sheet and try again.');
	}

	let sheets;
	if (extension === 'csv') {
		sheets = await readCsvFile(file);
	} else if (XLSX_EXTENSIONS.includes(extension)) {
		sheets = await readXlsxFile(file);
	} else {
		throw new Error(`Can't read a ".${extension}" file. Upload a .xlsx or .csv file instead.`);
	}

	if (!sheets.length) throw new Error('That file has no rows in it.');
	return sheets;
};

// pick sensible defaults for the column dropdowns
export const guessLayout = (rows) => {
	const fallback = { identifierColumn: 0, scoreColumn: 1, hasHeader: false };
	if (!rows.length) return fallback;

	const header = rows[0];
	const headerIdentifier = header.findIndex((cell) => IDENTIFIER_HEADER_PATTERN.test(cell));
	const headerScore = header.findIndex((cell) => SCORE_HEADER_PATTERN.test(cell));

	// a first row is a header if it names columns, or if nothing in it looks like a score
	const hasHeader = headerIdentifier !== -1 || headerScore !== -1 || !header.some(isNumeric);

	const firstDataRow = rows[hasHeader ? 1 : 0] ?? [];

	let identifierColumn = headerIdentifier;
	if (identifierColumn === -1) {
		identifierColumn = firstDataRow.findIndex((cell) => cell !== '' && !isNumeric(cell));
	}
	if (identifierColumn === -1) identifierColumn = 0;

	let scoreColumn = headerScore;
	if (scoreColumn === -1) {
		// the rightmost numeric cell is nearly always the score
		firstDataRow.forEach((cell, index) => {
			if (index !== identifierColumn && isNumeric(cell)) scoreColumn = index;
		});
	}
	if (scoreColumn === -1 || scoreColumn === identifierColumn) {
		scoreColumn = identifierColumn === 0 ? Math.min(1, header.length - 1) : 0;
	}

	return { identifierColumn, scoreColumn, hasHeader };
};

// entry.status is one of 'ok' | 'error' | 'skipped'
export const buildEntries = (rows, { identifierColumn, scoreColumn, hasHeader, resolveIdentifier, maxScore }) => {
	const dataRows = hasHeader ? rows.slice(1) : rows;
	const seenAt = new Map();

	return dataRows.map((row, index) => {
		const rowNumber = index + (hasHeader ? 2 : 1);
		const identifier = row[identifierColumn] ?? '';
		const rawScore = row[scoreColumn] ?? '';

		const entry = { rowNumber, identifier, rawScore, username: null, score: null, status: 'ok', message: '' };

		const fail = (message) => ({ ...entry, status: 'error', message });
		const skip = (message) => ({ ...entry, status: 'skipped', message });

		if (identifier === '' && rawScore === '') return skip('Empty row');
		if (identifier === '') return fail('No student code in this row');

		const username = resolveIdentifier(identifier);
		if (!username) return fail(`No participant matches "${identifier}"`);

		if (rawScore === '') return skip('No score given — left unchanged');
		if (!isNumeric(rawScore)) return { ...fail(`Score "${rawScore}" is not a number`), username };

		const score = Number(rawScore);
		if (score < -1) return { ...fail('Score cannot be negative'), username };
		if (maxScore && score > maxScore) return { ...fail(`Score ${score} is above the max of ${maxScore}`), username };

		const duplicateRow = seenAt.get(username);
		if (duplicateRow) return { ...fail(`Duplicate of row ${duplicateRow} (${identifier})`), username };
		seenAt.set(username, rowNumber);

		return { ...entry, username, score };
	});
};
