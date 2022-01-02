<template>
  <label class="custom-checkbox" :class="checked ? 'btn-danger' : 'btn-outline-danger'">
    <input
      autocomplete="off"
      class="btn custom-checkbox-input"
      type="checkbox"
      @click="toggleCheckbox">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  emits: ['toggle'],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    function toggleCheckbox() {
      context.emit('toggle');
    }

    return { toggleCheckbox };
  },
};
</script>
