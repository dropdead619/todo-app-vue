<template>
  <div
    class="d-flex flex-column"
    @mouseenter="toggleVisibility"
    @mouseleave="toggleVisibility">
    <div class="d-flex align-items-center justify-content-between">
      <div class="text-white  m-3"> {{ $dayjs(task.createdAt).format('HH:mm DD.MM.YYYY') }}</div>
      <div
        v-if="!archived && isBtnVisible">
        <BaseButton
          @click="deleteTask">
          <fa icon="minus" />
        </BaseButton>
        <BaseButton
          @click="archiveTask">
          <fa icon="archive" />
        </BaseButton>
        <BaseButton
          v-if="task.editable"
          @click="toggleEditForm">
          <fa icon="pen" />
        </BaseButton>
      </div>
    </div>

    <div
      class="card">
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
    </div>
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
    const isBtnVisible = ref(false);

    function toggleVisibility() {
      isBtnVisible.value = !isBtnVisible.value;
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

    return { isBtnVisible, toggleVisibility, deleteTask, toggleState, archiveTask, toggleEditForm };
  },
};
</script>

<style lang="scss" scoped>
  .btn {
    width: 40px;
  }
</style>
