// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const API_DATA_URL = 'http://localhost:3000/teachers';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DATABASE

class Database {
	async post(data) {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', API_DATA_URL, true);
		ajax.setRequestHeader('Content-Type', 'application/json');
		ajax.send(data);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Database;
