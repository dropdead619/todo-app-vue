<template>
  <label class="custom-checkbox" :class="checked ? 'btn-success' : 'btn-outline-danger'">
    <input
      v-bind="$attrs"
      autocomplete="off"
      class="btn custom-checkbox-input"
      type="checkbox"
      @click="toggleCheckbox">
    <slot></slot>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
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
