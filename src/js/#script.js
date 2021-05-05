;(() => {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REQUIRE

	// MODULES
	const TeachersList = require('./modules/teachers/teachersList');

	// FUNCTIONS
	const Process = require('./process');

	// DATA
	const { randomUserMock, additionalUsers } = require('../data/mock');

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM ELEMENTS

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ JS VARIABLES

	const teacherDataList = Process.usersFormatting([...randomUserMock, ...additionalUsers]);
	const teachersList = new TeachersList('topTeachersListBox', teacherDataList);

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

	teachersList.applyListElements();

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
})();
