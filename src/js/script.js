// require
const Process = require('./process');

// data
const { randomUserMock, additionalUsers } = require('./mock');

// code
const users = Process.usersFormatting([...randomUserMock, ...additionalUsers]);
console.log(users);

function PopupUserCard(id) {
	if (!new.target) { return new PopupUserCard(id); }
	// ===
	const body = document.querySelector('body');
	const modal = document.getElementById(id);
	// ===
	const data = {
		color: modal.querySelector('.infocard'),
		img: modal.querySelector('.photo-conteiner img'),
		fullname: modal.querySelector('.person__fullname'),
		country: modal.querySelector('.person__country'),
		city: modal.querySelector('.person__city'),
		age: modal.querySelector('.person__age'),
		sex: modal.querySelector('.person__sex'),
		email: modal.querySelector('.person__email'),
		mobile: modal.querySelector('.person__mobile'),
		description: modal.querySelector('.description'),
		map: modal.querySelector('.map a'),
	};
	// ===
	const start = () => {
		modal.style.display = 'flex';
		modal.setAttribute('open', 'open');
		body.classList.add('_dialog');
	};

	const stop = () => {
		modal.style.display = 'none';
		modal.removeAttribute('open');
		body.classList.remove('_dialog');
	};

	const cancel = modal.querySelector('.cancel');
	cancel.onclick = stop;

	const setData = (user) => {
		data.color.dataset.color = user.bg_color;
		data.img.setAttribute('src', user.picture_large);
		data.fullname.innerText = user.full_name;
		data.country.innerText = `${user.country}, `;
		data.city.innerText = user.state;
		data.age.innerText = user.age;
		data.sex.innerText = user.title.charAt(0);
		data.email.innerText = user.email;
		data.mobile.innerText = user.phone;
		data.description.innerText = user.note;
		data.map.dataset.src = 'https://www.google.com/maps/';
	};

	return { setData, start, stop };
}

const modalUserCard = new PopupUserCard('infocardTeacher');

function clickTopUser(user) {
	modalUserCard.setData(user);
	modalUserCard.start();
}

const createTopUser = (user) => {
	const userElement = document.createElement('div');
	userElement.classList.add('teachers__item');
	userElement.onclick = () => clickTopUser(user);
	userElement.innerHTML = `
		<div class="circle__frame">
			<div class="circle">
				<img
					src="${user.picture_large || '../img/person.svg'}"
					alt="This is a portrait of a ${user.full_name}."
				>
			</div>
		</div>
		<div class="teachers__name">
			${user.full_name.replace(/\s/, '<br>')}
		</div>
		<div class="teachers__country">
			${user.country}
		</div>
	`;
	return userElement;
};

const teachers = document.getElementById('teachers');
const teachersList = teachers.querySelector('.teachers__list');

users.forEach((user) => {
	const userHTML = createTopUser(user);
	teachersList.appendChild(userHTML);
});
