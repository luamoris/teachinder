// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Leaflet = require('leaflet');
const Dayjs = require('dayjs');
const dayOfYear = require('dayjs/plugin/dayOfYear');

const DomHelper = require('../../helpers/dom.helper');
const { getHTMLElement } = require('../dom');
const Popup = require('./popup');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let MAP = null;
let MARKER = null;

function createMap({ latitude, longitude }) {
	const center = [latitude, longitude];
	if (MAP) {
		MAP.setView(center);
		MARKER.setLatLng(center);
	} else {
		MAP = Leaflet.map('personMap', { center, zoom: 11 });
		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			minZoom: '15',
		}).addTo(MAP);
		MARKER = Leaflet.marker(center, { draggable: true, title: '', opacity: 0.75 });
		MARKER.addTo(MAP);
	}
}

function getDayToBirthday(birthdayData) {
	Dayjs.extend(dayOfYear);
	const birthday = Dayjs(birthdayData);
	const today = Dayjs(new Date());

	const daysFromBirthday = birthday.dayOfYear();
	const daysFromToday = today.dayOfYear();

	const daysToBirthday = daysFromBirthday > daysFromToday
		? daysFromBirthday - daysFromToday
		: birthday.add(today.year() - birthday.year() + 1, 'year').diff(today, 'day');

	return daysToBirthday;
}

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
		this.favContainer = getHTMLElement(this.popup, 'favorite', 'class');
		this.favBtn = getHTMLElement(this.favContainer, 'svg', 'tag');
		this.favBtn.onclick = () => {
			if (!this.teacher) return;
			this.teacher.favorite = !this.teacher.favorite;
			this.teacher.favorite
				? this.favContainer.classList.add('favorite_true')
				: this.favContainer.classList.remove('favorite_true');
			if (this.favCallback) this.favCallback(this.teacher.favorite);
		};
		//
		this.btnMap = DomHelper.getElement({ root: this.popup, type: 'class', selector: 'map__btn' });
		// ~~~
		this.attrElms = {
			map: getHTMLElement(this.popup, `${prefix}map`, 'class'),
			mapBox: getHTMLElement(this.popup, 'map', 'class'),
			photo: getHTMLElement(this.popup, `${prefix}photo`, 'class'),
			color: getHTMLElement(this.popup, 'infocard', 'class'),
		};
		// ~~~
		this.birthday = getHTMLElement(this.popup, `${prefix}birthday`, 'class');
		this.dataElms = {
			age: getHTMLElement(this.popup, `${prefix}age`, 'class'),
			gender: getHTMLElement(this.popup, `${prefix}sex`, 'class'),
			state: getHTMLElement(this.popup, `${prefix}city`, 'class'),
			email: getHTMLElement(this.popup, `${prefix}email`, 'class'),
			phone: getHTMLElement(this.popup, `${prefix}mobile`, 'class'),
			country: getHTMLElement(this.popup, `${prefix}country`, 'class'),
			note: getHTMLElement(this.popup, `${prefix}comment`, 'class'),
			full_name: getHTMLElement(this.popup, `${prefix}fullname`, 'class'),
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setTeacherData(teacher, mapUrl = null) {
		this.teacher = teacher;
		PopupCardTeacher.setDataInElms(this.dataElms, teacher);
		this.btnMap.onclick = () => createMap({ ...mapUrl });
		this.attrElms.photo.setAttribute('src', teacher.picture_large || './img/person.svg');
		this.attrElms.color.setAttribute('data-color', teacher.bg_color || '#65A3BE');
		this.attrElms.mapBox.removeAttribute('open');
		this.birthday.innerText = teacher.b_date
			? getDayToBirthday(new Date(teacher.b_date))
			: 'infinity';
		teacher.favorite
			? this.favContainer.classList.add('favorite_true')
			: this.favContainer.classList.remove('favorite_true');
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = PopupCardTeacher;
