<template>
  <form
    class="form"
    @keyup.enter="onSubmit"
    @submit.prevent="onSubmit">
    <div class="form-item">
      <BaseInput
        v-model="task.title"
        class="form-input"
        label="Task title:"
        placeholder="input title"
        required />
    </div>
    <div class="form-item">
      <BaseInput
        v-model="task.description"
        class="form-input"
        label="Task description:"
        placeholder="input description"
        required />
    </div>
    <div class="form-item">
      <button class="btn btn-primary" type="submit"> {{ buttonText }}</button>
    </div>
  </form>
  <template v-if="isLoading">
    <BasePreloader>Loading...</BasePreloader>
  </template>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  name: 'TaskForm',
  title: 'Add/Edit new task',
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['submitForm'],
  setup(props, context) {
    const task = reactive({
      title: '',
      description: '',
      createdAt: '',
      isDone: false,
      archived: false,
    });
    const showInput = ref(false);

    const store = useStore();

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    const buttonText = computed(function () {
      return props.isEditing ? 'Edit task' : 'Add task';
    });

    function onSubmit() {
      context.emit('submitForm', task);
      if (!props.isEditing) {
        task.title = '';
        task.description = '';
        task.createdAt = '';
        task.isDone = false;
        task.archived = false;
      }
    }

    onMounted(() => {
      if (props.isEditing) {
        store.dispatch('Tasks/fetchTaskById', props.id).then((res) => {
          task.title = res.title;
          task.description = res.description;
          task.isDone = res.isDone;
          task.createdAt = res.createdAt;
          task.archived = res.archived;
          task.id = props.id;
        });
      }
    });

    return { task, showInput, isLoading, buttonText, onSubmit };
  },
};
</script>
