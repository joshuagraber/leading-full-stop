import { DOTFILE_ACTIONS, 
	DOTFILE_DATA } from "../dotfile-system/manager/index.js";


/**
 * Logs error to stderr with default informative error
 * @param {string | Uint8Array} message data to be logged to stderr
 * @returns void
 */
export function error(message) {
	const INFORMATIVE_ERROR = 
`dotfiles accepts the following actions: 
  ${Object.values(DOTFILE_ACTIONS)
		.map((v) => v).join('\n  ')}\n
As well as the following dotfile types:
  ${Object.keys(DOTFILE_DATA)
		.map((v) => v).join('\n  ')}\n
(E.g. \`dotfile action type\`.)
`;

	return process.stderr.write(
		'\n\n' + message + '\n' + INFORMATIVE_ERROR + '\n\n'
	);
}

/**
 * Logs message to stdout
 * @param {string | Uint8Array} message data to be logged to stderr
 * @returns void
 */
export function log(message) {
	return process.stdout.write(message);
}
