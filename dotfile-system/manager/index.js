import set from './set/index.js';
import get from './get/index.js';
import create from './create/index.js';

export const DOTFILE_DATA = {
	'iTerm': {
		fileName: 'com.googlecode.iterm2.plist',
		localDirectory: `${process.env.HOME}/Library/Preferences`
	},
	'zsh': {
		fileName: '.zshrc',
		localDirectory: process.env.HOME
	}
};

export const DOTFILE_TYPES = {};
Object.keys(DOTFILE_DATA).forEach((key) => 
	Object.assign(DOTFILE_TYPES, { [key]: key }));

/**
 * @type {Record<'APPLY' | 'CREATE' | 'RETRIEVE', 'apply' | 'create' | 'retrieve'>}
 */
export const DOTFILE_ACTIONS = {
	APPLY: 'apply',
	CREATE: 'create',
	RETRIEVE: 'retrieve'
};

export default {
	create,
	get,
	set
};

