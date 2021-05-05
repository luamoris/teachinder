// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Process = require('../process');
const { getHTMLElement } = require('../dom');

const PopupCardTeacher = require('../popup/popupCardTeacher');
const TeacherFavoriteList = require('./teacherFavoriteList');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHERS LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Teacher Card Popup
const popupCardTeacher = new PopupCardTeacher('wrapper', 'teachinderInfocard', 'person__');

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
		liElm.dataset.id = teacher.id;
		liElm.className = className.trim();
		liElm.innerHTML = TeachersList.createHtmlTeacher(teacher);
		return liElm;
	}

	static getTeacherElement(listElm, teacherId) {
		let liElm = null;
		if (listElm) {
			listElm.childNodes.forEach((item) => {
				liElm = (item.dataset.id === teacherId) ? item : liElm;
			});
		}
		return liElm;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor(listId, teachers) {
		this.teachersElm = getHTMLElement(document, listId, 'id');
		this.teachers = Process.usersFormatting(teachers);
		this.teacherFavoriteList = new TeacherFavoriteList('favoriteTeachersList');
		this.listElm = null;
		this.listFiltered = null;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	createTeacherList(teachers) {
		const listElm = document.createElement('ul');
		listElm.classList.add('teachers');
		teachers.forEach((teacher) => {
			const teacherLiElm = TeachersList.createLiElement(teacher);
			teacherLiElm.onclick = () => this.onClickLiElement(teacher);
			listElm.appendChild(teacherLiElm);
		});
		return listElm;
	}

	createFavoritesLiElm(teacher) {
		const favoriteTeacherLiEml = TeachersList.createLiElement(teacher);
		favoriteTeacherLiEml.onclick = () => this.onClickLiElement(teacher);
		return favoriteTeacherLiEml;
	}

	onClickFavorite(isFavorite, teacher) {
		const mainLiElm = TeachersList.getTeacherElement(this.listElm, teacher.id);
		const filteredLiElm = TeachersList.getTeacherElement(this.listFiltered, teacher.id);
		if (isFavorite) {
			mainLiElm && mainLiElm.classList.add('teachers_favorite');
			filteredLiElm && filteredLiElm.classList.add('teachers_favorite');
			const cloneTeacherLiEml = this.createFavoritesLiElm(teacher);
			this.teacherFavoriteList.add(cloneTeacherLiEml);
		} else {
			mainLiElm && mainLiElm.classList.remove('teachers_favorite');
			filteredLiElm && filteredLiElm.classList.remove('teachers_favorite');
			this.teacherFavoriteList.remove(teacher.id);
		}
		this.teacherFavoriteList.updateListElements();
	}

	onClickLiElement(teacher) {
		popupCardTeacher.setTeacherData(teacher);
		popupCardTeacher.favCallback = (isFavorite) => this.onClickFavorite(isFavorite, teacher);
		popupCardTeacher.init();
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setListElements() {
		if (this.listElm) return;
		this.listElm = this.createTeacherList(this.teachers);
		this.listElm.firstChild && this.teachersElm.appendChild(this.listElm);
		this.teachers.forEach((teacher) => {
			if (teacher.favorite) {
				const teacherLiElm = this.createFavoritesLiElm(teacher);
				this.teacherFavoriteList.add(teacherLiElm);
				this.teacherFavoriteList.updateListElements();
			}
		});
	}

	applyFilterElements(opts = {}) {
		if (this.teachersElm.firstChild === this.listElm) {
			this.teachersElm.removeChild(this.listElm);
		} else if (this.teachersElm.firstChild === this.listFiltered) {
			this.teachersElm.removeChild(this.listFiltered);
		}
		const teacherFiltered = Process.FilterUsers(this.teachers, opts);
		this.listFiltered = this.createTeacherList(teacherFiltered);
		this.teachersElm.appendChild(this.listFiltered);
	}

	resetFilterElements() {
		if (this.teachersElm.firstChild === this.listElm) return;
		if (!this.listElm) {
			this.setListElements();
		}
		this.listFiltered && this.teachersElm.removeChild(this.listFiltered);
		this.teachersElm.appendChild(this.listElm);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeachersList;
