const store = {
  namespaced: true,
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    SET_USER(state, payload) {
      state.token = payload?.idToken;
      state.userId = payload?.localId;
      state.tokenExpiration = payload?.expiresIn;
    },
  },
  actions: {
    async signup({ commit }, payload) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfugCxKkiT_MdConmcQAN3TtdyrN_VM4k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.error.message || 'Failed to authenticate');
        throw error;
      }
      commit('SET_USER', responseData);
      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },
    async signin({ commit }, payload) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfugCxKkiT_MdConmcQAN3TtdyrN_VM4k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.error.message || 'Failed to authenticate');
        throw error;
      }
      commit('SET_USER', responseData);
      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },
    signout({ commit }) {
      commit('SET_USER', null);
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    isLoggedIn(state) {
      return !!state.token;
    },
    userId(state) {
      return state.userId;
    },
  },
};

export default store;
