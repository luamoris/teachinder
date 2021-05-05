// ======================================================= BURGER MENU

/*
	Class Names
		close: class name burger close button
		burger: class name burger block menu
		menu__link: class name menu item link

	Modifiers
		menu_active: activated class modifier
*/

function BurgerMenu(menuElement) {
	// ===
	if (!new.target) { return new BurgerMenu(menuElement); }
	if (!(menuElement instanceof HTMLElement)) { throw Error('Element is not HTMLElement'); }

	// =========================================== Constants
	const activeMod = 'menu_active';
	const burger = menuElement.querySelector('.burger');
	const links = menuElement.querySelectorAll('.menu__link');
	const btnClose = menuElement.querySelector('.close');

	// ===

	const init = () => {
		document.body.classList.add(activeMod);
		menuElement.classList.add(activeMod);
	};

	const deinit = () => {
		menuElement.classList.remove(activeMod);
		document.body.classList.remove(activeMod);
	};

	// =========================================== Interface

	this.start = () => {
		burger.onclick = init;
		btnClose.onclick = deinit;
		links.forEach((link) => { link.onclick = deinit; });
	};
}

module.exports = BurgerMenu;
