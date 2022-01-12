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
        :id="task.id"
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
        <form class="m-4">
          <input placeholder="Filter by task name" type="text">
        </form>
      </div>

      <TaskList v-if="!isLoading && tasks" />
      <template v-else-if="!tasks">
        <div class="text-center text-warning">Add new task...</div>
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
      return store.getters['tasks/tasks'];
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
      store.dispatch('tasks/addTasks', task).then(() => {
        store.dispatch('tasks/fetchTasks', true).then(() =>
          toggleAddForm());
      });
    }

    function editTask(task) {
      store.dispatch('tasks/editTask', task).then(() => {
        store.dispatch('tasks/fetchTasks', true).then(() =>
          toggleEditForm());
      });
    }

    onBeforeMount(function () {
      store.dispatch('tasks/fetchTasks');
    });

    return { title, task, tasks, showInput, showAddForm, showEditForm, isLoading, toggleInput, toggleAddForm, toggleEditForm, addTask, editTask, justAdded };
  },
};
</script>
