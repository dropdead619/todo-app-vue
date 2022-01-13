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
    async fetchTasks({ commit }) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const response = await fetch('https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks.json');
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch data');
        throw error;
      }
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
    fetchTaskById(_, id) {
      return fetch(`https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks/${id}.json`).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        return data;
      });
    },
    async addTasks({ commit, dispatch }, payload) {
      commit('TOGGLE_LOADING_STATE', null, { root: true });
      const response = await fetch('https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          isDone: payload.isDone,
          archived: payload.archived,
          createdAt: payload.createdAt,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch data');
        throw error;
      }
      await dispatch('editTask', {
        id: data.name,
        title: payload.title,
        description: payload.description,
        isDone: payload.isDone,
        archived: payload.archived,
        createdAt: payload.createdAt,
      });

      commit('TOGGLE_LOADING_STATE', null, { root: true });
    },
    editTask(_, payload) {
      return fetch(`https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks/${payload.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: payload.id,
          title: payload.title,
          description: payload.description,
          isDone: payload.isDone,
          createdAt: payload.createdAt,
          archived: payload.archived,
        }),
      });
    },
    deleteTask(_, { id }) {
      return fetch(`https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks/${id}.json`, {
        method: 'DELETE',
      });
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
