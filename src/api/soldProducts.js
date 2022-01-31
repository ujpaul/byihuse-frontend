import api from './index.js';

export default {
	async soldProducts() {
		const res = api().post('/api/orders/sold-products');
		return res;
	}
};
