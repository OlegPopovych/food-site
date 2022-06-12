import { showModalWindow, closeModal } from './modal';
import { postData } from '../services/services';


function forms(formSelector, modalTimerId) {
	//FORMS
	const forms = document.querySelectorAll(formSelector);

	const mess = {
		loading: "img/form/spinner.svg",
		success: "Дякуємо! Ми з вами звяжемось",
		failure: "Щось пsшло не так"
	};

	forms.forEach(item => {
		bindPostData(item);
	});



	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = mess.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries())); //перетворення: масив масивів даних з форми > класичний об'єкт > json

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(mess.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(mess.failure);
				}).finally(() => {
					form.reset();
				});
			// request.send(json);   // or formData if wee use XLM

			// request.addEventListener('load', () => {
			// 	if (request.status === 200) {
			// 		console.log(request.response);
			// 		showThanksModal(mess.success);
			// 		form.reset();
			// 		statusMessage.remove();
			// 	} else {
			// 		showThanksModal(mess.failure);
			// 	}
			// })
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		showModalWindow('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>x</div>
			<div class="modal__title">${message}</div>
		</div>
	`;
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			//prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);//
	}


}

export default forms;

