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
  <div class="d-flex align-items-center justify-content-center px-5">
    <h1 class="m-3">{{ title }}</h1>
    <BaseButton
      class="m-2"
      @click="toggleInput">
      <fa icon="edit" />
    </BaseButton>
    <BaseButton
      class="m-2"
      @click="toggleAddForm">
      <fa icon="plus" />
    </BaseButton>
    <form class="m-4 d-flex align-items-center">
      <BaseInput
        v-model="searchFilter"
        class="p-2 w-100"
        :placeholder="translateString('findByTitle')"
        type="text" />
    </form>
  </div>
  <TaskList v-if="!isLoading" />
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useTranslator } from '@/composables/translate';
import { ref, computed, onBeforeMount, watch } from 'vue';

export default {
  name: 'TasksMain',
  components: {
    TaskList,
    TaskForm,
  },
  emits: ['removeTask'],
  setup() {
    const title = ref('Task List');
    const showInput = ref(false);
    const showAddForm = ref(false);

    const store = useStore();
    const router = useRouter();
    const { translateString } = useTranslator();

    const isLoading = computed(() => store.getters.isLoading);

    const searchFilter = computed({
      get() {
        return store.getters['search/filter'];
      },
      set(val) {
        store.dispatch('search/setFilter', val);
      },
    });

    const tasks = computed(() => store.getters['tasks/tasks']);

    watch(title, (val) => {
      document.title = val;
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

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { title, tasks, showInput, searchFilter, showAddForm, isLoading, translateString, toggleInput, toggleAddForm, addTask };
  },
};
</script>
