const store = {
  namespaced: true,
  state() {
    return {
      activeLang: 'en',
    };
  },
  mutations: {
    SET_ACTIVE_LANG(state, payload) {
      state.activeLang = payload;
    },
  },
  actions: {
    setLanguage({ commit }, payload) {
      commit('SET_ACTIVE_LANG', payload);
    },
  },
  getters: {
    activeLang(state) {
      return state.activeLang;
    },
  },
};

export default store;
