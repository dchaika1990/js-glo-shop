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