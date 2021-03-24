//slider init
const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//scroll smooth
const scrollLink = (btns) => {
	const scrollLinkBtns = document.querySelectorAll(btns);

	scrollLinkBtns.forEach(btn => {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			const id = btn.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	})
}

// cart
const cartModal = () => {
	const buttonCart = document.querySelector('.button-cart');
	const modalCart = document.querySelector('#modal-cart');

	const openModal = () => modalCart.classList.add('show');
	const closeModal = () => modalCart.classList.remove('show');

	buttonCart.addEventListener('click', openModal);
	document.addEventListener('click', function (e) {
		const elem = e.target;
		if (elem.classList.contains('overlay') || elem.classList.contains('modal-close')) closeModal()
	});
}

//goods
const render = () => {
	const more = document.querySelector('.more');
	const navigationItems = document.querySelectorAll('.navigation-link');
	const longGoodsList = document.querySelector('.long-goods-list');
	const bannerAccessories = document.querySelector('.card-1');
	const bannerClothing = document.querySelector('.card-2');

	const getGoods = async function () {
		const result = await fetch('db/db.json');
		if (!result.ok) {
			throw new Error('Error - ' + result.status);
		}
		return await result.json();
	}

	const createCard = ({id, img, name, label, description, price, category, gender}) => {
		const card = document.createElement('div');
		card.className = 'col-lg-3 col-sm-6';
		card.innerHTML = `
		<div class="goods-card ${category} ${gender}">
			${label && `<span class="label">${label}</span>`}
			<img src="db/${img}" alt="${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			<p class="goods-description">${description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
		</div>
	`;
		return card;
	}

	const renderCard = function (data) {
		longGoodsList.textContent = '';
		const cards = data.map(createCard)
		longGoodsList.append(...cards)
		document.body.classList.add('show-goods');
	}

	const filterCards = (field, value) => {
		getGoods()
			.then(data => data.filter(good => good[field] === value))
			.then(renderCard)
			.then(function () {
				document.querySelector('.header').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			});
	}

	more.addEventListener('click', function (e) {
		e.preventDefault();
		getGoods()
			.then(renderCard)
			.then(function () {
				document.querySelector('.header').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			});
	})

	navigationItems.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const filed = link.dataset.field;
			const value = link.textContent;
			!filed ? getGoods().then(renderCard) : filterCards(filed, value);
		})
	})

	bannerAccessories.addEventListener('click', () => filterCards('category', 'Accessories'))
	bannerClothing.addEventListener('click', () => filterCards('category', 'Clothing'))
}

document.addEventListener('DOMContentLoaded', function () {
	cartModal();
	scrollLink('a.scroll-link');
	render();
})