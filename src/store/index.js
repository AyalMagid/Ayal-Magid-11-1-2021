import Vue from 'vue'
import Vuex from 'vuex'
import favoritesStore from "./favorites-store.js";
import weatherStore from "./weather-store.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    favoritesStore,
    weatherStore
  },
});