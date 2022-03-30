<script setup>
import TaskItems from '@/components/tasks/TaskItems.vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  archived: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();

const tasks = computed(() => {
  return props.archived ? store.getters['tasks/archived'] : store.getters['tasks/tasks'];
});

const taskFilter = computed(() => store.getters['search/taskTitleFilter']);
const tagFilter = computed(() => store.getters['search/tagTitleFilter']);

const filteredList = computed(() => {
  return tasks.value?.filter(task => {
    if (!task.tags) return true;

    return task.title.toLowerCase().includes(taskFilter?.value.toLowerCase()) &&
     (Object.values(task.tags).find(tag => tag.title.toLowerCase().includes(tagFilter?.value.toLowerCase())));
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
</script>

<template>
  <template v-if="!!!tasks">
    <div class="text-center text-warning">{{ $translateString('nothingToDisplay') }}</div>
  </template>
  <template v-else-if="filteredList?.length === 0">
    <div class="text-center text-warning">{{ $translateString('noMatch') }}</div>
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
