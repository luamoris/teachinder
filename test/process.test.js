/* =======================================================
	Require
========================================================== */

const { randomUserMock, additionalUsers } = require('../src/data/mock');

/* =======================================================
	Functions
========================================================== */

const {
	usersFormatting,
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
	adaptOptions,
	// Search
	SearchUser,
	// Percent
	GetPercentItemsSearch,
} = require('../src/js/modules/process');

/* =======================================================
	1. Array of objects
========================================================== */

describe('#1. Array of objects', () => {
	test('number of resulting objects', () => {
		const res = usersFormatting([...randomUserMock, ...additionalUsers]);
		expect(res.length).toEqual(52);
	});
});

/* =======================================================
	2. Validation
========================================================== */

describe('#2. Validation', () => {
	const T = true;
	const F = false;
	// test
	test('String correct', () => {
		const fun = validString;
		expect(fun('Iosif')).toEqual(T);
		expect(fun('Иосиф')).toEqual(T);
		expect(fun('Іосіф')).toEqual(T);
	});
	test('String incorrect [flag: false]', () => {
		const fun = validString;
		expect(fun('Iosif7')).toEqual(F);
		expect(fun('Ios#f')).toEqual(F);
		expect(fun('7Iosif')).toEqual(F);
		expect(fun('#Iosif')).toEqual(F);
		expect(fun('iosif')).toEqual(F);
		expect(fun('Иосиф7')).toEqual(F);
		expect(fun('Иосиф№')).toEqual(F);
		expect(fun('2Иосиф')).toEqual(F);
		expect(fun('иосиф')).toEqual(F);
	});
	test('Integer correct', () => {
		const fun = validIsInteger;
		expect(fun(1)).toEqual(T);
		expect(fun(20)).toEqual(T);
		expect(fun(1000)).toEqual(T);
		expect(fun(12345)).toEqual(T);
	});
	test('Integer incorrect', () => {
		const fun = validIsInteger;
		expect(fun(2.5)).toEqual(F);
		expect(fun('2')).toEqual(F);
		expect(fun('2.5')).toEqual(F);
		expect(fun(-2)).toEqual(F);
	});
	test('Email correct', () => {
		const fun = validIsEmail;
		expect(fun('iosif@gmail.com')).toEqual(T);
		expect(fun('iosif@gmail.com.ua')).toEqual(T);
		expect(fun('iosif545@gmail.com')).toEqual(T);
		expect(fun('iosif545@gmail.com.ua')).toEqual(T);
		expect(fun('io_0i@gmail.com')).toEqual(T);
		expect(fun('io_0i@main.com.ua')).toEqual(T);
	});
	test('Email incorrect', () => {
		const fun = validIsEmail;
		expect(fun('ios@ mail.com')).toEqual(F);
		expect(fun('ios @mail.com')).toEqual(F);
		expect(fun('ios mail.com')).toEqual(F);
		expect(fun('iosmail.com')).toEqual(F);
		expect(fun('@mail.com')).toEqual(F);
		expect(fun('ios@.com')).toEqual(F);
		expect(fun('ios@com')).toEqual(F);
		expect(fun('fail ios@mail.com')).toEqual(F);
		expect(fun('ios@mail.com fail')).toEqual(F);
		expect(fun('ios@mail com')).toEqual(F);
	});
	test(' correct', () => {
		const fun = validIsPhoneNumber;
		expect(fun('0079-8291509')).toEqual(T);
		expect(fun('071-558-2972')).toEqual(T);
		expect(fun('02-6397-0344')).toEqual(T);
		expect(fun('(720)-981-1014')).toEqual(T);
		expect(fun('04-531-159')).toEqual(T);
		expect(fun('02-7976-3904')).toEqual(T);
		expect(fun('077 863 38 70')).toEqual(T);
		expect(fun('06-843-874')).toEqual(T);
		expect(fun('921-757-670')).toEqual(T);
		expect(fun('36513745')).toEqual(T);
		expect(fun('76565355')).toEqual(T);
		expect(fun('07-130-008')).toEqual(T);
		expect(fun('33373580')).toEqual(T);
		expect(fun('907-066-616')).toEqual(T);
		expect(fun('(210)-514-4881')).toEqual(T);
		expect(fun('05-70-80-69-86')).toEqual(T);
		expect(fun('61523239')).toEqual(T);
		expect(fun('71350190')).toEqual(T);
		expect(fun('04-421-028')).toEqual(T);
		expect(fun('(938)-352-7475')).toEqual(T);
		expect(fun('32189027')).toEqual(T);
		expect(fun('17760878')).toEqual(T);
		expect(fun('071-488-9968')).toEqual(T);
		expect(fun('04-31-67-71-51')).toEqual(T);
		expect(fun('078 059 73 14')).toEqual(T);
		expect(fun('987-689-092')).toEqual(T);
		expect(fun('(173)-797-7689')).toEqual(T);
		expect(fun('(144)-684-1967')).toEqual(T);
		expect(fun('(835)-586-6028')).toEqual(T);
		expect(fun('03-39-75-54-47')).toEqual(T);
		expect(fun('078 301 62 63')).toEqual(T);
		expect(fun('(018)-382-5902')).toEqual(T);
		expect(fun('67399596')).toEqual(T);
		expect(fun('(903)-380-2376')).toEqual(T);
		expect(fun('07190090')).toEqual(T);
		expect(fun('02-33-67-58-40')).toEqual(T);
	});
});

