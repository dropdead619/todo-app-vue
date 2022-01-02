<template>
  <div>
    <teleport to="body">
      <TaskAdd
        v-if="showAddForm"
        @addTask="addTask"
        @closeModal="toggleAddForm" />
    </teleport>
    <div class="title d-flex align-items-center">
      <input
        v-if="showInput"
        v-model="title"
        class="m-4"
        type="text">
      <h1 v-else class="m-4">{{ title }}</h1>
      <button class="btn btn-white btn--scale m-3" @click="toggleInput">
        <fa icon="edit" />
      </button>
      <button class="btn btn-white btn--scale" @click="toggleAddForm"><fa icon="plus" /> </button>
    </div>
    <TaskList v-if="!isLoading" />
    <template v-else>
      <teleport to="body">
        <BasePreloader>Loading...</BasePreloader>
      </teleport>
    </template>
  </div>
</template>

<script>
import TaskList from '@/components/tasks/TaskList';
import TaskAdd from '@/components/tasks/TaskAdd';
import { useStore } from 'vuex';
import { ref, computed, onBeforeMount } from 'vue';

export default {
  name: 'TasksMain',
  title: 'Main page',
  components: {
    TaskList,
    TaskAdd,
  },
  emits: ['removeTask'],
  setup() {
    const title = ref('Task List');

    const showInput = ref(false);
    const showAddForm = ref(false);
    const justAdded = ref(false);

    const store = useStore();

    const isLoading = computed(function () {
      return store.getters['Tasks/isLoading'];
    });

    function toggleInput() {
      showInput.value = !showInput.value;
    }

    function toggleAddForm() {
      showAddForm.value = !showAddForm.value;
    }

    function addTask(task) {
      store.dispatch('Tasks/addTasks', task).then(() => {
        setTimeout(() => {
          store.dispatch('Tasks/fetchTasks', true).then(() =>
            toggleAddForm());
        }, 500);
      });
    }

    onBeforeMount(function () {
      store.dispatch('Tasks/fetchTasks');
    });

    return { title, showInput, showAddForm, isLoading, toggleInput, toggleAddForm, addTask, justAdded };
  },
};
</script>
