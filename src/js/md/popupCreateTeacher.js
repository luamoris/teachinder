// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP CREATE TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class PopupCreateTeacher extends Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor(wrapperId, popupId) {
		super(wrapperId, popupId);
		this.form = Popup.getHTMLElement(this.popup, 'form', 'class');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setButtonsActive(...arg) {
		arg.forEach((btn) => {
			if (btn instanceof HTMLElement) {
				btn.onclick = () => this.init();
			} else {
				throw Error('Not an HTML element.');
			}
		});
	}

	getFormData() {
		const inputs = this.form.querySelectorAll('input');
		const selects = this.form.querySelectorAll('select');
		const data = {};
		inputs.forEach((input) => {
			if (input.type === 'radio' && !input.checked) return;
			data[input.name] = input.value;
		});
		selects.forEach((select) => {
			data[select.name] = select.querySelector('option:checked').value;
		});
		return data;
	}

	initAdd(callback) {
		this.form.onsubmit = (event) => {
			event.preventDefault();
			const data = this.getFormData();
			callback(data);
			this.deinit();
			this.form.reset();
		};
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupCreateTeacher;
