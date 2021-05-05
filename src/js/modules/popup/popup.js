// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static getHTMLElement(root, selector, type) {
		let element = null;
		if (type === 'class') {
			element = root.querySelector(`.${selector}`);
		} else if (type === 'id') {
			element = root.getElementById(selector);
		} else if (type === 'tag') {
			element = root.querySelector(selector);
			if (element instanceof SVGElement) return element;
		}
		// ===
		if (element instanceof HTMLElement) return element;
		throw Error(`An element "${selector}" with this ${type} was not found.`);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId) {
		this.wrapper = Popup.getHTMLElement(document, wrapperId, 'id');
		this.popup = Popup.getHTMLElement(document, popupId, 'id');
		this.close = Popup.getHTMLElement(this.popup, 'close', 'class');
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
