<template>
  <ul class="task-list">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="task-list-item">
      <TaskItems
        :archived="archived ? archived : false"
        :task="task"
        @archiveTask="archiveTask"
        @deleteTask="deleteTask"
        @toggleState="toggleState" />
    </li>
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
  props: {
    archived: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();

    const tasks = computed(function () {
      return props.archived ? store.getters['Tasks/archived'] : store.getters['Tasks/tasks'];
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

    function archiveTask(task) {
      task.archived = !task.archived;
      store.dispatch('Tasks/editTask', task).then(() => {
        store.dispatch('Tasks/fetchTasks');
      });
    }

    return { tasks, toggleState, deleteTask, archiveTask };
  },
};
</script>
