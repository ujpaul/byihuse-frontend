/**
 * VueShop Store
 */

import Vue from "vue";
import Vuex from "vuex";
// import language from './modules/settings/data'

// modules
// import account from './modules/account';
import ecommerce from "./modules/ecommerce";
import sidebar from "./modules/sidebar";
import settings from "./modules/settings";
import payment from "./modules/payment";
import blog from "./modules/blog";
import productDetail from "./modules/productDetail";
// import { data } from 'jquery';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // language,
    // selectedLocale: languages[0],
    shipping: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    assignedDepartments: "",
    token: "",
    drawer: null,
    totalPrice: "",
    refund: 0,
    agentCode: "",
    linksformbackend: "Https://byihuse.rw/",
    // linksformbackend: 'http://localhost:4000/',
    user: false,
    //linksformbackend: 'Https://byihuse.rw/'
    // linksformbackend:'Https://byihuse.rw/',
  },
  getters: {
    shipping: (state) => {
      return state.shipping;
    },
    agentCode: (state) => {
      return state.agentCode;
    },
    user: (state) => {
      return state.user;
    },
    linksformbackend: (state) => {
      return state.linksformbackend;
    },
    firstName: (state) => {
      return state.firstName;
    },
    lastName: (state) => {
      return state.lastName;
    },
    email: (state) => {
      return state.email;
    },
    role: (state) => {
      return state.role;
    },
    assignedDepartments: (state) => {
      return state.assignedDepartments;
    },
    drawer: (state) => {
      return state.drawer;
    },
    totalPrice: (state) => {
      return state.totalPrice;
    },
    refund: (state) => {
      return state.refund;
    },
  },

  actions: {
    apiLink({ commit }) {
      commit("backendLinks");
    },
    refund({ commit }, data) {
      commit("updateRefund", data);
    },
    agentCode({ commit }, data) {
      commit("updateAgentCode", data);
    },
  },

  mutations: {
    showOrdervu(state, count) {
      if (state.drawer === true) {
        state.drawer = null;
      } else if (state.drawer === null) {
        state.drawer = true;
      }
      // state.drawer= true
      console.log(state.drawer, count);
    },
    backendLinks(state) {
      if (process.env.NODE_ENV === "production") {
        state.linksformbackend = "Https://byihuse.rw/";
      } else {
        state.linksformbackend = "http://localhost:4000/";
      }
    },
    updateRefund(state, data) {
      state.refund += data;
    },
    updateAgentCode(state, data) {
      state.agentCode = data;
    },
  },
  modules: {
    ecommerce,
    sidebar,
    settings,
    payment,
    blog,
    productDetail,
  },
});
