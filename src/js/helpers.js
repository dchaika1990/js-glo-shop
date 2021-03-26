//scroll smooth
export const scrollLink = (btns) => {
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

export const closeModal = (modalCart) => {
	if ( typeof modalCart !== 'string') {
		modalCart.classList.remove('show');
	} else {
		const modal = document.querySelector(modalCart);
		modal.classList.remove('show');
	}
};