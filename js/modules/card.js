import { getResource } from '../services/services';

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


	getResource('http://localhost:3000/menu')
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

export default card;