/* =======================================================
	3. Filtration
========================================================== */

describe('#3. Filtration', () => {
	const data = [
		{
			id: 1,
			country: 'Ukraine',
			age: 18,
			gender: 'M',
			favorite: false,
		},
		{
			id: 2,
			country: 'England',
			age: 22,
			gender: 'F',
			favorite: true,
		},
		{
			id: 3,
			country: 'Ukraine',
			age: 18,
			gender: 'M',
			favorite: false,
		},
		{
			id: 4,
			country: 'England',
			age: 32,
			gender: 'M',
			favorite: true,
		},
		{
			id: 5,
			country: 'Ukraine',
			age: 18,
			gender: 'F',
			favorite: false,
		},
		{
			id: 6,
			country: 'Poland',
			age: 22,
			gender: 'F',
			favorite: true,
		},
	];
	test('filtering accuracy check', () => {
		const opts = [
			{
				id: 0,
				filter: {},
				res: 6,
			},
			{
				id: 1,
				filter: { age: 32 },
				res: 1,
			},
			{
				id: 2,
				filter: { country: 'England', age: 56 },
				res: 0,
			},
			{
				id: 3,
				filter: { country: 'England', gender: 'F', favorite: true },
				res: 1,
			},
			{
				id: 4,
				filter: {
					country: 'Ukraine',
					age: 18,
					gender: 'M',
					favorite: false,
				},
				res: 2,
			},
			{
				id: 5,
				filter: { age: 18, noName: 'not properties' },
				res: 0,
			},
		];
		const filter = (id) => opts[id].filter;
		const res = (id) => opts[id].res;
		// test start
		expect(FilterUsers(data, filter(0)).length).toEqual(res(0));
		expect(FilterUsers(data, filter(1)).length).toEqual(res(1));
		expect(FilterUsers(data, filter(2)).length).toEqual(res(2));
		expect(FilterUsers(data, filter(3)).length).toEqual(res(3));
		expect(FilterUsers(data, filter(4)).length).toEqual(res(4));
		expect(FilterUsers(data, filter(5)).length).toEqual(res(5));
		// test end
	});
});

/* =======================================================
	4. Sorting
========================================================== */

