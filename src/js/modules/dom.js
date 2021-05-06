// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interaction with DOM elements.

function getHTMLElement(root, selector, type) {
	let element = null;
	if (type === 'class') {
		element = root.querySelector(`.${selector}`);
	} else if (type === 'id') {
		element = root.getElementById(selector);
	} else if (type === 'tag') {
		element = root.querySelector(selector);
		if (element instanceof SVGElement) return element;
	}
	// ===
	if (element instanceof HTMLElement) return element;
	throw Error(`An element "${selector}" with this ${type} was not found.`);
}

function getAllHTMLElement(root, selector, type) {
	let elements = null;
	if (type === 'class') {
		elements = root.querySelectorAll(`.${selector}`);
	} else if (type === 'tag') {
		elements = root.querySelectorAll(selector);
	}
	// ===
	if (!elements) throw Error(`An element "${selector}" with this ${type} was not found.`);
	return elements;
}

function getFormData(form) {
	if (!form || !form.nodeName || form.nodeName !== 'FORM' || !(form instanceof HTMLElement)) {
		throw Error('The element is not a form element.');
	}
	const res = {};
	// ~~~
	const inputs = form.querySelectorAll('input');
	const selects = form.querySelectorAll('select');
	inputs.forEach((input) => {
		if (input.type === 'radio' && input.checked) {
			res[input.name] = input.value;
		} else if (input.type === 'checkbox') {
			res[input.name] = input.checked;
		} else {
			res[input.name] = input.value;
		}
	});
	selects.forEach((select) => {
		res[select.name] = select.querySelector('option:checked').value;
	});
	// ~~~
	return res;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = {
	getHTMLElement,
	getAllHTMLElement,
	getFormData,
};
