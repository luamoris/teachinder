// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Process = require('./process');

const Filter = require('./md/filter');
const Teacher = require('./md/teacher');
const TeachersFavorite = require('./md/teachersFavorite');
const PopupCardTeacher = require('./md/popupCardTeacher');
const PopupCreateTeacher = require('./md/popupCreateTeacher');

const { randomUserMock, additionalUsers } = require('../data/mock');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~
const popupCardTeacher = new PopupCardTeacher('wrapper', 'teachinderInfocard', 'person__');
const teachersFavorite = new TeachersFavorite();

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~
const topTeachersElm = document.getElementById('topTeachersListBox');
let topTeacherUl = document.createElement('ul');

const teacherFavoriteElm = document.getElementById('favoriteTeachersList');
const teacherFavoriteMax = 4;
let teacherFavoriteCount = 0;

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~

function createTeacher(data) {
	const teacher = new Teacher({
		id: data.id,
		age: data.age,
		sex: data.gender,
		city: data.state,
		email: data.email,
		mobile: data.phone,
		course: data.course,
		country: data.country,
		comment: data.note,
		fullname: data.full_name,
		map: null,
		color: data.bg_color,
		photo: data.picture_large,
		favorite: data.favorite,
	});
	return teacher;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILTER

const filter = new Filter('.filter');
filter.start();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP ADD TEACHER

const popupCreateTeacher = new PopupCreateTeacher('wrapper', 'teachinderCreateTeacher');
popupCreateTeacher.setButtonsActive(
	...document.querySelectorAll('.menu__button'),
);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHER

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~

function addFavorite(teacher) {
	teacher.Favorite = true;
	teacher.MainElement.classList.add('teachers_favorite');
	teachersFavorite.add(teacher.Id, teacher);
	if (teacherFavoriteCount < teacherFavoriteMax) {
		const favoriteElement = teacher.FavoriteElement;
		favoriteElement.onclick = teacher.MainElement.onclick;
		teacherFavoriteElm.appendChild(favoriteElement);
		teacherFavoriteCount++;
	}
}

function removeFavorite(teacher) {
	teacher.Favorite = false;
	teacher.MainElement.classList.remove('teachers_favorite');
	teachersFavorite.remove(teacher.Id);
	if (teacherFavoriteCount > 0) {
		const favoriteElement = teacher.FavoriteElement;
		teacherFavoriteElm.removeChild(favoriteElement);
		teacherFavoriteCount--;
	}
}

function onClickTeacher(teacher) {
	popupCardTeacher.setData(teacher.Data);
	// ===
	popupCardTeacher.isFavorite = teacher.Favorite;
	popupCardTeacher.initFavorite({
		addFun: () => addFavorite(teacher),
		removeFun: () => removeFavorite(teacher),
	});
	// ===
	popupCardTeacher.initData({
		color: teacher.Attrs.color,
		map: teacher.Attrs.map,
		photo: teacher.Attrs.photo,
	});
	popupCardTeacher.init();
}

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~

function setTeacherOnPage(teachers) {
	topTeacherUl = document.createElement('ul');
	topTeacherUl.classList.add('teachers');
	teachers.forEach((teacher) => {
		const mainElement = teacher.MainElement;
		mainElement.onclick = () => onClickTeacher(teacher);
		topTeacherUl.appendChild(mainElement);
		teacher.Favorite && addFavorite(teacher);
	});
	if (topTeachersElm.firstChild) {
		topTeachersElm.removeChild(topTeachersElm.firstChild);
	}
	if (teachers.length > 0) {
		topTeachersElm.appendChild(topTeacherUl);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~
const teacherDataList = Process.usersFormatting([...randomUserMock, ...additionalUsers]);
const teachersList = teacherDataList.map(createTeacher);

// ~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~

setTeacherOnPage(teachersList);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let NewTeacherId = 1;
const getNewTeacherId = () => `START${1000000 + NewTeacherId++}`;

popupCreateTeacher.initAdd((data) => {
	const startDate = new Date();
	const endDate = new Date(data.date);
	// ===
	const teacher = new Teacher({
		id: getNewTeacherId(),
		age: startDate.getUTCFullYear() - endDate.getUTCFullYear(),
		sex: data.sex,
		city: data.city,
		email: data.email,
		mobile: data.mobile,
		course: null,
		country: data.country,
		comment: null,
		fullname: data.fullname,
		map: null,
		color: data.color,
		photo: null,
		favorite: false,
	});
	const mainElement = teacher.MainElement;
	mainElement.onclick = () => onClickTeacher(teacher);
	topTeacherUl.appendChild(mainElement);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SEARCH

const searchForm = document.getElementById('headerSearch');
searchForm.onsubmit = (even) => {
	even.preventDefault();
	const searchText = searchForm.querySelector('input[name=search]').value;
	const ageArr = searchText
		.replace(/[^\d\s]/g, '')
		.split(' ')
		.filter(Boolean)
		.map((item) => parseInt(item));
	console.log(ageArr);
	searchForm.reset();
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILTER

const filterForm = document.querySelector('.filter .options__body');
const filterButton = filterForm.querySelector('button[type="submit"]');

filterForm.onsubmit = (even) => {
	even.preventDefault();
	filterButton.classList.add('button_loading');
	// ===
	// const ageInput = filterForm.querySelector('input[name="age"]');
	const countryInput = filterForm.querySelector('select[name="country"]');
	// const maleInput = filterForm.querySelector('input[name="male"]');
	// const femaleInput = filterForm.querySelector('input[name="female"]');
	// const favoriteInput = filterForm.querySelector('input[name="favorite"]');
	// ===
	const teacherFilter = Process.FilterUsers(teacherDataList, {
		country: countryInput.value,
	});
	const teachersListFilter = teacherFilter.map(createTeacher);
	setTeacherOnPage(teachersListFilter);
	// ===
	filterButton.classList.remove('button_loading');
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
