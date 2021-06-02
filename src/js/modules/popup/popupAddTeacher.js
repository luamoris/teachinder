// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const DomHelper = require('../../helpers/dom.helper');

const { getFormData } = require('../dom');

const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP ADD TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class PopupAddTeacher extends Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId) {
		super(wrapperId, popupId);
		this.form = DomHelper.getElement({ root: this.popup, type: 'class', selector: 'form' });
		this.btnSubmit = DomHelper.getElement({ root: this.form, type: 'class', selector: 'form__button' });
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	addButtons(...arg) {
		arg.forEach((btn) => {
			if (!(btn instanceof HTMLElement)) throw Error('Not an HTML element.');
			btn.onclick = () => this.init();
		});
	}

	applySubmit(callback) {
		this.btnSubmit.onclick = () => {
			if (!this.form.checkValidity()) return false;
			const data = getFormData(this.form);
			callback && callback(data);
			this.deinit();
			this.form.reset();
		};
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupAddTeacher;
