import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import tasks from '@/store/modules/tasks';
import auth from '@/store/modules/auth';

export default createStore({
  state: {
    isLoading: false,
  },
  mutations: {
    TOGGLE_LOADING_STATE(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  modules: {
    tasks,
    auth,
  },
  plugins: [createPersistedState({
    paths: ['auth'],
  })],
});
