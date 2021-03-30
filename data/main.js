/* =======================================================
	1. Array of objects
========================================================== */

const getField = (obj, ...args) => args.reduce((el, level) => el && el[level], obj);

const createUser = (index, oldUser) => {
	const getData = (...args) => {
		const data = getField(oldUser, ...args);
		return (data !== undefined && typeof data !== 'object') ? data : null;
	};
	const id = getData('id') || `${getData('id', 'name') || ''}${getData('id', 'value') || ''}`;
	return {
		id: id || `NEW${1000000000 + index}`,
		gender: getData('gender'),
		title: getData('title') || getData('name', 'title'),
		full_name: getData('full_name') || `${getData('name', 'first') || ''} ${getData('name', 'last') || ''}`.trim(),
		state: getData('state') || getData('location', 'state'),
		country: getData('country') || getData('location', 'country'),
		postcode: getData('postcode') || getData('location', 'postcode'),
		coordinates: {
			latitude: getData('coordinates', 'latitude') || getData('location', 'coordinates', 'latitude'),
			longitude: getData('coordinates', 'longitude') || getData('location', 'coordinates', 'longitude'),
		},
		timezone: {
			offset: getData('timezone', 'offset') || getData('location', 'timezone', 'offset'),
			description: getData('timezone', 'description') || getData('location', 'timezone', 'description'),
		},
		email: getData('email'),
		b_date: getData('b_day') || getData('dob', 'date'),
		age: getData('dob', 'age'),
		phone: getData('phone'),
		picture_large: getData('picture_large') || getData('picture', 'large'),
		picture_thumbnail: getData('picture_thumbnail') || getData('picture', 'medium'),
		favorite: getData('favorite'),
		course: getData('course'),
		bg_color: getData('bg_color'),
		note: getData('note'),
	};
};

const createAdditUser = (oldUser) => {
	const additUser = {};
	oldUser.id && (additUser.id = oldUser.id);
	oldUser.favorite && (additUser.favorite = oldUser.favorite);
	oldUser.course && (additUser.course = oldUser.course);
	oldUser.bg_color && (additUser.bg_color = oldUser.bg_color);
	oldUser.note && (additUser.note = oldUser.note);
	return additUser;
};

function usersFormatting(userMock, othersUsers) {
	let id = 0;
	const users = [];
	const result = [];
	[...userMock, ...othersUsers].forEach((item) => users.push(createUser(id++, item)));
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		if (user) {
			const repeat = users.findIndex((el, index) => el
				&& (index !== i) && (el.full_name === user.full_name)
				&& (el.id === user.id || el.phone === user.phone || el.email === user.email));
			if (repeat !== -1) {
				const additUser = createAdditUser(users[repeat]);
				result.push(Object.assign(user, additUser));
				users[repeat] = null;
			} else {
				result.push(user);
			}
		}
	}
	return result;
}

/* =======================================================
	2. Validation
========================================================== */

// Validation string
const validString = (str) => /^[\p{Lu}]{1}[\p{Ll}]+$/u.test(str);

// Validating an array of strings
const validArrStrings = (strs) => strs.length
	=== strs.filter((element) => validString(element)).length;

// Validating a numeric integer value
const validIsInteger = (num) => Number.isInteger(num) && num > 0;

// Validation e-mail
const validIsEmail = (email) => /^[^\W\d_]\w+@\w+\.\w+(\.\w+)?$/.test(email);

// Validation phone number
const validIsPhoneNumber = (number) => /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/.test(number);

// Object validation
function ValidationUser(user) {
	return validArrStrings([
		user.full_name, user.gender, user.note, user.state, user.city, user.country,
	]) && validIsInteger(user.age) && validIsPhoneNumber(user.number) && validIsEmail(user.email);
}

/* =======================================================
	3. Filtration
========================================================== */

