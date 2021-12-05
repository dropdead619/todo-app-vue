<template>
  <form
    class="p-4 form"
    @keyup.enter="onSubmit"
    @submit.prevent="onSubmit">
    <div class="form-item">
      <label class="form-label">Task title: </label>
      <input
        v-model="task.title"
        class="form-input"
        placeholder="input title"
        required
        type="text">
    </div>
    <div class="form-item">
      <label class="form-label">Task description: </label>
      <input
        v-model="task.description"
        class="form-input"
        placeholder="input description"
        required
        type="text">
    </div>
    <button class="btn btn-primary" type="submit">Add task</button>
  </form>
  <template v-if="isLoading">
    <teleport to="body">
      <BasePreloader>Loading...</BasePreloader>
    </teleport>
  </template>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskAdd',
  title: 'Add new task',
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
      isLoading: 'Tasks/isLoading',
    }),
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('Tasks/addTasks', this.task);
      await this.$store.dispatch('Tasks/fetchTasks').then(res => {
        this.$router.push({ name: 'TaskList' });
        console.log(this.task);
      });
    },
  },
  mounted() {

  },
};
</script>
