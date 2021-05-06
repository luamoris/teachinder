/* =======================================================
	1. Array of objects
========================================================== */

const getField = (obj, ...args) => args.reduce((el, level) => el && el[level], obj);

const createUser = (user, index) => {
	const get = (...args) => {
		const res = getField(user, ...args);
		return res && typeof res !== 'object' ? res : null;
	};
	const defaultId = 1000000000;
	const id = get('id') || `${get('id', 'name') || ''}${get('id', 'value') || ''}`;
	const userGender = get('gender');
	const gender = userGender ? userGender.charAt(0).toUpperCase() : '';
	return {
		id: id || `NEW${defaultId + index}`,
		gender,
		title: get('title') || get('name', 'title'),
		full_name: get('full_name') || `${get('name', 'first') || ''} ${get('name', 'last') || ''}`.trim(),
		state: get('state') || get('location', 'state'),
		country: get('country') || get('location', 'country'),
		postcode: get('postcode') || get('location', 'postcode'),
		coordinates: {
			latitude: get('coordinates', 'latitude') || get('location', 'coordinates', 'latitude'),
			longitude: get('coordinates', 'longitude') || get('location', 'coordinates', 'longitude'),
		},
		timezone: {
			offset: get('timezone', 'offset') || get('location', 'timezone', 'offset'),
			description: get('timezone', 'description') || get('location', 'timezone', 'description'),
		},
		email: get('email'),
		b_date: get('b_day') || get('dob', 'date'),
		age: get('age') || get('dob', 'age'),
		phone: get('phone'),
		picture_large: get('picture_large') || get('picture', 'large'),
		picture_thumbnail: get('picture_thumbnail') || get('picture', 'medium'),
		favorite: get('favorite') || false,
		course: get('course'),
		bg_color: get('bg_color'),
		note: get('note'),
	};
};

const getCleanObject = (user) => Object.keys(user)
	.reduce((res, key) => {
		(user[key] && user[key] !== '-') && (res[key] = user[key]);
		return res;
	}, {});

function usersFormatting(usersMock) {
	const users = usersMock.map(createUser);
	return users.map((user, index, array) => {
		if (user) {
			// search clone user
			const userCloneIndex = array.findIndex((oldUser, oldIndex) => oldUser && index !== oldIndex
				&& oldUser.full_name === user.full_name && (oldUser.id === user.id
				|| oldUser.phone === user.phone || oldUser.email === user.email));
			// check if we found
			if (userCloneIndex !== -1) {
				const cloneUser = getCleanObject(array[userCloneIndex]);
				const resUser = Object.assign(user, cloneUser);
				array[userCloneIndex] = null;
				return resUser;
			}
			return user;
		}
		return false;
	}).filter(Boolean);
}

/* =======================================================
	2. Validation
========================================================== */

const TEST = {
	string: /^[\p{Lu}]{1}[\p{Ll}]+$/u,
	email: /^[^\W\d_]\w+@\w+\.\w+(\.\w+)?$/,
	phonNumber: /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/,
	date: /^\d{1,4}-(0(?=[1-9])|1(?=[0-2]))[0-9]-(0(?=[1-9])|(1|2)(?=[0-9])|3(?=[0-1]))[0-9]T((0|1|2)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]\.[0-9]{1,3}Z$/,
};

// Validation string
const validString = (str) => TEST.string.test(str);

// Validating an array of strings
const validArrStrings = (strArr) => strArr.every((str) => validString(str) === true);

// Validating a numeric integer value
const validIsInteger = (num) => Number.isInteger(num) && num > 0;

// Validation e-mail
const validIsEmail = (email) => TEST.email.test(email);

// Validation phone number
const validIsPhoneNumber = (number) => TEST.phonNumber.test(number);

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
	return users.filter((user) => Object.keys(opts).every((key) => opts[key] === user[key]));
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
	if (typeof (date1) !== 'string' || typeof (date2) !== 'string' || !TEST.date.test(date1) || !TEST.date.test(date2)) {
		throw Error("Date format is incorrect.");
	}
	const d1 = Date.parse(date1);
	const d2 = Date.parse(date2);
	return d1 > 0 ? (d2 > 0 ? ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)) : 1)
		: (d2 > 0 ? -1 : ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)));
};

// Validating options for sorting
const adaptOptions = (opts) => {
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
	try {
		const validOpts = adaptOptions(opts);
		const compare = (method, func, arg1, arg2) => method === 'ASC' ? func(arg1, arg2) : func(arg2, arg1);
		return users.sort((current, next) => validOpts.reduce((res, opt) => res
			|| compare(opt.method, opt.sort, current[opt.field], next[opt.field]), 0));
	} catch (error) {
		console.error(error);
	}
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

const checkForCompliance = (user, opts) => {
	const keys = Object.keys(opts);
	return keys.length > 0 && keys.every((key) => opts[key] === user[key]);
};

function SearchUser(users, opts) {
	return users.find((user) => checkForCompliance(user, opts)) || {};
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
	createUser,
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
	adaptOptions,
	SortUsers,
	// Search
	SearchUser,
	// Percent
	GetPercentItemsSearch,
};
