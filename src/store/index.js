import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import tasks from '@/store/modules/tasks';
import auth from '@/store/modules/auth';
import search from '@/store/modules/search';
import lang from '@/store/modules/lang';
import tags from '@/store/modules/tags';

export default createStore({
  state: {
    isLoading: false,
    isDark: null,
  },
  mutations: {
    TOGGLE_LOADING_STATE(state) {
      state.isLoading = !state.isLoading;
    },
    TOGGLE_APP_THEME(state, payload) {
      state.isDark = payload;
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    isDark: (state) => state.isDark,
  },
  modules: {
    tasks,
    auth,
    search,
    lang,
    tags,
  },
  plugins: [createPersistedState({
    paths: ['auth', 'search', 'lang'],
  })],
});
