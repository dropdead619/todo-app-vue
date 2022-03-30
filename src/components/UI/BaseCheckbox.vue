<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>

const emit = defineEmits(['toggle']);

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

<template>
  <label
    class="custom-checkbox"
    :class="props.checked ? 'text-success' : 'text-danger'"
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
