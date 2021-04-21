'use strict';

function Infocard(id, { prefix, picture, map, textClasses }) {
	if (!new.target) { return new Infocard(id, { prefix, picture, map, textClasses }); }
	const getClass = (className) => `.${prefix}${className}`;
	// =========================================== CONSTANTS
	const body = document.querySelector('body');
	const modal = document.getElementById(id);
	const infocard = modal.querySelector('.infocard');
	const btnClose = infocard.querySelector('.close');
	// =========================================== MODAL DATA
	const colorEl = infocard;
	const pictureEl = infocard.querySelector(getClass(picture));
	const mapEl = infocard.querySelector(getClass(map));
	const textEls = Object.keys(textClasses).reduce((obj, key) => {
		obj[key] = infocard.querySelector(getClass(textClasses[key]));
		return obj;
	}, {});
	// =========================================== INTERFACE

	this.start = () => {
		btnClose.onclick = this.stop;
		modal.style.display = 'flex';
		modal.setAttribute('open', 'open');
		body.classList.add('_dialog');
	};

	this.stop = () => {
		modal.style.display = 'none';
		modal.removeAttribute('open');
		body.classList.remove('_dialog');
	};

	this.setData = (user) => {
		Object.keys(textClasses)
			.forEach((key) => { user[key] && (textEls[key].innerText = user[key]); });
		mapEl.setAttribute('data-src', 'https://www.google.com/maps/');
		user.bg_color && colorEl.setAttribute('data-color', user.bg_color);
		user.picture_large && pictureEl.setAttribute('src', user.picture_large);
	};
}

module.exports = Infocard;
