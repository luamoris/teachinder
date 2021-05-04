// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REQUIRE

// MODULES
const TeachersList = require('./test-modules/teachers/teachersList');

// FUNCTIONS
const Process = require('./process');

// DATA
const { randomUserMock, additionalUsers } = require('../data/mock');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM ELEMENTS

const topTeachersElm = document.getElementById('topTeachersListBox');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ JS VARIABLES

const teacherDataList = Process.usersFormatting([...randomUserMock, ...additionalUsers]);
const teachersList = new TeachersList(teacherDataList);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

topTeachersElm.appendChild(teachersList.ListElements);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
