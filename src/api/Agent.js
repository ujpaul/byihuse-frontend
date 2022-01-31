import api from "./index.js";
export default {
  async register(data) {
    const res = api().post("/api/agent/register", data);
    console.log(res);
    return res;
  },
  async verify(data) {
    const res = api().post("/api/agent/verify", data);
    console.log(res);
    return res;
  },
  async getBalance(id) {
    const res = api().get(`/api/agent/balance/${id}`);
    console.log(res);
    return res;
  },
};
