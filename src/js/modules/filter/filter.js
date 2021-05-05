// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const {
	getHTMLElement,
	getFormData,
} = require('../dom');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Filter {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static onClickActive(filter) {
		filter.classList.toggle('filter_active');
	}

	static onSubmit(form, btnSubmit, even) {
		even.preventDefault();
		btnSubmit.classList.add('button_inactive');
		const res = getFormData(form);
		btnSubmit.classList.remove('button_inactive');
		return res;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(filterId, filterBtnId) {
		this.filter = getHTMLElement(document, filterId, 'id');
		this.btnActive = getHTMLElement(this.filter, `#${filterBtnId}`, 'tag');
		this.form = getHTMLElement(this.filter, 'form', 'tag');
		this.btnSubmit = getHTMLElement(this.form, 'button[type="submit"]', 'tag');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	start(callback) {
		this.btnActive.onclick = () => Filter.onClickActive(this.filter);
		this.form.onsubmit = (even) => {
			const res = Filter.onSubmit(this.form, this.btnSubmit, even);
			callback && callback(res);
		};
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Filter;
