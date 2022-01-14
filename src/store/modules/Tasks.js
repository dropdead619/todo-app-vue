import api from '@/api/requests';

const store = {
  namespaced: true,
  state() {
    return {
      data: null,
      archived: null,
    };
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
    SET_ARCHIVED(state, payload) {
      state.archived = payload;
    },
  },
  actions: {
    async fetchTasks({ commit, rootGetters }) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      console.log(rootGetters);
      const data = await api.GET(`/${rootGetters['auth/userId']}/tasks.json`);
      if (!data) {
        commit('SET_DATA', null);
        commit('SET_ARCHIVED', null);
        commit('TOGGLE_LOADING_STATE', null, { root: true });
        return;
      }
      const archived = Object.values(data).filter(el => el.archived === true);
      const filteredData = Object.values(data).filter(el => el.archived === false);
      if (filteredData.length === 0) {
        commit('SET_DATA', null);
      } else {
        commit('SET_DATA', filteredData);
      }
      if (archived.length === 0) {
        commit('SET_ARCHIVED', null);
      } else {
        commit('SET_ARCHIVED', archived);
      }
      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },

    async fetchTaskById({ rootGetters }, id) {
      return await api.GET(`/${rootGetters['auth/userId']}/tasks/${id}.json`);
    },

    async addTasks({ commit, dispatch, rootGetters }, payload) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const data = await api.POST(`/${rootGetters['auth/userId']}/tasks.json`, {
        title: payload.title,
        description: payload.description,
        isDone: payload.isDone,
        archived: payload.archived,
        createdAt: payload.createdAt,
      });

      await dispatch('editTask', {
        id: data.name,
      });

      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },

    async editTask({ rootGetters }, payload) {
      return await api.PATCH(`/${rootGetters['auth/userId']}/tasks/${payload.id}.json`, {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        isDone: payload.isDone,
        archived: payload.archived,
      });
    },

    async deleteTask({ rootGetters }, { id }) {
      return await api.DELETE(`/${rootGetters['auth/userId']}/tasks/${id}.json`);
    },
  },
  getters: {
    tasks(state) {
      return state.data;
    },
    archived(state) {
      return state.archived;
    },
  },
};

export default store;
