<template>
  <div>
    <BaseModal
      :show="showAddForm && !isLoading"
      @close="toggleAddForm">
      <TaskForm
        @keyup.enter="addTask"
        @submitForm="addTask" />
    </BaseModal>
    <BaseModal
      :show="showEditForm"
      @close="toggleEditForm">
      <TaskForm
        isEditing
        @submitForm="editTask" />
    </BaseModal>
    <div>
      <div class="title d-flex align-items-center justify-content-center">
        <BaseDialog
          :show="showInput"
          title="Edit list name"
          @close="toggleInput">
          <BaseInput
            v-if="showInput"
            v-model="title"
            class="m-2"
            type="text" />
        </BaseDialog>
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
          <div>
            <BaseInput
              v-model="searchFilter"
              class="p-2 w-100"
              placeholder="Find by task name"
              type="text"
              @input="filterInput" />
          </div>
          <div>
            <BaseButton
              class="m-2"
              variant="warning"
              @click="resetFilters">
              <span class="m-2">Reset</span>
              <fa icon="undo-alt" />
            </BaseButton>
          </div>
        </form>
      </div>
      <TaskList v-if="!isLoading && tasks" />
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useStore } from 'vuex';
import { ref, computed, onBeforeMount, provide, watch } from 'vue';

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
    const showEditForm = ref(false);
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

    provide('toggleEditForm', toggleEditForm);

    function filterInput(e) {
      store.dispatch('search/setFilter', e.target.value);
    }

    function toggleInput() {
      showInput.value = !showInput.value;
    }

    function toggleAddForm() {
      showAddForm.value = !showAddForm.value;
    }

    function toggleEditForm() {
      showEditForm.value = !showEditForm.value;
    }

    function resetFilters() {
      searchFilter.value = '';
      store.dispatch('search/setFilter', '');
    }

    function addTask(task) {
      task.createdAt = new Date();
      store.dispatch('tasks/addTasks', task).then(() => {
        store.dispatch('tasks/fetchTasks', true).then(() =>
          toggleAddForm());
      });
    }

    function editTask(task) {
      store.dispatch('tasks/editTask', task).then(() => {
        store.dispatch('tasks/fetchTasks').then(() =>
          toggleEditForm());
      });
    }

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { title, tasks, showInput, searchFilter, showAddForm, showEditForm, isLoading, filterInput, resetFilters, toggleInput, toggleAddForm, toggleEditForm, addTask, editTask };
  },
};
</script>
