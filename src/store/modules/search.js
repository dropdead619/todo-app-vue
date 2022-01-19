const store = {
  namespaced: true,
  state() {
    return {
      taskTitleFilter: '',
      tagTitleFilter: '',
    };
  },
  mutations: {
    SET_TASK_FILTER(state, payload) {
      state.taskTitleFilter = payload;
    },
    SET_TAG_FILTER(state, payload) {
      state.tagTitleFilter = payload;
    },
  },
  actions: {
    setTaskFilter({ commit }, payload) {
      commit('SET_TASK_FILTER', payload);
    },
    setTagFilter({ commit }, payload) {
      commit('SET_TAG_FILTER', payload);
    },
  },
  getters: {
    taskTitleFilter(state) {
      return state.taskTitleFilter;
    },
    tagTitleFilter(state) {
      return state.tagTitleFilter;
    },
  },
};

export default store;
