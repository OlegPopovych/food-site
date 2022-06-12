function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}
function showModalWindow(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}


function modal(triggerSelector, modalSelector, modalTimerId) {

	//MODAL WINDOW

	const
		showModal = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	showModal.forEach((item) => {
		item.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId)
		);
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});


	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			closeModal(modalSelector);
		}
	});



	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModalWindow(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { showModalWindow };