// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const api = require('../helpers/api.helper.js');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHER API

class API {
	// Create query string params
	static toStringOptions(options) {
		const result = Object.keys(options).reduce((res, key, index) => {
			res += index > 0 ? '&' : '?';
			res += `${key}=${options[key]}`;
			return res;
		}, '');
		return result;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor(apiUrl) {
		this.API_URL = apiUrl;
	}

	async get(options) {
		let result = null;
		const endpoint = API.toStringOptions(options);
		try {
			result = await api.callApi(this.API_URL, endpoint, 'GET');
		} catch (error) {
			console.error(error);
		}
		return result;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = API;
