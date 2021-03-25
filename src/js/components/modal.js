// cart
const modal = (buttonSelector, modalSelector) => {
	const buttonCart = document.querySelector(buttonSelector);
	const modalCart = document.querySelector(modalSelector);

	const openModal = () => modalCart.classList.add('show');
	const closeModal = () => modalCart.classList.remove('show');

	buttonCart.addEventListener('click', openModal);
	document.addEventListener('click', function (e) {
		const elem = e.target;
		if (elem.classList.contains('overlay') || elem.classList.contains('modal-close')) closeModal()
	});
}

export default modal;