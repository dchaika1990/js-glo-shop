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



document.addEventListener('DOMContentLoaded', function () {
	cartModal();
	scrollLink('a.scroll-link');
})