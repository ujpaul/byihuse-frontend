import api from "./index.js";

export default {
  async makeOrder(data) {
    const res = api().post("/api/orders", data);
    return res;
  },
  async chargeCard(data) {
    const res = api().post("/api/orders/payments/card", data);
    return res;
  },
};
