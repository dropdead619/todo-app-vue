import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import tasks from '@/store/modules/tasks';
import auth from '@/store/modules/auth';
import search from '@/store/modules/search';
import lang from '@/store/modules/lang';

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
    search,
    lang,
  },
  plugins: [createPersistedState({
    paths: ['auth', 'search', 'lang'],
  })],
});
