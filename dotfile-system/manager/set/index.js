import fs from 'fs';

import get from '../get/index.js';

/**
 * Applies base config to file
 * @param {string} path path to file
 * @param {string[]} newBase lines to be written
 */
export default async function set(path, newBase) {
	const { after: linesAfterFlags, before: linesBeforeFlags} = await get(path);
	// let formatted = '';
	const isLocal = path.includes('leading-full-stop');

	// Add spaces before and after the dotfile code
	if (linesBeforeFlags) linesBeforeFlags.push('');
	if (linesAfterFlags) linesAfterFlags.unshift('');

	// Concat new array
	const fullFileContent = 
		[].concat(linesBeforeFlags).concat(newBase).concat(linesAfterFlags);

	// Write file
	if (isLocal) {
		fs.writeFileSync(path, newBase.join('\n'));
	} else {
		fs.writeFileSync(path, fullFileContent.join('\n'));
	}
}
