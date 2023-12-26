import events from 'events';
import fs from 'fs';
import readline from 'readline';

/**
 * Util for processing files line-by-line in node
 * @param {string} path path to file
 * @param {(s: string) => void} onEachLine function to be applied to each line of file
 * @param {() => void} onClose function to be applied to each line of file
 */
export default async function processFileLineByLine(
	path, onEachLine, onClose = () => undefined
) {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream(path),
			crlfDelay: Infinity
		});
    

		rl.on('line', onEachLine);
		rl.on('close', onClose);
		await events.once(rl, 'close');
	} catch (err) {
		console.error(err);
	}
}
