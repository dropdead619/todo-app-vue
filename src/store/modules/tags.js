import api from '@/api/requests';

const store = {
  namespaced: true,
  state() {
    return {
      data: null,
    };
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchTags({ commit }) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const data = await api.GET('/tags.json');
      if (!data) {
        commit('SET_DATA', null);
        commit('TOGGLE_LOADING_STATE', null, { root: true });
        return;
      }
      commit('SET_DATA', data);
      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },

    async fetchTagsById(_, id) {
      return await api.GET(`/tags/${id}.json`);
    },

    async addTag({ commit, dispatch }, payload) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const data = await api.POST('/tags.json', {
        title: payload.title,
        description: payload.description,
        variant: payload.variant,
      });

      await dispatch('editTag', {
        id: data.name,
      });

      commit('TOGGLE_LOADING_STATE', null, { root: true });
      return data;
    },

    async editTag(_, payload) {
      return await api.PATCH(`/tags/${payload.id}.json`, {
        id: payload.id,
        title: payload.title,
        variant: payload.variant,
      });
    },

    async deleteTag(_, { id }) {
      return await api.DELETE(`/tags/${id}.json`);
    },
  },
  getters: {
    tags(state) {
      return state.data;
    },
  },
};

export default store;
