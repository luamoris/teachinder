;(() => {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REQUIRE

	// MODULES
	const Filter = require('./modules/filter/filter');
	const TeachersList = require('./modules/teachers/teachersList');

	// DATA
	const { randomUserMock, additionalUsers } = require('../data/mock');

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM ELEMENTS

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ JS VARIABLES

	const filter = new Filter('mainFilter', 'mainFilterBtn');
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

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

	teachersList.setListElements();
	filter.start((res) => {
		const opts = createFilterOpts(res);
		teachersList.applyFilterElements(opts);
	});

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
})();
