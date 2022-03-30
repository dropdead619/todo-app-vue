<script setup>
import TaskList from '@/components/tasks/TaskList.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';

import { DEFAULT_TITLE } from '@/config/constants';

import { useTranslator } from '@/plugins/i18n';
import IconEdit from '../components/icons/IconEdit.vue';
import IconAdd from '../components/icons/IconAdd.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const title = ref(route.meta.title || DEFAULT_TITLE);
const showInput = ref(false);
const showAddForm = ref(false);

const { translateString } = useTranslator();

const isLoading = computed(() => store.getters.isLoading);

const taskFilter = computed({
  get() {
    return store.getters['search/taskTitleFilter'];
  },
  set(val) {
    store.dispatch('search/setTaskFilter', val);
  },
});

const tagFilter = computed({
  get() {
    return store.getters['search/tagTitleFilter'].tagFilter;
  },
  set(val) {
    store.dispatch('search/setTagFilter', val);
  },
});

const tasks = computed(() => store.getters['tasks/tasks']);
const totalTasks = computed(() => {
  return (tasks.value?.length || 0) + ' ' + translateString('task', tasks.value?.length);
});

watch(title, (val) => {
  document.title = val;
  route.meta.title = val;
});

function toggleInput() {
  showInput.value = !showInput.value;
}

function toggleAddForm() {
  showAddForm.value = !showAddForm.value;
}

function addTask(task) {
  store.dispatch('tasks/addTasks', task)
    .then((res) => router.push({ name: 'TagsMain', query: { taskId: res } }));
}

onMounted(function () {
  store.dispatch('tasks/fetchTasks');
});

</script>

<template>
  <BaseModal
    :show="showAddForm && !isLoading"
    @close="toggleAddForm">
    <TaskForm
      @submitForm="addTask" />
  </BaseModal>
  <BaseDialog
    :show="showInput"
    :title="translateString('editListNameModal')"
    @close="toggleInput">
    <BaseInput
      v-if="showInput"
      v-model="title"
      class="m-2 p-2"
      type="text" />
  </BaseDialog>
  <div class="main">
    <div class="d-flex align-items-center justify-content-center">
      <h1 class="m-3">{{translateString('mainPage')}}</h1>
      <BaseButton
        class="m-2"
        @click="toggleInput">
        <IconEdit />
      </BaseButton>
      <BaseButton
        class="m-2"
        @click="toggleAddForm">
        <IconAdd />
      </BaseButton>
    </div>
    <form class="mx-3 d-flex align-items-center">
      <div class="form-item">
        <BaseInput
          v-model="taskFilter"
          class="p-2 w-100"
          :placeholder="translateString('findByTitle')"
          type="text" />
      </div>
      <div class="form-item">
        <BaseInput
          v-model="tagFilter"
          class="p-2 w-100"
          :placeholder="translateString('findByTag')"
          type="text" />
      </div>
    </form>
    <hr class="divider">
    <div class="w-100 text-end mb-2">{{totalTasks}}</div>
  </div>
  <div class="task-list-container">
    <TaskList v-if="!isLoading" />
  </div>
</template>
