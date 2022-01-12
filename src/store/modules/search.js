const store = {
  namespaced: true,
  state() {
    return {
      filter: '',
    };
  },
  mutations: {
    SET_FILTER(state, payload) {
      state.filter = payload;
    },
  },
  actions: {
    setFilter({ commit }, payload) {
      commit('SET_FILTER', payload);
    },
  },
  getters: {
    filter(state) {
      return state.filter;
    },
  },
};

export default store;
