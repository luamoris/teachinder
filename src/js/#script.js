;(() => {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REQUIRE

	// MODULES
	const Filter = require('./modules/filter/filter');
	const MenuBurger = require('./modules/menu/burger');
	const TeachersList = require('./modules/teachers/teachersList');
	const PopupAddTeacher = require('./modules/popup/popupAddTeacher');

	// DATA
	const { randomUserMock, additionalUsers } = require('../data/mock');

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM ELEMENTS

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ JS VARIABLES

	const filter = new Filter('mainFilter', 'mainFilterBtn');
	const headerMenuBurger = new MenuBurger('headerMenu', 'headerMenuBurger');
	const footerMenuBurger = new MenuBurger('footerMenu', 'footerMenuBurger');
	const popupAddTeacher = new PopupAddTeacher('wrapper', 'teachinderCreateTeacher');
	const teachersList = new TeachersList('topTeachersListBox', [...randomUserMock, ...additionalUsers]);

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTION

	function createFilterOpts(data) {
		const opts = {};
		if (data.country) {
			opts.country = data.country;
		}
		if (data.age) {
			opts.age = parseInt(data.age);
		}
		if (data.male && !data.female) {
			opts.gender = 'M';
		} else if (data.female && !data.male) {
			opts.gender = 'F';
		}
		if (data.favorite) {
			opts.favorite = data.favorite;
		}
		return opts;
	}

	function createTeacher(teacherData) {
		Object.keys(teacherData).forEach((field) => {
			teacherData[field] = teacherData[field].trim();
		});
		const today = new Date();
		const b_day = new Date(teacherData.b_day);
		teacherData.b_day = b_day.toISOString();
		teacherData.age = today.getFullYear() - b_day.getFullYear();
		teachersList.add(teacherData);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

	teachersList.setListElements();
	popupAddTeacher.callback = (teacherData) => createTeacher(teacherData);
	popupAddTeacher.addButtons(...document.querySelectorAll('.menu__button'));
	filter.start((res) => {
		const opts = createFilterOpts(res);
		teachersList.applyFilterElements(opts);
	});

	headerMenuBurger.init();
	footerMenuBurger.init();

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
})();
