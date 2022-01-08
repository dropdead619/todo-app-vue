<template>
  <div>
    <teleport to="body">
      <BaseModal
        v-if="showAddForm"
        class="justify-content-around"
        @closeModal="toggleAddForm">
        <TaskForm
          @submitForm="addTask" />
      </BaseModal>
      <BaseModal
        v-if="showEditForm"
        class="justify-content-around"
        @closeModal="toggleEditForm">
        <TaskForm
          :id="task.id"
          isEditing
          @submitForm="editTask" />
      </BaseModal>
    </teleport>
    <div>
      <div class="title d-flex align-items-center justify-content-center">
        <BaseInput
          v-if="showInput"
          v-model="title"
          class="m-4"
          type="text" />
        <h1 class="m-4">{{ title }}</h1>
        <button class="btn btn-white btn--scale m-3" @click="toggleInput">
          <fa icon="edit" />
        </button>
        <button class="btn btn-white btn--scale" @click="toggleAddForm"><fa icon="plus" /> </button>
        <form class="m-4">
          <input placeholder="Filter by task name" type="text">
        </form>
      </div>

      <TaskList v-if="!isLoading && tasks" />
      <template v-else-if="!tasks">
        <div class="text-center text-warning">Add new task...</div>
      </template>
      <template v-else>
        <teleport to="body">
          <BasePreloader>Loading...</BasePreloader>
        </teleport>
      </template>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useStore } from 'vuex';
import { ref, computed, onBeforeMount, provide } from 'vue';

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
    const justAdded = ref(false);

    const store = useStore();

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    const tasks = computed(function () {
      return store.getters['Tasks/tasks'];
    });

    const task = computed(function () {
      return tasks.value.find(el => el.editable === true);
    });

    provide('toggleEditForm', toggleEditForm);

    function toggleInput() {
      showInput.value = !showInput.value;
    }

    function toggleAddForm() {
      showAddForm.value = !showAddForm.value;
    }

    function toggleEditForm() {
      showEditForm.value = !showEditForm.value;
    }

    function addTask(task) {
      task.createdAt = new Date();
      store.dispatch('Tasks/addTasks', task).then(() => {
        store.dispatch('Tasks/fetchTasks', true).then(() =>
          toggleAddForm());
      });
    }

    function editTask(task) {
      store.dispatch('Tasks/editTask', task).then(() => {
        store.dispatch('Tasks/fetchTasks', true).then(() =>
          toggleEditForm());
      });
    }

    onBeforeMount(function () {
      store.dispatch('Tasks/fetchTasks');
    });

    return { title, task, tasks, showInput, showAddForm, showEditForm, isLoading, toggleInput, toggleAddForm, toggleEditForm, addTask, editTask, justAdded };
  },
};
</script>
