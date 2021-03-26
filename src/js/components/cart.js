import {getGoods, postData} from "../services/request";
import {closeModal} from "../helpers";
import validation from "../services/validation";

// Cart component
const cartComponent = () => {
	const cartTableGoods = document.querySelector('.cart-table__goods');
	const cardTableTotal = document.querySelector('.card-table__total');
	const buttonCartCount = document.querySelector('.button-cart .cart-count');
	const modalForm = document.querySelector('.modal-form');

	const cart = {
		cartGoods: [],
		countGoods() {
			buttonCartCount.textContent = this.cartGoods.reduce((sum, good) => sum + good.count, 0 ).toString();
		},
		clearCart(){
			this.cartGoods = [];
			this.renderCart();
		},
		renderCart() {
			cartTableGoods.textContent = '';
			this.cartGoods.forEach(({id, name, price, count}) => {
				const trGood = document.createElement('tr');
				trGood.className = 'cart-item';
				trGood.dataset.id = id;

				trGood.innerHTML = `
					<td>${name}</td>
					<td>${price}$</td>
					<td>
						<button class="cart-btn-minus">-</button>
					</td>
					<td>${count}</td>
					<td>
						<button class="cart-btn-plus">+</button>
					</td>
					<td>${price * count}$</td>
					<td>
						<button class="cart-btn-delete">x</button>
					</td>
				`
				cartTableGoods.append(trGood);
			})

			const totalPrice = this.cartGoods.reduce((sum, item) => sum + item.price * item.count, 0);
			cardTableTotal.textContent = totalPrice + '$';
			this.countGoods();
		},
		deleteGoods(id) {
			this.cartGoods = this.cartGoods.filter(good => id !== good.id);
			this.renderCart();
		},
		minusGood(id) {
			this.cartGoods.forEach(item => {
				(item.id === id)
					? (item.count <= 1) ? this.deleteGoods(id) : item.count--
					: null;
			})
			this.renderCart();
		},
		plusGood(id) {
			this.cartGoods.forEach(item => {
				if (item.id === id) item.count++;
			})
			this.renderCart();
		},
		addCartGoods(id) {
			const goodItem = this.cartGoods.find(item => item.id === id);
			if (goodItem) {
				this.plusGood(goodItem.id)
			} else {
				getGoods()
					.then(data => data.find(item => id === item.id))
					.then(({id, name, price}) => {
						this.cartGoods.push(
							{
								id,
								name,
								price,
								count: 1
							}
						);
						this.renderCart()
					})
			}
		}
	}

	document.addEventListener('click', (e) => {
		const target = e.target;
		const addToCart = e.target.closest('.add-to-cart');

		if (addToCart) cart.addCartGoods(addToCart.dataset.id);
		if (target.classList.contains('button-clear')) cart.clearCart();
	})

	cartTableGoods.addEventListener('click', (e) => {
		const target = e.target;
		const id = target.closest('.cart-item').dataset.id;
		if (target.classList.contains('cart-btn-delete')) cart.deleteGoods(id);
		if (target.classList.contains('cart-btn-minus')) cart.minusGood(id);
		if (target.classList.contains('cart-btn-plus')) cart.plusGood(id);
	})

	modalForm.addEventListener('submit', e => {
		e.preventDefault();
		if (cart.cartGoods.length === 0) {
			closeModal('#modal-cart');
			return alert('Cart is empty')
		}
		validation(modalForm);
		const formData = new FormData(modalForm);
		formData.append('cart', JSON.stringify(cart.cartGoods));
		postData('./assets/server.php', formData)
			.then(res => {
				if (!res.ok) throw new Error(res.status)
				alert('Ваш заказ отправлен')
			})
			.catch(error => {
				alert(error)
			})
			.finally(()=>{
				closeModal('#modal-cart');
				modalForm.reset();
				cart.clearCart();
			});
	})

	cart.renderCart();
	validation(modalForm);
}

export default cartComponent;