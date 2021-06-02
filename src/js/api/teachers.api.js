// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const API = require('./api');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const API_RANDOM_USER_URL = 'https://randomuser.me/api/';
const RandomUserAPI = new API(API_RANDOM_USER_URL);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHINDER API

class TeachersAPI {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor({ seed }) {
		this.seed = seed;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	getPath(options) {
		const queryString = API.toStringOptions(options);
		return API_RANDOM_USER_URL + queryString;
	}

	async getByQuantity({ quantity }) {
		const options = {
			page: 1,
			seed: this.seed,
			results: quantity,
		};
		const result = await RandomUserAPI.get(options);
		return result;
	}

	async getPageLimit({ page, limit }) {
		const options = {
			page,
			seed: this.seed,
			results: limit,
		};
		const result = await RandomUserAPI.get(options);
		return result;
	}

	async getByFilter({ page, limit, filterOptions = {} }) {
		const options = {
			page,
			results: limit,
			...filterOptions,
		};
		console.log(this.getPath(options));
		const result = await RandomUserAPI.get(options);
		return result;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeachersAPI;
