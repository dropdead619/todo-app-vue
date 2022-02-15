<template>
  <div>
    <div class="title d-flex align-items-center justify-content-center">
      <h1 class="m-4">{{$translateString('archivedTasks')}} </h1>
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

    const isLoading = computed(() => store.getters.isLoading);

    const archivedTasks = computed(() => store.getters['tasks/archived']);

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { isLoading, archivedTasks };
  },
};
</script>
