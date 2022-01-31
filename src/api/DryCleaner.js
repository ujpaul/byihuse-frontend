import api from "./index.js";

export default {
  async getServiceByType(type) {
    const res = api().get(`/api/dry-cleaner/services/${type}`);
    return res;
  },
  async getCustomerOrder(trackNumber) {
    const res = api().get(`/api/dry-cleaner/customer-order/${trackNumber}`);
    return res;
  },
  async makeOrder(data) {
    const res = api().post(`/api/dry-cleaner/make-order`, data);
    return res;
  },
  async verifyPayment(data) {
    const res = api().post(`/api/dry-cleaner/verify-order`, data);
    return res;
  },
};
