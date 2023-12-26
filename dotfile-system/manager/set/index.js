import fs from 'fs';

import processFileLineByLine from "../../../util/processFileLineByLine.js";
import get from '../get/index.js';
import * as logger from '../../../util/logger.js';

/**
 * Applies base config to file
 * @param {string} path path to file
 * @param {string[]} newBase lines to be written
 */
export default async function set(path, newBase) {
	const currentBase = await get(path);
	let formatted = '';

	const exists = fs.existsSync(path);

	if (exists) {
		await processFileLineByLine(path, processLines, onClose);
	} else {
		fs.writeFileSync(path, newBase.join('\n'));
	}
  

	/**
   * Util for processing lines to write
   * @param {string} line line to process
   */
	function processLines(line) {
		line = newBase[currentBase.indexOf(line)] ?? line;
		line += '\n';
		formatted += line;
	}
	function onClose() {
		fs.writeFile(path, formatted, 'utf8', function (err) {
			if (err) return logger.error(err.message);
		});
	}
}
