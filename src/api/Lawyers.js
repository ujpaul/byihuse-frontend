import api from "./index.js";

export default {
  async register(data) {
    const res = api().post("/api/lawyers/register", data);
    return res;
  },
  async verifyPayment(data) {
    const res = api().post("/api/lawyers/verify", data);
    return res;
  },
  async getApprovedCommand(email) {
    const res = api().post("/api/product-commande/approved-for-client", email);
    return res;
  },
  async getLawyersInDistrict(district, type) {
    const res = api().get(`/api/lawyers/in-district/${district}/${type}`);
    return res;
  },
};
