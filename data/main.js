/* =======================================================
	1. Array of objects
========================================================== */

const getField = (obj, ...args) => args.reduce((el, level) => el && el[level], obj);

const createUser = (oldUser, index) => {
	const getData = (...args) => {
		const res = getField(oldUser, ...args);
		return res && typeof res !== 'object' ? res : null;
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
		coordinates: getData('coordinates') || getData('location', 'coordinates'),
		timezone: getData('timezone') || getData('location', 'timezone'),
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

const getCleanObject = (user) => {
	const res = {};
	for (const key in user) {
		if (Object.prototype.hasOwnProperty.call(user, key)) {
			user[key] && (res[key] = user[key]);
		}
	}
	return res;
};

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
				const resUser = Object.assign(user, getCleanObject(array[userCloneIndex]));
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
