import fs from 'fs';
import path from 'path';
import { CLOSING_TAG_SHELL, LEADING_TAG_SHELL } 
	from "../../../util/constants.js";

const __dirname = new URL('.', import.meta.url).pathname;

/**
 * Write new config file to local directory and to repository folder
 * @param {string} filePath path to file
 * @param {string[]} base array of strings representing lines of file
 * @param {boolean} includeFlags include leading and trailing flags. Need to set as `false` for things like `.nvmrc` where the first line of the file is meaningful to the parser. Default value of `true`.
*/
export default async function create(
	filePath, base, includeFlags = true
) {
	const localDir = path.dirname(filePath);
	const fileName = filePath.replace(localDir, '');
	const repoMirrorFilePath = path.join(__dirname, `../../dotfiles/${fileName}`);
	const repoDir = path.dirname(repoMirrorFilePath);

	// Create directories if they don't already exist
	[localDir, repoDir].forEach((dir) => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	});

	// First without the leading/closing tags for the repo file
	const repoBuffer = Buffer.from(base.join('\n'));

	// Add tags for the local file
	if (includeFlags) {
		base.unshift(LEADING_TAG_SHELL, '');
		base.push('', CLOSING_TAG_SHELL);
	}

	// Local buffer - new with flags if they are included. Use the same if they are not.
	const localBuffer = includeFlags ? Buffer.from(base.join('\n')) : repoBuffer;
  
	// Write both
	fs.writeFileSync(repoMirrorFilePath, repoBuffer);
	fs.writeFileSync(filePath, localBuffer);
}