<template>
  <template v-if="!!!tasks">
    <div class="text-center text-warning">Add new task...</div>
  </template>
  <template v-else-if="filteredList?.length === 0">
    <div class="text-center text-warning">No match found</div>
  </template>
  <ul class="task-list">
    <li
      v-for="task in archived ? tasks : filteredList"
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

    const tasks = computed(() => {
      return props.archived ? store.getters['tasks/archived'] : store.getters['tasks/tasks'];
    });

    const filter = computed(() => store.getters['search/filter']);

    const filteredList = computed(() => {
      return tasks.value?.filter(task => {
        return task.title.toLowerCase().includes(filter?.value.toLowerCase());
      });
    });

    function toggleState(task) {
      task.isDone = !task.isDone;
      store.dispatch('tasks/editTask', task);
    }

    function deleteTask(id) {
      store.dispatch('tasks/deleteTask', { id: id }).then(() => {
        store.dispatch('tasks/fetchTasks');
      });
    }

    function archiveTask(task) {
      task.archived = !task.archived;
      store.dispatch('tasks/editTask', task).then(() => {
        store.dispatch('tasks/fetchTasks');
      });
    }

    return { tasks, filteredList, toggleState, deleteTask, archiveTask };
  },
};
</script>
