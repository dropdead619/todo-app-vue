const store = {
  namespaced: true,
  state() {
    return {
      data: {},
      isLoading: false,
    };
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
    TOGGLE_LOADING_STATE(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    fetchTasks({ commit }) {
      return new Promise(resolve => {
        commit('TOGGLE_LOADING_STATE');
        fetch('https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks.json').then(response => {
          if (response.ok) {
            return response.json();
          }
        }).then(data => {
          for (const el in data) {
            data[el].id = el;
          }
          commit('SET_DATA', data);
          commit('TOGGLE_LOADING_STATE');
          resolve(data);
        });
      });
    },
    addTasks(_, payload) {
      fetch('https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
        }),
      });
    },
    deleteTask(_, { id }) {
      fetch(`https://todo-backend-4b5b9-default-rtdb.firebaseio.com/tasks/${id}.json`, {
        method: 'DELETE',
      });
    },
  },
  getters: {
    tasks(state) {
      return state.data;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};

export default store;
