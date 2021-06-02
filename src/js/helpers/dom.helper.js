// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~ error

const errorHandler = (callback) => {
	try {
		callback();
	} catch (error) {
		console.error('Error: ', error);
	}
};

// ~~~~~~~~~~~~~~~~~ selector

const selectorHandlers = {
	id: (selector) => `#${selector}`,
	tag: (selector) => `${selector}`,
	class: (selector) => `.${selector}`,
};

// ~~~~~~~~~~~~~~~~~ input

const inputHandlers = {
	text: (element) => element.value || null,
	number: (element) => element.value || null,
	radio: (element) => element.checked ? (element.value || true) : null,
	checkbox: (element) => element.checked,
};

const inputHandler = ({ type, element }) => {
	if (inputHandlers[type]) {
		return inputHandlers[type](element);
	}
	return null;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM HELPER

class DomHelper {
	// Create Dom Element
	static createElement({ tagName, className, attributes = {} }) {
		const element = document.createElement(tagName);
		if (className) {
			const classNames = className.split(' ').filter(Boolean);
			element.classList.add(...classNames);
		}
		Object
			.keys(attributes)
			.forEach((key) => element.setAttribute(key, attributes[key]));
		return element;
	}

	// Get HTML Element
	static getElement({ root = document, type = 'tag', selector, all = false }) {
		let results = null;
		const handler = () => {
			if (!selectorHandlers[type]) {
				throw Error(`This type of item "${type}" does not exist`);
			}
			const query = selectorHandlers[type](selector);
			results = all
				? root.querySelectorAll(query)
				: root.querySelector(query);
			if (!results) {
				throw Error('Element wont find');
			}
		};

		errorHandler(() => {
			handler();
		});
		return results;
	}

	static getDataFormInput(elements) {
		const results = {};
		const elementHandler = (element, index) => {
			if (!(element instanceof HTMLInputElement)) {
				throw Error(`Element is not an HTMLInputElement: ${element}`);
			}
			const { name, type } = element;
			const resName = name || `${type}-${index}`;
			const resData = inputHandler({ type, element });
			if (resData !== null) {
				results[resName] = resData;
			}
		};
		errorHandler(() => {
			elements.forEach(elementHandler);
		});
		return results;
	}

	static getDataFormSelects(elements) {
		const results = {};
		const elementHandler = (element, index) => {
			if (!(element instanceof HTMLSelectElement)) {
				throw Error(`Element is not an HTMLSelectElement: ${element}`);
			}
			const { name } = element;
			const resName = name || `$select-${index}`;
			const dataElement = element.querySelector('option:checked');
			if (dataElement && dataElement.value) {
				results[resName] = dataElement.value;
			}
		};
		errorHandler(() => {
			elements.forEach(elementHandler);
		});
		return results;
	}

	static getDataForm(form) {
		let results = {};
		const handler = () => {
			if (!(form instanceof HTMLFormElement)) {
				throw Error(`Element is not an HTMLFormElement: ${form}`);
			}
			const inputs = DomHelper.getElement({ selector: 'input', all: true });
			const selects = DomHelper.getElement({ selector: 'select', all: true });

			const inputsData = DomHelper.getDataFormInput(inputs);
			const selectsData = DomHelper.getDataFormSelects(selects);

			results = Object.assign(results, inputsData, selectsData);
		};
		errorHandler(() => {
			handler();
		});
		return results;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = DomHelper;
