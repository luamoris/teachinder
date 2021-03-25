/* =======================================================
	Require
========================================================== */

const { randomUserMock, additionalUsers } = require('./mock.js');

/* =======================================================
	Functions
========================================================== */

const {
	DataFormatting,
	// Validation
	validString,
	validIsInteger,
	validIsEmail,
	validIsPhoneNumber,
	// Filtration
	FilterUsers,
	// Sorting
	anyCompare,
	dateCompare,
	validTemplateSort,
	// Search
	SearchUser,
	// Percent
	GetPercentItemsSearch,
} = require('./main');

/* =======================================================
	!. Testing
========================================================== */

const getJSON = (element) => JSON.stringify(element, null, 1);

const assertTest = (number, condition, message = '# Oops!') => console.assert(condition, getJSON({ number, message }));

const catchError = (fun, arg1, arg2 = undefined) => {
	try {
		arg2 === undefined ? fun(arg1) : fun(arg1, arg2);
		return false;
	} catch (e) {
		return true;
	}
};

/* =======================================================
	2. Validation
========================================================== */

const dataTest = {
	string: {
		correct: ['Iosif', 'Иосиф', 'Іосіф'],
		incorrect: ['Iosif7', 'Ios#f', '7Iosif', '#Iosif', 'iosif', 'Иосиф7', 'Иосиф№', '2Иосиф', 'иосиф'],
	},
	integer: {
		correct: [1, 20, 45, 100],
		incorrect: [2.5, '2', '2.5', -2],
	},
	email: {
		correct: [
			'iosif@gmail.com', 'iosif@gmail.com.ua', 'iosif545@gmail.com',
			'iosif545@gmail.com.ua', 'io_0i@gmail.com', 'io_0i@main.com.ua',
		],
		incorrect: [
			'ios@ mail.com', 'ios @mail.com', 'ios mail.com', 'iosmail.com',
			'@mail.com', 'ios@.com', 'ios@com', 'fail ios@mail.com',
			'ios@mail.com fail', 'ios@mail com',
		],
	},
	number: [
		'0079-8291509', '071-558-2972', '02-6397-0344',
		'(720)-981-1014', '04-531-159', '02-7976-3904',
		'077 863 38 70', '06-843-874', '921-757-670',
		'36513745', '76565355', '07-130-008',
		'33373580', '907-066-616', '(210)-514-4881',
		'05-70-80-69-86', '61523239', '71350190',
		'04-421-028', '(938)-352-7475', '32189027',
		'17760878', '071-488-9968', '04-31-67-71-51',
		'078 059 73 14', '987-689-092', '(173)-797-7689',
		'(144)-684-1967', '(835)-586-6028', '03-39-75-54-47',
		'078 301 62 63', '(018)-382-5902', '67399596',
		'(903)-380-2376', '07190090', '02-33-67-58-40',
	],
};

for (let i = 0; i < dataTest.string.correct.length; i++) {
	assertTest(i + 200, validString(dataTest.string.correct[i]) === true, '# String correct: this string must be valid.');
}
for (let i = 0; i < dataTest.string.incorrect.length; i++) {
	assertTest(i + 200, validString(dataTest.string.incorrect[i]) === false, '# String incorrect: this string must be NOT valid.');
}
for (let i = 0; i < dataTest.integer.correct.length; i++) {
	assertTest(i + 200, validIsInteger(dataTest.integer.correct[i]) === true, '# Integer correct: this item must be valid.');
}
for (let i = 0; i < dataTest.integer.incorrect.length; i++) {
	assertTest(i + 200, validIsInteger(dataTest.integer.incorrect[i]) === false, '# Integer incorrect: this item must be NOT valid.');
}
for (let i = 0; i < dataTest.email.correct.length; i++) {
	assertTest(i + 200, validIsEmail(dataTest.email.correct[i]) === true, '# Email correct: this email must be valid.');
}
for (let i = 0; i < dataTest.email.incorrect.length; i++) {
	assertTest(i + 200, validIsEmail(dataTest.email.incorrect[i]) === false, '# Email incorrect: this email must be NOT valid.');
}
for (let i = 0; i < dataTest.number.length; i++) {
	assertTest(i + 200, validIsPhoneNumber(dataTest.number[i]) === true, '# This number must be valid.');
}

/* =======================================================
	3. Filtration
========================================================== */

const arrFilter = [
	{
		id: 1, country: 'Ukraine', age: 18, gender: 'M', favorite: false,
	},
	{
		id: 2, country: 'England', age: 22, gender: 'F', favorite: true,
	},
	{
		id: 3, country: 'Ukraine', age: 18, gender: 'M', favorite: false,
	},
	{
		id: 4, country: 'England', age: 32, gender: 'M', favorite: true,
	},
	{
		id: 5, country: 'Ukraine', age: 18, gender: 'F', favorite: false,
	},
	{
		id: 6, country: 'Poland', age: 22, gender: 'F', favorite: true,
	},
];

assertTest(300, FilterUsers(arrFilter, {}).length === 6);
assertTest(301, FilterUsers(arrFilter, { age: 32 }).length === 1);
assertTest(302, FilterUsers(arrFilter, { country: 'England', age: 56 }).length === 0);
assertTest(303, FilterUsers(arrFilter, {
	country: 'Ukraine', age: 18, gender: 'M', favorite: false,
}).length === 2);
assertTest(304, FilterUsers(arrFilter, { country: 'England', gender: 'F', favorite: true }).length === 1);

/* =======================================================
	4. Sorting
========================================================== */

