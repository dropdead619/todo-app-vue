
<script setup>

import { useTranslator } from '@/plugins/i18n';

const emit = defineEmits(['submitForm']);

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
});
const task = reactive({
  id: '',
  title: '',
  description: '',
  createdAt: '',
  isDone: false,
  archived: false,
});

const { translateString } = useTranslator();

const showErrors = ref(false);

const errors = ref('');

const store = useStore();

const buttonText = computed(() => {
  return props.isEditing ? translateString('edit') : translateString('add');
});

function onSubmit() {
  if (task.title === '' ||
        task.description === '') {
    errors.value = translateString('cannotEmptyError');
    toggleErrorDialog();
    return;
  }
  emit('submitForm', {
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
</script>

<template>
  <BaseDialog
    :show="showErrors"
    size="medium"
    :title="translateString('incorrectInput')"
    @close="toggleErrorDialog">
    <div>
      {{ errors }}
    </div>
  </BaseDialog>
  <form
    class="form"
    @keyup.enter.exact="onSubmit"
    @submit.prevent="onSubmit">
    <div class="form-item">
      <BaseInput
        v-model="task.title"
        class="form-input"
        :label="translateString('taskTitle')"
        :placeholder="translateString('inputTitle')" />
    </div>
    <div class="form-item">
      <BaseTextarea
        v-model="task.description"
        class="form-input"
        :label="translateString('taskDescription')"
        :placeholder="translateString('inputDescription')" />
    </div>
    <div class="form-item justify-content-end">
      <BaseButton
        class="bg-gradient"
        type="submit"
        variant="dark">
        {{ buttonText }}
      </BaseButton>
    </div>
  </form>
</template>
