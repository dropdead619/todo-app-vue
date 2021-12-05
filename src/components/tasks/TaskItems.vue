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
export default {
  name: 'TaskItems',
  data() {
    return {
      isBtnVisible: false,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    toggleVisibility() {
      this.isBtnVisible = !this.isBtnVisible;
    },
    async removeTask() {
      await this.$store.dispatch('Tasks/deleteTask', { id: this.task.id });
      await this.$store.dispatch('Tasks/fetchTasks');
      console.log('deleted', this.task);
    },
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
