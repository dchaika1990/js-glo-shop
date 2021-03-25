import './modules/slider';
import {scrollLink} from './helpers';
import cart from "./components/cart";
import modal from './components/modal';
import renderGoods from "./services/renderGoods";

document.addEventListener('DOMContentLoaded', function () {
	scrollLink('a.scroll-link');
	modal('.button-cart', '#modal-cart');
	cart();
	renderGoods();
})