const Autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		Autoprefixer({
			overrideBrowserslist: ['ie >= 8', 'last 4 version'],
		}),
	],
};
