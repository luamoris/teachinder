/* =======================================================
	1. Array of objects
========================================================== */

const getField = (obj, ...args) => args.reduce((el, level) => el && el[level], obj);

const createUsers = (id, oldUser) => {
	const user = {
		gender: getField(oldUser, 'gender') || null,
		title: getField(oldUser, 'title') || getField(oldUser, 'name', 'title') || null,
		full_name: getField(oldUser, 'full_name') || `${getField(oldUser, 'name', 'first') || ''} ${getField(oldUser, 'name', 'last') || ''}`,
		state: getField(oldUser, 'state') || getField(oldUser, 'location', 'state') || null,
		country: getField(oldUser, 'country') || getField(oldUser, 'location', 'country') || null,
		postcode: getField(oldUser, 'postcode') || getField(oldUser, 'location', 'postcode') || null,
		coordinates: {
			latitude: getField(oldUser, 'coordinates', 'latitude') || getField(oldUser, 'location', 'coordinates', 'latitude') || null,
			longitude: getField(oldUser, 'coordinates', 'longitude') || getField(oldUser, 'location', 'coordinates', 'longitude') || null,
		},
		timezone: {
			offset: getField(oldUser, 'timezone', 'offset') || getField(oldUser, 'location', 'timezone', 'offset') || null,
			description: getField(oldUser, 'timezone', 'description') || getField(oldUser, 'location', 'timezone', 'description') || null,
		},
		email: getField(oldUser, 'email') || null,
		b_date: getField(oldUser, 'b_day') || getField(oldUser, 'dob', 'date') || null,
		age: getField(oldUser, 'dob', 'age') || null,
		phone: getField(oldUser, 'phone') || null,
		picture_large: getField(oldUser, 'picture_large') || getField(oldUser, 'picture', 'large') || null,
		picture_thumbnail: getField(oldUser, 'picture_thumbnail') || getField(oldUser, 'picture', 'medium') || null,
		favorite: getField(oldUser, 'favorite') || null,
		course: getField(oldUser, 'course') || null,
		bg_color: getField(oldUser, 'bg_color') || null,
		note: getField(oldUser, 'note') || null,
	};
	const oldId = getField(oldUser, 'id');
	user.id = oldId && typeof (oldId) !== 'object' ? oldId : (getField(oldUser, 'id', 'value') ? `${oldUser.id.name}${oldUser.id.value}` : `NEW${1000000000 + id}`);
	return user;
};

function DataFormatting(userMock, othersUsers) {
	let i = 0;
	const users = [];
	userMock.forEach((item) => {
		const newUser = createUsers(i++, item);
		const additionalUser = othersUsers.find((el, index) => {
			const isMatches = (el.full_name === newUser.full_name && el.phone === newUser.phone)
			|| (el.full_name === newUser.full_name && el.id === newUser.id)
			|| (el.full_name === newUser.full_name && el.email === newUser.email);
			if (isMatches) { othersUsers[index].status = true; }
			return isMatches;
		});
		if (additionalUser) {
			newUser.id = additionalUser.id || newUser.id;
			newUser.note = additionalUser.note || newUser.note;
			newUser.bg_color = additionalUser.bg_color || newUser.bg_color;
			newUser.course = additionalUser.course || newUser.course;
			newUser.favorite = additionalUser.favorite || newUser.favorite;
		}
		users.push(newUser);
	});
	othersUsers.forEach((item) => item.status ? users.push(createUsers(i++, item)) : undefined);
	return users;
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
		if (!item.field || typeof (item.field) !== 'string' || (item.type !== 'any' && item.type !== 'date')
			|| (item.method !== 'ASC' && item.method !== 'DESC')) { throw Error("Template values are incorrect."); }
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
	return users.find((item) => checkForCompliance(item, opts));
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
	DataFormatting,
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
