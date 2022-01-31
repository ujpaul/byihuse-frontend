import api from "./index.js";

export default {
  async request(data) {
    const res = api().post("/api/housing/request", data);
    return res;
  },
  async requestHouse(data) {
    const res = api().post("/api/housing/house-request", data);
    return res;
  },
  async verifyPayment(data) {
    const res = api().post("/api/housing/verify", data);
    return res;
  },
  async getConstructionProcess(truckNumber) {
    const res = api().get(`/api/housing/process/${truckNumber}`);
    return res;
  },
};
