// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TEACHER FAVORITE LIST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TeacherFavoriteList {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static getMaxElms() {
		let max = 1;
		const width = window.innerWidth;
		if (width >= 1150) max = 4;
		else if (width >= 850 && width < 1150) max = 3;
		else if (width >= 600 && width < 850) max = 2;
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
		this.countActive = 0;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	updateListElement() {
		const max = TeacherFavoriteList.getMaxElms();
		if (this.countActive < max) {
			let countVisible = 0;
			Object.keys(this.list).forEach((filed) => {
				if (countVisible === max) return;
				if (!this.list[filed].visible) {
					this.ulList.appendChild(this.list[filed].element);
					this.list[filed].visible = true;
				}
				countVisible++;
			});
		}
	}

	addTeacher(liElm, teacher) {
		this.list[teacher.id] = {};
		this.list[teacher.id].element = liElm;
		this.list[teacher.id].visible = false;
		this.updateListElement();
		this.count++;
	}

	onClick(liElm, teacher) {
		if (teacher.favorite) {
			this.addTeacher(liElm, teacher);
		} else {
			if (!this.list[teacher.id]) return;
			if (this.list[teacher.id].visible) {
				this.ulList.removeChild(this.list[teacher.id].element);
				this.countActive--;
			}
			delete this.list[teacher.id];
			this.count--;
			this.updateListElement();
		}
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeacherFavoriteList;
