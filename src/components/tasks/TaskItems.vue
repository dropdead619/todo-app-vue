<template>
  <div>
    <BaseDialog
      :show="showDeleteWindow"
      size="small"
      title="Delete selected task?"
      @close="toggleDeleteWindow">
      <template #actions>
        <BaseButton
          class="m-2 bg-gradient"
          variant="dark"
          @click="deleteTask">
          Yes
        </BaseButton>
        <BaseButton
          class="m-2 bg-gradient"
          variant="danger"
          @click="toggleDeleteWindow">
          No
        </BaseButton>
      </template>
    </BaseDialog>
    <BaseModal
      :show="showEditForm"
      @close="toggleEditForm">
      <TaskForm
        :id="task.id"
        isEditing
        @submitForm="editTask" />
    </BaseModal>
  </div>
  <div
    class="d-flex flex-column justify-content-evenly bg-gradient bg-black rounded-3">
    <div class="d-flex align-items-center justify-content-between">
      <div class="text-white  m-3"> {{ $dayjs(task.createdAt).format('HH:mm DD.MM.YYYY') }}</div>
      <div>
        <BaseButton
          v-show="!archived"
          class="m-2"
          @click="toggleDeleteWindow">
          <fa icon="minus" />
        </BaseButton>
        <BaseButton
          class="m-2"
          @click="archiveTask">
          <fa v-if="!archived"  icon="archive" />
          <fa v-else-if="archived" icon="arrow-left" />
        </BaseButton>
        <BaseButton
          v-show="!archived"
          class="m-2"
          @click="toggleEditForm">
          <fa icon="pen" />
        </BaseButton>
      </div>
    </div>

    <BaseCard class="d-flex align-items-baseline rounded-3" @click="toggleShowFullTask">
      <BaseCheckbox
        :checked="task.isDone"
        :disabled="archived"
        @toggle="toggleState">
        <fa v-if="task.isDone" icon="check" />
        <fa v-else icon="minus" />
      </BaseCheckbox>
      <div class="card-body w-75">
        <h5 class="card-title">{{ task.title }}</h5>
        <p class="card-text" :class="{ 'text-truncate': !showFullTask }">
          {{task.description}}
        </p>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import TaskForm from '@/components/tasks/TaskForm';

export default {
  name: 'TaskItems',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggleState', 'deleteTask', 'archiveTask'],
  components: {
    TaskForm,
  },
  setup(props, context) {
    const showDeleteWindow = ref(false);
    const showEditForm = ref(false);

    const showFullTask = ref(false);

    const store = useStore();

    function toggleDeleteWindow() {
      showDeleteWindow.value = !showDeleteWindow.value;
    }

    function toggleShowFullTask() {
      showFullTask.value = !showFullTask.value;
    }

    function archiveTask() {
      context.emit('archiveTask', props.task);
    }

    function toggleState() {
      context.emit('toggleState', props.task);
    }

    function deleteTask() {
      context.emit('deleteTask', props.task.id);
    }

    function editTask(task) {
      store.dispatch('tasks/editTask', task).then(() => {
        store.dispatch('tasks/fetchTasks');
      }).then(() =>
        toggleEditForm());
    }

    function toggleEditForm() {
      showEditForm.value = !showEditForm.value;
    }

    return { showFullTask, showEditForm, showDeleteWindow, editTask, toggleShowFullTask, toggleDeleteWindow, deleteTask, toggleState, archiveTask, toggleEditForm };
  },
};
</script>