describe('#4. Sorting', () => {
	const catchError = (fun, arg1, arg2 = undefined) => {
		try { arg2 ? fun(arg1, arg2) : fun(arg1); } catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
	};
	// test
	test('any compare', () => {
		const fun = anyCompare;
		expect(fun(2, 2)).toEqual(0);
		expect(fun(2, 5)).toEqual(-1);
		expect(fun(5, 2)).toEqual(1);
		//
		expect(fun(-2, 2)).toEqual(-1);
		expect(fun(2, -2)).toEqual(1);
		//
		expect(fun(-2, -2)).toEqual(0);
		expect(fun(-2, -5)).toEqual(1);
		expect(fun(-5, -2)).toEqual(-1);
	});
	test('any compare <catch>', () => {
		const fun = anyCompare;
		catchError(fun, 2, '2');
		catchError(fun, true);
	});
	test('date compare', () => {
		const fun = dateCompare;
		expect(fun('2020-07-31T21:57:32.876Z', '2020-07-31T21:57:32.876Z')).toEqual(0);
		expect(fun('2020-07-31T21:57:32.876Z', '2019-07-31T21:57:32.876Z')).toEqual(1);
		expect(fun('2019-07-31T21:57:32.876Z', '2020-07-31T21:57:32.876Z')).toEqual(-1);
		//
		expect(fun('1970-07-31T21:57:32.876Z', '1970-07-31T21:57:32.876Z')).toEqual(0);
		expect(fun('1971-07-31T21:57:32.876Z', '1970-07-31T21:57:32.876Z')).toEqual(1);
		expect(fun('1970-07-31T21:57:32.876Z', '1971-07-31T21:57:32.876Z')).toEqual(-1);
		//
		expect(fun('1111-07-31T21:57:32.876Z', '1111-07-31T21:57:32.876Z')).toEqual(0);
		expect(fun('1900-07-31T21:57:32.876Z', '1890-07-31T21:57:32.876Z')).toEqual(1);
		expect(fun('1890-07-31T21:57:32.876Z', '1900-07-31T21:57:32.876Z')).toEqual(-1);
	});
	test('date compare <catch>', () => {
		const fun = dateCompare;
		catchError(fun, 2, '1890-07-31T21:57:32.876Z');
		catchError(fun, '1890-07-31T21:57:32.876Z', '1890-42-31T21:57:32.876Z');
	});
	test('validation template sort <catch>', () => {
		const fun = adaptOptions;
		catchError(fun, { field: '', type: 'any', method: 'ASC' });
		catchError(fun, { field: true, type: 'any', method: 'ASC' });
		catchError(fun, { field: 'age', type: 'anym', method: 'ASC' });
		catchError(fun, { field: 'age', type: 'any', method: 'ASCD' });
		//
		catchError(fun, { field: 'age', method: 'ASC' });
		catchError(fun, { type: 'any', method: 'ASC' });
		catchError(fun, { field: 'age', type: 'any' });
	});
});

/* =======================================================
	5. Search
========================================================== */

describe('#5. Search', () => {
	const getJSON = (element) => JSON.stringify(element);
	const data = [
		{ name: 'iosif', note: 'hi hi', age: 18 },
		{ name: 'even', note: 'iv iv', age: 39 },
		{ name: 'even', note: 'gl gl', age: 39 },
		{ name: 'even', note: 'ev ev', age: 39 },
		{ name: 'ivan', note: 'iv iv', age: 76 },
	];
	// test
	test('item found', () => {
		const fun = (opts) => getJSON(SearchUser(data, opts));

		expect(fun({ name: 'even', note: 'gl gl' })).toBe(getJSON({ name: 'even', note: 'gl gl', age: 39 }));
		expect(fun({ note: 'iv iv', age: 76 })).toBe(getJSON({ name: 'ivan', note: 'iv iv', age: 76 }));
		expect(fun({ note: 'iracli', age: 18 })).toBe(getJSON(null));
		expect(fun({})).toBe(getJSON(null));
	});
});

/* =======================================================
	6. Percent
========================================================== */

describe('#6. Percent', () => {
	const data = [
		{ name: 'iosif', note: 'hi hi', age: 18 },
		{ name: 'even', note: 'hi hi', age: 39 },
		{ name: 'even', note: 'hi hi', age: 39 },
		{ name: 'even', note: 'hi hi', age: 39 },
		{ name: 'even', note: 'hi hi', age: 76 },
		{ name: 'olivia', note: 'hi hi', age: 76 },
	];
	// test
	test('correct percentage', () => {
		const fun = GetPercentItemsSearch;
		expect(fun(data, {})).toEqual(0);
		expect(fun(data, { age: 100 })).toEqual(0);
		expect(fun(data, { name: 'olivia' })).toEqual(16.666666666666668);
		expect(fun(data, { age: 39 })).toEqual(50);
		expect(fun(data, {})).toEqual(0);
	});
});
