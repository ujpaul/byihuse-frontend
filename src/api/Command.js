import api from "./index.js";

export default {
  async makeCommand(data) {
    const res = api().post("/api/product-commande", data);
    return res;
  },
  async confirmReceivedCommand(data) {
    const res = api().post("/api/product-commande/confirmation", data);
    return res;
  },
  async commandOrder(data) {
    const res = api().post("/api/product-commande/order", data);
    return res;
  },
  async getApprovedCommand(email) {
    const res = api().post("/api/product-commande/approved-for-client", email);
    return res;
  },
};
