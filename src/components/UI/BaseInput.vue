
<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue']);

// eslint-disable-next-line no-undef
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="d-flex flex-column w-100">
    <label class="form-label h4"> {{ props.label }} </label>
    <input
      v-bind="$attrs"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)">
  </div>
</template>
