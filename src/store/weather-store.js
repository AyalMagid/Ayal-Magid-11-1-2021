export default {
  state: {
    isCelcius: true,
  },
  getters: {
    isCelcius(state) {
      return state.isCelcius;
    }
  },
  mutations: {
      updateUnit(state, {isCelcius}) {
        state.isCelcius = isCelcius;
      },
  },
  actions: {
    updateUnit({ commit }, {isCelcius}) {
     
        commit({ type: "updateUnit", isCelcius });
        return isCelcius;
    },
  },
};
