(async () => {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REQUIRE

	// API
	const TeachersAPI = require('./api/teachers.api');

	// MODULES
	const Filter = require('./modules/filter/filter');
	const Search = require('./modules/search/search');
	const MenuBurger = require('./modules/menu/burger');
	const TeachersList = require('./modules/teachers/teachersList');
	const PopupAddTeacher = require('./modules/popup/popupAddTeacher');

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM ELEMENTS

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ JS VARIABLES

	// DATA
	const teacherApi = new TeachersAPI({ seed: 'teachinder' });
	const randomTeachers = await teacherApi.getByQuantity({ quantity: 50 });

	const filter = new Filter('mainFilter', 'mainFilterBtn');
	const searcher = new Search('headerSearch');
	const headerMenuBurger = new MenuBurger('headerMenu', 'headerMenuBurger');
	const footerMenuBurger = new MenuBurger('footerMenu', 'footerMenuBurger');
	const popupAddTeacher = new PopupAddTeacher('wrapper', 'teachinderCreateTeacher');
	const teachersList = new TeachersList('topTeachersListBox', [...randomTeachers]);

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

	function createSearchOpts(data) {
		const res = {};
		Object.keys(data).forEach((field) => {
			if (field === 'age') {
				data[field] && (res[field] = parseInt(data[field]));
			} else {
				data[field] && (res[field] = data[field]);
			}
		});
		return res;
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

	function getCountryCode(country) {
		const countries = {
			'Denmark': 'de',
			'Estonia': 'es',
			'Norway': 'no',
			'Finland': 'fi',
		};

		return countries[country];
	}

	function createQueryOptions(opts) {
		const results = {};
		const { age, country, gender } = opts;
		if (gender) {
			results.gender = gender === 'F' ? 'female' : 'male';
		}
		if (country) {
			results.nat = getCountryCode(country);
		}
		if (age) {
			results.age = age;
		}
		return results;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

	teachersList.setListElements();
	popupAddTeacher.callback = (teacherData) => createTeacher(teacherData);
	popupAddTeacher.addButtons(...document.querySelectorAll('.menu__button'));
	filter.start(async (res) => {
		const opts = createFilterOpts(res);
		teachersList.applyFilterElements(opts);

		console.log(opts);

		const filterOptions = createQueryOptions(opts);
		console.log(filterOptions);
		const resTeacherApi = await teacherApi.getByFilter({
			page: 1,
			limit: 10,
			filterOptions,
		});
		console.log(resTeacherApi);
	});
	searcher.start((res) => {
		const opts = createSearchOpts(res);
		teachersList.applySearchElements(opts);
	});

	headerMenuBurger.init();
	footerMenuBurger.init();

	// more

	let countTeacher = randomTeachers.length;
	const MAX_TEACHER = 100;

	teachersList.activeMore(() => {
		const limit = 10;
		countTeacher += limit;
		const page = Math.ceil(countTeacher / 10);
		return Promise.resolve()
			.then(() => teacherApi.getPageLimit({ page, limit }))
			.then((teachers) => {
				teachersList.addTeachers(teachers);
				if (countTeacher === MAX_TEACHER) {
					return Promise.resolve({ ok: false });
				}
				return Promise.resolve({ ok: true });
			})
			.catch((error) => {
				console.error('Error: ', error);
			});
	});

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
})();
