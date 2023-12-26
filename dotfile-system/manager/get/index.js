import fs from 'fs';

import { CLOSING_TAG_SHELL, LEADING_TAG_SHELL } 
	from '../../../util/constants.js';
import processFileLineByLine from '../../../util/processFileLineByLine.js';

/**
 * Returns config between the leading and closing flags
 * @param {string} path path to file
 * @returns {Promise<Partial<Record<'config' | 'after' | 'before', string[]>>>} a promise that resolves to an object of arrays of strings representing lines of the file and relationship to config
 */
export default async function get(path) {
	const allLines = [];
	const linesAfterFlags = [];
	const linesBeforeFlags = [];
	const linesBetweenFlags = [];
	let hasMetLeadingFlag = false;
	let hasMetClosingFlag = false;

	const exists = fs.existsSync(path);

	if (exists) {
		await processFileLineByLine(path, processLines);
	}

	const linesTrimmed = linesBetweenFlags
		.filter((line, index, lines) => 
			!((index === 0 || index === lines.length - 1) && !line)
		);


	if (!hasMetLeadingFlag) return { config: allLines };
	else return { 
		config: linesTrimmed, 
		after: linesAfterFlags, 
		before: linesBeforeFlags
	};


	/**
 * Util to process lines of file
 * @param {string} line line of file to process
 */
	function processLines(line) {
		allLines.push(line);
		// Order is important, as we want to catch the flags in the "before" and "after" arrays
		if (!hasMetLeadingFlag) linesBeforeFlags.push(line);
		if (line === CLOSING_TAG_SHELL) {
			hasMetClosingFlag = true;
		}
		if (hasMetLeadingFlag && !hasMetClosingFlag) linesBetweenFlags.push(line);
		if (line === LEADING_TAG_SHELL) hasMetLeadingFlag = true;
		if (hasMetClosingFlag) linesAfterFlags.push(line);
	}
}