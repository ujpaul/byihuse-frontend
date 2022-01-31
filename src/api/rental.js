import api from "./index.js";

export default {
  async getRental() {
    const res = api().get("/api/renting");
    return res;
  },
  async getRentalByCategory(data) {
    const res = api().post("/api/renting/category", data);
    return res;
  },
  async getRentalHouseByCategory(data) {
    const res = api().post("/api/rentals/house/category", data);
    return res;
  },
  async getOne(id) {
    const res = api().get(`/api/renting/${id}`);
    return res;
  },
  async rentalOrder(data) {
    const res = api().post(`/api/renting/order`, data);
    return res;
  },
  async houseRentalOrder(data) {
    const res = api().post(`/api/house-renting/order`, data);
    return res;
  },
  async sonorisationrentalOrder(data) {
    const res = api().post(`/api/sonorisation/order`, data);
    return res;
  },
  async decorationRentalOrder(data) {
    const res = api().post(`/api/decoration-renting/order`, data);
    return res;
  },
  async rentOrder(data) {
    const res = api().post(`/api/renting/rent-order`, data);
    return res;
  },
  async verify(data) {
    const res = api().post(`/api/renting/verify`, data);
    return res;
  },
  async houseRentVerify(data) {
    const res = api().post(`/api/house-renting/verify`, data);
    return res;
  },
  async sonorisationRentVerify(data) {
    const res = api().post(`/api/sonorisation/verify`, data);
    return res;
  },
  async decorationRentVerify(data) {
    const res = api().post(`/api/decoration-renting/verify`, data);
    return res;
  },
  async createCusomterProperty(data) {
    const res = api().post(`/api/rentals/customer-property`, data);
    return res;
  },
  async verifyProperyPayment(data) {
    const res = api().post(`/api/rentals/verify`, data);
    return res;
  },
};
