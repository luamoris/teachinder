// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const {
	getHTMLElement,
	getFormData,
} = require('../dom');

const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP ADD TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class PopupAddTeacher extends Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId) {
		super(wrapperId, popupId);
		this.callback = null;
		this.form = getHTMLElement(this.popup, 'form', 'class');
		this.form.onsubmit = (event) => {
			event.preventDefault();
			const data = getFormData(this.form);
			this.callback && this.callback(data);
			this.deinit();
			this.form.reset();
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	addButtons(...arg) {
		arg.forEach((btn) => {
			if (!(btn instanceof HTMLElement)) throw Error('Not an HTML element.');
			btn.onclick = () => this.init();
		});
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupAddTeacher;
