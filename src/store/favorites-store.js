export default {
  state: {
    favorites: [],
  },
  getters: {
    favorites(state) {
      return state.favorites;
    }
  },
  mutations: {
      setFavorites(state, {favorites}) {
        state.favorites = favorites;
      },
      updateFavorites(state, {updatedFavorites}) {
        state.favorites = updatedFavorites;
      },
  },
  actions: {
      setFavorites({ commit }, {favorites}) {
        commit({ type: "setFavorites", favorites });
        return favorites;
    },
     updateFavorites({ commit }, {updatedFavorites}) {
        commit({ type: "updateFavorites", updatedFavorites });
        return updatedFavorites;
    },
  },
};