// Users filtration
function FilterUsers(users, opts) {
	return users.filter((el) => (opts.country ? el.country === opts.country : true)
		&& (opts.age ? el.age === opts.age : true)
		&& (opts.gender ? el.gender === opts.gender : true)
		&& (opts.favorite ? el.favorite === opts.favorite : true));
}

/* =======================================================
	4. Sorting
========================================================== */

// Comparing two values of the same type
const anyCompare = (elm1, elm2) => {
	if (typeof (elm1) !== typeof (elm2)) {
		throw Error("It is not possible to compare two values of different types.");
	}
	return (elm1 > elm2) ? 1 : ((elm2 > elm1) ? -1 : 0);
};

// Comparing two dates
const dateCompare = (date1, date2) => {
	const reg = /^\d{1,4}-(0(?=[1-9])|1(?=[0-2]))[0-9]-(0(?=[1-9])|(1|2)(?=[0-9])|3(?=[0-1]))[0-9]T((0|1|2)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]\.[0-9]{1,3}Z$/;
	if (typeof (date1) !== 'string' || typeof (date2) !== 'string' || !reg.test(date1) || !reg.test(date2)) {
		throw Error("Date format is incorrect.");
	}
	const d1 = Date.parse(date1);
	const d2 = Date.parse(date2);
	return d1 > 0 ? (d2 > 0 ? ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)) : 1)
		: (d2 > 0 ? -1 : ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)));
};

// Validating options for sorting
const validTemplateSort = (opts) => {
	for (const item of opts) {
		if (!item.field || typeof (item.field) !== 'string' || !item.type || !item.method
			|| (item.type !== 'any' && item.type !== 'date')
			|| (item.method !== 'ASC' && item.method !== 'DESC')) {
			throw Error("Template values are incorrect.");
		}
		item.type === 'any' ? (item.sort = anyCompare) : (item.sort = dateCompare);
	}
	return opts;
};

// Sorting an array of objects
function SortUsers(users, opts) {
	const cust = validTemplateSort(opts);
	const compareMethod = (method, func, arg1, arg2) => method === 'ASC' ? func(arg1, arg2) : func(arg2, arg1);
	const compare = (index, a, b, field) => cust[index] ? compareMethod(cust[index].method, cust[index].sort, a[`${field}`], b[`${field}`]) : 0;
	return users.sort((a, b) => compare(0, a, b, cust[0].field) || compare(1, a, b, cust[1].field)
		|| compare(2, a, b, cust[2].field) || compare(3, a, b, cust[3].field));
}

/*
	Template:
	const opts = [
		{ field: 'full_name', type: 'any', method: 'ASC' },
		{ field: 'country', type: 'any', method: 'DESC' },
		{ field: 'age', type: 'any', method: 'ASC' },
		{ field: 'b_day', type: 'date', method: 'DESC' },
	];
*/

/* =======================================================
	5. Search
========================================================== */

const checkForCompliance = (user, opts) => Object.keys(opts).length !== 0
	? (opts.name ? (opts.name === user.name) : true)
	&& (opts.note ? (opts.note === user.note) : true)
	&& (opts.age ? (opts.age === user.age) : true) : false;

function SearchUser(users, opts) {
	return users.find((item) => checkForCompliance(item, opts)) || {};
}

/* =======================================================
	6. Percent
========================================================== */

function GetPercentItemsSearch(users, opts) {
	return (100.0 / users.length) * users.reduce((sum, item) => sum
		+ (checkForCompliance(item, opts) ? 1 : 0), 0);
}

/* ======================================================= */

module.exports = {
	// Formation
	usersFormatting,
	// Validation
	validString,
	validIsInteger,
	validIsEmail,
	validIsPhoneNumber,
	ValidationUser,
	// Filtration
	FilterUsers,
	// Sorting
	anyCompare,
	dateCompare,
	validTemplateSort,
	SortUsers,
	// Search
	SearchUser,
	// Percent
	GetPercentItemsSearch,
};
