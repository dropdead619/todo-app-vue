<template>
  <div
    class="card"
    @mouseenter="toggleVisibility"
    @mouseleave="toggleVisibility">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">
        {{task.description}}
      </p>
    </div>
    <button
      v-if="isBtnVisible"
      class="btn btn-white btn--scale"
      @click="removeTask">
      <fa icon="minus" />
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TaskItems',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props, context) {
    const isBtnVisible = ref(false);

    function toggleVisibility() {
      isBtnVisible.value = !isBtnVisible.value;
    }

    function removeTask() {
      context.emit('removeTask', props.task.id);
    }

    return { isBtnVisible, toggleVisibility, removeTask };
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    width: 40px;
  }
}
</style>
