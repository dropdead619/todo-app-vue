<template>
  <div>
    <BaseDialog
      :show="showDeleteWindow"
      size="small"
      :title="translateString('deleteTaskModal')"
      @close="toggleDeleteWindow">
      <template #actions>
        <BaseButton
          class="m-2 bg-gradient"
          variant="dark"
          @click="deleteTask">
          {{translateString('yes')}}
        </BaseButton>
        <BaseButton
          class="m-2 bg-gradient"
          variant="danger"
          @click="toggleDeleteWindow">
          {{translateString('no')}}
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
    class="d-flex flex-column justify-content-evenly">
    <div class="d-flex align-items-center justify-content-between rounded-top bg-gradient bg-black">
      <div class="text-white m-3"> {{ $dayjs(task.createdAt).format('HH:mm DD.MM.YYYY') }}</div>
      <div>
        <BaseButton
          class="m-2 bg-gradient"
          variant="dark"
          @click="archiveTask">
          <fa
            v-if="!archived"
            class=""
            icon="archive" />
          <fa v-else-if="archived" icon="arrow-left" />
        </BaseButton>
        <BaseButton
          v-show="!archived"
          class="m-2  bg-gradient"
          variant="dark"
          @click="toggleEditForm">
          <fa icon="pen" />
        </BaseButton>
        <BaseButton
          v-show="!archived"
          class="m-2  bg-gradient"
          variant="dark"
          @click="toggleDeleteWindow">
          <fa icon="minus" />
        </BaseButton>
      </div>
    </div>

    <BaseCard @click="toggleShowFullTask">
      <BaseCheckbox
        :checked="task.isDone"
        :disabled="archived"
        @toggle="toggleState">
        <fa v-if="task.isDone" icon="check" />
        <fa v-else icon="minus" />
      </BaseCheckbox>
      <div class="card-body w-75">
        <h5 class="card-title">{{ task.title }}</h5>
        <p
          v-if="!showFullTask"
          class="card-text text-truncate">
          {{task.description}}
        </p>
        <p
          v-else
          class="card-text "
          style="white-space: pre-wrap;">
          {{task.description}}
        </p>
      </div>
    </BaseCard>
    <div class="bg-dark bg-gradient rounded-bottom">
      <TagsList class="flex-row-reverse" :tags="task.tags" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useTranslator } from '@/composables/translate';
import TaskForm from '@/components/tasks/TaskForm';
import TagsList from '@/components/tags/TagsList';

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
    TagsList,
  },
  setup(props, context) {
    const showDeleteWindow = ref(false);
    const showEditForm = ref(false);

    const showFullTask = ref(false);

    const store = useStore();
    const { translateString } = useTranslator();

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

    return { showFullTask, showEditForm, showDeleteWindow, translateString, editTask, toggleShowFullTask, toggleDeleteWindow, deleteTask, toggleState, archiveTask, toggleEditForm };
  },
};
</script>
