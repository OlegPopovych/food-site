/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSetings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalSetings('#gender div', 'calculating__choose-item_active');
	initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
		} else {
			result.textContent = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
		}
	}
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio'); // беремо значення атрибута
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}


	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);





/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function card() {

	// MENU ITEM CONSTRUCTOR

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}
		changeToUAH() {
			this.price = this.price * this.transfer; // конвертація в гривні
		}
		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {  // перевірка на наявність класів в рест масиві
				this.element = 'menu__item';  // клас по замовчуваню
				element.classList.add(this.element); // додавання масиву по замовчуванню
			} else { // якщо масиви задані - перебрати їх з додаванням в список класів елемента
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
						<img src=${this.src} alt=${this.alt}>
						<h3 class="menu__item-subtitle">${this.title}</h3>
						<div class="menu__item-descr">${this.descr}</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
						</div>
			`;
			this.parent.append(element);
		}
	}


	// 1 варіант рендуру елемнтів на сторінку з шаблоном
	// async function getResource(url, data) {  // async говорить, що код асинххронний
	// 	let res = await fetch(url);             // авейт - каже зачекати поки від фетча не прийде результат

	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// 	}

	// 	return await res.json();
	// };


	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(
				({ img, alting, title, descr, price }) => {   //дані з деструкторизованого масиву даних з сервера
					new MenuCard(img, alting, title, descr, price, '.menu__field .container').render();
				});
		});

	// axios.get('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.data.forEach(
	// 			({ img, alting, title, descr, price }) => {   //дані з деструкторизованого масиву даних з сервера
	// 				new MenuCard(img, alting, title, descr, price, '.menu__field .container').render();
	// 			});
	// 	});





	// //2 варіант рендуру елемнтів на сторінку без шаблона
	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));
	// function createCard(data) {
	// 	data.forEach(({ img, alt, title, descr, price }) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 		<img src=${img} alt=${alt}>
	// 				<h3 class="menu__item-subtitle">${title}</h3>
	// 				<div class="menu__item-descr">${descr}</div>
	// 				<div class="menu__item-divider"></div>
	// 				<div class="menu__item-price">
	// 					<div class="menu__item-cost">Цена:</div>
	// 					<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 				</div>
	// 		`;
	// 		document.querySelector('.menu__field .container').append(element);
	// 	});
	// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);



/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModalWindow)('.modal', modalTimerId);

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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);//
	}


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "showModalWindow": () => (/* binding */ showModalWindow)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, prevArrov, totalCounter, currentCounter, wrapper, field }) {

	//  SLIDER

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrov),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter);

	let slideIndex = 1;

	showSldes(slideIndex);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	function showSldes(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => item.style.display = "none");

		slides[slideIndex - 1].style.display = 'block';

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		// dots.forEach(dot => dot.style.opacity = '.5');
		// dots.[slideIndex -1].style.opacity = 1;


	}




	function plusSlides(n) {

		showSldes(slideIndex += n);
	}

	slider.style.position = 'relative';

	const indicators = document.createElement('ol');
	//dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
	box-sizing: content-box;
	flex: 0 1 auto;
	width: 30px;
	height: 6px;
	margin-right: 3px;
	margin-left: 3px;
	cursor: pointer;
	background-color: #fff;
	background-clip: padding-box;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	opacity: .5;
	transition: opacity .6s ease;
	`;
		// if (i = 0) {
		// 	dot.style.opacity = 1;
		// }

		indicators.append(dot);
		// dots.push(dot);
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);

	});

	next.addEventListener('click', () => {
		plusSlides(1);
	});


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, TabsParentSelector, activeClass) {

	const tabsBtn = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsBtnParent = document.querySelector(TabsParentSelector);

	function hideContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show');
		});

		tabsBtn.forEach((item) => {
			item.classList.remove(activeClass);
		});
	}

	function showContent(i = 0) {
		tabsBtn[i].classList.add(activeClass);
		tabsContent[i].classList.add('show');
	}
	hideContent();
	showContent();

	tabsBtnParent.addEventListener('click', (e) => {
		let target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabsBtn.forEach((item, i) => {
				if (target === item) {
					hideContent();
					showContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {

	//TIMER

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()) + (new Date(endTime).getTimezoneOffset() * 60 * 1000),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(selector, endTime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function zero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = zero(t.days),
				hours.innerHTML = zero(t.hours),
				minutes.innerHTML = zero(t.minutes),
				seconds.innerHTML = zero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock(id, deadLine);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);



/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {  // async говорить, що код асинххронний
	const res = await fetch(url, {// авейт - каже зачекати поки від фетча не прийде результат
		method: "POST",
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json();
};

async function getResource(url) {  // async говорить, що код асинххронний
	let res = await fetch(url);             // авейт - каже зачекати поки від фетча не прийде результат

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}

	return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
//'use strict';







  // імпорт ф-ї для таймера


window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__.showModalWindow)('.modal', modalTimerId), 10000);
	// ф-я виконаяється за ЧАС, запустить showModalWindow, або кліком чи скролом буде запущено showModalWindow і 
	// відбудеться clearInterval(modalTimerId) у ф-ї showModalWindow в ./modules/modal
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_card__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrov: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: 'not_used',
		field: 'not_used'
	});
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-06-23');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]', '.modal', modalTimerId);

	// 	const tabs = document.querySelectorAll('.tabheader__item'),
	// 		tabsContent = document.querySelectorAll('.tabcontent'),
	// 		tabsParent = document.querySelector('.tabheader__items');


	// 	function hideTabContent() {
	// 		tabsContent.forEach((item) => {
	// 			item.classList.add('hide');
	// 			item.classList.remove('show');
	// 		});

	// 		tabs.forEach(item => {
	// 			item.classList.remove('tabheader__item_active');
	// 		});
	// 	}

	// 	function showTabContent (i = 0) {
	// 		tabsContent[i].classList.add('show');
	// 		tabs[i].classList.add('tabheader__item_active');
	// 	}

	// 	hideTabContent();
	// 	showTabContent();

	// tabsParent.addEventListener('click', (event) => {
	// 	let target = event.target;

	// 	if (target && target.classList.contains('tabheader__item')) {
	// 		tabs.forEach((item, i) => {
	// 			if (target == item) {
	// 				hideTabContent();
	// 				showTabContent(i);
	// 			}
	// 		});
	// 	}
	// });

	//   КОНТЕКСТ ВИКЛИКУ. this

	// function showThis(a, b) {
	// 	console.log(this);
	// 	function sum() {
	// 		console.log(this);
	// 		return a + b;
	// 	}
	// 	console.log(sum());
	// }
	// showThis (4, 5);

	// const obj = {
	// 	a: 20,
	// 	p:25,
	// 	sum: function() {
	// 		console.log(this);
	// 	}
	// };
	// obj.sum();

	// function User(name, id) {
	// 	this.name = name;
	// 	this.id = id;
	// 	this.human - true;
	// 	this.hello = function() {
	// 		console.log('Hello ' + this.name);
	// 	}
	// }
	// let Ivan = new User('Ivan', 23);
	// console.log(Ivan);

	// function sayName(surname) {
	// 	console.log(this);
	// 	console.log(this.name + surname);
	// }
	// const user = {
	// 	name: 'John'
	// };
	// sayName.call(user, 'Smith');
	// sayName.apply(user, ['Smith']);

	// function count(num) {
	// 	return this * num;
	// }
	// const double = count.bind(2);  // записуємо у функію count значення 2 в this.
	// console.log(double(3)); // передаємо змінну в забіндену функцію
	// console.log(double(6));


	//1) Звичайна функція : this = window, але якщо use strict - undefined
	//2) Якщо використовувати метод в середини об'єкта то контекст виклику буде посилатись на сам об'єкт.
	//3) this в конструкторах і класах це новий екземпляр об'єкта.
	//4) Ручна прив'язка bind  call    apply

	// const btn = document.querySelector('button');

	// btn.addEventListener('click', function () {   // якщо стандартний виклий функції, то
	// 	console.log(this);     							// this працює як event.target
	// });   		// стрілкова ф-я не має свого контексту!! this бере у свого перента

	// const obj = {
	// 	num: 5,
	// 	sayNumber: function () {
	// 		const say = () => {
	// 			console.log(this); // say() не має свого this, 
	// 		};   						// бере його в sayNumber, тобто в obj

	// 		say();

	// 	}
	// }
	// obj.sayNumber();


	// class Rectangle {
	// 	constructor(height, width) {
	// 		this.height = height;   // створює об'єкт з адресам ключів object.height & object.width 
	// 		this.width = width;     // з методом calcArea()
	// 	}

	// 	calcArea() {
	// 		return this.height * this.width;
	// 	}
	// }



	// class ColoredRectandleWithText extends Rectangle {  // |наслідує від Rectangle
	// 	constructor (height, width, text, bgColor) {
	// 		super(height, width);   // використовує з перента його конструктор
	// 		this.text = text;
	// 		this.bgColor = bgColor;
	// 	}

	// 	showMyProps() {
	// 		console.log(`text: ${this.text}, color: ${this.bgColor}`);
	// 	}
	// }

	// const div = new ColoredRectandleWithText(25, 10, `hello world`,'red');

	// div.showMyProps();
	// console.log(div.calcArea());


	// const square = new Rectangle(10, 10);
	// console.log(square.calcArea());

	// const log = function (a, b, ...rest) { // рест оператор
	// 	console.log(a, b, rest);
	// }
	// log('basic', 'rest', 'operator', 'usage');

	// function calc0Double(number, basis = 2) {
	// 	console.log(number * basis);
	// }



	// ПЕРЕБІР МАСИВІВ


	// const names = ['Ivat', 'Ann', 'Ksenia', 'Voldemort'];


	// //filter
	// const shortNames = names.filter(function (name) {
	// 	return name.length < 5;
	// });

	// //map   створє новий масив
	// const answers = ['iVan', 'ANn', 'HellO'];
	// const result = answers.map(item => item.toLowerCase());

	// //every/some    вертає булін
	// const some1 = [4, 'qqq', 'sdf'];
	// console.log(some1.some(item => typeof (item) === 'number'));
	// console.log(some1.every(item => typeof (item) === 'number'));

	// //reduce
	// const arr = [4, 5, 1, 3, 2, 6];
	// 0    // пояснення етапів сумування, замість нуля може бути початкове значення
	// 0 + 4
	// 4 + 5
	// 9 + 1
	// const result = arr.reduce((sum, current, тут може бути початкове значення) => sum + current);
	// console.log(result);

	// const arr = ['apple', 'pea', 'plum'];
	// const res = arr.reduce((sum, current) => `${sum}, ${current}`);
	// console.log(res);

	// const obj = {
	// 	ivat: 'persone',
	// 	ann: 'persone',
	// 	dog: 'animal',
	// 	cat: 'animal'
	// };
	// const newArr = Object.entries(obj) // перетворює аргументи і значення об'єкту в масиви
	// 	.filter(item => item[1] === 'persone')  //фільтруємо масив і виводимо тільки ті масивиде 2 елемент масиву має "персоне"
	// 	.map(item => item[0]); // \повертає тільки перші елементи масивів
	// console.log(newArr);



	// fetch('http://localhost:3000/menu')
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));


	// ГЕТТЕРИ І СЕТТЕРИ
	// const persone = {
	// 	name: 'Alex',
	// 	age: 25,

	// 	get userAge() {
	// 		return this.age;
	// 	},

	// 	set userAge(num) {
	// 		this.age = num;
	// 	}
	// };

	// console.log(persone.userAge = 30);  //записуэмо через сетер
	// console.log(persone.userAge); // беремо через гетер


	// function User(name, age) {
	// 	this.name = name;
	// 	let userAge = age;
	// 	this.say = function () {
	// 		console.log(`Ім\'я користувача: ${this.name}, вік ${this.userAge}`);
	// 	};

	// 	this.getAge = function () {
	// 		return userAge;
	// 	};

	// 	this.setAge = function (age) {
	// 		userAge = age;  // можна добавити первірки
	// 	};
	// }

	// const oleg = new User('Oleg', 32);
	// console.log(oleg.userAge);  // undefinde не можливо змінити зовні, тільки через геттери і сетери
	// console.log(oleg.getAge());
	// oleg.setAge(30);    //встановити значення для userAge




	//ІНКАПСУЛЯЦІЯ

	// class User {
	// 	constructor(name, age) {
	// 		this.name = name;
	// 		this._age = age;  //  "_"  мало б робити приватний ключ, не доступнй через обєкт.ключ, але не робить
	// 	}
	// 	// #surname = 'Petrychenko';  // експерементальний задавати приватні значення класів

	// 	say() {
	// 		console.log(`Ім\'я користувача: ${this.name}, вік ${this._age}`);
	// 	}

	// 	get age() {
	// 		return this._age;
	// 	}

	// 	set age(age) {
	// 		if (typeof age === 'number' && age > 0 && age < 110) { // будь яка перевірка перед записом
	// 			this._age = age;
	// 		} else {
	// 			console.log('не вірне значення');
	// 		}
	// 	}
	// }

	// const ivan = new User('Ivan', 27);



	// АНОНІМНІ ФІНКЦІЇ І МОДУЛІ

	// (function () {
	// 	body
	// }());

	// const user = (function () {
	// 	const privat = function () {
	// 		console.log('i am privat');
	// 	};

	// 	return {
	// 		sayHello: privat
	// 	};

	// }());

	// user.sayHello();  // метод для user












	// const tabsBtn = document.querySelectorAll('.tabheader__item'),
	// 	tabsContent = document.querySelectorAll('.tabcontent'),
	// 	tabsBtnParent = document.querySelector('.tabheader__items');

	// function hideContent() {
	// 	tabsContent.forEach((item) => {
	// 		item.classList.add('hide');
	// 		item.classList.remove('show');
	// 	});

	// 	tabsBtn.forEach((item) => {
	// 		item.classList.remove('tabheader__item_active');
	// 	});
	// }

	// function showContent(i = 0) {
	// 	tabsBtn[i].classList.add('tabheader__item_active');
	// 	tabsContent[i].classList.add('show');
	// }
	// hideContent();
	// showContent();

	// tabsBtnParent.addEventListener('click', (e) => {
	// 	let target = e.target;

	// 	if (target && target.classList.contains('tabheader__item')) {
	// 		tabsBtn.forEach((item, i) => {
	// 			if (target === item) {
	// 				hideContent();
	// 				showContent(i);
	// 			}
	// 		});
	// 	}
	// });



	// //TIMER

	// const deadLine = "2022-02-07";

	// function getTimeRemaining(endTime) {
	// 	const t = Date.parse(endTime) - Date.parse(new Date()) + (new Date(endTime).getTimezoneOffset() * 60 * 1000),
	// 		days = Math.floor(t / (1000 * 60 * 60 * 24)),
	// 		hours = Math.floor((t / (1000 * 60 * 60)) % 24),
	// 		minutes = Math.floor((t / 1000 / 60) % 60),
	// 		seconds = Math.floor((t / 1000) % 60);
	// 	return {
	// 		'total': t,
	// 		'days': days,
	// 		'hours': hours,
	// 		'minutes': minutes,
	// 		'seconds': seconds
	// 	};
	// }

	// function setClock(selector, endTime) {

	// 	const timer = document.querySelector(selector),
	// 		days = timer.querySelector('#days'),
	// 		hours = timer.querySelector('#hours'),
	// 		minutes = timer.querySelector('#minutes'),
	// 		timeInterval = setInterval(updateClock, 1000);

	// 	updateClock();

	// 	function zero(num) {
	// 		if (num >= 0 && num < 10) {
	// 			return `0${num}`;
	// 		} else {
	// 			return num;
	// 		}
	// 	}

	// 	function updateClock() {
	// 		const t = getTimeRemaining(endTime);

	// 		days.innerHTML = zero(t.days),
	// 			hours.innerHTML = zero(t.hours),
	// 			minutes.innerHTML = zero(t.minutes),
	// 			seconds.innerHTML = zero(t.seconds);

	// 		if (t.total <= 0) {
	// 			clearInterval(timeInterval);
	// 		}
	// 	}
	// }
	// setClock('.timer', deadLine);

	// //MODAL WINDOW

	// const modal = document.querySelector('.modal'),
	// 	showModal = document.querySelectorAll('[data-modal]');


	// function closeModal() {
	// 	modal.classList.add('hide');
	// 	modal.classList.remove('show');
	// 	document.body.style.overflow = '';
	// }
	// function showModalWindow() {
	// 	modal.classList.add('show');
	// 	modal.classList.remove('hide');
	// 	document.body.style.overflow = 'hidden';
	// }

	// showModal.forEach((item) => {
	// 	item.addEventListener('click', () => {
	// 		showModalWindow();
	// 	});
	// });

	// modal.addEventListener('click', (e) => {
	// 	if (e.target === modal || e.target.getAttribute('data-close') == '') {
	// 		closeModal();
	// 	}
	// });


	// document.addEventListener('keydown', (e) => {
	// 	if (e.code === 'Escape') {
	// 		closeModal();
	// 	}
	// });

	// const modalTimerId = setTimeout(showModalWindow, 50000);

	// function showModalByScroll() {
	// 	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
	// 		showModalWindow();
	// 		window.removeEventListener('scroll', showModalByScroll);
	// 	}
	// }
	// window.addEventListener('scroll', showModalByScroll);



	// //FORMS
	// const forms = document.querySelectorAll('form');

	// const mess = {
	// 	loading: "img/form/spinner.svg",
	// 	success: "Дякуємо! Ми з вами звяжемось",
	// 	failure: "Щось пsшло не так"
	// };

	// forms.forEach(item => {
	// 	bindPostData(item);
	// });

	// const postData = async (url, data) => {  // async говорить, що код асинххронний
	// 	const res = await fetch(url, {// авейт - каже зачекати поки від фетча не прийде результат
	// 		method: "POST",
	// 		headers: {
	// 			'Content-type': 'application/json'
	// 		},
	// 		body: data
	// 	});
	// 	return await res.json();
	// };

	// function bindPostData(form) {
	// 	form.addEventListener('submit', (e) => {
	// 		e.preventDefault();

	// 		const statusMessage = document.createElement('img');
	// 		statusMessage.src = mess.loading;
	// 		statusMessage.style.cssText = `
	// 				display: block;
	// 				margin: 0 auto;
	// 			`;
	// 		form.insertAdjacentElement('afterend', statusMessage);

	// 		//const request = new XMLHttpRequest();
	// 		// request.open('POST', 'server.php');
	// 		//request.setRequestHeader('Content-type', 'multipart/form-data'); для xml не треба
	// 		// request.setRequestHeader('Content-type', 'aplication/jason');  // for send json file
	// 		const formData = new FormData(form);

	// 		const json = JSON.stringify(Object.fromEntries(formData.entries())); //перетворення: масив масивів даних з форми > класичний об'єкт > json

	// 		postData('http://localhost:3000/requests', json)
	// 			.then(data => {
	// 				console.log(data);
	// 				showThanksModal(mess.success);
	// 				statusMessage.remove();
	// 			}).catch(() => {
	// 				showThanksModal(mess.failure);
	// 			}).finally(() => {
	// 				form.reset();
	// 			});




	// 		// request.send(json);   // or formData if wee use XLM

	// 		// request.addEventListener('load', () => {
	// 		// 	if (request.status === 200) {
	// 		// 		console.log(request.response);
	// 		// 		showThanksModal(mess.success);
	// 		// 		form.reset();
	// 		// 		statusMessage.remove();
	// 		// 	} else {
	// 		// 		showThanksModal(mess.failure);
	// 		// 	}
	// 		// })

	// 	});
	// }

	// function showThanksModal(message) {
	// 	const prevModalDialog = document.querySelector('.modal__dialog');

	// 	prevModalDialog.classList.add('hide');
	// 	showModalWindow();

	// 	const thanksModal = document.createElement('div');
	// 	thanksModal.classList.add('modal__dialog');
	// 	thanksModal.innerHTML = `
	// 			<div class="modal__content">
	// 				<div class="modal__close" data-close>x</div>
	// 				<div class="modal__title">${message}</div>
	// 			</div>
	// 		`;
	// 	document.querySelector('.modal').append(thanksModal);
	// 	setTimeout(() => {
	// 		thanksModal.remove();
	// 		//prevModalDialog.classList.add('show');
	// 		prevModalDialog.classList.remove('hide');
	// 		closeModal();
	// 	}, 4000);
	// }




	// // MENU ITEM CONSTRUCTOR

	// class MenuCard {
	// 	constructor(src, alt, title, descr, price, parentSelector, ...classes) {
	// 		this.src = src;
	// 		this.alt = alt;
	// 		this.title = title;
	// 		this.descr = descr;
	// 		this.price = price;
	// 		this.classes = classes;
	// 		this.parent = document.querySelector(parentSelector);
	// 		this.transfer = 27;
	// 		this.changeToUAH();
	// 	}
	// 	changeToUAH() {
	// 		this.price = this.price * this.transfer; // конвертація в гривні
	// 	}
	// 	render() {
	// 		const element = document.createElement('div');

	// 		if (this.classes.length === 0) {  // перевірка на наявність класів в рест масиві
	// 			this.element = 'menu__item';  // клас по замовчуваню
	// 			element.classList.add(this.element); // додавання масиву по замовчуванню
	// 		} else { // якщо масиви задані - перебрати їх з додаванням в список класів елемента
	// 			this.classes.forEach(className => element.classList.add(className));
	// 		}

	// 		element.innerHTML = `
	// 					<img src=${this.src} alt=${this.alt}>
	// 					<h3 class="menu__item-subtitle">${this.title}</h3>
	// 					<div class="menu__item-descr">${this.descr}</div>
	// 					<div class="menu__item-divider"></div>
	// 					<div class="menu__item-price">
	// 						<div class="menu__item-cost">Цена:</div>
	// 						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
	// 					</div>
	// 		`;
	// 		this.parent.append(element);
	// 	}
	// }

	// // const getResource = async (url, data) => {  // async говорить, що код асинххронний
	// // 	const res = await fetch(url);             // авейт - каже зачекати поки від фетча не прийде результат

	// // 	if (!res.ok) {
	// // 		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// // 	}

	// // 	return await res.json();
	// // };

	// //1 варіант рендуру елемнтів на сторінку з шаблоном
	// // getResource('http://localhost:3000/menu')
	// // 	.then(data => {
	// // 		data.forEach(
	// // 			({ img, alting, title, descr, price }) => {   //дані з деструкторизованого масиву даних з сервера
	// // 				new MenuCard(img, alting, title, descr, price, '.menu__field .container').render();
	// // 			});
	// // 	});

	// axios.get('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.data.forEach(
	// 			({ img, alting, title, descr, price }) => {   //дані з деструкторизованого масиву даних з сервера
	// 				new MenuCard(img, alting, title, descr, price, '.menu__field .container').render();
	// 			});
	// 	});





	// // //2 варіант рендуру елемнтів на сторінку без шаблона
	// // getResource('http://localhost:3000/menu')
	// // 	.then(data => createCard(data));
	// // function createCard(data) {
	// // 	data.forEach(({ img, alt, title, descr, price }) => {
	// // 		const element = document.createElement('div');

	// // 		element.classList.add('menu__item');
	// // 		element.innerHTML = `
	// // 		<img src=${img} alt=${alt}>
	// // 				<h3 class="menu__item-subtitle">${title}</h3>
	// // 				<div class="menu__item-descr">${descr}</div>
	// // 				<div class="menu__item-divider"></div>
	// // 				<div class="menu__item-price">
	// // 					<div class="menu__item-cost">Цена:</div>
	// // 					<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// // 				</div>
	// // 		`;
	// // 		document.querySelector('.menu__field .container').append(element);
	// // 	});
	// // }

	// //  SLIDER

	// const slides = document.querySelectorAll('.offer__slide'),
	// 	slider = document.querySelector('.offer__slider'),
	// 	prev = document.querySelector('.offer__slider-prev'),
	// 	next = document.querySelector('.offer__slider-next'),
	// 	total = document.querySelector('#total'),
	// 	current = document.querySelector('#current');

	// let slideIndex = 1;

	// showSldes(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSldes(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.style.display = "none");

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}

	// 	// dots.forEach(dot => dot.style.opacity = '.5');
	// 	// dots.[slideIndex -1].style.opacity = 1;


	// }




	// function plusSlides(n) {

	// 	showSldes(slideIndex += n);
	// }

	// slider.style.position = 'relative';

	// const indicators = document.createElement('ol');
	// dots = [];

	// indicators.classList.add('carousel-indicators');
	// indicators.cssText = `
	// 	position: absolute;
	// 	right: 0;
	// 	bottom: 0;
	// 	left: 0;
	// 	z-index: 15;
	// 	display: flex;
	// 	justify-content: center;
	// 	margin-right: 15%;
	// 	margin-left: 15%;
	// 	list-style: none;
	// 	`;
	// slider.append(indicators);

	// for (let i = 0; i < slides.length; i++) {
	// 	const dot = document.createElement('li');
	// 	dot.setAttribute('data-slide-to', i + 1);
	// 	dot.style.cssText = `
	// 		box-sizing: content-box;
	// 		flex: 0 1 auto;
	// 		width: 30px;
	// 		height: 6px;
	// 		margin-right: 3px;
	// 		margin-left: 3px;
	// 		cursor: pointer;
	// 		background-color: #fff;
	// 		background-clip: padding-box;
	// 		border-top: 10px solid transparent;
	// 		border-bottom: 10px solid transparent;
	// 		opacity: .5;
	// 		transition: opacity .6s ease;
	// 		`;
	// 	// if (i = 0) {
	// 	// 	dot.style.opacity = 1;
	// 	// }

	// 	indicators.append(dot);
	// 	// dots.push(dot);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);

	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });



	// // CALC

	// const result = document.querySelector('.calculating__result span');
	// let sex, height, weight, age, ratio;

	// if (localStorage.getItem('sex')) {
	// 	sex = localStorage.getItem('sex');
	// } else {
	// 	sex = 'female';
	// 	localStorage.setItem('sex', 'female');
	// }

	// if (localStorage.getItem('ratio')) {
	// 	ratio = localStorage.getItem('ratio');
	// } else {
	// 	ratio = 1.375;
	// 	localStorage.setItem('ratio', 1.375);
	// }

	// function initLocalSetings(selector, activeClass) {
	// 	const elements = document.querySelectorAll(selector);

	// 	elements.forEach(elem => {
	// 		elem.classList.remove(activeClass);
	// 		if (elem.getAttribute('id') === localStorage.getItem('sex')) {
	// 			elem.classList.add(activeClass);
	// 		}
	// 		if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
	// 			elem.classList.add(activeClass);
	// 		}
	// 	});
	// }
	// initLocalSetings('#gender div', 'calculating__choose-item_active');
	// initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');

	// function calcTotal() {
	// 	if (!sex || !height || !weight || !age || !ratio) {
	// 		result.textContent = '____';
	// 		return;
	// 	}

	// 	if (sex === 'female') {
	// 		result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
	// 	} else {
	// 		result.textContent = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
	// 	}
	// }
	// calcTotal();

	// function getStaticInformation(selector, activeClass) {
	// 	const elements = document.querySelectorAll(selector);

	// 	elements.forEach(elem => {
	// 		elem.addEventListener('click', (e) => {
	// 			if (e.target.getAttribute('data-ratio')) {
	// 				ratio = +e.target.getAttribute('data-ratio'); // беремо значення атрибута
	// 				localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
	// 			} else {
	// 				sex = e.target.getAttribute('id');
	// 				localStorage.setItem('sex', e.target.getAttribute('id'));
	// 			}
	// 			elements.forEach(elem => {
	// 				elem.classList.remove(activeClass);
	// 			});
	// 			e.target.classList.add(activeClass);

	// 			calcTotal();
	// 		});
	// 	});
	// }


	// getStaticInformation('#gender div', 'calculating__choose-item_active');
	// getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	// function getDynamicInformation(selector) {
	// 	const input = document.querySelector(selector);

	// 	input.addEventListener('input', () => {

	// 		if (input.value.match(/\D/g)) {
	// 			input.style.border = '1px solid red';
	// 		} else {
	// 			input.style.border = 'none';
	// 		}

	// 		switch (input.getAttribute('id')) {
	// 			case 'height':
	// 				height = +input.value;
	// 				break;
	// 			case 'weight':
	// 				weight = +input.value;
	// 				break;
	// 			case 'age':
	// 				age = +input.value;
	// 				break;
	// 		}
	// 		calcTotal();
	// 	});
	// }

	// getDynamicInformation('#height');
	// getDynamicInformation('#weight');
	// getDynamicInformation('#age');












});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map