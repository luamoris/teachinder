// ================= START

;(() => {
	'use strict';

	// ======================================================= MODULES
	const BurgerMenu = require('./modules/burger');
	const Filter = require('./modules/filter');

	// ============================ BURGER MENU
	const menuElms = document.querySelectorAll('.menu');
	menuElms.forEach((menu) => {
		const burgerMenu = new BurgerMenu(menu);
		burgerMenu.start();
	});

	// ============================ FILTER
	const filterElm = document.querySelector('.filter');
	const filter = new Filter(filterElm);
	filter.start();

	// ============================ TEACHERS
	require('./teachers');

	// ============================ MAIN
})();
