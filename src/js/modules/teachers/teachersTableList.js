// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Process = require('../process');

const { getHTMLElement } = require('../dom');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHERS TABLE LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TeachersTableList {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static createTableItem(teacher) {
		return {
			id: teacher.id,
			full_name: teacher.full_name,
			country: teacher.country || '',
			gender: teacher.gender ? (teacher.gender === 'M' ? 'Male' : 'Female') : '',
			age: teacher.age || 0,
			b_day: teacher.b_date,
		};
	}

	static createHtmlTd(title, text) {
		const td = document.createElement('td');
		td.dataset.title = title;
		td.innerText = text;
		return td;
	}

	static createHtmlTr(data) {
		const tr = document.createElement('tr');
		tr.appendChild(TeachersTableList.createHtmlTd('Name', data.full_name));
		tr.appendChild(TeachersTableList.createHtmlTd('Age', data.age));
		tr.appendChild(TeachersTableList.createHtmlTd('Gender', data.gender));
		tr.appendChild(TeachersTableList.createHtmlTd('Nationality', data.country));
		return tr;
	}

	static calculator(pageData) {
		pageData.end = Math.ceil(pageData.length / pageData.max) || 1;
		pageData.remainder = pageData.length % pageData.max;
	}

	static createPaginationPage(pageNumber, isCurrent = false) {
		const page = document.createElement('span');
		page.classList.add('pagination__link');
		isCurrent && page.classList.add('pagination_current');
		page.dataset.value = pageNumber;
		page.innerText = pageNumber;
		return page;
	}

	static createPaginationPoints() {
		const points = document.createElement('span');
		points.classList.add('pagination_points');
		points.innerText = '...';
		return points;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(tableId) {
		this.teachers = [];
		this.page = {
			length: 0,
			max: 10,
			start: 1,
			end: 1,
			current: 1,
			remainder: 0,
		};
		this.optsMethod = {
			full_name: {
				asc: false,
				opt: { field: 'full_name', type: 'any', method: 'DESC' },
			},
			country: {
				isActive: false,
				opt: { field: 'country', type: 'any', method: 'DESC' },
			},
			age: {
				isActive: false,
				opt: { field: 'age', type: 'any', method: 'DESC' },
			},
			gender: {
				isActive: false,
				opt: { field: 'gender', type: 'any', method: 'DESC' },
			},
		};
		// ~~~
		this.table = getHTMLElement(document, tableId, 'id');
		this.body = getHTMLElement(this.table, 'tbody', 'tag');
		this.pagination = getHTMLElement(this.table, 'pagination', 'class');
		// ~~~
		this.btn = {
			full_name: getHTMLElement(this.table, 'thead .btn-name', 'tag'),
			age: getHTMLElement(this.table, 'thead .btn-age', 'tag'),
			gender: getHTMLElement(this.table, 'thead .btn-gender', 'tag'),
			country: getHTMLElement(this.table, 'thead .btn-nationality', 'tag'),
		};

		const clearBtnActive = () => {
			Object.keys(this.btn).forEach((btnName) => {
				this.btn[btnName].classList.remove('thead_active');
			});
		};

		Object.keys(this.btn).forEach((btnName) => {
			const btn = this.btn[btnName];
			const field = this.optsMethod[btnName];
			btn.onclick = () => {
				clearBtnActive();
				btn.classList.add('thead_active');
				field.opt.method = field.asc ? 'DESC' : 'ASC';
				field.asc = !field.asc;
				const opts = [];
				opts.push(field.opt);
				this.sort(opts);
			};
		});
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	setupPage(number) {
		const teacherStart = (number - 1) * this.page.max;
		const teacherSetup = this.teachers.slice(teacherStart, teacherStart + this.page.max);
		while (this.body.firstChild) {
			this.body.firstChild.remove();
		}
		teacherSetup.forEach((data) => {
			const teacherSetupElm = TeachersTableList.createHtmlTr(data);
			this.body.appendChild(teacherSetupElm);
		});
		this.updatePagination(number);
	}

	onClickPage(number) {
		const pagePrevId = parseInt(this.pagination.dataset.current);
		const pagePrev = this.pagination.querySelector(`.pagination__link[data-value="${pagePrevId}"]`);
		pagePrev.classList.remove('pagination_current');
		// ~~~
		const page = this.pagination.querySelector(`.pagination__link[data-value="${number}"]`);
		this.pagination.dataset.current = number;
		this.page.current = number;
		page.classList.add('pagination_current');
		this.setupPage(number);
		if (window.innerWidth < 768) {
			this.table.scrollIntoView();
		}
	}

	updatePagination(pageCurrent) {
		while (this.pagination.firstChild) {
			this.pagination.firstChild.remove();
		}
		const addPage = (number, isCurrent = false) => {
			const page = TeachersTableList.createPaginationPage(number, isCurrent);
			page.onclick = () => this.onClickPage(number);
			this.pagination.appendChild(page);
		};

		const addPoints = () => {
			const points = TeachersTableList.createPaginationPoints();
			this.pagination.appendChild(points);
		};
		// ~~~
		let isPointsStart = false;
		let isPointsLast = false;
		const length = this.page.end;
		// ~~~
		if (length >= 3) {
			addPage(1);
		}
		if (pageCurrent > 3 && !isPointsStart) {
			addPoints();
			isPointsStart = true;
		}

		if (pageCurrent - 1 > 1) {
			addPage(pageCurrent - 1);
		}

		if (pageCurrent !== 1 && pageCurrent !== length) {
			addPage(pageCurrent);
		}

		if (pageCurrent + 1 < length) {
			addPage(pageCurrent + 1);
		}

		if (pageCurrent + 2 < length && !isPointsLast) {
			addPoints();
			isPointsLast = true;
		}
		if (length >= 3) {
			addPage(length);
		}
		// ~~~
		this.pagination.dataset.current = pageCurrent;
		const page = this.pagination.querySelector(`.pagination__link[data-value="${pageCurrent}"]`);
		page.classList.add('pagination_current');
	}

	updateTable() {
		this.setupPage(this.page.start);
	}

	add(teacherData) {
		this.teachers.push(TeachersTableList.createTableItem(teacherData));
		this.page.length++;
		TeachersTableList.calculator(this.page);
	}

	remove(teacherId) {
		const delId = this.teachers.findIndex((teacher) => teacher.id === teacherId);
		(delId !== -1) && this.teachers.slice(delId, 1);
		this.page.length--;
		TeachersTableList.calculator(this.page);
	}

	sort(opts) {
		this.teachers = Process.SortUsers(this.teachers, opts);
		this.updateTable();
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get all() {
		return this.teachers;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeachersTableList;
