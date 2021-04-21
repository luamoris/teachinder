'use strict';

function BurgerMenu(className) {
	if (!new.target) { return new BurgerMenu(className); }
	// ===
	const menus = document.querySelectorAll(`.${className}`);

	const activation = (burgerMenu) => {
		burgerMenu.parentNode.classList.add('menu_active');
		document.body.classList.add('menu_active');
	};

	const deactivation = (burgerMenu) => {
		burgerMenu.parentNode.classList.remove('menu_active');
		document.body.classList.remove('menu_active');
	};

	this.start = () => {
		for (const menu of menus) {
			const cancel = menu.querySelector('.close');
			const burger = menu.querySelector('.burger');
			burger.onclick = () => activation(burger);
			cancel.onclick = () => deactivation(burger);
			// ===
			const menuLinks = menu.querySelectorAll('.menu__link');
			for (const link of menuLinks) {
				console.log(link);
				link.onclick = () => deactivation(burger);
			}
		}
	};
}

const menuBurger = new BurgerMenu('menu');
menuBurger.start();

// FILTER

const filter = document.querySelector('.filter');
const btnFilter = filter.querySelector('.filter__title');

btnFilter.onclick = () => {
	filter.classList.toggle('filter_active');
};
