<template>
  <div>
    <div class="title d-flex align-items-center">
      <input
        v-if="showInput"
        v-model="title"
        class="m-4"
        type="text">
      <h1 v-else class="m-4">{{ title }}</h1>
      <button class="btn btn-white btn--scale m-3" @click="toggleInput">
        <fa icon="edit" />
      </button>
      <RouterLink class="btn btn-white btn--scale" :to="{ name: 'TaskAdd' }"><fa icon="plus" /> </RouterLink>
    </div>
    <template v-if="!isLoading">
      <ul
        v-for="task in tasks"
        :key="task">
        <TaskItems :task="task" />
      </ul>
    </template>
    <template v-else>
      <teleport to="body">
        <BasePreloader>Loading...</BasePreloader>
      </teleport>
    </template>
  </div>
</template>

<script>
import TaskItems from '@/components/tasks/TaskItems';
import { mapGetters } from 'vuex';

export default {
  name: 'TaskList',
  title: 'Task list',
  components: {
    TaskItems,
  },
  data() {
    return {
      title: 'Task List',
      task: {
        title: '',
        description: '',
      },
      showInput: false,
    };
  },
  computed: {
    ...mapGetters({
      tasks: 'Tasks/tasks',
      isLoading: 'Tasks/isLoading',
    }),
  },
  methods: {
    toggleInput() {
      return (this.showInput = !this.showInput);
    },
  },
  async created() {
    await this.$store.dispatch('Tasks/fetchTasks');
    console.log(this.tasks);
  },
};
</script>
