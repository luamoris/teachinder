// =
const { randomUserMock, additionalUsers } = require('./data/mock.js');


function dataFormatting(oldUsers) {
	const users = [];
	let i = 0;
	oldUsers.forEach(item => users.push(createUsers(item, i)))
	return users;
}

const createUsers = (oldUser, id) => {
	return {
		id: oldUser.id.value ? `${oldUser.id.name}${oldUser.id.value}` : `NEW${1000000000 + id}`,
		gender: oldUser.gender,
		title: oldUser.name.title,
		full_name: `${oldUser.name.first} ${oldUser.name.last}`,
		state: oldUser.location.state,
		country: oldUser.location.country,
		postcode: oldUser.location.postcode,
		coordinates: {
			latitude: oldUser.location.coordinates.latitude,
			longitude: oldUser.location.coordinates.longitude,
		},
		timezone: {
			offset: oldUser.location.timezone.offset,
			description: oldUser.location.timezone.description,
		},
		email: oldUser.email,
		b_date: oldUser.dob.date,
		age: oldUser.dob.age,
		phone: oldUser.phone,
		picture_large: oldUser.picture.large,
		picture_thumbnail: oldUser.picture.medium,
		favorite: '',
		course: '',
		bg_color: '',
		note: '',
	};
}


// console.log(randomUserMock.length)
// dataFormatting(randomUserMock)
// 	.filter((element, index, arr) => arr.findIndex(el => (el.id === element.id)) === index)
// 	.forEach((item, index) => console.log(item.phone));


/* =======================================================
	2. Validation
========================================================== */

// Validation string
const validString = str => /^[\p{Lu}]{1}[\p{Ll}]+$/u.test(str);

// Validating an array of strings
const validArrStrings = strs => strs.length === strs.filter(element => validString(element)).length;

// Validating a numeric integer value
const validIsInteger = num => (typeof(num) === 'number') && ((num ^ 0) === num) && num > 0;

// Validation e-mail
const validIsEmail = email => /^[^\W\d_]\w+@\w+\.\w+(\.\w+)?$/.test(email);

// Validation phone number
const validIsPhoneNumber = number => /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/.test(number);


// Object validation
function ValidationUser(user) {
	return validArrStrings([user.full_name, user.gender, user.note, user.state, user.city, user.country])
		&& validIsInteger(user.age) && validIsPhoneNumber(user.number) && validIsEmail(user.email);
}


/* =======================================================
	3. Filtration
========================================================== */

// Users filtration
function FilterUsers(users, opts) {
	return users.filter((el) => (opts.country ? el.country === opts.country : true) && (opts.age ? el.age === opts.age : true)
		&& (opts.gender ? el.gender === opts.gender : true) && (opts.favorite ? el.favorite === opts.favorite : true));
}


/* =======================================================
	4. Sorting
========================================================== */

// Comparing two values of the same type
const anyCompare = (elm1, elm2) => {
	if(typeof(elm1) !== typeof(elm2)) {
		throw Error("It is not possible to compare two values of different types.");
	}
	return (elm1 > elm2) ? 1 : ((elm2 > elm1) ? -1 : 0);
}

// Comparing two dates
const dateCompare = (date1, date2) => {
	const reg = /^\d{1,4}-(0(?=[1-9])|1(?=[0-2]))[0-9]-(0(?=[1-9])|(1|2)(?=[0-9])|3(?=[0-1]))[0-9]T((0|1|2)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]:((0|1|2|3|4|5)(?=[0-9]))[0-9]\.[0-9]{1,3}Z$/;
	if ((typeof(date1) !== 'string' || typeof(date2) !== 'string') && (reg.test(date1) || reg.test(date2))) {
		throw Error("Date format is incorrect.");
	}
	const d1 = Date.parse(date1);
	const d2 = Date.parse(date2);
	return d1 > 0 ? (d2 > 0 ? ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)) : 1) : (d2 > 0 ? -1 : ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)));
}

// Validating options for sorting
const validTemplateSort = (opts) => {
	for(const item of opts) {
		if (!item.field || typeof(item.field) !== 'string' || (item.type !== 'any' && item.type !== 'date') 
			|| (item.method !== 'ASC' && item.method !== 'DESC')) { throw Error("Template values are incorrect."); }
		item.type === 'any' ? (item.sort = anyCompare) : (item.sort = dateCompare);
	}
	return opts;
}

// Sorting an array of objects
function SortUsers(users, opts) {
	const cust = validTemplateSort(opts);
	const compareMethod = (method, func, arg1, arg2) => method === 'ASC' ? func(arg1, arg2) : func(arg2, arg1);
	const compare = (index, a, b, field) => cust[index] ? compareMethod(cust[index].method, cust[index].sort, a[`${field}`], b[`${field}`]) : 0;
	return users.sort((a, b) => {
		return compare(0, a, b, cust[0].field) || compare(1, a, b, cust[1].field) || compare(2, a, b, cust[2].field) || compare(3, a, b, cust[3].field);
	});
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


/* ======================================================= */

module.exports = {
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
};
