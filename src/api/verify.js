import api from "./index.js";

export default {
  async verifyPayments(data) {
    const res = api().post("/api/orders/payments/verify", data);
    return res;
  },
  async verifyCommandPayments(data) {
    const res = api().post("/api/product-commande/payments/verify", data);
    return res;
  },
};
