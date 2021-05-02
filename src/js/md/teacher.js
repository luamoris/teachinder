// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Teacher {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor({
		id,
		age,
		sex,
		city,
		email,
		mobile,
		course,
		country,
		comment,
		fullname,
		map,
		color,
		photo,
		favorite,
	}) {
		this.user = {
			id,
			course,
			text: { age, sex, city, email, mobile, country, comment, fullname },
			attrs: {
				map: map || 'https://www.google.com/maps',
				color: color || '#65A3BE',
				photo: photo || './img/person.svg',
			},
			favorite: favorite || false,
		};
		this.elements = {
			main: null,
			favorite: null,
		};
		this.isPhoto = Boolean(photo);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Id() {
		return this.user.id;
	}

	get Data() {
		return this.user.text;
	}

	get Attrs() {
		return this.user.attrs;
	}

	get Html() {
		const fullname = this.Data.fullname.replace(/\s/, '<br>');
		const initials = this.Data.fullname.split(' ').reduce((res, item) => `${res}${item.charAt(0)}.`, '');
		const country = this.Data.country || 'world';
		const photo = this.isPhoto
			? `<div class="avatar__picture"><img src="${this.Attrs.photo}"></div>`
			: `<div class="avatar__initials"><h3>${initials}</h3></div>`;
		let html = '';
		html += `<div class="avatar">${photo}</div>`;
		html += `<h3 class="teachers__name">${fullname}</h3>`;
		html += `<h5 class="teachers__country">${country}</h5>`;
		return html;
	}

	get Favorite() {
		return this.user.favorite;
	}

	set Favorite(value) {
		this.user.favorite = value;
	}

	get MainElement() {
		if (!this.elements.main) {
			this.elements.main = this.createLiElement();
		}
		return this.elements.main;
	}

	get FavoriteElement() {
		if (!this.elements.favorite) {
			this.elements.favorite = this.createLiElement();
		}
		return this.elements.favorite;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	createLiElement() {
		const className = `teachers__item ${this.user.favorite ? 'teachers_favorite' : ''}`;
		const liElm = document.createElement('li');
		liElm.className = className.trim();
		liElm.innerHTML = this.Html;
		return liElm;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Teacher;