assertTest(400, anyCompare(2, 2) === 0, '# Sorting any compare.');
assertTest(401, anyCompare(2, 5) === -1, '# Sorting any compare.');
assertTest(402, anyCompare(5, 2) === 1, '# Sorting any compare.');

assertTest(403, anyCompare(-2, 2) === -1, '# Sorting any compare.');
assertTest(404, anyCompare(2, -2) === 1, '# Sorting any compare.');

assertTest(405, anyCompare(-2, -2) === 0, '# Sorting any compare.');
assertTest(406, anyCompare(-4, -2) === -1, '# Sorting any compare.');
assertTest(407, anyCompare(-2, -4) === 1, '# Sorting any compare.');

assertTest(408, dateCompare('2020-07-31T21:57:32.876Z', '2020-07-31T21:57:32.876Z') === 0, '# Sorting date compare.');
assertTest(409, dateCompare('2020-07-31T21:57:32.876Z', '2019-07-31T21:57:32.876Z') === 1, '# Sorting date compare.');
assertTest(410, dateCompare('2019-07-31T21:57:32.876Z', '2020-07-31T21:57:32.876Z') === -1, '# Sorting date compare.');

assertTest(411, dateCompare('1970-07-31T21:57:32.876Z', '1970-07-31T21:57:32.876Z') === 0, '# Sorting date compare.');
assertTest(412, dateCompare('1971-07-31T21:57:32.876Z', '1970-07-31T21:57:32.876Z') === 1, '# Sorting date compare.');
assertTest(413, dateCompare('1970-07-31T21:57:32.876Z', '1971-07-31T21:57:32.876Z') === -1, '# Sorting date compare.');

assertTest(414, dateCompare('1111-07-31T21:57:32.876Z', '1111-07-31T21:57:32.876Z') === 0, '# Sorting date compare.');
assertTest(415, dateCompare('1900-07-31T21:57:32.876Z', '1890-07-31T21:57:32.876Z') === 1, '# Sorting date compare.');
assertTest(416, dateCompare('1890-07-31T21:57:32.876Z', '1900-07-31T21:57:32.876Z') === -1, '# Sorting date compare.');

assertTest(417, catchError(anyCompare, 2, '2') === true,
	'# Sorting any compare. Exception didnt work.');
assertTest(418, catchError(dateCompare, 2, '1890-07-31T21:57:32.876Z') === true,
	'# Sorting date compare. Exception didnt work.');
assertTest(419, catchError(dateCompare, '1890-07-31T21:57:32.876Z', '1890-42-31T21:57:32.876Z') === true,
	'# Sorting date compare. Exception didnt work.');

assertTest(420, catchError(validTemplateSort, { field: '', type: 'any', method: 'ASC' }) === true,
	'# Sorting valid template options sort. Exception didnt work.');
assertTest(421, catchError(validTemplateSort, { field: true, type: 'any', method: 'ASC' }) === true,
	'# Sorting valid template options sort. Exception didnt work.');
assertTest(422, catchError(validTemplateSort, { field: 'age', type: 'anym', method: 'ASC' }) === true,
	'# Sorting valid template options sort. Exception didnt work.');
assertTest(423, catchError(validTemplateSort, { field: 'age', type: 'any', method: 'ASCD' }) === true,
	'# Sorting valid template options sort. Exception didnt work.');

/* =======================================================
	5. Search
========================================================== */

const arrSearch = [
	{ name: 'iosif', note: 'hi hi', age: 18 },
	{ name: 'even', note: 'iv iv', age: 39 },
	{ name: 'even', note: 'gl gl', age: 39 },
	{ name: 'even', note: 'ev ev', age: 39 },
	{ name: 'ivan', note: 'iv iv', age: 76 },
];

assertTest(500,
	JSON.stringify(SearchUser(arrSearch, { name: 'even', note: 'gl gl' }))
		=== JSON.stringify({ name: 'even', note: 'gl gl', age: 39 }),
	'# Search : the item should have been found.');

assertTest(501,
	JSON.stringify(SearchUser(arrSearch, { note: 'iv iv', age: 76 }))
		=== JSON.stringify({ name: 'ivan', note: 'iv iv', age: 76 }),
	'# Search : the item should have been found.');

assertTest(501,
	SearchUser(arrSearch, { note: 'iracli', age: 18 }) === undefined,
	'# Search : the item should have NOT been found.');

assertTest(502,
	SearchUser(arrSearch, {}) === undefined,
	'# Search : the item should have NOT been found.');

/* =======================================================
	6. Percent
========================================================== */

const arrPercent = [
	{ name: 'iosif', note: 'hi hi', age: 18 },
	{ name: 'even', note: 'hi hi', age: 39 },
	{ name: 'even', note: 'hi hi', age: 39 },
	{ name: 'even', note: 'hi hi', age: 39 },
	{ name: 'even', note: 'hi hi', age: 76 },
	{ name: 'olivia', note: 'hi hi', age: 76 },
];

assertTest(602, GetPercentItemsSearch(arrPercent, { age: 100 }) === 0, '# Percent.');
assertTest(602, GetPercentItemsSearch(arrPercent, {}) === 0, '# Percent.');
assertTest(602, GetPercentItemsSearch(arrPercent, { name: 'olivia' }) === 16.666666666666668, '# Percent.');
assertTest(600, GetPercentItemsSearch(arrPercent, { age: 39 }) === 50, '# Percent.');
assertTest(601, GetPercentItemsSearch(arrPercent, { note: 'hi hi' }) === 100, '# Percent.');

/* =======================================================
	1. Array of objects
========================================================== */

const arr = DataFormatting(randomUserMock, additionalUsers);

assertTest(100, arr.length === 52, '# Array of objects.');
