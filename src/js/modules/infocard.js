// ======================================================= INFOCARD

function Infocard(popupElement, classes) {
	if (!new.target) { return new Infocard(popupElement); }
	if (!(popupElement instanceof HTMLElement)) { throw Error('Element is not HTMLElement'); }

	// =========================================== Constants

	this.user = null;
	this.userElement = null;
	const infocard = popupElement.querySelector(classes.blocks.infocard);
	const favorite = popupElement.querySelector(classes.blocks.favorite);
	const btnClose = popupElement.querySelector(classes.blocks.btnClose);
	const btnFavorite = favorite.querySelector('svg');

	const scroll = document.querySelector('.scroll_hidden');

	// =========================================== Data

	const colorElm = infocard;
	const photoElm = infocard.querySelector(classes.dataset.photo);
	const mapElm = infocard.querySelector(classes.dataset.map);
	const textElms = Object.keys(classes.text).reduce((res, field) => {
		res[field] = infocard.querySelector(classes.text[field]);
		return res;
	}, {});

	// ===

	const clickFavorite = () => {
		if (this.user.favorite) {
			this.user.favorite = false;
			this.userElement.classList.remove(classes.modifiers.teachers);
			favorite.classList.remove(classes.modifiers.favorite);
		} else {
			this.user.favorite = true;
			this.userElement.classList.add(classes.modifiers.teachers);
			favorite.classList.add(classes.modifiers.favorite);
		}
	};

	// =========================================== Interface

	this.setUser = (user, userElm) => {
		this.user = user;
		this.userElement = userElm;
		this.user.picture_large = user.picture_large || './img/person.svg';
		this.user.bg_color = user.bg_color || '#65A3BE';
		const map = 'https://www.google.com/maps';
		// ===
		colorElm.setAttribute('data-color', this.user.bg_color);
		photoElm.setAttribute('src', this.user.picture_large);
		mapElm.setAttribute('data-src', map);
		// ===
		user.favorite ? favorite.classList.add(classes.modifiers.favorite)
			: favorite.classList.remove(classes.modifiers.favorite);
		// ===
		Object.keys(classes.text).forEach((field) => {
			textElms[field].innerText = user[field] ? user[field] : '-';
		});
	};

	this.start = () => {
		const scrollWidth = window.innerWidth - document.body.clientWidth;
		scroll.style.width = `${scrollWidth}px`;
		// ===
		btnClose.onclick = this.stop;
		btnFavorite.onclick = clickFavorite;
		document.body.classList.add(classes.modifiers.popup);
		popupElement.setAttribute('open', 'true');
		setTimeout(() => {
			popupElement.classList.add(classes.modifiers.popup);
		}, 30);
	};

	this.stop = () => {
		popupElement.classList.remove(classes.modifiers.popup);
		setTimeout(() => {
			popupElement.removeAttribute('open');
			document.body.classList.remove(classes.modifiers.popup);
		}, 230);
	};
}

module.exports = Infocard;
