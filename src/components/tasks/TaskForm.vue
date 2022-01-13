<template>
  <BaseDialog
    :show="showErrors"
    size="medium"
    title="Incorrect input"
    @close="toggleErrorDialog">
    <div>
      {{ errors }}
    </div>
  </BaseDialog>
  <form
    class="form"
    @submit.prevent="onSubmit">
    <div class="form-item">
      <BaseInput
        v-model="task.title"
        class="form-input"
        label="Task title:"
        placeholder="input title" />
    </div>
    <div class="form-item">
      <BaseTextarea
        v-model="task.description"
        class="form-input"
        label="Task description:"
        placeholder="input description" />
    </div>
    <div class="form-item">
      <BaseButton variant="dark"> {{ buttonText }}</BaseButton>
    </div>
  </form>
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
      id: '',
      title: '',
      description: '',
      createdAt: '',
      isDone: false,
      archived: false,
    });

    const showErrors = ref(false);

    const errors = ref('');

    const showInput = ref(false);

    const store = useStore();

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    const buttonText = computed(function () {
      return props.isEditing ? 'Edit task' : 'Add task';
    });

    function onSubmit() {
      if (task.title === '' ||
        task.description === '') {
        errors.value = 'Input fields cannot be empty!';
        toggleErrorDialog();
        return;
      }
      context.emit('submitForm', {
        id: props.isEditing ? task.id : '',
        title: task.title,
        description: task.description,
        createdAt: props.isEditing ? task.createdAt : new Date(),
        isDone: task.isDone,
        archived: task.archived,
      });
      if (!props.isEditing) {
        task.title = '';
        task.description = '';
        task.createdAt = '';
        task.isDone = false;
        task.archived = false;
      }
    }

    function toggleErrorDialog() {
      showErrors.value = !showErrors.value;
    }

    onMounted(() => {
      if (props.isEditing) {
        store.dispatch('tasks/fetchTaskById', props.id).then((res) => {
          task.id = res.id;
          task.title = res.title;
          task.description = res.description;
          task.isDone = res.isDone;
          task.createdAt = res.createdAt;
          task.archived = res.archived;
        });
      }
    });

    return { showErrors, errors, task, showInput, isLoading, buttonText, onSubmit, toggleErrorDialog };
  },
};
</script>
