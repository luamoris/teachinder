// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const DomHelper = require('../../helpers/dom.helper');
const { getFormData } = require('../dom');

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
		this.filter = DomHelper.getElement({ type: 'id', selector: filterId });
		this.btnActive = DomHelper.getElement({ type: 'id', root: this.filter, selector: filterBtnId });
		this.form = DomHelper.getElement({ root: this.filter, selector: 'form' });
		this.btnSubmit = DomHelper.getElement({ root: this.form, selector: 'button[type="submit"]' });
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
