// ======================================================= FILTER

/*
	Class Names
		filter__button: class name filter button

	Modifiers
		filter_active: activated class modifier
*/

function Filter(filterElement) {
	// ===
	if (!new.target) { return new Filter(filterElement); }
	if (!(filterElement instanceof HTMLElement)) { throw Error('Element is not HTMLElement'); }

	// ===
	const activeMod = 'filter_active';

	// ===
	const btnFilter = filterElement.querySelector('.filter__button');

	// ===
	const init = () => {
		filterElement.classList.toggle(activeMod);
	};

	// =========================================== Interface

	this.start = () => {
		btnFilter.onclick = init;
	};
}

module.exports = Filter;
