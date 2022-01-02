<template>
  <div
    class="card"
    @mouseenter="toggleVisibility"
    @mouseleave="toggleVisibility">
    <BaseCheckbox :checked="task.isDone" @toggle="toggleState">
      <fa icon="check" />
    </BaseCheckbox>
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">
        {{task.description}}
      </p>
    </div>
    <button
      v-if="isBtnVisible"
      class="btn btn-white btn--scale delete"
      @click="deleteTask">
      <fa icon="minus" />
    </button>
    <button
      v-if="isBtnVisible && task.editable"
      class="btn btn-white btn--scale edit"
      @click="editTask">
      <fa icon="pen" />
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';

export default {
  name: 'TaskItems',
  components: {
    BaseCheckbox,
  },
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  emits: ['toggleState', 'deleteTask', 'editTask'],
  setup(props, context) {
    const isBtnVisible = ref(false);

    function toggleVisibility() {
      isBtnVisible.value = !isBtnVisible.value;
    }

    function toggleState() {
      context.emit('toggleState', props.task);
    }

    function deleteTask() {
      context.emit('deleteTask', props.task.id);
    }

    function editTask() {
      context.emit('editTask', props.task);
      console.log('items', props.task);
    }

    return { isBtnVisible, toggleVisibility, deleteTask, editTask, toggleState };
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  .btn {
    position: absolute;
    width: 40px;
    top: 0;
  }
  .edit {
    right: 50px;
  }
  .delete {
    right: 0;
  }
}
</style>
