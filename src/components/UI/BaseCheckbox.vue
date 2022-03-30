<template>
  <label
    class="custom-checkbox"
    :class="props.checked ? 'btn-success' : 'btn-outline-danger'"
    tabindex="0"
    @keyup.enter="toggleCheckbox">
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
};
</script>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(['toggle']);
// eslint-disable-next-line no-undef
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});

function toggleCheckbox() {
  emit('toggle');
}
</script>
