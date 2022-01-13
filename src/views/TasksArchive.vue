<template>
  <div>
    <div class="title d-flex align-items-center justify-content-center">
      <h1 class="m-4">Archived tasks: </h1>
    </div>
    <TaskList
      v-if="!isLoading"
      archived />
  </div>
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import { useStore } from 'vuex';

import { computed, onBeforeMount } from 'vue';

export default {
  name: 'TasksArchive',
  title: 'Archived tasks',
  components: {
    TaskList,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    const archivedTasks = computed(function () {
      return store.getters['tasks/archived'];
    });

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { isLoading, archivedTasks };
  },
};
</script>

<style scoped lang="scss"></style>
