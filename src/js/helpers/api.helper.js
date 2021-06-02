// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API HELPER

function callApi(apiUrl, endpoint, method) {
	const url = apiUrl + endpoint;
	const options = {
		method,
	};

	return fetch(url, options)
		.then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
		.then((res) => res.results)
		.catch((error) => { throw error; });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = {
	callApi,
};
