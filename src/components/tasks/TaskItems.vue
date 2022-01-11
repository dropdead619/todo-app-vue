<template>
  <div>
    <BaseDialog
      :show="showDeleteWindow"
      size="small"
      title="Delete selected task?"
      @close="toggleDeleteWindow">
      <template #actions>
        <BaseButton class="btn-success m-2" @click="deleteTask">
          Yes
        </BaseButton>
        <BaseButton class="btn-danger m-2" @click="toggleDeleteWindow">
          No
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
  <div
    class="d-flex flex-column justify-content-evenly">
    <div class="d-flex align-items-center justify-content-between">
      <div class="text-white  m-3"> {{ $dayjs(task.createdAt).format('HH:mm DD.MM.YYYY') }}</div>
      <div v-show="!archived">
        <BtnWhite
          @click="toggleDeleteWindow">
          <fa icon="minus" />
        </BtnWhite>
        <BtnWhite
          @click="archiveTask">
          <fa icon="archive" />
        </BtnWhite>
        <BtnWhite
          v-show="task.editable"
          @click="toggleEditForm">
          <fa icon="pen" />
        </BtnWhite>
      </div>
    </div>

    <BaseCard class="mw-100">
      <BaseCheckbox
        :checked="task.isDone"
        :disabled="archived"
        @toggle="toggleState">
        <fa v-if="task.isDone" icon="check" />
        <fa v-else icon="minus" />
      </BaseCheckbox>
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <p class="card-text">
          {{task.description}}
        </p>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { ref, inject } from 'vue';

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
  setup(props, context) {
    const showDeleteWindow = ref(false);

    function toggleDeleteWindow() {
      showDeleteWindow.value = !showDeleteWindow.value;
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

    const toggleEditForm = props.archived ? '' : inject('toggleEditForm');

    return { showDeleteWindow, toggleDeleteWindow, deleteTask, toggleState, archiveTask, toggleEditForm };
  },
};
</script>
