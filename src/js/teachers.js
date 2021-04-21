;(() => {
	'use strict';

	// ======================================================= MODULES

	const Process = require('./process');
	const Infocard = require('./infocard');

	// ======================================================= DATA

	const { randomUserMock, additionalUsers } = require('./mock');

	// ======================================================= CONSTANTS

	// DATA API
	const users = Process.usersFormatting([...randomUserMock, ...additionalUsers]);

	// POPUP INFOCARD
	const popupInfocard = new Infocard('infocardTeacher', {
		prefix: 'person__',
		picture: 'picture',
		map: 'map',
		textClasses: {
			full_name: 'fullname',
			country: 'country',
			state: 'city',
			age: 'age',
			title: 'sex',
			email: 'email',
			phone: 'mobile',
			note: 'description',
		},
	});

	// HTML DOM ELEMENT
	const teachers = document.getElementById('teachers');
	const teachersList = teachers.querySelector('.teachers__list');

	// ======================================================= FUNCTIONS

	// ============================ HANDLERS

	// USER CLICK
	function clickTopUser(user) {
		popupInfocard.setData(user);
		popupInfocard.start();
	}

	// ============================ ANY

	// CREATE NEW USER HTML ELEMENT
	function createUserElement(userData) {
		const userElement = document.createElement('div');
		userElement.classList.add('teachers__item');
		userElement.onclick = () => clickTopUser(userData);
		// ===
		userElement.innerHTML = `
			<div class="circle__frame">
				<div class="circle">
					<img
						src="${userData.picture_large || '../img/person.svg'}"
						alt="This is a portrait of a ${userData.full_name}."
					>
				</div>
			</div>
			<div class="teachers__name">
				${userData.full_name.replace(/\s/, '<br>')}
			</div>
			<div class="teachers__country">
				${userData.country || 'residence unknown'}
			</div>
		`;
		return userElement;
	}

	// ======================================================= MAIN

	function start() {
		users.forEach((user) => {
			const userHTML = createUserElement(user);
			teachersList.appendChild(userHTML);
		});
	}

	start();
})();
