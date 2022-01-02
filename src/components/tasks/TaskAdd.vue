<template>
  <div class="modal justify-content-around" @click.self="closeModal">
    <form
      class="form"
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
      <div class="form-item">
        <button class="btn btn-primary" type="submit">Add task</button>
      </div>
    </form>
    <template v-if="isLoading">
      <BasePreloader>Loading...</BasePreloader>
    </template>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue';

export default {
  name: 'TaskAdd',
  title: 'Add new task',
  emits: ['closeModal', 'addTask'],

  setup(_, context) {
    const title = ref('Task List');
    const task = reactive({
      title: '',
      description: '',
      isDone: false,
    });
    const showInput = ref(false);

    const store = useStore();

    const isLoading = computed(function () {
      return store.getters['Tasks/isLoading'];
    });

    function closeModal() {
      context.emit('closeModal');
    }

    function onSubmit() {
      context.emit('addTask', task);
      task.title = '';
      task.description = '';
      task.isDone = false;
    }

    return { title, task, showInput, isLoading, onSubmit, closeModal };
  },
};
</script>
