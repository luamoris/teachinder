const ModalAddTeacher = document.getElementById('newTeacher');
const ModalCardTeacher = document.getElementById('infocardTeacher');

const getModal = (modal) => {
	modal.style.display = 'flex';
	modal.setAttribute('open', 'open');
	document.querySelector('body').classList.add('_dialog');
};

function delModal(id) {
	document.getElementById(id).style.display = 'none';
	document.getElementById(id).removeAttribute('open');
	document.querySelector('body').classList.remove('_dialog');
}

const ButtsAddTeacher = document.querySelectorAll('.add__button');
const ButtsCardTeacher = document.querySelectorAll('.teachers__item');
const ButtsCancel = document.querySelectorAll('.cancel');

for (const but of ButtsAddTeacher) {
	but.onclick = () => getModal(ModalAddTeacher);
}

for (const but of ButtsCardTeacher) {
	but.onclick = () => getModal(ModalCardTeacher);
}

for (const but of ButtsCancel) {
	but.onclick = (even) => delModal(even.srcElement.id.split('-')[1]);
}
