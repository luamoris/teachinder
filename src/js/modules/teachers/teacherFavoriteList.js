// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHER FAVORITE LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TeacherFavoriteList {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static getMaxElms() {
		let max = 1;
		const width = window.innerWidth;
		if (width >= 1150) {
			max = 4;
		} else if (width >= 850 && width < 1150) {
			max = 3;
		} else if (width >= 600 && width < 850) {
			max = 2;
		}
		return max;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(listId) {
		this.ulList = document.getElementById(listId);
		if (this.list instanceof HTMLElement) {
			throw Error(`An element with this id: ${listId} was not found.`);
		}
		this.list = {};
		this.count = 0;
		this.countVisible = 0;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	addTeacher(liElm, teacherId) {
		this.list[teacherId] = {};
		this.list[teacherId].element = liElm;
		this.list[teacherId].visible = false;
		this.count++;
	}

	updateListElements() {
		const listVisible = [];
		const listHidden = [];
		const max = TeacherFavoriteList.getMaxElms();
		Object.keys(this.list).forEach((field) => {
			this.list[field].visible
				? listVisible.push(this.list[field])
				: listHidden.push(this.list[field]);
		});
		this.countVisible = listVisible.length;
		while (this.countVisible < max) {
			if (!listHidden.length) break;
			const teacherItem = listHidden.shift();
			teacherItem.visible = true;
			this.ulList.appendChild(teacherItem.element);
			this.countVisible++;
		}
		while (this.countVisible > max) {
			const teacherItem = listVisible.pop();
			teacherItem.visible = false;
			this.ulList.removeChild(teacherItem.element);
			this.countVisible--;
		}
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	onClick(liElm, teacher) {
		const teacherItem = this.list[teacher.id];
		if (teacher.favorite) {
			if (teacherItem) {
				teacherItem.visible = false;
			} else {
				this.addTeacher(liElm, teacher.id);
			}
		} else {
			if (!teacherItem) return;
			if (teacherItem.visible) {
				this.ulList.removeChild(teacherItem.element);
				this.countVisible--;
			}
			delete this.list[teacher.id];
			this.count--;
		}
		this.updateListElements();
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeacherFavoriteList;
