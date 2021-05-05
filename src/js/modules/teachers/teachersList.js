// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const PopupCardTeacher = require('../popup/popupCardTeacher');
const TeacherFavoriteList = require('./teacherFavoriteList');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHERS LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Teacher Card Popup
const popupCardTeacher = new PopupCardTeacher('wrapper', 'teachinderInfocard', 'person__');

// Teacher Favorite List
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
		return liElm;
	}

	static createFavoritesLiElm(liElm, teacher) {
		const cloneTeacherLiEml = TeachersList.createLiElement(teacher);
		cloneTeacherLiEml.onclick = () => {
			liElm.classList.toggle('teachers_favorite');
			TeachersList.onClickLiElement(cloneTeacherLiEml, teacher);
		};
		return cloneTeacherLiEml;
	}

	static addTeacherToFavorites(liElm, teacher) {
		const cloneTeacherLiEml = TeachersList.createFavoritesLiElm(liElm, teacher);
		teacherFavoriteList.addTeacher(cloneTeacherLiEml, teacher.id);
		teacherFavoriteList.updateListElements();
	}

	static onClickFavorite(liElm, teacher) {
		liElm.classList.toggle('teachers_favorite');
		const cloneTeacherLiEml = TeachersList.createFavoritesLiElm(liElm, teacher);
		teacherFavoriteList.onClick(cloneTeacherLiEml, teacher);
	}

	static onClickLiElement(liElm, teacher) {
		popupCardTeacher.setTeacherData(teacher);
		popupCardTeacher.favCallback = () => TeachersList.onClickFavorite(liElm, teacher);
		popupCardTeacher.init();
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor(listId, teachers) {
		this.teachersElm = document.getElementById(listId);
		if (this.list instanceof HTMLElement) {
			throw Error(`An element with this id: ${listId} was not found.`);
		}
		this.teachers = teachers;
		this.listElm = null;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	applyListElements() {
		if (!this.listElm) {
			this.listElm = document.createElement('ul');
			this.listElm.classList.add('teachers');
			this.teachers.forEach((teacher) => {
				const teacherLiElm = TeachersList.createLiElement(teacher);
				teacherLiElm.onclick = () => TeachersList.onClickLiElement(teacherLiElm, teacher);
				this.listElm.appendChild(teacherLiElm);
				if (teacher.favorite) {
					TeachersList.addTeacherToFavorites(teacherLiElm, teacher);
				}
			});
		}
		this.teachersElm.appendChild(this.listElm);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeachersList;
