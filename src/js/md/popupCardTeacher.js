// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP CARD TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class PopupCardTeacher extends Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static createDataElms() {
		return {
			age: null,
			sex: null,
			// map: null,
			city: null,
			email: null,
			// color: null,
			mobile: null,
			// photo: null,
			country: null,
			comment: null,
			fullname: null,
		};
	}

	static initHTMLElms(root, prefix) {
		const elms = PopupCardTeacher.createDataElms();
		Object.keys(elms).forEach((field) => {
			elms[field] = Popup.getHTMLElement(root, `${prefix}${field}`, 'class');
		});
		return elms;
	}

	static setDataInElms(elms, data) {
		Object.keys(elms).forEach((field) => {
			elms[field].innerText = data[field];
		});
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId, prefix) {
		super(wrapperId, popupId);
		this.prefix = prefix;
		// ==
		this.isFavorite = false;
		this.favorite = Popup.getHTMLElement(this.popup, 'favorite', 'class');
		this.btnFavorite = Popup.getHTMLElement(this.favorite, 'svg', 'tag');
		// ==
		this.color = Popup.getHTMLElement(this.popup, `infocard`, 'class');
		this.mapBox = Popup.getHTMLElement(this.popup, `map`, 'class');
		this.map = Popup.getHTMLElement(this.mapBox, `${prefix}map`, 'class');
		this.photo = Popup.getHTMLElement(this.popup, `${prefix}photo`, 'class');
		// ==
		this.elms = PopupCardTeacher.initHTMLElms(this.popup, prefix);
		this.data = PopupCardTeacher.createDataElms();
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	initFavorite({ addFun, removeFun }) {
		this.btnFavorite.onclick = () => {
			if (this.isFavorite) {
				this.isFavorite = false;
				this.favorite.classList.remove('favorite_true');
				removeFun();
			} else {
				this.isFavorite = true;
				this.favorite.classList.add('favorite_true');
				addFun();
			}
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setData(data) {
		Object.keys(this.data).forEach((field) => {
			this.data[field] = data[field] ? data[field] : null;
		});
	}

	initData({ color, map, photo }) {
		PopupCardTeacher.setDataInElms(this.elms, this.data);
		this.color.setAttribute('data-color', color);
		this.map.setAttribute('data-src', map);
		this.photo.setAttribute('src', photo);
		this.mapBox.removeAttribute('open');
		this.isFavorite
			? this.favorite.classList.add('favorite_true')
			: this.favorite.classList.remove('favorite_true');
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupCardTeacher;
