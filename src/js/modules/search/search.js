// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const {
	getHTMLElement,
	getFormData,
} = require('../dom');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SEARCH
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Search {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static onSubmit(form, btnSubmit, even) {
		even.preventDefault();
		btnSubmit.classList.add('button_inactive');
		const res = getFormData(form);
		btnSubmit.classList.remove('button_inactive');
		return res;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(searchId) {
		this.search = getHTMLElement(document, searchId, 'id');
		this.form = getHTMLElement(this.search, 'form', 'tag');
		this.btnSubmit = getHTMLElement(this.form, 'button[type="submit"]', 'tag');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	start(callback) {
		this.form.onsubmit = (even) => {
			const res = Search.onSubmit(this.form, this.btnSubmit, even);
			callback && callback(res);
			this.form.reset();
		};
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Search;
