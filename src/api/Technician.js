import api from "./index.js";

export default {
  async register(data) {
    const res = api().post("/api/technicians/register", data);
    return res;
  },
  async orderTechician(data) {
    const res = api().post("/api/technicians/request", data);
    return res;
  },
  async verifyPayment(data) {
    const res = api().post("/api/technicians/verify", data);
    return res;
  },
  async verifyPaymentTechOrder(data) {
    const res = api().post("/api/technicians/verify-order", data);
    return res;
  },
  async getApprovedCommand(email) {
    const res = api().post("/api/product-commande/approved-for-client", email);
    return res;
  },
  async getTechnicians(district, type) {
    const res = api().get(`/api/technicians/${type}`);
    return res;
  },
  async getTechnician(id) {
    const res = api().get(`/api/technicians/technician/${id}`);
    return res;
  },
};
