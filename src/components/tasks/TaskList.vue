<template>
  <ul
    v-for="task in tasks"
    :key="task">
    <TaskItems :task="task" @removeTask="deleteTask" />
  </ul>
</template>

<script>
import TaskItems from '@/components/tasks/TaskItems';

import { useStore } from 'vuex';

import { computed } from 'vue';

export default {
  name: 'TaskList',
  title: 'Task list',
  components: {
    TaskItems,
  },
  emits: ['removeTask'],
  setup() {
    const store = useStore();

    const tasks = computed(function () {
      return store.getters['Tasks/tasks'];
    });

    function deleteTask(id) {
      store.dispatch('Tasks/deleteTask', { id: id }).then(() => {
        setTimeout(() => {
          store.dispatch('Tasks/fetchTasks');
        }, 500);
      });
    }

    return { tasks, deleteTask };
  },
};
</script>
