import { createStore } from 'vuex';
import Tasks from '@/store/modules/Tasks';

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
    Tasks,
  },
});
