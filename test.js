/* =======================================================
	!. Тестирование
========================================================== */

const {
	validString,
	validIsInteger,
	validIsEmail,
	validIsPhoneNumber,
	FilterUsers,
} = require('./main');

const getJSON = el => JSON.stringify(el, null, 1);
const assertTest = (number, condition, message = '# Oops!') => console.assert(condition, getJSON({number, message}));


/* =======================================================
	2. Валидация
========================================================== */

const dataTest = {
	string: {
		correct: ['Iosif', 'Иосиф', 'Іосіф'],
		incorrect: ['Iosif7', 'Ios#f','7Iosif', '#Iosif', 'iosif', 'Иосиф7', 'Иосиф№', '2Иосиф', 'иосиф'],
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

for(let i = 0; i < dataTest.string.correct.length; i++) {
	assertTest(i+1, validString(dataTest.string.correct[i]) === true, '# String correct: this string must be valid.');
}
for(let i = 0; i < dataTest.string.incorrect.length; i++) {
	assertTest(i+1, validString(dataTest.string.incorrect[i]) === false, '# String incorrect: this string must be NOT valid.');
}
for(let i = 0; i < dataTest.integer.correct.length; i++) {
	assertTest(i+1, validIsInteger(dataTest.integer.correct[i]) === true, '# Integer correct: this item must be valid.');
}
for(let i = 0; i < dataTest.integer.incorrect.length; i++) {
	assertTest(i+1, validIsInteger(dataTest.integer.incorrect[i]) === false, '# Integer incorrect: this item must be NOT valid.');
}
for(let i = 0; i < dataTest.email.correct.length; i++) {
	assertTest(i+1, validIsEmail(dataTest.email.correct[i]) === true, '# Email correct: this email must be valid.');
}
for(let i = 0; i < dataTest.email.incorrect.length; i++) {
	assertTest(i+1, validIsEmail(dataTest.email.incorrect[i]) === false, '# Email incorrect: this email must be NOT valid.');
}
for(let i = 0; i < dataTest.number.length; i++) {
	assertTest(i+1, validIsPhoneNumber(dataTest.number[i]) === true, '# This number must be valid.');
}


/* =======================================================
	3. Фильтрация
========================================================== */

const arrFilter = [
	{id: 1, country: 'Ukraine', age: 18, gender: 'M', favorite: false},
	{id: 2, country: 'England', age: 22, gender: 'F', favorite: true},
	{id: 3, country: 'Ukraine', age: 18, gender: 'M', favorite: false},
	{id: 4, country: 'England', age: 32, gender: 'M', favorite: true},
	{id: 5, country: 'Ukraine', age: 18, gender: 'F', favorite: false},
	{id: 6, country: 'Poland', age: 22, gender: 'F', favorite: true},
];

assertTest(1, FilterUsers(arrFilter, {}).length === 6);
assertTest(2, FilterUsers(arrFilter, {age: 32}).length === 1);
assertTest(3, FilterUsers(arrFilter, {country: 'England', age: 56}).length === 0);
assertTest(4, FilterUsers(arrFilter, {country: 'Ukraine', age: 18, gender: 'M', favorite: false}).length === 2);
assertTest(5, FilterUsers(arrFilter, {country: 'England', gender: 'F', favorite: true}).length === 1);


/* =======================================================
	4. Sorting
========================================================== */

const arrSort = [
	{id: 1, full_name: 'ABCE', age: 18, b_day: '1966-07-31T21:57:32.876Z'},
	{id: 2, full_name: 'ABC', age: 23, b_day: '1976-07-31T21:57:32.876Z'},
	{id: 3, full_name: 'ABCD', age: 14, b_day: '1911-07-31T21:57:32.876Z'},
	{id: 4, full_name: 'ABC', age: 18, b_day: '1980-07-31T21:57:32.876Z'},
	{id: 5, full_name: 'ABC', age: 34, b_day: '1952-07-31T21:57:32.876Z'},
];


const optionsSort = [
	{ field: 'age', type: 'any', method: 'ASC' },
	{ field: 'full_name', type: 'any', method: 'ASC' },
	{ field: 'country', type: 'any', method: 'DESC' },
	{ field: 'b_day', type: 'date', method: 'DESC' },
];
