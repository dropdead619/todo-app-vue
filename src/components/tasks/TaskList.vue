<template>
  <ul
    v-for="task in tasks"
    :key="task">
    <TaskItems
      :task="task"
      @deleteTask="deleteTask"
      @editTask="editTask"
      @toggleState="toggleState" />
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
  setup() {
    const store = useStore();

    const tasks = computed(function () {
      return store.getters['Tasks/tasks'];
    });

    function toggleState(task) {
      task.isDone = !task.isDone;
      store.dispatch('Tasks/editTask', task);
    }

    function deleteTask(id) {
      store.dispatch('Tasks/deleteTask', { id: id }).then(() => {
        store.dispatch('Tasks/fetchTasks');
      });
    }

    function editTask(task) {
      store.dispatch('Tasks/editTask', task).then(() => {
        store.dispatch('Tasks/fetchTasks');
      });
    }

    return { tasks, toggleState, deleteTask, editTask };
  },
};
</script>
