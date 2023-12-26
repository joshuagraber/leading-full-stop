module.exports = {
	"env": {
		"node": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{c,}js"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"semi": ["warn", "always"],
		"max-len": ["error", { 
			"code": 80, 
			"tabWidth": 2,
			"ignoreComments": true
		}],
		"indent": [
			"warn",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"object-curly-spacing": [
			"error", "always", { "objectsInObjects": false }
		],
		"no-case-declarations": "off"
	}
};
