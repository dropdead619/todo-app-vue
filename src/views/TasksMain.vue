<template>
  <BaseModal
    :show="showAddForm && !isLoading"
    @close="toggleAddForm">
    <TaskForm
      @submitForm="addTask" />
  </BaseModal>
  <BaseDialog
    :show="showInput"
    title="Edit list name"
    @close="toggleInput">
    <BaseInput
      v-if="showInput"
      v-model="title"
      class="m-2 p-2"
      type="text" />
  </BaseDialog>
  <div class="d-flex align-items-center justify-content-center">
    <h1 class="m-4">{{ title }}</h1>
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
        placeholder="Find by title"
        type="text"
        @input="filterInput" />
    </form>
  </div>
  <TaskList v-if="!isLoading" />
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useStore } from 'vuex';
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

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    const filter = computed(function () {
      return store.getters['search/filter'];
    });

    const searchFilter = ref(filter.value);

    const tasks = computed(function () {
      return store.getters['tasks/tasks'];
    });

    watch(title, (val) => {
      document.title = val;
    });

    function filterInput(e) {
      store.dispatch('search/setFilter', e.target.value);
    }

    function toggleInput() {
      showInput.value = !showInput.value;
    }

    function toggleAddForm() {
      showAddForm.value = !showAddForm.value;
    }

    function addTask(task) {
      store.dispatch('tasks/addTasks', task).then(() => {
        store.dispatch('tasks/fetchTasks');
      }).then(() => toggleAddForm());
    }

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { title, tasks, showInput, searchFilter, showAddForm, isLoading, filterInput, toggleInput, toggleAddForm, addTask };
  },
};
</script>
