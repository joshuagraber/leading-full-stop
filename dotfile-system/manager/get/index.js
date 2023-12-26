import fs from 'fs';

import { CLOSING_TAG_SHELL, LEADING_TAG_SHELL } 
	from '../../../util/constants.js';
import processFileLineByLine from '../../../util/processFileLineByLine.js';

/**
 * Returns config between the leading and closing flags
 * @param {string} path path to file
 * @returns {Promise<string[]>} a promise that resolves to an array of strings representing lines of the file
 */
export default async function get(path) {
	const allLines = [];
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


	if (!hasMetLeadingFlag) return allLines;
	else return linesTrimmed;


	/**
 * Util to process lines of file
 * @param {string} line line of file to process
 */
	function processLines(line) {
		allLines.push(line);
		if (line === CLOSING_TAG_SHELL) {
			hasMetClosingFlag = true;
		}
		if (hasMetLeadingFlag && !hasMetClosingFlag) linesBetweenFlags.push(line);
		if (line === LEADING_TAG_SHELL) hasMetLeadingFlag = true;
	}
}