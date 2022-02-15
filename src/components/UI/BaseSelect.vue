<template>
  <select
    class="select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)">
    <option
      v-for="option in data"
      :key="option.value"
      :class="optClass"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
    },
    optClass: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>
