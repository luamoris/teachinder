// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const {
	getHTMLElement,
	getAllHTMLElement,
} = require('../dom');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BURGER MENU
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class BurgerMenu {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static active(menu) {
		document.body.classList.add('menu_active');
		menu.classList.add('menu_active');
	}

	static close(menu) {
		menu.classList.remove('menu_active');
		document.body.classList.remove('menu_active');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(menuId, burgerId) {
		this.menu = getHTMLElement(document, menuId, 'id');
		this.burger = getHTMLElement(document, burgerId, 'id');
		this.links = getAllHTMLElement(this.menu, 'menu__link', 'class');
		this.btnClose = getHTMLElement(this.menu, 'close', 'class');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	init() {
		this.burger.onclick = () => BurgerMenu.active(this.menu);
		this.btnClose.onclick = () => BurgerMenu.close(this.menu);
		this.links.forEach((link) => { link.onclick = () => BurgerMenu.close(this.menu); });
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = BurgerMenu;
