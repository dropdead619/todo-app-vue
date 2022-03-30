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

<script setup>
import TaskList from '@/components/tasks/TaskList.vue';

const store = useStore();

const isLoading = computed(() => store.getters.isLoading);

onBeforeMount(function () {
  store.dispatch('tasks/fetchTasks');
});

</script>
