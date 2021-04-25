;(() => {
	'use strict';

	// ======================================================= TOP TEACHERS

	const Process = require('./process');
	const Infocard = require('./modules/infocard');

	const { randomUserMock, additionalUsers } = require('../data/mock');

	// ======================================================= CONSTANTS
	const users = Process.usersFormatting([...randomUserMock, ...additionalUsers]);

	// DOM API
	const popupInfocardElm = document.getElementById('teachinderInfocard');
	const topTeachersElm = document.querySelector('.top-teachers');

	// CLASSES STYLE
	const classes = {
		prefix: 'person__',
		blocks: {
			infocard: '.infocard',
			favorite: '.favorite',
			btnClose: '.close',
		},
		dataset: {
			photo: 'photo',
			map: 'map',
		},
		text: {
			full_name: 'fullname',
			country: 'country',
			state: 'city',
			age: 'age',
			gender: 'sex',
			email: 'email',
			phone: 'mobile',
			note: 'comment',
		},
		modifiers: {
			popup: 'popup_active',
			favorite: 'favorite_true',
			teachers: 'teachers_favorite',
		},
	};

	// ===
	const getClass = (prefix, className) => `.${prefix}${className}`;

	for (const item of Object.keys(classes.dataset)) {
		classes.dataset[item] = getClass(classes.prefix, classes.dataset[item]);
	}
	for (const item of Object.keys(classes.text)) {
		classes.text[item] = getClass(classes.prefix, classes.text[item]);
	}

	// INFOCARD
	const infocard = new Infocard(popupInfocardElm, classes);

	// ======================================================= FUNCTIONS

	function clickUserElement(userData, userElm) {
		infocard.setUser(userData, userElm);
		infocard.start();
	}

	function createAvatarHTML(user) {
		let res = '';
		if (user.picture_large) {
			const alt = `This is a portrait of a ${user.full_name}.`;
			res = `<div class="avatar__picture"><img src="${user.picture_large}" alt="${alt}"></div>`;
		} else {
			const initials = user.full_name.split(' ').reduce((str, item) => `${str}${item.charAt(0)}.`, '');
			res = `<div class="avatar__initials"><h3>${initials}</h3></div>`;
		}
		return `<div class="avatar">${res}</div>`;
	}

	function createFullnameHTML(user) {
		const fullname = user.full_name.replace(/\s/, '<br>');
		return `<h3 class="teachers__name">${fullname}</h3>`;
	}

	function createCountryHTML(user) {
		const country = user.country || '-';
		return `<h5 class="teachers__country">${country}</h5>`;
	}

	function createUserElement(user) {
		const userElm = document.createElement('li');
		userElm.classList.add('teachers__item');
		user.favorite && userElm.classList.add('teachers_favorite');
		userElm.innerHTML = `${createAvatarHTML(user)}${createFullnameHTML(user)}${createCountryHTML(user)}`;
		return userElm;
	}

	// ======================================================= MAIN

	function start() {
		const teacherList = document.createElement('ul');
		teacherList.classList.add('teachers');
		// ===
		users.forEach((user) => {
			const userElm = createUserElement(user);
			userElm.onclick = () => clickUserElement(user, userElm);
			teacherList.appendChild(userElm);
		});
		// ===
		topTeachersElm.appendChild(teacherList);
	}

	start();
})();
