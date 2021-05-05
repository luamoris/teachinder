// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP CARD TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class PopupCardTeacher extends Popup {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static setDataInElms(elms, data) {
		Object.keys(elms).forEach((field) => {
			elms[field].innerText = data[field];
		});
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(wrapperId, popupId, prefix) {
		super(wrapperId, popupId);
		this.prefix = prefix;
		this.teacher = null;
		// ~~~
		this.favCallback = null;
		this.favContainer = Popup.getHTMLElement(this.popup, 'favorite', 'class');
		this.favBtn = Popup.getHTMLElement(this.favContainer, 'svg', 'tag');
		this.favBtn.onclick = () => {
			if (!this.teacher) return;
			this.teacher.favorite = !this.teacher.favorite;
			this.teacher.favorite
				? this.favContainer.classList.add('favorite_true')
				: this.favContainer.classList.remove('favorite_true');
			if (this.favCallback) this.favCallback();
		};
		// ~~~
		this.attrElms = {
			map: Popup.getHTMLElement(this.popup, `${prefix}map`, 'class'),
			mapBox: Popup.getHTMLElement(this.popup, 'map', 'class'),
			photo: Popup.getHTMLElement(this.popup, `${prefix}photo`, 'class'),
			color: Popup.getHTMLElement(this.popup, 'infocard', 'class'),
		};
		// ~~~
		this.dataElms = {
			age: Popup.getHTMLElement(this.popup, `${prefix}age`, 'class'),
			gender: Popup.getHTMLElement(this.popup, `${prefix}sex`, 'class'),
			state: Popup.getHTMLElement(this.popup, `${prefix}city`, 'class'),
			email: Popup.getHTMLElement(this.popup, `${prefix}email`, 'class'),
			phone: Popup.getHTMLElement(this.popup, `${prefix}mobile`, 'class'),
			country: Popup.getHTMLElement(this.popup, `${prefix}country`, 'class'),
			note: Popup.getHTMLElement(this.popup, `${prefix}comment`, 'class'),
			full_name: Popup.getHTMLElement(this.popup, `${prefix}fullname`, 'class'),
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setTeacherData(teacher, mapUrl = null) {
		this.teacher = teacher;
		PopupCardTeacher.setDataInElms(this.dataElms, teacher);
		this.attrElms.map.setAttribute('data-src', mapUrl || 'https://www.google.com/maps');
		this.attrElms.photo.setAttribute('src', teacher.picture_large || './img/person.svg');
		this.attrElms.color.setAttribute('data-color', teacher.bg_color || '#65A3BE');
		this.attrElms.mapBox.removeAttribute('open');
		teacher.favorite
			? this.favContainer.classList.add('favorite_true')
			: this.favContainer.classList.remove('favorite_true');
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupCardTeacher;
