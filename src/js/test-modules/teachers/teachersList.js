// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const PopupCardTeacher = require('../popup/popupCardTeacher');
const TeacherFavoriteList = require('./teacherFavoriteList');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHERS LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const popupCardTeacher = new PopupCardTeacher('wrapper', 'teachinderInfocard', 'person__');
const teacherFavoriteList = new TeacherFavoriteList('favoriteTeachersList');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TeachersList {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static createHtmlTeacher(teacher) {
		const fullname = teacher.full_name.replace(/\s/, '<br>');
		const initials = teacher.full_name.split(' ').reduce((res, item) => `${res}${item.charAt(0)}.`, '');
		const country = teacher.country || 'world';
		const photo = teacher.picture_large
			? `<div class="avatar__picture"><img src="${teacher.picture_large}"></div>`
			: `<div class="avatar__initials"><h3>${initials}</h3></div>`;
		let html = '';
		html += `<div class="avatar">${photo}</div>`;
		html += `<h3 class="teachers__name">${fullname}</h3>`;
		html += `<h5 class="teachers__country">${country}</h5>`;
		return html;
	}

	static createLiElement(teacher) {
		const className = `teachers__item ${teacher.favorite ? 'teachers_favorite' : ''}`;
		const liElm = document.createElement('li');
		liElm.className = className.trim();
		liElm.innerHTML = TeachersList.createHtmlTeacher(teacher);
		liElm.onclick = () => TeachersList.onClickLiElement(liElm, teacher);
		return liElm;
	}

	static onClickLiElement(liElm, teacher) {
		popupCardTeacher.setTeacherData(teacher);
		popupCardTeacher.favCallback = () => teacherFavoriteList
			.onClick(TeachersList.createLiElement(teacher), teacher);
		popupCardTeacher.init();
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor(teachers) {
		this.teachers = teachers;
		this.listElms = null;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get ListElements() {
		if (!this.listElms) {
			this.listElms = document.createElement('ul');
			this.listElms.classList.add('teachers');
			this.teachers.forEach((teacher) => {
				const teacherLiElm = TeachersList.createLiElement(teacher);
				this.listElms.appendChild(teacherLiElm);
			});
		}
		return this.listElms;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeachersList;
