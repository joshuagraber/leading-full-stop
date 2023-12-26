#!/usr/bin/env node
import path from 'path';

import manager, { DOTFILE_ACTIONS, DOTFILE_DATA } 
	from './dotfile-system/manager/index.js';
import * as logger from './util/logger.js';

const __dirname = new URL('.', import.meta.url).pathname;

// dotfile <action> <type> <data[0]> <data[1]> <data[...]>
const [,, action, type, ...data] = process.argv;
logger.log('\ndotfiles updating with:\n\n');
logger.log(`action: ${action}\ntype: ${type}\ndata:\n${data.join('\n')}\n\n`);


// Validate
if (!Object.values(DOTFILE_ACTIONS).some((a) => a === action)) {
	logger.error('No valid action passed.\n', );
	process.exit(1);
}

if (!Object.keys(DOTFILE_DATA).some((t) => t === type)) {
	logger.error('No valid type passed.\n');
	process.exit(1);
}

const localFilePath = 
`${DOTFILE_DATA[type].localDirectory}/${DOTFILE_DATA[type].localFileName}`;
const repoFilePath = 
	path.join(__dirname, `./dotfiles/${DOTFILE_DATA[type].localFileName}`) ;

switch (action) {
	case DOTFILE_ACTIONS.APPLY:
		const { config: repoBase } = await manager.get(repoFilePath);
		await manager.set(localFilePath, repoBase);
		break;
	case DOTFILE_ACTIONS.CREATE:
		await manager.create(localFilePath, data);
		break;
	case DOTFILE_ACTIONS.RETRIEVE:
		const { config: localBase } = await manager.get(localFilePath);
		await manager.set(repoFilePath, localBase);
		break;
	default:
		logger.error('dotfiles called with unknown action');
		process.exit(1);
}
