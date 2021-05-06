// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const { getHTMLElement } = require('../dom');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId) {
		this.wrapper = getHTMLElement(document, wrapperId, 'id');
		this.popup = getHTMLElement(document, popupId, 'id');
		this.close = getHTMLElement(this.popup, 'close', 'class');
		// ===
		this.subScroll = this.wrapper.querySelector('.scroll_hidden');
		if (!this.subScroll) {
			this.subScroll = document.createElement('div');
			this.subScroll.classList.add('scroll_hidden');
			this.wrapper.appendChild(this.subScroll);
		}
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	init() {
		const scrollWidth = window.innerWidth - document.body.clientWidth;
		this.subScroll.style.width = `${scrollWidth}px`;
		this.close.onclick = () => this.deinit();
		document.body.classList.add('popup_active');
		this.popup.setAttribute('open', 'true');
		setTimeout(() => {
			this.popup.classList.add('popup_active');
		}, 30);
	}

	deinit() {
		this.popup.classList.remove('popup_active');
		setTimeout(() => {
			this.popup.removeAttribute('open');
			document.body.classList.remove('popup_active');
		}, 230);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Popup;
