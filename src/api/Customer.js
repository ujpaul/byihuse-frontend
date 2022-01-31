import api from './index.js';

export default {
	async getSingleCustomerRefund(id) {
		const res = api().get('/api/customers/' + id);
		return res;
	}
};
